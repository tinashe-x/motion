import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, CheckCheck } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { getProfile } from '@/data/mock'
import { cn } from '@/lib/cn'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function MessagesThreadPage() {
  const { threadId } = useParams()
  const {
    dmThreads,
    dmMessages,
    profile,
    sendDm,
    markThreadRead,
  } = useAppState()
  const [draft, setDraft] = useState('')

  const thread = dmThreads.find((t) => t.id === threadId)
  const otherId = thread?.participantIds.find((id) => id !== profile.id)
  const other = otherId ? getProfile(otherId) : undefined

  const messages = useMemo(
    () =>
      dmMessages
        .filter((m) => m.threadId === threadId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
    [dmMessages, threadId],
  )

  useEffect(() => {
    if (threadId) markThreadRead(threadId)
  }, [threadId, markThreadRead, messages.length])

  if (!thread) {
    return (
      <div className="p-6 text-center text-sm text-muted">
        Conversation not found.{' '}
        <Link to="/app/messages" className="text-accent">
          Back to inbox
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-[70dvh] flex-col pb-6 pt-4 md:pt-8">
      <header className="mb-4 flex items-center gap-3">
        <Link
          to="/app/messages"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted"
          aria-label="Back to inbox"
        >
          <ArrowLeft size={18} />
        </Link>
        <img
          src={other?.avatarUrl}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h1 className="font-heading text-lg font-bold">
            {other?.displayName}
          </h1>
          <p className="text-xs text-muted">@{other?.username}</p>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-auto rounded-2xl border border-white/8 bg-surface-2 p-4">
        {messages.map((m) => {
          const mine = m.senderId === profile.id
          return (
            <div
              key={m.id}
              className={cn('flex', mine ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-3.5 py-2 text-sm',
                  mine
                    ? 'rounded-br-md gradient-brand'
                    : 'rounded-bl-md bg-white/8',
                )}
              >
                <p>{m.body}</p>
                <div
                  className={cn(
                    'mt-1 flex items-center justify-end gap-1 text-[10px]',
                    mine ? 'text-white/70' : 'text-muted',
                  )}
                >
                  <span>{formatTime(m.createdAt)}</span>
                  {mine ? (
                    m.readAt ? (
                      <CheckCheck size={12} className="text-accent" />
                    ) : (
                      <Check size={12} />
                    )
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          sendDm(thread.id, draft)
          setDraft('')
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message…"
          className="min-h-11 flex-1 rounded-full border border-white/10 bg-black/30 px-4 text-sm outline-none focus:border-accent/40"
        />
        <button
          type="submit"
          className="min-h-11 rounded-full gradient-brand px-5 text-sm font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  )
}
