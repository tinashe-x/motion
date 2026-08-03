import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { getProfile } from '@/data/mock'
import { useAppState } from '@/context/AppState'
import { useMockLoading } from '@/hooks/useMockLoading'
import { GridPhotoSkeleton } from '@/components/ui/Skeleton'
import type { EventPhoto } from '@/types'

export function CommunityPage() {
  const { photos, hiddenPhotoIds } = useAppState()
  const loading = useMockLoading()
  const [selected, setSelected] = useState<EventPhoto | null>(null)

  const grid = useMemo(
    () =>
      [...photos]
        .filter((p) => !p.isFlagged && !hiddenPhotoIds.includes(p.id))
        .sort((a, b) => b.moodTags.length - a.moodTags.length),
    [photos, hiddenPhotoIds],
  )

  return (
    <div className="pb-6 pt-4 md:pt-8">
      <h1 className="font-heading text-2xl font-bold">Join the Wave</h1>
      <p className="mt-1 text-sm text-muted">See what others are up to</p>
      <div className="mt-5 columns-2 gap-3 space-y-3 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <GridPhotoSkeleton key={i} />)
          : grid.map((photo) => {
              const user = getProfile(photo.userId)
              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelected(photo)}
                  className="block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/8 text-left"
                >
                  <img src={photo.photoUrl} alt="" className="w-full object-cover" />
                  <div className="bg-surface-2 px-2.5 py-2">
                    <p className="line-clamp-2 text-xs">{photo.caption}</p>
                    <p className="mt-1 text-[11px] text-muted">@{user?.username}</p>
                  </div>
                </button>
              )
            })}
      </div>
      {!loading && !grid.length ? (
        <p className="mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
          No community moments yet.
        </p>
      ) : null}

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 sm:items-center sm:justify-center">
          <div className="max-h-[90dvh] w-full max-w-md overflow-auto rounded-3xl border border-white/10 bg-[#16161d]">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="font-heading font-semibold">Moment</p>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/5"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>
            </div>
            <img src={selected.photoUrl} alt="" className="aspect-[4/5] w-full object-cover" />
            <div className="space-y-3 p-4">
              <p>{selected.caption}</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.moodTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/20 px-2.5 py-1 text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={`/app/event/${selected.eventId}`}
                className="inline-flex min-h-11 items-center rounded-full gradient-brand px-5 text-sm font-semibold"
              >
                View Event
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
