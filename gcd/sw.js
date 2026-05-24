// Service Worker for Great Cantonese Dictionary PWA
const CACHE_NAME = 'gcd-v2.0.2';
const RUNTIME_CACHE = 'gcd-runtime';

// Assets to cache on install (shell assets only — no JS bundles)
const PRECACHE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'icons/Icon-192.png',
  'icons/Icon-512.png',
  'icons/Icon-maskable-192.png',
  'icons/Icon-maskable-512.png',
  'favicon.png',
];

// Flutter JS bundles that must always be fresh after a deploy.
// These use a Network-First strategy: try network, fall back to cache.
const NETWORK_FIRST_PATTERNS = [
  'main.dart.js',
  'flutter.js',
  'flutter_bootstrap.js',
  'flutter_service_worker.js',
  '.dart.js',          // catches canvaskit / compiled chunks
];

// Install event - cache shell assets only
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching app shell');
      return cache.addAll(PRECACHE_ASSETS).catch((error) => {
        console.warn('[ServiceWorker] Failed to cache some assets:', error);
      });
    })
  );
  self.skipWaiting();
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
  self.clients.claim();
});

function isNetworkFirst(url) {
  return NETWORK_FIRST_PATTERNS.some((pattern) => url.includes(pattern));
}

function shouldCache(url) {
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

// Fetch event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (AdSense, Firebase, etc.)
  if (url.origin !== self.location.origin) {
    return;
  }

  if (isNetworkFirst(request.url)) {
    // Network-First: always try the network so deploys reach users immediately.
    // Falls back to cache when offline.
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    // Cache-First for everything else (icons, images, fonts, JSON assets).
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          if (request.method === 'GET' && shouldCache(request.url)) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch((error) => {
          console.error('[ServiceWorker] Fetch failed:', error);
          throw error;
        });
      })
    );
  }
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
