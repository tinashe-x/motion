import { cn } from '@/lib/cn'
import { motionMeterScore } from '@/lib/motionMeter'
import { Zap } from 'lucide-react'

export function MotionMeter({
  safetyScore,
  popularityScore,
  chargeNormalized: chargeNorm = 0,
  size = 'sm',
  showFill = true,
}: {
  safetyScore: number
  popularityScore: number
  chargeNormalized?: number
  size?: 'sm' | 'md'
  showFill?: boolean
}) {
  const score = motionMeterScore(safetyScore, popularityScore, chargeNorm)
  const fill = Math.round(chargeNorm)

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2 py-1 backdrop-blur',
        size === 'md' && 'px-3 py-1.5',
      )}
      title={`Motion Meter ${score} · charge ${fill}%`}
    >
      <span className="relative inline-flex items-center justify-center">
        <span
          className={cn(
            'rounded-full bg-gradient-to-br from-primary to-accent',
            size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5',
            fill >= 60
              ? 'shadow-[0_0_12px_rgba(255,215,0,0.7)]'
              : 'shadow-[0_0_10px_rgba(255,215,0,0.45)]',
          )}
        />
      </span>
      <span
        className={cn(
          'font-heading font-semibold text-accent',
          size === 'sm' ? 'text-[10px]' : 'text-xs',
        )}
      >
        {score}
      </span>
      {showFill ? (
        <span
          className={cn(
            'relative overflow-hidden rounded-full bg-white/15',
            size === 'sm' ? 'h-1.5 w-8' : 'h-2 w-12',
          )}
          aria-hidden
        >
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-500"
            style={{ width: `${fill}%` }}
          />
        </span>
      ) : null}
    </div>
  )
}

export function BoltButton({
  active,
  count,
  onClick,
  size = 'sm',
}: {
  active: boolean
  count: number
  onClick: () => void
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition',
        active
          ? 'border-accent/50 bg-accent/15 text-accent'
          : 'border-white/10 text-muted hover:text-white',
        size === 'md' && 'min-h-10 px-3 text-sm',
      )}
      aria-pressed={active}
      aria-label={active ? 'Remove bolt' : 'Charge with bolt'}
    >
      <Zap size={size === 'md' ? 16 : 14} className={active ? 'fill-accent' : ''} />
      {count}
    </button>
  )
}

export function SafetyBadge({ score }: { score: number }) {
  const color =
    score >= 75
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
      : score >= 50
        ? 'bg-amber-500/15 text-amber-200 border-amber-400/30'
        : 'bg-rose-500/15 text-rose-300 border-rose-400/30'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-heading text-sm font-semibold',
        color,
      )}
    >
      Safety Score: {score}%
    </span>
  )
}
