const CACHE_NAME = "spiderman-cache-v1";

const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/logo192.png",
  "/logo512.png",
  "/fallback-offline.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return (
        cacheResponse ||
        fetch(event.request).catch(() => caches.match("/fallback-offline.html"))
      );
    })
  );
});
