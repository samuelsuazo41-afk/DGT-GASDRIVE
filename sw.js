const CACHE = 'gasdrive-v20.1.5'; // sube versión para forzar update
const FILES = [
  './',
  './index.html',
  './app.js?v=8.5.5',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  
  // ============================================
  // BLOQUE 1: Archivos DATA - Preguntas + SVG
  // Nombres exactos como en tu /data/
  // ============================================
  './data/preguntas_senales.js',
  './data/preguntas_normas.js',
  './data/preguntas_mecanica.js',
  './data/preguntas_auxilios.js',
  './data/preguntas_medioambiente.js',
  './data/preguntas_situaciones.js',
  './data/senales_svg.js',
  
  // ============================================
  // PDFs Temario - 5 archivos completos
  // Para tab Temario offline
  // ============================================
  './01_Senales_Tomo_I_RD_465_2025.pdf',
  './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
  './03_Manual_IX_Primers_Auxilios_2025.pdf',
  './04_Manual_VIII_Mecanica_2024.pdf',
  './05_Medio_Ambiente_Distintivos_DGT_2025.pdf'
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