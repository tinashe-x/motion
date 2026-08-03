# Apply migrations to Supabase

Canonical SQL lives in this folder. Project ref from `motion-app/.env`:
`llnojltyqmedikjnokwn`.

> If `*.supabase.co` does not resolve (NXDOMAIN), the remote project may
> have been paused or deleted — create/link a new project, update
> `EXPO_PUBLIC_SUPABASE_URL` / anon key, then apply.

## Apply (pick one)

```bash
# Option A — CLI (after login)
npx supabase login
npx supabase link --project-ref <project-ref>
npx supabase db push
```

**Option B — SQL Editor:** Dashboard → SQL → New query → run each file in
`supabase/migrations/` in timestamp order (foundation is last).

**Optional seed:** uncomment / fill UUID in `seed_dev_events.sql`, or approve
rows manually in Table Editor (`moderation_status = approved`).

Promote a curator:

```sql
UPDATE public.profiles SET role = 'curator' WHERE email = 'you@example.com';
```

## Types

Types in `motion-app/src/types/supabase.ts` match the foundation schema.
After applying to a live project you may regenerate:

```bash
npx supabase gen types typescript --project-id <project-ref> \
  > motion-app/src/types/supabase.ts
```
