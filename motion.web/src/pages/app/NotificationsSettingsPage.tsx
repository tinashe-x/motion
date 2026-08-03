import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { cn } from '@/lib/cn'

export function NotificationsSettingsPage({ embedded = false }: { embedded?: boolean }) {
  const { profile, updateProfile } = useAppState()
  const prefs = profile.notificationPrefs

  const toggle = (key: keyof typeof prefs, force?: boolean) => {
    updateProfile({
      notificationPrefs: {
        ...prefs,
        [key]: force ?? !prefs[key],
      },
    })
  }

  const items: Array<{
    key: keyof typeof prefs
    label: string
    recommended?: boolean
    lockedOn?: boolean
  }> = [
    { key: 'nearbyEvents', label: 'Nearby Events Update' },
    { key: 'upcomingEvents', label: 'Upcoming Events' },
    {
      key: 'safetyAlerts',
      label: 'Safety Alerts',
      recommended: true,
      lockedOn: true,
    },
    { key: 'rsvpReminders', label: 'RSVP Reminders' },
  ]

  const content = (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center justify-between rounded-xl border border-white/8 bg-surface px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium">{item.label}</p>
            {item.recommended ? (
              <span className="mt-1 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                Recommended
              </span>
            ) : null}
          </div>
          <button
            type="button"
            disabled={item.lockedOn}
            onClick={() => toggle(item.key, item.lockedOn ? true : undefined)}
            className={cn(
              'relative h-7 w-12 rounded-full transition',
              prefs[item.key] ? 'bg-primary' : 'bg-white/15',
              item.lockedOn && 'opacity-80',
            )}
            aria-pressed={prefs[item.key]}
          >
            <span
              className={cn(
                'absolute top-0.5 h-6 w-6 rounded-full bg-white transition',
                prefs[item.key] ? 'left-5' : 'left-0.5',
              )}
            />
          </button>
        </div>
      ))}
    </div>
  )

  if (embedded) return content

  return (
    <div className="pb-8 pt-4">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/app/settings"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-heading text-2xl font-bold">Notifications</h1>
      </header>
      {content}
    </div>
  )
}
