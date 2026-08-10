# Social Tabs, DMs & Motion Meter Charge — Design Spec

**Date:** 2026-08-10  
**Status:** Approved  
**Scope:** Authenticated app IA (`/app/*`) — Home, Activity, Community, Messages, Motion Meter, comments/live updates. Mock data only.

---

## Goals

1. **Home** becomes friends’ posts + Discover (IG-style), with full mock DMs.
2. **Activity** (Zap) shows *your* events (RSVP + hosting) and a calendar of commitments.
3. **Community** shows popping events ranked by Motion Meter charge (keep name; vibe tracker later).
4. **Hybrid bolt charging** — auto engagement + manual bolt reacts feed the Motion Meter visually.
5. **Comments** on posts and **live updates** on event Live Feed keep energy visible.

---

## Non-Goals

- Real backend, websockets, push notifications, or cross-device sync.
- Friends invite/search beyond seeded friendships.
- Renaming Community → “Vibe Tracker”.
- Map, Profile, marketing pages, or admin tools changes (except shared meter formula).

---

## Decisions Locked

| Topic | Choice |
|-------|--------|
| Scope | Full pass (tabs + social + meter + engagement) |
| Event discovery | Home → **Discover** sub-tab; Friends is default |
| DMs | Full mock: inbox, thread, composer, read receipts, unread badges |
| Commitments | RSVP’d events **+** events user hosts |
| Meter charge | Hybrid: auto from RSVP/photo/comment/live actions **+** bolt react |
| Community name | Keep “Community” |

---

## Information Architecture

Bottom nav unchanged: Home · Activity (Zap) · Map · Community · Profile.

| Tab | Job | UI |
|-----|-----|-----|
| Home | Social + discover | **Friends** \| **Discover** toggle. Paper-plane → Messages |
| Activity | Your night | My events list + month calendar |
| Community | What’s popping | Events ranked by charge |
| Map / Profile | Unchanged | — |

**New routes:**
- `/app/messages` — inbox
- `/app/messages/:threadId` — thread
- Home Friends/Discover via `?tab=friends|discover` (default `friends`)

**Content moves:**
- Current Home event browse → Discover
- Current Activity global photo feed → Home Friends posts + event Live Feed
- Current Community photo masonry → replaced by popping events

---

## Home — Friends & Discover

### Friends feed

- Seeded friends graph for the logged-in user.
- Posts: friend photo moments and light text updates (`Post` with `authorId`, optional `eventId`, caption, media, timestamps, bolt/comment counts).
- Affordances: bolt react, comments, link to event when present.
- Empty state → CTA to Discover.

### Discover

- Existing Home behavior: search shell, category chips, filters, `EventCard` grid with charge-aware Motion Meter.

### DMs

- Inbox: avatar, name, last message, time, unread badge.
- Thread: bubbles, composer, local send; read receipts (✓ / ✓✓); mark read on open.
- Seed 3–5 threads; persist in AppState + localStorage.
- Entry: paper-plane on Home; optional Message from friend post → thread.

### Comments & live updates

- Comments: inline or sheet on post; add locally.
- Live updates on event detail Live Feed: lines like “X bolted”, “Y commented”, “Z checked in” — append on action (no real websocket).

---

## Activity

- List: attendance for current user (`going` / `here_now` / `saved`) **plus** `hostId === me`.
- Calendar: month view; days with commitments highlighted; day tap filters list.
- Row may show compact charge/bolt preview.
- Tap → `/app/event/:id`.

---

## Community

- Ranked event cards by charge score (popularity tie-break).
- Copy may hint “vibe tracker coming”.
- No photo masonry as primary UI.

---

## Motion Meter (hybrid charge)

**Auto charge sources:** RSVP join, verified photo submit, comment on event-linked post, generating live-update actions.  
**Manual:** bolt react on post and/or event (one per user per target; toggle off allowed).

**Formula:**

```
score = round(0.40 * safety + 0.25 * popularity + 0.35 * chargeNormalized)
chargeNormalized = clamp((boltEquivalentCount / 20) * 100, 0, 100)
```

Bolt-equivalent counts bolts + weighted auto actions (e.g. RSVP +2, photo +3, comment +1).  
Visual: fill/glow ramps with charge, not number-only. Shared by EventCard and event detail.

---

## Data model (mock)

New types: `Friendship`, `Post`, `Comment`, `DmThread`, `DmMessage`, `BoltReact`, live update lines.  
Extend `AppState` + `mock.ts`. Persist DMs, bolts, comments in localStorage. Derive per-event charge live.

---

## Empty / edge states

- No friends posts → Discover CTA  
- No commitments → “RSVP or host to fill your calendar”  
- Empty Community → soft empty copy  
- Blank DM send → no-op  

---

## Testing checklist

- [ ] Friends / Discover toggle works; default Friends
- [ ] DM inbox → thread → send → receipts; unread clears on open
- [ ] Comment + bolt on post; event meter updates
- [ ] Activity list + calendar for RSVP + hosted
- [ ] Community sorted by charge
- [ ] Live Feed gains lines on bolt/comment/RSVP
- [ ] `npm run build` passes

---

## File touch list

- `src/types.ts`, `src/data/mock.ts`, `src/context/AppState.tsx`
- `src/lib/motionMeter.ts` (formula helper)
- `src/components/MotionMeter.tsx`, `EventCard.tsx`
- `src/pages/app/HomeFeedPage.tsx`, `ActivityPage.tsx`, `CommunityPage.tsx`, `EventDetailPage.tsx`
- New: Messages pages, feed/post/comment/DM/calendar components
- `src/App.tsx` routes
