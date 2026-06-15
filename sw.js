const CACHE = 'gasdrive-v12.9.9-es'; // subo versión para forzar update
const FILES = [
  './',
  './index.html',
  './App.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // PDFs Temario - SIN ACENTOS NI Ñ NI Ç
  './01_Senales_Tomo_I_RD_465_2025.pdf',           // PDF 1: Señales
  './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf', // PDF 2: Normas Circulación  
  './03_Manual_IX_Primeros_Auxilios_2025.pdf',        // PDF 3: Primeros Auxilios
  './04_Manual_VIII_Mecanica_2024.pdf',             // PDF 4: Mecánica
  './05_Medio_Ambiente_Distintivos_DGT_2025.pdf'       // PDF 5: Medio Ambiente
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES)).catch(err => {
      console.error('Fallo cacheando:', err);
    })
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
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => {
      // Si falla el fetch y no está en cache, devuelve index para SPA
      if (e.request.mode === 'navigate') return caches.match('./index.html');
    }))
  );
});
