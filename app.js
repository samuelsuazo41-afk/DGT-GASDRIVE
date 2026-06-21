// GASDRIVE DGT V8.2 ES - 630 PREGUNTAS DGT 2026 - VERSIÓN UNO
const VERSION = "8.2";

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// ============================================
// DATOS GLOBALES + PROGRESO - NUEVO INTEGRADO
// ============================================
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

// Guardar progreso - NUEVO
function guardarProgreso() {
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
}

// Métricas test - NUEVO
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

// ============================================
// PANTALLA INTRO - Aparece SIEMPRE al abrir
// ============================================
function mostrarIntro(){
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 0 10px">GasDrive DGT ES 2026</h1>
      <p style="font-size:18px;opacity:0.8;margin:0 0 10px">Aprende el carnet en 15 min al día</p>
      <p style="font-size:16px;opacity:0.9;margin:0 0 30px">📚 Temarios oficiales DGT para estudiar cuando quieras</p>
      <div style="text-align:left;font-size:16px;margin-bottom:40px;line-height:2">
        <div>💰 Gana coins respondiendo bien</div>
        <div>🏎️ Compra supercoches en el Garaje</div>
        <div>📚 630 preguntas DGT reales</div>
        <div>📖 Temarios completos para repasar</div>
      </div>
      <button onclick="tancarIntro()" style="background:linear-gradient(135deg,#ff8c00,#ff2d55);border:none;color:#fff;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer">EMPEZAR</button>
    </div>
  `);
}

function tancarIntro(){
  document.getElementById('intro-screen').remove();
}

// ============================================
// VERSIÓN UNO - DATOS EXTERNOS CON FALLBACK 100% SEGURO
// General mezcla todo: solo pinta imagen si hay codigo + SVG
// Si /data/ no existe, usa arrays internos y no rompe nada
// ============================================
const PREGUNTAS = window.PREGUNTAS || {};
const CASOS = window.SITUACIONES || {};
window.SENALES_SVG = window.SENALES_SVG || {};
let DATOS_CARGADOS = Object.keys(PREGUNTAS).length > 0;

async function cargarModulos() {
  // Fallback total: si ya hay datos, no hace nada
  if(DATOS_CARGADOS) {
    console.log('⚡ Versión uno - Datos internos activos');
    initTests();
    return;
  }

  try {
    console.log('🚀 Versión uno - Intentando cargar /data/');

    const modSenales = await import('./data/preguntas-senales.js');
    PREGUNTAS.senales = modSenales.PREGUNTAS_SENALES || [];

    // General por ahora = solo señales. Cuando tengas normas/mecanica lo mezclamos
    PREGUNTAS.general = [...PREGUNTAS.senales];

    const modSvg = await import('./data/senales-svg.js');
    window.SENALES_SVG = modSvg.SENALES_SVG || {};

    DATOS_CARGADOS = true;
    console.log(`✅ Versión uno: ${PREGUNTAS.senales.length} señales + ${Object.keys(window.SENALES_SVG).length} SVGs cargados`);

  } catch(e) {
    console.log('⚠️ /data/ no encontrada. Versión uno usa arrays internos. 0 roturas');
    DATOS_CARGADOS = true;
  }

  initTests();
}

// Llama a cargarPregunta solo después de tener datos listos
function initTests() {
  cargarPregunta('general');
  cargarPregunta('senales');
  cargarPregunta('normas');
  cargarPregunta('mecanica');
  cargarPregunta('auxilios');
  cargarPregunta('medioambiente');
  cargarSituacion('clima');
}

// VERSIÓN UNO: Render imagen SEGURO para General + Señales
// Si no hay codigo o no hay SVG -> oculta el contenedor, no rompe
function renderImagenTest(cat, p) {
  const imgCont = document.getElementById(`test-${cat}-imagen`);
  if(!imgCont) return;

  if(p.codigo && window.SENALES_SVG[p.codigo.toLowerCase()]) {
    imgCont.style.display = 'block';
    imgCont.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;margin:12px 0;min-height:120px;max-height:180px">
        ${window.SENALES_SVG[p.codigo.toLowerCase()]}
      </div>
    `;
  } else {
    imgCont.style.display = 'none';
    imgCont.innerHTML = '';
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
// VERSIÓN UNO BLOQUE 2 - RENDER IMAGEN + INIT SEGURO
// General mezcla todo: solo pinta imagen si hay codigo + SVG
// Si no hay imagen -> oculta contenedor, no rompe nada
// Encaje: init() llama cargarModulos() del bloque 1
// ============================================

// Render imagen SEGURO para General + Señales
function renderImagenTest(cat, p) {
  const imgCont = document.getElementById(`test-${cat}-imagen`);
  if(!imgCont) return;

  if(p.codigo && window.SENALES_SVG && window.SENALES_SVG[p.codigo.toLowerCase()]) {
    imgCont.style.display = 'block';
    imgCont.innerHTML = `
      <div style="display:flex;justify-content:center;align-items:center;margin:12px 0;min-height:120px;max-height:180px">
        ${window.SENALES_SVG[p.codigo.toLowerCase()]}
      </div>
    `;
  } else {
    imgCont.style.display = 'none';
    imgCont.innerHTML = '';
  }
}

// MODIFICACIÓN 1: init() ÚNICA - carga módulos antes de pintar
function init() {
  console.log("GasDrive V8.5 ES cargado");
  mostrarIntro();
  actualizarCoins();
  actualizarMensajeMotivacional();
  cargarModulos(); // BLOQUE 1: carga /data/, luego llama initTests()
}

// MODIFICACIÓN 2: initTests() ÚNICA - se ejecuta después de cargar datos
function initTests() {
  cargarPregunta('general');
  cargarPregunta('senales');
  cargarPregunta('normas');
  cargarPregunta('mecanica');
  cargarPregunta('auxilios');
  cargarPregunta('medioambiente');
  cargarSituacion('clima');
}

// MODIFICACIÓN 3: cargarPregunta() ÚNICA - con render de imagen integrado
function cargarPregunta(cat) {
  const s = estado.test[cat];
  const preguntas = mezclarArray(PREGUNTAS[cat]);
  if(!preguntas || preguntas.length === 0) return;
  const pOriginal = preguntas[s.idx % preguntas.length];
  const opcionesMezcladas = mezclarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesMezcladas, ok: nuevoIndexCorrecto};
  s.current = p;

  document.getElementById(`test-${cat}-pregunta`).textContent = p.q;

  renderImagenTest(cat, p); // BLOQUE 2: pinta imagen solo si existe

  document.getElementById(`test-${cat}-aciertos`).textContent = s.aciertos;
  document.getElementById(`test-${cat}-racha`).textContent = s.racha;
  document.getElementById(`test-${cat}-score`).textContent = s.puntuacion;
  document.getElementById(`test-${cat}-progress`).style.width = `${((s.idx % preguntas.length)/preguntas.length)*100}%`;
  const cont = document.getElementById(`test-${cat}-opciones`);
  cont.innerHTML = '';
  document.getElementById(`test-${cat}-feedback`).textContent = '';
  document.getElementById(`btn-sig-test-${cat}`).disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = txt;
    div.onclick = function() { responderTest(cat, i, this); };
    cont.appendChild(div);
  });
}

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

