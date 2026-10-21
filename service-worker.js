const CACHE = 'pavan-educator-shell-v2';
const PREVIOUS_CACHE_PREFIX = 'pavan-educator-shell-';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/pavan-logo.svg',
  './assets/pavan-upgrades.css',
  './data/pavan-upgrades.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .catch(error => {
        // Installation should not fail completely if one optional shell asset is unavailable.
        console.warn('Pavan Educator: some shell assets could not be cached.', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        // Only remove older caches owned by this service worker. Never clear unrelated
        // caches that another application on the same origin may use.
        keys.filter(key =>
          key.startsWith(PREVIOUS_CACHE_PREFIX) && key !== CACHE
        ).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Prefer fresh HTML on navigation, but use a cached page when the user is offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match('./index.html');
        })
    );
    return;
  }

  // Static assets use cache-first for quicker repeat visits, with network fallback.
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
