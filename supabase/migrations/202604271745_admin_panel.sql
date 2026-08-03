-- Add role management on profiles
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE app_role AS ENUM ('user', 'curator', 'marketing', 'admin');
  END IF;
END$$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role app_role NOT NULL DEFAULT 'user';

-- Add approval workflow columns to events
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_status') THEN
    CREATE TYPE event_status AS ENUM ('pending', 'approved', 'rejected');
  END IF;
END$$;

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS status event_status NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS rejection_reason text;

-- Reports and moderation queue
CREATE TABLE IF NOT EXISTS public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  target_id uuid NOT NULL,
  type text NOT NULL CHECK (type IN ('event', 'user')),
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional push campaign tracking
CREATE TABLE IF NOT EXISTS public.push_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  sent_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  audience text NOT NULL DEFAULT 'all',
  sent_at timestamptz NOT NULL DEFAULT now()
);

-- Example policy adjustment: admin users can read all profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'admin_read_profiles'
  ) THEN
    CREATE POLICY admin_read_profiles
      ON public.profiles
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1
          FROM public.profiles p
          WHERE p.id = auth.uid()
            AND p.role = 'admin'
        )
      );
  END IF;
END$$;
