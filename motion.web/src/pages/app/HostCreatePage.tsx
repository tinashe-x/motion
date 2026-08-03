import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import type { EventCategory, PromotionTier } from '@/types'
import { cn } from '@/lib/cn'

const categories: EventCategory[] = [
  'Concert',
  'Networking',
  'Festival',
  'Nightclub',
  'Workshop',
  'Other',
]

const tiers: Array<{
  id: PromotionTier
  name: string
  price: string
  blurb: string
}> = [
  {
    id: 'basic',
    name: 'Basic Listing',
    price: 'Free',
    blurb: 'Verification badge, 48hr listing, up to 5 photos',
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    price: 'R499/event',
    blurb: 'Motion Meter, 7-day promo, unlimited photos, nearby push',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R1,499/event',
    blurb: 'Homepage feature, category takeover, weekly snapshot',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 'R2,999/event',
    blurb: 'Priority placement, 14-day window, monthly dashboard',
  },
]

export function HostCreatePage() {
  const { submitHostEvent } = useAppState()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const [category, setCategory] = useState<EventCategory>('Nightclub')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [promotionTier, setPromotionTier] = useState<PromotionTier>('basic')
  const [verificationRequested, setVerificationRequested] = useState(true)
  const [promoPhotos, setPromoPhotos] = useState<string[]>([])
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submitHostEvent({
      name,
      description: verificationRequested
        ? `${description}\n\nPhoto verification requested.`
        : description,
      venueAddress,
      category,
      startTime: startTime || new Date(Date.now() + 86400000).toISOString(),
      endTime: endTime || new Date(Date.now() + 86400000 * 1.3).toISOString(),
      promotionTier,
      coverUrl: promoPhotos[0],
    })
    setDone(true)
  }

  if (done) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-2xl font-bold">Submitted for review</h1>
        <p className="mt-3 max-w-sm text-sm text-muted">
          Your event has been submitted for review. We&apos;ll notify you once
          it&apos;s approved.
        </p>
        <button
          type="button"
          onClick={() => navigate('/app/host')}
          className="mt-8 min-h-11 rounded-full gradient-brand px-6 text-sm font-semibold"
        >
          Back to Host Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="pb-8 pt-4">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/app/host"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold">Create Event</h1>
          <p className="text-xs text-muted">Step {step} of 3</p>
        </div>
      </header>

      <form onSubmit={onSubmit} className="mx-auto space-y-4 xl:max-w-5xl">
        {step === 1 ? (
          <>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Event Name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Provide Event Details</span>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-surface-2 px-3 py-3 outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Enter Venue Address</span>
              <input
                required
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="mt-1 block text-xs text-muted">
                Geocoding autocomplete comes later.
              </span>
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="min-h-11 w-full rounded-full gradient-brand text-sm font-semibold"
            >
              Continue
            </button>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Start</span>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">End</span>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none"
              />
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="min-h-11 flex-1 rounded-full border border-white/15 text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="min-h-11 flex-1 rounded-full gradient-brand text-sm font-semibold"
              >
                Continue
              </button>
            </div>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div>
              <p className="mb-2 text-sm text-muted">Upload Promotional Photos</p>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? [])
                  files.forEach((f) => {
                    const url = URL.createObjectURL(f)
                    setPromoPhotos((prev) => [...prev, url])
                  })
                }}
                className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-sm"
              />
              {promoPhotos.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {promoPhotos.map((url, i) => (
                    <div key={url} className="relative">
                      <img src={url} alt="" className="h-20 w-20 rounded-lg object-cover" />
                      <button
                        type="button"
                        onClick={() =>
                          setPromoPhotos((prev) => prev.filter((_, j) => j !== i))
                        }
                        className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <label className="flex items-center justify-between rounded-xl border border-white/8 bg-surface px-4 py-3 text-sm">
              <span>
                Photo Verification Request
                <span className="mt-1 block text-xs text-muted">
                  Ensure authenticity for users
                </span>
              </span>
              <input
                type="checkbox"
                checked={verificationRequested}
                onChange={(e) => setVerificationRequested(e.target.checked)}
                className="h-5 w-5 accent-primary"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setPromotionTier(tier.id)}
                  className={cn(
                    'w-full rounded-2xl border p-4 text-left',
                    promotionTier === tier.id
                      ? 'border-secondary/50 bg-primary/20'
                      : 'border-white/8 bg-surface-2',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-heading font-semibold">{tier.name}</p>
                    <p className="text-sm text-accent">{tier.price}</p>
                  </div>
                  <p className="mt-2 text-xs text-muted">{tier.blurb}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-11 flex-1 rounded-full border border-white/15 text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                className="min-h-11 flex-1 rounded-full gradient-brand text-sm font-semibold"
              >
                Submit for Review
              </button>
            </div>
          </>
        ) : null}
      </form>
    </div>
  )
}
