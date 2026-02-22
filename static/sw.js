const OFFLINE_URL = '/offline.html';
const CACHE_NAME = 'quad4-pages-v1';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL)).then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	var url = new URL(event.request.url);
	if (url.origin !== location.origin) return;

	var isNav = event.request.mode === 'navigate';

	event.respondWith(
		fetch(event.request)
			.then((response) => {
				if (!response.ok && isNav) return response;
				if (isNav || event.request.destination === 'script' || event.request.destination === 'style' || event.request.destination === 'image' || event.request.destination === 'font') {
					var clone = response.clone();
					caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
				}
				return response;
			})
			.catch(() => {
				return caches.match(event.request).then((cached) => {
					if (cached) return cached;
					if (isNav) return caches.match(OFFLINE_URL).then((r) => r || caches.match('/'));
					return new Response('', { status: 503, statusText: 'Offline' });
				});
			})
	);
});
