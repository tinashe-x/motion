import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  bolts as seedBolts,
  comments as seedComments,
  currentUser as seedUser,
  dmMessages as seedDmMessages,
  dmThreads as seedDmThreads,
  events as seedEvents,
  friendships as seedFriendships,
  initialAttendance,
  liveUpdates as seedLiveUpdates,
  photos as seedPhotos,
  posts as seedPosts,
} from '@/data/mock'
import {
  boltEquivalentsWithPosts,
  chargeNormalized,
  motionMeterScore,
} from '@/lib/motionMeter'
import type {
  Attendance,
  AttendanceStatus,
  BoltReact,
  BoltTargetType,
  Comment,
  ContentReport,
  DmMessage,
  DmThread,
  EventCategory,
  EventItem,
  EventPhoto,
  Friendship,
  LiveUpdate,
  LiveUpdateKind,
  Post,
  Profile,
  PromotionTier,
  SubmitPhotoInput,
  UserRole,
} from '@/types'

interface ToastItem {
  id: string
  message: string
}

interface AppStateValue {
  authenticated: boolean
  onboardingDone: boolean
  profile: Profile
  events: EventItem[]
  photos: EventPhoto[]
  attendance: Attendance[]
  contentReports: ContentReport[]
  hiddenPhotoIds: string[]
  friendships: Friendship[]
  posts: Post[]
  comments: Comment[]
  bolts: BoltReact[]
  dmThreads: DmThread[]
  dmMessages: DmMessage[]
  liveUpdates: LiveUpdate[]
  toasts: ToastItem[]
  friendIds: string[]
  completeOnboarding: () => void
  login: (email?: string) => void
  logout: () => void
  signup: (username: string, email?: string) => void
  updateProfile: (patch: Partial<Profile>, silent?: boolean) => void
  setAttendance: (eventId: string, status: AttendanceStatus) => void
  reportPhoto: (photoId: string, reason: string) => void
  hidePhoto: (photoId: string) => void
  submitPhoto: (input: SubmitPhotoInput) => void
  submitHostEvent: (input: {
    name: string
    description: string
    venueAddress: string
    category: EventCategory
    startTime: string
    endTime: string
    promotionTier: PromotionTier
    coverUrl?: string
  }) => void
  toggleBolt: (targetType: BoltTargetType, targetId: string) => void
  addComment: (postId: string, body: string) => void
  sendDm: (threadId: string, body: string) => void
  openOrCreateThread: (otherUserId: string) => string
  markThreadRead: (threadId: string) => void
  getEventCharge: (eventId: string) => {
    equivalents: number
    chargeNorm: number
    score: number
  }
  getPostBoltCount: (postId: string) => number
  hasBolted: (targetType: BoltTargetType, targetId: string) => boolean
  unreadDmCount: number
  pushToast: (message: string) => void
  dismissToast: (id: string) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

const AUTH_KEY = 'motion.authenticated'
const ONBOARD_KEY = 'motion.onboardingDone'
const PROFILE_KEY = 'motion.profile'
const BOLTS_KEY = 'motion.bolts'
const COMMENTS_KEY = 'motion.comments'
const DM_THREADS_KEY = 'motion.dmThreads'
const DM_MESSAGES_KEY = 'motion.dmMessages'
const LIVE_UPDATES_KEY = 'motion.liveUpdates'
const POSTS_KEY = 'motion.posts'
const ATTENDANCE_KEY = 'motion.attendance'

function roleFromEmail(email: string): UserRole {
  const e = email.toLowerCase()
  if (e.includes('admin@')) return 'admin'
  if (e.includes('moderator@')) return 'moderator'
  if (e.includes('host@')) return 'host'
  return 'user'
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as T
  } catch {
    /* ignore */
  }
  return fallback
}

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (raw) return { ...seedUser, ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return seedUser
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === '1',
  )
  const [onboardingDone, setOnboardingDone] = useState(
    () => localStorage.getItem(ONBOARD_KEY) === '1',
  )
  const [profile, setProfile] = useState<Profile>(loadProfile)
  const [events, setEvents] = useState<EventItem[]>(seedEvents)
  const [photos, setPhotos] = useState<EventPhoto[]>(seedPhotos)
  const [attendance, setAttendanceState] = useState<Attendance[]>(() =>
    loadJson(ATTENDANCE_KEY, initialAttendance),
  )
  const [contentReports, setContentReports] = useState<ContentReport[]>([])
  const [hiddenPhotoIds, setHiddenPhotoIds] = useState<string[]>([])
  const [friendships] = useState<Friendship[]>(seedFriendships)
  const [posts, setPosts] = useState<Post[]>(() =>
    loadJson(POSTS_KEY, seedPosts),
  )
  const [comments, setComments] = useState<Comment[]>(() =>
    loadJson(COMMENTS_KEY, seedComments),
  )
  const [bolts, setBolts] = useState<BoltReact[]>(() =>
    loadJson(BOLTS_KEY, seedBolts),
  )
  const [dmThreads, setDmThreads] = useState<DmThread[]>(() =>
    loadJson(DM_THREADS_KEY, seedDmThreads),
  )
  const [dmMessages, setDmMessages] = useState<DmMessage[]>(() =>
    loadJson(DM_MESSAGES_KEY, seedDmMessages),
  )
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>(() =>
    loadJson(LIVE_UPDATES_KEY, seedLiveUpdates),
  )
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const persist = useCallback((key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [])

  const persistProfile = useCallback((next: Profile) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
    setProfile(next)
  }, [])

  const pushToast = useCallback((message: string) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2800)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const appendLiveUpdate = useCallback(
    (eventId: string, kind: LiveUpdateKind, text: string) => {
      setLiveUpdates((prev) => {
        const next: LiveUpdate[] = [
          {
            id: crypto.randomUUID(),
            eventId,
            actorId: profile.id,
            kind,
            text,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]
        persist(LIVE_UPDATES_KEY, next)
        return next
      })
    },
    [persist, profile.id],
  )

  const friendIds = useMemo(() => {
    const ids = new Set<string>()
    for (const f of friendships) {
      if (f.userId === profile.id) ids.add(f.friendId)
      if (f.friendId === profile.id) ids.add(f.userId)
    }
    return [...ids]
  }, [friendships, profile.id])

  const getEventCharge = useCallback(
    (eventId: string) => {
      const event = events.find((e) => e.id === eventId)
      const postIdsForEvent = posts
        .filter((p) => p.eventId === eventId)
        .map((p) => p.id)
      const eventLinkedCommentCount = comments.filter((c) =>
        postIdsForEvent.includes(c.postId),
      ).length
      const equivalents = boltEquivalentsWithPosts({
        eventId,
        bolts,
        attendance,
        photos,
        postIdsForEvent,
        eventLinkedCommentCount,
      })
      const chargeNorm = chargeNormalized(equivalents)
      const score = motionMeterScore(
        event?.safetyScore ?? 0,
        event?.popularityScore ?? 0,
        chargeNorm,
      )
      return { equivalents, chargeNorm, score }
    },
    [attendance, bolts, comments, events, photos, posts],
  )

  const getPostBoltCount = useCallback(
    (postId: string) =>
      bolts.filter((b) => b.targetType === 'post' && b.targetId === postId)
        .length,
    [bolts],
  )

  const hasBolted = useCallback(
    (targetType: BoltTargetType, targetId: string) =>
      bolts.some(
        (b) =>
          b.userId === profile.id &&
          b.targetType === targetType &&
          b.targetId === targetId,
      ),
    [bolts, profile.id],
  )

  const unreadDmCount = useMemo(() => {
    const myThreads = dmThreads.filter((t) =>
      t.participantIds.includes(profile.id),
    )
    let count = 0
    for (const thread of myThreads) {
      const hasUnread = dmMessages.some(
        (m) =>
          m.threadId === thread.id &&
          m.senderId !== profile.id &&
          !m.readAt,
      )
      if (hasUnread) count += 1
    }
    return count
  }, [dmMessages, dmThreads, profile.id])

  const completeOnboarding = useCallback(() => {
    localStorage.setItem(ONBOARD_KEY, '1')
    setOnboardingDone(true)
  }, [])

  const login = useCallback(
    (email = '') => {
      const role = roleFromEmail(email)
      const next = role !== 'user' ? { ...profile, role } : profile
      if (role !== 'user') persistProfile(next)
      localStorage.setItem(AUTH_KEY, '1')
      setAuthenticated(true)
      pushToast('Welcome back to Motion')
    },
    [persistProfile, profile, pushToast],
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setAuthenticated(false)
    pushToast('Logged out')
  }, [pushToast])

  const signup = useCallback(
    (username: string, email = '') => {
      const role = roleFromEmail(email)
      const next = {
        ...profile,
        username: username || profile.username,
        displayName: username || profile.displayName,
        trustScore: 50,
        ...(role !== 'user' ? { role } : {}),
      }
      persistProfile(next)
      localStorage.setItem(AUTH_KEY, '1')
      localStorage.setItem(ONBOARD_KEY, '1')
      setOnboardingDone(true)
      setAuthenticated(true)
      pushToast('Account created — explore nearby events')
    },
    [persistProfile, profile, pushToast],
  )

  const updateProfile = useCallback(
    (patch: Partial<Profile>, silent = false) => {
      persistProfile({ ...profile, ...patch })
      if (!silent) pushToast('Settings saved')
    },
    [persistProfile, profile, pushToast],
  )

  const setAttendance = useCallback(
    (eventId: string, status: AttendanceStatus) => {
      setAttendanceState((prev) => {
        const existing = prev.find(
          (a) => a.eventId === eventId && a.userId === profile.id,
        )
        let next: Attendance[]
        if (existing) {
          next = prev.map((a) =>
            a.id === existing.id ? { ...a, status } : a,
          )
        } else {
          next = [
            ...prev,
            {
              id: crypto.randomUUID(),
              eventId,
              userId: profile.id,
              status,
            },
          ]
        }
        persist(ATTENDANCE_KEY, next)
        return next
      })
      if (status === 'going' || status === 'here_now') {
        appendLiveUpdate(
          eventId,
          status === 'here_now' ? 'checkin' : 'rsvp',
          `${profile.displayName} ${status === 'here_now' ? 'checked in' : 'joined the night'}`,
        )
      }
      pushToast(
        status === 'going'
          ? 'Joined event'
          : status === 'saved'
            ? 'Event saved'
            : 'Status updated',
      )
    },
    [appendLiveUpdate, persist, profile.displayName, profile.id, pushToast],
  )

  const reportPhoto = useCallback(
    (photoId: string, reason: string) => {
      setContentReports((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          photoId,
          reason,
          status: 'pending',
          createdAt: new Date().toISOString(),
        },
      ])
      setPhotos((prev) =>
        prev.map((p) => {
          if (p.id !== photoId) return p
          const reportCount = p.reportCount + 1
          return {
            ...p,
            reportCount,
            isFlagged: reportCount >= 3 ? true : p.isFlagged,
          }
        }),
      )
      pushToast('Photo reported — thank you')
    },
    [pushToast],
  )

  const hidePhoto = useCallback(
    (photoId: string) => {
      setHiddenPhotoIds((prev) => [...prev, photoId])
      pushToast('Photo hidden')
    },
    [pushToast],
  )

  const submitPhoto = useCallback(
    (input: SubmitPhotoInput) => {
      const photo: EventPhoto = {
        id: crypto.randomUUID(),
        eventId: input.eventId,
        userId: profile.id,
        photoUrl: input.photoUrl,
        caption: input.caption,
        moodTags: input.moodTags,
        capturedAt: new Date().toISOString(),
        isVerified: input.isVerified,
        isFlagged: false,
        reportCount: 0,
      }
      setPhotos((prev) => [photo, ...prev])
      if (input.isVerified) {
        const post: Post = {
          id: crypto.randomUUID(),
          authorId: profile.id,
          eventId: input.eventId,
          caption: input.caption,
          mediaUrl: input.photoUrl,
          createdAt: new Date().toISOString(),
        }
        setPosts((prev) => {
          const next = [post, ...prev]
          persist(POSTS_KEY, next)
          return next
        })
        appendLiveUpdate(
          input.eventId,
          'photo',
          `${profile.displayName} dropped a verified moment`,
        )
      }
      pushToast(
        input.isVerified
          ? 'Verified photo submitted'
          : 'Photo submitted as unverified',
      )
    },
    [appendLiveUpdate, persist, profile.displayName, profile.id, pushToast],
  )

  const submitHostEvent = useCallback(
    (input: {
      name: string
      description: string
      venueAddress: string
      category: EventCategory
      startTime: string
      endTime: string
      promotionTier: PromotionTier
      coverUrl?: string
    }) => {
      const event: EventItem = {
        id: crypto.randomUUID(),
        hostId: profile.id,
        venueId: 'v1',
        name: input.name,
        description: `${input.description}\n\nVenue: ${input.venueAddress}`,
        category: input.category,
        coverUrl:
          input.coverUrl ??
          'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&h=500&fit=crop',
        startTime: input.startTime,
        endTime: input.endTime,
        status: 'pending',
        promotionTier: input.promotionTier,
        popularityScore: 0,
        safetyScore: 100,
      }
      setEvents((prev) => [event, ...prev])
      if (profile.role === 'user') {
        persistProfile({ ...profile, role: 'host' })
      }
      pushToast('Event submitted for review')
    },
    [persistProfile, profile, pushToast],
  )

  const toggleBolt = useCallback(
    (targetType: BoltTargetType, targetId: string) => {
      let didAdd = false
      setBolts((prev) => {
        const existing = prev.find(
          (b) =>
            b.userId === profile.id &&
            b.targetType === targetType &&
            b.targetId === targetId,
        )
        let next: BoltReact[]
        if (existing) {
          didAdd = false
          next = prev.filter((b) => b.id !== existing.id)
        } else {
          didAdd = true
          next = [
            ...prev,
            {
              id: crypto.randomUUID(),
              userId: profile.id,
              targetType,
              targetId,
              createdAt: new Date().toISOString(),
            },
          ]
        }
        persist(BOLTS_KEY, next)
        return next
      })

      if (didAdd) {
        let eventId: string | undefined
        if (targetType === 'event') eventId = targetId
        else {
          eventId = posts.find((p) => p.id === targetId)?.eventId
        }
        if (eventId) {
          appendLiveUpdate(
            eventId,
            'bolt',
            `${profile.displayName} charged the Motion Meter`,
          )
        }
        pushToast('Bolt charged')
      }
    },
    [appendLiveUpdate, persist, posts, profile.displayName, profile.id, pushToast],
  )

  const addComment = useCallback(
    (postId: string, body: string) => {
      const trimmed = body.trim()
      if (!trimmed) return
      const comment: Comment = {
        id: crypto.randomUUID(),
        postId,
        authorId: profile.id,
        body: trimmed,
        createdAt: new Date().toISOString(),
      }
      setComments((prev) => {
        const next = [...prev, comment]
        persist(COMMENTS_KEY, next)
        return next
      })
      const post = posts.find((p) => p.id === postId)
      if (post?.eventId) {
        appendLiveUpdate(
          post.eventId,
          'comment',
          `${profile.displayName} commented on a moment`,
        )
      }
      pushToast('Comment added')
    },
    [appendLiveUpdate, persist, posts, profile.displayName, profile.id, pushToast],
  )

  const openOrCreateThread = useCallback(
    (otherUserId: string) => {
      const existing = dmThreads.find(
        (t) =>
          t.participantIds.includes(profile.id) &&
          t.participantIds.includes(otherUserId),
      )
      if (existing) return existing.id
      const thread: DmThread = {
        id: crypto.randomUUID(),
        participantIds: [profile.id, otherUserId],
        updatedAt: new Date().toISOString(),
      }
      setDmThreads((prev) => {
        const next = [thread, ...prev]
        persist(DM_THREADS_KEY, next)
        return next
      })
      return thread.id
    },
    [dmThreads, persist, profile.id],
  )

  const sendDm = useCallback(
    (threadId: string, body: string) => {
      const trimmed = body.trim()
      if (!trimmed) return
      const message: DmMessage = {
        id: crypto.randomUUID(),
        threadId,
        senderId: profile.id,
        body: trimmed,
        createdAt: new Date().toISOString(),
      }
      setDmMessages((prev) => {
        const next = [...prev, message]
        persist(DM_MESSAGES_KEY, next)
        return next
      })
      setDmThreads((prev) => {
        const next = prev.map((t) =>
          t.id === threadId
            ? { ...t, updatedAt: message.createdAt }
            : t,
        )
        persist(DM_THREADS_KEY, next)
        return next
      })
    },
    [persist, profile.id],
  )

  const markThreadRead = useCallback(
    (threadId: string) => {
      const now = new Date().toISOString()
      setDmMessages((prev) => {
        const next = prev.map((m) =>
          m.threadId === threadId &&
          m.senderId !== profile.id &&
          !m.readAt
            ? { ...m, readAt: now }
            : m,
        )
        persist(DM_MESSAGES_KEY, next)
        return next
      })
    },
    [persist, profile.id],
  )

  const value = useMemo<AppStateValue>(
    () => ({
      authenticated,
      onboardingDone,
      profile,
      events,
      photos,
      attendance,
      contentReports,
      hiddenPhotoIds,
      friendships,
      posts,
      comments,
      bolts,
      dmThreads,
      dmMessages,
      liveUpdates,
      toasts,
      friendIds,
      completeOnboarding,
      login,
      logout,
      signup,
      updateProfile,
      setAttendance,
      reportPhoto,
      hidePhoto,
      submitPhoto,
      submitHostEvent,
      toggleBolt,
      addComment,
      sendDm,
      openOrCreateThread,
      markThreadRead,
      getEventCharge,
      getPostBoltCount,
      hasBolted,
      unreadDmCount,
      pushToast,
      dismissToast,
    }),
    [
      authenticated,
      onboardingDone,
      profile,
      events,
      photos,
      attendance,
      contentReports,
      hiddenPhotoIds,
      friendships,
      posts,
      comments,
      bolts,
      dmThreads,
      dmMessages,
      liveUpdates,
      toasts,
      friendIds,
      completeOnboarding,
      login,
      logout,
      signup,
      updateProfile,
      setAttendance,
      reportPhoto,
      hidePhoto,
      submitPhoto,
      submitHostEvent,
      toggleBolt,
      addComment,
      sendDm,
      openOrCreateThread,
      markThreadRead,
      getEventCharge,
      getPostBoltCount,
      hasBolted,
      unreadDmCount,
      pushToast,
      dismissToast,
    ],
  )

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
