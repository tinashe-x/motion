import { MapPin, Radio, Camera, Sparkles } from 'lucide-react'
import { MarketingCarousel } from '@/components/marketing/MarketingCarousel'

const steps = [
  {
    id: 'discover',
    icon: MapPin,
    title: 'Discover nearby',
    body: 'Browse the map and home feed for concerts, clubs, and gatherings around Joburg.',
    image:
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=900&h=600&fit=crop',
  },
  {
    id: 'meter',
    icon: Radio,
    title: 'Check the Motion Meter',
    body: 'Live energy, safety, and crowd signals from people already there.',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=600&fit=crop',
  },
  {
    id: 'photos',
    icon: Camera,
    title: 'See verified photos',
    body: 'Geofenced, timestamped shots from attendees — not marketing stills.',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&h=600&fit=crop',
  },
  {
    id: 'join',
    icon: Sparkles,
    title: 'Join & share',
    body: 'RSVP, show up, then drop your own verified moment into the wave.',
    image:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&h=600&fit=crop',
  },
]

export function HowItWorksCarousel() {
  return (
    <MarketingCarousel
      ariaLabel="How Motion works"
      autoAdvanceMs={6000}
      centered
      maxWidthClass="max-w-5xl"
      slides={steps.map((step, i) => ({
        id: step.id,
        content: (
          <article className="grid overflow-hidden rounded-2xl border border-white/8 bg-surface glow-card md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[320px]">
              <img
                src={step.image}
                alt=""
                className="carousel-slide-image absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t md:from-black/50 md:to-transparent" />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl gradient-brand">
                <step.icon size={20} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Step {i + 1}
              </p>
              <h3 className="mt-1 font-heading text-2xl font-semibold md:text-3xl">
                {step.title}
              </h3>
              <p className="mt-3 text-muted">{step.body}</p>
            </div>
          </article>
        ),
      }))}
    />
  )
}
