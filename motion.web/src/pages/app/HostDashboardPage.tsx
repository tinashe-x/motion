import { Link } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { formatEventWhen } from '@/data/mock'
import { cn } from '@/lib/cn'

export function HostDashboardPage() {
  const { profile, events, updateProfile } = useAppState()
  const mine = events.filter((e) => e.hostId === profile.id)

  if (profile.role === 'user') {
    return (
      <div className="pb-8 pt-4">
        <header className="mb-6 flex items-center gap-3">
          <Link
            to="/app/settings"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-heading text-2xl font-bold">Become a Host</h1>
        </header>
        <div className="rounded-3xl border border-secondary/30 bg-gradient-to-br from-primary/25 to-surface-2 p-6 glow-card">
          <p className="text-sm text-muted">
            Hosts can create events, request photo verification, and pick promotion
            tiers to reach people already out tonight.
          </p>
          <button
            type="button"
            onClick={() => updateProfile({ role: 'host' })}
            className="mt-6 min-h-11 rounded-full gradient-brand px-5 text-sm font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8 pt-4">
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/app/settings"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-heading text-2xl font-bold">Host Dashboard</h1>
        </div>
        <Link
          to="/app/host/create"
          className="inline-flex min-h-11 items-center gap-1 rounded-full gradient-brand px-4 text-sm font-semibold"
        >
          <Plus size={16} /> Create Event
        </Link>
      </header>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {mine.length ? (
          mine.map((event) => (
            <div
              key={event.id}
              className="rounded-2xl border border-white/8 bg-surface-2 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading font-semibold">{event.name}</p>
                  <p className="mt-1 text-xs text-muted">
                    {formatEventWhen(event.startTime)}
                  </p>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize',
                    event.status === 'approved' && 'bg-emerald-500/15 text-emerald-300',
                    event.status === 'pending' && 'bg-amber-500/15 text-amber-200',
                    event.status === 'rejected' && 'bg-rose-500/15 text-rose-300',
                    event.status === 'completed' && 'bg-white/10 text-muted',
                  )}
                >
                  {event.status === 'pending' ? 'Pending Review' : event.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
            No events yet. Create your first listing.
          </p>
        )}
      </div>
    </div>
  )
}
