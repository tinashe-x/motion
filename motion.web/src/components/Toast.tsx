import { useAppState } from '@/context/AppState'
import { X } from 'lucide-react'

export function ToastStack() {
  const { toasts, dismissToast } = useAppState()
  if (!toasts.length) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-secondary/30 bg-[#1a1228]/95 px-4 py-3 text-sm shadow-[0_12px_40px_rgba(74,0,224,0.35)] backdrop-blur"
        >
          <span className="flex-1">{toast.message}</span>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-white"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
