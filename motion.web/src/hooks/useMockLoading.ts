import { useEffect, useState } from 'react'

/** Simulates async data fetch for skeleton states */
export function useMockLoading(ms = 700) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), ms)
    return () => window.clearTimeout(t)
  }, [ms])
  return loading
}
