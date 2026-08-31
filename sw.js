const CACHE = 'gasdrive-v10.7.4'; // SUBE ESTA VERSION CADA VEZ QUE CAMBIES ALGO
const FILES = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './temario.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',

  // ===== BANCO NUEVO =====
  './senales.json', // TU JSON CON ruta_panel

  // PDFs Temario - 5 archivos completos
  './01_Senales_Tomo_I_RD_465_2025.pdf',
  './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
  './03_Manual_IX_Primeros_Auxilios_2025.pdf',
  './04_Manual_VIII_Mecanica_2024.pdf',
  './05_Medio_Ambiente_Distintivos_DGT_2025.pdf',

  // ===== TODOS LOS PANELES DGT REALES DE TU JSON =====
  // P - PELIGRO
  './P-01_INTERSECCIONES.jpg',
  './P-02_PASO_A_NIVEL.jpg',
  './P-03_FERROCARRIL_AEROPUERTO_CURVAS_RESALTO.jpg',
  './P-04_TUNEL_PENDIENTES_ESTRECHAMIENTO.jpg',
  './P-05_OBRAS_RESBALADIZO_PEATONES.jpg',
  './P-06_ESCUELA_ANCIANOS_CICLISTAS_ANIMALES.jpg',
  './P-07_OTROS_PELIGROS.jpg',

  // R - REGLAMENTARIA
  './R-01_CEDA_STOP.jpg',
  './R-02_PROHIBICION_VEHICULOS.jpg',
  './R-03_PROHIBICION_OTROS.jpg',
  './R-04_ADELANTAMIENTO.jpg',
  './R-05_LIMITACIONES_DIMENSIONES.jpg',
  './R-06_PROHIBICION_MANIOBRAS.jpg',
  './R-07_PROHIBICION_ESTACIONAMIENTO.jpg',
  './R-08_RESTRICCIONES_ESTACIONAMIENTO.jpg',
  './R-09_SENTIDO_DIRECCION_OBLIGATORIA.jpg',
  './R-10_PASO_OBLIGATORIO_ROTONDA.jpg',
  './R-11_FIN_OBLIGACION_VEHICULOS.jpg',
  './R-12_FIN_OBLIGACION_PEATONES_ESPECIALES.jpg',
  './R-13_FIN_GENERICO.jpg',

  // S - INDICACION
  './S-01_TIPOS_DE_VIA.jpg',
  './S-02_TIPOS_DE_VIA_FIN.jpg',
  './S-06_A_S-11_VELOCIDAD.jpg',
  './S-12_A_S-15_DIRECCIONES.jpg',
  './S-16_A_S-17_DIRECCIONES2.jpg',
  './S-18_A_S-19_SITUACION.jpg',
  './S-20_A_S-21_CARRIL.jpg',
  './S-22_A_S-25_SERVICIOS.jpg',
  './S-26_A_S-29_SERVICIOS2.jpg',
  './S-30_A_S-33_SERVICIOS3.jpg',
  './S-34_A_S-37_SERVICIOS4.jpg',
  './S-38_A_S-41_SERVICIOS5.jpg',
  './S-42_A_S-45_SERVICIOS6.jpg',
  './S-46_A_S-49_SERVICIOS7.jpg',
  './S-50_A_S-51_SERVICIOS8.jpg',
  './S-52D_A_S-53A_BIFURCACION.jpg',
  './S-53B_A_S-61A_SALIDA.jpg',
  './S-61B_A_S-63A_SALIDA.jpg',
  './S-65A_A_S-70A_CARRILES.jpg',
  './S-70B_A_S-72B_CONFLUENCIA.jpg',
  './S-73A_A_S-73B_CONFLUENCIA2.jpg',
  './S-105C_A_S-108_SERVICIO.jpg',
  './S-200_A_S-203_PRESEÑAL.jpg',
  './S-220_A_S-222_PRESEÑAL2.jpg',
  './S-222A_A_S-230_PRESEÑAL3.jpg',
  './S-321_A_S-342_DIRECCION.jpg'
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
  // Cache First: si esta en cache lo sirve, si no fetch
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