let sitCategoriaActiva = 'clima';

function init() {
  console.log("GasDrive V8.5 ES cargado");
  mostrarIntro();
  actualizarCoins();
  cargarPregunta('general');
  cargarPregunta('senales');
  cargarPregunta('normas');
  cargarPregunta('mecanica');
  cargarPregunta('auxilios');
  cargarPregunta('medioambiente');
  cargarSituacion('clima');
  actualizarMensajeMotivacional();
}

function guardar() {
  localStorage.setItem('gd_coins', estado.coins);
  localStorage.setItem('gd_coches', JSON.stringify(estado.coches));
  localStorage.setItem('gd_accesorios', JSON.stringify(estado.accesorios));
  localStorage.setItem('gd_emojis', JSON.stringify(estado.emojis));
}

function actualizarCoins() {
  const el = document.getElementById('coins');
  if(el) el.textContent = `💰 ${estado.coins}`;
}

// Mezclador Fisher-Yates para randomizar opciones y preguntas
function mezclarArray(arr) {
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cambiarTab(e, tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  e.target.closest('.tab-btn').classList.add('active');

  if(tab === 'garage') cargarGaraje();
  if(tab === 'tienda') cargarTienda();
  if(tab === 'tips') cargarTips();
  if(tab === 'temario') cargarTemario();
  if(tab === 'test') cargarPregunta('general');
  if(tab === 'situaciones') cargarSituacion(sitCategoriaActiva);
  if(tab === 'progreso') cargarProgreso(); // NUEVO
}

function cambiarSubTab(e, tab, subtab) {
  const tabId = tab === 'sit'? 'situaciones' : tab;
  const contenedor = document.getElementById('tab-' + tabId);
  contenedor.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  contenedor.querySelectorAll('.sub-content').forEach(c => c.classList.remove('active'));
  e.target.classList.add('active');
  document.getElementById(`${tab === 'test'? 'test' : 'sit'}-${subtab}`).classList.add('active');
  if(tab === 'test') cargarPregunta(subtab);
  if(tab === 'sit') cargarSituacion(subtab);
}

function cambiarCategoriaSit(cat) {
  sitCategoriaActiva = cat;
  document.querySelectorAll('#tab-situaciones.category-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  const titulos = {
    clima: '🌧️ CASOS REALES - CLIMA ADVERSO',
    urbano: '🏙️ CASOS REALES - URBANO',
    carretera: '🛣️ CASOS REALES - CARRETERA',
    emergencia: '🚨 CASOS REALES - EMERGENCIA'
  };
  document.getElementById('sit-titulo').textContent = titulos[cat];
  estado.sit[cat].idx = 0;
  cargarSituacion(cat);
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

// TEST con preguntas aleatorias cada vez
function cargarPregunta(cat) {
  const s = estado.test[cat];
  const preguntas = mezclarArray(PREGUNTAS[cat]);
  if(!preguntas || preguntas.length === 0) return;
  const pOriginal = preguntas[s.idx % preguntas.length];
  const opcionesMezcladas = mezclarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesMezcladas, ok: nuevoIndexCorrecto};
  s.current = p;
  document.getElementById(`test-${cat}-pregunta`).textContent = p.q;
  document.getElementById(`test-${cat}-aciertos`).textContent = s.aciertos;
  document.getElementById(`test-${cat}-racha`).textContent = s.racha;
  document.getElementById(`test-${cat}-score`).textContent = s.puntuacion;
  document.getElementById(`test-${cat}-progress`).style.width = `${((s.idx % preguntas.length)/preguntas.length)*100}%`;
  const cont = document.getElementById(`test-${cat}-opciones`);
  cont.innerHTML = '';
  document.getElementById(`test-${cat}-feedback`).textContent = '';
  document.getElementById(`btn-sig-test-${cat}`).disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = txt;
    div.onclick = function() { responderTest(cat, i, this); };
    cont.appendChild(div);
  });
}

