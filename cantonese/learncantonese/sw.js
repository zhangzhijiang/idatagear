// Service Worker for Great Cantonese Dictionary PWA
const CACHE_NAME = 'gcd-v2.0.1';
const RUNTIME_CACHE = 'gcd-runtime';

// Assets to cache on install
const PRECACHE_ASSETS = [
  './',
  'index.html',
  'main.dart.js',
  'flutter.js',
  'flutter_bootstrap.js',
  'manifest.json',
  'icons/Icon-192.png',
  'icons/Icon-512.png',
  'icons/Icon-maskable-192.png',
  'icons/Icon-maskable-512.png',
  'favicon.png',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching app shell');
      return cache.addAll(PRECACHE_ASSETS).catch((error) => {
        console.warn('[ServiceWorker] Failed to cache some assets:', error);
        // Continue even if some assets fail to cache
      });
    })
  );
  self.skipWaiting(); // Activate worker immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all pages immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Strategy: Cache First, falling back to Network
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('[ServiceWorker] Serving from cache:', request.url);
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Cache the fetched resource for next time
        const responseToCache = response.clone();

        // Only cache GET requests
        if (request.method === 'GET') {
          caches.open(RUNTIME_CACHE).then((cache) => {
            // Only cache specific file types
            if (shouldCache(request.url)) {
              console.log('[ServiceWorker] Caching new resource:', request.url);
              cache.put(request, responseToCache);
            }
          });
        }

        return response;
      }).catch((error) => {
        console.error('[ServiceWorker] Fetch failed:', error);
        // Could return a custom offline page here
        throw error;
      });
    })
  );
});

// Helper function to determine if a resource should be cached
function shouldCache(url) {
  // Cache JavaScript, CSS, images, fonts, and JSON files
  return (
    url.endsWith('.js') ||
    url.endsWith('.css') ||
    url.endsWith('.png') ||
    url.endsWith('.jpg') ||
    url.endsWith('.jpeg') ||
    url.endsWith('.svg') ||
    url.endsWith('.woff') ||
    url.endsWith('.woff2') ||
    url.endsWith('.json') ||
    url.endsWith('.wasm') ||
    url.endsWith('.html')
  );
}

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
