import { NavLink } from 'react-router-dom'
import { Home, Zap, MapPin, Users, User } from 'lucide-react'
import { MotionLogo } from '@/components/MotionLogo'
import { cn } from '@/lib/cn'

const tabs = [
  { to: '/app/home', label: 'Home', icon: Home },
  { to: '/app/activity', label: 'Activity', icon: Zap },
  { to: '/app/map', label: 'Map', icon: MapPin },
  { to: '/app/community', label: 'Community', icon: Users },
  { to: '/app/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#121218]/95 backdrop-blur-xl md:hidden">
      <ul className="flex w-full items-stretch justify-between px-2 pt-2">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-medium transition',
                  isActive ? 'text-primary' : 'text-muted hover:text-white/80',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 2}
                    className={
                      isActive
                        ? 'drop-shadow-[0_0_8px_rgba(74,0,224,0.8)]'
                        : undefined
                    }
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function SideNav() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-white/10 bg-[#121218] px-4 py-6 md:flex lg:w-72 xl:w-80">
      <MotionLogo className="mb-8 px-2" size="lg" />
      <nav className="flex flex-1 flex-col gap-1">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition',
                isActive
                  ? 'bg-primary/20 text-white'
                  : 'text-muted hover:bg-white/5 hover:text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <p className="px-2 text-xs text-muted">See the vibe. Live the moment.</p>
    </aside>
  )
}
