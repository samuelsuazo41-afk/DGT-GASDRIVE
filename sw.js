const CACHE = 'gasdrive-v8.6.2-es'; // Subí versión para forzar update V16.7.7

const FILES = [
  './',
  './index.html',
  './App.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './sw.js',
  
  // === NUEVO V8.6: Módulos dinámicos en /data/ ===
  './data/imagenes.js',
  './data/preguntas-senales.js',
  './data/preguntas-normas.js',
  './data/preguntas-mecanica.js',
  './data/preguntas-auxilios.js',
  './data/preguntas-medioambiente.js',
  './data/preguntas-situaciones.js',
  
  // === PDFs Temario ===
  './01_Senales_Tomo_I_RD_465_2025.pdf',
  './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
  './03_Manual_IX_Primeros_Auxilios_2025.pdf',
  './04_Manual_VIII_Mecanica_2024.pdf',
  './05_Medio_Ambiente_Distintivos_DGT_2025.pdf',
  
  // === NUEVO: Todas las imágenes extraídas ===
  './img/senales/',
  './img/medioambiente/'
];

// Cache dinámico para todo /data/ y /img/
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return cache.addAll(FILES).then(() => {
        // Cachea todas las imágenes PNG de señales y medioambiente
        return caches.open(CACHE).then(c => {
          return fetch('./data/imagenes.js')
            .then(r => r.text())
            .then(txt => {
              // Extrae rutas de imagenes.js con regex
              const matches = txt.match(/"\.\/img\/[^"]+\.png"/g) || [];
              const rutas = matches.map(m => m.replace(/"/g, ''));
              console.log(`Cacheando ${rutas.length} imágenes...`);
              return c.addAll(rutas);
            })
            .catch(() => console.log('imagenes.js aún no existe, se cacheará después'));
        });
      });
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
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      // Si está en cache, devuelve. Si no, fetch y cachea dinámico
      return r || fetch(e.request).then(res => {
        // Cachea imágenes nuevas que no estaban en FILES
        if (e.request.url.includes('/img/') && res.ok) {
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