import { useCallback, useEffect, useRef, useState } from 'react'

export function useCamera(facing: 'user' | 'environment') {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setReady(false)
  }, [])

  const start = useCallback(async () => {
    stop()
    setError(null)
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Camera not supported — use file upload instead.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setReady(true)
    } catch {
      setError('Camera permission denied — use file upload instead.')
    }
  }, [facing, stop])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video) return null
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 720
    canvas.height = video.videoHeight || 1280
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(video, 0, 0)
    return canvas.toDataURL('image/jpeg', 0.85)
  }, [])

  return { videoRef, ready, error, capture, stop, restart: start }
}
