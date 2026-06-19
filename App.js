// GASDRIVE DGT V8.8.9 ESP - 630 PREGUNTAS DGT 2026
const VERSION = "8.8.9";

// COMBO DOPAMINA ACTUALIZADO
const EMOJIS_ACIERTO = ['🎉','💪','🔥','🚀','👏','💎','⚡','✅'];
const EMOJIS_FALLO = ['😅','💥','🤔','💔','😬','⚠️'];
const LINK_DGT_OFICIAL = 'https://sede.dgt.gob.es/es/permisos-de-conducir/';

// SUBTEMAS DÉBILES PARA PROGRESO
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

// RUTAS DE ARCHIVOS.JS CON EXPORT CONST
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

// DATOS GLOBALES PARA CARGAR DESDE /data/
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
window.EXPLICACIONES = {};
window.SENALES_SVG = {};
let SVG_CARGADOS = false;

// TEMARIO PRIMERO
function cargarTemarioHTML() {
  const container = document.getElementById('temario-lista');
  if(!container) return;
  container.innerHTML = `
    <div class="temario-item" onclick="abrirPDF('senales')">
      <div style="font-size:40px">🚦</div><div>Señales</div><div style="font-size:11px;color:#999">RD 465/2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('normas')">
      <div style="font-size:40px">📋</div><div>Normas Circulación</div><div style="font-size:11px;color:#999">Edición 2024</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('auxilios')">
      <div style="font-size:40px">🚑</div><div>Primeros Auxilios</div><div style="font-size:11px;color:#999">Manual IX 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('mecanica')">
      <div style="font-size:40px">⚙️</div><div>Mecánica</div><div style="font-size:11px;color:#999">Manual VIII 2024</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('medioambiente')">
      <div style="font-size:40px">♻️</div><div>Medio Ambiente</div><div style="font-size:11px;color:#999">Distintivos DGT 2025</div>
    </div>
  `;
}

