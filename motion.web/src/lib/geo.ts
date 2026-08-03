/** Haversine distance in metres between two lat/lng points */
export function distanceMetres(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function isWithinEventWindow(
  startIso: string,
  endIso: string,
  now = new Date(),
  graceHours = 1,
) {
  const start = new Date(startIso).getTime() - graceHours * 3600000
  const end = new Date(endIso).getTime() + graceHours * 3600000
  const t = now.getTime()
  return t >= start && t <= end
}

export function isHeicFile(file: File) {
  const name = file.name.toLowerCase()
  return (
    name.endsWith('.heic') ||
    name.endsWith('.heif') ||
    file.type === 'image/heic' ||
    file.type === 'image/heif'
  )
}

export function pinColor(category: string, safetyScore: number) {
  if (safetyScore < 50) return '#ef4444'
  const map: Record<string, string> = {
    Concert: '#8e2de2',
    Networking: '#3b82f6',
    Festival: '#ffd700',
    Nightclub: '#4a00e0',
    Workshop: '#10b981',
    Other: '#9a9aa8',
  }
  return map[category] ?? '#4a00e0'
}
