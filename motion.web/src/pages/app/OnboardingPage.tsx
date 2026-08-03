import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MotionLogo } from '@/components/MotionLogo'
import { OnboardingVisual } from '@/components/OnboardingVisual'
import { AuthSplitLayout } from '@/layouts/AuthSplitLayout'
import { useAppState } from '@/context/AppState'
import { cn } from '@/lib/cn'

const slides = [
  {
    title: 'Discover exciting events near you',
    body: 'Concerts, festivals, workshops, networking nights — find what’s happening across Johannesburg.',
    tags: ['Concerts', 'Festivals', 'Networking'],
  },
  {
    title: 'Feel the real-time vibe',
    body: 'See live photos from people already there before you decide to go.',
    tags: ['Exciting', 'Chill', 'Lively'],
  },
  {
    title: 'Trust what you see',
    body: 'Geofenced, timestamped photos verify authenticity so you can go out with confidence.',
    tags: ['Trustworthy', 'Safe'],
  },
]

export function OnboardingPage() {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const { completeOnboarding } = useAppState()
  const slide = slides[index]
  const last = index === slides.length - 1
  const touchStart = useRef(0)

  const finish = () => {
    completeOnboarding()
    navigate('/app/signup')
  }

  const go = (dir: 1 | -1) => {
    setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + dir)))
  }

  return (
    <AuthSplitLayout
      headline={slide.title}
      subline={slide.body}
    >
      <div
        className="app-shell relative flex min-h-dvh flex-col bg-[radial-gradient(ellipse_at_top,_rgba(74,0,224,0.25),_transparent_55%)] pb-10 pt-6 md:bg-none md:py-10 lg:py-14"
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchStart.current
          if (delta < -50) go(1)
          if (delta > 50) go(-1)
        }}
      >
        <div className="mb-6 flex items-center justify-between md:hidden">
          <MotionLogo size="xl" />
          <button
            type="button"
            onClick={finish}
            className="text-sm text-muted hover:text-white"
          >
            Skip
          </button>
        </div>
        <button
          type="button"
          onClick={finish}
          className="mb-8 hidden self-end text-sm text-muted hover:text-white md:block"
        >
          Skip
        </button>

        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center md:max-w-2xl">
          <OnboardingVisual key={index} slideIndex={index} />
          <h1 className="font-heading text-3xl font-bold leading-tight md:hidden lg:text-4xl">
            {slide.title}
          </h1>
          <p className="mt-4 text-muted md:hidden">{slide.body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {slide.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent md:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-4 md:max-w-2xl">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2 w-2 rounded-full md:h-2.5 md:w-2.5',
                  i === index ? 'bg-accent' : 'bg-white/20',
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => (last ? finish() : go(1))}
            className="min-h-11 rounded-full gradient-brand px-6 text-sm font-semibold md:min-h-12 md:px-8 md:text-base"
          >
            {last ? 'Get Started' : 'Continue'}
          </button>
        </div>
      </div>
    </AuthSplitLayout>
  )
}
