import { useState } from 'react'
import { cn } from '@/lib/cn'

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function CommitmentsCalendar({
  commitmentDates,
  selected,
  onSelect,
}: {
  commitmentDates: Date[]
  selected: Date | null
  onSelect: (day: Date | null) => void
}) {
  const today = startOfDay(new Date())
  const [cursor, setCursor] = useState(() => startOfDay(today))

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const first = new Date(year, month, 1)
  const startPad = (first.getDay() + 6) % 7 // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: Array<Date | null> = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]

  const hasCommitment = (day: Date) =>
    commitmentDates.some((d) => sameDay(startOfDay(d), day))

  const label = cursor.toLocaleDateString('en-ZA', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="rounded-2xl border border-white/8 bg-surface-2 p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          className="min-h-10 rounded-full px-3 text-sm text-muted hover:text-white"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
        >
          Prev
        </button>
        <p className="font-heading text-sm font-semibold">{label}</p>
        <button
          type="button"
          className="min-h-10 rounded-full px-3 text-sm text-muted hover:text-white"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
        >
          Next
        </button>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wide text-muted">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`pad-${i}`} />
          const active = selected ? sameDay(selected, day) : false
          const marked = hasCommitment(day)
          const isToday = sameDay(day, today)
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect(active ? null : day)}
              className={cn(
                'relative flex min-h-10 flex-col items-center justify-center rounded-xl text-sm',
                active
                  ? 'gradient-brand text-white'
                  : isToday
                    ? 'border border-accent/40 text-accent'
                    : 'hover:bg-white/5',
              )}
            >
              {day.getDate()}
              {marked ? (
                <span
                  className={cn(
                    'mt-0.5 h-1 w-1 rounded-full',
                    active ? 'bg-white' : 'bg-accent',
                  )}
                />
              ) : (
                <span className="mt-0.5 h-1 w-1" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
