// ============================================
// GASDRIVE DGT V19.2.7 ESP - 630 PREGUNTAS DGT 2026
// BLOQUE 1 FINAL - Solo SVG, sin JPG, sin archivos fantasmas
// ============================================
const VERSION = "19.2.7";

// === TEMARIO DGT 2026 HARDCODEADO ===
window.TEMARIO = [
  {id: 1, key: 'senales', titulo: "1. Señales de tráfico", archivo: "01_Senales_Tomo_I_RD_465_2025.pdf", icono: "🚦", subtitulo: "RD 465/2025", descripcion: "Señales de peligro, prioridad, prohibición, obligación e indicación"},
  {id: 2, key: 'normas', titulo: "2. Normas de circulación", archivo: "02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf", icono: "📋", subtitulo: "Edición 2024", descripcion: "Velocidades, prioridades, adelantamientos, alumbrado y carriles"},
  {id: 3, key: 'auxilios', titulo: "3. Primeros Auxilios", archivo: "03_Manual_IX_Primeros_Auxilios_2025.pdf", icono: "🚑", subtitulo: "Manual IX 2025", descripcion: "Conducta PAS, RCP, hemorragias y valoración ABC"},
  {id: 4, key: 'mecanica', titulo: "4. Mecánica del vehículo", archivo: "04_Manual_VIII_Mecanica_2024.pdf", icono: "⚙️", subtitulo: "Manual VIII 2024", descripcion: "Motor, frenos ABS, neumáticos y niveles de líquidos"},
  {id: 5, key: 'medioambiente', titulo: "5. Medio Ambiente + Distintivos DGT", archivo: "05_Medio_Ambiente_Distintivos_DGT_2025.pdf", icono: "♻️", subtitulo: "Distintivos DGT 2025", descripcion: "Etiquetas 0/ECO/C/B, ZBE y conducción eficiente"}
];
console.log('✅ TEMARIO hardcodeado:', window.TEMARIO.length, 'items');

// Guardias arrays
if(typeof COCHES === 'undefined') var COCHES = [];
if(typeof ACCESORIOS === 'undefined') var ACCESORIOS = [];
if(typeof EMOJI_TIENDA === 'undefined') var EMOJI_TIENDA = [];
if(typeof TIPS === 'undefined') var TIPS = [];

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🎉','💪','🔥','🚀','👏','💎','⚡','✅'];
const EMOJIS_FALLO = ['😅','💥','🤔','💔','😬','⚠️'];
const LINK_DGT_OFICIAL = 'https://sede.dgt.gob.es/es/permisos-de-conducir/';

// SUBTEMAS DÉBILES
const SUBTEMAS_DEBILES = {
  senales: [
    { pct: 0, msg: 'Señales de Prioridad R-1 a R-6 - Pág 65-66' },
    { pct: 20, msg: 'Prohibición Entrada R-101 a R-116 - Pág 68-72' },
    { pct: 40, msg: 'Prohibición Paso R-300 a R-311 - Pág 73-78' },
    { pct: 60, msg: 'Obligación R-400 a R-422 - Pág 75-76' },
    { pct: 80, msg: 'Indicaciones S-50 a S-126 - Pág 80-95' }
  ],
  normas: [
    { pct: 0, msg: 'Normas Generales y Definiciones - Pág 5-15' },
    { pct: 20, msg: 'Velocidades Máximas - Pág 25-32' },
    { pct: 40, msg: 'Prioridad Intersecciones - Pág 45-52' },
    { pct: 60, msg: 'Adelantamientos - Pág 65-75' },
    { pct: 80, msg: 'Alumbrado y Carriles - Pág 85-92' }
  ],
  auxilios: [
    { pct: 0, msg: 'Conducta PAS - Pág 40-45' },
    { pct: 25, msg: 'Valoración ABC - Pág 50-55' },
    { pct: 50, msg: 'RCP Básica - Pág 53-58' },
    { pct: 75, msg: 'Hemorragias - Pág 65-72' }
  ],
  mecanica: [
    { pct: 0, msg: 'Motor y Elementos - Pág 15-25' },
    { pct: 25, msg: 'Frenos y ABS - Pág 35-42' },
    { pct: 50, msg: 'Neumáticos - Pág 55-62' },
    { pct: 75, msg: 'Niveles Aceite/Refrigerante - Pág 70-76' }
  ],
  medioambiente: [
    { pct: 0, msg: 'Distintivos DGT 0/ECO/C/B - Pág 8-14' },
    { pct: 25, msg: 'Zonas Bajas Emisiones ZBE - Pág 18-25' },
    { pct: 50, msg: 'Conducción Eficiente - Pág 30-38' },
    { pct: 75, msg: 'Contaminación - Pág 45-50' }
  ],
  general: [
    { pct: 0, msg: 'Documentación y Permisos - Pág 5-10' }
  ]
};

// RUTAS MÓDULOS - Solo los 7 archivos que tienes
const MODULOS_PREGUNTAS = {
  senales: { archivo: 'preguntas-senales.js', export: 'PREGUNTAS_SENALES' },
  normas: { archivo: 'preguntas-normas.js', export: 'PREGUNTAS_NORMAS' },
  mecanica: { archivo: 'preguntas-mecanica.js', export: 'PREGUNTAS_MECANICA' },
  auxilios: { archivo: 'preguntas-auxilios.js', export: 'PREGUNTAS_AUXILIOS' },
  medioambiente: { archivo: 'preguntas-medioambiente.js', export: 'PREGUNTAS_MEDIOAMBIENTE' }
};

const MODULOS_CASOS = {
  clima: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'clima' },
  urbano: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'urbano' },
  carretera: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'carretera' },
  emergencia: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'emergencia' }
};

