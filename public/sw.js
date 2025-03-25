const CACHE_NAME = 'cra-cache-v1';

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Borrando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      try {
        const networkResponse = await fetch(event.request);

        // Clonamos antes de usar
        const responseClone = networkResponse.clone();

        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, responseClone);

        return networkResponse;
      } catch (error) {
        console.error('[SW] Error en fetch, devolviendo caché:', error);
        return cachedResponse;
      }
    })()
  );
});
