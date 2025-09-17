const CACHE_NAME = 'cyborg-cats-v1';
const urlsToCache = [
  '/',
  '/about',
  '/impact', 
  '/competitions',
  '/team',
  '/sponsors',
  '/contact',
  '/src/assets/cyborg-cats-logo.png',
  '/manifest.json'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  return caches.open('sync-cache')
    .then((cache) => {
      return cache.keys().then((keys) => {
        return Promise.all(
          keys.map((request) => {
            return cache.match(request).then((response) => {
              return response.json().then((data) => {
                return fetch('/api/sync', {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers: { 'Content-Type': 'application/json' }
                }).then(() => {
                  return cache.delete(request);
                });
              });
            });
          })
        );
      });
    });
}