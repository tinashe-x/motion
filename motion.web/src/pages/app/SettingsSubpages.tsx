import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getEvent } from '@/data/mock'
import { useAppState } from '@/context/AppState'
import { NotificationsSettingsPage } from '@/pages/app/NotificationsSettingsPage'
import type { Profile } from '@/types'
import { cn } from '@/lib/cn'

export function SettingsBackHeader({ title }: { title: string }) {
  return (
    <header className="mb-6 flex items-center gap-3">
      <Link
        to="/app/settings"
        className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
      >
        <ArrowLeft size={18} />
      </Link>
      <h1 className="font-heading text-2xl font-bold">{title}</h1>
    </header>
  )
}

export function AccountSettingsPage() {
  const { profile, updateProfile } = useAppState()

  return (
    <div className="pb-8 pt-4 md:pt-6">
      <SettingsBackHeader title="Account Settings" />
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          updateProfile({})
        }}
      >
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Username</span>
          <input
            value={profile.username}
            onChange={(e) => updateProfile({ username: e.target.value }, true)}
            className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Display name</span>
          <input
            value={profile.displayName}
            onChange={(e) => updateProfile({ displayName: e.target.value }, true)}
            className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Email</span>
          <input
            type="email"
            defaultValue="thandi@motion.app"
            className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">New password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none focus:ring-2 focus:ring-primary"
          />
        </label>
        <button type="submit" className="min-h-11 w-full rounded-full gradient-brand text-sm font-semibold">
          Save changes
        </button>
        <button
          type="button"
          className="min-h-11 w-full rounded-full border border-rose-400/40 text-sm text-rose-300"
        >
          Delete account
        </button>
      </form>
    </div>
  )
}

export function PrivacySettingsPage() {
  const { profile, updateProfile } = useAppState()

  return (
    <div className="pb-8 pt-4 md:pt-6">
      <SettingsBackHeader title="Privacy Settings" />
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="mb-1.5 block text-muted">Profile visibility</span>
          <select
            value={profile.profileVisibility}
            onChange={(e) =>
              updateProfile(
                {
                  profileVisibility: e.target.value as Profile['profileVisibility'],
                },
                true,
              )
            }
            className="min-h-11 w-full rounded-xl border border-white/10 bg-surface-2 px-3 outline-none"
          >
            <option value="public">Public</option>
            <option value="friends">Friends only</option>
            <option value="private">Private</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center justify-between rounded-xl border border-white/8 bg-surface px-4 text-sm">
          Show saved events on profile
          <input
            type="checkbox"
            checked={profile.showSavedEvents}
            onChange={(e) => updateProfile({ showSavedEvents: e.target.checked }, true)}
            className="h-5 w-5 accent-primary"
          />
        </label>
        <label className="flex min-h-11 items-center justify-between rounded-xl border border-white/8 bg-surface px-4 text-sm">
          POPIA data consent
          <input
            type="checkbox"
            checked={profile.popiaConsent}
            onChange={(e) => updateProfile({ popiaConsent: e.target.checked }, true)}
            className="h-5 w-5 accent-primary"
          />
        </label>
        <button
          type="button"
          onClick={() => updateProfile({})}
          className="min-h-11 w-full rounded-full gradient-brand text-sm font-semibold"
        >
          Save privacy settings
        </button>
      </div>
    </div>
  )
}

export function SavedEventsPage() {
  const { attendance } = useAppState()
  const saved = attendance.filter((a) => a.status === 'saved')

  return (
    <div className="pb-8 pt-4 md:pt-6">
      <SettingsBackHeader title="Saved Events" />
      <div className="space-y-2">
        {saved.length ? (
          saved.map((a) => {
            const event = getEvent(a.eventId)
            if (!event) return null
            return (
              <Link
                key={a.id}
                to={`/app/event/${event.id}`}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-surface px-4 py-3 text-sm"
              >
                {event.name}
                <span className="text-accent">View Details</span>
              </Link>
            )
          })
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
            No saved events yet.
          </p>
        )}
      </div>
    </div>
  )
}

export function PastEventsPage() {
  const { photos, profile } = useAppState()
  const mine = photos.filter((p) => p.userId === profile.id)

  return (
    <div className="pb-8 pt-4 md:pt-6">
      <SettingsBackHeader title="Past Events Attended" />
      {mine.length ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {mine.map((p) => (
            <img key={p.id} src={p.photoUrl} alt="" className="aspect-[4/5] rounded-xl object-cover" />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
          No verified moments yet.
        </p>
      )}
    </div>
  )
}

const allInterests = [
  'Concert',
  'Networking',
  'Festival',
  'Nightclub',
  'Workshop',
  'Other',
] as const

export function PreferencesPage() {
  const { profile, updateProfile } = useAppState()

  const toggleInterest = (cat: (typeof allInterests)[number]) => {
    const next = profile.interests.includes(cat)
      ? profile.interests.filter((c) => c !== cat)
      : [...profile.interests, cat]
    updateProfile({ interests: next }, true)
  }

  return (
    <div className="pb-8 pt-4 md:pt-6">
      <SettingsBackHeader title="Set Preferences" />
      <p className="mb-3 text-sm text-muted">Event category interests</p>
      <div className="flex flex-wrap gap-2">
        {allInterests.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => toggleInterest(cat)}
            className={cn(
              'min-h-10 rounded-full px-4 text-sm',
              profile.interests.includes(cat)
                ? 'gradient-brand'
                : 'border border-white/15 text-muted',
            )}
          >
            {cat}
          </button>
        ))}
      </div>
      <label className="mt-6 block text-sm">
        <span className="text-muted">Location radius (km)</span>
        <input
          type="range"
          min={5}
          max={50}
          value={profile.radiusKm}
          onChange={(e) => updateProfile({ radiusKm: Number(e.target.value) }, true)}
          className="mt-3 w-full accent-primary"
        />
        <span className="mt-1 block text-xs text-accent">{profile.radiusKm} km</span>
      </label>
      <button
        type="button"
        onClick={() => updateProfile({})}
        className="mt-6 min-h-11 w-full rounded-full gradient-brand text-sm font-semibold"
      >
        Save preferences
      </button>
    </div>
  )
}

export function AppNotificationsPage() {
  return (
    <div className="pb-8 pt-4 md:pt-6">
      <SettingsBackHeader title="Notifications" />
      <NotificationsSettingsPage embedded />
    </div>
  )
}
