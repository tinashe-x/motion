import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, SwitchCamera } from 'lucide-react'
import { events as allEvents, getEvent, getVenue } from '@/data/mock'
import { useAppState } from '@/context/AppState'
import { useCamera } from '@/hooks/useCamera'
import {
  distanceMetres,
  isHeicFile,
  isWithinEventWindow,
} from '@/lib/geo'
import type { MoodTag } from '@/types'
import { cn } from '@/lib/cn'

const moods: MoodTag[] = [
  'Exciting',
  'Energy',
  'Chill',
  'Lively',
  'Crowded',
  'Relaxed',
]

export function VerifyPhotoPage() {
  const { id } = useParams()
  const initialEvent = getEvent(id ?? '')
  const { submitPhoto, pushToast } = useAppState()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [preview, setPreview] = useState<string | null>(null)
  const [eventId, setEventId] = useState(initialEvent?.id ?? '')
  const [eventQuery, setEventQuery] = useState('')
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState<MoodTag[]>([])
  const [verified, setVerified] = useState(false)
  const [geoDenied, setGeoDenied] = useState(false)
  const [facing, setFacing] = useState<'environment' | 'user'>('environment')
  const { videoRef, ready, error: cameraError, capture, stop } = useCamera(facing)

  const event = getEvent(eventId)
  const venue = event ? getVenue(event.venueId) : undefined

  const eventOptions = useMemo(() => {
    const q = eventQuery.toLowerCase()
    return allEvents.filter(
      (e) =>
        e.status === 'approved' &&
        (e.name.toLowerCase().includes(q) ||
          getVenue(e.venueId)?.name.toLowerCase().includes(q)),
    )
  }, [eventQuery])

  useEffect(() => () => stop(), [stop])

  const onFile = (file?: File | null) => {
    if (!file) return
    if (isHeicFile(file)) {
      pushToast('HEIC not supported — please use JPEG or PNG')
      return
    }
    setPreview(URL.createObjectURL(file))
  }

  const handleCapture = () => {
    const dataUrl = capture()
    if (dataUrl) setPreview(dataUrl)
    else fileRef.current?.click()
  }

  const toggleTag = (tag: MoodTag) => {
    setTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag)
      if (prev.length >= 2) return prev
      return [...prev, tag]
    })
  }

  const runGeoCheck = () => {
    if (!event || !venue) return
    if (!navigator.geolocation) {
      setVerified(false)
      setGeoDenied(true)
      setStep(3)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const dist = distanceMetres(
          pos.coords.latitude,
          pos.coords.longitude,
          venue.latitude,
          venue.longitude,
        )
        const inWindow = isWithinEventWindow(event.startTime, event.endTime)
        setVerified(dist <= 150 && inWindow)
        setGeoDenied(false)
        setStep(3)
      },
      () => {
        setVerified(false)
        setGeoDenied(true)
        setStep(3)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!preview || !eventId) return
    submitPhoto({
      eventId,
      photoUrl: preview,
      caption,
      moodTags: tags,
      latitude: venue?.latitude ?? 0,
      longitude: venue?.longitude ?? 0,
      isVerified: verified,
    })
    setStep(4)
  }

  if (!initialEvent) {
    return (
      <div className="p-6 text-center text-sm text-muted">
        Event not found.{' '}
        <Link to="/app/home" className="text-accent">
          Back
        </Link>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-2xl font-bold">Moment submitted</h1>
        <p className="mt-3 text-sm text-muted">
          {verified
            ? 'Your photo was marked verified.'
            : 'Submitted without verification.'}
        </p>
        <button
          type="button"
          onClick={() => navigate(`/app/event/${eventId}`)}
          className="mt-8 min-h-11 rounded-full gradient-brand px-6 text-sm font-semibold"
        >
          Back to Event
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-black">
      {step === 1 ? (
        <div className="relative flex min-h-dvh flex-col md:grid md:min-h-dvh md:grid-cols-2">
          <div className="relative flex flex-1 flex-col md:min-h-full">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4">
            <Link
              to={`/app/event/${eventId}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-black/40"
            >
              <ArrowLeft size={18} />
            </Link>
            <button
              type="button"
              onClick={() =>
                setFacing((f) => (f === 'environment' ? 'user' : 'environment'))
              }
              className="grid h-11 w-11 place-items-center rounded-full bg-black/40"
              aria-label="Flip camera"
            >
              <SwitchCamera size={18} />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black">
            {preview ? (
              <img src={preview} alt="" className="max-h-full w-full object-contain" />
            ) : ready ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            ) : (
              <p className="px-6 text-center text-sm text-muted">
                {cameraError ?? 'Starting camera…'}
              </p>
            )}
          </div>
          <div className="safe-bottom flex items-center justify-center gap-6 bg-black/80 px-6 py-6">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              className="hidden"
              onChange={(e) => onFile(e.target.files?.[0])}
            />
            {preview ? (
              <>
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="min-h-11 rounded-full border border-white/20 px-5 text-sm"
                >
                  Retake
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="min-h-11 rounded-full gradient-brand px-5 text-sm font-semibold"
                >
                  Use Photo
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCapture}
                  className="h-20 w-20 rounded-full border-4 border-white/80 bg-white/20"
                  aria-label="Capture"
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="text-sm text-muted underline"
                >
                  Upload file
                </button>
              </>
            )}
          </div>
          </div>
          <aside className="hidden flex-col justify-center border-l border-white/10 bg-[#121218] p-8 md:flex lg:p-12">
            <h2 className="font-heading text-2xl font-bold">Verify your moment</h2>
            <p className="mt-3 text-sm text-muted">
              Capture a live photo at the event. Motion checks your location and
              the event time window to mark it verified.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li>• Stay within the venue geofence</li>
              <li>• Post during the event window</li>
              <li>• JPEG or PNG only — no HEIC</li>
            </ul>
          </aside>
        </div>
      ) : null}

      {step === 2 ? (
        <form
          className="app-shell mx-auto max-w-2xl space-y-4 py-6 md:max-w-3xl lg:py-10 xl:max-w-4xl"
          onSubmit={(e) => {
            e.preventDefault()
            runGeoCheck()
          }}
        >
          <h1 className="font-heading text-2xl font-bold">Tag your moment</h1>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Event</span>
            <input
              value={eventQuery}
              onChange={(e) => setEventQuery(e.target.value)}
              placeholder="Search events…"
              className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none"
            />
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none"
            >
              {eventOptions.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} · {getVenue(e.venueId)?.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted">Caption</span>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-surface-2 px-3 py-3 outline-none"
            />
          </label>
          <div>
            <p className="mb-2 text-sm text-muted">Mood tags (max 2)</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'min-h-10 rounded-full px-3 text-sm',
                    tags.includes(tag)
                      ? 'gradient-brand'
                      : 'border border-white/15 text-muted',
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="min-h-11 w-full rounded-full gradient-brand text-sm font-semibold"
          >
            Continue to verification
          </button>
        </form>
      ) : null}

      {step === 3 ? (
        <form onSubmit={onSubmit} className="app-shell mx-auto max-w-2xl space-y-4 py-6 md:max-w-3xl lg:py-10 xl:max-w-4xl">
          <h1 className="font-heading text-2xl font-bold">Verification</h1>
          {verified ? (
            <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              You appear to be at {venue?.name} during the event window. This
              photo is eligible to be marked verified.
            </p>
          ) : (
            <p className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              {geoDenied
                ? "This photo can't be verified because location access was denied — it will still be submitted, but marked as unverified."
                : "This photo can't be verified because you don't appear to be at the venue right now — it will still be submitted, but marked as unverified."}
            </p>
          )}
          {geoDenied ? (
            <button
              type="button"
              onClick={runGeoCheck}
              className="min-h-11 w-full rounded-full border border-white/15 text-sm"
            >
              Retry location
            </button>
          ) : null}
          <button
            type="submit"
            className="min-h-11 w-full rounded-full gradient-brand text-sm font-semibold"
          >
            Submit photo
          </button>
        </form>
      ) : null}
    </div>
  )
}
