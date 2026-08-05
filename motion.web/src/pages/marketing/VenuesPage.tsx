import { Link } from 'react-router-dom'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'
import { PartnerContactForm } from '@/components/marketing/PartnerContactForm'

const paidTiers = [
  {
    name: 'Spotlight',
    features: [
      'Motion Meter inclusion',
      '7-day promo',
      'Unlimited photos',
      'Push to nearby users',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    features: [
      'Everything in Spotlight',
      'Homepage feature slot',
      'Category takeover',
      'Weekly performance snapshot',
    ],
    highlight: false,
  },
  {
    name: 'Platinum',
    features: [
      'Priority placement',
      '14-day window',
      'Dedicated spotlight',
      'Monthly performance dashboard',
    ],
    highlight: false,
  },
  {
    name: 'Verified Partner',
    features: [
      'Partner badge on all listings',
      'Priority review queue',
      'Co-marketing opportunities',
      'Dedicated venue page',
    ],
    highlight: false,
  },
]

export function VenuesPage() {
  return (
    <div className="marketing-shell py-16">
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        For Venues & Hosts
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold md:text-5xl">
        Put your night on the Motion map.
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Start with a complimentary listing, then scale with verified partner
        packages tailored to your venue or event.
      </p>

      <article className="mt-12 overflow-hidden rounded-2xl border border-secondary/50 bg-gradient-to-br from-primary/25 via-surface-2 to-surface-2 p-8 glow-card md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles size={14} /> Complimentary trial
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold">Basic Listing</h2>
            <p className="mt-3 text-muted">
              Try Motion free — get your first event verified and in front of
              people already out. No commitment, no card required.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Verification badge',
                '48hr listing',
                'Up to 5 photos',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/app/host"
            className="shrink-0 rounded-full gradient-brand px-6 py-3 text-sm font-semibold"
          >
            Start your complimentary listing
          </Link>
        </div>
      </article>

      <div className="mt-16">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">
          Partner packages
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Spotlight through Verified Partner tiers — pricing on application so
          we can tailor packages to your night.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {paidTiers.map((tier) => (
            <article
              key={tier.name}
              className={cn(
                'flex flex-col rounded-2xl border p-6',
                tier.highlight
                  ? 'border-secondary/50 bg-gradient-to-b from-primary/20 to-surface-2 glow-card'
                  : 'border-white/8 bg-surface-2',
              )}
            >
              <h3 className="font-heading text-xl font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm font-semibold text-accent">
                Price on application
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={cn(
                  'mt-8 rounded-full px-4 py-3 text-center text-sm font-semibold',
                  tier.highlight
                    ? 'gradient-brand'
                    : 'border border-white/15 hover:border-accent/40',
                )}
              >
                Contact us for pricing
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <PartnerContactForm id="contact" />
      </div>
    </div>
  )
}
