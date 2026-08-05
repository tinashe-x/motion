import { Link } from 'react-router-dom'
import { ShieldCheck, Smartphone } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/Skeleton'
import { ProblemCarousel } from '@/components/marketing/ProblemCarousel'
import { HowItWorksCarousel } from '@/components/marketing/HowItWorksCarousel'
import { JoinTheWaveGallery } from '@/components/marketing/JoinTheWaveGallery'
import { SafetyFeatureGrid } from '@/components/marketing/SafetyFeatureGrid'
import {
  VerifiedPartnerCard,
  type VerifiedPartner,
} from '@/components/marketing/VerifiedPartnerCard'

const heroPhotos = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop',
]

const verifiedPartners: VerifiedPartner[] = [
  {
    name: 'The Orbit',
    type: 'venue',
    tagline: 'Live jazz & late-night energy in Braamfontein.',
    imageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
  },
  {
    name: 'Skyline Sessions',
    type: 'host',
    tagline: 'Rooftop amapiano takeovers across the inner city.',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
  },
  {
    name: 'District One',
    type: 'venue',
    tagline: 'Warehouse parties with verified crowd signals.',
    imageUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
  },
  {
    name: 'Pulse Collective',
    type: 'host',
    tagline: 'Curated nightlife pop-ups from Melville to Maboneng.',
    imageUrl:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
  },
  {
    name: 'Neon Yard',
    type: 'venue',
    tagline: 'Open-air sets and festival energy every weekend.',
    imageUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
  },
  {
    name: 'Afterglow Events',
    type: 'host',
    tagline: 'Verified hosts bringing the wave to new corners of Jozi.',
    imageUrl:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
  },
]

export function MarketingHomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 animate-gradient-shift bg-[linear-gradient(135deg,rgba(74,0,224,0.35),rgba(142,45,226,0.15),rgba(74,0,224,0.25))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,0,224,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(142,45,226,0.2),_transparent_45%)]" />
        <div className="hero-grid-overlay animate-grid-scroll pointer-events-none absolute inset-0 opacity-30" />
        <div className="animate-orb-drift pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-orb-drift-reverse pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
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

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {heroPhotos.map((src, i) => (
                <div
                  key={src}
                  className="stagger-fade-up overflow-hidden rounded-xl border border-white/10"
                  style={{ animationDelay: `${0.12 * i}s` }}
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#download"
                className="shimmer-overlay rounded-full gradient-brand px-6 py-3 text-sm font-semibold shadow-[0_0_30px_rgba(74,0,224,0.4)]"
              >
                Get the App
              </a>
              <Link
                to="/venues"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 hover:border-accent/50 hover:text-accent"
              >
                Become a Verified Partner
              </Link>
            </div>
            <p className="text-sm text-white/50">
              See the vibe. Live the moment.
            </p>
          </div>

          <div className="animate-fade-up relative mx-auto w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg lg:ml-auto">
            <div className="animate-float-slow relative">
              <div className="absolute -inset-8 animate-pulse-glow rounded-full bg-primary/30 blur-3xl" />
              <div className="shimmer-overlay relative overflow-hidden rounded-[2rem] border border-white/15 bg-[#15151c] p-3 shadow-[0_30px_80px_rgba(74,0,224,0.35)]">
              <div className="overflow-hidden rounded-[1.5rem] bg-surface">
                <div className="flex items-center justify-between px-4 pt-4">
                  <span className="font-heading text-sm font-semibold">Tonight</span>
                  <span className="animate-pulse-glow rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-[10px] font-bold text-black">
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
                    <span className="animate-meter-pulse font-heading text-sm font-bold text-accent">88</span>
                  </div>
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
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Still scrolling for the vibe?
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Nightlife decisions shouldn&apos;t be guesswork.
            </p>
          </div>
          <div className="mt-10 w-full">
            <ProblemCarousel />
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
            <div className="mt-10">
              <HowItWorksCarousel />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="safety" className="scroll-mt-24 border-y border-white/5 bg-[#121218] py-20">
          <div className="marketing-shell grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <ShieldCheck size={14} /> Safety First
              </div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Built for Joburg nights — not just hype.
              </h2>
              <p className="mt-4 text-muted">
                Safety isn&apos;t a footnote. It&apos;s built into every listing,
                photo, and signal on Motion — so you can make the call with
                confidence.
              </p>
              <div className="mt-8">
                <SafetyFeatureGrid />
              </div>
            </div>
            <blockquote className="rounded-3xl border border-secondary/30 bg-gradient-to-br from-primary/30 to-secondary/10 p-8 glow-card lg:sticky lg:top-28">
              <p className="font-heading text-2xl font-semibold leading-snug">
                &ldquo;78% of Johannesburg residents cite safety as their top
                nightlife concern — Motion was built to change that.&rdquo;
              </p>
            </blockquote>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="verified-partners" className="scroll-mt-24 py-20">
          <div className="marketing-shell">
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Verified Hosts & Venues
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Trusted partners putting real nights on the map — seen by people
              already out across Johannesburg.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {verifiedPartners.map((partner) => (
                <VerifiedPartnerCard key={partner.name} partner={partner} />
              ))}
            </div>
            <Link
              to="/venues"
              className="mt-8 inline-flex rounded-full gradient-brand px-6 py-3 text-sm font-semibold"
            >
              Become a Verified Partner
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
            <div className="mt-10">
              <JoinTheWaveGallery />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="download" className="scroll-mt-24 py-20">
          <div className="marketing-shell">
            <div className="shimmer-overlay rounded-3xl border border-secondary/25 bg-gradient-to-br from-primary/25 via-[#15151c] to-secondary/10 p-8 md:p-12 glow-card">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Available on iOS
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                Motion launches native on iPhone first. On Android, open the web
                app and add it to your home screen — full Motion, no app store
                wait.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-xl border border-white/15 bg-black/40 px-5 py-3 text-sm font-semibold text-white/70">
                  App Store — Coming soon
                </span>
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent hover:bg-accent/15"
                >
                  <Smartphone size={16} /> On Android? Open the web app
                </Link>
              </div>
              <div className="mt-8 max-w-md rounded-2xl border border-white/10 bg-black/30 p-5">
                <h3 className="font-heading font-semibold">Add to Home Screen</h3>
                <p className="mt-2 text-sm text-muted">
                  On Android (Chrome): menu → Install app / Add to Home screen.
                  On iOS Safari: Share → Add to Home Screen.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
