import { MarketingCarousel } from '@/components/marketing/MarketingCarousel'

const problemSlides = [
  {
    id: 'group-chat',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=700&fit=crop',
    title: "Plans die in group chats.",
    subtitle: "You don't know what's actually happening tonight.",
  },
  {
    id: 'stale-feed',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=700&fit=crop',
    title: 'Social media shows you yesterday, not right now.',
    subtitle: 'Feeds lag behind the moment you want to live.',
  },
  {
    id: 'safety',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=700&fit=crop',
    title: "Safety is always a question mark when you're heading out.",
    subtitle: 'Crowd vibes and venue trust should not be guesswork.',
  },
  {
    id: 'motion-payoff',
    image:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=700&fit=crop',
    title: "See what's actually happening.",
    subtitle: 'Live energy. Verified moments. Right now.',
    payoff: true,
  },
]

export function ProblemCarousel() {
  return (
    <MarketingCarousel
      ariaLabel="Nightlife problems"
      autoAdvanceMs={5000}
      overlayArrows
      className="w-full"
      slides={problemSlides.map((slide) => ({
        id: slide.id,
        content: (
          <article className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9] md:min-h-[420px]">
            <img
              src={slide.image}
              alt=""
              className="carousel-slide-image absolute inset-0 h-full w-full object-cover"
            />
            <div
              className={`absolute inset-0 ${
                slide.payoff
                  ? 'bg-gradient-to-t from-primary/90 via-primary/50 to-transparent'
                  : 'bg-gradient-to-t from-black/90 via-black/50 to-black/20'
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 px-4 pb-6 md:px-8 md:pb-12 lg:px-12 xl:px-16">
              <h3
                  className={`font-heading text-xl font-bold md:text-3xl lg:text-4xl ${
                    slide.payoff ? 'text-accent' : 'text-white'
                  }`}
                >
                  {slide.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base lg:text-lg">
                  {slide.subtitle}
                </p>
            </div>
          </article>
        ),
      }))}
    />
  )
}
