const CACHE = 'motion-v1'
const ASSETS = ['/', '/index.html', '/motion-logo.png', '/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached
      return fetch(event.request).catch(
        () =>
          caches.match('/index.html') ??
          new Response('Offline — Motion will reconnect when you are back online.', {
            headers: { 'Content-Type': 'text/plain' },
          }),
      )
    }),
  )
})
