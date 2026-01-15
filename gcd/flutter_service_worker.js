'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"adview.html": "22cd7cd082f4c4fc7ee3f5d5e7ffca3d",
"assets/AssetManifest.bin": "e62c81dcae3e4e32cc05d81a9e4b5b4d",
"assets/AssetManifest.bin.json": "97675bf7dfde0d3638152922f8d16c90",
"assets/assets/dictionary_1.json": "2990b026b77956f6e6c54e82da95ffc0",
"assets/assets/dictionary_10.json": "bb29c7ff08341ad744f8b7f6eddcfdd7",
"assets/assets/dictionary_11.json": "b7ce31e432b26c66e0503888ac074e44",
"assets/assets/dictionary_12.json": "0c943ea7476f5b4f80553e026436f37e",
"assets/assets/dictionary_13.json": "670168bcbeff7a5f920bf6f37be6e2f3",
"assets/assets/dictionary_14.json": "f3a904b4bc234f35566045d8dcd28956",
"assets/assets/dictionary_15.json": "e84b9d0b92f0138719fd33cd3f06e230",
"assets/assets/dictionary_2.json": "e8c978c1a1d8708307548892375a17b1",
"assets/assets/dictionary_3.json": "d106b17a1f72080cb395007d191d7aa3",
"assets/assets/dictionary_4.json": "9fa9315f67e8fba22ea14eae9ffcddc1",
"assets/assets/dictionary_5.json": "4220efa795b6da391fd583a405b04ef0",
"assets/assets/dictionary_6.json": "00d4406ee0061e7dd47ec3d1304877fc",
"assets/assets/dictionary_7.json": "cc4a3b4636632194fa774319e7f69450",
"assets/assets/dictionary_8.json": "bd7881c9e67404c2458aaf5ab0f00146",
"assets/assets/dictionary_9.json": "4f853d7ec583e66fe9d42805f7d6c4a3",
"assets/assets/icon/gcd_logo_1024_1024.png": "88abe8909c020cfdfa45db2268312b2d",
"assets/assets/images/google_play_store_logo.png": "48f12f94c175de93a88dda60ae468fef",
"assets/assets/images/learn_cantonese_logo.png": "845ac5b92c9d7840f3ee9ef39fcd7401",
"assets/assets/images/xiezi_logo.png": "b5adbdfbedea43cfc276b0576bece703",
"assets/assets/popular_words/cantonese_most_popular_words.json": "8cbe1a438e1037c7256c44239704f1c4",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1c3c5f4d6f41ac43949b3d4196bd5108",
"assets/NOTICES": "a70234f8578c0fbbd86d657184280b51",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01",
"favicon.png": "42df982ece1184ab73c96163ad7ee39f",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "a34915253cf4a4ad0e95e5f2b67a9b36",
"icons/Icon-192.png": "3812c56befd71557e82858c8c3528b85",
"icons/Icon-512.png": "6536bf2ceac62d25e1495064773668f6",
"icons/Icon-maskable-192.png": "3812c56befd71557e82858c8c3528b85",
"icons/Icon-maskable-512.png": "6536bf2ceac62d25e1495064773668f6",
"index.html": "da7ad26a730b3788d3db191087406648",
"/": "da7ad26a730b3788d3db191087406648",
"main.dart.js": "da7a96f9d8e3167e9af13a675f0f8c84",
"manifest.json": "e2a6c1362e63b1a2f9b17d101ce3a8c9",
"sqlite3.wasm": "fa7637a49a0e434f2a98f9981856d118",
"sw.js": "3c59943380eff0156ffde7a40f9d210e",
"version.json": "71d2fa099d01b6fd41f63d568cb1af7a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