function responderTest(cat, idx, el) {
  const s = estado.test[cat];
  const p = s.current;
  const cont = document.getElementById(`test-${cat}-opciones`);
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;
  cont.querySelectorAll('.opcion').forEach(o => o.classList.add('bloqueada'));
  const correcto = idx === p.ok;
  if(correcto) {
    el.classList.add('correcta');
    s.aciertos++;
    s.racha++;
    s.puntuacion += 10 + (s.racha * 2);
    estado.coins += 5;
    document.getElementById(`test-${cat}-feedback`).className = 'feedback acierto';
    document.getElementById(`test-${cat}-feedback`).textContent = `✅ ¡CORRECTO! +${10+(s.racha*2)} pts`;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    cont.querySelectorAll('.opcion')[p.ok].classList.add('correcta');
    document.getElementById(`test-${cat}-feedback`).className = 'feedback fallo';
    document.getElementById(`test-${cat}-feedback`).textContent = '❌ FALLO';
    mostrarEmoji(false, el);
    s.racha = 0;
  }

  // NUEVO: Guardar métricas para Progreso
  actualizarMetricasTest(cat, correcto, p.q.substring(0,50));

  document.getElementById(`btn-sig-test-${cat}`).disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteTest(e, cat) {
  estado.test[cat].idx++;
  cargarPregunta(cat);
}

// CASOS con preguntas aleatorias cada vez
function cargarSituacion(cat) {
  if(!cat) cat = sitCategoriaActiva;
  const s = estado.sit[cat];
  const casos = mezclarArray(SITUACIONES[cat]);
  if(!casos || casos.length === 0) return;
  const pOriginal = casos[s.idx % casos.length];
  const opcionesMezcladas = mezclarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesMezcladas, ok: nuevoIndexCorrecto};
  s.current = p;
  document.getElementById(`sit-${cat}-pregunta`).textContent = p.q;
  document.getElementById(`sit-${cat}-aciertos`).textContent = s.aciertos;
  document.getElementById(`sit-${cat}-score`).textContent = s.puntuacion;
  document.getElementById(`sit-${cat}-progress`).style.width = `${((s.idx % casos.length)/casos.length)*100}%`;
  const cont = document.getElementById(`sit-${cat}-opciones`);
  cont.innerHTML = '';
  document.getElementById(`sit-${cat}-feedback`).textContent = '';
  document.getElementById(`btn-sig-sit-${cat}`).disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = txt;
    div.onclick = function() { responderSituacion(cat, i, this); };
    cont.appendChild(div);
  });
}

