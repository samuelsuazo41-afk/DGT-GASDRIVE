// sw.js - V19.2.7 GasDrive DGT ESP - CACHE BUSTER AGRESIVO
const CACHE = 'gasdrive-v19.2.7'; // CAMBIA ESTE NÚMERO EN CADA DEPLOY

self.addEventListener('install', e => {
  console.log('🚀 SW V19.2.7 instalando...');
  self.skipWaiting(); // MATA el SW viejo al instante
  
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll([
        './',
        './index.html?v=19.2.7',
        './manifest.json?v=19.2.7',
        './style.css?v=19.2.7',
        './temario.js?v=19.2.7',
        './data/senales-svg.js?v=19.2.7',
        './app.js?v=19.2.7',
        './data/preguntas-senales.js?v=19.2.7',
        './data/preguntas-normas.js?v=19.2.7',
        './data/preguntas-mecanica.js?v=19.2.7',
        './data/preguntas-auxilios.js?v=19.2.7',
        './data/preguntas-medioambiente.js?v=19.2.7',
        './data/preguntas-situaciones.js?v=19.2.7',
        './01_Senales_Tomo_I_RD_465_2025.pdf',
        './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
        './03_Manual_IX_Primeros_Auxilios_2025.pdf',
        './04_Manual_VIII_Mecanica_2024.pdf',
        './05_Medio_Ambiente_Distintivos_DGT_2025.pdf',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('activate', e => {
  console.log('✅ SW V19.2.7 activado');
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(k => {
          if (k !== CACHE) {
            console.log('🗑️ Borrando cache viejo:', k);
            return caches.delete(k);
          }
        })
      )
    ).then(() => self.clients.claim()) // Toma control inmediato
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      return r || fetch(e.request);
    })
  );
});