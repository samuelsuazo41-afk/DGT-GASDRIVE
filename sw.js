// sw.js - V19.2.1 GasDrive DGT ESP
const CACHE = 'gasdrive-v19.2.5';

const FILES = [
  './',
  './index.html',
  './app.js',
  './temario.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sw.js',
  
  // Módulos en /data/
  './data/senales-svg.js',
  './data/preguntas-senales.js',
  './data/preguntas-normas.js',
  './data/preguntas-mecanica.js',
  './data/preguntas-auxilios.js',
  './data/preguntas-medioambiente.js',
  './data/preguntas-situaciones.js',
  
  // PDFs en raíz - NOMBRES EXACTOS DE TU REPO
  './01_Senales_Tomo_I_RD_465_2025.pdf',
  './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
  './03_Manual_IX_Primeros_Auxilios_2025.pdf',
  './04_Manual_VIII_Mecanica_2024.pdf',
  './05_Medio_Ambiente_Distintivos_DGT_2025.pdf'
];

// INSTALAR
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// ACTIVAR - Borrar cache viejo
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// FETCH - Cache first
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});