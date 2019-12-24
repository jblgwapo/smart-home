self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static').then(function(cache) {
      cache.addAll([
        '/smart-home/',
        '/smart-home/index.html',
        'smart-home/resources/style/main.css',
        'smart-home/resources/style/apexcharts.css',
        'smart-home/resources/scripts/manifest.json',
        'smart-home/resources/scripts/main.js',
        'smart-home/resources/scripts/engine.js',
        'smart-home/resources/scripts/app.js',
        'smart-home/resources/scripts/apexcharts.min.js',
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(res) {
          return caches.open('dynamic').then(function(cache) {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
