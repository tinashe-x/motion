import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flag, Link2, MoreHorizontal } from 'lucide-react'
import { formatEventWhen, getEvent, getProfile, getVenue } from '@/data/mock'
import { useAppState } from '@/context/AppState'
import { ReportPhotoModal } from '@/components/ReportPhotoModal'
import type { EventPhoto } from '@/types'

export function PhotoPost({ photo }: { photo: EventPhoto }) {
  const { reportPhoto, hidePhoto, pushToast } = useAppState()
  const [menuOpen, setMenuOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const user = getProfile(photo.userId)
  const event = getEvent(photo.eventId)
  const venue = event ? getVenue(event.venueId) : undefined

  if (photo.isFlagged) return null

  const copyLink = async () => {
    const url = `${window.location.origin}/app/event/${photo.eventId}`
    try {
      await navigator.clipboard.writeText(url)
      pushToast('Link copied')
    } catch {
      pushToast('Could not copy link')
    }
    setMenuOpen(false)
  }

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-white/8 bg-surface-2">
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={user?.avatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.username}</p>
            <p className="truncate text-xs text-muted">
              {formatEventWhen(photo.capturedAt)}
              {venue ? ` · ${venue.name}` : ''}
            </p>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-muted"
            onClick={() => setReportOpen(true)}
            aria-label="Report"
          >
            <Flag size={16} />
          </button>
          <div className="relative">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-muted"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="More"
            >
              <MoreHorizontal size={16} />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 z-10 mt-1 w-36 overflow-hidden rounded-xl border border-white/10 bg-[#1c1c24] text-sm shadow-xl">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-white/5"
                  onClick={() => {
                    setReportOpen(true)
                    setMenuOpen(false)
                  }}
                >
                  Report
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-white/5"
                  onClick={() => {
                    hidePhoto(photo.id)
                    setMenuOpen(false)
                  }}
                >
                  Hide
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-white/5"
                  onClick={copyLink}
                >
                  <Link2 size={14} /> Copy Link
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <Link to={`/app/event/${photo.eventId}`}>
          <img src={photo.photoUrl} alt="" className="aspect-[4/5] w-full object-cover" />
        </Link>
        <div className="space-y-2 px-4 py-3">
          <p className="text-sm">{photo.caption}</p>
          <div className="flex flex-wrap gap-1.5">
            {photo.moodTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/20 px-2.5 py-1 text-[11px] font-medium text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>
          {venue ? (
            <Link
              to={`/app/event/${photo.eventId}`}
              className="inline-block text-xs font-semibold text-accent"
            >
              {venue.name}
            </Link>
          ) : null}
        </div>
      </article>
      <ReportPhotoModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSubmit={(reason) => {
          reportPhoto(photo.id, reason)
          setReportOpen(false)
        }}
      />
    </>
  )
}