// DATOS GLOBALES + PROGRESO
let PROGRESO = JSON.parse(localStorage.getItem('gd_progreso')) || {
  tests: {
    general: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    senales: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    normas: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    mecanica: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    auxilios: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    medioambiente: { total: 0, aciertos: 0, unicas: [], falladas: [] }
  },
  casos: {
    clima: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    urbano: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    carretera: { total: 0, aciertos: 0, unicas: [], falladas: [] },
    emergencia: { total: 0, aciertos: 0, unicas: [], falladas: [] }
  },
  examenes: { realizados: 0, aprobados: 0, historial: [] },
  temarios: {
    senales: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 },
    normas: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 },
    auxilios: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 },
    mecanica: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 },
    medioambiente: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 }
  }
};

const PREGUNTAS = {};
const CASOS = {};
window.SENALES_SVG = {};
let SVG_CARGADOS = false;

// ESTADO GLOBAL
const estado = JSON.parse(localStorage.getItem('gd_estado')) || {
  coins: 0,
  coches: [],
  test: {
    general: { idx:0, aciertos:0, racha:0, puntuacion:0, current:null },
    senales: { idx:0, aciertos:0, racha:0, puntuacion:0, current:null },
    normas: { idx:0, aciertos:0, racha:0, puntuacion:0, current:null },
    mecanica: { idx:0, aciertos:0, racha:0, puntuacion:0, current:null },
    auxilios: { idx:0, aciertos:0, racha:0, puntuacion:0, current:null },
    medioambiente: { idx:0, aciertos:0, racha:0, puntuacion:0, current:null }
  },
  situacion: {
    clima: { idx:0, aciertos:0, puntuacion:0, current:null },
    urbano: { idx:0, aciertos:0, puntuacion:0, current:null },
    carretera: { idx:0, aciertos:0, puntuacion:0, current:null },
    emergencia: { idx:0, aciertos:0, puntuacion:0, current:null }
  },
  examen: { activo:false, index:0, aciertos:0, fallos:0, tiempo:0, timer:null, preguntas:[] }
};

// Guardar
function guardar() {
  localStorage.setItem('gd_estado', JSON.stringify(estado));
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
}

function guardarProgreso() {
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
}

// Métricas
function actualizarMetricasTest(categoria, acierto, preguntaId) {
  const prog = PROGRESO.tests[categoria];
  prog.total++;
  if(acierto) {
    prog.aciertos++;
    if(!prog.unicas.includes(preguntaId)) prog.unicas.push(preguntaId);
  } else {
    if(!prog.falladas.includes(preguntaId)) prog.falladas.push(preguntaId);
  }
  guardarProgreso();
}

function getPorcentajeProgreso(categoria) {
  const total = PREGUNTAS[categoria]? PREGUNTAS[categoria].length : 0;
  if(total === 0) return 0;
  const unicas = PROGRESO.tests[categoria].unicas.length;
  return Math.round((unicas / total) * 100);
}

function getSubtemaDebil(categoria) {
  const pct = getPorcentajeProgreso(categoria);
  const subtemas = SUBTEMAS_DEBILES[categoria] || SUBTEMAS_DEBILES.general;
  for(let i = subtemas.length - 1; i >= 0; i--) {
    if(pct >= subtemas[i].pct) return subtemas[i].msg;
  }
  return subtemas[0].msg;
}

// Emoji flotante
function mostrarEmoji(acierto, elemento){
  const emojis = acierto? EMOJIS_ACIERTO : EMOJIS_FALLO;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const div = document.createElement('div');
  div.textContent = emoji;
  div.className = 'emoji-flotante';
  elemento.style.position = 'relative';
  elemento.appendChild(div);
  setTimeout(() => div.remove(), 1000);
}

// Pintar SVG - FIX: toLowerCase() no lowerCase()
function pintarImagenTest(cat, preguntaTexto) {
  const imgCont = document.getElementById(`test-${cat}-imagen`);
  if (!imgCont) return;

  const match = preguntaTexto.match(/\b([rsp]-\d+[a-z]?)\b/i);
  const codigo = match? match[1].toLowerCase() : null; // FIX AQUÍ

  if (!codigo ||!SVG_CARGADOS) {
    imgCont.innerHTML = '';
    return;
  }

  const svg = window.SENALES_SVG[codigo];
  if (svg) {
    imgCont.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:160px">${svg}</div>`;
    const svgEl = imgCont.querySelector('svg');
    if (svgEl) {
      svgEl.removeAttribute('width');
      svgEl.removeAttribute('height');
    }
  } else {
    imgCont.innerHTML = '';
  }
}

// ELIMINADO: cargarPreguntaTest - Solo existe cargarPregunta() en bloque 2
// ELIMINADO: renderImagenTest - No hay /data/img/ en repo

// Abrir PDF
function abrirPDF(archivo) {
  window.open('./' + archivo, '_blank');
  console.log(`📄 Abriendo PDF:./${archivo}`);
}

// PINTAR TEMARIO SÍNCRONO
function pintarTemario() {
  const container = document.getElementById('temario-lista');
  if(!container) {
    console.error('❌ No existe #temario-lista');
    return;
  }

  container.innerHTML = window.TEMARIO.map(item => {
    const pct = getPorcentajeProgreso(item.key);
    const subtema = getSubtemaDebil(item.key);
    return `
      <div class="temario-item" onclick="abrirPDF('${item.archivo}')">
        <div class="icono">${item.icono}</div>
        <div class="titulo">${item.titulo}</div>
        <div class="sub">${item.subtitulo}</div>
        <div class="progreso-bar">
          <div class="progreso-fill" style="width:${pct}%"></div>
        </div>
        <div class="progreso-text">${pct}% completado</div>
        <div class="subtema-debil">${subtema}</div>
      </div>
    `;
  }).join('');
  console.log('✅ Temario pintado:', window.TEMARIO.length);
}

