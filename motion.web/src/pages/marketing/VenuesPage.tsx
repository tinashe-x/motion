import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const plans = [
  {
    name: 'Basic Listing',
    price: 'Free',
    period: 'per event',
    features: ['Verification badge', '48hr listing', 'Up to 5 photos'],
    highlight: false,
  },
  {
    name: 'Spotlight',
    price: 'R499',
    period: 'per event',
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
    price: 'R1,499',
    period: 'per event',
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
    price: 'R2,999',
    period: 'per event',
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
    price: 'R2,999',
    period: 'per month',
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
        Choose a promotion tier that matches your night. Payment integration
        comes later — for now, explore the packages.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              'flex flex-col rounded-2xl border p-6',
              plan.highlight
                ? 'border-secondary/50 bg-gradient-to-b from-primary/25 to-surface-2 glow-card'
                : 'border-white/8 bg-surface-2',
            )}
          >
            <h2 className="font-heading text-xl font-semibold">{plan.name}</h2>
            <p className="mt-3 font-heading text-3xl font-bold text-accent">
              {plan.price}
            </p>
            <p className="text-sm text-muted">{plan.period}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/app/host"
              className={cn(
                'mt-8 rounded-full px-4 py-3 text-center text-sm font-semibold',
                plan.highlight
                  ? 'gradient-brand'
                  : 'border border-white/15 hover:border-accent/40',
              )}
            >
              Get started
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
