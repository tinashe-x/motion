# Social Tabs, DMs & Motion Meter Charge — Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure Home / Activity / Community around friends feed + Discover, personal calendar, popping events, full mock DMs, comments/live updates, and hybrid bolt-charged Motion Meter.

**Architecture:** Extend mock `AppState` with social graph, posts, comments, DMs, bolts, and live updates. Derive Motion Meter from safety + popularity + charge. Rebuild the three tab pages; add Messages routes. Persist social mutations in localStorage.

**Tech Stack:** React + React Router + existing Tailwind / lucide-react / AppState patterns. No new npm packages.

## Global Constraints

- Mock data only; no real network/websocket.
- Keep Community tab name; Map and Profile unchanged.
- Meter formula: `round(0.40*safety + 0.25*popularity + 0.35*chargeNormalized)` with chargeNormalized from bolt-equivalents / 20.
- Commitments = RSVP attendance + hosted events.
- Home default tab = Friends; Discover = former Home event browse.
- DMs: composer, read receipts, unread badges, localStorage persistence.

---

## File structure

| File | Responsibility |
|------|----------------|
| `src/types.ts` | New social / DM / bolt / live-update types |
| `src/lib/motionMeter.ts` | Charge + score helpers |
| `src/data/mock.ts` | Seed friends, posts, comments, DMs, bolts |
| `src/context/AppState.tsx` | Actions + persistence |
| `src/components/MotionMeter.tsx` | Charge-aware visual |
| `src/components/EventCard.tsx` | Use shared meter helper |
| `src/components/social/FriendPostCard.tsx` | Feed post UI |
| `src/components/social/CommentSheet.tsx` | Comments UI |
| `src/components/social/CommitmentsCalendar.tsx` | Month calendar |
| `src/pages/app/HomeFeedPage.tsx` | Friends + Discover |
| `src/pages/app/ActivityPage.tsx` | My events + calendar |
| `src/pages/app/CommunityPage.tsx` | Popping events |
| `src/pages/app/MessagesInboxPage.tsx` | DM inbox |
| `src/pages/app/MessagesThreadPage.tsx` | DM thread |
| `src/pages/app/EventDetailPage.tsx` | Live updates + bolt |
| `src/App.tsx` | Routes |

---

### Task 1: Types + meter helpers + seed data

**Files:**
- Modify: `src/types.ts`
- Create: `src/lib/motionMeter.ts`
- Modify: `src/data/mock.ts`

- [ ] Add types: `Friendship`, `Post`, `Comment`, `DmThread`, `DmMessage`, `BoltReact`, `LiveUpdate`
- [ ] Implement `boltEquivalentsForEvent`, `chargeNormalized`, `motionMeterScore`
- [ ] Seed friends, posts, comments, threads, messages, bolts, live updates tied to existing profiles/events
- [ ] Verify TypeScript compiles for new modules

### Task 2: AppState social actions + persistence

**Files:**
- Modify: `src/context/AppState.tsx`

- [ ] Expose seeded collections + derived getters (friends posts, commitments, popping events, charge for event)
- [ ] Actions: `toggleBolt`, `addComment`, `sendDm`, `markThreadRead`, `appendLiveUpdate` (also call from RSVP/photo where appropriate)
- [ ] Persist bolts, comments, DMs, live updates to localStorage
- [ ] Wire RSVP / submit photo to auto-charge + live update

### Task 3: MotionMeter + EventCard

**Files:**
- Modify: `src/components/MotionMeter.tsx`
- Modify: `src/components/EventCard.tsx`

- [ ] Accept chargeNormalized / score; show fill bar + glow
- [ ] EventCard uses shared score helper from AppState or props

### Task 4: Home Friends + Discover + post/comment UI

**Files:**
- Create: `src/components/social/FriendPostCard.tsx`
- Create: `src/components/social/CommentSheet.tsx`
- Modify: `src/pages/app/HomeFeedPage.tsx`

- [ ] Friends | Discover toggle (`?tab=`)
- [ ] Friends feed with bolt/comment; Discover = previous event grid
- [ ] Paper-plane → `/app/messages`
- [ ] Empty state CTA to Discover

### Task 5: Messages inbox + thread

**Files:**
- Create: `src/pages/app/MessagesInboxPage.tsx`
- Create: `src/pages/app/MessagesThreadPage.tsx`
- Modify: `src/App.tsx`

- [ ] Inbox list with unread
- [ ] Thread with bubbles, composer, ✓/✓✓ receipts, mark read on open
- [ ] Routes registered under AppShell

### Task 6: Activity calendar + Community popping

**Files:**
- Create: `src/components/social/CommitmentsCalendar.tsx`
- Modify: `src/pages/app/ActivityPage.tsx`
- Modify: `src/pages/app/CommunityPage.tsx`

- [ ] Activity: commitments list + month calendar day filter + charge preview
- [ ] Community: events sorted by charge; remove photo masonry primary UI

### Task 7: Event detail live updates + bolt + verify

**Files:**
- Modify: `src/pages/app/EventDetailPage.tsx`

- [ ] Live Feed shows live update lines + photos
- [ ] Bolt on event; meter uses new formula
- [ ] Run `npm run build` and fix errors

---

## Spec coverage

| Spec item | Task |
|-----------|------|
| Home Friends + Discover | 4 |
| Full mock DMs | 5 |
| Activity commitments + calendar | 6 |
| Community popping | 6 |
| Hybrid meter | 1–3, 7 |
| Comments + live updates | 2, 4, 7 |
| Persistence | 2 |
| Build passes | 7 |