// INTRO
function mostrarIntro(){
  const intro = document.createElement('div');
  intro.id = 'intro-screen';
  intro.innerHTML = `
    <div class="icono">🚗</div>
    <h1>GasDrive DGT ESP 2026 v${VERSION}</h1>
    <p>Aprende el carnet en 15 min al día</p>
    <p class="sub">📚 Temarios oficiales DGT para estudiar cuando quieras</p>
    <div class="lista">
      <div>💰 Gana coins respondiendo bien</div>
      <div>🏎️ Compra supercotxes en el Garaje</div>
      <div>📚 630 preguntas DGT reales</div>
      <div>📖 Temarios completos para repasar</div>
    </div>
    <button onclick="tancarIntro()">EMPEZAR</button>
  `;
  document.body.insertAdjacentElement('afterbegin', intro);
}

function tancarIntro(){
  document.getElementById('intro-screen')?.remove();
  console.log('🚀 Usuario clicó EMPEZAR. Cargando datos...');
  cargarModulos();
}

// Cargar módulos SOLO después de intro - 7 archivos.js
async function cargarModulos() {
  console.log(`🚀 V${VERSION} - Cargando 7 módulos desde /data/...`);
  const t0 = performance.now();

  await Promise.all([
   ...Object.entries(MODULOS_PREGUNTAS).map(async ([tema, config]) => {
      try {
        const mod = await import(`./data/${config.archivo}`);
        PREGUNTAS[tema] = mod[config.export] || [];
        console.log(`✅ ${tema}: ${PREGUNTAS[tema].length} preguntas`);
      } catch (e) {
        console.error(`❌ Error ${config.archivo}:`, e);
        PREGUNTAS[tema] = [];
      }
    }),
    import(`./data/preguntas-situaciones.js`)
   .then(mod => {
      const SIT = mod.SITUACIONES || {};
      Object.entries(MODULOS_CASOS).forEach(([caso, config]) => {
        CASOS[config.clave] = SIT[config.clave] || [];
        console.log(`✅ ${caso}: ${CASOS[config.clave].length} casos`);
      });
    })
   .catch(e => console.error('❌ Error situaciones:', e)),
    import(`./data/senales-svg.js`)
   .then(mod => {
      window.SENALES_SVG = mod.SENALES_SVG || {};
      SVG_CARGADOS = true;
      console.log(`✅ SVG: ${Object.keys(window.SENALES_SVG).length} señales`);
    })
   .catch(e => console.error('❌ Error SVG:', e))
  ]);

  PREGUNTAS.general = [];
  Object.values(PREGUNTAS).forEach(arr => {
    if(Array.isArray(arr)) PREGUNTAS.general.push(...arr);
  });
  console.log(`✅ DATOS LISTOS en ${Math.round(performance.now() - t0)}ms. Total: ${PREGUNTAS.general.length}`);

  pintarTemario();
}

// Auto-arranque: Solo intro
window.addEventListener('DOMContentLoaded', () => {
  console.log(`🚀 app.js V${VERSION} cargado`);
  mostrarIntro();
});

