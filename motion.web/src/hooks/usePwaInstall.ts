import { useCallback, useEffect, useState } from 'react'

type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable' | 'ios-guide'

function isIOSDevice() {
  if (typeof navigator === 'undefined') return false
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  )
}

function isStandalone() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true)
  )
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(isStandalone)
  const [isIOS, setIsIOS] = useState(isIOSDevice)
  const [showIOSGuide, setShowIOSGuide] = useState(false)

  useEffect(() => {
    setIsInstalled(isStandalone())
    setIsIOS(isIOSDevice())

    const onBeforeInstall = (event: Event) => {
      event.preventDefault()
      setDeferredPrompt(event as BeforeInstallPromptEvent)
    }

    const onInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    const onDisplayModeChange = () => {
      setIsInstalled(isStandalone())
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('appinstalled', onInstalled)
    window.matchMedia('(display-mode: standalone)').addEventListener('change', onDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', onDisplayModeChange)
    }
  }, [])

  const install = useCallback(async (): Promise<InstallOutcome> => {
    if (isInstalled) return 'accepted'

    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      if (outcome === 'accepted') setIsInstalled(true)
      return outcome
    }

    if (isIOS) {
      setShowIOSGuide(true)
      return 'ios-guide'
    }

    return 'unavailable'
  }, [deferredPrompt, isInstalled, isIOS])

  const dismissIOSGuide = useCallback(() => setShowIOSGuide(false), [])

  return {
    install,
    isInstalled,
    isIOS,
    canNativeInstall: !!deferredPrompt,
    showIOSGuide,
    dismissIOSGuide,
  }
}
