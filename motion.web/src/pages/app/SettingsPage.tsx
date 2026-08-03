import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { useAppState } from '@/context/AppState'

const rows = [
  { to: '/app/settings/account', label: 'Account Settings' },
  { to: '/app/settings/privacy', label: 'Privacy Settings' },
  { to: '/app/settings/saved', label: 'Saved Events' },
  { to: '/app/settings/past', label: 'Past Events Attended' },
  { to: '/app/settings/preferences', label: 'Set Preferences' },
  { to: '/app/settings/notifications', label: 'Notifications' },
  { to: '/app/host', label: 'Host Settings' },
  { to: '/app/settings/faq', label: 'FAQ' },
]

export function SettingsPage() {
  const { logout } = useAppState()
  const navigate = useNavigate()

  return (
    <div className="pb-8 pt-4 md:pt-6">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/app/profile"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
      </header>

      <section className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((row) => (
          <Link
            key={row.to}
            to={row.to}
            className="flex items-center justify-between rounded-xl border border-white/8 bg-surface px-4 py-3 text-sm"
          >
            {row.label}
            <ChevronRight size={16} className="text-muted" />
          </Link>
        ))}
      </section>

      <button
        type="button"
        onClick={() => {
          logout()
          navigate('/app/login')
        }}
        className="mt-8 min-h-11 w-full rounded-full border border-rose-400/40 text-sm font-semibold text-rose-300"
      >
        Log Out
      </button>
    </div>
  )
}