// 100 TIPS DEL DÍA - DOPAMINA DIARIA
const TIPS = [
  {emoji:'🚗', txt:'Regla de los 2 segundos: mantén distancia con el coche de delante'},
  {emoji:'👀', txt:'Mira 12 segundos hacia delante, no solo el coche de delante'},
  {emoji:'🌧️', txt:'Lluvia: aumenta distancia x2 y reduce velocidad'},
  {emoji:'🌙', txt:'De noche reduce velocidad un 10-15%'},
  {emoji:'🚙', txt:'Adelanta solo cuando veas 200m libres'},
  {emoji:'🛑', txt:'STOP significa parada total, no frenada'},
  {emoji:'⚠️', txt:'Cede el paso a los peatones en el paso de cebra'},
  {emoji:'💡', txt:'Usa los intermitentes 3 segundos antes de girar'},
  {emoji:'🛣️', txt:'Velocidad máxima en autovía: 120 km/h'},
  {emoji:'🏙️', txt:'Velocidad máxima en ciudad: 50 km/h'},
  {emoji:'🚸', txt:'Cerca de colegios baja a 30 km/h'},
  {emoji:'🍺', txt:'Alcohol y conducción no son compatibles. 0,0 es seguro'},
  {emoji:'😴', txt:'Si tienes sueño, para y descansa. 15 min lo cambian todo'},
  {emoji:'📱', txt:'No uses el móvil mientras conduces'},
  {emoji:'🪞', txt:'Regula los espejos antes de salir'},
  {emoji:'🎒', txt:'Ponte el cinturón aunque sean 2 min'},
  {emoji:'👶', txt:'Niños <135cm deben ir con SRI adecuado'},
  {emoji:'🐶', txt:'Animales bien sujetos en el coche'},
  {emoji:'🧳', txt:'Carga bien repartida y sujeta'},
  {emoji:'🚲', txt:'Deja 1,5m al adelantar ciclistas'},
  {emoji:'🔄', txt:'En rotonda, quien está dentro tiene preferencia'},
  {emoji:'🚦', txt:'Ámbar intermitente = precaución máxima'},
  {emoji:'🚑', txt:'Cede paso a vehículos de emergencia con luces'},
  {emoji:'🌫️', txt:'Niebla: antiniebla + cortas, nunca largas'},
  {emoji:'❄️', txt:'Hielo: marchas largas, frena suave, sin volantazos'},
  {emoji:'🛞', txt:'Neumático liso = multa + riesgo aquaplaning'},
  {emoji:'💨', txt:'Distancia lateral al adelantar bici: 1.5m mínimo'},
  {emoji:'🚧', txt:'Línea continua = no adelantar, nunca'},
  {emoji:'🅿️', txt:'Aparcar en cuesta: ruedas giradas a la acera'},
  {emoji:'🔦', txt:'En túnel: enciende luces de cruce'},
  {emoji:'⚡', txt:'Coche eléctrico: silencioso, vigila peatones'},
  {emoji:'🔧', txt:'Testigo aceite rojo = para el motor YA'},
  {emoji:'🌡️', txt:'Motor caliente: no abras el tapón del refrigerante'},
  {emoji:'⛽', txt:'Reserva = 50km aprox, no juegues con eso'},
  {emoji:'🧠', txt:'Cada fallo te enseña. Vuelve a repasarlo'},
  {emoji:'🎯', txt:'Lee TODA la pregunta antes de responder'},
  {emoji:'⏱️', txt:'No tengas prisa, el examen no es una carrera'},
  {emoji:'📖', txt:'Repite los errores hasta que no los vuelvas a hacer'},
  {emoji:'🚙', txt:'En cuesta estrecha, sube tiene preferencia'},
  {emoji:'🌉', txt:'En puentes estrechos, cede si estás más cerca'},
  {emoji:'🚂', txt:'Paso a nivel: barrera bajada = parada obligatoria'},
  {emoji:'🚛', txt:'Camión girando: no te metas por el lado'},
  {emoji:'🚌', txt:'Bus saliendo de parada: facilítale la salida'},
  {emoji:'🏍️', txt:'Moto entre carriles: mantén distancia'},
  {emoji:'🦓', txt:'Paso de peatones elevado: reduce aún más'},
  {emoji:'🌳', txt:'Hojas en el suelo = asfalto resbaladizo'},
  {emoji:'💦', txt:'Charco grande: reduce y sujeta el volante'},
  {emoji:'💨', txt:'Viento lateral: sujeta fuerte el volante'},
  {emoji:'🚨', txt:'Conductor novel: L detrás 1 año'},
  {emoji:'👓', txt:'Si usas gafas, llévalas siempre'},
  {emoji:'🧤', txt:'Guantes en moto = menos lesiones en manos'},
  {emoji:'🪖', txt:'Casco bien abrochado salva vidas'},
  {emoji:'🔊', txt:'Música alta = menos atención'},
  {emoji:'🍕', txt:'Come antes de conducir largo, no durante'},
  {emoji:'💊', txt:'Medicamentos con somnolencia = no conducir'},
  {emoji:'🅰️', txt:'Señal A detrás si no llegas a 60km/h'},
  {emoji:'🚜', txt:'Tractor: paciencia, adelantará cuando pueda'},
  {emoji:'🐴', txt:'Animal en vía: para, no toques el claxon'},
  {emoji:'🏁', txt:'Final autovía: cede al incorporarte'},
  {emoji:'🅾️', txt:'Zona ORA: mira panel antes de aparcar'},
  {emoji:'🅿️', txt:'Park & Ride: aparca fuera, entra en bus'},
  {emoji:'🅱️', txt:'Carril bus: prohibido excepto taxis/bicis'},
  {emoji:'🚲', txt:'Carril bici: nunca aparcar ni circular'},
  {emoji:'🛑', txt:'Ceda el paso = reduce y mira a ambos lados'},
  {emoji:'🔀', txt:'Cambio carril: espejo + ángulo muerto + intermitente'},
  {emoji:'🅾️', txt:'Obstrucción: avisa con triángulos si paras'},
  {emoji:'🚗', txt:'Coche parado arcén: pasa lento y con precaución'},
  {emoji:'🌉', txt:'Túnel largo: mantén distancia y luces encendidas'},
  {emoji:'🚧', txt:'Obras: respeta señales provisionales'},
  {emoji:'🔄', txt:'Cambio sentido: solo donde está permitido'},
  {emoji:'🅿️', txt:'Marcha atrás: solo imprescindible y corto'},
  {emoji:'🚙', txt:'Adelantamiento: termínalo rápido y seguro'},
  {emoji:'⛔', txt:'No entrar: círculo rojo = prohibido pasar'},
  {emoji:'🚦', txt:'Semáforo con flecha: sigue la flecha'},
  {emoji:'🛑', txt:'STOP sin línea: para antes de la intersección'},
  {emoji:'🚸', txt:'Colegio: 30km/h cuando hay niños'},
  {emoji:'🌙', txt:'Luces de posición no sirven de noche'},
  {emoji:'💡', txt:'Luces largas: apaga a 150m de otro'},
  {emoji:'🚨', txt:'Avería: chaleco + triángulos a 50m'},
  {emoji:'🧯', txt:'Extintor: revisa fecha caducidad'},
  {emoji:'🛞', txt:'Repuesto: comprueba presión cada mes'},
  {emoji:'🔋', txt:'Batería: limpia bornes si cuesta arrancar'},
  {emoji:'💧', txt:'Líquido limpia: nunca solo agua'},
  {emoji:'🌡️', txt:'Temperatura alta: para y espera a enfriar'},
  {emoji:'🛢️', txt:'Aceite: nivel entre mín y máx'},
  {emoji:'🚗', txt:'Retrovisores: ver justo un poco de carrocería'},
  {emoji:'🪑', txt:'Asiento: rodillas flexionadas, brazos relajados'},
  {emoji:'🎒', txt:'Objetos sueltos = proyectiles en choque'},
  {emoji:'👶', txt:'SRI: grupo 0 hasta 13kg, de espaldas a la marcha'},
  {emoji:'🐾', txt:'Perro: arnés o transportín, nunca suelto'},
  {emoji:'🧳', txt:'Maletero: peso bajo y bien sujeto'},
  {emoji:'🚗', txt:'Distancia con camión: más del doble'},
  {emoji:'🌧️', txt:'Aquaplaning: no frenes, reduce gas'},
  {emoji:'❄️', txt:'Nieve: cadenas o neumáticos M+S'},
  {emoji:'💨', txt:'Ráfaga viento: sujeta volante y reduce'},
  {emoji:'🚙', txt:'Frena con motor en bajada larga'},
  {emoji:'🅾️', txt:'Zona 30: peatones pueden ir por calzada'},
  {emoji:'🚦', txt:'Flecha verde: tienes preferencia'},
  {emoji:'🚸', txt:'Policía regulando: obedece gestos'},
  {emoji:'🚗', txt:'Repasa errores cada día 10 min'},
  {emoji:'🏆', txt:'¡Tú puedes sacarte el carnet!'}
];


