import { useState, type FormEvent } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'

const CONTACT_EMAIL = 'info@motionapp.co.za'

type FormState = {
  venueName: string
  contactName: string
  email: string
  phone: string
  message: string
}

const emptyForm: FormState = {
  venueName: '',
  contactName: '',
  email: '',
  phone: '',
  message: '',
}

function buildMailtoUrl(form: FormState) {
  const subject = encodeURIComponent(
    `Motion Partner Enquiry — ${form.venueName.trim()}`,
  )
  const body = encodeURIComponent(
    [
      `Venue / Business: ${form.venueName.trim()}`,
      `Contact: ${form.contactName.trim()}`,
      `Email: ${form.email.trim()}`,
      form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
      '',
      form.message.trim() || '(No additional message)',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export function PartnerContactForm({ id }: { id?: string }) {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  )

  const update =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.venueName.trim()) next.venueName = 'Required'
    if (!form.contactName.trim()) next.contactName = 'Required'
    if (!form.email.trim()) next.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    window.location.href = buildMailtoUrl(form)
  }

  const inputClass = (field: keyof FormState) =>
    cn(
      'w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-accent/50',
      errors[field] ? 'border-red-400/60' : 'border-white/10',
    )

  return (
    <div id={id} className="scroll-mt-24">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-white/8 bg-surface-2 p-6 md:p-8 glow-card"
        noValidate
      >
        <h2 className="font-heading text-2xl font-bold">Get in touch</h2>
        <p className="mt-2 text-sm text-muted">
          Tell us about your venue or event. We&apos;ll follow up about verified
          partner packages and your complimentary listing trial.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="text-sm text-white/80">Venue / business name *</span>
            <input
              type="text"
              value={form.venueName}
              onChange={update('venueName')}
              className={cn('mt-1.5', inputClass('venueName'))}
              placeholder="e.g. The Orbit"
            />
            {errors.venueName ? (
              <span className="mt-1 block text-xs text-red-400">{errors.venueName}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm text-white/80">Contact name *</span>
            <input
              type="text"
              value={form.contactName}
              onChange={update('contactName')}
              className={cn('mt-1.5', inputClass('contactName'))}
              placeholder="Your name"
            />
            {errors.contactName ? (
              <span className="mt-1 block text-xs text-red-400">
                {errors.contactName}
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="text-sm text-white/80">Email *</span>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              className={cn('mt-1.5', inputClass('email'))}
              placeholder="you@venue.co.za"
            />
            {errors.email ? (
              <span className="mt-1 block text-xs text-red-400">{errors.email}</span>
            ) : null}
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-white/80">Phone (optional)</span>
            <input
              type="tel"
              value={form.phone}
              onChange={update('phone')}
              className={cn('mt-1.5', inputClass('phone'))}
              placeholder="+27 ..."
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm text-white/80">Message (optional)</span>
            <textarea
              value={form.message}
              onChange={update('message')}
              rows={4}
              className={cn('mt-1.5 resize-none', inputClass('message'))}
              placeholder="Tell us about your venue or event"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full gradient-brand px-6 py-3 text-sm font-semibold md:w-auto"
        >
          Send enquiry
        </button>
      </form>

      <div className="mt-8 rounded-2xl border border-white/8 bg-surface p-6">
        <h3 className="font-heading text-lg font-semibold">Business contact</h3>
        <ul className="mt-4 space-y-3 text-sm text-white/80">
          <li>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Mail size={16} className="text-accent" />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-accent" />
            Johannesburg, South Africa
          </li>
        </ul>
      </div>
    </div>
  )
}
