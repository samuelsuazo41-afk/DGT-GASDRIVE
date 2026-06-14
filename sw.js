const CACHE = 'gasdrive-v8.5.1-es'; // subo versión para forzar update
const FILES = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // PDFs Temario - 5 archivos completos
  './01_Senyals_Tomo_I_RD_465_2025.pdf',           // PDF 1: Señales
  './02_Normes_Circulacio_Tomo_II_Edicio_2024.pdf', // PDF 2: Normas Circulación
  './03_Manual_IX_Primers_Auxilis_2025.pdf',        // PDF 3: Primeros Auxilios
  './04_Manual_VIII_Mecanica_2024.pdf',             // PDF 4: Mecánica
  './05_Medi_Ambient_Distintius_DGT_2025.pdf'       // PDF 5: Medio Ambiente
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
