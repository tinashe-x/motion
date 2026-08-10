import { Link } from 'react-router-dom'
import type { EventItem } from '@/types'
import { formatEventWhen, getVenue } from '@/data/mock'
import { MotionMeter } from '@/components/MotionMeter'
import { useAppState } from '@/context/AppState'

export function EventCard({ event }: { event: EventItem }) {
  const venue = getVenue(event.venueId)
  const { getEventCharge } = useAppState()
  const { chargeNorm } = getEventCharge(event.id)

  return (
    <Link
      to={`/app/event/${event.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/8 bg-surface-2 glow-card transition hover:border-secondary/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.coverUrl}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute right-3 top-3">
          <MotionMeter
            safetyScore={event.safetyScore}
            popularityScore={event.popularityScore}
            chargeNormalized={chargeNorm}
          />
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
          {event.category}
        </span>
      </div>
      <div className="space-y-1 p-4">
        <h3 className="font-heading text-base font-semibold leading-snug">
          {event.name}
        </h3>
        <p className="text-sm text-muted">{venue?.name}</p>
        <p className="text-xs text-white/60">{formatEventWhen(event.startTime)}</p>
      </div>
    </Link>
  )
}
