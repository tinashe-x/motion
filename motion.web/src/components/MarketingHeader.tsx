import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { MotionLogo } from '@/components/MotionLogo'
import { cn } from '@/lib/cn'

const links = [
  { href: '/#how-it-works', label: 'How it Works' },
  { href: '/#safety', label: 'Safety' },
  { href: '/#venues', label: 'For Venues' },
  { href: '/#download', label: 'Download' },
]

export function MarketingHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-white/5 transition-colors',
        scrolled ? 'bg-[#0e0e12]/90 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="marketing-shell flex items-center justify-between py-3">
        <MotionLogo size="lg" />
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/app"
            className="rounded-full gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(74,0,224,0.35)]"
          >
            Get the App
          </Link>
        </nav>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/5 bg-[#121218] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-2 text-sm text-muted hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/app"
              className="rounded-full gradient-brand px-4 py-3 text-center text-sm font-semibold"
            >
              Get the App
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
