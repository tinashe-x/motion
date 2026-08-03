# Motion — Lovable AI Build Script

This is a sequence of ready-to-paste prompts for building Motion in [Lovable](https://lovable.dev). It's based on your uploaded demo video and the Motion prototype screens (Home / Activity Feed / Map / Community / Profile navigation, event discovery, live photo verification, Motion Meter, and host/admin flows).

## How to use this

1. **Don't paste everything at once.** Lovable builds far more reliably when you give it one focused prompt at a time and review the preview before moving on. Paste **Prompt 1**, wait for it to build, check the preview, then move to **Prompt 2**, and so on.
2. **Connect Supabase before Prompt 2.** In the Lovable editor, click the Supabase button (top right) and connect a project *before* you paste any prompt involving auth, database, or storage. Everything from Prompt 2 onward assumes Supabase is connected.
3. **After each prompt**, if something didn't build correctly, just describe what's wrong in plain language in the next message — Lovable will patch it — rather than re-pasting the whole prompt.
4. Prompts are in fenced code blocks — copy the whole block (not this instruction text) into the Lovable chat box.

---

## Brand Reference (used throughout every prompt)

| Element | Value |
|---|---|
| Primary — Electric Purple | `#4A00E0` |
| Secondary — Electric Violet | `#8E2DE2` |
| Accent — Safety Yellow | `#FFD700` |
| Neutral — Urban Grey | `#2D2D2D` |
| Heading font | Poppins (SemiBold/Bold for headings) |
| Body font | Inter |
| Slogan | "See the vibe. Live the moment." |
| Bottom nav (5 tabs) | Home · Activity Feed · Map · Community · Profile |

---

## PROMPT 1 — Project Setup, Brand System & Marketing Website

```
Build the public marketing website for "Motion" — a real-time social discovery and nightlife
safety app for Johannesburg, South Africa.

BRAND SYSTEM
- Primary color: Electric Purple #4A00E0
- Secondary color: Electric Violet #8E2DE2 (use for gradients with the primary)
- Accent color: Safety Yellow #FFD700 (use sparingly, for highlights, badges, CTAs on dark backgrounds)
- Neutral: Urban Grey #2D2D2D
- Headings: Poppins (SemiBold/Bold), import from Google Fonts
- Body text: Inter, import from Google Fonts
- Overall tone: energetic, trustworthy, modern nightlife-tech — not corporate, not childish
- Support dark mode as the primary aesthetic (this is a nightlife brand), with purple/violet
  gradients, glow effects on cards, and generous rounded corners
- Slogan: "See the vibe. Live the moment."

SITE STRUCTURE (single-page marketing site with anchor sections + a couple of standalone pages)

1. Hero section
   - Bold headline built around: verified, real-time nightlife intelligence
   - Subheadline: something like "Motion shows you what's actually happening right now —
     verified by the people already there."
   - Primary CTA: "Get the App" (scrolls to download section / opens app link placeholder)
   - Secondary CTA: "For Venues & Hosts" (scrolls to venues section)
   - Phone mockup graphic showing a stylised app screen (event feed with a live "Motion Meter"
     indicator)

2. "The Problem" section
   - Three short cards: "You don't know what's actually happening tonight", "Social media shows
     you yesterday, not right now", "Safety is always a question mark"

3. "How Motion Works" section (3-4 step visual flow)
   - Step 1: Discover nearby events on the map and home feed
   - Step 2: Check the live Motion Meter — real energy, safety, and crowd signals from people
     already there
   - Step 3: See geofenced, timestamp-verified photos from actual attendees — not marketing photos
   - Step 4: Join the event, then share your own verified moment

4. "Safety First" section (important — this is a core differentiator)
   - Highlight: Safety Score / User Reputation system, geofenced photo verification, anonymous
     safety signals, community-driven accountability
   - Include a stat callout: "78% of Johannesburg residents cite safety as their top nightlife
     concern — Motion was built to change that."

5. "For Venues & Hosts" section
   - Explain the three promotion tiers at a glance (don't do a full pricing table yet, just teaser
     cards):
     - Basic Listing — Free
     - Spotlight — from R499/event
     - Platinum — from R2,999/event
   - CTA: "Become a Partner Venue"

6. "Community" section
   - Showcase the Community / "Join the Wave" concept — real user photos and captions from events
     (use placeholder/stock nightlife imagery for now)

7. Download / CTA section
   - "Available on Android and iOS" with app store badge placeholders
   - Since Motion is a Progressive Web App, also include an "Add to Home Screen" instruction
     card as a fallback download method

8. Footer
   - Motion logo, slogan, links: About, Safety, For Venues, Privacy Policy, Terms, Contact
   - Contact: info@motionapp.co.za, Johannesburg, South Africa
   - Social icons (placeholder links)

ADDITIONAL STANDALONE PAGES (basic, can be simple for now)
- /privacy-policy — placeholder Privacy Policy page (POPIA-compliant tone, South African context)
- /terms — placeholder Terms of Service page
- /venues — expanded version of the "For Venues & Hosts" section with the full 3-tier pricing
  comparison (Basic free / Spotlight R499 per event / Premium R1,499 per event / Platinum R2,999
  per event / Verified Partner R2,999 per month) in a pricing-table layout

TECH REQUIREMENTS
- React + Tailwind CSS (standard Lovable stack)
- Fully responsive — mobile-first, but should look great on desktop since this is a marketing site
- Smooth scroll navigation from a sticky header with logo + nav links (How it Works, Safety, For
  Venues, Download) + a "Get the App" button
- Use subtle scroll-triggered animations on section entry (fade/slide up) but keep it performant
```

---

## PROMPT 2 — Supabase Schema & Authentication

```
Now set up the backend for the Motion web app (the actual product, separate from the marketing
site — put it behind routes starting with /app, e.g. /app/home, /app/login, etc., while the
marketing site stays at /).

SUPABASE SCHEMA
Create the following tables with Row Level Security enabled:

1. profiles
   - id (uuid, references auth.users)
   - username (text, unique)
   - display_name (text)
   - bio (text)
   - avatar_url (text)
   - trust_score (integer, default 50) — this is the "Motion-me" reputation score shown as a %
   - instagram_handle (text, nullable)
   - twitter_handle (text, nullable)
   - role (text, default 'user') — values: 'user', 'host', 'moderator', 'admin'
   - is_banned (boolean, default false)
   - created_at (timestamp)

2. venues
   - id (uuid)
   - name (text)
   - address (text)
   - latitude (numeric)
   - longitude (numeric)
   - contact_info (text)
   - is_verified_partner (boolean, default false)
   - created_at (timestamp)

3. events
   - id (uuid)
   - host_id (uuid, references profiles)
   - venue_id (uuid, references venues, nullable)
   - name (text)
   - description (text)
   - category (text) — e.g. 'Concert', 'Networking', 'Festival', 'Nightclub'
   - start_time (timestamp)
   - end_time (timestamp)
   - status (text, default 'pending') — values: 'pending', 'approved', 'rejected', 'completed'
   - promotion_tier (text, default 'basic') — values: 'basic', 'spotlight', 'premium', 'platinum'
   - verification_requested (boolean, default false)
   - popularity_score (integer, default 0)
   - safety_score (integer, default 100) — moves based on aggregated user signals
   - created_at (timestamp)

4. event_photos
   - id (uuid)
   - event_id (uuid, references events)
   - user_id (uuid, references profiles)
   - photo_url (text)
   - caption (text)
   - mood_tags (text[]) — e.g. ['Exciting', 'Energy', 'Chill', 'Lively']
   - captured_latitude (numeric)
   - captured_longitude (numeric)
   - captured_at (timestamp)
   - is_verified (boolean, default false) — true if geofence + timestamp checks pass
   - is_flagged (boolean, default false)
   - flag_reason (text, nullable)
   - created_at (timestamp)

5. event_attendance
   - id (uuid)
   - event_id (uuid, references events)
   - user_id (uuid, references profiles)
   - status (text) — 'going', 'here_now', 'saved'
   - created_at (timestamp)

6. safety_signals
   - id (uuid)
   - event_id (uuid, references events)
   - user_id (uuid, references profiles) — but store anonymously in the UI, don't display who
     submitted a signal
   - signal_type (text) — 'safe', 'unsafe', 'crowded', 'energetic', 'quiet'
   - created_at (timestamp)

7. content_reports
   - id (uuid)
   - reporter_id (uuid, references profiles)
   - reported_photo_id (uuid, references event_photos, nullable)
   - reported_user_id (uuid, references profiles, nullable)
   - reason (text)
   - status (text, default 'pending') — 'pending', 'reviewed', 'actioned', 'dismissed'
   - created_at (timestamp)

8. notifications_log
   - id (uuid)
   - user_id (uuid, references profiles, nullable) — null means it was a broadcast
   - title (text)
   - body (text)
   - notification_type (text) — 'nearby_event', 'upcoming_event', 'safety_alert', 'rsvp_reminder'
   - sent_at (timestamp)

ROW LEVEL SECURITY
- Users can read all public profile fields but only update their own profile
- Users can read all approved events; only hosts can create events (status starts as 'pending')
- Only admins/moderators can update event status, is_verified_partner on venues, or resolve
  content_reports
- Users can only insert event_photos and safety_signals tied to their own user_id
- Users can read event_photos for events they can see, but is_flagged photos should be hidden
  from normal users once flagged (still visible to moderators)

AUTHENTICATION
- Set up Supabase email/password authentication
- Build a Sign Up page at /app/signup with fields: username, email, password (matching the
  Motion prototype — clean single-column form, purple primary button, "Log In" as a secondary
  link/button at the top)
- Build a Login page at /app/login with: email, password, "Forgot password" link, "Sign Up"
  link at the bottom
- On successful signup, automatically create a row in `profiles` with trust_score defaulting to 50
- Add auth guards so /app/* routes redirect to /app/login if the user isn't authenticated
- Add a separate role check so a normal 'user' role cannot access /admin routes (build later)
```

---

## PROMPT 3 — Onboarding & Core Navigation Shell

```
Build the onboarding flow and the core app navigation shell for Motion.

ONBOARDING (shown once, before signup, to first-time visitors at /app)
Build a 3-slide swipeable onboarding carousel:
- Slide 1 — "Find Events": headline "Discover exciting events near you", supporting text about
  concerts, festivals, workshops, networking events
- Slide 2 — "Real-Time Vibe": headline about seeing real-time photos to get a feel for the event
  atmosphere before you go, with mood tag pills shown as decoration: Exciting / Chill / Lively
- Slide 3 — "Photo Verification": headline about verifying event authenticity through
  user-shared, geofenced, timestamped photos — "Trustworthy" and "Safe" as supporting tag pills
- Each slide has a skip button (top right) and a "Continue"/"Get Started" button on the last
  slide that routes to /app/signup

CORE APP SHELL
Once a user is authenticated, wrap all /app/* pages (except onboarding/login/signup) in a shell
with a persistent bottom navigation bar with 5 tabs, using icons + labels:
1. Home (house icon) → /app/home
2. Activity Feed (bolt/pulse icon) → /app/activity
3. Map (map pin icon) → /app/map
4. Community (people icon) → /app/community
5. Profile (user icon) → /app/profile

- The active tab should be highlighted in Electric Purple #4A00E0; inactive tabs in muted grey
- The bottom nav should be fixed to the bottom of the viewport, safe-area aware (respect iOS/
  Android safe areas), and always visible across these 5 main sections
- Keep a consistent top area on each page for a search icon and, where relevant, a notification
  bell icon (top right) that will later link to /app/notifications
```

---

## PROMPT 4 — Home Feed & Discovery

```
Build the Home tab at /app/home for the Motion web app.

LAYOUT
- Header: "Welcome to Motion" greeting, personalised with the user's display_name if available
- "Recommended Events" section with horizontally scrollable category chips at the top:
  Concerts, Networking, Festivals, Nightclub, Workshops (chips filter the feed below when tapped)
- Below the chips, a vertical feed of Event Cards. Each Event Card shows:
  - Event cover/promotional photo
  - Event name
  - Venue name
  - Date and start time (e.g. "Today 8:00 PM" or "Tomorrow 6:00 PM")
  - A small live "Motion Meter" badge in the corner of the card (colored purple-to-yellow
    gradient dot or small radial gauge) reflecting the event's current safety_score /
    popularity_score
  - Tapping a card navigates to /app/event/:id (build in the next prompt)
- Floating filter bar or filter button that opens a bottom sheet / modal with:
  - "Event Types" — multi-select category filter
  - "Popularity" — sort toggle (Most Popular / Newest / Starting Soon)
  - "Filter Events" — apply/reset buttons

DATA
- Pull events from the `events` table where status = 'approved' and start_time is in the future
  (or currently ongoing), ordered by a mix of popularity_score and start_time
- Show a loading skeleton state while fetching, and an empty state ("No events match your
  filters yet") if the filtered list is empty
```

---

## PROMPT 5 — Event Details (3-Tab View)

```
Build the Event Details page at /app/event/:id for Motion.

Use a 3-tab layout at the top of the page: "Event Details" | "Map View" | "Live Feed"
(this matches the Motion prototype exactly — tapping between tabs should not reload the page,
just swap the content below the tab bar).

TAB 1 — Event Details
- Event cover photo at the top
- Event name, category badge, date/time
- "User Reputation" / "Safety Score" — a prominent percentage badge (e.g. "Safety Score: 90%"),
  color-coded (green above 75%, yellow 50-75%, red below 50%)
- Event description text
- Venue Information card: venue name, address, contact info
- Three action buttons: Share, Save, Join Event (Join Event should be the primary purple button;
  Share and Save are secondary/outline buttons). Joining an event creates a row in
  event_attendance with status 'going'

TAB 2 — Map View
- Embedded map (use a placeholder map component for now, styled to match the dark purple theme)
  centered on the venue's latitude/longitude with a single pin
- Below the map, a "Get Directions" button

TAB 3 — Live Feed
- "Real-Time Vibe" header
- A grid or vertical feed of live photos from `event_photos` for this event, each showing:
  - Poster's avatar + username
  - Timestamp + venue name (e.g. "9:00 PM - Club ABC")
  - The photo itself
  - Caption text
  - Mood tag pills (e.g. "Exciting", "Energy")
  - A small flag/report icon (top right of each photo card) that opens a "Report this photo"
    modal, which inserts a row into content_reports and sets is_flagged = true on the photo
    if 3+ reports accumulate (you can simulate this with a database trigger or simple check)
  - A "•••" overflow menu with Report / Hide options
- Below the feed, a "User Feedback" section showing short text comments from attendees (can be
  a simple list, doesn't need full threading for now)
- A floating action button (camera icon) fixed at the bottom of this tab that routes to
  /app/event/:id/verify (the photo submission flow, built in the next prompt)
```

---

## PROMPT 6 — Photo Capture & Verification (Android / Non-Apple Camera Compatibility)

```
Build the photo submission and verification flow for Motion at /app/event/:id/verify.

THIS IS CRITICAL: Motion must work equally well on Android phones and any non-Apple device with
a camera, not just iOS/Safari. Do NOT use any iOS-only APIs, plugins, or camera capture methods.
Specifically:

- Use the standard HTML5 `navigator.mediaDevices.getUserMedia()` Web API for live camera preview
  and capture, with a fallback to a plain `<input type="file" accept="image/*" capture="environment">`
  element for devices/browsers where getUserMedia isn't available or permission is denied
- Support both front and back camera on Android devices — include a "flip camera" button that
  calls getUserMedia again with `facingMode: 'environment'` vs `facingMode: 'user'`
- Do not assume HEIC image format (an Apple-specific format) — accept and correctly preview/store
  standard JPEG/PNG/WebP, and if a HEIC file is selected via file picker, convert it client-side
  before upload (or clearly reject it with a friendly message asking for JPEG/PNG)
- Test that camera permission prompts, video preview, and capture all work correctly in Chrome on
  Android as the primary target browser, not just Safari/WebKit

FLOW
Step 1 — Camera Interface
- Full-screen camera preview using getUserMedia
- Large circular capture button at the bottom center
- Flip camera icon (top right), close/cancel icon (top left)
- After capture, show a preview with "Retake" and "Use Photo" buttons

Step 2 — Tagging
- Ask the user to confirm the event and venue this photo is for (pre-filled from the event they
  came from, but allow correction via a searchable dropdown)
- Let the user add a short caption
- Let the user select 1-2 mood tags from a fixed set: Exciting, Energy, Chill, Lively, Crowded,
  Relaxed (shown as selectable pill chips)

Step 3 — Verification System
- Before allowing submission, request the browser's Geolocation API permission
  (`navigator.geolocation.getCurrentPosition`) and capture the user's current latitude/longitude
- Compare the captured coordinates against the event's venue latitude/longitude — if the user is
  within a 150-metre radius AND the current time falls within the event's start_time/end_time
  window (with a 1-hour grace period on each side), mark the submission as eligible for
  is_verified = true
- If the user is outside the geofence or outside the time window, show a clear message: "This
  photo can't be verified because you don't appear to be at the venue right now — it will still
  be submitted, but marked as unverified." and set is_verified = false
- On submit, upload the photo to Supabase Storage, then insert a row into event_photos with the
  photo URL, caption, mood_tags, captured_latitude/longitude, captured_at (current timestamp),
  and the computed is_verified value
- Show a success screen confirming submission, with a "Back to Event" button
```

---

## PROMPT 7 — Activity Feed & Community

```
Build two remaining main tabs for Motion: Activity Feed and Community.

ACTIVITY FEED — /app/activity
- A chronological, scrollable feed of event_photos across ALL events (not just one), most recent
  first
- Each post shows: poster avatar + username, timestamp + venue name (e.g. "9:00 PM - Club ABC"),
  the photo, caption, mood tag pills, a flag/report icon, and a "•••" overflow menu
  (Report / Hide / Copy Link)
- Support pull-to-refresh and infinite scroll (load more as the user scrolls down)
- Tapping a post's venue name or photo should navigate to that event's /app/event/:id page

COMMUNITY — /app/community
- Header: "Join the Wave" with subtext "See what others are up to"
- A two-column masonry/grid layout of user-generated photos (this is distinct from Activity Feed
  — Community is more of a discovery/inspiration gallery, less strictly chronological, and can
  mix in slightly older popular content, not just live event photos)
- Each grid item shows the photo, a short caption snippet, and the username overlaid or below
- Tapping an item opens a detail view/modal with the full photo, full caption, mood tags, and a
  "View Event" button linking to the source event
```

---

## PROMPT 8 — Map Tab

```
Build the Map tab at /app/map for Motion.

- Full-screen interactive map (styled dark/purple to match the brand, matching the app's overall
  dark theme) centered on the user's current location (request Geolocation permission; fall back
  to a default Johannesburg city-center view if permission is denied)
- Show pins for all approved, upcoming/ongoing events, color-coded by category or by
  safety_score/popularity
- Below or overlaying the map, an "Active Events" list/card carousel titled "Events Near You" —
  "Find exciting events happening now" — showing event name + venue/location for the closest
  3-5 events, each tappable to open /app/event/:id
- Tapping a map pin should highlight/scroll to the corresponding card in the list, and vice versa
- Include a search bar at the top of the map screen to search events by name or venue
```

---

## PROMPT 9 — Profile, Settings & Notifications

```
Build the Profile tab and its related settings pages for Motion.

PROFILE — /app/profile
- Header card: avatar, username, "Motion-me" trust score shown as a circular percentage badge
  (pulling from profiles.trust_score), short bio/tagline (e.g. "Event Enthusiast — I love
  attending events and sharing moments")
- If bio/avatar aren't set yet, show a "Create Your Profile — Personalize your event preferences"
  prompt card with a button to complete setup
- Social links section: Instagram and Twitter handles (editable)
- "Set Preferences" section: event category interests (multi-select chips) and location radius
  preference (slider, e.g. 5-50km)
- "Past Events Attended" section: horizontally scrollable grid of photos the user submitted,
  with a "View" link to see all
- "Saved Events" section: list of events the user saved (event_attendance status = 'saved'),
  each showing event name + a "View Details" link
- "Manage Account" section with two links: Account Settings, Privacy Settings (both go to
  sub-pages below)
- A gear/settings icon in the top right of the Profile page linking to the full Settings page

SETTINGS — /app/settings
Build as a clean list-style settings page with these rows, each navigating to its own sub-page
or toggle group:
- Account Settings (edit username, email, password, delete account)
- Privacy Settings (profile visibility, who can see saved events, data/POPIA consent toggle)
- Saved Events (same list as on Profile)
- Past Events Attended (same grid as on Profile)
- Set Preferences (same as on Profile)
- Notifications (see below)
- Host Settings (links to /app/host, built in the next prompt)
- FAQ (simple static accordion page with 5-6 placeholder Q&As about safety, verification, and
  how the Motion Meter works)
- Log Out button at the very bottom, styled as a destructive/outline action

NOTIFICATIONS — /app/settings/notifications
Build a simple toggle list:
- Nearby Events Update
- Upcoming Events
- Safety Alerts (this one should be visually indicated as important/recommended, can't be fully
  disabled — maybe show a small "Recommended" badge)
- RSVP Reminders
Persist these toggle states to a notification_preferences jsonb column on the profiles table
(add this column now if it doesn't exist).
```

---

## PROMPT 10 — Host Tools & Event Creation

```
Build the host/event-creation flow for Motion, accessible from Settings → Host Settings.

HOST DASHBOARD — /app/host
- If the current user's profile role is 'user' (not yet a host), show an "Become a Host" intro
  screen explaining that hosts can create and promote events, with a "Get Started" button that
  updates their role to 'host' in the profiles table
- Once a host, show a simple dashboard: list of their events (with status badges: Pending Review /
  Approved / Rejected / Completed), and a prominent "+ Create Event" button

EVENT CREATION — /app/host/create (multi-step form, matching the Motion prototype's flow)

Step 1 — Event Details
- Event Name (text input)
- Description (textarea, "Provide Event Details")
- Venue Location (text input for now, "Enter Venue Address" — with a note that this should later
  integrate an address autocomplete/geocoding service to populate latitude/longitude)
- Event Category (dropdown: Concert, Networking, Festival, Nightclub, Workshop, Other)
- "Continue" button at the bottom

Step 2 — Date & Time
- Start date/time picker ("Start" label, calendar + time selection)
- End date/time picker ("End" label, calendar + time selection)
- "Continue" button

Step 3 — Promotion & Media
- Upload Promotional Photos (multi-image upload with preview thumbnails and remove buttons)
- "Photo Verification Request" toggle — "Ensure authenticity for users" (explain this enables
  the geofenced verification system on this event once approved)
- Promotion tier selection, shown as 4 selectable cards:
  - Basic Listing — Free — "Verification badge, 48hr listing, up to 5 photos"
  - Spotlight — R499/event — "Motion Meter inclusion, 7-day promo, unlimited photos, push
    notification to nearby users"
  - Platinum — R2,999/event — "Priority placement, 14-day window, dedicated spotlight, monthly
    performance dashboard"
  - (Selecting a paid tier for now can just store the selection — payment integration comes later)
- "Submit for Review" button

On submit, insert a row into `events` with status = 'pending' and the selected promotion_tier,
then show a confirmation screen: "Your event has been submitted for review. We'll notify you
once it's approved." with a button back to the Host Dashboard.
```

---

## PROMPT 11 — Admin Portal (Controls & Stats)

```
Build a separate Admin Portal for Motion at /admin, completely separate in layout from the main
app (use a desktop-first dashboard layout with a left sidebar, since admins will mostly use this
on laptops/desktops, unlike the rest of the app which is mobile-first).

ACCESS CONTROL
- /admin routes must check that the logged-in user's profiles.role is 'admin' or 'moderator'
- If a 'moderator' logs in, hide the Roles & Permissions management section (admin-only)
- Anyone else attempting to access /admin should be redirected to /app/home

LAYOUT
- Left sidebar with Motion logo at top, then nav items: Dashboard, Events, Venues, Users,
  Moderation Queue, Verification Queue, Safety Center, Announcements, Roles & Permissions
  (admin-only), and a Log Out button at the bottom
- Top bar with a search input and the admin's own avatar/name in the top right

1. DASHBOARD (/admin) — Stats Overview
Build a grid of KPI stat cards at the top:
- Total Users (with a small trend indicator vs last 30 days)
- Monthly Active Users (MAU)
- Total Events (split by status: Pending / Approved / Completed)
- Total Venues / Verified Partners
- Average Safety Score across active events
- Verified Photo Rate (% of event_photos where is_verified = true)
- Pending Moderation Items (count of open content_reports)
- Revenue-by-tier snapshot: count of events per promotion_tier this month (Basic/Spotlight/
  Platinum) — show as a small bar chart

Below the stat cards, include:
- A line chart of new user signups over the last 30 days
- A line chart of events created over the last 30 days
- A simple table: "Recent Activity" showing the 10 most recent events, photo submissions, and
  content reports, each with a timestamp and a link to the relevant detail page

2. EVENTS (/admin/events)
- Table of all events with columns: Name, Host, Venue, Category, Start Time, Status, Promotion
  Tier, Safety Score
- Filter/search by status and category
- Row click opens an event detail/review panel where an admin can:
  - Approve or Reject a pending event (with an optional rejection reason text field)
  - Edit any event field
  - Manually feature/spotlight an event
  - View all photos submitted for that event, including flagged ones

3. VENUES (/admin/venues)
- Table of venues: Name, Address, Verified Partner (toggle), number of events hosted
- Ability to add a new venue manually, edit details, and toggle "Verified Partner" status

4. USERS (/admin/users)
- Table of users: Username, Email, Trust Score, Role, Status (Active/Banned), Join Date
- Search/filter by role and status
- Row click opens a user detail panel showing: profile info, event photos they've submitted,
  reports made against them, reports they've made, and admin actions: Adjust Trust Score,
  Change Role, Suspend/Ban User (with reason field), Reinstate User

5. MODERATION QUEUE (/admin/moderation)
- List of all content_reports with status = 'pending', showing: reported content preview
  (photo thumbnail or user), reporter, reason, timestamp
- Each item has action buttons: Dismiss Report, Remove Content, Ban User (escalation), all of
  which update the content_reports status and, where relevant, the event_photos.is_flagged or
  profiles.is_banned fields

6. VERIFICATION QUEUE (/admin/verification)
- List of event_photos that are borderline/unverified (is_verified = false) alongside their
  captured location and event venue location, so a moderator can visually compare and manually
  override is_verified if the automatic geofence check was too strict (e.g. GPS drift)
- Include a map snippet per item showing the captured location pin vs. the venue location pin

7. SAFETY CENTER (/admin/safety)
- A log/table of aggregated safety_signals per event, with a way to view flagged 'unsafe' signal
  spikes for any event
- A "Broadcast Safety Alert" tool: select an event or a radius around a venue, write a message,
  and simulate sending a push/in-app notification (insert a row into notifications_log with
  notification_type = 'safety_alert')

8. ANNOUNCEMENTS (/admin/announcements)
- A simple composer: title, body, target audience (All Users / Users Near a Venue / Hosts Only),
  and a Send button that inserts into notifications_log
- Below the composer, a history table of past announcements sent

9. ROLES & PERMISSIONS (/admin/roles) — admin role only
- Table of all staff accounts (role = 'moderator' or 'admin') with the ability to promote/demote
  between 'user', 'moderator', and 'admin'

STYLING
- Use the same brand colors (purple/violet/yellow) but in a cleaner, more neutral light-or-dark
  dashboard style appropriate for a data-heavy admin tool — don't apply the nightlife gradient
  aesthetic here, keep it functional and readable, with purple used mainly for primary buttons,
  active nav items, and chart accents
```

---

## PROMPT 12 — PWA, Polish & Cross-Device QA

```
Finish Motion with the following polish and technical pass:

PROGRESSIVE WEB APP
- Add a web app manifest (manifest.json) with the Motion name, icons (use the purple/violet
  gradient logo mark), theme_color #4A00E0, and display: standalone, so Android users can
  "Add to Home Screen" and get an app-like experience
- Register a basic service worker for offline caching of static assets and a simple offline
  fallback page

CROSS-DEVICE CHECKLIST — please explicitly verify/handle these:
- Camera capture (getUserMedia) works correctly on Chrome for Android, not just Safari/iOS —
  test both front and back camera switching
- Geolocation permission prompts and fallback messaging work correctly if a user denies location
  access (don't hard-crash the verification flow — show a clear explanation and allow retry)
- File uploads (promotional photos, profile avatar) accept standard image formats and show
  upload progress; large images should be compressed client-side before upload
- All touch targets (buttons, nav icons, chips) are at least 44x44px for comfortable tapping on
  a range of Android screen sizes
- Bottom navigation bar respects safe-area insets and doesn't get obscured by on-screen Android
  navigation bars
- Test the full flow end-to-end on a narrow viewport (360px width, common on Android) as well as
  larger phones and tablets

FINAL POLISH
- Add loading skeletons across all data-fetching screens (event feed, activity feed, community
  grid, admin tables)
- Add empty states with helpful messaging everywhere a list could be empty
- Add toast notifications for key actions: event joined, photo submitted, event submitted for
  review, settings saved, admin actions confirmed
- Run through every route once more and confirm the purple/yellow/grey brand system and
  Poppins/Inter fonts are applied consistently across the marketing site, the app, and the admin
  portal
```

---

## Appendix — Quick Reference: Data Model

| Table | Purpose |
|---|---|
| `profiles` | User accounts, trust score, role (user/host/moderator/admin) |
| `venues` | Physical venue locations, verified partner flag |
| `events` | Event listings, status, promotion tier, safety score |
| `event_photos` | User-submitted photos, geofence + timestamp verification |
| `event_attendance` | Going / here now / saved states per user per event |
| `safety_signals` | Anonymous crowd-sourced safety/energy signals |
| `content_reports` | Flagged photos/users awaiting moderation |
| `notifications_log` | Sent push/in-app notifications and broadcasts |

## Appendix — Why staged prompts instead of one mega-prompt

Lovable (like most AI app builders) produces much more reliable results when each prompt has a
narrow, well-defined scope. A single prompt asking for the marketing site, the full app, and the
admin portal all at once tends to produce a shallow or broken first draft across all three,
rather than a solid result in any one area. Building in this order — brand & marketing site →
backend schema → onboarding/nav → each core screen → host tools → admin portal → PWA polish —
also mirrors how you'd actually want to demo progress to stakeholders along the way.
