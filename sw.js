const version = 1;
const cacheName = `kash${version}`;
const cacheList = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/main.css',
  '/img/offline-1.png',
  '/img/offline-2.jpeg',
  '/img/offline-3.svg',
  '/img/offline-4.png',
  '/img/offline-5.png',
  '/404.html',
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(cacheName).then((cache) => {
      //save the whole cacheList
      cache.addAll(cacheList);
    })
  );
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
        );
      })
      .catch(console.warn)
  );
});

self.addEventListener('fetch', (ev) => {
  //just forward the request to the server
  //and return the response
  ev.respondWith(ev.request);
});

self.addEventListener('message', (ev) => {
  //message received from script
  let msg = {
    text: 'Thanks for the message',
  };
  self.postMessage(msg);
});