function mostrarIntro(){
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 0 10px">GasDrive DGT ESP 2026 v${VERSION}</h1>
      <p style="font-size:18px;opacity:0.8;margin:0 0 10px">Aprende el carnet en 15 min al día</p>
      <p style="font-size:16px;opacity:0.9;margin:0 0 30px">📚 Temarios oficiales DGT para estudiar cuando quieras</p>
      <div style="text-align:left;font-size:16px;margin-bottom:40px;line-height:2">
        <div>💰 Gana coins respondiendo bien</div>
        <div>🏎️ Compra supercotxes en el Garaje</div>
        <div>📚 630 preguntas DGT reales</div>
        <div>📖 Temarios completos para repasar</div>
      </div>
      <button onclick="tancarIntro()" style="background:linear-gradient(135deg,#ff8c00,#ff2d55);border:none;color:#fff;padding:16px 48px;border-radius:12px;font-size:18px;font-weight:bold;cursor:pointer">EMPEZAR</button>
    </div>
  `);
}

function tancarIntro(){
  document.getElementById('intro-screen').remove();
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.tab-btn[onclick*="temario"]').classList.add('active');
  document.getElementById('tab-temario').classList.add('active');
  cargarModulos().then(() => {
    cargarTemarioHTML();
    init();
  });
}

// CARGADOR DE ARCHIVOS.JS CON EXPORT CONST DESDE /data/
async function cargarModulos() {
  console.log(`🚀 V${VERSION} - Cargando datos desde /data/...`);
  const t0 = performance.now();

  await Promise.all([
   ...Object.entries(MODULOS_PREGUNTAS).map(async ([tema, config]) => {
      try {
        const mod = await import(`./data/${config.archivo}`);
        PREGUNTAS[tema] = mod[config.export] || [];
        console.log(`✅ ${tema}: ${PREGUNTAS[tema].length} preguntas`);
      } catch (e) {
        console.error(`❌ Error cargando ${config.archivo}`, e);
        PREGUNTAS[tema] = [];
      }
    }),
    import(`./data/preguntas-situaciones.js`).then(mod => {
      const SIT = mod.SITUACIONES;
      Object.entries(MODULOS_CASOS).forEach(([caso, config]) => {
        CASOS[config.clave] = SIT[config.clave] || [];
        console.log(`✅ ${caso}: ${CASOS[config.clave].length} casos`);
      });
    }),
    import(`./data/senales-svg.js`).then(mod => {
      window.SENALES_SVG = mod.SENALES_SVG || {};
      SVG_CARGADOS = true;
      console.log(`✅ SVG: ${Object.keys(window.SENALES_SVG).length} señales`);
    }),
    import(`./data/explicaciones.js`).then(mod => {
      window.EXPLICACIONES = mod.EXPLICACIONES || {};
      console.log(`✅ Explicaciones cargadas`);
    })
  ]);

  // Crear general juntando todas
  PREGUNTAS.general = [];
  Object.values(PREGUNTAS).forEach(arr => {
    if(Array.isArray(arr)) PREGUNTAS.general.push(...arr);
  });
  console.log(`✅ DATOS LISTOS en ${Math.round(performance.now() - t0)}ms. Total general: ${PREGUNTAS.general.length}`);
}

function pintarImagenTest(cat, preguntaTexto) {
  const imgCont = document.getElementById(`test-${cat}-imagen`);
  if (!imgCont) return;
  const match = preguntaTexto.match(/\b([rsp]-\d+[a-z]?)\b/i);
  const codigo = match? match[1].toLowerCase() : null;
  if (!codigo ||!SVG_CARGADOS) {
    imgCont.innerHTML = codigo? `<div style="text-align:center;color:#999">Señal: ${codigo.toUpperCase()}</div>` : '';
    return;
  }
  const svg = window.SENALES_SVG[codigo];
  if (svg) {
    imgCont.innerHTML = svg;
    const svgEl = imgCont.querySelector('svg');
    if (svgEl) {
      svgEl.setAttribute('width', '140');
      svgEl.setAttribute('height', '140');
      svgEl.style.display = 'block';
      svgEl.style.margin = '0 auto';
    }
  } else {
    imgCont.innerHTML = `<div style="text-align:center;color:#999">Señal: ${codigo.toUpperCase()}</div>`;
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


// ===== BLOQUE 2: LÓGICA + ACTUALIZACIONES V8.8.9 FINAL =====

// 0. DEFINIR PROGRESO SI NO EXISTE - ESTO EVITA QUE PETE LA APP
if(typeof PROGRESO === 'undefined') {
  window.PROGRESO = {
    temarios: {
      senales: {tiempo:0,porcentaje:0,ultimaEntrada:0},
      normas: {tiempo:0,porcentaje:0,ultimaEntrada:0},
      auxilios: {tiempo:0,porcentaje:0,ultimaEntrada:0},
      mecanica: {tiempo:0,porcentaje:0,ultimaEntrada:0},
      medioambiente: {tiempo:0,porcentaje:0,ultimaEntrada:0}
    },
    tests: {
      general:{total:0,aciertos:0,unicas:[],falladas:[]},
      senales:{total:0,aciertos:0,unicas:[],falladas:[]},
      normas:{total:0,aciertos:0,unicas:[],falladas:[]},
      mecanica:{total:0,aciertos:0,unicas:[],falladas:[]},
      auxilios:{total:0,aciertos:0,unicas:[],falladas:[]},
      medioambiente:{total:0,aciertos:0,unicas:[],falladas:[]}
    },
    examenes: {realizados:0,aprobados:0,historial:[]}
  };
}

let tipsData = [];
let currentTip = 0;

let estado = {
  coins: parseInt(localStorage.getItem('gd_coins')) || 0,
  coches: JSON.parse(localStorage.getItem('gd_coches')) || ['c1'],
  accesorios: JSON.parse(localStorage.getItem('gd_accesorios')) || [],
  emojis: JSON.parse(localStorage.getItem('gd_emojis')) || [],
  test: {
    general: {idx:0,aciertos:0,racha:0,puntuacion:0,current:null},
    senales: {idx:0,aciertos:0,racha:0,puntuacion:0,current:null},
    normas: {idx:0,aciertos:0,racha:0,puntuacion:0,current:null},
    mecanica: {idx:0,aciertos:0,racha:0,puntuacion:0,current:null},
    auxilios: {idx:0,aciertos:0,racha:0,puntuacion:0,current:null},
    medioambiente: {idx:0,aciertos:0,racha:0,puntuacion:0,current:null}
  },
  examen: {
    activo: false,
    preguntas: [],
    index: 0,
    aciertos: 0,
    fallos: 0,
    timer: null,
    tiempo: 1800,
    categoria: 'general'
  },
  situacion: {
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

let situacionCategoriaActiva = 'clima';

// 8.8.9: init ya NO carga tests. Espera a que carguen los módulos del bloque 1
function init() {
  console.log(`GasDrive 8.8.9 ESP cargado`);
  actualizarCoins();
  actualizarMensajeMotivacional();
  cargarTemarioHTML(); // NUEVO: pinta los 5 temarios al iniciar
  activarTabs(); // NUEVO: activa todos los botones del menú
}

function guardar() {
  localStorage.setItem('gd_coins', estado.coins);
  localStorage.setItem('gd_coches', JSON.stringify(estado.coches));
  localStorage.setItem('gd_accesorios', JSON.stringify(estado.accesorios));
  localStorage.setItem('gd_emojis', JSON.stringify(estado.emojis));
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
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

// 8.8.9: ACTIVAR TABS SIN closest() - ARREGLO CLAVE PARA QUE FUNCIONEN LOS BOTONES
function activarTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tab = this.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + tab).classList.add('active');
      this.classList.add('active');

      if(tab === 'temario') cargarTemarioHTML();
      if(tab === 'test') cargarPregunta('general');
      if(tab === 'situaciones') cargarSituacion(situacionCategoriaActiva);
      if(tab === 'garaje') cargarGaraje();
      if(tab === 'tienda') cargarTienda();
      if(tab === 'tips') cargarTips();
      if(tab === 'progreso') pintarProgreso();
    });
  });
}

// 8.8.9: TEMARIO es el primer tab - MANTENER POR COMPATIBILIDAD
function cambiarTab(e, tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  e.currentTarget.classList.add('active');

  if(tab === 'temario') cargarTemarioHTML();
  if(tab === 'test') cargarPregunta('general');
  if(tab === 'situaciones') cargarSituacion(situacionCategoriaActiva);
  if(tab === 'garaje') cargarGaraje();
  if(tab === 'tienda') cargarTienda();
  if(tab === 'tips') cargarTips();
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
  situacionCategoriaActiva = cat;
  document.querySelectorAll('#tab-situaciones.category-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  const titulos = {
    clima: '🌧️ CASOS REALES - CLIMA ADVERSO',
    urbano: '🏙️ CASOS REALES - URBANO',
    carretera: '🛣️ CASOS REALES - CARRETERA',
    emergencia: '🚨 CASOS REALES - EMERGENCIA'
  };
  document.getElementById('sit-titulo').textContent = titulos[cat];
  estado.situacion[cat].idx = 0;
  cargarSituacion(cat);
}

// 8.8.9: Pintar los 5 temarios en grid con rutas exactas
function cargarTemarioHTML() {
  const cont = document.getElementById('temario-lista');
  if(!cont) return;

  const temarios = [
    {id:'senales', emoji:'🚦', nombre:'Señales', desc:'Tomo I RD 465/2025'},
    {id:'normas', emoji:'📖', nombre:'Normas Circulación', desc:'Tomo II Edición 2024'},
    {id:'auxilios', emoji:'🚑', nombre:'Primeros Auxilios', desc:'Manual IX 2025'},
    {id:'mecanica', emoji:'🔧', nombre:'Mecánica', desc:'Manual VIII 2024'},
    {id:'medioambiente', emoji:'🌱', nombre:'Medio Ambiente', desc:'Distintivos DGT 2025'}
  ];

  cont.innerHTML = '';
  temarios.forEach(t => {
    const pct = PROGRESO.temarios[t.id]?.porcentaje || 0;
    const div = document.createElement('div');
    div.className = 'temario-item';
    div.onclick = () => abrirPDF(t.id);
    div.innerHTML = `
      <div style="font-size:40px;margin-bottom:8px">${t.emoji}</div>
      <div style="font-weight:700;font-size:14px;margin-bottom:4px">${t.nombre}</div>
      <div style="color:#999;font-size:11px;margin-bottom:8px">${t.desc}</div>
      <div style="background:#333;height:6px;border-radius:3px;overflow:hidden">
        <div style="background:#00D9FF;height:100%;width:${pct}%"></div>
      </div>
      <div style="font-size:11px;color:#00D9FF;margin-top:4px">${pct}% leído</div>
    `;
    cont.appendChild(div);
  });
}

// 8.8.9: Guardar progreso por tema y pregunta
function guardarProgreso(tema, acierto, idPregunta) {
  PROGRESO.tests[tema].total++;
  if(acierto) PROGRESO.tests[tema].aciertos++;
  if(!PROGRESO.tests[tema].unicas.includes(idPregunta)) {
    PROGRESO.tests[tema].unicas.push(idPregunta);
  }
  if(!acierto &&!PROGRESO.tests[tema].falladas.includes(idPregunta)) {
    PROGRESO.tests[tema].falladas.push(idPregunta);
  }
  guardar();
}

// 8.8.9: Abrir PDF con timer para medir progreso temario
function abrirPDF(id) {
  const temario = PROGRESO.temarios[id];
  if (temario) temario.ultimaEntrada = Date.now();
  guardar();

  const rutas = {
    senales: './01_Senales_Tomo_I_RD_465_2025.pdf',
    normas: './02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf',
    auxilios: './03_Manual_IX_Primers_Auxilios_2025.pdf',
    mecanica: './04_Manual_VIII_Mecanica_2024.pdf',
    medioambiente: './05_Medio_Ambiente_Distintivos_DGT_2025.pdf'
  };

  const modal = document.createElement('div');
  modal.id = 'pdf-modal';
  modal.style.cssText = `position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0a0a;z-index:9999;display:flex;flex-direction:column;`;
  modal.innerHTML = `
    <div style="background:#1a1a1a;padding:12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #333">
      <button onclick="cerrarPDF()" style="background:none;border:none;color:#00D9FF;font-size:16px;font-weight:700">← Volver</button>
      <div style="color:#fff;font-size:15px;font-weight:700">Temario DGT</div>
      <div style="width:60px"></div>
    </div>
    <iframe src="${rutas[id]}" style="flex:1;border:none;width:100%"></iframe>
  `;
  document.body.appendChild(modal);
}

function cerrarPDF() {
  Object.keys(PROGRESO.temarios).forEach(id => {
    const temario = PROGRESO.temarios[id];
    if (temario.ultimaEntrada) {
      const tiempoSesion = Math.floor((Date.now() - temario.ultimaEntrada) / 1000);
      temario.tiempo += tiempoSesion;
      temario.porcentaje = Math.min(100, Math.floor((temario.tiempo / 10200) * 100));
      temario.ultimaEntrada = 0;
    }
  });
  document.getElementById('pdf-modal')?.remove();
  if(document.getElementById('tab-progreso')?.classList.contains('active')) {
    pintarProgreso();
  }
}

// 8.8.9: Cargar pregunta con imagen SVG + barajado
function cargarPregunta(categoria) {
  const s = estado.test[categoria];
  const preguntas = PREGUNTAS[categoria] || [];
  if(!preguntas || preguntas.length === 0) return;

  const pOriginal = preguntas[s.idx % preguntas.length];
  const opcionesBarajadas = barajarArray([pOriginal.a, pOriginal.b, pOriginal.c]);
  const p = {...pOriginal, a: opcionesBarajadas};
  s.current = p;

  document.getElementById(`test-${categoria}-pregunta`).textContent = p.pregunta;
  document.getElementById(`test-${categoria}-aciertos`).textContent = s.aciertos;
  document.getElementById(`test-${categoria}-racha`).textContent = s.racha;

  pintarImagenTest(categoria, p.pregunta);

  const cont = document.getElementById(`test-${categoria}-opciones`);
  cont.innerHTML = '';
  p.a.forEach((texto, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = texto;
    div.onclick = function() { responderTest(categoria, texto, this); };
    cont.appendChild(div);
  });
}

// 8.8.9: Coins SOLO si aciertas + guardar progreso
function responderTest(categoria, respuesta, elemento) {
  const s = estado.test[categoria];
  const p = s.current;
  const cont = document.getElementById(`test-${categoria}-opciones`);
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  cont.querySelectorAll('.opcion').forEach(o => o.onclick = null);
  const acierto = respuesta === p.correcta;
  const idPregunta = `${categoria}-${s.idx}`;

  if(acierto) {
    elemento.classList.add('correcta');
    s.aciertos++;
    s.racha++;
    s.puntuacion += 10 + (s.racha * 2);
    estado.coins += 5;
    mostrarEmoji(true, elemento);
  } else {
    elemento.classList.add('incorrecta');
    cont.querySelectorAll('.opcion').forEach(o => {
      if(o.textContent === p.correcta) o.classList.add('correcta');
    });
    mostrarEmoji(false, elemento);
    s.racha = 0;
  }

  guardarProgreso(categoria, acierto, idPregunta);
  actualizarCoins();
}

function siguienteTest(e, categoria) {
  estado.test[categoria].idx++;
  cargarPregunta(categoria);
}

// 8.8.9: SITUACIONES con imágenes también
function cargarSituacion(cat) {
  if(!cat) cat = situacionCategoriaActiva;
  const s = estado.situacion[cat];
  const casos = CASOS[cat] || [];
  if(!casos || casos.length === 0) return;

  const pOriginal = casos[s.idx % casos.length];
  const opcionesBarajadas = barajarArray([pOriginal.a, pOriginal.b, pOriginal.c]);
  const p = {...pOriginal, a: opcionesBarajadas};
  s.current = p;

  document.getElementById(`situacion-${cat}-pregunta`).textContent = p.pregunta;
  document.getElementById(`situacion-${cat}-aciertos`).textContent = s.aciertos;
  pintarImagenTest(`situacion-${cat}`, p.pregunta);

  const cont = document.getElementById(`situacion-${cat}-opciones`);
  cont.innerHTML = '';
  p.a.forEach((texto, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = texto;
    div.onclick = function() { responderSituacion(cat, texto, this); };
    cont.appendChild(div);
  });
}

function responderSituacion(cat, respuesta, elemento) {
  const s = estado.situacion[cat];
  const p = s.current;
  const cont = document.getElementById(`situacion-${cat}-opciones`);
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  cont.querySelectorAll('.opcion').forEach(o => o.onclick = null);
  const acierto = respuesta === p.correcta;

  if(acierto) {
    elemento.classList.add('correcta');
    s.aciertos++;
    s.puntuacion += 15;
    estado.coins += 10;
    mostrarEmoji(true, elemento);
  } else {
    elemento.classList.add('incorrecta');
    cont.querySelectorAll('.opcion').forEach(o => {
      if(o.textContent === p.correcta) o.classList.add('correcta');
    });
    mostrarEmoji(false, elemento);
  }
  actualizarCoins();
  guardar();
}

function siguienteSituacion(e, cat) {
  estado.situacion[cat].idx++;
  cargarSituacion(cat);
}

// 8.8.9: EXAMEN 30 preguntas, mínimo 27 para aprobar
function iniciarExamen(e) {
  const todas = PREGUNTAS.general || [];
  if(todas.length < 30) {
    alert('Faltan preguntas. Necesitas 30 mínimo.');
    return;
  }
  estado.examen.preguntas = barajarArray(todas).slice(0, 30);
  estado.examen.activo = true;
  estado.examen.index = 0;
  estado.examen.aciertos = 0;
  estado.examen.fallos = 0;
  estado.examen.tiempo = 1800;

  document.getElementById('btn-iniciar-examen').style.display = 'none';
  document.getElementById('btn-siguiente-examen').style.display = 'block';
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
  const opcionesBarajadas = barajarArray([pOriginal.a, pOriginal.b, pOriginal.c]);
  const p = {...pOriginal, a: opcionesBarajadas};
  estado.examen.preguntas[estado.examen.index] = p;

  document.getElementById('examen-num').textContent = estado.examen.index + 1;
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
  document.getElementById('examen-progreso').style.width = `${(estado.examen.index/30)*100}%`;
  document.getElementById('examen-pregunta').textContent = p.pregunta;
  pintarImagenTest('examen', p.pregunta);

  const cont = document.getElementById('examen-opciones');
  cont.innerHTML = '';
  document.getElementById('btn-siguiente-examen').disabled = true;
  p.a.forEach((texto, i) => {
    const div = document.createElement('div');
    div.className = 'opcion';
    div.textContent = texto;
    div.onclick = function() { responderExamen(texto, this); };
    cont.appendChild(div);
  });
}

function responderExamen(respuesta, elemento) {
  const p = estado.examen.preguntas[estado.examen.index];
  const cont = document.getElementById('examen-opciones');
  if(cont.querySelector('.correcta') || cont.querySelector('.incorrecta')) return;

  cont.querySelectorAll('.opcion').forEach(o => o.onclick = null);
  const acierto = respuesta === p.correcta;

  if(acierto) {
    elemento.classList.add('correcta');
    estado.examen.aciertos++;
    estado.coins += 20;
    mostrarEmoji(true, elemento);
  } else {
    elemento.classList.add('incorrecta');
    cont.querySelectorAll('.opcion').forEach(o => {
      if(o.textContent === p.correcta) o.classList.add('correcta');
    });
    estado.examen.fallos++;
    mostrarEmoji(false, elemento);
  }
  document.getElementById('btn-siguiente-examen').disabled = false;
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

// 8.8.9: Guardar historial de exámenes
function finalizarExamen() {
  clearInterval(estado.examen.timer);
  estado.examen.activo = false;
  const nota = estado.examen.aciertos;
  const aprobado = nota >= 27;

  PROGRESO.examenes.realizados++;
  if(aprobado) PROGRESO.examenes.aprobados++;
  PROGRESO.examenes.historial.unshift({
    fecha: new Date().toLocaleDateString('es-ES'),
    aciertos: nota,
    porcentaje: Math.round((nota/30)*100),
    aprobado: aprobado
  });
  if(PROGRESO.examenes.historial.length > 10) PROGRESO.examenes.historial.pop();
  guardar();

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
}

function reiniciarExamen() {
  document.getElementById('examen-resultado').style.display = 'none';
  document.getElementById('btn-iniciar-examen').style.display = 'block';
  document.getElementById('btn-siguiente-examen').style.display = 'none';
  document.getElementById('examen-pregunta').textContent = "Pulsa Iniciar Examen";
  document.getElementById('examen-opciones').innerHTML = '';
  document.getElementById('examen-num').textContent = '0';
  document.getElementById('examen-aciertos').textContent = '0';
  document.getElementById('examen-progreso').style.width = '0%';
  document.getElementById('examen-timer').textContent = '30:00';
}

// 8.8.9: Pintar pantalla progreso con subtemas débiles
function pintarProgreso() {
  const cont = document.getElementById('progreso-contenido');
  if(!cont) return;

  let html = `<div style="background:#1a1a1a;padding:20px;border-radius:12px;margin-bottom:15px">
    <div style="font-size:18px;font-weight:700;margin-bottom:10px">📊 Estadísticas Generales</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;text-align:center">
      <div><div style="font-size:24px;font-weight:700;color:#00D9FF">${PROGRESO.examenes.realizados}</div><div style="font-size:12px;color:#999">Exámenes</div></div>
      <div><div style="font-size:24px;font-weight:700;color:#00ff00">${PROGRESO.examenes.aprobados}</div><div style="font-size:12px;color:#999">Aprobados</div></div>
    </div>
  </div>`;

  html += `<div style="background:#1a1a1a;padding:20px;border-radius:12px;margin-bottom:15px">
    <div style="font-size:18px;font-weight:700;margin-bottom:15px">📚 Progreso por Tema</div>`;

  Object.keys(MODULOS_PREGUNTAS).forEach(tema => {
    const p = PROGRESO.tests[tema];
    const pct = p.total > 0? Math.round((p.aciertos / p.total) * 100) : 0;
    const barra = `<div style="background:#333;height:8px;border-radius:4px;overflow:hidden"><div style="background:#00D9FF;height:100%;width:${pct}%"></div></div>`;
    html += `
      <div style="margin-bottom:15px">
        <div style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span style="font-weight:700">${tema.charAt(0).toUpperCase() + tema.slice(1)}</span>
          <span style="color:#00D9FF">${p.aciertos}/${p.total} - ${pct}%</span>
        </div>
        ${barra}
      </div>
    `;
  });
  html += `</div>`;

  html += `<div style="background:#1a1a1a;padding:20px;border-radius:12px;margin-bottom:15px">
    <div style="font-size:18px;font-weight:700;margin-bottom:15px">🎯 Subtemas a Repasar</div>`;
  Object.keys(MODULOS_PREGUNTAS).forEach(tema => {
    const p = PROGRESO.tests[tema];
    const pct = p.total > 0? Math.round((p.aciertos / p.total) * 100) : 0;
    const debil = SUBTEMAS_DEBILES[tema].find(s => pct <= s.pct);
    if(debil) {
      html += `<div style="background:#2a2a2a;padding:10px;border-radius:8px;margin-bottom:8px;border-left:3px solid #ff8c00">
        <div style="font-weight:700;font-size:14px">${tema.toUpperCase()}</div>
        <div style="font-size:12px;color:#ccc">${debil.msg}</div>
      </div>`;
    }
  });
  html += `</div>`;
  cont.innerHTML = html;
}

// GARAJE, TIENDA, TIPS: tu código traducido igual
function cargarGaraje() {
  const cont = document.getElementById('garaje-lista');
  cont.innerHTML = '';
  let hpTotal = 90;
  estado.accesorios.forEach(id => {
    const acc = ACCESORIOS.find(a => a.id === id);
    if(acc) hpTotal += acc.hp;
  });
  document.getElementById('garaje-score').textContent = `🏎️ ${hpTotal} CV`;
  COCHES.forEach(coche => {
    const desbloqueado = estado.coches.includes(coche.id);
    const div = document.createElement('div');
    div.className = 'garaje-coche' + (desbloqueado? '' : ' bloqueado');
    div.innerHTML = `
      <div style="font-size:40px; filter:${coche.color}">${coche.emoji}</div>
      <div>${coche.nombre}</div>
      <div style="color:#667eea">${coche.cv} CV</div>
      ${!desbloqueado? `<button class="btn-comprar" onclick="comprarCoche('${coche.id}')">Comprar ${coche.precio}💰</button>` : '<div style="color:#2ecc71">✓ Propietario</div>'}
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
    div.className = 'emoji-item' + (comprado? ' bloqueado' : '');
    div.innerHTML = `
      <div style="font-size:40px">${acc.emoji}</div>
      <div>${acc.nombre}</div>
      <div style="color:#667eea">+${acc.hp} CV</div>
      ${!comprado? `<button class="btn-comprar" onclick="comprarAccesorios('${acc.id}')">Comprar ${acc.precio}💰</button>` : '<div style="color:#2ecc71">✓ Comprado</div>'}
    `;
    cont.appendChild(div);
  });
  EMOJI_TIENDA.forEach(emoji => {
    const comprado = estado.emojis.includes(emoji.id);
    const div = document.createElement('div');
    div.className = 'emoji-item' + (comprado? ' bloqueado' : '');
    div.innerHTML = `
      <div style="font-size:40px">${emoji.emoji}</div>
      <div>${emoji.nombre}</div>
      <div style="color:#667eea">Cosmético</div>
      ${!comprado? `<button class="btn-comprar" onclick="comprarEmoji('${emoji.id}')">Comprar ${emoji.precio}💰</button>` : '<div style="color:#2ecc71">✓ Comprado</div>'}
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

 
 


    

  





  




 
 



  
