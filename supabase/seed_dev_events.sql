-- Optional: paste into SQL Editor after a real curator/admin user exists.
-- Replace USER_UUID with that profiles.id, then approve shows on Discover.

-- Example approved seed events (moderation_status = approved)
/*
INSERT INTO public.events (
  title, description, category, location, coordinates,
  start_time, end_time, created_by, moderation_status, images
) VALUES
(
  'Sunset Sessions at the Pier',
  'Live indie sets as the sun goes down. Free entry.',
  'music',
  'Santa Monica Pier, CA',
  '{"latitude": 34.0094, "longitude": -118.4973}'::jsonb,
  now() + interval '2 days',
  now() + interval '2 days' + interval '3 hours',
  'USER_UUID'::uuid,
  'approved',
  '[]'::jsonb
),
(
  'Morning Trail Run',
  'Easy 5K group run. All paces welcome.',
  'fitness',
  'Griffith Park, Los Angeles',
  '{"latitude": 34.1365, "longitude": -118.2942}'::jsonb,
  now() + interval '1 day',
  now() + interval '1 day' + interval '2 hours',
  'USER_UUID'::uuid,
  'approved',
  '[]'::jsonb
),
(
  'Gallery Night Downtown',
  'Curated openings across three indie galleries.',
  'art',
  'Arts District, LA',
  '{"latitude": 34.0407, "longitude": -118.2350}'::jsonb,
  now() + interval '5 days',
  now() + interval '5 days' + interval '4 hours',
  'USER_UUID'::uuid,
  'approved',
  '[]'::jsonb
);
*/