// GARAJE - 17 COCHES CON 6 SUPERCOCHES NUEVOS
const COCHES = [
  // 3 primeros normales, sin filtro
  {id:'c1',nombre:'SEAT Ibiza',emoji:'🚗',precio:200,cv:90,color:''},
  {id:'c2',nombre:'VW Golf GTI',emoji:'🚘',precio:800,cv:220,color:''},
  {id:'c3',nombre:'BMW M3',emoji:'🚙',precio:1500,cv:420,color:''},

  // Resto con efecto TRON y colores caros
  {id:'c4',nombre:'Tesla Model S',emoji:'⚡',precio:2000,cv:670,color:'hue-rotate(210deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #00d4ff)'}, // azul electrico
  {id:'c5',nombre:'Porsche 911',emoji:'🏎️',precio:2500,cv:450,color:'hue-rotate(130deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #00ff88)'}, // verde esmeralda
  {id:'c6',nombre:'Bugatti Chiron',emoji:'🏎️',precio:5000,cv:1500,color:'hue-rotate(200deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #00c8ff)'}, // azul hielo
  {id:'c7',nombre:'Yamaha R1',emoji:'🏍️',precio:2200,cv:200,color:'hue-rotate(55deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 8px #ffdd00)'}, // amarillo oro
  {id:'c8',nombre:'Ducati Panigale',emoji:'🏍️',precio:2800,cv:220,color:'hue-rotate(25deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #ff8800)'}, // naranja intenso
  {id:'c9',nombre:'Audi RS6',emoji:'🏎️',precio:3200,cv:600,color:'hue-rotate(180deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #00ffff)'}, // cian
  {id:'c10',nombre:'Nissan GTR',emoji:'🏎️',precio:3500,cv:565,color:'hue-rotate(90deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #88ff00)'}, // verde lima
  {id:'c11',nombre:'McLaren 720S',emoji:'🏎️',precio:4200,cv:720,color:'hue-rotate(15deg) saturate(2) brightness(1.2) drop-shadow(0 0 6px #ff6600)'}, // naranja fuego
  // SUPERCOCHES PREMIO MAYOR con glow mas potente
  {id:'c12',nombre:'Ferrari SF90 Stradale',emoji:'🏎️',precio:8500,cv:1000,color:'hue-rotate(0deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 10px #ff0000)'}, // rojo neon
  {id:'c13',nombre:'Lamborghini Aventador SVJ',emoji:'🏎️',precio:8000,cv:770,color:'hue-rotate(55deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 10px #ffdd00)'}, // amarillo oro
  {id:'c14',nombre:'Koenigsegg Jesko Absolut',emoji:'🏎️',precio:14000,cv:1600,color:'hue-rotate(270deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 10px #aa00ff)'},// violeta royal
  {id:'c15',nombre:'Porsche 918 Spyder',emoji:'🏎️',precio:9500,cv:887,color:'hue-rotate(130deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 10px #00ff88)'}, // verde esmeralda
  {id:'c16',nombre:'McLaren P1 GTR',emoji:'🏎️',precio:9000,cv:916,color:'hue-rotate(35deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 10px #ff8800)'}, // naranja neon
  {id:'c17',nombre:'Bugatti Bolide',emoji:'🏎️',precio:16000,cv:1825,color:'hue-rotate(200deg) saturate(2.5) brightness(1.3) drop-shadow(0 0 10px #00d4ff)'} // azul electrico
];

