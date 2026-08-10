import { useMemo } from 'react'
import { EventCard } from '@/components/EventCard'
import { EventCardSkeleton } from '@/components/ui/Skeleton'
import { useAppState } from '@/context/AppState'
import { useMockLoading } from '@/hooks/useMockLoading'

export function CommunityPage() {
  const { events, getEventCharge } = useAppState()
  const loading = useMockLoading()

  const popping = useMemo(() => {
    return events
      .filter((e) => e.status === 'approved')
      .map((event) => ({ event, charge: getEventCharge(event.id) }))
      .sort((a, b) => {
        if (b.charge.score !== a.charge.score)
          return b.charge.score - a.charge.score
        return b.event.popularityScore - a.event.popularityScore
      })
  }, [events, getEventCharge])

  return (
    <div className="pb-6 pt-4 md:pt-8">
      <h1 className="font-heading text-2xl font-bold">Community</h1>
      <p className="mt-1 text-sm text-muted">
        What’s popping now — ranked by Motion Meter charge
        <span className="text-white/40"> · vibe tracker coming</span>
      </p>

      {loading ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : popping.length ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popping.map(({ event }, index) => (
            <div key={event.id} className="relative">
              {index < 3 ? (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold text-accent backdrop-blur">
                  #{index + 1} popping
                </span>
              ) : null}
              <EventCard event={event} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
          Nothing popping yet — check back as nights get charged.
        </p>
      )}
    </div>
  )
}
