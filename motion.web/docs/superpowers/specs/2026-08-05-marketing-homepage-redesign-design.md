# Marketing Homepage Redesign — Design Spec

**Date:** 2026-08-05  
**Status:** Draft — awaiting review  
**Scope:** `MarketingHomePage.tsx`, `VenuesPage.tsx`, new shared marketing components, minor nav/footer copy updates

---

## Goals

1. Reduce text density on the marketing home page with curated placeholder media.
2. Replace static grids with visual narratives (carousels, spotlight cards).
3. Reframe Safety and Verified Partners as marketing features — not just informational copy.
4. Remove all public pricing; use Price on Application (POA) for paid tiers.
5. Launch messaging: iOS exclusive native app; Android users directed to web app/PWA.
6. Turn `/venues` into a partner sales funnel with complimentary Basic trial + contact form.

---

## Non-Goals

- Real partner/venue data or CMS integration (placeholders only for launch).
- Backend form submission (mailto for v1).
- Native app store links (still "coming soon").
- Android native app development or Play Store listing.

---

## Page Structure (Home)

```
Hero (+ lifestyle photo strip)
  ↓
The Problem (auto carousel → Motion visual payoff)
  ↓
How Motion Works (manual photo carousel, 4 steps)
  ↓
Safety First (feature marketing grid)
  ↓
Verified Hosts & Venues (spotlight cards)
  ↓
Join the Wave (existing photo grid — unchanged)
  ↓
Download (iOS-first + web app for Android)
```

---

## Section Specifications

### 1. Hero

**Current:** Headline, copy, CTAs, single phone mockup.  
**Change:** Add a horizontal strip or 2×2 mosaic of 3–4 curated nightlife photos below the headline block (or between copy and CTAs) to break up text immediately.

**Placeholder images:** Unsplash — concerts, clubs, Joburg nightlife, crowd energy.  
**CTA copy:** Keep "Get the App" and retarget secondary CTA from "For Venues & Hosts" → **"Become a Verified Partner"** linking to `#verified-partners` or `/venues`.

---

### 2. The Problem (auto-advancing carousel)

**Replace:** 3-column static text cards.  
**With:** 4-slide carousel, ~5s auto-advance, pause on hover/focus, dot indicators.

| Slide | Visual theme | Copy (short) |
|-------|--------------|--------------|
| 1 | Group chat / indecision | "Plans die in group chats." |
| 2 | Stale social feed | "Social media shows you yesterday, not right now." |
| 3 | Safety uncertainty | "Safety is always a question mark when you're heading out." |
| 4 | Motion-branded night energy | No explicit "Motion solves this" — visual only: crowd, lights, map/Motion UI feel. Optional subtle tagline: "See what's actually happening." |

**Accessibility:** `aria-live="polite"` on slide change; keyboard navigation for dots; respect `prefers-reduced-motion` (show static first slide or grid fallback).

---

### 3. How Motion Works (manual photo carousel)

**Replace:** 4 icon cards in a grid.  
**With:** One slide per step — large photo background or side-by-side layout, step number, title, one-line body. Manual prev/next + swipe on touch.

| Step | Title | Placeholder image theme |
|------|-------|-------------------------|
| 1 | Discover nearby | Map / city nightlife |
| 2 | Check the Motion Meter | Crowd / energy gauge UI feel |
| 3 | See verified photos | Phone/camera at event |
| 4 | Join & share | People enjoying the night |

Copy stays aligned with existing `steps` array in `MarketingHomePage.tsx`.

---

### 4. Safety First (feature marketing)

**Keep:** Section id `#safety`, stat quote block.  
**Expand:** Reframe bullet list into a 2×2 or 4-column **feature grid** with icon + title + one-line marketing copy + optional small thumbnail.

Features to highlight:
- **Geofenced photo verification** — On-site, in-window shots only.
- **Motion-me trust score** — Community reputation over time.
- **Live Safety Score** — Anonymous crowd signals on the Motion Meter.
- **Verified venue partners** — Badge-backed listings you can trust.

Stat quote unchanged: "78% of Johannesburg residents cite safety as their top nightlife concern…"

---

### 5. Verified Hosts & Venues (replaces "For Venues & Hosts" pricing)

**Replace:** 3 pricing tier cards on home.  
**With:** Spotlight section `#verified-partners` — 3–6 cards, no prices.

**Mock partner card schema:**
```ts
{
  name: string        // e.g. "The Orbit"
  type: 'venue' | 'host'
  tagline: string    // e.g. "Live jazz & late-night energy"
  imageUrl: string   // Unsplash placeholder
  verified: true
}
```

**CTA:** "Become a Verified Partner" → `/venues`  
**Copy:** Focus on trust, verification badge, being seen by people already out — not pricing.

---

### 6. Join the Wave

