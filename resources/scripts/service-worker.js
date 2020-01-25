var version = 'v0.795s+';
var dynamic = 'v0.795b';



self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(version).then(function(cache) {
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
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return true;
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(event.request=='resources/version.txt') return version;
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function(res) {
          return caches.open(dynamic).then(function(cache) {
            cache.put(event.request.url, res.clone());
            return res;
          });
        });
      }
    })
  );
});
