import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Camera, Share2, Bookmark } from 'lucide-react'
import { BoltButton, MotionMeter, SafetyBadge } from '@/components/MotionMeter'
import { PhotoPost } from '@/components/PhotoPost'
import { useAppState } from '@/context/AppState'
import { formatEventWhen, getProfile, getVenue } from '@/data/mock'
import { cn } from '@/lib/cn'

type Tab = 'details' | 'map' | 'feed'

export function EventDetailPage() {
  const { id } = useParams()
  const {
    events,
    photos,
    attendance,
    setAttendance,
    pushToast,
    hiddenPhotoIds,
    liveUpdates,
    getEventCharge,
    toggleBolt,
    hasBolted,
    bolts,
  } = useAppState()
  const [tab, setTab] = useState<Tab>('details')
  const event = events.find((e) => e.id === id)
  const venue = event ? getVenue(event.venueId) : undefined
  const joined = attendance.some(
    (a) => a.eventId === event?.id && a.status === 'going',
  )
  const saved = attendance.some(
    (a) => a.eventId === event?.id && a.status === 'saved',
  )

  const livePhotos = useMemo(
    () =>
      photos.filter(
        (p) =>
          p.eventId === event?.id &&
          !p.isFlagged &&
          !hiddenPhotoIds.includes(p.id),
      ),
    [photos, event?.id, hiddenPhotoIds],
  )

  const updates = useMemo(
    () =>
      liveUpdates
        .filter((u) => u.eventId === event?.id)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [liveUpdates, event?.id],
  )

  const charge = event ? getEventCharge(event.id) : null
  const eventBoltCount = event
    ? bolts.filter((b) => b.targetType === 'event' && b.targetId === event.id)
        .length
    : 0
  const bolted = event ? hasBolted('event', event.id) : false

  if (!event) {
    return (
      <div className="p-6 text-center text-sm text-muted">
        Event not found.{' '}
        <Link to="/app/home" className="text-accent">
          Back home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="relative">
        <img
          src={event.coverUrl}
          alt=""
          className="h-52 w-full object-cover md:h-80 lg:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-black/30" />
        <Link
          to="/app/home"
          className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 backdrop-blur"
        >
          <ArrowLeft size={18} />
        </Link>
        {charge ? (
          <div className="absolute right-4 top-4">
            <MotionMeter
              safetyScore={event.safetyScore}
              popularityScore={event.popularityScore}
              chargeNormalized={charge.chargeNorm}
              size="md"
            />
          </div>
        ) : null}
      </div>

      <div className="pb-8">
        <div className="flex gap-1 rounded-full border border-white/10 bg-surface-2 p-1 md:max-w-xl">
          {(
            [
              ['details', 'Event Details'],
              ['map', 'Map View'],
              ['feed', 'Live Feed'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                'min-h-10 flex-1 rounded-full px-2 text-xs font-semibold',
                tab === key ? 'gradient-brand' : 'text-muted',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'details' ? (
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-4">
              <div>
                <span className="rounded-full bg-primary/25 px-2.5 py-1 text-[11px] font-medium">
                  {event.category}
                </span>
                <h1 className="mt-3 font-heading text-2xl font-bold">
                  {event.name}
                </h1>
                <p className="mt-1 text-sm text-muted">
                  {formatEventWhen(event.startTime)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <SafetyBadge score={event.safetyScore} />
                <BoltButton
                  active={bolted}
                  count={eventBoltCount}
                  onClick={() => toggleBolt('event', event.id)}
                  size="md"
                />
              </div>
              <p className="text-sm leading-relaxed text-white/80">
                {event.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => pushToast('Share link copied (mock)')}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 text-sm sm:flex-none sm:px-5"
                >
                  <Share2 size={16} /> Share
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance(event.id, 'saved')}
                  className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 text-sm sm:flex-none sm:px-5"
                >
                  <Bookmark size={16} /> {saved ? 'Saved' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance(event.id, 'going')}
                  className="inline-flex min-h-11 flex-[1.4] items-center justify-center rounded-full gradient-brand text-sm font-semibold sm:flex-none sm:px-6"
                >
                  {joined ? 'Joined' : 'Join Event'}
                </button>
              </div>
            </div>
            <div className="h-fit rounded-2xl border border-white/8 bg-surface-2 p-4">
              <p className="font-heading font-semibold">Venue Information</p>
              <p className="mt-2 text-sm">{venue?.name}</p>
              <p className="text-sm text-muted">{venue?.address}</p>
              <p className="mt-1 text-sm text-muted">{venue?.contactInfo}</p>
            </div>
          </div>
        ) : null}

        {tab === 'map' ? (
          <div className="mt-5 space-y-4">
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(74,0,224,0.35),#14141a)]">
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(255,215,0,0.7)]" />
              <p className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs text-muted backdrop-blur">
                {venue?.name} · mock pin
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${venue?.latitude},${venue?.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full gradient-brand text-sm font-semibold"
            >
              Get Directions
            </a>
          </div>
        ) : null}

        {tab === 'feed' ? (
          <div className="relative mt-5 space-y-4 pb-16 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-semibold">
                Real-Time Vibe
              </h2>
              {livePhotos.length ? (
                livePhotos.map((photo) => (
                  <PhotoPost key={photo.id} photo={photo} />
                ))
              ) : (
                <p className="text-sm text-muted">No live photos yet.</p>
              )}
            </div>
            <div className="h-fit space-y-4">
              <div className="rounded-2xl border border-white/8 bg-surface p-4">
                <h3 className="font-heading font-semibold">Live updates</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {updates.length ? (
                    updates.map((u) => {
                      const actor = getProfile(u.actorId)
                      return (
                        <li key={u.id} className="flex gap-2">
                          <img
                            src={actor?.avatarUrl}
                            alt=""
                            className="mt-0.5 h-6 w-6 rounded-full object-cover"
                          />
                          <span>
                            <span className="text-white/90">{u.text}</span>
                          </span>
                        </li>
                      )
                    })
                  ) : (
                    <li>No live updates yet — bolt, comment, or join.</li>
                  )}
                </ul>
              </div>
            </div>
            <Link
              to={`/app/event/${event.id}/verify`}
              className="fixed bottom-24 right-4 z-30 grid h-14 w-14 place-items-center rounded-full gradient-brand shadow-[0_10px_30px_rgba(74,0,224,0.45)] md:bottom-8 md:right-8"
              aria-label="Verify photo"
            >
              <Camera size={22} />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
