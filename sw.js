const CACHE = 'gasdrive-v18.3.8-es'; // Subí versión para forzar update SVG

const FILES = [
  './',
  './index.html',
  './App.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sw.js',
  
  // === V8.7.3: Módulos dinámicos en /data/ ===
  './data/senales-svg.js',  // NUEVO: SVG en vez de imagenes.js
  './data/preguntas-senales.js',
  './data/preguntas-normas.js',
  './data/preguntas-mecanica.js',
  './data/preguntas-auxilios.js',
  './data/preguntas-medioambiente.js',
  './data/preguntas-situaciones.js',
  './data/explicaciones.js',
  
  // === PDFs Temario ===
  './01_Senales_Tomo_I_RD_465_2025.pdf',
  './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
  './03_Manual_IX_Primeros_Auxilios_2025.pdf',
  './04_Manual_VIII_Mecanica_2024.pdf',
  './05_Medio_Ambiente_Distintivos_DGT_2025.pdf'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      console.log('✅ Cache base V8.7.3 instalado con SVG');
      return cache.addAll(FILES);
    }).catch(err => {
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
  console.log(`✅ SW ${CACHE} activado - Sin imagenes.js`);
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      // Si está en cache, devuelve. Si no, fetch y cachea dinámico
      return r || fetch(e.request).then(res => {
        // Cachea archivos nuevos de /data/ que no estaban en FILES
        if (e.request.url.includes('/data/') && res.ok) {
          caches.open(CACHE).then(cache => cache.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => {
        // Si falla el fetch y no está en cache, devuelve index para SPA
        if (e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});