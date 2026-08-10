import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { getProfile } from '@/data/mock'
import { cn } from '@/lib/cn'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function MessagesInboxPage() {
  const { dmThreads, dmMessages, profile } = useAppState()

  const rows = useMemo(() => {
    return [...dmThreads]
      .filter((t) => t.participantIds.includes(profile.id))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .map((thread) => {
        const otherId = thread.participantIds.find((id) => id !== profile.id)!
        const other = getProfile(otherId)
        const messages = dmMessages
          .filter((m) => m.threadId === thread.id)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
        const last = messages[messages.length - 1]
        const unread = messages.some(
          (m) => m.senderId !== profile.id && !m.readAt,
        )
        return { thread, other, last, unread }
      })
  }, [dmMessages, dmThreads, profile.id])

  return (
    <div className="pb-6 pt-4 md:pt-8">
      <header className="mb-5 flex items-center gap-3">
        <Link
          to="/app/home"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-heading text-2xl font-bold">Messages</h1>
          <p className="text-sm text-muted">DMs with friends</p>
        </div>
      </header>

      <div className="space-y-2">
        {rows.length ? (
          rows.map(({ thread, other, last, unread }) => (
            <Link
              key={thread.id}
              to={`/app/messages/${thread.id}`}
              className={cn(
                'flex items-center gap-3 rounded-2xl border border-white/8 bg-surface-2 px-4 py-3 transition hover:border-secondary/40',
                unread && 'border-accent/30',
              )}
            >
              <img
                src={other?.avatarUrl}
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-heading font-semibold">
                    {other?.displayName}
                  </p>
                  {last ? (
                    <span className="shrink-0 text-[11px] text-muted">
                      {formatTime(last.createdAt)}
                    </span>
                  ) : null}
                </div>
                <p
                  className={cn(
                    'truncate text-sm',
                    unread ? 'text-white' : 'text-muted',
                  )}
                >
                  {last?.body ?? 'No messages yet'}
                </p>
              </div>
              {unread ? (
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
              ) : null}
            </Link>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
            No conversations yet — message a friend from their post.
          </div>
        )}
      </div>
    </div>
  )
}
