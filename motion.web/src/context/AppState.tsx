import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  currentUser as seedUser,
  events as seedEvents,
  initialAttendance,
  photos as seedPhotos,
} from '@/data/mock'
import type {
  Attendance,
  AttendanceStatus,
  ContentReport,
  EventCategory,
  EventItem,
  EventPhoto,
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
  toasts: ToastItem[]
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
  pushToast: (message: string) => void
  dismissToast: (id: string) => void
}

const AppStateContext = createContext<AppStateValue | null>(null)

const AUTH_KEY = 'motion.authenticated'
const ONBOARD_KEY = 'motion.onboardingDone'
const PROFILE_KEY = 'motion.profile'

function roleFromEmail(email: string): UserRole {
  const e = email.toLowerCase()
  if (e.includes('admin@')) return 'admin'
  if (e.includes('moderator@')) return 'moderator'
  if (e.includes('host@')) return 'host'
  return 'user'
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
  const [attendance, setAttendanceState] =
    useState<Attendance[]>(initialAttendance)
  const [contentReports, setContentReports] = useState<ContentReport[]>([])
  const [hiddenPhotoIds, setHiddenPhotoIds] = useState<string[]>([])
  const [toasts, setToasts] = useState<ToastItem[]>([])

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
        if (existing) {
          return prev.map((a) =>
            a.id === existing.id ? { ...a, status } : a,
          )
        }
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            eventId,
            userId: profile.id,
            status,
          },
        ]
      })
      pushToast(
        status === 'going'
          ? 'Joined event'
          : status === 'saved'
            ? 'Event saved'
            : 'Status updated',
      )
    },
    [profile.id, pushToast],
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
      pushToast(
        input.isVerified
          ? 'Verified photo submitted'
          : 'Photo submitted as unverified',
      )
    },
    [profile.id, pushToast],
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
      toasts,
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
      toasts,
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
