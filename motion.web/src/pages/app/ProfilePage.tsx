import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { getEvent } from '@/data/mock'
import type { EventCategory } from '@/types'
import { cn } from '@/lib/cn'

const allInterests: EventCategory[] = [
  'Concert',
  'Networking',
  'Festival',
  'Nightclub',
  'Workshop',
  'Other',
]

export function ProfilePage() {
  const { profile, photos, attendance, updateProfile } = useAppState()
  const myPhotos = photos.filter((p) => p.userId === profile.id && !p.isFlagged)
  const saved = attendance
    .filter((a) => a.userId === profile.id && a.status === 'saved')
    .map((a) => getEvent(a.eventId))
    .filter(Boolean)

  const toggleInterest = (cat: EventCategory) => {
    const next = profile.interests.includes(cat)
      ? profile.interests.filter((c) => c !== cat)
      : [...profile.interests, cat]
    updateProfile({ interests: next }, true)
  }

  return (
    <div className="pb-6 pt-4 md:pt-8">
      <header className="mb-5 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Profile</h1>
        <Link
          to="/app/settings"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted"
          aria-label="Settings"
        >
          <Settings size={18} />
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-white/8 bg-surface-2 p-5 glow-card lg:p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt=""
                className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
              />
              <span className="absolute -bottom-1 -right-1 grid h-10 w-10 place-items-center rounded-full border-2 border-surface-2 bg-gradient-to-br from-primary to-accent font-heading text-xs font-bold text-black">
                {profile.trustScore}%
              </span>
            </div>
            <div>
              <p className="font-heading text-xl font-semibold">@{profile.username}</p>
              <p className="text-sm text-muted">Motion-me trust score</p>
            </div>
          </div>
          <label className="mt-4 block text-sm">
            <span className="mb-1 block text-muted">Bio</span>
            <textarea
              rows={2}
              value={profile.bio}
              onChange={(e) => updateProfile({ bio: e.target.value }, true)}
              className="w-full rounded-xl border border-white/10 bg-surface px-3 py-2 outline-none"
            />
          </label>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-muted">Instagram</span>
              <input
                value={profile.instagramHandle ?? ''}
                onChange={(e) =>
                  updateProfile({ instagramHandle: e.target.value }, true)
                }
                placeholder="@handle"
                className="min-h-10 w-full rounded-xl border border-white/10 bg-surface px-3 outline-none"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">Twitter / X</span>
              <input
                value={profile.twitterHandle ?? ''}
                onChange={(e) =>
                  updateProfile({ twitterHandle: e.target.value }, true)
                }
                placeholder="@handle"
                className="min-h-10 w-full rounded-xl border border-white/10 bg-surface px-3 outline-none"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={() => updateProfile({})}
            className="mt-4 min-h-10 rounded-full gradient-brand px-4 text-sm font-semibold"
          >
            Save profile
          </button>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-white/8 bg-surface/50 p-5">
            <h2 className="font-heading text-lg font-semibold">Set Preferences</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {allInterests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={cn(
                    'min-h-10 rounded-full px-3 py-1.5 text-xs font-medium',
                    profile.interests.includes(interest)
                      ? 'gradient-brand'
                      : 'border border-white/10 text-muted',
                  )}
                >
                  {interest}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">Radius: {profile.radiusKm} km</p>
            <Link
              to="/app/settings/preferences"
              className="mt-1 inline-block text-xs text-accent"
            >
              Edit radius
            </Link>
          </section>

          <section className="rounded-2xl border border-white/8 bg-surface/50 p-5">
            <h2 className="font-heading text-lg font-semibold">Saved Events</h2>
            <div className="mt-3 space-y-2">
              {saved.length ? (
                saved.map((event) =>
                  event ? (
                    <Link
                      key={event.id}
                      to={`/app/event/${event.id}`}
                      className="flex items-center justify-between rounded-xl border border-white/8 bg-surface px-4 py-3"
                    >
                      <span className="text-sm font-medium">{event.name}</span>
                      <span className="text-xs text-accent">View Details</span>
                    </Link>
                  ) : null,
                )
              ) : (
                <p className="text-sm text-muted">No saved events yet.</p>
              )}
            </div>
          </section>

          <section className="space-y-2 rounded-2xl border border-white/8 bg-surface/50 p-5">
            <h2 className="font-heading text-lg font-semibold">Manage Account</h2>
            <Link
              to="/app/settings/account"
              className="block rounded-xl border border-white/8 bg-surface px-4 py-3 text-sm"
            >
              Account Settings
            </Link>
            <Link
              to="/app/settings/privacy"
              className="block rounded-xl border border-white/8 bg-surface px-4 py-3 text-sm"
            >
              Privacy Settings
            </Link>
          </section>
        </div>
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Past Events Attended</h2>
          <Link to="/app/settings/past" className="text-xs font-semibold text-accent">
            View all
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {myPhotos.length ? (
            myPhotos.map((photo) => (
              <img
                key={photo.id}
                src={photo.photoUrl}
                alt=""
                className="h-24 w-20 shrink-0 rounded-xl object-cover md:h-28 md:w-24"
              />
            ))
          ) : (
            <p className="text-sm text-muted">No verified moments yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
