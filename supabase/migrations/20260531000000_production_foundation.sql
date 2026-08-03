-- Production foundation: roles, moderation, images, RLS, storage, seed
-- Canonical migrations live in repo-root supabase/migrations/

-- ---------------------------------------------------------------------------
-- Profiles: preferences + role-aware signup trigger
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE app_role AS ENUM ('user', 'curator', 'marketing', 'admin');
  END IF;
END$$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role app_role NOT NULL DEFAULT 'user';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email, role, preferences)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    'user',
    '{}'::jsonb
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Events: moderation_status (app canonical) + images
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'moderation_status') THEN
    CREATE TYPE moderation_status AS ENUM ('draft', 'pending_review', 'approved', 'rejected');
  END IF;
END$$;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS moderation_status moderation_status NOT NULL DEFAULT 'pending_review',
  ADD COLUMN IF NOT EXISTS images jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS rejection_reason text;

-- Backfill from legacy event_status column if present
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'events' AND column_name = 'status'
  ) THEN
    UPDATE public.events
    SET moderation_status = CASE status::text
      WHEN 'pending' THEN 'pending_review'::moderation_status
      WHEN 'approved' THEN 'approved'::moderation_status
      WHEN 'rejected' THEN 'rejected'::moderation_status
      ELSE moderation_status
    END
    WHERE true;
  END IF;
END$$;

-- ---------------------------------------------------------------------------
-- Helper: current user's role (avoids recursive RLS on profiles)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- ---------------------------------------------------------------------------
-- RLS: profiles (re-enable production-safe policies)
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to insert own profile" ON public.profiles;
DROP POLICY IF EXISTS admin_read_profiles ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_authenticated" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

CREATE POLICY "profiles_select_authenticated"
  ON public.profiles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = public.current_user_role()
  );

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id AND role = 'user');

-- ---------------------------------------------------------------------------
-- RLS: events
-- ---------------------------------------------------------------------------
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated users to create events" ON public.events;
DROP POLICY IF EXISTS "Allow event creators to update their events" ON public.events;
DROP POLICY IF EXISTS "Allow event creators to delete their events" ON public.events;
DROP POLICY IF EXISTS "events_select" ON public.events;
DROP POLICY IF EXISTS "events_insert_curators" ON public.events;
DROP POLICY IF EXISTS "events_update_own_or_admin" ON public.events;
DROP POLICY IF EXISTS "events_delete_own_or_admin" ON public.events;

CREATE POLICY "events_select"
  ON public.events FOR SELECT
  TO authenticated, anon
  USING (
    moderation_status = 'approved'
    OR created_by = auth.uid()
    OR public.current_user_role() IN ('curator', 'admin')
  );

CREATE POLICY "events_insert_curators"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = created_by
    AND public.current_user_role() IN ('curator', 'admin')
  );

CREATE POLICY "events_update_own_or_admin"
  ON public.events FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR public.current_user_role() = 'admin'
  );

CREATE POLICY "events_delete_own_or_admin"
  ON public.events FOR DELETE
  TO authenticated
  USING (
    created_by = auth.uid()
    OR public.current_user_role() = 'admin'
  );

-- ---------------------------------------------------------------------------
-- Storage buckets
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('event-images', 'event-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
  ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "event_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "event_images_authenticated_upload" ON storage.objects;
DROP POLICY IF EXISTS "event_images_owner_update" ON storage.objects;
DROP POLICY IF EXISTS "event_images_owner_delete" ON storage.objects;
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
DROP POLICY IF EXISTS "avatars_authenticated_upload" ON storage.objects;
DROP POLICY IF EXISTS "avatars_owner_update" ON storage.objects;
DROP POLICY IF EXISTS "avatars_owner_delete" ON storage.objects;

CREATE POLICY "event_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-images');

CREATE POLICY "event_images_authenticated_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'event-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "event_images_owner_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'event-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "event_images_owner_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'event-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "avatars_authenticated_upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "avatars_owner_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "avatars_owner_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'avatars'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ---------------------------------------------------------------------------
-- Dev seed: approved sample events (no-op if no users yet; safe to re-run)
-- ---------------------------------------------------------------------------
-- Seed is applied in app during first curator create + manual approve for beta.
-- Optional: insert after you have a curator user ID in the dashboard.
