import { useMemo, useState } from 'react'
import { useAppState } from '@/context/AppState'
import { getVenue, profiles, venues } from '@/data/mock'
import { Skeleton } from '@/components/ui/Skeleton'
import { useMockLoading } from '@/hooks/useMockLoading'

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-2 font-heading text-2xl font-bold text-gray-900">{value}</p>
      {sub ? <p className="mt-1 text-xs text-emerald-600">{sub}</p> : null}
    </div>
  )
}

export function AdminDashboardPage() {
  const { events, photos, contentReports } = useAppState()
  const loading = useMockLoading(500)
  const verifiedRate = photos.length
    ? Math.round((photos.filter((p) => p.isVerified).length / photos.length) * 100)
    : 0

  const recent = useMemo(
    () =>
      [
        ...events.slice(0, 3).map((e) => ({
          type: 'Event',
          label: e.name,
          time: new Date(e.startTime).toLocaleString(),
        })),
        ...photos.slice(0, 3).map((p) => ({
          type: 'Photo',
          label: p.caption.slice(0, 40),
          time: new Date(p.capturedAt).toLocaleString(),
        })),
      ].slice(0, 10),
    [events, photos],
  )

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Users" value="1,248" sub="+12% vs last 30 days" />
        <StatCard label="Monthly Active Users" value="892" sub="+5%" />
        <StatCard label="Total Events" value={`${events.length}`} sub="Pending / Approved / Completed" />
        <StatCard label="Verified Partners" value={`${venues.filter((v) => v.isVerifiedPartner).length}`} />
        <StatCard label="Avg Safety Score" value="87%" />
        <StatCard label="Verified Photo Rate" value={`${verifiedRate}%`} />
        <StatCard label="Pending Moderation" value={`${contentReports.filter((r) => r.status === 'pending').length}`} />
        <StatCard label="Revenue Snapshot" value="R42k" sub="This month (mock)" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="font-heading font-semibold">New signups (30 days)</p>
          <Skeleton className="mt-4 h-32" />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="font-heading font-semibold">Events created (30 days)</p>
          <Skeleton className="mt-4 h-32" />
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="mb-3 font-heading font-semibold">Recent Activity</p>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Type</th>
              <th>Item</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2">{r.type}</td>
                <td>{r.label}</td>
                <td className="text-gray-500">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminEventsPage() {
  const { events, pushToast } = useAppState()
  const [status, setStatus] = useState('all')

  const filtered = events.filter((e) => status === 'all' || e.status === status)

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Events</h1>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="completed">Completed</option>
      </select>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th>Venue</th>
              <th>Category</th>
              <th>Status</th>
              <th>Tier</th>
              <th>Safety</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-gray-100">
                <td className="p-3 font-medium">{e.name}</td>
                <td>{getVenue(e.venueId)?.name}</td>
                <td>{e.category}</td>
                <td className="capitalize">{e.status}</td>
                <td className="capitalize">{e.promotionTier}</td>
                <td>{e.safetyScore}%</td>
                <td className="space-x-2 p-3">
                  <button
                    type="button"
                    onClick={() => pushToast(`Approved ${e.name} (mock)`)}
                    className="rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => pushToast(`Rejected ${e.name} (mock)`)}
                    className="rounded bg-rose-100 px-2 py-1 text-xs text-rose-700"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminVenuesPage() {
  const { pushToast } = useAppState()
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Venues</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">Name</th>
              <th>Address</th>
              <th>Verified Partner</th>
              <th>Events</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((v) => (
              <tr key={v.id} className="border-b border-gray-100">
                <td className="p-3 font-medium">{v.name}</td>
                <td>{v.address}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => pushToast(`Toggled partner status for ${v.name}`)}
                    className={v.isVerifiedPartner ? 'text-emerald-600' : 'text-gray-400'}
                  >
                    {v.isVerifiedPartner ? 'Yes' : 'No'}
                  </button>
                </td>
                <td>—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Users</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">Username</th>
              <th>Trust</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((u) => (
              <tr key={u.id} className="border-b border-gray-100">
                <td className="p-3 font-medium">@{u.username}</td>
                <td>{u.trustScore}%</td>
                <td className="capitalize">{u.role}</td>
                <td>Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AdminModerationPage() {
  const { contentReports, photos, pushToast } = useAppState()
  const pending = contentReports.filter((r) => r.status === 'pending')

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Moderation Queue</h1>
      {pending.length ? (
        pending.map((r) => {
          const photo = photos.find((p) => p.id === r.photoId)
          return (
            <div key={r.id} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
              {photo ? (
                <img src={photo.photoUrl} alt="" className="h-20 w-16 rounded object-cover" />
              ) : null}
              <div className="flex-1">
                <p className="font-medium">{r.reason}</p>
                <p className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</p>
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={() => pushToast('Report dismissed')} className="rounded bg-gray-100 px-2 py-1 text-xs">Dismiss</button>
                  <button type="button" onClick={() => pushToast('Content removed')} className="rounded bg-rose-100 px-2 py-1 text-xs text-rose-700">Remove</button>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
          No pending reports.
        </p>
      )}
    </div>
  )
}

export function AdminVerificationPage() {
  const { photos } = useAppState()
  const unverified = photos.filter((p) => !p.isVerified)

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Verification Queue</h1>
      {unverified.map((p) => (
        <div key={p.id} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex gap-4">
            <img src={p.photoUrl} alt="" className="h-24 w-20 rounded object-cover" />
            <div>
              <p className="text-sm">{p.caption}</p>
              <p className="mt-2 text-xs text-gray-500">Captured vs venue — mock map snippet</p>
              <div className="mt-2 h-16 w-48 rounded bg-gradient-to-br from-primary/20 to-secondary/10" />
            </div>
          </div>
        </div>
      ))}
      {!unverified.length ? (
        <p className="text-sm text-gray-500">All photos verified.</p>
      ) : null}
    </div>
  )
}

export function AdminSafetyPage() {
  const { pushToast } = useAppState()
  const [msg, setMsg] = useState('')

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Safety Center</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="font-heading font-semibold">Broadcast Safety Alert</p>
        <textarea
          rows={3}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Alert message…"
          className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => {
            pushToast('Safety alert broadcast (mock)')
            setMsg('')
          }}
          className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Send alert
        </button>
      </div>
    </div>
  )
}

export function AdminAnnouncementsPage() {
  const { pushToast } = useAppState()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Announcements</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mb-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <textarea
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
        <select className="mt-3 rounded-lg border border-gray-200 px-3 py-2 text-sm">
          <option>All Users</option>
          <option>Users Near a Venue</option>
          <option>Hosts Only</option>
        </select>
        <button
          type="button"
          onClick={() => {
            pushToast('Announcement sent (mock)')
            setTitle('')
            setBody('')
          }}
          className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export function AdminRolesPage() {
  const staff = profiles.filter((p) => p.role === 'admin' || p.role === 'moderator')
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">Roles & Permissions</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">User</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((u) => (
              <tr key={u.id} className="border-b border-gray-100">
                <td className="p-3">@{u.username}</td>
                <td className="capitalize">{u.role}</td>
                <td>
                  <select defaultValue={u.role} className="rounded border border-gray-200 px-2 py-1 text-xs">
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">
        Log in with <code>admin@motion.app</code> to access this section.
      </p>
    </div>
  )
}
