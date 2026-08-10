export type UserRole = 'user' | 'host' | 'moderator' | 'admin'

export type EventCategory =
  | 'Concert'
  | 'Networking'
  | 'Festival'
  | 'Nightclub'
  | 'Workshop'
  | 'Other'

export type PromotionTier = 'basic' | 'spotlight' | 'premium' | 'platinum'

export type AttendanceStatus = 'going' | 'here_now' | 'saved'

export type MoodTag =
  | 'Exciting'
  | 'Energy'
  | 'Chill'
  | 'Lively'
  | 'Crowded'
  | 'Relaxed'

export interface Profile {
  id: string
  username: string
  displayName: string
  bio: string
  avatarUrl: string
  trustScore: number
  instagramHandle?: string
  twitterHandle?: string
  role: UserRole
  interests: EventCategory[]
  radiusKm: number
  profileVisibility: 'public' | 'friends' | 'private'
  showSavedEvents: boolean
  popiaConsent: boolean
  notificationPrefs: {
    nearbyEvents: boolean
    upcomingEvents: boolean
    safetyAlerts: boolean
    rsvpReminders: boolean
  }
}

export interface Venue {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  contactInfo: string
  isVerifiedPartner: boolean
}

export interface EventItem {
  id: string
  hostId: string
  venueId: string
  name: string
  description: string
  category: EventCategory
  coverUrl: string
  startTime: string
  endTime: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  promotionTier: PromotionTier
  popularityScore: number
  safetyScore: number
}

export interface EventPhoto {
  id: string
  eventId: string
  userId: string
  photoUrl: string
  caption: string
  moodTags: MoodTag[]
  capturedAt: string
  isVerified: boolean
  isFlagged: boolean
  reportCount: number
}

export interface Attendance {
  id: string
  eventId: string
  userId: string
  status: AttendanceStatus
}

export interface ContentReport {
  id: string
  photoId: string
  reason: string
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed'
  createdAt: string
}

export interface SubmitPhotoInput {
  eventId: string
  photoUrl: string
  caption: string
  moodTags: MoodTag[]
  latitude: number
  longitude: number
  isVerified: boolean
}

export interface Friendship {
  id: string
  userId: string
  friendId: string
}

export interface Post {
  id: string
  authorId: string
  eventId?: string
  caption: string
  mediaUrl?: string
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  body: string
  createdAt: string
}

export type BoltTargetType = 'post' | 'event'

export interface BoltReact {
  id: string
  userId: string
  targetType: BoltTargetType
  targetId: string
  createdAt: string
}

export interface DmThread {
  id: string
  participantIds: [string, string]
  updatedAt: string
}

export interface DmMessage {
  id: string
  threadId: string
  senderId: string
  body: string
  createdAt: string
  readAt?: string
}

export type LiveUpdateKind =
  | 'bolt'
  | 'comment'
  | 'rsvp'
  | 'photo'
  | 'checkin'

export interface LiveUpdate {
  id: string
  eventId: string
  actorId: string
  kind: LiveUpdateKind
  text: string
  createdAt: string
}
