import type { Attendance, BoltReact, EventPhoto } from '@/types'

/** Bolt-equivalent weights for auto charge + manual bolts */
export const CHARGE_WEIGHTS = {
  bolt: 1,
  rsvp: 2,
  photo: 3,
  comment: 1,
  checkin: 2,
} as const

const CHARGE_CAP = 20

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Aggregate bolt-equivalents that charge an event's Motion Meter. */
export function boltEquivalentsWithPosts(input: {
  eventId: string
  bolts: BoltReact[]
  attendance: Attendance[]
  photos: EventPhoto[]
  postIdsForEvent: string[]
  eventLinkedCommentCount: number
}): number {
  const {
    eventId,
    bolts,
    attendance,
    photos,
    postIdsForEvent,
    eventLinkedCommentCount,
  } = input

  const eventBolts = bolts.filter(
    (b) => b.targetType === 'event' && b.targetId === eventId,
  ).length

  const postBolts = bolts.filter(
    (b) =>
      b.targetType === 'post' && postIdsForEvent.includes(b.targetId),
  ).length

  const rsvps = attendance.filter(
    (a) =>
      a.eventId === eventId &&
      (a.status === 'going' || a.status === 'here_now'),
  ).length

  const verifiedPhotos = photos.filter(
    (p) => p.eventId === eventId && p.isVerified && !p.isFlagged,
  ).length

  return (
    (eventBolts + postBolts) * CHARGE_WEIGHTS.bolt +
    rsvps * CHARGE_WEIGHTS.rsvp +
    verifiedPhotos * CHARGE_WEIGHTS.photo +
    eventLinkedCommentCount * CHARGE_WEIGHTS.comment
  )
}

export function chargeNormalized(boltEquivalents: number): number {
  return clamp((boltEquivalents / CHARGE_CAP) * 100, 0, 100)
}

export function motionMeterScore(
  safetyScore: number,
  popularityScore: number,
  chargeNorm: number,
): number {
  return Math.round(
    safetyScore * 0.4 + popularityScore * 0.25 + chargeNorm * 0.35,
  )
}
