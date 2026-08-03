import { useMemo, useState } from 'react'
import { PhotoPost } from '@/components/PhotoPost'
import { PhotoPostSkeleton } from '@/components/ui/Skeleton'
import { useAppState } from '@/context/AppState'
import { useMockLoading } from '@/hooks/useMockLoading'
import { usePullToRefresh } from '@/hooks/usePullToRefresh'

const PAGE_SIZE = 3

export function ActivityPage() {
  const { photos, hiddenPhotoIds, pushToast } = useAppState()
  const loading = useMockLoading()
  const [page, setPage] = useState(1)

  const feed = useMemo(
    () =>
      [...photos]
        .filter((p) => !p.isFlagged && !hiddenPhotoIds.includes(p.id))
        .sort(
          (a, b) =>
            new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime(),
        ),
    [photos, hiddenPhotoIds],
  )

  const visible = feed.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < feed.length

  const { refreshing, onTouchStart, onTouchEnd } = usePullToRefresh(async () => {
    await new Promise((r) => setTimeout(r, 600))
    setPage(1)
    pushToast('Feed refreshed')
  })

  return (
    <div
      className="pb-6 pt-4 md:pt-8"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="font-heading text-2xl font-bold">Activity Feed</h1>
      <p className="mt-1 text-sm text-muted">
        Live moments from across Motion
        {refreshing ? ' · Refreshing…' : ''}
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <PhotoPostSkeleton key={i} />)
        ) : visible.length ? (
          visible.map((photo) => <PhotoPost key={photo.id} photo={photo} />)
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted md:col-span-2 lg:col-span-3 xl:col-span-4">
            No activity yet — verify a photo at an event to start the wave.
          </div>
        )}
      </div>
      {hasMore && !loading ? (
        <button
          type="button"
          onClick={() => setPage((p) => p + 1)}
          className="mt-6 min-h-11 w-full rounded-full border border-white/15 text-sm font-semibold text-muted hover:text-white"
        >
          Load more
        </button>
      ) : null}
    </div>
  )
}
