import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export type CarouselSlide = {
  id: string
  content: ReactNode
}

type MarketingCarouselProps = {
  slides: CarouselSlide[]
  autoAdvanceMs?: number
  className?: string
  slideClassName?: string
  ariaLabel?: string
  centered?: boolean
  maxWidthClass?: string
  overlayArrows?: boolean
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

export function MarketingCarousel({
  slides,
  autoAdvanceMs,
  className,
  slideClassName,
  ariaLabel = 'Carousel',
  centered = false,
  maxWidthClass = 'max-w-4xl',
  overlayArrows = false,
}: MarketingCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  const count = slides.length
  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  )
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (!autoAdvanceMs || paused || reducedMotion || count <= 1) return
    const timer = window.setInterval(() => goTo(index + 1), autoAdvanceMs)
    return () => window.clearInterval(timer)
  }, [autoAdvanceMs, paused, reducedMotion, count, goTo, index])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0]?.clientX - touchStartX.current
    touchStartX.current = null
    if (delta === undefined) return
    if (delta > 50) prev()
    else if (delta < -50) next()
  }

  const arrowClass =
    'grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition hover:border-accent/40 hover:text-accent disabled:pointer-events-none disabled:opacity-30'

  const dots =
    count > 1 ? (
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index
                ? 'w-6 bg-accent'
                : 'w-2 bg-white/25 hover:bg-white/40',
            )}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    ) : null

  const slideTrack = (
    <div
      className={cn(
        overlayArrows ? 'relative w-full' : 'min-w-0 flex-1 overflow-hidden',
        !overlayArrows && 'overflow-hidden',
      )}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={cn(
          'overflow-hidden',
          overlayArrows && 'w-full',
        )}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={cn('w-full shrink-0', slideClassName)}
              role="group"
              aria-roledescription="slide"
              data-active={i === index ? 'true' : 'false'}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && overlayArrows ? (
        <>
          <button
            type="button"
            onClick={prev}
            className={cn(arrowClass, 'absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-6')}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            className={cn(arrowClass, 'absolute right-3 top-1/2 z-10 -translate-y-1/2 md:right-6')}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </>
      ) : null}
    </div>
  )

  if (reducedMotion && count > 0) {
    return (
      <div
        className={cn(centered && 'mx-auto w-full', centered && maxWidthClass, className)}
        aria-label={ariaLabel}
      >
        <div className={slideClassName}>{slides[0]?.content}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        centered && 'mx-auto w-full',
        centered && maxWidthClass,
        className,
      )}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={cn(
          overlayArrows ? 'w-full' : 'flex items-center gap-2 md:gap-3',
        )}
      >
        {!overlayArrows && count > 1 ? (
          <button
            type="button"
            onClick={prev}
            className={arrowClass}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
        ) : !overlayArrows ? (
          <div className="w-10 shrink-0" aria-hidden />
        ) : null}

        {slideTrack}

        {!overlayArrows && count > 1 ? (
          <button
            type="button"
            onClick={next}
            className={arrowClass}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        ) : !overlayArrows ? (
          <div className="w-10 shrink-0" aria-hidden />
        ) : null}
      </div>
      {dots}
    </div>
  )
}
