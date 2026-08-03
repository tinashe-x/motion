import { useCallback, useRef, useState, type TouchEvent } from 'react'

export function usePullToRefresh(onRefresh: () => Promise<void> | void) {
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const pulling = useRef(false)

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      pulling.current = true
    }
  }, [])

  const onTouchEnd = useCallback(
    async (e: TouchEvent) => {
      if (!pulling.current) return
      pulling.current = false
      const delta = e.changedTouches[0].clientY - startY.current
      if (delta > 80 && !refreshing) {
        setRefreshing(true)
        await onRefresh()
        setRefreshing(false)
      }
    },
    [onRefresh, refreshing],
  )

  return { refreshing, onTouchStart, onTouchEnd }
}