const ACCESORIOS = [
  // Mecanica / Potencia
  {id:'a1',nombre:'Turbo',emoji:'💨',precio:300,hp:50},
  {id:'a2',nombre:'Nitro',emoji:'🔥',precio:600,hp:80},
  {id:'a3',nombre:'Motor Electrico',emoji:'⚡',precio:800,hp:100},
  {id:'a4',nombre:'Kit Mecanico',emoji:'🛠️',precio:400,hp:40},
  {id:'a5',nombre:'Herramientas Racing',emoji:'🔧',precio:250,hp:20},
  {id:'a6',nombre:'Cadena Reforzada',emoji:'⛓️',precio:350,hp:30},
  {id:'a7',nombre:'Engranajes Sport',emoji:'⚙️',precio:300,hp:25},
  {id:'a8',nombre:'Tornillos Racing',emoji:'🔩',precio:200,hp:15},

  // Ruedas / Adherencia
  {id:'a9',nombre:'Neumaticos Slick',emoji:'🛞',precio:400,hp:35},
  {id:'a10',nombre:'Neumaticos Lluvia',emoji:'🛞',precio:350,hp:30},
  {id:'a11',nombre:'Cadenas Nieve',emoji:'❄️',precio:300,hp:25},
  {id:'a12',nombre:'Llantas Racing',emoji:'🔲',precio:500,hp:40},
  {id:'a13',nombre:'Eje Equilibrado',emoji:'🎯',precio:250,hp:20},

  // Aerodinamica / Exterior
  {id:'a14',nombre:'Aleron GT',emoji:'🔰',precio:400,hp:40},
  {id:'a15',nombre:'Aleron F1',emoji:'🏁',precio:700,hp:70},
  {id:'a16',nombre:'Cristales Tintados',emoji:'🪟',precio:200,hp:10},
  {id:'a17',nombre:'Luces LED',emoji:'💡',precio:250,hp:15},
  {id:'a18',nombre:'Faros Laser',emoji:'🔦',precio:600,hp:50},
  {id:'a19',nom:'Retrovisor Racing',emoji:'🪞',precio:200,hp:10},
  {id:'a20',nombre:'Defensa Reforzada',emoji:'🛡️',precio:450,hp:35},

  // Interior / Piloto
  {id:'a21',nombre:'Asiento Bucket',emoji:'🪑',precio:400,hp:25},
  {id:'a22',nombre:'Volante Racing',emoji:'🎛️',precio:350,hp:20},
  {id:'a23',nombre:'Cuadro Digital',emoji:'📊',precio:500,hp:30},
  {id:'a24',nombre:'Guantes Piloto',emoji:'🧤',precio:150,hp:10},
  {id:'a25',nombre:'Casco Racing',emoji:'🪖',precio:300,hp:15},
  {id:'a26',nombre:'Intercom',emoji:'🎧',precio:250,hp:10},

  // Estetica / Detalles Lujo
  {id:'a27',nombre:'Vinilo Llamas',emoji:'🎨',precio:300,hp:10},
  {id:'a28',nombre:'Vinilo Cromo',emoji:'🌈',precio:500,hp:15},
  {id:'a29',nombre:'Pintura Metalizada',emoji:'✨',precio:600,hp:20},
  {id:'a30',nombre:'Cristales Swarovski',emoji:'💎',precio:1000,hp:5},
  {id:'a31',nombre:'Corona Royal',emoji:'👑',precio:800,hp:10},
  {id:'a32',nombre:'Unicornio',emoji:'🦄',precio:1200,hp:5},
  {id:'a33',nombre:'Cohete',emoji:'🚀',precio:600,hp:15},
  {id:'a34',nombre:'Diamante',emoji:'💎',precio:1200,hp:5},
  {id:'a35',nombre:'Rayo',emoji:'⚡',precio:700,hp:20},
  {id:'a36',nombre:'Fuego',emoji:'🔥',precio:500,hp:15},


// ============================================
// BLOQUE 2 V19.2.7 - Lógica de navegación y tests
// CUADRA CON BLOQUE 1: TEMARIO hardcodeado + cargarPregunta única
// ============================================

// INIT - Se llama al cargar DOM después del clic en EMPEZAR
function init() {
  activarTabs();
  actualizarCoins();
  actualizarMensajeMotivacional();
  pintarTemario(); // CRÍTICO: Bloque 1 lo definió. Sin esto no hay tarjetas

  // Si ya hay preguntas cargadas, carga 1 de general
  if(PREGUNTAS.general && PREGUNTAS.general.length > 0) {
    cargarPregunta('general');
  }
}

// Tabs principales
function activarTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if(!btn.dataset.listener) {
      btn.addEventListener('click', (e) => {
        const match = btn.getAttribute('onclick');
        if(match) {
          const tab = match.match(/'([^']+)'/)[1];
          cambiarTab(e, tab);
        }
      });
      btn.dataset.listener = '1';
    }
  });
}

function cambiarTab(e, tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');

  if(tab === 'test') cambiarSubTab(e, 'test', 'general');
  else if(tab === 'situaciones') cambiarCategoriaSit('clima');
  else if(tab === 'garaje') cargarGaraje();
  else if(tab === 'tienda') cargarTienda();
  else if(tab === 'tips') cargarTips();
  else if(tab === 'progreso') cargarProgreso();
}

