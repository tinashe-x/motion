import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { CommitmentsCalendar } from '@/components/social/CommitmentsCalendar'
import { MotionMeter } from '@/components/MotionMeter'
import { useAppState } from '@/context/AppState'
import { formatEventWhen, getVenue } from '@/data/mock'
import type { EventItem } from '@/types'

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function ActivityPage() {
  const { events, attendance, profile, getEventCharge } = useAppState()
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const commitments = useMemo(() => {
    const attendedIds = new Set(
      attendance
        .filter((a) => a.userId === profile.id)
        .map((a) => a.eventId),
    )
    return events.filter(
      (e) =>
        e.hostId === profile.id ||
        attendedIds.has(e.id),
    )
  }, [attendance, events, profile.id])

  const commitmentDates = useMemo(
    () => commitments.map((e) => new Date(e.startTime)),
    [commitments],
  )

  const visible = useMemo(() => {
    let list = [...commitments].sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    if (selectedDay) {
      list = list.filter((e) => sameDay(new Date(e.startTime), selectedDay))
    }
    return list
  }, [commitments, selectedDay])

  const roleLabel = (event: EventItem) => {
    if (event.hostId === profile.id) return 'Hosting'
    const status = attendance.find(
      (a) => a.eventId === event.id && a.userId === profile.id,
    )?.status
    if (status === 'going') return 'Going'
    if (status === 'here_now') return 'Here now'
    if (status === 'saved') return 'Saved'
    return 'Committed'
  }

  return (
    <div className="pb-6 pt-4 md:pt-8">
      <div className="mb-1 flex items-center gap-2">
        <Zap className="text-accent" size={22} />
        <h1 className="font-heading text-2xl font-bold">Activity</h1>
      </div>
      <p className="text-sm text-muted">
        Your events and calendar of commitments — bolts charge the Motion Meter
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <CommitmentsCalendar
          commitmentDates={commitmentDates}
          selected={selectedDay}
          onSelect={setSelectedDay}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">My events</h2>
            {selectedDay ? (
              <button
                type="button"
                onClick={() => setSelectedDay(null)}
                className="text-xs text-accent"
              >
                Clear day filter
              </button>
            ) : null}
          </div>

          {visible.length ? (
            visible.map((event) => {
              const venue = getVenue(event.venueId)
              const charge = getEventCharge(event.id)
              return (
                <Link
                  key={event.id}
                  to={`/app/event/${event.id}`}
                  className="flex gap-3 rounded-2xl border border-white/8 bg-surface-2 p-3 transition hover:border-secondary/40"
                >
                  <img
                    src={event.coverUrl}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-heading font-semibold">
                          {event.name}
                        </p>
                        <p className="text-xs text-muted">
                          {venue?.name} · {formatEventWhen(event.startTime)}
                        </p>
                      </div>
                      <MotionMeter
                        safetyScore={event.safetyScore}
                        popularityScore={event.popularityScore}
                        chargeNormalized={charge.chargeNorm}
                        showFill
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[11px]">
                        {roleLabel(event)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-accent">
                        <Zap size={12} className="fill-accent" />
                        {charge.equivalents} charge
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
              RSVP or host to fill your calendar.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
