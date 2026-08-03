import { Camera, MapPin, Radio, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/cn'

const visuals = [
  {
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    alt: 'Concert crowd with stage lights',
    overlay: 'from-[#0e0e12]/20 via-[#4A00E0]/40 to-[#8E2DE2]/50',
  },
  {
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    alt: 'Live nightlife moment',
    overlay: 'from-[#0e0e12]/10 via-[#4A00E0]/35 to-[#121218]/80',
  },
  {
    image:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop',
    alt: 'Festival crowd at golden hour',
    overlay: 'from-[#0e0e12]/30 via-primary/45 to-secondary/40',
  },
] as const

export function OnboardingVisual({ slideIndex }: { slideIndex: number }) {
  const visual = visuals[slideIndex] ?? visuals[0]

  return (
    <div
      className={cn(
        'relative mb-8 overflow-hidden rounded-3xl border border-white/10 glow-card animate-fade-up',
        'aspect-[4/3] w-full md:aspect-[16/10] md:h-auto lg:aspect-[16/9]',
      )}
    >
      <img
        src={visual.image}
        alt={visual.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          visual.overlay,
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.12),transparent_40%)]" />

      {slideIndex === 0 ? <DiscoverOverlay /> : null}
      {slideIndex === 1 ? <VibeOverlay /> : null}
      {slideIndex === 2 ? <TrustOverlay /> : null}
    </div>
  )
}

function DiscoverOverlay() {
  return (
    <>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
        <MapPin size={12} className="text-accent" />
        Joburg · 12 events nearby
      </div>

      <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:grid-cols-2">
        <article className="rounded-2xl border border-white/15 bg-black/50 p-3 backdrop-blur-md">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-heading text-sm font-semibold">Amapiano Fridays</p>
              <p className="mt-0.5 text-[11px] text-white/70">The Orbit · Braamfontein</p>
            </div>
            <span className="rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-bold text-black">
              LIVE
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-white/10 px-2.5 py-1.5">
            <span className="text-[10px] text-white/70">Motion Meter</span>
            <span className="font-heading text-sm font-bold text-accent">88</span>
          </div>
        </article>

        <article className="hidden rounded-2xl border border-white/15 bg-black/50 p-3 backdrop-blur-md sm:block">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-heading text-sm font-semibold">Roof Top Session</p>
              <p className="mt-0.5 text-[11px] text-white/70">Sandton · 2.1 km</p>
            </div>
            <Radio size={14} className="shrink-0 text-primary" />
          </div>
          <div className="mt-2 flex gap-1.5">
            {['Concert', 'Chill'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>

      <span className="absolute right-[18%] top-[38%] grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-primary shadow-[0_0_20px_rgba(74,0,224,0.8)]">
        <MapPin size={14} className="text-accent" />
      </span>
      <span className="absolute right-[42%] top-[52%] h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(255,215,0,0.9)]" />
      <span className="absolute left-[55%] top-[30%] h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(142,45,226,0.8)]" />
    </>
  )
}

function VibeOverlay() {
  return (
    <>
      <div className="absolute left-4 top-4 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-semibold text-accent backdrop-blur-sm">
        Live from the floor
      </div>

      <div className="absolute inset-x-6 bottom-5 flex items-end justify-center gap-3">
        <figure className="w-[28%] rotate-[-6deg] overflow-hidden rounded-xl border border-white/20 bg-black/40 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=380&fit=crop"
            alt=""
            className="aspect-[3/4] w-full object-cover"
          />
        </figure>
        <figure className="relative z-10 w-[36%] overflow-hidden rounded-2xl border-2 border-accent/50 bg-black/50 shadow-[0_20px_40px_rgba(74,0,224,0.45)]">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=360&h=440&fit=crop"
            alt=""
            className="aspect-[3/4] w-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-2.5 pb-2.5 pt-8">
            <p className="text-[10px] font-semibold text-white">Packed dance floor 🔥</p>
            <p className="text-[9px] text-white/60">2 min ago · verified</p>
          </figcaption>
        </figure>
        <figure className="w-[28%] rotate-[6deg] overflow-hidden rounded-xl border border-white/20 bg-black/40 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=380&fit=crop"
            alt=""
            className="aspect-[3/4] w-full object-cover"
          />
        </figure>
      </div>

      <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md">
        <Camera size={16} className="text-white" />
      </div>
    </>
  )
}

function TrustOverlay() {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-44 w-44 rounded-full border-2 border-dashed border-accent/50 md:h-52 md:w-52">
          <div className="absolute inset-3 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck size={40} className="text-accent drop-shadow-[0_0_16px_rgba(255,215,0,0.5)]" />
          </div>
        </div>
      </div>

      <div className="absolute left-4 top-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 backdrop-blur-md">
        <p className="text-[11px] font-semibold text-emerald-200">Location verified</p>
        <p className="text-[10px] text-emerald-100/70">Inside venue · on time</p>
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-black/55 p-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=120&h=120&fit=crop"
            alt=""
            className="h-12 w-12 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-semibold">Geofenced moment</p>
            <p className="text-[11px] text-white/65">Timestamped · crowd-verified</p>
          </div>
          <span className="rounded-full gradient-brand px-2.5 py-1 text-[10px] font-bold">
            ✓ Real
          </span>
        </div>
      </div>
    </>
  )
}
