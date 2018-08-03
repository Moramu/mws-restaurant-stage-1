const cacheName = 'restaurant-app-cache1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(
        [
          '/css/styles.css',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/js/register_sw.js',
          '/img/offline-logo.png',
          'index.html',
          'sw.js'
        ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then( response => {
        let responseClone = response.clone();
        caches.open(cacheName).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }).catch( error => {
      return new response('/img/offline-logo.png', {headers:{'Content-Type':'image/gif'}});
    })
  )
});