function responderSituacion(cat, idx, el) {
  const s = estado.sit[cat];
  const p = s.current;
  const cont = document.getElementById(`sit-${cat}-opciones`);
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;
  cont.querySelectorAll('.opcion').forEach(o => o.classList.add('bloqueada'));
  const correcto = idx === p.ok;
  if(correcto) {
    el.classList.add('correcta');
    s.aciertos++;
    s.puntuacion += 15;
    estado.coins += 10;
    document.getElementById(`sit-${cat}-feedback`).className = 'feedback acierto';
    document.getElementById(`sit-${cat}-feedback`).textContent = `✅ ¡CORRECTO! +15 pts`;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    cont.querySelectorAll('.opcion')[p.ok].classList.add('correcta');
    document.getElementById(`sit-${cat}-feedback`).className = 'feedback fallo';
    document.getElementById(`sit-${cat}-feedback`).textContent = '❌ FALLO';
    mostrarEmoji(false, el);
  }
  document.getElementById(`btn-sig-sit-${cat}`).disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteSituacion(e, cat) {
  estado.sit[cat].idx++;
  cargarSituacion(cat);
}

// Examen con etiqueta de tipo
function iniciarExamen(e) {
  const todas = [
  ...PREGUNTAS.general,
  ...PREGUNTAS.senales,
  ...PREGUNTAS.normas,
  ...PREGUNTAS.mecanica,
  ...SITUACIONES.clima
  ];
  if(todas.length < 30) {
    alert('Faltan preguntas. Necesitas 30 mínimo.');
    return;
  }
  estado.examen.preguntas = mezclarArray(todas).slice(0, 30);
  estado.examen.activa = true;
  estado.examen.index = 0;
  estado.examen.aciertos = 0;
  estado.examen.fallos = 0;
  estado.examen.categoria = 'general';

  const tipoExamen = {
    general: "EXAMEN OFICIAL 30 PREGUNTAS - General",
    mecanico: "EXAMEN OFICIAL 30 PREGUNTAS - Mecánica",
    ambiental: "EXAMEN OFICIAL 30 PREGUNTAS - Medio Ambiente",
    senales: "EXAMEN OFICIAL 30 PREGUNTAS - Señales"
  };
  const tituloEl = document.querySelector('#tab-examen h2,.examen-titulo');
  if(tituloEl) tituloEl.textContent = tipoExamen[estado.examen.categoria];

  document.getElementById('btn-iniciar-examen').style.display = 'none';
  document.getElementById('btn-sig-examen').style.display = 'block';
  iniciarTimerExamen();
  cargarPreguntaExamen();
}

function iniciarTimerExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.tiempo = 1800;
  estado.examen.timer = setInterval(() => {
    estado.examen.tiempo--;
    const min = Math.floor(estado.examen.tiempo / 60);
    const seg = estado.examen.tiempo % 60;
    document.getElementById('examen-timer').textContent =
      `${min.toString().padStart(2,'0')}:${seg.toString().padStart(2,'0')}`;
    if(estado.examen.tiempo <= 0) finalizarExamen();
  }, 1000);
}

function cargarPreguntaExamen() {
  if(estado.examen.index >= 30) return finalizarExamen();
  const pOriginal = estado.examen.preguntas[estado.examen.index];
  const opcionesMezcladas = mezclarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesMezcladas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesMezcladas, ok: nuevoIndexCorrecto};
  estado.examen.preguntas[estado.examen.index] = p;
  document.getElementById('examen-num').textContent = estado.examen.index + 1;
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
  document.getElementById('examen-progress').style.width = `${(estado.examen.index/30)*100}%`;
  document.getElementById('examen-pregunta').textContent = p.q;
  const cont = document.getElementById('examen-opciones');
  cont.innerHTML = '';
  document.getElementById('btn-sig-examen').disabled = true;
  p.a.forEach((txt, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = txt;
    div.onclick = function() { responderExamen(i, this); };
    cont.appendChild(div);
  });
}

