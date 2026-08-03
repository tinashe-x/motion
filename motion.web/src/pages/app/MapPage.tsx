import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useAppState } from '@/context/AppState'
import { getVenue } from '@/data/mock'
import { pinColor } from '@/lib/geo'
import { cn } from '@/lib/cn'

const JHB = { lat: -26.2041, lng: 28.0473 }

export function MapPage() {
  const { events } = useAppState()
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [userLoc, setUserLoc] = useState(JHB)
  const [locLabel, setLocLabel] = useState('Johannesburg · default view')

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocLabel('Your location')
      },
      () => setLocLabel('Johannesburg · location denied'),
    )
  }, [])

  const approved = useMemo(() => {
    const list = events.filter((e) => e.status === 'approved')
    if (!query.trim()) return list
    const q = query.toLowerCase()
    return list.filter((e) => {
      const venue = getVenue(e.venueId)
      return (
        e.name.toLowerCase().includes(q) ||
        venue?.name.toLowerCase().includes(q) ||
        venue?.address.toLowerCase().includes(q)
      )
    })
  }, [events, query])

  const nearby = approved.slice(0, 5)
  const activeId = selectedId ?? nearby[0]?.id

  return (
    <div className="relative min-h-[calc(100dvh-5rem)] md:grid md:min-h-[calc(100dvh)] md:grid-cols-[1.6fr_0.9fr] xl:grid-cols-[1.8fr_0.8fr]">
      <div className="absolute inset-x-4 top-4 z-10 md:left-6 md:right-auto md:w-80">
        <label className="flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-[#121218]/90 px-4 backdrop-blur">
          <Search size={16} className="text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events or venues"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <div className="relative h-[58vh] overflow-hidden bg-[radial-gradient(circle_at_30%_40%,rgba(74,0,224,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(142,45,226,0.25),transparent_40%),#14141a] md:h-auto md:min-h-full">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
        <p className="absolute left-4 top-20 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-muted backdrop-blur md:top-24">
          {locLabel} · mock map
        </p>
        <span
          className="absolute h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
          style={{ left: '50%', top: '50%' }}
          title="You"
        />
        {nearby.map((event, i) => {
          const left = 18 + ((i * 17) % 60)
          const top = 28 + ((i * 13) % 45)
          const color = pinColor(event.category, event.safetyScore)
          return (
            <button
              key={event.id}
              type="button"
              onClick={() => setSelectedId(event.id)}
              className={cn(
                'absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition-transform',
                activeId === event.id && 'scale-125',
              )}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: color,
                boxShadow: `0 0 16px ${color}88`,
              }}
              aria-label={event.name}
            />
          )
        })}
        <p className="absolute bottom-4 left-4 text-[10px] text-muted">
          Center: {userLoc.lat.toFixed(3)}, {userLoc.lng.toFixed(3)}
        </p>
      </div>

      <div className="relative z-10 -mt-8 space-y-3 rounded-t-3xl border border-white/10 bg-[#121218] pb-6 pt-5 md:mt-0 md:rounded-none md:border-0 md:border-l md:px-8 md:pt-8 lg:px-10">
        <h2 className="font-heading text-lg font-semibold">Events Near You</h2>
        <p className="text-sm text-muted">Find exciting events happening now</p>
        <div className="flex gap-3 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {nearby.map((event) => {
            const venue = getVenue(event.venueId)
            return (
              <Link
                key={event.id}
                to={`/app/event/${event.id}`}
                onClick={() => setSelectedId(event.id)}
                className={cn(
                  'min-w-[220px] rounded-2xl border p-4 md:min-w-0',
                  activeId === event.id
                    ? 'border-secondary/50 bg-primary/20'
                    : 'border-white/10 bg-surface-2',
                )}
              >
                <p className="font-heading text-sm font-semibold">{event.name}</p>
                <p className="mt-1 text-xs text-muted">{venue?.name}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
