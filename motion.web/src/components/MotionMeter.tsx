import { cn } from '@/lib/cn'

export function MotionMeter({
  safetyScore,
  popularityScore,
  size = 'sm',
}: {
  safetyScore: number
  popularityScore: number
  size?: 'sm' | 'md'
}) {
  const score = Math.round((safetyScore * 0.55 + popularityScore * 0.45))
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2 py-1 backdrop-blur',
        size === 'md' && 'px-3 py-1.5',
      )}
      title={`Motion Meter ${score}`}
    >
      <span
        className={cn(
          'rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_10px_rgba(255,215,0,0.45)]',
          size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5',
        )}
      />
      <span className={cn('font-heading font-semibold text-accent', size === 'sm' ? 'text-[10px]' : 'text-xs')}>
        {score}
      </span>
    </div>
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