function cambiarSubTab(e, tab, sub) {
  document.querySelectorAll(`#tab-${tab}.sub-tab-btn`).forEach(b => b.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.querySelectorAll(`#tab-${tab}.sub-content`).forEach(c => c.classList.remove('active'));
  document.getElementById(`${tab}-${sub}`).classList.add('active');

  // V19.2.7: Solo existe cargarPregunta. cargadaPreguntaTest se borró del bloque 1
  cargarPregunta(sub);
}

function cambiarCategoriaSit(cat) {
  document.querySelectorAll('#tab-situaciones.sub-tab-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('#tab-situaciones.sub-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`sit-${cat}`).classList.add('active');
  cargarSituacion(cat);
}

// TESTS V19.2.7 - UNIFICADO CON BLOQUE 1
function cargarPregunta(categoria) {
  const arr = PREGUNTAS[categoria];
  if(!arr || arr.length === 0) {
    const el = document.getElementById(`test-${categoria}-pregunta`);
    if(el) el.textContent = 'Cargando preguntas...';
    setTimeout(() => cargarPregunta(categoria), 500);
    return;
  }

  const test = estado.test[categoria];
  if(test.idx >= arr.length) test.idx = 0;
  test.current = arr[test.idx];
  const p = test.current;

  // 1. Texto pregunta
  const txtEl = document.getElementById(`test-${categoria}-pregunta`);
  if(txtEl) txtEl.textContent = p.pregunta;

  // 2. Limpiar imagen anterior
  const imgCont = document.getElementById(`test-${categoria}-imagen`);
  if(imgCont) imgCont.innerHTML = '';

  // 3. SVG si es señal - función del bloque 1
  pintarImagenTest(categoria, p.pregunta);

  // 4. JPG/PNG si tiene - función del bloque 1
  renderImagenTest(categoria, p.imagen);

  // 5. Opciones
  const contOpciones = document.getElementById(`test-${categoria}-opciones`);
  contOpciones.innerHTML = '';
  p.opciones.forEach((op, idx) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = op;
    div.onclick = (e) => responderTest(e, categoria, idx);
    contOpciones.appendChild(div);
  });

  // 6. Contadores
  document.getElementById(`test-${categoria}-aciertos`).textContent = test.aciertos;
  document.getElementById(`test-${categoria}-racha`).textContent = test.racha;
  document.getElementById(`test-${categoria}-score`).textContent = test.puntuacion || 0;
}

function siguienteTest(e, categoria) {
  estado.test[categoria].idx++;
  cargarPregunta(categoria);
}

function responderTest(e, categoria, idx) {
  const test = estado.test[categoria];
  const p = test.current;
  const opciones = e.currentTarget.parentElement.children;
  Array.from(opciones).forEach(op => op.style.pointerEvents = 'none');

  const acierto = idx === p.correcta;
  if(acierto) {
    opciones[idx].classList.add('correcta');
    test.aciertos++;
    test.racha++;
    test.puntuacion = (test.puntuacion || 0) + 10 + (test.racha * 2);
    estado.coins += 10;
    mostrarEmoji(true, e.currentTarget);
  } else {
    opciones[idx].classList.add('incorrecta');
    opciones[p.correcta].classList.add('correcta');
    test.racha = 0;
    mostrarEmoji(false, e.currentTarget);
  }

  actualizarMetricasTest(categoria, acierto, p.id || p.pregunta.substring(0,50));
  guardar();
  actualizarCoins();
}

// SITUACIONES
function cargarSituacion(cat) {
  if(!CASOS[cat] || CASOS[cat].length === 0) {
    const el = document.getElementById(`sit-${cat}-pregunta`);
    if(el) el.textContent = 'Cargando casos...';
    setTimeout(() => cargarSituacion(cat), 500);
    return;
  }

  const sit = estado.situacion[cat];
  const casos = CASOS[cat];
  if(sit.idx >= casos.length) sit.idx = 0;
  sit.current = casos[sit.idx];
  const p = sit.current;

  document.getElementById(`sit-${cat}-pregunta`).textContent = p.pregunta;
  renderImagenTest(`sit-${cat}`, p.imagen);

  const contOpciones = document.getElementById(`sit-${cat}-opciones`);
  contOpciones.innerHTML = '';
  p.opciones.forEach((op, idx) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = op;
    div.onclick = (e) => responderSituacion(e, cat, idx);
    contOpciones.appendChild(div);
  });

  document.getElementById(`sit-${cat}-aciertos`).textContent = sit.aciertos;
  document.getElementById(`sit-${cat}-score`).textContent = sit.puntuacion || 0;
}

function siguienteSituacion(e, cat) {
  estado.situacion[cat].idx++;
  cargarSituacion(cat);
}

function responderSituacion(e, cat, idx) {
  const sit = estado.situacion[cat];
  const p = sit.current;
  const opciones = e.currentTarget.parentElement.children;
  Array.from(opciones).forEach(op => op.style.pointerEvents = 'none');

  const acierto = idx === p.correcta;
  if(acierto) {
    opciones[idx].classList.add('correcta');
    sit.aciertos++;
    sit.puntuacion = (sit.puntuacion || 0) + 15;
    estado.coins += 15;
    mostrarEmoji(true, e.currentTarget);
  } else {
    opciones[idx].classList.add('incorrecta');
    opciones[p.correcta].classList.add('correcta');
    mostrarEmoji(false, e.currentTarget);
  }

  PROGRESO.casos[cat].total++;
  if(acierto) PROGRESO.casos[cat].aciertos++;
  guardar();
  actualizarCoins();
}

// EXAMEN
function iniciarExamen(e) {
  const todasPreguntas = PREGUNTAS.general;
  if(!todasPreguntas || todasPreguntas.length < 30) {
    alert('Cargando preguntas... espera 2 segundos');
    setTimeout(() => iniciarExamen(e), 1000);
    return;
  }

  estado.examen.activo = true;
  estado.examen.index = 0;
  estado.examen.aciertos = 0;
  estado.examen.fallos = 0;
  estado.examen.tiempo = 1800;
  estado.examen.preguntas = [...todasPreguntas].sort(() => Math.random() - 0.5).slice(0, 30);

  document.getElementById('btn-iniciar-examen').style.display = 'none';
  document.getElementById('btn-siguiente-examen').style.display = 'block';
  document.getElementById('examen-resultado').style.display = 'none';

  cargarPreguntaExamen();
  iniciarTimerExamen();
}

function cargarPreguntaExamen() {
  if(!estado.examen.activo) return;
  const p = estado.examen.preguntas[estado.examen.index];

  document.getElementById('examen-num').textContent = estado.examen.index + 1;
  document.getElementById('examen-pregunta').textContent = p.pregunta;
  renderImagenTest('examen', p.imagen);

  const contOpciones = document.getElementById('examen-opciones');
  contOpciones.innerHTML = '';
  p.opciones.forEach((op, idx) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = op;
    div.onclick = (e) => responderExamen(e, idx);
    contOpciones.appendChild(div);
  });

  actualizarProgresoExamen();
}

function responderExamen(e, idx) {
  if(!estado.examen.activo) return;
  const p = estado.examen.preguntas[estado.examen.index];
  const opciones = e.currentTarget.parentElement.children;
  Array.from(opciones).forEach(op => op.style.pointerEvents = 'none');

  const acierto = idx === p.correcta;
  if(acierto) {
    opciones[idx].classList.add('correcta');
    estado.examen.aciertos++;
    mostrarEmoji(true, e.currentTarget);
  } else {
    opciones[idx].classList.add('incorrecta');
    opciones[p.correcta].classList.add('correcta');
    estado.examen.fallos++;
    mostrarEmoji(false, e.currentTarget);
  }

  setTimeout(() => siguientePreguntaExamen(e), 1500);
}

