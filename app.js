// ============================================
// BLOQUE 1 - GASDRIVE DGT V8.5.5 ES FINAL CORREGIDO
// General = mezcla dinámica de las 5 categorías
// CASOS = usa PREGUNTAS_SITUACIONES.clima/urbano/carretera/emergencia
// Datos cargan primero, intro después
// CERO import(), CERO export. 100% compatible PWA
// ============================================

const VERSION = '8.5.5';

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// ============================================
// DATOS GLOBALES + PROGRESO
// ============================================
let DATOS_CARGADOS = false;
window.categoriaActual = 'general'; // FIX: Evita undefined en UI
window.subcatActual = 'clima';

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

function guardarProgreso() {
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
}

function actualizarMetricasTest(categoria, acierto, preguntaId) {
  if(!PROGRESO.tests[categoria]) return;
  const prog = PROGRESO.tests[categoria];
  prog.total++;
  if(acierto) {
    prog.aciertos++;
    if(!prog.unicas.includes(preguntaId)) prog.unicas.push(preguntaId);
    let racha = parseInt(localStorage.getItem('gd_racha') || '0') + 1;
    localStorage.setItem('gd_racha', racha);
    let rachaMax = Math.max(racha, parseInt(localStorage.getItem('gd_racha_max') || '0'));
    localStorage.setItem('gd_racha_max', rachaMax);
  } else {
    if(!prog.falladas.includes(preguntaId)) prog.falladas.push(preguntaId);
    localStorage.setItem('gd_racha', '0');
  }
  guardarProgreso();
  if(DATOS_CARGADOS) actualizarUIProgreso();
}

function actualizarMetricasCaso(subcat, acierto, preguntaId) {
  if(!PROGRESO.casos[subcat]) return;
  const prog = PROGRESO.casos[subcat];
  prog.total++;
  if(acierto) {
    prog.aciertos++;
    if(!prog.unicas.includes(preguntaId)) prog.unicas.push(preguntaId);
  } else {
    if(!prog.falladas.includes(preguntaId)) prog.falladas.push(preguntaId);
  }
  guardarProgreso();
  if(DATOS_CARGADOS) actualizarUIProgreso();
}

