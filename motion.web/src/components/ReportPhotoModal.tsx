import { useState } from 'react'
import { X } from 'lucide-react'

interface ReportPhotoModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
}

const reasons = [
  'Inappropriate content',
  'Not from this event',
  'Spam or misleading',
  'Safety concern',
  'Other',
]

export function ReportPhotoModal({
  open,
  onClose,
  onSubmit,
}: ReportPhotoModalProps) {
  const [reason, setReason] = useState(reasons[0])
  const [custom, setCustom] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 sm:items-center sm:justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#16161d] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Report this photo</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/5"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm text-muted">
          Help keep Motion trustworthy. Reports are anonymous.
        </p>
        <div className="mt-4 space-y-2">
          {reasons.map((r) => (
            <label
              key={r}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-white/8 px-3 text-sm"
            >
              <input
                type="radio"
                name="reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="accent-primary"
              />
              {r}
            </label>
          ))}
        </div>
        {reason === 'Other' ? (
          <textarea
            rows={2}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Tell us more..."
            className="mt-3 w-full rounded-xl border border-white/10 bg-surface-2 px-3 py-2 text-sm outline-none"
          />
        ) : null}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-full border border-white/15 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              onSubmit(reason === 'Other' ? custom || 'Other' : reason)
            }
            className="min-h-11 flex-1 rounded-full gradient-brand text-sm font-semibold"
          >
            Submit report
          </button>
        </div>
      </div>
    </div>
  )
}
