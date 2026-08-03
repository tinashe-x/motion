import type {
  Attendance,
  EventItem,
  EventPhoto,
  Profile,
  Venue,
} from '@/types'

export const currentUser: Profile = {
  id: 'u1',
  username: 'thandi.waves',
  displayName: 'Thandi',
  bio: 'Event enthusiast — I love attending events and sharing moments.',
  avatarUrl:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces',
  trustScore: 82,
  instagramHandle: 'thandi.waves',
  twitterHandle: 'thandi_m',
  role: 'user',
  interests: ['Concert', 'Nightclub', 'Festival'],
  radiusKm: 15,
  profileVisibility: 'public',
  showSavedEvents: true,
  popiaConsent: true,
  notificationPrefs: {
    nearbyEvents: true,
    upcomingEvents: true,
    safetyAlerts: true,
    rsvpReminders: true,
  },
}

export const venues: Venue[] = [
  {
    id: 'v1',
    name: 'The Orbit',
    address: '81 De Korte St, Braamfontein, Johannesburg',
    latitude: -26.1929,
    longitude: 28.0337,
    contactInfo: 'info@theorbit.co.za',
    isVerifiedPartner: true,
  },
  {
    id: 'v2',
    name: 'Kitcheners Carvery Bar',
    address: '6 De Beer St, Braamfontein, Johannesburg',
    latitude: -26.1935,
    longitude: 28.0345,
    contactInfo: 'bookings@kitcheners.co.za',
    isVerifiedPartner: true,
  },
  {
    id: 'v3',
    name: 'Constitution Hill Amphitheatre',
    address: '11 Kotze St, Braamfontein, Johannesburg',
    latitude: -26.1888,
    longitude: 28.0422,
    contactInfo: 'events@constitutionhill.org.za',
    isVerifiedPartner: false,
  },
  {
    id: 'v4',
    name: 'Sandbox VIP',
    address: 'Sandton City, Johannesburg',
    latitude: -26.1086,
    longitude: 28.0547,
    contactInfo: 'host@sandboxvip.co.za',
    isVerifiedPartner: true,
  },
]

const hoursFromNow = (h: number) =>
  new Date(Date.now() + h * 60 * 60 * 1000).toISOString()

export const events: EventItem[] = [
  {
    id: 'e1',
    hostId: 'u2',
    venueId: 'v1',
    name: 'Amapiano Fridays Live',
    description:
      'Live DJ sets, verified crowd photos, and a Motion Meter that updates as the room fills. Come for the bass, stay for the vibe checks.',
    category: 'Nightclub',
    coverUrl:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop',
    startTime: hoursFromNow(3),
    endTime: hoursFromNow(9),
    status: 'approved',
    promotionTier: 'spotlight',
    popularityScore: 92,
    safetyScore: 88,
  },
  {
    id: 'e2',
    hostId: 'u3',
    venueId: 'v3',
    name: 'Johannesburg Indie Night',
    description:
      'Outdoor amphitheatre sets with local indie acts. Geofenced photo verification keeps the live feed honest.',
    category: 'Concert',
    coverUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop',
    startTime: hoursFromNow(26),
    endTime: hoursFromNow(32),
    status: 'approved',
    promotionTier: 'platinum',
    popularityScore: 78,
    safetyScore: 94,
  },
  {
    id: 'e3',
    hostId: 'u2',
    venueId: 'v2',
    name: 'Founders Networking Mixer',
    description:
      'Casual evening for builders and creatives. Low pressure, high signal — check the Motion Meter before you head out.',
    category: 'Networking',
    coverUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop',
    startTime: hoursFromNow(50),
    endTime: hoursFromNow(54),
    status: 'approved',
    promotionTier: 'basic',
    popularityScore: 64,
    safetyScore: 91,
  },
  {
    id: 'e4',
    hostId: 'u4',
    venueId: 'v4',
    name: 'Sandton Summer Festival',
    description:
      'Multi-stage festival with food trucks, pop-up markets, and verified attendee moments on the live feed.',
    category: 'Festival',
    coverUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=500&fit=crop',
    startTime: hoursFromNow(72),
    endTime: hoursFromNow(90),
    status: 'approved',
    promotionTier: 'premium',
    popularityScore: 85,
    safetyScore: 80,
  },
  {
    id: 'e5',
    hostId: 'u3',
    venueId: 'v1',
    name: 'Creative Coding Workshop',
    description:
      'Hands-on session for generative visuals and live VJ setups. Bring a laptop.',
    category: 'Workshop',
    coverUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop',
    startTime: hoursFromNow(100),
    endTime: hoursFromNow(104),
    status: 'approved',
    promotionTier: 'basic',
    popularityScore: 55,
    safetyScore: 97,
  },
]