function responderExamen(idx, el) {
  const p = estado.examen.preguntas[estado.examen.index];
  const cont = document.getElementById('examen-opciones');
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;
  cont.querySelectorAll('.opcion').forEach(o => o.classList.add('bloqueada'));
  const correcto = idx === p.ok;
  if(correcto) {
    el.classList.add('correcta');
    estado.examen.aciertos++;
    estado.coins += 20;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    cont.querySelectorAll('.opcion')[p.ok].classList.add('correcta');
    estado.examen.fallos++;
    mostrarEmoji(false, el);
  }
  document.getElementById('btn-sig-examen').disabled = false;
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
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

function finalizarExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.activa = false;
  const nota = estado.examen.aciertos;
  const aprobado = nota >= 27;

  // NUEVO: Guardar stats de examen
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
      <button class="btn" onclick="reiniciarExamen()">Hacer otro examen</button>
    `;
    estado.coins += nota * 20;
  } else {
    res.innerHTML = `
      <h2 style="color:#e74c3c">❌ SUSPENSO</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Aciertos: ${nota} | Fallos: ${estado.examen.fallos}</p>
      <p>Necesitas 27 aciertos mínimo</p>
      <button class="btn" onclick="reiniciarExamen()">Volver a intentar</button>
    `;
  }
  actualizarCoins();
  guardar();
}

function reiniciarExamen() {
  document.getElementById('examen-resultado').style.display = 'none';
  document.getElementById('btn-iniciar-examen').style.display = 'block';
  document.getElementById('btn-sig-examen').style.display = 'none';
  document.getElementById('examen-pregunta').textContent = "Pulsa Iniciar Examen";
  document.getElementById('examen-opciones').innerHTML = '';
  document.getElementById('examen-num').textContent = '0';
  document.getElementById('examen-aciertos').textContent = '0';
  document.getElementById('examen-progress').style.width = '0%';
  document.getElementById('examen-timer').textContent = '30:00';
}

// NUEVO: Función para pintar Progreso
function cargarProgreso() {
  const cont = document.getElementById('progreso-stats');
  if(!cont) return;

  let html = '';
  Object.entries(PROGRESO.tests).forEach(([cat, data]) => {
    const pct = data.total > 0? Math.round((data.aciertos / data.total) * 100) : 0;
    const nombre = cat === 'senales'? 'Señales' :
                   cat === 'medioambiente'? 'Medio Ambiente' :
                   cat.charAt(0).toUpperCase() + cat.slice(1);
    html += `
      <div class="progreso-card">
        <div class="progreso-cat">${nombre}</div>
        <div class="progreso-pct">${pct}%</div>
        <div class="progreso-text">${data.aciertos}/${data.total} aciertos</div>
        <div class="progreso-bar"><div class="progreso-fill" style="width:${pct}%"></div></div>
      </div>
    `;
  });
  cont.innerHTML = html;
}

//... resto de tu código cargarGaraje, cargarTienda, etc sin tocar...

function cargarGaraje() {
  const cont = document.getElementById('garage-lista');
  cont.innerHTML = '';
  let hpTotal = 90;
  estado.accesorios.forEach(id => {
    const acc = ACCESORIOS.find(a => a.id === id);
    if(acc) hpTotal += acc.hp;
  });
  document.getElementById('garage-score').textContent = `🏎️ ${hpTotal} CV`;
  COCHES.forEach(coche => {
    const desbloqueado = estado.coches.includes(coche.id);
    const div = document.createElement('div');
    div.className = 'garage-car' + (desbloqueado? '' : ' locked');
    div.innerHTML = `
      <div style="font-size:40px; filter:${coche.color}">${coche.emoji}</div>
      <div>${coche.nombre}</div>
      <div style="color:#667eea">${coche.cv} CV</div>
      ${!desbloqueado? `<button class="btn-buy" onclick="comprarCoche('${coche.id}')">Comprar ${coche.precio}💰</button>` : '<div style="color:#2ecc71">✓ Propietario</div>'}
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
  const cont = document.getElementById('emoji-tienda');
  cont.innerHTML = '';
  ACCESORIOS.forEach(acc => {
    const comprado = estado.accesorios.includes(acc.id);
    const div = document.createElement('div');
    div.className = 'emoji-item' + (comprado? ' locked' : '');
    div.innerHTML = `
      <div style="font-size:40px">${acc.emoji}</div>
      <div>${acc.nombre}</div>
      <div style="color:#667eea">+${acc.hp} CV</div>
      ${!comprado? `<button class="btn-buy" onclick="comprarAccesorios('${acc.id}')">Comprar ${acc.precio}💰</button>` : '<div style="color:#2ecc71">✓ Comprado</div>'}
    `;
    cont.appendChild(div);
  });
  EMOJI_TIENDA.forEach(emoji => {
    const comprado = estado.emojis.includes(emoji.id);
    const div = document.createElement('div');
    div.className = 'emoji-item' + (comprado? ' locked' : '');
    div.innerHTML = `
      <div style="font-size:40px">${emoji.emoji}</div>
      <div>${emoji.nombre}</div>
      <div style="color:#667eea">Cosmético</div>
      ${!comprado? `<button class="btn-buy" onclick="comprarEmoji('${emoji.id}')">Comprar ${emoji.precio}💰</button>` : '<div style="color:#2ecc71">✓ Comprado</div>'}
    `;
    cont.appendChild(div);
  });
}

