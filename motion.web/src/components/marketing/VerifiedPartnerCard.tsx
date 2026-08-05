import { useState } from 'react'
import { BadgeCheck, Building2, UserCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export type VerifiedPartner = {
  name: string
  type: 'venue' | 'host'
  tagline: string
  imageUrl: string
  verified?: boolean
}

export function VerifiedPartnerCard({
  partner,
  className,
}: {
  partner: VerifiedPartner
  className?: string
}) {
  const TypeIcon = partner.type === 'venue' ? Building2 : UserCircle
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-2xl border border-white/8 bg-surface-2 glow-card',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/40 to-secondary/20">
        {!imageFailed ? (
          <img
          src={partner.imageUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImageFailed(true)}
        />
        ) : null}
        {partner.verified !== false ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-accent/40 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent backdrop-blur-sm">
            <BadgeCheck size={12} /> Verified
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <TypeIcon size={14} className="text-accent" />
          {partner.type === 'venue' ? 'Venue' : 'Host'}
        </div>
        <h3 className="mt-1 font-heading text-xl font-semibold">{partner.name}</h3>
        <p className="mt-2 text-sm text-muted">{partner.tagline}</p>
      </div>
    </article>
  )
}
