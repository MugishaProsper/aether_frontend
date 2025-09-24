"use client"

import { useEffect } from "react"
import PWAInstallPrompt from "./PWAInstallPrompt"

export default function PWAProvider() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, show update notification
                  if (window.confirm('New version available! Refresh to update?')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Handle online/offline status
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        console.log('App is online')
        // Trigger background sync if available
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
          navigator.serviceWorker.ready.then((registration) => {
            return (registration as any).sync.register('cart-sync')
          }).catch((error) => {
            console.log('Background sync registration failed:', error)
          })
        }
      } else {
        console.log('App is offline')
      }
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Initial status check
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      // Request permission after user interaction
      const requestNotificationPermission = () => {
        Notification.requestPermission().then((permission) => {
          console.log('Notification permission:', permission)
        })
      }

      // Request permission on first user interaction
      const handleFirstInteraction = () => {
        requestNotificationPermission()
        document.removeEventListener('click', handleFirstInteraction)
        document.removeEventListener('touchstart', handleFirstInteraction)
      }

      document.addEventListener('click', handleFirstInteraction)
      document.addEventListener('touchstart', handleFirstInteraction)

      return () => {
        document.removeEventListener('click', handleFirstInteraction)
        document.removeEventListener('touchstart', handleFirstInteraction)
      }
    }
  }, [])

  return <PWAInstallPrompt />
}