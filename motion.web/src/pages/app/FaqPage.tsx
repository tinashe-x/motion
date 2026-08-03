import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const faqs = [
  {
    q: 'What is the Motion Meter?',
    a: 'A live blend of popularity and safety signals from people at the event.',
  },
  {
    q: 'How does photo verification work?',
    a: 'Photos are checked against the venue geofence and the event time window.',
  },
  {
    q: 'Is my safety signal anonymous?',
    a: 'Yes. Signals contribute to scores without showing who submitted them.',
  },
  {
    q: 'Can I host events for free?',
    a: 'Basic listings are free. Paid tiers unlock promotion and longer windows.',
  },
  {
    q: 'Does Motion work offline?',
    a: 'Motion is installable as a PWA. Core marketing pages cache offline; live feeds and verification still need connectivity.',
  },
]

export function FaqPage() {
  return (
    <div className="pb-8 pt-4">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/app/settings"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-heading text-2xl font-bold">FAQ</h1>
      </header>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="rounded-2xl border border-white/8 bg-surface-2 px-4 py-3"
          >
            <summary className="cursor-pointer font-heading text-sm font-semibold">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
