const CACHE_NAME = 'bearthebeer-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/beer-mug.svg'
]


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(urlsToCache)
    })
    .catch(err=>{
      console.log(err);
      
    })
  );
});

self.addEventListener('activate',event=>{
  const cacheList = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>{
      return Promise.all(
        cacheNames.map(cacheName => {
          if(!cacheList.includes(cacheName)){
            console.log('Deleting old cache',cacheName);
            return caches.delete(cacheName); //remove old cache
            
          }
        })
      )
    })
  );
  self.clients.claim();  // Take control of currently open pages
})

self.addEventListener('fetch', event=>{
  event.respondWith(
    caches.match(event.request)
    .then(response=>{
      return response || fetch(event.request);
    })
  );
});