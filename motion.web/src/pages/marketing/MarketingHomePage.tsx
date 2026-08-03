import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Radio,
  Camera,
  MapPin,
  Sparkles,
  Smartphone,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/Skeleton'

const problems = [
  {
    title: "You don't know what's actually happening tonight",
    body: 'Plans die in group chats. Motion shows live energy before you commit.',
  },
  {
    title: 'Social media shows you yesterday, not right now',
    body: 'Feeds lag. Verified, geofenced moments keep Motion in the present.',
  },
  {
    title: 'Safety is always a question mark',
    body: 'Crowd signals and reputation scores put safety on the main stage.',
  },
]

const steps = [
  {
    icon: MapPin,
    title: 'Discover nearby',
    body: 'Browse the map and home feed for concerts, clubs, and gatherings around Joburg.',
  },
  {
    icon: Radio,
    title: 'Check the Motion Meter',
    body: 'Live energy, safety, and crowd signals from people already there.',
  },
  {
    icon: Camera,
    title: 'See verified photos',
    body: 'Geofenced, timestamped shots from attendees — not marketing stills.',
  },
  {
    icon: Sparkles,
    title: 'Join & share',
    body: 'RSVP, show up, then drop your own verified moment into the wave.',
  },
]

const tiers = [
  {
    name: 'Basic Listing',
    price: 'Free',
    blurb: 'Verification badge, 48hr listing, up to 5 photos.',
  },
  {
    name: 'Spotlight',
    price: 'from R499/event',
    blurb: 'Motion Meter inclusion, 7-day promo, push to nearby users.',
  },
  {
    name: 'Platinum',
    price: 'from R2,999/event',
    blurb: 'Priority placement, dedicated spotlight, performance dashboard.',
  },
]

