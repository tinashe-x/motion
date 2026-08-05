import { BadgeCheck, Camera, Shield, Users } from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Geofenced photo verification',
    body: 'On-site, in-window shots only — no recycled promo stills.',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=240&fit=crop',
  },
  {
    icon: Users,
    title: 'Motion-me trust score',
    body: 'Community reputation built over time from real nights out.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=240&fit=crop',
  },
  {
    icon: Shield,
    title: 'Live Safety Score',
    body: 'Anonymous crowd signals that update the Motion Meter in real time.',
    image:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=240&fit=crop',
  },
  {
    icon: BadgeCheck,
    title: 'Verified venue partners',
    body: 'Badge-backed listings from hosts and venues you can trust.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=240&fit=crop',
  },
]

export function SafetyFeatureGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="overflow-hidden rounded-2xl border border-white/8 bg-surface-2 glow-card"
        >
          <div className="relative h-32 overflow-hidden">
            <img
              src={feature.image}
              alt=""
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-2 to-transparent" />
            <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl gradient-brand">
              <feature.icon size={18} />
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm text-muted">{feature.body}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