function siguientePreguntaExamen(e) {
  estado.examen.index++;
  if(estado.examen.index >= estado.examen.preguntas.length) {
    finalizarExamen();
    return;
  }
  cargarPreguntaExamen();
}

function iniciarTimerExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.timer = setInterval(() => {
    estado.examen.tiempo--;
    const min = Math.floor(estado.examen.tiempo / 60);
    const seg = estado.examen.tiempo % 60;
    document.getElementById('examen-timer').textContent = `${min}:${seg.toString().padStart(2,'0')}`;
    if(estado.examen.tiempo <= 0) {
      clearInterval(estado.examen.timer);
      finalizarExamen();
    }
  }, 1000);
}

function finalizarExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.activo = false;
  const aprobado = estado.examen.aciertos >= 24;
  PROGRESO.examenes.realizados++;
  if(aprobado) PROGRESO.examenes.aprobados++;

  document.getElementById('examen-resultado').style.display = 'block';
  document.getElementById('examen-resultado').innerHTML = `
    <div class="resultado-emoji">${aprobado? '🎉' : '💔'}</div>
    <div class="resultado-titulo">${aprobado? 'APROBADO' : 'SUSPENSO'}</div>
    <div class="resultado-text">Aciertos: ${estado.examen.aciertos}/30</div>
    <div class="resultado-sub">Mínimo 80%: 24 aciertos</div>
  `;
  document.getElementById('btn-siguiente-examen').style.display = 'none';
  document.getElementById('btn-iniciar-examen').style.display = 'block';
  document.getElementById('btn-iniciar-examen').textContent = 'REPETIR EXAMEN';
  guardar();
}

function actualizarProgresoExamen() {
  const pct = (estado.examen.index / estado.examen.preguntas.length) * 100;
  document.getElementById('examen-progreso').style.width = pct + '%';
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
}

// 1. CARGAR PROGRESO
function cargarProgreso() {
  const cont = document.getElementById('progreso-stats');
  if(!cont) return;

  let html = '';
  Object.entries(PROGRESO.tests).forEach(([cat, data]) => {
    const pct = data.total > 0? Math.round((data.aciertos / data.total) * 100) : 0;
    html += `
      <div class="progreso-card">
        <div class="progreso-cat">${cat.toUpperCase()}</div>
        <div class="progreso-pct">${pct}%</div>
        <div class="progreso-text">${data.aciertos}/${data.total} aciertos</div>
        <div class="progreso-bar"><div class="progreso-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  });
  cont.innerHTML = html;
}

// 2. CARGAR TIPS
function cargarTips() {
  const cont = document.getElementById('tips-lista');
  cont.innerHTML = TIPS.length? TIPS.map(tip => `<div class="tip-item">${tip}</div>`).join('') : '<p class="loading-placeholder">Cargando tips...</p>';
}

// 3. CARGAR GARAJE
function cargarGaraje() {
  const cont = document.getElementById('garaje-coches');
  if(!cont ||!COCHES.length) {
    cont.innerHTML = '<div class="loading-placeholder">Próximamente</div>';
    return;
  }

  cont.innerHTML = COCHES.map(coche => {
    const comprado = estado.coches.includes(coche.id);
    return `
      <div class="coche-item ${comprado? 'comprado' : ''}">
        <div class="coche-nombre">${coche.nombre}</div>
        <div class="coche-precio">${comprado? '✓ Comprado' : coche.precio + ' coins'}</div>
        ${!comprado? `<button onclick="comprarCoche('${coche.id}')">Comprar</button>` : ''}
      </div>
    `;
  }).join('');
}

function comprarCoche(id) {
  const coche = COCHES.find(c => c.id === id);
  if(!coche) return;
  if(estado.coins >= coche.precio &&!estado.coches.includes(id)) {
    estado.coins -= coche.precio;
    estado.coches.push(id);
    guardar();
    actualizarCoins();
    cargarGaraje();
  } else {
    alert('Coins insuficientes o ya lo tienes');
  }
}

// 4. CARGAR TIENDA
function cargarTienda() {
  const contAcc = document.getElementById('tienda-accesorios');
  if(contAcc) {
    contAcc.innerHTML = ACCESORIOS.length? ACCESORIOS.map(acc => {
      const comprado = estado.accesorios?.includes(acc.id);
      return `<div class="accesorio-item">${acc.nombre} ${comprado? '✓' : acc.precio}</div>`;
    }).join('') : '<div class="loading-placeholder">Próximamente</div>';
  }

  const contEmoji = document.getElementById('tienda-emojis');
  if(contEmoji) {
    contEmoji.innerHTML = EMOJI_TIENDA.length? EMOJI_TIENDA.map(emoji => {
      const comprado = estado.emojis?.includes(emoji.id);
      return `<div class="emoji-item">${emoji.emoji} ${comprado? '✓' : emoji.precio}</div>`;
    }).join('') : '<div class="loading-placeholder">Próximamente</div>';
  }
}

// UTILIDADES FINALES
function actualizarCoins() {
  const el = document.getElementById('coins');
  if(el) el.textContent = `💰 ${estado.coins}`;
}

function actualizarMensajeMotivacional() {
  const tips = ['15 min al día y apruebas', 'Revisa señales débiles', 'Practica el examen diario'];
  const msg = tips[Math.floor(Math.random() * tips.length)];
  const el = document.getElementById('motivacion');
  if(el) el.textContent = msg;
}

// SERVICE WORKER REGISTRO
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
   .then(reg => console.log('SW registrado:', reg.scope))
   .catch(err => console.log('SW error:', err));
  });
}




 
 


    

  





  




 
 



  
