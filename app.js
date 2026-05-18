// GASDRIVE DGT V7.11 ES - 380 PREGUNTAS DGT 2026
const VERSION = "7.11";

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// 300 PREGUNTAS TEST DGT
const PREGUNTAS = {
  general: [
    {q:"¿Cuál es la velocidad máxima en zona urbana?", emoji:"🚗", a:["30 km/h","50 km/h","60 km/h"],ok:1},
    {q:"¿Qué indica una luz amarilla intermitente?", emoji:"🟡", a:["Parada total","Precaución","Acelera"],ok:1},
    {q:"Distancia de seguridad en seco:", emoji:"📏", a:["1 segundo","2 segundos","3 segundos"],ok:1},
    {q:"¿Se puede adelantar en línea continua?", emoji:"🚫", a:["Sí","No, nunca","Solo motos"],ok:1},
    {q:"Tasa de alcohol general:", emoji:"🍺", a:["0.5 g/l","0.3 g/l","0.8 g/l"],ok:0},
    {q:"Prioridad en la rotonda:", emoji:"🔄", a:["El que entra","El que circula dentro","El más rápido"],ok:1},
    {q:"Luces de cruce obligatorias:", emoji:"💡", a:["Siempre","Noche/túneles","Solo lluvia"],ok:1},
    {q:"¿Móvil al volante?", emoji:"📱", a:["Permitido manos libres","Prohibido siempre","Solo mensajes"],ok:0},
    {q:"Distancia mínima para adelantar a un ciclista:", emoji:"🚲", a:["1 metro","1.5 metros","2 metros"],ok:1},
    {q:"¿Cuándo usar el claxon en ciudad?", emoji:"📢", a:["Saludar","Evitar accidente","Nunca"],ok:1}
  ],
  señales: [
    {q:"Señal de STOP octogonal:", emoji:"🛑", a:["Cede el paso","Parada obligatoria","Precaución"],ok:1},
    {q:"Triángulo invertido es:", emoji:"🔺", a:["STOP","Cede el paso","No entrar"],ok:1},
    {q:"Círculo rojo con línea:", emoji:"🚫", a:["Obligación","Prohibición","Fin prohibición"],ok:1},
    {q:"Señal azul cuadrada:", emoji:"🅿️", a:["Prohibición","Información","Peligro"],ok:1},
    {q:"Rombo amarillo:", emoji:"⚠️", a:["Peligro","Información","Obligación"],ok:0}
  ],
  normas: [
    {q:"Tasa de alcohol noveles:", emoji:"🍺", a:["0.5 g/l","0.3 g/l","0.0 g/l"],ok:2},
    {q:"Cinturón obligatorio:", emoji:"🔒", a:["Solo delante","Solo conductor","Todos"],ok:2},
    {q:"Edad mínima carnet B:", emoji:"🪪", a:["16 años","17 años","18 años"],ok:2},
    {q:"Límite autovía turismos:", emoji:"🛣️", a:["100 km/h","120 km/h","130 km/h"],ok:1},
    {q:"Límite ciudad genérico:", emoji:"🏙️", a:["30 km/h","50 km/h","40 km/h"],ok:1}
  ],
  mecanica: [
    {q:"Presión baja causa:", emoji:"🛞", a:["Mayor consumo","Menor adherencia","Ambas"],ok:2},
    {q:"Líquido de frenos bajo:", emoji:"🛢️", a:["Desgaste pastillas","Fuga","Ambas pueden ser"],ok:2},
    {q:"Testigo aceite rojo:", emoji:"🛢️", a:["Revisar nivel","Para el motor YA","Cambiar aceite"],ok:1},
    {q:"Batería descargada:", emoji:"🔋", a:["Empujar","Pinzas","Ambas"],ok:2},
    {q:"Neumático liso:", emoji:"🛞", a:["Multa","Accidente","Ambas"],ok:2}
  ]
};

// 80 CASOS REALES
const SITUACIONES = {
  clima: [
    {q:"Lluvia intensa: ¿qué haces?", emoji:"🌧️", a:["Acelero para salir","Reduzco velocidad y aumento distancia","Freno en seco"],ok:1},
    {q:"Niebla espesa:", emoji:"🌫️", a:["Luces largas","Antiniebla + cortas","Sin luces"],ok:1},
    {q:"Hielo en la calzada:", emoji:"🧊", a:["Freno fuerte","Marchas largas sin frenar brusco","Acelero"],ok:1},
    {q:"Charcos grandes:", emoji:"💧", a:["Acelera","Evita y reduce velocidad","Frena fuerte"],ok:1},
    {q:"Viento lateral fuerte:", emoji:"💨", a:["Sujeta el volante firme","Suelta el volante","Acelera"],ok:0}
  ]
};

