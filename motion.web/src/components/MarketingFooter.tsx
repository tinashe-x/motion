import { Link } from 'react-router-dom'
import { Instagram, Twitter, Mail } from 'lucide-react'
import { MotionLogo } from '@/components/MotionLogo'

export function MarketingFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0e]">
      <div className="marketing-shell grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <MotionLogo size="lg" />
          <p className="mt-3 max-w-xs text-sm text-muted">
            See the vibe. Live the moment.
          </p>
          <p className="mt-4 text-sm text-muted">Johannesburg, South Africa</p>
          <a
            href="mailto:info@motionapp.co.za"
            className="mt-2 inline-flex items-center gap-2 text-sm text-white/80 hover:text-accent"
          >
            <Mail size={14} /> info@motionapp.co.za
          </a>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/70">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link to="/#how-it-works" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/#safety" className="hover:text-white">
                Safety
              </Link>
            </li>
            <li>
              <Link to="/venues" className="hover:text-white">
                For Venues
              </Link>
            </li>
            <li>
              <Link to="/app" className="hover:text-white">
                Open App
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/70">
            Legal
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <a href="mailto:info@motionapp.co.za" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted hover:text-accent"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted hover:text-accent"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Motion. Built for Johannesburg nightlife.
      </div>
    </footer>
  )
}
