import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MessageCircle, MessageSquare } from 'lucide-react'
import { BoltButton } from '@/components/MotionMeter'
import { CommentSheet } from '@/components/social/CommentSheet'
import { useAppState } from '@/context/AppState'
import { getProfile } from '@/data/mock'
import type { Post } from '@/types'
import { cn } from '@/lib/cn'

function timeAgo(iso: string) {
  const mins = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 60000),
  )
  if (mins < 60) return `${mins}m`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h`
  return `${Math.round(hours / 24)}d`
}

export function FriendPostCard({ post }: { post: Post }) {
  const navigate = useNavigate()
  const {
    comments,
    getPostBoltCount,
    hasBolted,
    toggleBolt,
    openOrCreateThread,
    profile,
    events,
  } = useAppState()
  const [commentsOpen, setCommentsOpen] = useState(false)
  const author = getProfile(post.authorId)
  const event = post.eventId
    ? events.find((e) => e.id === post.eventId)
    : undefined
  const boltCount = getPostBoltCount(post.id)
  const bolted = hasBolted('post', post.id)
  const commentCount = useMemo(
    () => comments.filter((c) => c.postId === post.id).length,
    [comments, post.id],
  )

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-white/8 bg-surface-2">
        <header className="flex items-center gap-3 px-4 py-3">
          <img
            src={author?.avatarUrl}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-sm font-semibold">
              {author?.displayName}
            </p>
            <p className="text-xs text-muted">
              @{author?.username} · {timeAgo(post.createdAt)}
            </p>
          </div>
          {post.authorId !== profile.id ? (
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted hover:text-white"
              aria-label="Message"
              onClick={() => {
                const id = openOrCreateThread(post.authorId)
                navigate(`/app/messages/${id}`)
              }}
            >
              <MessageSquare size={16} />
            </button>
          ) : null}
        </header>

        {post.mediaUrl ? (
          <img
            src={post.mediaUrl}
            alt=""
            className="aspect-[4/5] w-full object-cover"
          />
        ) : null}

        <div className="space-y-3 px-4 py-3">
          <p className="text-sm leading-relaxed">{post.caption}</p>
          {event ? (
            <Link
              to={`/app/event/${event.id}`}
              className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-accent hover:border-accent/40"
            >
              {event.name}
            </Link>
          ) : null}
          <div className="flex items-center gap-2">
            <BoltButton
              active={bolted}
              count={boltCount}
              onClick={() => toggleBolt('post', post.id)}
            />
            <button
              type="button"
              onClick={() => setCommentsOpen(true)}
              className={cn(
                'inline-flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-xs font-semibold text-muted hover:text-white',
              )}
            >
              <MessageCircle size={14} />
              {commentCount}
            </button>
          </div>
        </div>
      </article>

      {commentsOpen ? (
        <CommentSheet postId={post.id} onClose={() => setCommentsOpen(false)} />
      ) : null}
    </>
  )
}