export const profiles: Profile[] = [
  currentUser,
  {
    id: 'u2',
    username: 'orbit.host',
    displayName: 'Lebo',
    bio: 'Host at The Orbit',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces',
    trustScore: 90,
    role: 'host',
    interests: ['Nightclub'],
    radiusKm: 20,
    profileVisibility: 'public',
    showSavedEvents: true,
    popiaConsent: true,
    notificationPrefs: {
      nearbyEvents: true,
      upcomingEvents: true,
      safetyAlerts: true,
      rsvpReminders: true,
    },
  },
  {
    id: 'u3',
    username: 'sia.live',
    displayName: 'Sia',
    bio: 'Concert photographer',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    trustScore: 76,
    role: 'user',
    interests: ['Concert', 'Festival'],
    radiusKm: 25,
    profileVisibility: 'public',
    showSavedEvents: true,
    popiaConsent: true,
    notificationPrefs: {
      nearbyEvents: true,
      upcomingEvents: false,
      safetyAlerts: true,
      rsvpReminders: true,
    },
  },
  {
    id: 'u4',
    username: 'kai.nights',
    displayName: 'Kai',
    bio: 'Always chasing the next set',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
    trustScore: 71,
    role: 'user',
    interests: ['Nightclub', 'Festival'],
    radiusKm: 12,
    profileVisibility: 'public',
    showSavedEvents: true,
    popiaConsent: true,
    notificationPrefs: {
      nearbyEvents: true,
      upcomingEvents: true,
      safetyAlerts: true,
      rsvpReminders: false,
    },
  },
]

export const photos: EventPhoto[] = [
  {
    id: 'p1',
    eventId: 'e1',
    userId: 'u3',
    photoUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop',
    caption: 'Bass just dropped — room is packed.',
    moodTags: ['Exciting', 'Energy'],
    capturedAt: hoursFromNow(-1),
    isVerified: true,
    isFlagged: false,
    reportCount: 0,
  },
  {
    id: 'p2',
    eventId: 'e1',
    userId: 'u4',
    photoUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop',
    caption: 'Lights hitting different tonight.',
    moodTags: ['Lively', 'Crowded'],
    capturedAt: hoursFromNow(-0.5),
    isVerified: true,
    isFlagged: false,
    reportCount: 0,
  },
  {
    id: 'p3',
    eventId: 'e2',
    userId: 'u1',
    photoUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=700&fit=crop',
    caption: 'Soundcheck vibes already solid.',
    moodTags: ['Chill', 'Exciting'],
    capturedAt: hoursFromNow(-20),
    isVerified: false,
    isFlagged: false,
    reportCount: 0,
  },
  {
    id: 'p4',
    eventId: 'e4',
    userId: 'u3',
    photoUrl:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=750&fit=crop',
    caption: 'Festival grounds warming up.',
    moodTags: ['Relaxed', 'Lively'],
    capturedAt: hoursFromNow(-5),
    isVerified: true,
    isFlagged: false,
    reportCount: 0,
  },
  {
    id: 'p5',
    eventId: 'e3',
    userId: 'u4',
    photoUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=700&fit=crop',
    caption: 'Good conversations, better coffee.',
    moodTags: ['Chill', 'Relaxed'],
    capturedAt: hoursFromNow(-30),
    isVerified: true,
    isFlagged: false,
    reportCount: 0,
  },
  {
    id: 'p6',
    eventId: 'e2',
    userId: 'u2',
    photoUrl:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=800&fit=crop',
    caption: 'Crowd gathering at the amphitheatre.',
    moodTags: ['Energy', 'Exciting'],
    capturedAt: hoursFromNow(-2),
    isVerified: true,
    isFlagged: false,
    reportCount: 0,
  },
]

export const initialAttendance: Attendance[] = [
  { id: 'a1', eventId: 'e2', userId: 'u1', status: 'saved' },
  { id: 'a2', eventId: 'e4', userId: 'u1', status: 'saved' },
]

export function getVenue(venueId: string) {
  return venues.find((v) => v.id === venueId)
}

export function getProfile(userId: string) {
  return profiles.find((p) => p.id === userId)
}

export function getEvent(eventId: string) {
  return events.find((e) => e.id === eventId)
}

export function formatEventWhen(iso: string) {
  const date = new Date(iso)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTarget = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  )
  const dayDiff = Math.round(
    (startOfTarget.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24),
  )
  const time = date.toLocaleTimeString('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
  })
  if (dayDiff === 0) return `Today ${time}`
  if (dayDiff === 1) return `Tomorrow ${time}`
  return `${date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })} ${time}`
}
