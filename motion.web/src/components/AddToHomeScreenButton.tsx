import { Check, Download, Share, X } from 'lucide-react'
import { usePwaInstall } from '@/hooks/usePwaInstall'
import { cn } from '@/lib/cn'

type AddToHomeScreenButtonProps = {
  className?: string
  variant?: 'primary' | 'secondary'
}

export function AddToHomeScreenButton({
  className,
  variant = 'primary',
}: AddToHomeScreenButtonProps) {
  const {
    install,
    isInstalled,
    isIOS,
    canNativeInstall,
    showIOSGuide,
    dismissIOSGuide,
  } = usePwaInstall()

  if (isInstalled) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent',
          className,
        )}
      >
        <Check size={16} /> Added to Home Screen
      </span>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => install()}
        className={cn(
          'inline-flex items-center gap-2',
          variant === 'primary'
            ? 'rounded-full gradient-brand px-6 py-3 text-sm font-semibold shadow-[0_0_24px_rgba(74,0,224,0.35)]'
            : 'rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent hover:bg-accent/15',
          className,
        )}
      >
        <Download size={16} />
        Add to Home Screen
      </button>

      {!canNativeInstall && !isIOS ? (
        <p className="mt-2 text-xs text-muted">
          In Chrome or Edge: tap the button above, or use the browser menu → Install Motion.
        </p>
      ) : null}

      {showIOSGuide ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-install-title"
          onClick={dismissIOSGuide}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface-2 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 id="ios-install-title" className="font-heading text-lg font-semibold">
                Add Motion to your Home Screen
              </h3>
              <button
                type="button"
                onClick={dismissIOSGuide}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-muted hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <ol className="mt-5 space-y-4 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/30 text-xs font-bold text-accent">
                  1
                </span>
                <span>
                  Tap the <Share size={14} className="mx-0.5 inline text-accent" />{' '}
                  <strong>Share</strong> button in Safari (bottom of the screen).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/30 text-xs font-bold text-accent">
                  2
                </span>
                <span>
                  Scroll and tap <strong>Add to Home Screen</strong>, then confirm.
                </span>
              </li>
            </ol>
            <button
              type="button"
              onClick={dismissIOSGuide}
              className="mt-6 w-full rounded-full gradient-brand py-3 text-sm font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
