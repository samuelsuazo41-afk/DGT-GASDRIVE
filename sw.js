// ===== GASDRIVE DGT - service-worker.js V14 FINAL - OFFLINE-FIRST 100% =====
// Cachea todo: core + 23 fichas T v3-final + familias M/N/A/E + paneles S/P/R
const CACHE_NAME = 'gasdrive-v14-offline-23fichas-2025-12';

const CORE_FILES = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './senales.json'
];

const FICHAS_T = [
  './ficha-t01a-definiciones-masas-clasificacion-vehiculos-v3-final.jpg',
  './ficha-t02a-via-partes-definiciones-v3-final.jpg',
  './ficha-t02b-via-partes-marcas-v3-final.jpg',
  './ficha-t02c-via-intersecciones-velocidades-v3-final.jpg',
  './ficha-t03a-senalizacion-vertical-peligro-v3-final.jpg',
  './ficha-t03b-senalizacion-semaforos-baliza-v3-final.jpg',
  './ficha-t04a-maniobras-definiciones-v3-final.jpg',
  './ficha-t04b-maniobras-adelantamiento-v3-final.jpg',
  './ficha-t05a-conductor-estado-psicofisico-v3-final.jpg',
  './ficha-t05b-alcohol-drogas-medicamentos-v3-final.jpg',
  './ficha-t06a-vehiculo-seguridad-activa-v3-final.jpg',
  './ficha-t06b-seguridad-pasiva-frenos-itv-v3-final.jpg',
  './ficha-t07a-accidentes-pas-primeros-auxilios-v3-final.jpg',
  './ficha-t07b-accidentes-conducta-pas-bioseguridad-v3-final.jpg',
  './ficha-t08a-luces-alumbrado-v3-final.jpg',
  './ficha-t08b-senalizacion-vehiculos-luces-v3-final.jpg',
  './ficha-t09a-conduccion-velocidades-tipos-via-v3-final.jpg',
  './ficha-t09b-intersecciones-glorietas-adelantamiento-v3-final.jpg',
  './ficha-t10a-iluminacion-carga-v3-final.jpg',
  './ficha-t10b-masa-dimensiones-remolque-v3-final.jpg',
  './ficha-t11a-permisos-conducir-clases-v3-final.jpg',
  './ficha-t11b-puntos-validez-cap-itv-v3-final.jpg'
];

const FAMILIAS = [
  // M-01 a M-11
  './M-01_MOTOR_BASIC.jpg','./M-02_FRENOS_RUEDAS.jpg','./M-03_ELECTRICO_ARRANQUE.jpg',
  './M-04_TRANSMISION.jpg','./M-05_REFRIGERACION.jpg','./M-06_FILTROS_TURBO.jpg',
  './M-07_HIBRIDO_TECH.jpg','./M-08_AVERIAS_HUMOS.jpg','./M-09_CAMION_INDUSTRIAL.jpg',
  './M-10_HERRAMIENTAS_V16.jpg','./M-11_RESTO_TEMARIO.jpg',
  // N-01 a N-15
  './N-01_ALCOHOL_TASAS.jpg','./N-02_CINTURON_SRI_EMBARAZADA.jpg','./N-03_PERMISO_PUNTOS_EDAT.jpg',
  './N-04_VELOCIDAD_CIUDAD.jpg','./N-05_VELOCIDAD_CARRETERA.jpg','./N-06_DISTRACCIONES_MOVIL.jpg',
  './N-07_DOCUMENTACION_ITV_SEGURO.jpg','./N-08_PENAL_DELITO_MULTAS.jpg','./N-09_STOP_CEDA_SEMAFORO.jpg',
  './N-10_PRIORIDAD_CARRIL_GLORIETA.jpg','./N-11_PRIORITARIOS_BUS_PEATON_BICI.jpg',
  './N-12_LUCES_SENALES_LUMINOSAS.jpg','./N-13_PARADA_ESTACIONAMIENTO_VO.jpg',
  './N-14_TUNEL_PASO_NIVEL_VAO.jpg','./N-15_TRAMPAS_EXAMEN_DGT.jpg',
  // A-01 a A-09
  './A-01_PAS_PROTEGER_AVISAR_SOCORRER.jpg','./A-02_RCP_BASICA.jpg','./A-03_HEMORRAGIAS_HERIDAS.jpg',
  './A-04_TRAUMAS_FRACTURAS_QUEMADURAS.jpg','./A-05_POSICIONES_TRASLADO.jpg','./A-06_MOTORISTA_CASCO.jpg',
  './A-07_BOTIQUIN_MATERIAL.jpg','./A-08_SHOCK_TCE_OCULAR.jpg','./A-09_HEMORRAGIA_INTERNA_APOYO.jpg',
  // E-01 a E-06
  './E-01_DISTINTIVOS_DGT_QUE_SON.jpg','./E-02_ETIQUETAS_0_ECO.jpg','./E-03_ETIQUETAS_C_B_SIN.jpg',
  './E-04_ZBE_ZONAS_BAJAS_EMISIONES.jpg','./E-05_PIRAMIDE_MOVILIDAD_CONTROLES.jpg',
  './E-06_NORMATIVA_TECNICA_COMPLETA.jpg'
];

const FILES_TO_CACHE = [...CORE_FILES, ...FICHAS_T, ...FAMILIAS];

self.addEventListener('install', event => {
  console.log('[SW V14] Instalando cache:', FILES_TO_CACHE.length, 'archivos');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE.map(url => new Request(url, {cache: 'reload'}))))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW V14] Algunos archivos no encontrados en cache inicial:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if(k !== CACHE_NAME) { console.log('[SW V14] Borrando cache viejo:', k); return caches.delete(k); } })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      return fetch(event.request).then(response => {
        // Cachea dinámicamente todo .jpg/.png/.json que no estaba en lista (S-, P-, R-)
        if(response.ok && (event.request.url.endsWith('.jpg') || event.request.url.endsWith('.png') || event.request.url.endsWith('.json'))){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Si falla online, devuelve index para app shell
        if(event.request.destination === 'document') return caches.match('./index.html');
      });
    })
  );
});