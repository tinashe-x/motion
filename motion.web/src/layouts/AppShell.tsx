import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { BottomNav, SideNav } from '@/components/BottomNav'
import { useAppState } from '@/context/AppState'
import { cn } from '@/lib/cn'

const publicAppPaths = ['/app', '/app/login', '/app/signup']
const fullBleedPaths = ['/app/map']

function isFullBleedPath(pathname: string) {
  return (
    fullBleedPaths.includes(pathname) || pathname.endsWith('/verify')
  )
}

export function AppShell() {
  const { authenticated, onboardingDone } = useAppState()
  const location = useLocation()
  const isPublic = publicAppPaths.includes(location.pathname)
  const isFullBleed = isFullBleedPath(location.pathname)

  if (!onboardingDone && location.pathname !== '/app') {
    return <Navigate to="/app" replace />
  }

  if (onboardingDone && !authenticated && !isPublic) {
    return (
      <Navigate to="/app/login" replace state={{ from: location.pathname }} />
    )
  }

  if (
    authenticated &&
    (location.pathname === '/app/login' || location.pathname === '/app/signup')
  ) {
    return <Navigate to="/app/home" replace />
  }

  if (location.pathname === '/app') {
    if (authenticated) return <Navigate to="/app/home" replace />
    if (onboardingDone) return <Navigate to="/app/login" replace />
  }

  const showNav = authenticated && !isPublic

  if (!showNav) {
    return (
      <div className="min-h-dvh bg-[#0e0e12]">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-[#0e0e12] md:flex">
      <SideNav />
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'w-full',
            !isFullBleed && 'app-shell',
            'pb-24 md:pb-8',
          )}
        >
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  )
}
