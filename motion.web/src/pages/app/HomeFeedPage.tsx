import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Bell, Search, Send, SlidersHorizontal } from 'lucide-react'
import { EventCard } from '@/components/EventCard'
import { FriendPostCard } from '@/components/social/FriendPostCard'
import { EventCardSkeleton } from '@/components/ui/Skeleton'
import { useAppState } from '@/context/AppState'
import { useMockLoading } from '@/hooks/useMockLoading'
import type { EventCategory } from '@/types'
import { cn } from '@/lib/cn'

const chipCategories: Array<EventCategory | 'All'> = [
  'All',
  'Concert',
  'Networking',
  'Festival',
  'Nightclub',
  'Workshop',
]

const filterCategories: EventCategory[] = [
  'Concert',
  'Networking',
  'Festival',
  'Nightclub',
  'Workshop',
  'Other',
]

type SortKey = 'popular' | 'newest' | 'soon'
type HomeTab = 'friends' | 'discover'

export function HomeFeedPage() {
  const { profile, events, posts, friendIds, unreadDmCount, getEventCharge } =
    useAppState()
  const loading = useMockLoading()
  const [searchParams, setSearchParams] = useSearchParams()
  const tab: HomeTab =
    searchParams.get('tab') === 'discover' ? 'discover' : 'friends'

  const [category, setCategory] = useState<(typeof chipCategories)[number]>('All')
  const [sort, setSort] = useState<SortKey>('popular')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<EventCategory[]>([])

  const setTab = (next: HomeTab) => {
    setSearchParams(next === 'friends' ? {} : { tab: 'discover' })
  }

  const friendPosts = useMemo(
    () =>
      [...posts]
        .filter((p) => friendIds.includes(p.authorId) || p.authorId === profile.id)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [friendIds, posts, profile.id],
  )

  const filtered = useMemo(() => {
    let list = events.filter((e) => e.status === 'approved')
    if (category !== 'All') list = list.filter((e) => e.category === category)
    if (selectedTypes.length) {
      list = list.filter((e) => selectedTypes.includes(e.category))
    }
    list = [...list].sort((a, b) => {
      if (sort === 'popular') {
        return getEventCharge(b.id).score - getEventCharge(a.id).score
      }
      if (sort === 'newest')
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    })
    return list
  }, [events, category, sort, selectedTypes, getEventCharge])

  const toggleType = (cat: EventCategory) => {
    setSelectedTypes((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  return (
    <div className="pb-6 pt-4 md:pt-8">
      <header className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">Welcome to Motion</p>
          <h1 className="font-heading text-2xl font-bold">
            Hey, {profile.displayName}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted"
            aria-label="Search"
          >
            <Search size={18} />
          </button>
          <Link
            to="/app/messages"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted"
            aria-label="Messages"
          >
            <Send size={18} />
            {unreadDmCount > 0 ? (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            ) : null}
          </Link>
          <Link
            to="/app/notifications"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </Link>
        </div>
      </header>

      <div className="mb-5 flex gap-1 rounded-full border border-white/10 bg-surface-2 p-1">
        {(
          [
            ['friends', 'Friends'],
            ['discover', 'Discover'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              'min-h-10 flex-1 rounded-full text-sm font-semibold',
              tab === key ? 'gradient-brand' : 'text-muted',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'friends' ? (
        loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : friendPosts.length ? (
          <div className="mx-auto grid max-w-xl gap-4 md:max-w-none md:grid-cols-2 xl:grid-cols-3">
            {friendPosts.map((post) => (
              <FriendPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center">
            <p className="text-sm text-muted">
              No friend posts yet — discover what’s popping nearby.
            </p>
            <button
              type="button"
              onClick={() => setTab('discover')}
              className="mt-4 min-h-11 rounded-full gradient-brand px-5 text-sm font-semibold"
            >
              Open Discover
            </button>
          </div>
        )
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold">
              Recommended Events
            </h2>
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="inline-flex min-h-11 items-center gap-1 rounded-full border border-white/10 px-3 text-xs font-semibold text-muted"
            >
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>

          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {chipCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={cn(
                  'min-h-11 shrink-0 rounded-full px-4 text-sm font-medium',
                  category === c
                    ? 'gradient-brand text-white'
                    : 'border border-white/10 text-muted',
                )}
              >
                {c === 'All' ? 'All' : `${c}s`}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-muted">
              No events match your filters yet
            </div>
          )}
        </>
      )}

      {filterOpen ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 p-4">
          <div className="max-h-[85dvh] w-full overflow-auto rounded-3xl border border-white/10 bg-[#16161d] p-5">
            <h3 className="font-heading text-lg font-semibold">Filter Events</h3>
            <p className="mt-4 text-sm text-muted">Event Types</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleType(cat)}
                  className={cn(
                    'min-h-10 rounded-full px-4 text-sm',
                    selectedTypes.includes(cat)
                      ? 'gradient-brand'
                      : 'border border-white/10 text-muted',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">Popularity</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ['popular', 'Most Popular'],
                  ['newest', 'Newest'],
                  ['soon', 'Starting Soon'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSort(key)}
                  className={cn(
                    'min-h-11 rounded-full px-4 text-sm',
                    sort === key
                      ? 'bg-primary text-white'
                      : 'border border-white/10 text-muted',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategory('All')
                  setSort('popular')
                  setSelectedTypes([])
                }}
                className="min-h-11 flex-1 rounded-full border border-white/15 text-sm"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="min-h-11 flex-1 rounded-full gradient-brand text-sm font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
