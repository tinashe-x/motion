import { Outlet } from 'react-router-dom'
import { MarketingHeader } from '@/components/MarketingHeader'
import { MarketingFooter } from '@/components/MarketingFooter'

export function MarketingLayout() {
  return (
    <div className="min-h-dvh bg-[#0e0e12]">
      <MarketingHeader />
      <main>
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}
