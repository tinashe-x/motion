import { Link } from 'react-router-dom'
import { MarketingCarousel } from '@/components/marketing/MarketingCarousel'

const wavePhotos = [
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop',
    caption: 'Packed floor',
  },
  {
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
    caption: 'Lights up',
  },
  {
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop',
    caption: 'Soundcheck',
  },
  {
    src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=500&fit=crop',
    caption: 'Festival warm-up',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop',
    caption: 'Rooftop session',
  },
  {
    src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=500&fit=crop',
    caption: 'Crowd gathering',
  },
  {
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=500&fit=crop',
    caption: 'DJ on the decks',
  },
  {
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=500&fit=crop',
    caption: 'Neon nights',
  },
  {
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=500&fit=crop',
    caption: 'Main stage energy',
  },
  {
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=500&fit=crop',
    caption: 'Venue vibes',
  },
  {
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=500&fit=crop',
    caption: 'Open-air set',
  },
  {
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=500&fit=crop',
    caption: 'Squad night out',
  },
]

const PHOTOS_PER_PAGE = 4

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size))
  }
  return pages
}

export function JoinTheWaveGallery() {
  const pages = chunk(wavePhotos, PHOTOS_PER_PAGE)

  return (
    <div className="mx-auto w-full max-w-5xl">
      <MarketingCarousel
        ariaLabel="Community photos from the wave"
        autoAdvanceMs={5500}
        centered
        maxWidthClass="max-w-5xl"
        slides={pages.map((page, pageIndex) => ({
          id: `wave-page-${pageIndex}`,
          content: (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {page.map((photo, photoIndex) => (
                <figure
                  key={photo.src}
                  className="glow-card overflow-hidden rounded-2xl border border-white/8"
                  style={{ animationDelay: `${photoIndex * 80}ms` }}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <figcaption className="bg-surface-2 px-3 py-2 text-xs text-muted">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ),
        }))}
      />

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/app"
          className="rounded-full gradient-brand px-6 py-3 text-sm font-semibold"
        >
          Browse the wave
        </Link>
        <Link
          to="/app/community"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 hover:border-accent/50 hover:text-accent"
        >
          See community feed
        </Link>
      </div>
    </div>
  )
}
