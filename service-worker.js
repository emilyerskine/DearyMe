const CACHE_NAME = "diary-cache-v1";
const FILES_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      return response || fetch(evt.request);
    })
  );
});

// for push notifications
self.addEventListener("push", function (event) {
  const options = {
    body: event.data.text(),
    icon: "/icon.png",
    badge: "/badge.png",
  };

  event.waitUntil(
    self.registration.showNotification("Reminder", options)
  );
});