export function MarketingHomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,0,224,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(142,45,226,0.2),_transparent_45%)]" />
        <div className="relative marketing-shell grid items-center gap-12 py-16 md:grid-cols-2 md:py-24 lg:gap-16 xl:gap-24">
          <div className="animate-fade-up space-y-6">
            <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Motion
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Verified, real-time nightlife intelligence.
            </h1>
            <p className="max-w-lg text-lg text-muted">
              Motion shows you what&apos;s actually happening right now —
              verified by the people already there.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#download"
                className="rounded-full gradient-brand px-6 py-3 text-sm font-semibold shadow-[0_0_30px_rgba(74,0,224,0.4)]"
              >
                Get the App
              </a>
              <a
                href="#venues"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 hover:border-accent/50 hover:text-accent"
              >
                For Venues & Hosts
              </a>
            </div>
            <p className="text-sm text-white/50">
              See the vibe. Live the moment.
            </p>
          </div>

          <div className="animate-fade-up relative mx-auto w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg lg:ml-auto">
            <div className="absolute -inset-8 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#15151c] p-3 shadow-[0_30px_80px_rgba(74,0,224,0.35)]">
              <div className="overflow-hidden rounded-[1.5rem] bg-surface">
                <div className="flex items-center justify-between px-4 pt-4">
                  <span className="font-heading text-sm font-semibold">Tonight</span>
                  <span className="rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-[10px] font-bold text-black">
                    LIVE
                  </span>
                </div>
                <div className="m-3 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=320&fit=crop"
                    alt="Nightlife event preview"
                    className="h-40 w-full object-cover"
                  />
                </div>
                <div className="space-y-2 px-4 pb-5">
                  <p className="font-heading font-semibold">Amapiano Fridays Live</p>
                  <p className="text-xs text-muted">The Orbit · Braamfontein</p>
                  <div className="mt-3 flex items-center justify-between rounded-xl border border-secondary/30 bg-secondary/10 px-3 py-2">
                    <span className="text-xs text-white/70">Motion Meter</span>
                    <span className="font-heading text-sm font-bold text-accent">88</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
      <section className="border-y border-white/5 bg-[#121218] py-20">
        <div className="marketing-shell">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">The Problem</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Nightlife decisions shouldn&apos;t be guesswork.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {problems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/8 bg-surface-2 p-6 glow-card"
              >
                <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section id="how-it-works" className="scroll-mt-24 py-20">
        <div className="marketing-shell">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">How Motion Works</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Four steps from discovery to a verified moment on the floor.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <article
                key={step.title}
                className="rounded-2xl border border-white/8 bg-surface p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl gradient-brand">
                  <step.icon size={20} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section id="safety" className="scroll-mt-24 border-y border-white/5 bg-[#121218] py-20">
        <div className="marketing-shell grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <ShieldCheck size={14} /> Safety First
            </div>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Built for Joburg nights — not just hype.
            </h2>
            <p className="mt-4 text-muted">
              Safety Score, user reputation, geofenced photo verification, and
              anonymous crowd signals keep accountability in the room.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>• Community-driven reputation (Motion-me trust score)</li>
              <li>• Photos verified by location + time window</li>
              <li>• Anonymous safety signals that update the Motion Meter</li>
            </ul>
          </div>
          <blockquote className="rounded-3xl border border-secondary/30 bg-gradient-to-br from-primary/30 to-secondary/10 p-8 glow-card">
            <p className="font-heading text-2xl font-semibold leading-snug">
              &ldquo;78% of Johannesburg residents cite safety as their top
              nightlife concern — Motion was built to change that.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section id="venues" className="scroll-mt-24 py-20">
        <div className="marketing-shell">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            For Venues & Hosts
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Put your night in front of people who are already out — with
            promotion tiers that scale.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-2xl border border-white/8 bg-surface-2 p-6 glow-card"
              >
                <h3 className="font-heading text-xl font-semibold">{tier.name}</h3>
                <p className="mt-2 font-heading text-lg text-accent">{tier.price}</p>
                <p className="mt-3 text-sm text-muted">{tier.blurb}</p>
              </article>
            ))}
          </div>
          <Link
            to="/venues"
            className="mt-8 inline-flex rounded-full gradient-brand px-6 py-3 text-sm font-semibold"
          >
            Become a Partner Venue
          </Link>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section id="community" className="border-y border-white/5 bg-[#121218] py-20">
        <div className="marketing-shell">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Join the Wave</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Real user photos and captions from nights across the city.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {[
              'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop',
              'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
              'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop',
              'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=500&fit=crop',
            ].map((src, i) => (
              <figure
                key={src}
                className="overflow-hidden rounded-2xl border border-white/8"
              >
                <img src={src} alt="" className="aspect-[4/5] w-full object-cover" />
                <figcaption className="bg-surface-2 px-3 py-2 text-xs text-muted">
                  {['Packed floor', 'Lights up', 'Soundcheck', 'Festival warm-up'][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section id="download" className="scroll-mt-24 py-20">
        <div className="marketing-shell">
          <div className="rounded-3xl border border-secondary/25 bg-gradient-to-br from-primary/25 via-[#15151c] to-secondary/10 p-8 md:p-12 glow-card">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Available on Android and iOS
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Download the native app when it ships — or open Motion as a PWA and
              add it to your home screen tonight.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-xl border border-white/15 bg-black/40 px-5 py-3 text-sm font-semibold text-white/70">
                App Store — Coming soon
              </span>
              <span className="rounded-xl border border-white/15 bg-black/40 px-5 py-3 text-sm font-semibold text-white/70">
                Google Play — Coming soon
              </span>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-xl gradient-brand px-5 py-3 text-sm font-semibold"
              >
                <Smartphone size={16} /> Open Web App
              </Link>
            </div>
            <div className="mt-8 max-w-md rounded-2xl border border-white/10 bg-black/30 p-5">
              <h3 className="font-heading font-semibold">Add to Home Screen</h3>
              <p className="mt-2 text-sm text-muted">
                In Chrome (Android): menu → Install app / Add to Home screen. On
                iOS Safari: Share → Add to Home Screen.
              </p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </>
  )
}