**No changes** — existing 4-photo grid with captions.

---

### 7. Download (iOS-first)

**Replace headline:** "Available on Android and iOS" → **"Available on iOS"** (or "iOS first").

**Store badges:**
- App Store — Coming soon (keep)
- **Remove** Google Play badge

**Android path:**
- Prominent secondary CTA: **"On Android? Open the web app"** → `/app`
- Keep "Add to Home Screen" PWA instructions (Android Chrome + iOS Safari)

**Messaging tone:** iOS exclusivity for native app; Android users are welcome via web — not second-class, but clearly web-first for Android at launch.

---

## `/venues` — Partner Sales Funnel

**Replace:** 5-column pricing grid with Rand amounts.  
**With:** Conversion-focused landing page.

### Page sections

1. **Hero** — "Put your night on the Motion map" (keep headline direction).
2. **Complimentary Basic trial** — Highlight card:
   - Verification badge, 48hr listing, up to 5 photos
   - Framed as **free trial / complimentary listing** to get started
   - CTA: "Start your complimentary listing" → `/app/host`
3. **Paid tiers (POA)** — Spotlight, Premium, Platinum, Verified Partner:
   - Feature lists only
   - **No Rand amounts**
   - Label: **"Price on application"** or **"Contact us for pricing"**
   - Secondary CTA per tier: scroll to contact form or mailto
4. **Contact form + business details (Option C)**

#### Contact form fields
- Venue / business name (required)
- Contact name (required)
- Email (required)
- Phone (optional)
- Message (optional — "Tell us about your venue or event")

**Submit behavior (v1):** `mailto:info@motionapp.co.za` with pre-filled subject `Motion Partner Enquiry — {venue name}` and body from form fields. No backend.

#### Business details block (below form)
- Email: info@motionapp.co.za
- Location: Johannesburg, South Africa
- Phone: omit if not available, or placeholder TBC — **use email only unless client provides number**

---

## New Components

| Component | Purpose |
|-----------|---------|
| `MarketingCarousel` | Shared carousel shell: dots, arrows, swipe, reduced-motion fallback |
| `ProblemCarousel` | Auto-advance config, 4 problem slides |
| `HowItWorksCarousel` | Manual navigation, 4 step slides with images |
| `VerifiedPartnerCard` | Spotlight card for home + optional reuse on `/venues` |
| `PartnerContactForm` | Form with mailto submit + validation |
| `SafetyFeatureGrid` | Icon + copy + optional thumbnail grid |

**Dependencies:** No new npm packages. Implement swipe with touch events or minimal pointer handling; use existing Tailwind + lucide-react icons.

---

## Copy & Nav Updates

| Location | Change |
|----------|--------|
| `MarketingHeader` | "For Venues" link → `/venues` or `#verified-partners` (keep `/venues` for dedicated funnel) |
| `MarketingFooter` | Same; ensure "For Venues" still points to `/venues` |
| Home secondary CTA | "Become a Verified Partner" |
| All public pricing | Removed from home and `/venues` |

---

## Placeholder Content

All images: curated Unsplash URLs (nightlife, Joburg-adjacent, clubs, festivals).  
All partner names: fictional or generic Joburg venue archetypes (e.g. The Orbit-style jazz club, rooftop bar, host collective) — clearly mock until real partners onboard.

---

## Testing Checklist

- [ ] Home scroll narrative reads well on mobile and desktop
- [ ] Problem carousel auto-advances; pauses on hover; reduced-motion fallback works
- [ ] How it Works carousel swipes on mobile; arrows work on desktop
- [ ] No Rand amounts or "from R…" copy anywhere on marketing pages
- [ ] Download section shows iOS only + web app CTA for Android; no Play Store badge
- [ ] `/venues` form validates required fields and opens mailto with encoded body
- [ ] Business contact details visible below form
- [ ] All section anchor links in header/footer still resolve
- [ ] `npm run build` passes

---

## File Touch List

- `src/pages/marketing/MarketingHomePage.tsx` — major restructure
- `src/pages/marketing/VenuesPage.tsx` — funnel + form
- `src/components/marketing/MarketingCarousel.tsx` — new
- `src/components/marketing/ProblemCarousel.tsx` — new
- `src/components/marketing/HowItWorksCarousel.tsx` — new
- `src/components/marketing/VerifiedPartnerCard.tsx` — new
- `src/components/marketing/PartnerContactForm.tsx` — new
- `src/components/marketing/SafetyFeatureGrid.tsx` — new
- `src/components/MarketingHeader.tsx` — minor copy/link tweaks if needed
- `src/components/MarketingFooter.tsx` — minor copy if needed

---

## Open Items

- [ ] Confirm phone number for business details block (email-only acceptable for v1)
- [ ] Approve mock partner names/archetypes before implementation
