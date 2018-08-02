const cacheName = 'restaurant-app-cache1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/js/register_sw.js',
          '/img/offline-logo.png',
          'restaurant.html',
          'index.html',
          'sw.js'
        ]
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then( response => {
        let responseClone = response.clone();
        caches.open('cacheName').then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  )
});