// ============================================
// PANTALLA INTRO
// ============================================
function mostrarIntro(){
  if(document.getElementById('intro-screen')) return;
  if(!document.body) {
    setTimeout(mostrarIntro, 50);
    return;
  }

  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 0 10px">GasDrive DGT ES 2026</h1>
      <p style="font-size:18px;opacity:0.8;margin:0 0 10px">Aprende el carnet en 15 min al día</p>
      <p style="font-size:16px;opacity:0.9;margin:0 0 30px">📚 630 Preguntas DGT + Señales + 160 Casos</p>
      <div style="text-align:left;font-size:16px;margin-bottom:40px;line-height:2">
        <div>💰 Gana coins respondiendo bien</div>
        <div>🏎️ Compra supercoches en el Garaje</div>
        <div>📚 TEST + CASOS + EXAMEN DGT</div>
        <div>📖 Temarios oficiales DGT</div>
      </div>
      <button onclick="tancarIntro()" id="btn-empezar" style="background:linear-gradient(135deg,#ff8c00,#ff2d55);border:none;color:#fff;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(255,140,0,0.4)">EMPEZAR</button>
    </div>
  `);
}

function tancarIntro(){
  const intro = document.getElementById('intro-screen');
  if(intro) intro.remove();
}

// ============================================
// SHUFFLE + MEZCLAR SIN DUPLICAR
// ============================================
function shuffleArray(arr) {
  if(!arr ||!arr.length) return [];
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function mezclarSinDuplicar(...arrays) {
  const vistos = new Set();
  const resultado = [];
  arrays.flat().forEach(p => {
    if (p && p.codigo &&!vistos.has(p.codigo)) {
      vistos.add(p.codigo);
      resultado.push(p);
    }
  });
  return shuffleArray(resultado);
}

// ============================================
// RENDER IMAGEN SEGURO
// ============================================
function renderImagenTest(cat, p) {
  if(!DATOS_CARGADOS) return;
  const imgCont = document.getElementById('img-container-test');
  const svgCont = document.getElementById('svg-container');
  const labelCont = document.getElementById('img-label-test');
  if(!imgCont ||!svgCont) return;

  const codigo = (p.codigo || '').toLowerCase();
  if(codigo && window.SENALES_SVG && window.SENALES_SVG[codigo]) {
    imgCont.style.display = 'flex';
    svgCont.innerHTML = window.SENALES_SVG[codigo];
    if(labelCont) labelCont.textContent = 'Señal: ' + p.codigo.toUpperCase();
  } else {
    imgCont.style.display = 'none';
    svgCont.innerHTML = '';
  }
}

// ============================================
// FUNCIONES UI
// ============================================
function actualizarCoins() {
  const coins = parseInt(localStorage.getItem('gd_coins') || '0');
  const el1 = document.getElementById('monedas-header');
  const el2 = document.getElementById('monedas-tienda');
  if(el1) el1.textContent = `💰 ${coins}`;
  if(el2) el2.textContent = coins;
}

function actualizarMensajeMotivacional() {
  const mensajes = [
    "Cada fallo te hace mas fuerte 🔥",
    "Vas por buen camino 💪",
    "La DGT no perdona, tú tampoco 🚀",
    "Estudia hoy, aprueba mañana 👑"
  ];
  const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
  const el = document.getElementById('frase-header');
  if(el) el.textContent = msg;
}

function actualizarUIProgreso() {
  if(!DATOS_CARGADOS) return;

  const catActual = window.categoriaActual || 'general';
  const progTest = PROGRESO.tests[catActual] || { total: 0, aciertos: 0 };
  const racha = parseInt(localStorage.getItem('gd_racha') || '0');
  const score = progTest.aciertos * 10;

  const acStat = document.getElementById('aciertos-stat');
  const rachaStat = document.getElementById('racha-stat');
  const scoreStat = document.getElementById('score-stat');
  if(acStat) acStat.textContent = progTest.aciertos;
  if(rachaStat) rachaStat.textContent = racha;
  if(scoreStat) scoreStat.textContent = score;

  const subcatActual = window.subcatActual || 'clima';
  const progCaso = PROGRESO.casos[subcatActual] || { total: 0, aciertos: 0 };
  const casosRes = document.getElementById('casos-resueltos');
  const scoreCasos = document.getElementById('score-casos');
  if(casosRes) casosRes.textContent = `${progCaso.total}/20`;
  if(scoreCasos) scoreCasos.textContent = progCaso.aciertos * 20;

  let totalResueltas = 0;
  let totalAciertos = 0;
  Object.values(PROGRESO.tests).forEach(t => { totalResueltas += t.total; totalAciertos += t.aciertos; });
  Object.values(PROGRESO.casos).forEach(c => { totalResueltas += c.total; totalAciertos += c.aciertos; });

  const porcentaje = totalResueltas > 0? Math.round((totalAciertos / totalResueltas) * 100) : 0;
  const rachaMax = parseInt(localStorage.getItem('gd_racha_max') || '0');
  const tiempoTotal = Math.floor((PROGRESO.temarios.senales.tiempo || 0) / 60);

  const totRes = document.getElementById('total-resueltas');
  const totAc = document.getElementById('total-aciertos');
  const rachaMaxEl = document.getElementById('racha-max');
  const tiempoEl = document.getElementById('tiempo-total');
  if(totRes) totRes.textContent = totalResueltas;
  if(totAc) totAc.textContent = porcentaje + '%';
  if(rachaMaxEl) rachaMaxEl.textContent = rachaMax;
  if(tiempoEl) tiempoEl.textContent = tiempoTotal + 'h';

  const unicasTest = new Set();
  Object.values(PROGRESO.tests).forEach(t => t.unicas.forEach(id => unicasTest.add(id)));
  const unicasCasos = new Set();
  Object.values(PROGRESO.casos).forEach(c => c.unicas.forEach(id => unicasCasos.add(id)));

  const progTestMenu = document.getElementById('progreso-test-menu');
  const progCasosMenu = document.getElementById('progreso-casos-menu');
  const progTiempo = document.getElementById('progreso-tiempo');
  if(progTestMenu) progTestMenu.textContent = `${unicasTest.size}/630 preguntas únicas`;
  if(progCasosMenu) progCasosMenu.textContent = `${unicasCasos.size}/80 casos únicos`;
  if(progTiempo) progTiempo.textContent = `Total: ${tiempoTotal}h / 14h 10min`;

  const btnExamen = document.getElementById('btn-presentar-examen');
  if(btnExamen && porcentaje >= 80) {
    btnExamen.disabled = false;
    btnExamen.classList.add('activo');
  }
}

// ============================================
// INIT
// ============================================
function init() {
  console.log(`🚀 GasDrive V${VERSION} iniciado`);
  const t0 = performance.now();

  try {
    actualizarCoins();
    actualizarMensajeMotivacional();
    window.categoriaActual = 'general'; // FIX: Asegurar valor inicial

    const PREGUNTAS_GENERAL = mezclarSinDuplicar(
      window.PREGUNTAS_SENALES || [],
      window.PREGUNTAS_NORMAS || [],
      window.PREGUNTAS_MECANICA || [],
      window.PREGUNTAS_AUXILIOS || [],
      window.PREGUNTAS_MEDIOAMBIENTE || []
    );
    window.PREGUNTAS_GENERAL = PREGUNTAS_GENERAL;

    console.log(`DEBUG: General cargó ${PREGUNTAS_GENERAL.length} preguntas`);

    DATOS_CARGADOS = true;

    // Precarga solo si bloque 2 existe
    if(typeof cargarPregunta === 'function') {
      cargarPregunta('general');
      cargarPregunta('senales');
      cargarPregunta('normas');
      cargarPregunta('mecanica');
      cargarPregunta('auxilios');
      cargarPregunta('medioambiente');
    }
    if(typeof cargarSituacion === 'function') {
      cargarSituacion('clima');
    }

    const tiempoCarga = Math.round(performance.now() - t0);
    console.log(`✅ Datos cargados en ${tiempoCarga}ms. General: ${PREGUNTAS_GENERAL.length} preguntas`);
    actualizarUIProgreso();
  } catch(e) {
    console.error('❌ Error cargando datos:', e);
  }

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(mostrarIntro, 50));
  } else {
    setTimeout(mostrarIntro, 50);
  }
}

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
  {id:'a19',nombre:'Retrovisor Racing',emoji:'🪞',precio:200,hp:10},
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
];

// ============================================
// BLOQUE 2 - LÓGICA TEST + CASOS + EXAMEN V8.5.5 CORREGIDO
// IDs únicos del index.html: texto-pregunta, opciones-test, btn-siguiente-test
// Clase.card-opcion en lugar de.opcion
// Sin duplicación de funciones progreso
// ============================================

let tipsData = [];
let currentTip = 0;

let estado = {
  coins: parseInt(localStorage.getItem('gd_coins')) || 0,
  coches: JSON.parse(localStorage.getItem('gd_coches')) || ['c1'],
  accesorios: JSON.parse(localStorage.getItem('gd_accesorios')) || [],
  emojis: JSON.parse(localStorage.getItem('gd_emojis')) || [],
  test: {
    general: {idx:0,aciertos:0,racha:0,puntuacion:0},
    senales: {idx:0,aciertos:0,racha:0,puntuacion:0},
    normas: {idx:0,aciertos:0,racha:0,puntuacion:0},
    mecanica: {idx:0,aciertos:0,racha:0,puntuacion:0},
    auxilios: {idx:0,aciertos:0,racha:0,puntuacion:0},
    medioambiente: {idx:0,aciertos:0,racha:0,puntuacion:0}
  },
  examen: {
    activa: false,
    preguntas: [],
    index: 0,
    aciertos: 0,
    fallos: 0,
    timer: null,
    tiempo: 1800,
    categoria: 'general'
  },
  sit: {
    clima: {idx:0,aciertos:0,puntuacion:0,current:null},
    urbano: {idx:0,aciertos:0,puntuacion:0,current:null},
    carretera: {idx:0,aciertos:0,puntuacion:0,current:null},
    emergencia: {idx:0,aciertos:0,puntuacion:0,current:null}
  }
};

let sitCategoriaActiva = 'clima';

function guardar() {
  localStorage.setItem('gd_coins', estado.coins);
  localStorage.setItem('gd_coches', JSON.stringify(estado.coches));
  localStorage.setItem('gd_accesorios', JSON.stringify(estado.accesorios));
  localStorage.setItem('gd_emojis', JSON.stringify(estado.emojis));
}

function getPreguntasCat(cat) {
  if(cat === 'general') return window.PREGUNTAS_GENERAL || [];
  if(cat === 'senales') return window.PREGUNTAS_SENALES || [];
  if(cat === 'normas') return window.PREGUNTAS_NORMAS || [];
  if(cat === 'mecanica') return window.PREGUNTAS_MECANICA || [];
  if(cat === 'auxilios') return window.PREGUNTAS_AUXILIOS || [];
  if(cat === 'medioambiente') return window.PREGUNTAS_MEDIOAMBIENTE || [];
  return [];
}

function getCasosCat(subcat) {
  return window.PREGUNTAS_SITUACIONES && window.PREGUNTAS_SITUACIONES[subcat]? window.PREGUNTAS_SITUACIONES[subcat] : [];
}

function getNombreCat(cat) {
  const nombres = {
    general: '📝 TEST GENERAL',
    senales: '🚸 SEÑALES DE TRÁFICO',
    normas: '📋 NORMAS Y VELOCIDADES',
    mecanica: '🔧 MECÁNICA Y MANTENIMIENTO',
    auxilios: '🚑 AUXILIOS Y EMERGENCIAS',
    medioambiente: '🌱 MEDIOAMBIENTE'
  };
  return nombres[cat] || 'TEST';
}

function getNombreSubcat(subcat) {
  const nombres = {
    clima: '🌧️ CASOS - CLIMA ADVERSO',
    urbano: '🏙️ CASOS - URBANO',
    carretera: '🛣️ CASOS - CARRETERA',
    emergencia: '🚨 CASOS - EMERGENCIA'
  };
  return nombres[subcat] || 'CASOS';
}

function cargarPregunta(cat) {
  window.categoriaActual = cat;
  const s = estado.test[cat];
  const preguntas = shuffleArray(getPreguntasCat(cat));

  if(!preguntas || preguntas.length === 0) {
    console.warn(`No hay preguntas para: ${cat}`);
    return;
  }

  const pOriginal = preguntas[s.idx % preguntas.length];
  const opcionesMezcladas = shuffleArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesMezcladas, ok: nuevoIndexCorrecto};
  s.current = p;

  document.getElementById('titulo-categoria').textContent = getNombreCat(cat);
  document.getElementById('texto-pregunta').textContent = p.q;

  if(cat === 'senales') {
    renderImagenTest(cat, p);
  } else {
    const imgCont = document.getElementById('img-container-test');
    if(imgCont) imgCont.style.display = 'none';
  }

  const progressEl = document.getElementById('progress-test');
  if(progressEl) progressEl.style.width = `${((s.idx % preguntas.length)/preguntas.length)*100}%`;

  const cont = document.getElementById('opciones-test');
  cont.innerHTML = '';
  document.getElementById('btn-siguiente-test').disabled = true;

  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'card-opcion';
    div.textContent = txt;
    div.onclick = function() { responderTest(cat, i, this); };
    cont.appendChild(div);
  });

  actualizarUIProgreso();
}

function responderTest(cat, idx, el) {
  const s = estado.test[cat];
  const p = s.current;
  const cont = document.getElementById('opciones-test');
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  cont.querySelectorAll('.card-opcion').forEach(o => o.classList.add('disabled'));
  const correcto = idx === p.ok;

  if(correcto) {
    el.classList.add('correcta');
    s.aciertos++;
    s.racha++;
    s.puntuacion += 10 + (s.racha * 2);
    estado.coins += 5;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    cont.querySelectorAll('.card-opcion')[p.ok].classList.add('correcta');
    mostrarEmoji(false, el);
    s.racha = 0;
  }

  actualizarMetricasTest(cat, correcto, p.codigo || p.q.substring(0,50));
  document.getElementById('btn-siguiente-test').disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteTest(e) {
  const cat = window.categoriaActual || 'general';
  estado.test[cat].idx++;
  cargarPregunta(cat);
}

function cargarSituacion(subcat) {
  if(!subcat) subcat = sitCategoriaActiva;
  window.subcatActual = subcat;

  const s = estado.sit[subcat];
  const casos = shuffleArray(getCasosCat(subcat));

  if(!casos || casos.length === 0) {
    console.warn(`No hay casos para: ${subcat}`);
    return;
  }

  const pOriginal = casos[s.idx % casos.length];
  const opcionesMezcladas = shuffleArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesMezcladas, ok: nuevoIndexCorrecto};
  s.current = p;

  document.getElementById('titulo-caso').textContent = getNombreSubcat(subcat);
  document.getElementById('texto-caso').textContent = p.q;

  const progressEl = document.getElementById('progress-casos');
  if(progressEl) progressEl.style.width = `${((s.idx % casos.length)/casos.length)*100}%`;

  const cont = document.getElementById('opciones-caso');
  cont.innerHTML = '';
  document.getElementById('btn-siguiente-caso').disabled = true;

  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'card-opcion';
    div.textContent = txt;
    div.onclick = function() { responderSituacion(subcat, i, this); };
    cont.appendChild(div);
  });

  actualizarUIProgreso();
}

function responderSituacion(subcat, idx, el) {
  const s = estado.sit[subcat];
  const p = s.current;
  const cont = document.getElementById('opciones-caso');
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  cont.querySelectorAll('.card-opcion').forEach(o => o.classList.add('disabled'));
  const correcto = idx === p.ok;

  if(correcto) {
    el.classList.add('correcta');
    s.aciertos++;
    s.puntuacion += 15;
    estado.coins += 10;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    cont.querySelectorAll('.card-opcion')[p.ok].classList.add('correcta');
    mostrarEmoji(false, el);
  }

  actualizarMetricasCaso(subcat, correcto, p.q.substring(0,50));
  document.getElementById('btn-siguiente-caso').disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteSituacion(e) {
  const subcat = window.subcatActual || 'clima';
  estado.sit[subcat].idx++;
  cargarSituacion(subcat);
}

function mostrarEmoji(acierto, element) {
  const lista = acierto? EMOJIS_ACIERTO : EMOJIS_FALLO;
  const emoji = lista[Math.floor(Math.random() * lista.length)];
  const span = document.createElement('span');
  span.textContent = emoji;
  span.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:32px;animation:bounceIn 0.4s;pointer-events:none;z-index:999;';
  element.style.position = 'relative';
  element.appendChild(span);
  setTimeout(() => span.remove(), 600);
  if(navigator.vibrate) navigator.vibrate(acierto? [30,20,30] : 100);
}

// EXAMEN
function iniciarExamen(e) {
  const todas = [
  ...getPreguntasCat('general'),
  ...getPreguntasCat('senales'),
  ...getPreguntasCat('normas'),
  ...getPreguntasCat('mecanica'),
  ...getPreguntasCat('auxilios'),
  ...getPreguntasCat('medioambiente'),
  ...getCasosCat('clima'),
  ...getCasosCat('urbano'),
  ...getCasosCat('carretera'),
  ...getCasosCat('emergencia')
  ];

  if(todas.length < 30) {
    alert('Faltan preguntas. Necesitas 30 mínimo. Tienes: ' + todas.length);
    return;
  }

  estado.examen.preguntas = shuffleArray(todas).slice(0, 30);
  estado.examen.activa = true;
  estado.examen.index = 0;
  estado.examen.aciertos = 0;
  estado.examen.fallos = 0;
  estado.examen.tiempo = 1800;

  document.getElementById('btn-presentar-examen').style.display = 'none';
  document.getElementById('examen-resultado').style.display = 'none';

  iniciarTimerExamen();
  cargarPreguntaExamen();
}

function cargarPreguntaExamen() {
  const p = estado.examen.preguntas[estado.examen.index];
  const opcionesMezcladas = shuffleArray(p.a);
  const textoCorrecto = p.a[p.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  estado.examen.preguntas[estado.examen.index] = {...p, a: opcionesMezcladas, ok: nuevoIndexCorrecto};

  document.getElementById('examen-num').textContent = estado.examen.index + 1;
  document.getElementById('examen-pregunta').textContent = p.q;
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;

  const progressEl = document.getElementById('examen-progress');
  if(progressEl) progressEl.style.width = `${(estado.examen.index / 30) * 100}%`;

  const imgCont = document.getElementById('img-container-examen');
  const svgCont = document.getElementById('svg-container-examen');
  const codigo = (p.codigo || '').toLowerCase();
  if(imgCont && svgCont && codigo && window.SENALES_SVG && window.SENALES_SVG[codigo]) {
    imgCont.style.display = 'flex';
    svgCont.innerHTML = window.SENALES_SVG[codigo];
  } else if(imgCont) {
    imgCont.style.display = 'none';
  }

  const cont = document.getElementById('examen-opciones');
  cont.innerHTML = '';
  document.getElementById('btn-sig-examen').disabled = true;

  estado.examen.preguntas[estado.examen.index].a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'card-opcion';
    div.textContent = txt;
    div.onclick = function() { responderExamen(i, this); };
    cont.appendChild(div);
  });
}

function responderExamen(idx, el) {
  const p = estado.examen.preguntas[estado.examen.index];
  const cont = document.getElementById('examen-opciones');
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  cont.querySelectorAll('.card-opcion').forEach(o => o.classList.add('disabled'));
  const correcto = idx === p.ok;

  if(correcto) {
    el.classList.add('correcta');
    estado.examen.aciertos++;
    estado.coins += 20;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    cont.querySelectorAll('.card-opcion')[p.ok].classList.add('correcta');
    estado.examen.fallos++;
    mostrarEmoji(false, el);
  }

  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
  document.getElementById('btn-sig-examen').disabled = false;
  actualizarCoins();
  guardar();
}

function siguientePreguntaExamen(e) {
  estado.examen.index++;
  if(estado.examen.index >= 30) {
    finalizarExamen();
  } else {
    cargarPreguntaExamen();
  }
}

function iniciarTimerExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.timer = setInterval(() => {
    estado.examen.tiempo--;
    const min = Math.floor(estado.examen.tiempo / 60);
    const seg = estado.examen.tiempo % 60;
    const timerEl = document.getElementById('examen-timer');
    if(timerEl) timerEl.textContent = `${min}:${seg.toString().padStart(2,'0')}`;

    if(estado.examen.tiempo <= 0) {
      clearInterval(estado.examen.timer);
      finalizarExamen();
    }
  }, 1000);
}

function finalizarExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.activa = false;
  const nota = estado.examen.aciertos;
  const aprobado = nota >= 27;

  PROGRESO.examenes.realizados++;
  if(aprobado) PROGRESO.examenes.aprobados++;
  guardarProgreso();

  const res = document.getElementById('examen-resultado');
  res.style.display = 'block';
  if(aprobado) {
    res.innerHTML = `
      <h2 style="color:#2ecc71">✅ ¡APROBADO!</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Aciertos: ${nota} | Fallos: ${estado.examen.fallos}</p>
      <p>Has ganado +${nota*20} coins</p>
      <button class="btn-siguiente activo" onclick="reiniciarExamen()">Hacer otro examen</button>
    `;
    estado.coins += nota * 20;
  } else {
    res.innerHTML = `
      <h2 style="color:#e74c3c">❌ SUSPENSO</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Aciertos: ${nota} | Fallos: ${estado.examen.fallos}</p>
      <p>Necesitas 27 aciertos mínimo</p>
      <button class="btn-siguiente activo" onclick="reiniciarExamen()">Volver a intentar</button>
    `;
  }
  actualizarCoins();
  guardar();
}

function reiniciarExamen() {
  document.getElementById('examen-resultado').style.display = 'none';
  document.getElementById('btn-presentar-examen').style.display = 'block';
  document.getElementById('examen-pregunta').textContent = "Pulsa Presentarme al Examen";
  document.getElementById('examen-opciones').innerHTML = '';
  document.getElementById('examen-num').textContent = '0';
  document.getElementById('examen-aciertos').textContent = '0';
  document.getElementById('examen-progress').style.width = '0%';
  document.getElementById('examen-timer').textContent = '30:00';
}

// TIPS
function cargarTips() {
  tipsData = TIPS;
  currentTip = 0;
  mostrarTip();
}

function mostrarTip() {
  if (tipsData.length === 0) return;
  const tip = tipsData[currentTip];
  document.getElementById('texto-tip').textContent = tip.txt || tip.texto;
  document.getElementById('contador-tip').textContent = `${currentTip + 1} / ${tipsData.length}`;
}

function nextTip(e) {
  currentTip = (currentTip + 1) % tipsData.length;
  mostrarTip();
}

function prevTip(e) {
  currentTip = (currentTip - 1 + tipsData.length) % tipsData.length;
  mostrarTip();
}

// GARAJE + TIENDA
function cargarGaraje() {
  const cont = document.getElementById('grid-garaje');
  cont.innerHTML = '';
  let hpTotal = 90;
  estado.accesorios.forEach(id => {
    const acc = ACCESORIOS.find(a => a.id === id);
    if(acc) hpTotal += acc.hp;
  });
  document.getElementById('cv-garaje').textContent = `${hpTotal} CV`;

  COCHES.forEach(coche => {
    const desbloqueado = estado.coches.includes(coche.id);
    const div = document.createElement('div');
    div.className = 'card-item' + (desbloqueado? ' comprado' : '');
    div.innerHTML = `
      <div class="emoji" style="filter:${coche.color}">${coche.emoji}</div>
      <div class="nombre">${coche.nombre}</div>
      <div class="cv">${coche.cv} CV</div>
      ${!desbloqueado? `<button class="btn-comprar" onclick="comprarCoche('${coche.id}')">Comprar ${coche.precio}💰</button>` : '<div style="color:var(--green)">✓ Propietario</div>'}
    `;
    cont.appendChild(div);
  });
}

function comprarCoche(id) {
  const coche = COCHES.find(c => c.id === id);
  if(!coche) return;
  if(estado.coins < coche.precio) {
    alert('No tienes suficientes coins');
    return;
  }
  estado.coins -= coche.precio;
  estado.coches.push(id);
  guardar();
  actualizarCoins();
  cargarGaraje();
}

function cargarTienda() {
  const cont = document.getElementById('grid-tienda');
  cont.innerHTML = '';
  ACCESORIOS.forEach(acc => {
    const comprado = estado.accesorios.includes(acc.id);
    const div = document.createElement('div');
    div.className = 'card-item' + (comprado? ' comprado' : '');
    div.innerHTML = `
      <div class="emoji">${acc.emoji}</div>
      <div class="nombre">${acc.nombre}</div>
      <div class="cv">+${acc.hp} CV</div>
      ${!comprado? `<button class="btn-comprar" onclick="comprarAccesorio('${acc.id}')">Comprar ${acc.precio}💰</button>` : '<div style="color:var(--green)">✓ Comprado</div>'}
    `;
    cont.appendChild(div);
  });
}

function comprarAccesorio(id) {
  const acc = ACCESORIOS.find(a => a.id === id);
  if(!acc) return;
  if(estado.coins < acc.precio) {
    alert('No tienes suficientes coins');
    return;
  }
  estado.coins -= acc.precio;
  estado.accesorios.push(id);
  guardar();
  actualizarCoins();
  cargarTienda();
}

// TEMARIO PDF
function cargarTemario() {
  const container = document.getElementById('lista-temario');
  container.innerHTML = `
    <div class="card card-menu" onclick="abrirPDF('./01_Senales_Tomo_I_RD_465_2025.pdf')">
      <h2>🚦 Señales</h2><p>RD 465/2025</p>
    </div>
    <div class="card card-menu" onclick="abrirPDF('./02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf')">
      <h2>📋 Normas Circulación</h2><p>Edición 2024</p>
    </div>
    <div class="card card-menu" onclick="abrirPDF('./03_Manual_IX_Primers_Auxilios_2025.pdf')">
      <h2>🚑 Primeros Auxilios</h2><p>Manual IX 2025</p>
    </div>
    <div class="card card-menu" onclick="abrirPDF('./04_Manual_VIII_Mecanica_2024.pdf')">
      <h2>⚙️ Mecánica</h2><p>Manual VIII 2025</p>
    </div>
    <div class="card card-menu" onclick="abrirPDF('./05_Medio_Ambiente_Distintivos_DGT_2025.pdf')">
      <h2>♻️ Medio Ambiente</h2><p>Distintivos DGT 2025</p>
    </div>
  `;
}

function abrirPDF(ruta) {
  const modal = document.createElement('div');
  modal.id = 'pdf-modal';
  modal.style.cssText = `
    position:fixed;top:0;left:0;right:0;bottom:0;
    background:#0a0a0a;z-index:9999;
    display:flex;flex-direction:column;
  `;
  modal.innerHTML = `
    <div style="background:#1a1a1a;padding:12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #333">
      <button onclick="cerrarPDF()" style="background:none;border:none;color:#00bcd4;font-size:16px;font-weight:700">← Volver</button>
      <div style="color:#fff;font-size:15px;font-weight:700">Temario DGT</div>
      <div style="width:60px"></div>
    </div>
    <iframe src="${ruta}" style="flex:1;border:none;width:100%"></iframe>
  `;
  document.body.appendChild(modal);
}

function cerrarPDF() {
  const modal = document.getElementById('pdf-modal');
  if(modal) modal.remove();
}

// LISTENERS BOTONES - SIN NAVBAR DUPLICADO
document.getElementById('btn-siguiente-test')?.addEventListener('click', siguienteTest);
document.getElementById('btn-siguiente-caso')?.addEventListener('click', siguienteSituacion);
document.getElementById('btn-tip-siguiente')?.addEventListener('click', nextTip);
document.getElementById('btn-tip-anterior')?.addEventListener('click', prevTip);
document.getElementById('btn-presentar-examen')?.addEventListener('click', iniciarExamen);
document.getElementById('btn-sig-examen')?.addEventListener('click', siguientePreguntaExamen);

// SERVICE WORKER
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
  .then(reg => console.log('SW registrado'))
  .catch(err => console.log('SW error:', err));
  });
}


    

  





  




 
 



  
