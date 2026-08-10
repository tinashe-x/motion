import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { getProfile } from '@/data/mock'

export function CommentSheet({
  postId,
  onClose,
}: {
  postId: string
  onClose: () => void
}) {
  const { comments, addComment, profile } = useAppState()
  const [draft, setDraft] = useState('')
  const list = useMemo(
    () =>
      comments
        .filter((c) => c.postId === postId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
    [comments, postId],
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 sm:items-center sm:justify-center">
      <div className="flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#16161d]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <p className="font-heading font-semibold">Comments</p>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/5"
            onClick={onClose}
            aria-label="Close comments"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-auto p-4">
          {list.length ? (
            list.map((c) => {
              const author =
                c.authorId === profile.id
                  ? profile
                  : getProfile(c.authorId)
              return (
                <div key={c.id} className="flex gap-3">
                  <img
                    src={author?.avatarUrl}
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1 rounded-2xl bg-white/5 px-3 py-2">
                    <p className="text-xs font-semibold">
                      {author?.displayName}
                    </p>
                    <p className="text-sm text-white/85">{c.body}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-center text-sm text-muted">
              No comments yet — keep the energy going.
            </p>
          )}
        </div>

        <form
          className="flex gap-2 border-t border-white/8 p-3"
          onSubmit={(e) => {
            e.preventDefault()
            addComment(postId, draft)
            setDraft('')
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a comment…"
            className="min-h-11 flex-1 rounded-full border border-white/10 bg-black/30 px-4 text-sm outline-none focus:border-accent/40"
          />
          <button
            type="submit"
            className="min-h-11 rounded-full gradient-brand px-4 text-sm font-semibold"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}