function comprarAccesorios(id) {
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
  const totalAcc = estado.accesorios.length;
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ff8c00,#ff2d55);color:#fff;padding:12px 24px;border-radius:12px;font-weight:bold;z-index:999;animation:slideUp 0.3s';
  msg.innerHTML = `🏎️ ¡Ya estás creando tu supercoché! ${totalAcc}/42 accesorios`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

function comprarEmoji(id) {
  const emoji = EMOJI_TIENDA.find(e => e.id === id);
  if(!emoji) return;
  if(estado.coins < emoji.precio) {
    alert('No tienes suficientes coins');
    return;
  }
  estado.coins -= emoji.precio;
  estado.emojis.push(id);
  guardar();
  actualizarCoins();
  cargarTienda();
}

function cargarTips() {
  tipsData = TIPS;
  currentTip = 0;
  mostrarTip();
}

function mostrarTip() {
  if (tipsData.length === 0) return;
  const tip = tipsData[currentTip];
  document.getElementById('tip-content').innerHTML = `
    <div class="tip-emoji">${tip.emoji}</div>
    <div class="tip-text">${tip.txt}</div>
  `;
  document.getElementById('tip-counter').textContent = `${currentTip + 1} / ${tipsData.length}`;
}

function nextTip(e) {
  currentTip = (currentTip + 1) % tipsData.length;
  mostrarTip();
}

function prevTip(e) {
  currentTip = (currentTip - 1 + tipsData.length) % tipsData.length;
  mostrarTip();
}

function cargarTemario() {
  const container = document.getElementById('temario-lista');
  container.innerHTML = `
    <div class="temario-item" onclick="abrirPDF('./01_Senales_Tomo_I_RD_465_2025.pdf')">
      <div style="font-size:40px">🚦</div>
      <div>Señales</div>
      <div style="font-size:11px;color:#999">RD 465/2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf')">
      <div style="font-size:40px">📋</div>
      <div>Normas Circulación</div>
      <div style="font-size:11px;color:#999">Edición 2024</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./03_Manual_IX_Primers_Auxilios_2025.pdf')">
      <div style="font-size:40px">🚑</div>
      <div>Primeros Auxilios</div>
      <div style="font-size:11px;color:#999">Manual IX 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./04_Manual_VIII_Mecanica_2024.pdf')">
      <div style="font-size:40px">⚙️</div>
      <div>Mecánica</div>
      <div style="font-size:11px;color:#999">Manual VIII 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./05_Medio_Ambiente_Distintivos_DGT_2025.pdf')">
      <div style="font-size:40px">♻️</div>
      <div>Medio Ambiente</div>
      <div style="font-size:11px;color:#999">Distintivos DGT 2025</div>
    </div>
  `;
}

// PDF normal, sin marcador
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
      <button onclick="cerrarPDF()" style="background:none;border:none;color:#00D9FF;font-size:16px;font-weight:700">← Volver</button>
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

function actualizarMensajeMotivacional() {
  const mensajes = [
    "Vas por buen camino 💪",
    "Cada fallo te hace más fuerte 🔥",
    "El examen DGT es tuyo 🚗",
    "No pares ahora 💎",
    "Concéntrate y aprobarás 👑"
  ];
  const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
  const el = document.getElementById('motivacion');
  if(el) el.textContent = msg;
}

// SERVICE WORKER REGISTRO
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
.then(reg => console.log('SW registrado'))
.catch(err => console.log('SW error:', err));
  });
}





 
 


    

  





  




 
 



  
