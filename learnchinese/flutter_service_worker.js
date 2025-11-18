'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "4e1816c97019b29a4b209d06fa3b3f42",
"assets/AssetManifest.bin.json": "5c0740370a855d0dba27b620fb5ef943",
"assets/assets/hsk/articles/hsk_1_articles.json": "01b3ce438e84cd7f89c7debaecc03518",
"assets/assets/hsk/articles/hsk_2_articles.json": "ffb23d788d4a0f0903e56c03c3dda1df",
"assets/assets/hsk/articles/hsk_3_articles.json": "94db1dd06bfcf1e57e1929d997bdf363",
"assets/assets/hsk/questions/hsk_1_reading_questions.json": "561c902edb81b3e7ad58af6dbe0ddeb5",
"assets/assets/hsk/questions/hsk_2_reading_questions.json": "3ee934d610833ff2645c3bdb891b7a8a",
"assets/assets/hsk/questions/hsk_3_reading_questions.json": "9f209255fb58da64c44fb6ee827eca65",
"assets/assets/hsk/sentences/hsk_1_sentences.json": "3aa4037dad1884c92d218d298a304ecb",
"assets/assets/hsk/sentences/hsk_2_sentences.json": "aada17bc0d9f57d781d01ce7f3b6bfa4",
"assets/assets/hsk/sentences/hsk_3_sentences.json": "0368210f0f52ec96db20bd91013d66d0",
"assets/assets/hsk/tests/hsk_tests.json": "acfff73ec6328e94a0f67ebbcec0331e",
"assets/assets/hsk/user_favorites.json": "35d0e0b801444bb1f4c2115720f8e4f6",
"assets/assets/hsk/words/hsk_1_words.json": "32f1453e019e194bec0789256522991c",
"assets/assets/hsk/words/hsk_2_words.json": "7be5602034093a1f328c9f5210a037c2",
"assets/assets/hsk/words/hsk_3_words.json": "e962dd5d00b148746261bc9b90d1bc09",
"assets/assets/images/hsk/questions/hsk_HSK1_question_21.png": "4db96939be7e13bcda61d2e3fe8a9b55",
"assets/assets/images/hsk/questions/hsk_HSK1_question_22.png": "dc324696be949aaf235ff88ac7dca29b",
"assets/assets/images/hsk/questions/hsk_HSK1_question_23.png": "c1e7ad32ea8b65fdcdcde4f3eef08431",
"assets/assets/images/hsk/questions/hsk_HSK1_question_24.png": "f318b2fffdb466cacef28718e6da9b6d",
"assets/assets/images/hsk/questions/hsk_HSK1_question_25.png": "ff172c48805da73fcb3c0b87d58043b8",
"assets/assets/images/hsk/questions/hsk_HSK1_question_26.png": "cf22ae8c1a71d407b904b2d9449163b9",
"assets/assets/images/hsk/questions/hsk_HSK1_question_27.png": "4370105381bba9bc141f7cebb48b9c82",
"assets/assets/images/hsk/questions/hsk_HSK1_question_28.png": "aaa786197a5e4e1581d8a0beebf073c1",
"assets/assets/images/hsk/questions/hsk_HSK1_question_29.png": "224dc8afb1ac79be37fe9f417b6ec266",
"assets/assets/images/hsk/questions/hsk_HSK1_question_30.png": "01ddbc18bda29c0b5cf2721b84da7ad4",
"assets/assets/images/hsk/questions/hsk_HSK1_question_32.png": "4370105381bba9bc141f7cebb48b9c82",
"assets/assets/images/hsk/questions/hsk_HSK1_question_43.png": "f4d9730ebd6e74b4d3af1935171c2bc6",
"assets/assets/images/hsk/questions/hsk_HSK1_question_50.png": "b1fa8b4729429470b648c62ff5182dac",
"assets/assets/images/hsk/questions/hsk_HSK1_question_53.png": "c63b4c7274cb8f87161f3b3d4f0f488e",
"assets/assets/images/hsk/questions/hsk_HSK1_question_54.png": "39ed08915a9c3ed42bd592b95217076d",
"assets/assets/images/hsk/questions/hsk_HSK1_question_58.png": "fc5dd2f4db87d4d54c2e0be624503db0",
"assets/assets/images/hsk/questions/hsk_HSK1_question_59.png": "667e49be2491f2306dbbfc87a0443496",
"assets/assets/images/hsk/questions/hsk_HSK1_question_60.png": "2c46290d004177d2a4e6e296d687ed35",
"assets/assets/images/hsk/questions/hsk_HSK2_question_101.png": "ef32b5eee51c60b99ef422e86227c006",
"assets/assets/images/hsk/questions/hsk_HSK2_question_104_A.png": "a215d164649b192f61c2481b37433108",
"assets/assets/images/hsk/questions/hsk_HSK2_question_104_B.png": "acda80d2400d372b16486ebdd4e9c0a8",
"assets/assets/images/hsk/questions/hsk_HSK2_question_104_C.png": "51c92ff99a4af2c8f96345dff3dfc696",
"assets/assets/images/hsk/questions/hsk_HSK2_question_104_D.png": "22c4f2d255fa70c475ddc57e7adc0c62",
"assets/assets/images/hsk/questions/hsk_HSK2_question_106.png": "9007dd9e86fd8a0601d74b0d403eebca",
"assets/assets/images/hsk/questions/hsk_HSK2_question_109_A.png": "25918758acae61963c6328d7562d98ea",
"assets/assets/images/hsk/questions/hsk_HSK2_question_109_B.png": "dd12f515c4580a74e960ca1f71c90cfe",
"assets/assets/images/hsk/questions/hsk_HSK2_question_109_C.png": "c66759ca6aea284356e6b3318dcabac0",
"assets/assets/images/hsk/questions/hsk_HSK2_question_109_D.png": "ea58bf3fcbbf5737ce4d6a7cec30f735",
"assets/assets/images/hsk/questions/hsk_HSK2_question_112.png": "18c10e5f2a9a3bed523e5c6a8fbf7718",
"assets/assets/images/hsk/questions/hsk_HSK2_question_115.png": "d1c2ebfab5ebd2461e3b82570bd7bef3",
"assets/assets/images/hsk/questions/hsk_HSK2_question_118.png": "488179599fc115f40e3f58ef95ab217e",
"assets/assets/images/hsk/questions/hsk_HSK2_question_121_A.png": "84481d7a78b2763b08f3db7dca45ee0f",
"assets/assets/images/hsk/questions/hsk_HSK2_question_121_B.png": "59522a4c9ace145136a0b313ec52f3dc",
"assets/assets/images/hsk/questions/hsk_HSK2_question_121_C.png": "7a23028b4d021bf2df7f426b6038b765",
"assets/assets/images/hsk/questions/hsk_HSK2_question_121_D.png": "25e0a8df58888f3574ec68b83275289f",
"assets/assets/images/hsk/questions/hsk_HSK2_question_125.png": "6da0065fe2f838a0d23183deb8fa3ab8",
"assets/assets/images/hsk/questions/hsk_HSK2_question_127_A.png": "22c4f2d255fa70c475ddc57e7adc0c62",
"assets/assets/images/hsk/questions/hsk_HSK2_question_127_B.png": "51c92ff99a4af2c8f96345dff3dfc696",
"assets/assets/images/hsk/questions/hsk_HSK2_question_127_C.png": "f1120f189b54ccb500b24519912022be",
"assets/assets/images/hsk/questions/hsk_HSK2_question_127_D.png": "b86654c3bc9efc439cd838e2a51e173f",
"assets/assets/images/hsk/questions/hsk_HSK2_question_130.png": "25918758acae61963c6328d7562d98ea",
"assets/assets/images/hsk/questions/hsk_HSK2_question_133.png": "ee5854335128f7067093851dcb4b7430",
"assets/assets/images/hsk/questions/hsk_HSK2_question_136.png": "d5fce48241a54ee4e1350d735461df23",
"assets/assets/images/hsk/questions/hsk_HSK2_question_136_A.png": "bf6a0b29e915be1ff8117a30a1e7d7ea",
"assets/assets/images/hsk/questions/hsk_HSK2_question_136_B.png": "bf6a0b29e915be1ff8117a30a1e7d7ea",
"assets/assets/images/hsk/questions/hsk_HSK2_question_136_C.png": "bf6a0b29e915be1ff8117a30a1e7d7ea",
"assets/assets/images/hsk/questions/hsk_HSK2_question_136_D.png": "bf6a0b29e915be1ff8117a30a1e7d7ea",
"assets/assets/images/hsk/questions/hsk_HSK2_question_140.png": "dabd40cb87dfd3314f76bc4f2d782f36",
"assets/assets/images/hsk/questions/hsk_HSK2_question_143.png": "ca16789a7e8e4f429ab2303283d79427",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "b82186ac203d051e0c743be1d159cde4",
"assets/NOTICES": "8b60617931b2cca216c02ec9b073870d",
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
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"flutter_bootstrap.js": "0bc830eb66a7debeec4e9e7ae6c94434",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "37f664c4f8dbd680c69f7a620ab14fab",
"/": "37f664c4f8dbd680c69f7a620ab14fab",
"main.dart.js": "856d27b49c3b05dd6dc5801f52b4434f",
"manifest.json": "911d2288c87b2e1090716d2fdc7fa5e6",
"version.json": "dc25fbcad3965ca6a0762125c2050c01"};
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
