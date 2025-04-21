const CACHE_NAME = "cra-cache-v1";
const CURRENT_VERSION = "1.23.7";

const OFFLINE_URL = "/offline.html";
const VERSION_URL = "/version.json";

self.addEventListener("install", (event) => {
  console.log("[SW] Instalando...");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([OFFLINE_URL, VERSION_URL]);

      const response = await fetch(VERSION_URL);
      const data = await response.json();
      const remoteVersion = data.version;

      if (remoteVersion !== CURRENT_VERSION) {
        console.log(
          `[SW] Versión actual (${CURRENT_VERSION}) no coincide con versión remota (${remoteVersion}). Borrando caché...`
        );
        await caches.delete(CACHE_NAME);
      } else {
        console.log("[SW] Versión actual válida:", CURRENT_VERSION);
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activando...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[SW] Borrando caché antigua:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith("http"))
    return;

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      try {
        const networkResponse = await fetch(event.request);

        const responseClone = networkResponse.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, responseClone);

        return networkResponse;
      } catch (error) {
        console.error("[SW] Sin conexión. Borrando caché y mostrando offline.");

        await caches.delete(CACHE_NAME);

        if (cachedResponse) return cachedResponse;

        const cache = await caches.open(CACHE_NAME);
        const offlinePage = await cache.match(OFFLINE_URL);
        return (
          offlinePage ||
          new Response("<h1>Sin conexión.</h1>", {
            status: 503,
            statusText: "Service Unavailable",
          })
        );
      }
    })()
  );
});
