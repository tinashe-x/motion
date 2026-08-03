import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function ScrollReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-white/8',
        className,
      )}
    />
  )
}

export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface-2">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  )
}

export function PhotoPostSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 bg-surface-2">
      <div className="flex items-center gap-3 px-4 py-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-32" />
        </div>
      </div>
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

export function GridPhotoSkeleton() {
  return <Skeleton className="mb-3 aspect-[4/5] w-full break-inside-avoid rounded-2xl" />
}
