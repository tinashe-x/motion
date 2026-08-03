import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

const sizes = {
  sm: 'h-9',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-20',
} as const

export function MotionLogo({
  className,
  size = 'md',
}: {
  className?: string
  /** @deprecated Wordmark is included in the logo image */
  showWordmark?: boolean
  size?: keyof typeof sizes
}) {
  return (
    <Link to="/" className={cn('inline-flex items-center', className)}>
      <img
        src="/motion-logo.png"
        alt="Motion"
        className={cn('w-auto object-contain', sizes[size])}
      />
    </Link>
  )
}
