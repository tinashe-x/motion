import type {
  Attendance,
  BoltReact,
  Comment,
  DmMessage,
  DmThread,
  EventItem,
  EventPhoto,
  Friendship,
  LiveUpdate,
  Post,
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
  { id: 'a3', eventId: 'e1', userId: 'u1', status: 'going' },
]

export const friendships: Friendship[] = [
  { id: 'f1', userId: 'u1', friendId: 'u3' },
  { id: 'f2', userId: 'u1', friendId: 'u4' },
  { id: 'f3', userId: 'u1', friendId: 'u2' },
]

export const posts: Post[] = [
  {
    id: 'post1',
    authorId: 'u3',
    eventId: 'e1',
    caption: 'Bass just dropped — room is packed.',
    mediaUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=800&fit=crop',
    createdAt: hoursFromNow(-1),
  },
  {
    id: 'post2',
    authorId: 'u4',
    eventId: 'e1',
    caption: 'Lights hitting different tonight.',
    mediaUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=800&fit=crop',
    createdAt: hoursFromNow(-0.5),
  },
  {
    id: 'post3',
    authorId: 'u2',
    eventId: 'e2',
    caption: 'Crowd gathering at the amphitheatre — who is coming?',
    mediaUrl:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=800&fit=crop',
    createdAt: hoursFromNow(-2),
  },
  {
    id: 'post4',
    authorId: 'u3',
    eventId: 'e4',
    caption: 'Festival grounds warming up.',
    mediaUrl:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=750&fit=crop',
    createdAt: hoursFromNow(-5),
  },
  {
    id: 'post5',
    authorId: 'u4',
    caption: 'Who is free this weekend? Looking for a set.',
    createdAt: hoursFromNow(-8),
  },
]

export const comments: Comment[] = [
  {
    id: 'c1',
    postId: 'post1',
    authorId: 'u4',
    body: 'Say less — on my way.',
    createdAt: hoursFromNow(-0.8),
  },
  {
    id: 'c2',
    postId: 'post1',
    authorId: 'u1',
    body: 'Motion Meter looking charged already.',
    createdAt: hoursFromNow(-0.6),
  },
  {
    id: 'c3',
    postId: 'post3',
    authorId: 'u3',
    body: 'Saved it — see you there.',
    createdAt: hoursFromNow(-1.5),
  },
]

export const bolts: BoltReact[] = [
  {
    id: 'b1',
    userId: 'u4',
    targetType: 'post',
    targetId: 'post1',
    createdAt: hoursFromNow(-0.7),
  },
  {
    id: 'b2',
    userId: 'u2',
    targetType: 'post',
    targetId: 'post1',
    createdAt: hoursFromNow(-0.65),
  },
  {
    id: 'b3',
    userId: 'u3',
    targetType: 'event',
    targetId: 'e1',
    createdAt: hoursFromNow(-0.4),
  },
  {
    id: 'b4',
    userId: 'u4',
    targetType: 'event',
    targetId: 'e1',
    createdAt: hoursFromNow(-0.3),
  },
  {
    id: 'b5',
    userId: 'u3',
    targetType: 'post',
    targetId: 'post2',
    createdAt: hoursFromNow(-0.2),
  },
]

export const dmThreads: DmThread[] = [
  {
    id: 't1',
    participantIds: ['u1', 'u3'],
    updatedAt: hoursFromNow(-0.25),
  },
  {
    id: 't2',
    participantIds: ['u1', 'u4'],
    updatedAt: hoursFromNow(-3),
  },
  {
    id: 't3',
    participantIds: ['u1', 'u2'],
    updatedAt: hoursFromNow(-20),
  },
]

export const dmMessages: DmMessage[] = [
  {
    id: 'm1',
    threadId: 't1',
    senderId: 'u3',
    body: 'You coming to Amapiano Fridays?',
    createdAt: hoursFromNow(-2),
    readAt: hoursFromNow(-1.9),
  },
  {
    id: 'm2',
    threadId: 't1',
    senderId: 'u1',
    body: 'Already joined — Motion Meter looks lit.',
    createdAt: hoursFromNow(-1.8),
    readAt: hoursFromNow(-1.7),
  },
  {
    id: 'm3',
    threadId: 't1',
    senderId: 'u3',
    body: 'Bet. Meet at the Orbit entrance?',
    createdAt: hoursFromNow(-0.25),
  },
  {
    id: 'm4',
    threadId: 't2',
    senderId: 'u4',
    body: 'That festival lineup is insane.',
    createdAt: hoursFromNow(-4),
    readAt: hoursFromNow(-3.5),
  },
  {
    id: 'm5',
    threadId: 't2',
    senderId: 'u1',
    body: 'Saved it. Want to go together?',
    createdAt: hoursFromNow(-3),
    readAt: hoursFromNow(-2.9),
  },
  {
    id: 'm6',
    threadId: 't3',
    senderId: 'u2',
    body: 'Thanks for the vibe check on our listing.',
    createdAt: hoursFromNow(-20),
    readAt: hoursFromNow(-19),
  },
]

export const liveUpdates: LiveUpdate[] = [
  {
    id: 'lu1',
    eventId: 'e1',
    actorId: 'u3',
    kind: 'bolt',
    text: 'Sia charged the Motion Meter',
    createdAt: hoursFromNow(-0.4),
  },
  {
    id: 'lu2',
    eventId: 'e1',
    actorId: 'u4',
    kind: 'photo',
    text: 'Kai dropped a verified moment',
    createdAt: hoursFromNow(-0.5),
  },
  {
    id: 'lu3',
    eventId: 'e1',
    actorId: 'u1',
    kind: 'rsvp',
    text: 'Thandi joined the night',
    createdAt: hoursFromNow(-1.2),
  },
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
