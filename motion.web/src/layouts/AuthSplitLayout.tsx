import type { ReactNode } from 'react'
import { MotionLogo } from '@/components/MotionLogo'
import { Camera, MapPin, ShieldCheck } from 'lucide-react'

const highlights = [
  { icon: MapPin, text: 'Discover live events across Johannesburg' },
  { icon: Camera, text: 'Verified photos from people already there' },
  { icon: ShieldCheck, text: 'Safety signals built into every night out' },
]

export function AuthSplitLayout({
  children,
  headline = 'See the vibe. Live the moment.',
  subline = 'Real-time nightlife intelligence — verified by the crowd.',
}: {
  children: ReactNode
  headline?: string
  subline?: string
}) {
  return (
    <div className="grid min-h-dvh md:grid-cols-2 xl:grid-cols-[1.05fr_0.95fr]">
      <aside className="relative hidden overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_rgba(74,0,224,0.45),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(142,45,226,0.3),_transparent_50%),#121218] md:flex md:flex-col md:justify-between md:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <MotionLogo size="xl" />
        <div className="relative max-w-lg">
          <h2 className="font-heading text-3xl font-bold leading-tight lg:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-base text-muted lg:text-lg">{subline}</p>
          <ul className="mt-8 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm text-white/85">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10">
                  <Icon size={16} className="text-accent" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-muted">Johannesburg · South Africa</p>
      </aside>
      <div className="flex min-h-dvh flex-col">{children}</div>
    </div>
  )
}
