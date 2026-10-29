/* BIOROSCO — service worker mínimo para instalar como app (PWA).
   Cachea los archivos propios; el resto (Supabase, fuentes) va siempre a la red. */
const CACHE = "biorosco-v1";
const PROPIOS = [
  "./", "./index.html", "./app.js", "./palabras.js", "./manifest.webmanifest",
  "./logo.webp", "./icono-192.png", "./icono-512.png",
  "./fondos/inicio.webp", "./fondos/registro.webp", "./fondos/rosco.webp",
  "./fondos/resultado.webp", "./fondos/ranking.webp",
  "./avatares/boti.webp", "./avatares/flamenco.webp", "./avatares/jaguar.webp",
  "./avatares/nandu.webp", "./avatares/tapir.webp", "./avatares/tucan.webp", "./avatares/vicuna.webp"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PROPIOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return r;
    }))
  );
});