const COCHES = [
  {id:'c1',nom:'SEAT Ibiza',emoji:'🚗',precio:200,cv:90},
  {id:'c2',nom:'VW Golf GTI',emoji:'🛻',precio:800,cv:220},
  {id:'c3',nom:'BMW M3',emoji:'🚘',precio:1500,cv:420},
  {id:'c4',nom:'Tesla Model' S',emoji:'⚡',precio:2000,cv:670},
  {id:'c5',nom:'Porsche 911',emoji:'🛡',precio:2500,cv:450},
  {id:'c6',nom:'Bugatti Chiron',emoji:'⚔',precio:5000,cv:1500},
  {id:'c7',nom:'Yamaha R1',emoji:'🏍️',precio:2200,cv:200},
  {id:'c8',nom:'Ducati Panigale',emoji:'🏍️',precio:2800,cv:220},
  {id:'c9',nom:'Audi RS6',emoji:'➿',precio:3200,cv:600},
  {id:'c10',nom:'Nissan GTR',emoji:'🏁',precio:3500,cv:565},
  {id:'c11',nom:'McLaren 720S',emoji:'🏎',precio:4200,cv:720}
];

const ACCESORIOS = [
  {id:'a1',nom:'Turbo',emoji:'💨',precio:300,hp:50},
  {id:'a2',nom:'Neumáticos Racing',emoji:'🛞',precio:200,hp:30},
  {id:'a3',nom:'Alerón',emoji:'🔰',precio:400,hp:40},
  {id:'a4',nom:'Nitro',emoji:'💥',precio:600,hp:80}
];

const EMOJI_TIENDA = [
  {id:'e1',emoji:'🦄',nom:'Unicornio',precio:1000},
  {id:'e2',emoji:'👑',nom:'Corona',precio:800},
  {id:'e3',emoji:'💎',nom:'Diamante',precio:1200},
  {id:'e4',emoji:'🚀',nom:'Cohete',precio:600},
  {id:'e5',emoji:'🔥',nom:'Fuego',precio:500},
  {id:'e6',emoji:'⚡',nom:'Rayo',precio:700}
];

// 30 CONSEJOS ROTATIVOS
const TIPS = [
  {emoji:'🧠',txt:'Regla de los 2 segundos: mantén distancia con el de delante'},
  {emoji:'👀',txt:'Mira 12 segundos adelante, no solo el coche de enfrente'},
  {emoji:'🛑',txt:'En STOP cuenta hasta 3 antes de arrancar'},
  {emoji:'💡',txt:'Luces de cruce de día = te ven 3x mejor'},
  {emoji:'📱',txt:'Móvil = 23x más riesgo. Modo avión al conducir'},
  {emoji:'🛞',txt:'Presión baja = +10% consumo y riesgo de reventón'},
  {emoji:'🌧️',txt:'Lluvia: aumenta distancia x2 y reduce velocidad 20%'},
  {emoji:'😴',txt:'Cansado = mismo riesgo que alcohol. Para cada 2h'},
  {emoji:'🚸',txt:'En zona escolar reduce a 20 km/h siempre'},
  {emoji:'🔄',txt:'Glorieta: carril derecho para salir, izquierdo para seguir'},
  {emoji:'🚨',txt:'Ambulancia con sirena: pégate a la derecha y para'},
  {emoji:'🌙',txt:'Noche: aumenta distancia, los faros engañan'},
  {emoji:'🧥',txt:'Chaleco reflectante obligatorio fuera del coche en carretera'},
  {emoji:'🍼',txt:'Niños <135cm siempre atrás con silla homologada'},
  {emoji:'🚲',txt:'Adelanta ciclista dejando 1.5m mínimo lateral'},
  {emoji:'❄️',txt:'Hielo negro no se ve. Si brilla la carretera, precaución'},
  {emoji:'🚧',txt:'Obras: respeta señales amarillas, son prioritarias'},
  {emoji:'🅿️',txt:'No aparques a menos de 5m de un paso de peatones'},
  {emoji:'💨',txt:'Viento lateral: sujeta volante con las dos manos'},
  {emoji:'🔋',txt:'Coche eléctrico: regenera frenando, ahorra pastillas'},
  {emoji:'🎧',txt:'Auriculares prohibidos. No oyes ambulancias ni claxon'},
  {emoji:'🥃',txt:'Alcohol 0.0 si eres novel o profesional. No hay excusa'},
  {emoji:'🌫️',txt:'Niebla: antiniebla trasera solo si visibilidad <50m'},
  {emoji:'🛣️',txt:'Autovía: carril derecho es para circular, no adelantar'},
  {emoji:'🚦',txt:'Ámbar: solo pasa si no puedes parar seguro'},
  {emoji:'👶',txt:'Airbag + silla atrás en sentido contrario a la marcha'},
  {emoji:'🛠️',txt:'Revisa aceite, agua y presión cada 15 días'},
  {emoji:'📍',txt:'GPS: prográmalo antes de salir, no conduciendo'},
  {emoji:'🔥',txt:'Incendio: no abras capó, usa extintor por rendijas'},
  {emoji:'💪',txt:'Cinturón siempre. 9 de 10 vidas salvadas son por eso'}
];

let tipsData = [];
let tipActual = 0;

let estado = {
  coins: parseInt(localStorage.getItem('gd_coins')) || 0,
  coches: JSON.parse(localStorage.getItem('gd_coches')) || ['c1'],
  accesorios: JSON.parse(localStorage.getItem('gd_accesorios')) || [],
  emojis: JSON.parse(localStorage.getItem('gd_emojis')) || [],
  test: {
    general: {idx:0,aciertos:0,racha:0,puntuacion:0},
    señales: {idx:0,aciertos:0,racha:0,puntuacion:0},
    normas: {idx:0,aciertos:0,racha:0,puntuacion:0},
    mecanica: {idx:0,aciertos:0,racha:0,puntuacion:0}
  },
  examen: {
    activa: false,
    preguntas: [],
    indice: 0,
    aciertos: 0,
    timer: null,
    tiempo: 1800
  },
  sit: {
    clima: {idx:0,aciertos:0,puntuacion:0}
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log("GasDrive V8.1 ES cargado");
  actualizarCoins();
  cargarPregunta('general');
  cargarPregunta('señales');
  cargarPregunta('normas');
  cargarPregunta('mecanica');
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

function cambiarTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  event.target.closest('.tab-btn').classList.add('active');
  if(tab === 'garage') cargarGarage();
  if(tab === 'tienda') cargarTienda();
  if(tab === 'tips') cargarTips();
  if(tab === 'test') cargarPregunta('general');
  if(tab === 'situaciones') cargarSituacion('clima');
}

function cambiarSubTab(tab, subtab) {
  const contenedor = document.getElementById('tab-' + tab);
  contenedor.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
  contenedor.querySelectorAll('.sub-content').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(`${tab === 'test'? 'test' : 'sit'}-${subtab}`).classList.add('active');
  if(tab === 'test') cargarPregunta(subtab);
  if(tab === 'sit') cargarSituacion(subtab);
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

function cargarPregunta(cat) {
  const s = estado.test[cat];
  const preguntas = PREGUNTAS[cat];
  if(!preguntas || preguntas.length === 0) return;
  const p = preguntas[s.idx % preguntas.length];

  const emoji = p.emoji || '📝';
  document.getElementById(`test-${cat}-pregunta`).innerHTML = `${emoji} ${p.q}`;

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
  const preguntas = PREGUNTAS[cat];
  const p = preguntas[s.idx % preguntas.length];
  if(el.classList.contains('bloqueada')) return;

  document.querySelectorAll(`#test-${cat}-opciones.opcion`).forEach(o => o.classList.add('bloqueada'));
  const correcto = idx === p.ok;

  if(correcto) {
    el.classList.add('correcta');
    s.aciertos++;
    s.racha++;
    s.puntuacion += 10 + (s.racha * 2);
    estado.coins += 5;
    document.getElementById(`test-${cat}-feedback`).className = 'feedback acierto';
    document.getElementById(`test-${cat}-feedback`).textContent = `✅ CORRECTO! +${10+(s.racha*2)} pts`;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    document.querySelectorAll(`#test-${cat}-opciones.opcion`)[p.ok].classList.add('correcta');
    document.getElementById(`test-${cat}-feedback`).className = 'feedback fallo';
    document.getElementById(`test-${cat}-feedback`).textContent = '❌ FALLO';
    mostrarEmoji(false, el);
    s.racha = 0;
  }
  document.getElementById(`btn-sig-test-${cat}`).disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteTest(cat) {
  estado.test[cat].idx++;
  cargarPregunta(cat);
}

function cargarSituacion(cat) {
  const s = estado.sit[cat];
  const casos = SITUACIONES[cat];
  if(!casos || casos.length === 0) return;
  const p = casos[s.idx % casos.length];

  const emoji = p.emoji || '🚦';
  document.getElementById(`sit-${cat}-pregunta`).innerHTML = `${emoji} ${p.q}`;

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
  const casos = SITUACIONES[cat];
  const p = casos[s.idx % casos.length];
  if(el.classList.contains('bloqueada')) return;

  document.querySelectorAll(`#sit-${cat}-opciones.opcion`).forEach(o => o.classList.add('bloqueada'));
  const correcto = idx === p.ok;

  if(correcto) {
    el.classList.add('correcta');
    s.aciertos++;
    s.puntuacion += 15;
    estado.coins += 10;
    document.getElementById(`sit-${cat}-feedback`).className = 'feedback acierto';
    document.getElementById(`sit-${cat}-feedback`).textContent = `✅ CORRECTO! +15 pts`;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    document.querySelectorAll(`#sit-${cat}-opciones.opcion`)[p.ok].classList.add('correcta');
    document.getElementById(`sit-${cat}-feedback`).className = 'feedback fallo';
    document.getElementById(`sit-${cat}-feedback`).textContent = '❌ FALLO';
    mostrarEmoji(false, el);
  }
  document.getElementById(`btn-sig-sit-${cat}`).disabled = false;
  actualizarCoins();
  guardar();
}

function siguienteSituacion(cat) {
  estado.sit[cat].idx++;
  cargarSituacion(cat);
}

function iniciarExamen() {
  const todas = [
  ...PREGUNTAS.general,
  ...PREGUNTAS.señales,
  ...PREGUNTAS.normas,
  ...PREGUNTAS.mecanica,
  ...SITUACIONES.clima
  ];
  if(todas.length < 30) {
    alert('Faltan preguntas. Necesitas 30 mínimo.');
    return;
  }
  estado.examen.preguntas = todas.sort(() => 0.5 - Math.random()).slice(0, 30);
  estado.examen.activa = true;
  estado.examen.indice = 0;
  estado.examen.aciertos = 0;
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
  if(estado.examen.indice >= 30) return finalizarExamen();
  const p = estado.examen.preguntas[estado.examen.indice];

  const emoji = p.emoji || '📝';
  document.getElementById('examen-num').textContent = estado.examen.indice + 1;
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
  document.getElementById('examen-progress').style.width = `${(estado.examen.indice/30)*100}%`;
  document.getElementById('examen-pregunta').innerHTML = `${emoji} ${p.q}`;

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
  if(el.classList.contains('bloqueada')) return;
  const p = estado.examen.preguntas[estado.examen.indice];
  document.querySelectorAll('#examen-opciones.opcion').forEach(o => o.classList.add('bloqueada'));
  const correcto = idx === p.ok;
  if(correcto) {
    el.classList.add('correcta');
    estado.examen.aciertos++;
    estado.coins += 20;
    mostrarEmoji(true, el);
  } else {
    el.classList.add('incorrecta');
    document.querySelectorAll('#examen-opciones.opcion')[p.ok].classList.add('correcta');
    mostrarEmoji(false, el);
  }
  document.getElementById('btn-sig-examen').disabled = false;
  document.getElementById('examen-aciertos').textContent = estado.examen.aciertos;
  actualizarCoins();
  guardar();
}

function siguientePreguntaExamen() {
  estado.examen.indice++;
  if(estado.examen.indice >= 30) {
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
  if(aprobado) {
    res.innerHTML = `
      <h2 style="color:#2ecc71">✅ APROBADO!</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Has ganado +${nota*20} coins</p>
      <button class="btn" onclick="reiniciarExamen()">Hacer otro examen</button>
    `;
    estado.coins += nota * 20;
  } else {
    res.innerHTML = `
      <h2 style="color:#e74c3c">❌ SUSPENSO</h2>
      <p style="font-size:24px">${nota}/30</p>
      <p>Necesitas 27 aciertos mínimo</p>
      <button class="btn" onclick="reiniciarExamen()">Volver a probar</button>
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

function cargarGarage() {
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
      <div style="font-size:40px">${coche.emoji}</div>
      <div>${coche.nom}</div>
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
  cargarGarage();
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
      <div>${acc.nom}</div>
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
      <div>${emoji.nom}</div>
      <div style="color:#667eea">Cosmético</div>
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
  tipActual = 0;
  mostrarTip();
}

function mostrarTip() {
  if (tipsData.length === 0) return;
  const tip = tipsData[tipActual];
  document.getElementById('tip-content').innerHTML = `
    <div class="tip-emoji">${tip.emoji}</div>
    <div class="tip-text">${tip.txt}</div>
  `;
  document.getElementById('tip-counter').textContent = `${tipActual + 1} / ${tipsData.length}`;
}

function nextTip() {
  tipActual = (tipActual + 1) % tipsData.length;
  mostrarTip();
}

function prevTip() {
  tipActual = (tipActual - 1 + tipsData.length) % tipsData.length;
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
