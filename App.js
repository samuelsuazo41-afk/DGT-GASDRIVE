// === GASDRIVE DGT V8.6.4 ES - BLOQUE 1 AUTO-CARGA ===
// Cambia VERSION en cada deploy para forzar update SW
const VERSION = "8.6.4";

// === REGISTRO AUTOMÁTICO DE MÓDULOS ===
// Solo tienes que añadir aquí el nombre del archivo y la clave exportada
const MODULOS_PREGUNTAS = {
  senales: { archivo: 'preguntas-senales.js', export: 'PREGUNTAS_SENALES' },
  normas: { archivo: 'preguntas-normas.js', export: 'PREGUNTAS_NORMAS' },
  mecanica: { archivo: 'preguntas-mecanica.js', export: 'PREGUNTAS_MECANICA' },
  auxilios: { archivo: 'preguntas-auxilios.js', export: 'PREGUNTAS_AUXILIOS' },
  medioambiente: { archivo: 'preguntas-medioambiente.js', export: 'PREGUNTAS_MEDIOAMBIENTE' }
  // "general" se genera mezclando todos, no necesita archivo
};

const MODULOS_CASOS = {
  clima: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'clima' },
  urbano: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'urbano' },
  carretera: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'carretera' },
  emergencia: { archivo: 'preguntas-situaciones.js', export: 'SITUACIONES', clave: 'emergencia' }
};

// === MOTOR DE PROGRESO DGT - AUTO-GENERADO ===
function crearProgresoVacio() {
  const progreso = { tests: {}, casos: {}, examenes: { realizados: 0, aprobados: 0, historial: [] }, temarios: {}, racha: { dias: 0, ultimaFecha: "" } };

  Object.keys(MODULOS_PREGUNTAS).forEach(tema => {
    progreso.tests[tema] = { total: 0, aciertos: 0, unicas: [], falladas: [] };
    progreso.temarios[tema] = { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 };
  });
  // Añade "general" manualmente para progreso
  progreso.tests.general = { total: 0, aciertos: 0, unicas: [], falladas: [] };
  progreso.temarios.general = { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 };

  Object.keys(MODULOS_CASOS).forEach(caso => {
    progreso.casos[caso] = { total: 0, aciertos: 0, unicas: [], falladas: [] };
  });

  return progreso;
}

let PROGRESO = JSON.parse(localStorage.getItem('gd_progreso')) || crearProgresoVacio();

function migrarProgreso() {
  let cambiado = false;
  Object.keys(MODULOS_PREGUNTAS).forEach(tema => {
    if (!PROGRESO.tests[tema]) {
      PROGRESO.tests[tema] = { total: 0, aciertos: 0, unicas: [], falladas: [] };
      PROGRESO.temarios[tema] = { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 };
      cambiado = true;
    }
  });
  if (!PROGRESO.tests.general) {
    PROGRESO.tests.general = { total: 0, aciertos: 0, unicas: [], falladas: [] };
    PROGRESO.temarios.general = { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 };
    cambiado = true;
  }
  Object.keys(MODULOS_CASOS).forEach(caso => {
    if (!PROGRESO.casos[caso]) {
      PROGRESO.casos[caso] = { total: 0, aciertos: 0, unicas: [], falladas: [] };
      cambiado = true;
    }
  });
  if (cambiado) guardarProgreso();
}
migrarProgreso();

// === CARGADOR DINÁMICO DE PREGUNTAS V8.6.4 ===
const PREGUNTAS = {};
const CASOS = {};

