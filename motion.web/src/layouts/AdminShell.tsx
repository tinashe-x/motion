import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Users,
  Flag,
  ShieldCheck,
  Radio,
  Megaphone,
  KeyRound,
  LogOut,
} from 'lucide-react'
import { MotionLogo } from '@/components/MotionLogo'
import { useAppState } from '@/context/AppState'
import { cn } from '@/lib/cn'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/events', label: 'Events', icon: Calendar },
  { to: '/admin/venues', label: 'Venues', icon: MapPin },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/moderation', label: 'Moderation Queue', icon: Flag },
  { to: '/admin/verification', label: 'Verification Queue', icon: ShieldCheck },
  { to: '/admin/safety', label: 'Safety Center', icon: Radio },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/roles', label: 'Roles & Permissions', icon: KeyRound, adminOnly: true },
]

export function AdminShell() {
  const { authenticated, profile, logout } = useAppState()
  const location = useLocation()

  if (!authenticated) return <Navigate to="/app/login" replace />
  if (profile.role !== 'admin' && profile.role !== 'moderator') {
    return <Navigate to="/app/home" replace />
  }

  const isAdmin = profile.role === 'admin'

  return (
    <div className="min-h-dvh bg-[#f4f4f8] text-urban md:flex">
      <aside className="w-full border-b border-black/10 bg-white md:sticky md:top-0 md:flex md:h-dvh md:w-64 md:shrink-0 md:flex-col md:border-b-0 md:border-r">
        <div className="p-5">
          <MotionLogo className="mb-8 px-2" size="lg" />
          <p className="mt-2 text-xs text-gray-500">Admin Portal</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-visible md:pb-0">
          {nav
            .filter((item) => !item.adminOnly || isAdmin)
            .map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium',
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100',
                  )
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="m-3 hidden min-h-10 items-center gap-2 rounded-lg border border-rose-200 px-3 text-sm text-rose-600 md:flex"
        >
          <LogOut size={16} /> Log Out
        </button>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
          <input
            placeholder="Search admin…"
            className="max-w-xs flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <div className="ml-4 flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="hidden text-sm sm:block">
              <p className="font-semibold">{profile.displayName}</p>
              <p className="text-xs capitalize text-gray-500">{profile.role}</p>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet key={location.pathname} />
        </main>
      </div>
    </div>
  )
}
