const cacheName = "DefaultCompany-Convai-2";
const contentToCache = [
    "Build/0ee53bc6327df7e5d76028d110f02725.loader.js",
    "Build/5d8462470b7a5308093f233da20c4e6a.framework.js.gz",
    "Build/41525c145e05ca8827935f094d4c3d72.data.gz",
    "Build/0a29e447d0982e6b3e5a2228c2305359.wasm.gz",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