// Carga todos los módulos de preguntas con validación fuerte
async function cargarModulos() {
  console.log(`🚀 GasDrive V${VERSION} - Cargando módulos...`);

  // 1. Carga preguntas por tema
  for (const [tema, config] of Object.entries(MODULOS_PREGUNTAS)) {
    try {
      const mod = await import(`./data/${config.archivo}`);
      const data = mod[config.export];

      if(!data) {
        console.error(`❌ ${tema}: No existe export "${config.export}" en ${config.archivo}`);
        console.log(` Exports disponibles:`, Object.keys(mod));
        PREGUNTAS[tema] = [];
      } else if(!Array.isArray(data) || data.length === 0) {
        console.error(`❌ ${tema}: El export "${config.export}" está vacío en ${config.archivo}`);
        PREGUNTAS[tema] = [];
      } else {
        PREGUNTAS[tema] = data;
        console.log(`✅ ${tema}: ${data.length} preguntas cargadas`);
      }
    } catch (e) {
      console.error(`❌ Error cargando ${config.archivo}:`, e.message);
      PREGUNTAS[tema] = [];
    }
  }

  // 2. Genera "general" mezclando todos los temas con preguntas
  PREGUNTAS.general = [];
  Object.values(PREGUNTAS).forEach(arr => {
    if(Array.isArray(arr) && arr.length > 0) {
      PREGUNTAS.general.push(...arr);
    }
  });
  console.log(`✅ general: ${PREGUNTAS.general.length} preguntas mezcladas`);

  // 3. Carga casos - FIX: usar config.clave, no MODULOS_CASOS.clave
  try {
    const mod = await import(`./data/preguntas-situaciones.js`);
    const SIT = mod.SITUACIONES;
    for (const [caso, config] of Object.entries(MODULOS_CASOS)) {
      CASOS[caso] = SIT[config.clave] || [];
      console.log(`✅ Casos ${caso}: ${CASOS[caso].length} preguntas`);
    }
  } catch (e) {
    console.error(`❌ Error cargando situaciones:`, e);
    Object.keys(MODULOS_CASOS).forEach(caso => CASOS[caso] = []);
  }

  // 4. Carga imágenes
  try {
    const mod = await import(`./data/imagenes.js`);
    window.IMAGENES = mod.IMAGENES || {};
    console.log(`✅ Imágenes: ${Object.keys(window.IMAGENES).length} rutas cargadas`);
  } catch (e) {
    console.error(`❌ Error cargando imagenes.js:`, e);
    window.IMAGENES = {};
  }

  console.log('📊 RESUMEN FINAL:', Object.entries(PREGUNTAS).map(([k,v]) => `${k}:${v.length}`).join(' | '));
}

// === SUBTEMAS DÉBILES DINÁMICO ===
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

const LINK_DGT_OFICIAL = 'https://sede.dgt.gob.es/es/permisos-de-conducir/';

function guardarProgreso() {
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
}

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// BUSCA CLAVE FLEXIBLE
function buscarClave(obj, texto) {
  if (!obj ||!texto) return null;
  if (obj[texto]) return obj[texto];
  const limpio = texto.trim().replace(/:$/, '').toLowerCase();
  for (let k in obj) {
    if (k.trim().replace(/:$/, '').toLowerCase() === limpio) return obj[k];
  }
  return null;
}

// PINTA IMAGEN - V8.6.4 con imagen abajo
function pintarImagenTest(cat, preguntaTexto) {
  const imgCont = document.getElementById(`test-${cat}-imagen`);
  if (!imgCont ||!window.IMAGENES) return;

  const rutaImg = buscarClave(window.IMAGENES, preguntaTexto);
  if (rutaImg) {
    imgCont.innerHTML = `<img src="${rutaImg}" onerror="this.parentElement.innerHTML='<div style=color:#666;font-size:12px;text-align:center;padding:10px>📷 Imagen no encontrada</div>'" alt="Imagen pregunta">`;
  } else {
    imgCont.innerHTML = '';
  }
}

// INICIO: carga módulos antes de mostrar nada
document.addEventListener('DOMContentLoaded', async () => {
  await cargarModulos();
  mostrarIntro();
});

// INTRO SCREEN - usa Object.keys(MODULOS_PREGUNTAS).length real
function mostrarIntro(){
  const totalPreg = Object.values(PREGUNTAS).reduce((a,b) => a + (b?.length || 0), 0);
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 10px">GasDrive DGT 2026 v${VERSION}</h1>
      <p style="font-size:18px;opacity:0.8;margin:0 0 10px">Aprende el carnet en 15 min al día</p>
      <p style="font-size:16px;opacity:0.9;margin:0 0 30px">📚 ${Object.keys(MODULOS_PREGUNTAS).length + 1} temarios oficiales + casos reales</p>
      <div style="text-align:left;font-size:16px;margin-bottom:40px;line-height:2">
        <div>💰 Gana coins respondiendo bien</div>
        <div>🏎️ Compra supercoches en el Garaje</div>
        <div>📚 ${totalPreg} preguntas DGT reales</div>
        <div>📖 Temarios completos para repasar</div>
      </div>
      <button onclick="tancarIntro()" style="background:linear-gradient(135deg,#ff8c00,#ff2d55);border:none;color:#fff;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer">EMPEZAR</button>
    </div>
  `);
}

function tancarIntro() {
  const intro = document.getElementById('intro-screen');
  if(intro) intro.remove();
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

  // Utiles / Safety
  {id:'a37',nombre:'Extintor',emoji:'🧯',precio:200,hp:5},
  {id:'a38',nombre:'Triangulo Emergencia',emoji:'🔺',precio:150,hp:5},
  {id:'a39',nombre:'Chaleco Reflectante',emoji:'🦺',precio:150,hp:5},
  {id:'a40',nombre:'Powerbank Coche',emoji:'🔋',precio:200,hp:5},
  {id:'a41',nombre:'Soporte Movil',emoji:'📱',precio:180,hp:5},
  {id:'a42',nombre:'Dashcam',emoji:'🎥',precio:400,hp:10}
];

const EMOJI_TIENDA = [
  {id:'e1',emoji:'🦄',nombre:'Unicornio',precio:1000},
  {id:'e2',emoji:'👑',nombre:'Corona',precio:800},
  {id:'e3',emoji:'💎',nombre:'Diamante',precio:1200},
  {id:'e4',emoji:'🚀',nombre:'Cohete',precio:600},
  {id:'e5',emoji:'🔥',nombre:'Fuego',precio:500},
  {id:'e6',emoji:'⚡',nombre:'Rayo',precio:700}
];

// ===== BLOQUE 2 COMPLETO V8.6.4 - DINÁMICO + IMAGEN + EXPLICACIÓN =====

let tipsData = [];
let currentTip = 0;

let estado = {
  coins: parseInt(localStorage.getItem('gd_coins')) || 0,
  coches: JSON.parse(localStorage.getItem('gd_coches')) || ['c1'],
  accesorios: JSON.parse(localStorage.getItem('gd_accesorios')) || [],
  emojis: JSON.parse(localStorage.getItem('gd_emojis')) || [],
  test: {},
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
  sit: {}
};

// Genera estado.test y estado.sit dinámico según MODULOS
function initEstadoDinamico() {
  // FIX 1: Añade "general" manual porque no está en MODULOS_PREGUNTAS
  estado.test.general = {idx:0, aciertos:0, racha:0, puntuacion:0, current:null};

  Object.keys(MODULOS_PREGUNTAS).forEach(tema => {
    estado.test[tema] = {idx:0, aciertos:0, racha:0, puntuacion:0, current:null};
  });
  Object.keys(MODULOS_CASOS).forEach(caso => {
    estado.sit[caso] = {idx:0, aciertos:0, puntuacion:0, current:null};
  });
}

// FIX 3: NO llames cargarModulos aquí, ya se llama en bloque 1
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

let sitCategoriaActiva = 'clima';

async function init() {
  initEstadoDinamico();

  console.log(`GasDrive DGT ES V${VERSION} cargado`);
  console.log("PREGUNTAS:", Object.keys(PREGUNTAS).map(k => `${k}:${PREGUNTAS[k].length}`));
  console.log("CASOS:", Object.keys(CASOS));
  console.log("IMAGENES:", Object.keys(window.IMAGENES || {}).length);

  mostrarIntro();
  actualizarCoins();
  actualizarMensajeMotivacional();
  cargarTemario();

  // Espera a que carguen módulos antes de pintar
  if(PREGUNTAS.general && PREGUNTAS.general.length > 0) {
    cargarPregunta('general');
  }
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

function barajarArray(arr) {
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

  if(tab === 'garaje') cargarGaraje();
  if(tab === 'tienda') cargarTienda();
  if(tab === 'tips') cargarTips();
  if(tab === 'temario') cargarTemario();
  if(tab === 'test') cargarPregunta('general');
  if(tab === 'situaciones') cargarSituacion(sitCategoriaActiva);
  if(tab === 'progreso') pintarProgreso();
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
  document.querySelectorAll('#tab-situaciones.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  const titulos = {
    clima: '🌧️ CASOS REALES - CLIMA ADVERSO',
    urbano: '🏙️ CASOS REALES - URBANO',
    carretera: '🛣️ CASOS REALES - CARRETERA',
    emergencia: '🚨 CASOS REALES - EMERGENCIA'
  };
  const titEl = document.getElementById('sit-titulo');
  if(titEl) titEl.textContent = titulos[cat];
  estado.sit[cat].idx = 0;
  cargarSituacion(cat);
}

function mostrarEmoji(acierto, elemento) {
  const lista = acierto? EMOJIS_ACIERTO : EMOJIS_FALLO;
  const emoji = lista[Math.floor(Math.random() * lista.length)];
  const span = document.createElement('span');
  span.textContent = emoji;
  span.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:32px;animation:bounceIn 0.4s;pointer-events:none;z-index:999;';
  elemento.style.position = 'relative';
  elemento.appendChild(span);
  setTimeout(() => span.remove(), 600);
  if(navigator.vibrate) navigator.vibrate(acierto? [30,20,30] : 100);
}

function actualizarMensajeMotivacional() {
  const mensajes = [
    "Vas por buen camino 💪",
    "Cada fallo te hace mas fuerte 🔥",
    "El examen DGT es tuyo 🚗",
    "No pares ahora 💎",
    "Concentrate y aprobaras 👑"
  ];
  const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
  const el = document.getElementById('motivacion');
  if(el) el.textContent = msg;
}

// === EXPLICACIÓN DGT - FIX 2 ===
function pintarExplicacionTest(cat, preguntaTexto) {
  const box = document.getElementById(`test-${cat}-explicacion`);
  if (!box) return;

  const exp = buscarClave(window.EXPLICACIONES || {}, preguntaTexto);

  if (exp) {
    box.innerHTML = `<b>💡 Explicación DGT:</b> ${exp.texto}<span>Fuente: ${exp.fuente}</span>`;
    box.classList.add('visible');
  } else {
    box.classList.remove('visible');
    box.innerHTML = '';
  }
}

function limpiarExplicacionTest(cat) {
  const box = document.getElementById(`test-${cat}-explicacion`);
  if (box) {
    box.classList.remove('visible');
    box.innerHTML = '';
  }
}

// === CARGAR PREGUNTA + IMAGEN ===
function cargarPregunta(cat) {
  const s = estado.test[cat];
  if(!s) {
    console.error(`❌ estado.test[${cat}] no existe. Llama initEstadoDinamico()`);
    return;
  }

  let preguntas = PREGUNTAS[cat] || [];

  if(!preguntas || preguntas.length === 0) {
    const preguntaEl = document.getElementById(`test-${cat}-pregunta`);
    const opcionesEl = document.getElementById(`test-${cat}-opciones`);
    if(preguntaEl) preguntaEl.textContent = `No hay preguntas en ${cat}`;
    if(opcionesEl) opcionesEl.innerHTML = `<div style="color:#ff5555;font-size:13px;text-align:center;padding:20px">Revisa consola F12. El export de ${cat} está vacío.</div>`;
    return;
  }

  const pOriginal = preguntas[s.idx % preguntas.length];
  const opcionesBarajadas = barajarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesBarajadas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesBarajadas, ok: nuevoIndexCorrecto};
  s.current = p;

  document.getElementById(`test-${cat}-pregunta`).textContent = p.q;
  pintarImagenTest(cat, p.q); // Pinta imagen si existe
  limpiarExplicacionTest(cat);

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

// === RESPONDER + EXPLICACIÓN ===
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

  pintarExplicacionTest(cat, p.q);

  // REGISTRAR PROGRESO DGT
  const idPregunta = p.q.substring(0, 50);
  PROGRESO.tests[cat].total++;
  if(correcto) PROGRESO.tests[cat].aciertos++;
  if(!PROGRESO.tests[cat].unicas.includes(idPregunta)) PROGRESO.tests[cat].unicas.push(idPregunta);
  if(!correcto &&!PROGRESO.tests[cat].falladas.includes(idPregunta)) PROGRESO.tests[cat].falladas.push(idPregunta);
  guardarProgreso();

  document.getElementById(`btn-sig-test-${cat}`).disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteTest(e, cat) {
  estado.test[cat].idx++;
  cargarPregunta(cat);
}

// === SITUACIONES ===
function cargarSituacion(cat) {
  if(!cat) cat = sitCategoriaActiva;
  const s = estado.sit[cat];
  const casos = barajarArray(CASOS[cat] || []);

  if(!casos || casos.length === 0) {
    document.getElementById(`sit-${cat}-pregunta`).textContent = 'No hay casos en esta categoria';
    return;
  }

  const pOriginal = casos[s.idx % casos.length];
  const opcionesBarajadas = barajarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesBarajadas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesBarajadas, ok: nuevoIndexCorrecto};
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

  const idCaso = p.q.substring(0, 50);
  PROGRESO.casos[cat].total++;
  if(correcto) PROGRESO.casos[cat].aciertos++;
  if(!PROGRESO.casos[cat].unicas.includes(idCaso)) PROGRESO.casos[cat].unicas.push(idCaso);
  if(!correcto &&!PROGRESO.casos[cat].falladas.includes(idCaso)) PROGRESO.casos[cat].falladas.push(idCaso);
  guardarProgreso();

  document.getElementById(`btn-sig-sit-${cat}`).disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteSituacion(e, cat) {
  estado.sit[cat].idx++;
  cargarSituacion(cat);
}

// === EXAMEN ===
function iniciarExamen(e) {
  let todas = [];
  Object.values(PREGUNTAS).forEach(arr => {
    if(Array.isArray(arr)) todas.push(...arr);
  });

  if(todas.length < 30) {
    alert('Faltan preguntas. Necesitas 30 minimo.');
    return;
  }

  estado.examen.preguntas = barajarArray(todas).slice(0, 30);
  estado.examen.activa = true;
  estado.examen.index = 0;
  estado.examen.aciertos = 0;
  estado.examen.fallos = 0;
  estado.examen.categoria = 'general';

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
  const opcionesBarajadas = barajarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesBarajadas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesBarajadas, ok: nuevoIndexCorrecto};
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
  const res = document.getElementById('examen-resultado');
  res.style.display = 'block';

  PROGRESO.examenes.realizados++;
  PROGRESO.examenes.historial.push(nota);
  if(aprobado) PROGRESO.examenes.aprobados++;
  guardarProgreso();

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
      <p>Necesitas 27 aciertos minimo</p>
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

// === GARAJE ===
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

// === TIENDA ===
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
      ${!comprado? `<button class="btn-buy" onclick="comprarAccesorio('${acc.id}')">Comprar ${acc.precio}💰</button>` : '<div style="color:#2ecc71">✓ Comprado</div>'}
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
      <div style="color:#667eea">Cosmetico</div>
      ${!comprado? `<button class="btn-buy" onclick="comprarEmoji('${emoji.id}')">Comprar ${emoji.precio}💰</button>` : '<div style="color:#2ecc71">✓ Comprado</div>'}
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
  const totalAcc = estado.accesorios.length;
  const msg = document.createElement('div');
  msg.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#ff8c00,#ff2d55);color:#fff;padding:12px 24px;border-radius:12px;font-weight:bold;z-index:999;animation:slideUp 0.3s';
  msg.innerHTML = `🏎️ ¡Ya estas creando tu supercoche! ${totalAcc}/42 accesorios`;
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

// === TIPS ===
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

// === TEMARIO ===
function cargarTemario() {
  const container = document.getElementById('temario-lista');
  container.innerHTML = `
    <div class="temario-item" onclick="abrirPDF('senales')">
      <div style="font-size:40px">🚦</div>
      <div>Senales</div>
      <div style="font-size:11px;color:#999">RD 465/2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('normas')">
      <div style="font-size:40px">📋</div>
      <div>Normas Circulacion</div>
      <div style="font-size:11px;color:#999">Edicion 2024</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('auxilios')">
      <div style="font-size:40px">🚑</div>
      <div>Primeros Auxilios</div>
      <div style="font-size:11px;color:#999">Manual IX 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('mecanica')">
      <div style="font-size:40px">⚙️</div>
      <div>Mecanica</div>
      <div style="font-size:11px;color:#999">Manual VIII 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('medioambiente')">
      <div style="font-size:40px">♻️</div>
      <div>Medio Ambiente</div>
      <div style="font-size:11px;color:#999">Distintivos DGT 2025</div>
    </div>
  `;
}

function abrirPDF(id) {
  const temario = PROGRESO.temarios[id];
  if (!temario) return;
  temario.ultimaEntrada = Date.now();
  guardarProgreso();

  const rutas = {
    senales: './01_Senales_Tomo_I_RD_465_2025.pdf',
    normas: './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
    auxilios: './03_Manual_IX_Primeros_Auxilios_2025.pdf',
    mecanica: './04_Manual_VIII_Mecanica_2024.pdf',
    medioambiente: './05_Medio_Ambiente_Distintivos_DGT_2025.pdf'
  };

  const modal = document.createElement('div');
  modal.id = 'pdf-modal';
  modal.style.cssText = `
    position:fixed;top:0;left:0;right:0;bottom:0;
    background:#0a;z-index:9999;
    display:flex;flex-direction:column;
  `;
  modal.innerHTML = `
    <div style="background:#1a;padding:12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #333">
      <button onclick="cerrarPDF('${id}')" style="background:none;border:none;color:#00D9FF;font-size:16px;font-weight:700">← Volver</button>
      <div style="color:#fff;font-size:15px;font-weight:700">Temario DGT</div>
      <div style="width:60px"></div>
    </div>
    <iframe src="${rutas[id]}" style="flex:1;border:none;width:100%"></iframe>
  `;
  document.body.appendChild(modal);
}

function cerrarPDF(id) {
  const temario = PROGRESO.temarios[id];
  if (!temario ||!temario.ultimaEntrada) return;
  const tiempoSesion = Math.floor((Date.now() - temario.ultimaEntrada) / 1000);
  temario.tiempo += tiempoSesion;
  temario.porcentaje = Math.min(100, Math.floor((temario.tiempo / 10200) * 100));
  temario.ultimaEntrada = 0;
  guardarProgreso();
  const modal = document.getElementById('pdf-modal');
  if(modal) modal.remove();
  document.body.classList.remove('menu-open');
  if(document.getElementById('tab-progreso').classList.contains('active')) {
    pintarProgreso();
  }
}

// === PROGRESO - AUTOESCUELA ONLINE ===
function pintarProgreso() {
  const contenedor = document.getElementById('progreso-lista');
  if(!contenedor) return;

  const testsTotal = 630;
  let testsUnicas = 0;
  Object.values(PROGRESO.tests).forEach(t => testsUnicas += t.unicas.length);
  const pctTests = Math.min(100, Math.floor((testsUnicas / testsTotal) * 100));

  const casosTotal = 80;
  let casosUnicas = 0;
  Object.values(PROGRESO.casos).forEach(c => casosUnicas += c.unicas.length);
  const pctCasos = Math.min(100, Math.floor((casosUnicas / casosTotal) * 100));

  const ex = PROGRESO.examenes;
  let pctExamen = ex.realizados >= 3? Math.round((ex.aprobados / ex.realizados) * 100) : 0;
  if (ex.historial.slice(-3).every(n => n >= 27)) pctExamen = Math.min(100, pctExamen + 10);

  const temariosData = PROGRESO.temarios;
  const tiempoTotalTemarios =
    temariosData.senales.tiempo +
    temariosData.normas.tiempo +
    temariosData.mecanica.tiempo +
    temariosData.auxilios.tiempo +
    temariosData.medioambiente.tiempo;
  const pctTemarios = Math.min(100, Math.floor((tiempoTotalTemarios / 51000) * 100));

  const pctTotal = Math.floor((pctTests + pctCasos + pctExamen + pctTemarios) / 4);

  document.getElementById('progreso-total').textContent = pctTotal + '%';
  document.getElementById('progreso-total-bar').style.width = pctTotal + '%';

  let msg = '';
  if (pctTotal < 50) msg = 'Empieza por los Tests. Domina lo básico';
  else if (pctTotal < 70) {
    let catDebil = '', minPct = 100;
    const nombres = {general:'General', senales:'Señales', normas:'Normas', mecanica:'Mecánica', auxilios:'Auxilios', medioambiente:'Medio Ambiente'};
    Object.keys(PROGRESO.tests).forEach(k => {
      const t = PROGRESO.tests[k];
      const pct = t.total? Math.round((t.aciertos / t.total) * 100) : 0;
      if (pct < minPct && t.total >= 5) { minPct = pct; catDebil = k; }
    });
    if (catDebil && SUBTEMAS_DEBILES[catDebil]) {
      const subtemas = SUBTEMAS_DEBILES[catDebil];
      let subMsg = subtemas.find(s => minPct >= s.pct) || subtemas[0];
      msg = `⚠️ Repasa: ${subMsg.msg}`;
    } else {
      msg = `Refuerza ${nombres[catDebil] || catDebil}: ${minPct}% acierto`;
    }
  }
  else if (pctTotal < 80) msg = 'Casi listo. Aprueba 2 exámenes seguidos con 27+';
  else msg = '¡PREPARADO! Ya puedes presentarte a la DGT';
  document.getElementById('progreso-mensaje').textContent = msg;

  document.getElementById('btn-dgt-oficial').disabled = pctTotal < 80;

  const tiempoSenales = Math.floor(temariosData.senales.tiempo / 60);
  const tiempoNormas = Math.floor(temariosData.normas.tiempo / 60);
  const tiempoMecanica = Math.floor(temariosData.mecanica.tiempo / 60);
  const tiempoAuxilios = Math.floor(temariosData.auxilios.tiempo / 60);
  const tiempoMedio = Math.floor(temariosData.medioambiente.tiempo / 60);
  const tiempoTotalHoras = Math.floor(tiempoTotalTemarios / 3600);
  const tiempoTotalMin = Math.floor((tiempoTotalTemarios % 3600) / 60);

  function getMensajeTest(cat) {
    const t = PROGRESO.tests[cat];
    if (t.total < 5) return '';
    const pct = Math.round((t.aciertos / t.total) * 100);
    if (pct >= 85) return '<div style="font-size:11px;color:#2ecc71;margin-top:4px">✓ Dominado</div>';
    const subtemas = SUBTEMAS_DEBILES[cat];
    if (!subtemas) return '';
    let subMsg = subtemas.find(s => pct >= s.pct) || subtemas[0];
    return `<div style="font-size:11px;color:#FF9500;margin-top:4px">⚠️ Repasa: ${subMsg.msg}</div>`;
  }

  contenedor.innerHTML = `
    <div class="progreso-item ${pctTests >= 85? 'completo' : ''}">
      <div class="progreso-titulo"><span>📝 Tests Teóricos</span><span class="progreso-porcentaje">${pctTests}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pctTests}%"></div></div>
      <div style="font-size:11px;color:#999;margin-top:4px">${testsUnicas}/${testsTotal} preguntas únicas</div>
      ${getMensajeTest('general')}
      ${getMensajeTest('senales')}
      ${getMensajeTest('normas')}
      ${getMensajeTest('mecanica')}
      ${getMensajeTest('auxilios')}
      ${getMensajeTest('medioambiente')}
    </div>
    <div class="progreso-item ${pctCasos >= 85? 'completo' : ''}">
      <div class="progreso-titulo"><span>🚦 Casos Prácticos</span><span class="progreso-porcentaje">${pctCasos}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pctCasos}%"></div></div>
      <div style="font-size:11px;color:#999;margin-top:4px">${casosUnicas}/${casosTotal} casos únicos</div>
    </div>
    <div class="progreso-item ${pctExamen >= 80? 'completo' : ''}">
      <div class="progreso-titulo"><span>📋 Exámenes Reales</span><span class="progreso-porcentaje">${pctExamen}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pctExamen}%"></div></div>
      <div style="font-size:11px;color:#999;margin-top:4px">Aprobados: ${ex.aprobados}/${ex.realizados}</div>
      ${ex.realizados < 3? '<div style="font-size:11px;color:#FF9500;margin-top:4px">⚠️ Haz 3 exámenes mínimo</div>' : ''}
    </div>
    <div class="progreso-item ${pctTemarios >= 80? 'completo' : ''}">
      <div class="progreso-titulo"><span>📖 Temarios Estudiados</span><span class="progreso-porcentaje">${pctTemarios}%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pctTemarios}%"></div></div>
      <p style="font-size:11px;color:#666;margin:4px 0 0">
        Total: ${tiempoTotalHoras}h ${tiempoTotalMin}min / 14h 10min
      </p>
      <p style="font-size:10px;color:#555;margin:2px 0">
        Señ: ${tiempoSenales}m | Nor: ${tiempoNormas}m | Mec: ${tiempoMecanica}m | Aux: ${tiempoAuxilios}m | Med: ${tiempoMedio}m
      </p>
    </div>
  `;
}

function irExamenDGT() {
  const total = parseInt(document.getElementById('progreso-total').textContent);
  if (total >= 80) {
    if (confirm('¡Estás preparado! ¿Quieres ir a la web oficial de la DGT para reservar tu examen?')) {
      window.open(LINK_DGT_OFICIAL, '_blank');
    }
  } else {
    alert('Necesitas llegar al 80% para presentarte. ¡Sigue practicando!');
  }
}

if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
.then(reg => console.log('SW registrado'))
.catch(err => console.log('SW error:', err));
  });
}
  





  




 
 



  
