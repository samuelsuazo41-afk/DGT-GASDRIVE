// GASDRIVE DGT V8.5 ES - 630 PREGUNTAS DGT 2026 + AUTOESCUELA ONLINE
const VERSION = "8.5";

// === MOTOR DE PROGRESO DGT - AUTOESCUELA ONLINE ===
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
    mecanica: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 },
    auxilios: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 },
    medioambiente: { tiempo: 0, porcentaje: 0, ultimaEntrada: 0 }
  },
  racha: { dias: 0, ultimaFecha: "" }
};

// === MENSAJES INTELIGENTES POR TEMARIO - PÁGINAS REALES DGT 2025/2026 ===
const SUBTEMAS_DEBILES = {
  senales: [
    { pct: 0, msg: 'Señales de Prioridad (R-1 a R-6: Stop, Ceda) - Pág 65-66' },
    { pct: 20, msg: 'Señales de Prohibición de Entrada - Pág 68-72' },
    { pct: 40, msg: 'Señales de Prohibición de Paso/Adelantar - Pág 73-78' },
    { pct: 60, msg: 'Señales de Obligación (R-413 a R-422) - Pág 75-76' },
    { pct: 80, msg: 'Señales de Indicación General - Pág 80-95' }
  ],
  normas: [
    { pct: 0, msg: 'Normas Generales y Definiciones - Pág 5-15' },
    { pct: 20, msg: 'Velocidades Máximas por Vía - Pág 25-32' },
    { pct: 40, msg: 'Prioridad en Intersecciones y Pasos Estrechos - Pág 45-52' },
    { pct: 60, msg: 'Adelantamientos y Cambios de Sentido - Pág 65-75' },
    { pct: 80, msg: 'Alumbrado y Uso de Carriles - Pág 85-92' }
  ],
  auxilios: [
    { pct: 0, msg: 'Conducta PAS: Proteger, Avisar, Socorrer - Pág 40-45' },
    { pct: 25, msg: 'Valoración Inicial del Herido (ABC) - Pág 50-55' },
    { pct: 50, msg: 'RCP: Reanimación Cardiopulmonar Básica - Pág 53-58' },
    { pct: 75, msg: 'Hemorragias y Heridas - Pág 65-72' }
  ],
  mecanica: [
    { pct: 0, msg: 'Motor: Elementos y Funcionamiento - Pág 15-25' },
    { pct: 25, msg: 'Sistema de Frenos y ABS - Pág 35-42' },
    { pct: 50, msg: 'Neumáticos: Presión y Desgaste - Pág 55-62' },
    { pct: 75, msg: 'Niveles: Aceite, Refrigerante, Líquido Frenos - Pág 70-76' }
  ],
  medioambiente: [
    { pct: 0, msg: 'Distintivos Ambientales DGT (0, ECO, C, B) - Pág 8-14' },
    { pct: 25, msg: 'Zonas de Bajas Emisiones ZBE - Pág 18-25' },
    { pct: 50, msg: 'Conducción Eficiente: Marchas y RPM - Pág 30-38' },
    { pct: 75, msg: 'Contaminación Acústica y Atmosférica - Pág 45-50' }
  ],
  general: [
    { pct: 0, msg: 'Documentación y Permisos - Pág 5-10' }
  ]
};

const LINK_DGT_OFICIAL = 'https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-renovacion-duplicados-permiso/permiso-conducir/';

function guardarProgreso() {
  localStorage.setItem('gd_progreso', JSON.stringify(PROGRESO));
}

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// INTRO SCREEN - APARECE SIEMPRE AL ABRIR
function mostrarIntro(){
  // Quitamos el check de localStorage para que salga siempre
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 10px">GasDrive DGT 2026</h1>
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

// 470 PREGUNTAS TEST DGT OFICIALES 2026
const PREGUNTAS = {
    senales: [
    // === PRIORIDAD R-1 a R-6 === Pág 65-66
    {q:"Señal de STOP octogonal R-2:",a:["Cede el paso","Parada obligatoria total","Precaución"],ok:1},
    {q:"Triángulo invertido R-1 es:",a:["STOP","Ceda el paso","No entrar"],ok:1},
    {q:"Señal R-3 calzada con prioridad:",a:["Fin prioridad","Calzada con prioridad","Ceda el paso"],ok:1},
    {q:"Señal R-4 fin de prioridad:",a:["Inicio prioridad","Fin calzada con prioridad","Ceda el paso"],ok:1},
    {q:"Señal R-5 prioridad sentido contrario:",a:["Tienes preferencia","Prioridad sentido contrario","Ceda el paso"],ok:1},
    {q:"Señal R-6 prioridad respecto contrario:",a:["Cede el paso","Tienes prioridad respecto al sentido contrario","STOP"],ok:1},
    
    // === PROHIBICIÓN R-100 a R-310 === Pág 68-73
    {q:"Círculo rojo con línea R-101:",a:["Obligación","Prohibición de entrada","Fin prohibición"],ok:1},
    {q:"Señal R-102 entrada prohibida vehículos motor:",a:["Prohibido coches y motos","Prohibido bicis","Prohibido peatones"],ok:0},
    {q:"Señal R-104 entrada prohibida motos:",a:["Prohibido coches","Prohibido motocicletas","Prohibido bicis"],ok:1},
    {q:"Señal R-105 entrada prohibida camiones:",a:["Prohibido turismos","Prohibido camiones","Prohibido buses"],ok:1},
    {q:"Señal R-106 entrada prohibida buses:",a:["Prohibido camiones","Prohibido autobuses","Prohibido taxis"],ok:1},
    {q:"Señal R-107 entrada prohibida ciclos:",a:["Prohibido motos","Prohibido bicicletas","Prohibido peatones"],ok:1},
    {q:"Señal R-108 entrada prohibida ciclomotores:",a:["Prohibido bicis","Prohibido ciclomotores","Prohibido motos"],ok:1},
    {q:"Señal R-111 entrada prohibida vehículos agrícolas:",a:["Prohibido tractores","Prohibido camiones","Prohibido buses"],ok:0},
    {q:"Señal R-112 entrada prohibida animales montura:",a:["Prohibido peatones","Prohibido animales de montura","Prohibido bicis"],ok:1},
    {q:"Señal R-113 entrada prohibida carros mano:",a:["Prohibido peatones","Prohibido carros de mano","Prohibido bicis"],ok:1},
    {q:"Señal R-114 entrada prohibida peatones:",a:["Prohibido peatones","Prohibido bicis","Prohibido motos"],ok:0},
    {q:"Señal R-116 entrada prohibida animales sueltos:",a:["Prohibido peatones","Prohibido ganado","Prohibido bicis"],ok:1},
    {q:"Señal circular rojo con 3,5t R-201:",a:["Peso máximo 3,5t","Peso mínimo 3,5t","Fin peso máximo"],ok:0},
    {q:"Señal R-202 anchura máxima:",a:["Altura máxima","Anchura máxima","Longitud máxima"],ok:1},
    {q:"Señal R-203 altura máxima:",a:["Anchura máxima","Altura máxima","Peso máximo"],ok:1},
    {q:"Señal R-204 longitud máxima:",a:["Longitud máxima","Anchura máxima","Altura máxima"],ok:0},
    {q:"Señal R-300 velocidad máxima:",a:["Velocidad mínima","Velocidad máxima","Velocidad recomendada"],ok:1},
    {q:"Señal R-301 fin velocidad máxima:",a:["Inicio límite","Fin límite velocidad","Nuevo límite"],ok:1},
    {q:"Señal R-302 giro izquierda prohibido:",a:["Permitido","Prohibido giro izquierda","Obligación girar"],ok:1},
    {q:"Señal R-303 giro derecha prohibido:",a:["Permitido","Prohibido giro derecha","Obligación girar"],ok:1},
    {q:"Señal R-304 cambio sentido prohibido:",a:["Permitido","Prohibido cambio sentido","Obligación"],ok:1},
    {q:"Señal R-305 adelantamiento prohibido:",a:["Permitido","Prohibido adelantar turismos","Obligación adelantar"],ok:1},
    {q:"Señal R-306 fin prohibición adelantar:",a:["Inicio","Fin prohibición adelantar","Continúa"],ok:1},
    {q:"Señal R-307 adelantamiento prohibido camiones:",a:["Prohibido turismos","Prohibido camiones >3,5t adelantar","Prohibido buses"],ok:1},
    {q:"Señal R-308 fin prohibición adelantar camiones:",a:["Inicio","Fin prohibición camiones","Continúa"],ok:1},
    {q:"Señal R-309 zona prohibida adelantar:",a:["Permitido","Zona con prohibición adelantar","Fin prohibición"],ok:1},
    {q:"Señal R-310 señales acústicas prohibidas:",a:["Prohibición claxon","Obligación claxon","Fin prohibición claxon"],ok:0},

    // === OBLIGACIÓN R-400 a R-422 === Pág 75-76
    {q:"Círculo azul con flecha R-400:",a:["Prohibición","Sentido obligatorio","Información"],ok:1},
    {q:"Señal R-401 sentido obligatorio derecha:",a:["Prohibido derecha","Obligatorio derecha","Recomendado derecha"],ok:1},
    {q:"Señal R-402 sentido obligatorio izquierda:",a:["Prohibido izquierda","Obligatorio izquierda","Recomendado izquierda"],ok:1},
    {q:"Señal R-403 paso obligatorio derecha:",a:["Prohibido derecha","Paso obligatorio derecha","Fin obligación"],ok:1},
    {q:"Señal R-404 paso obligatorio izquierda:",a:["Prohibido izquierda","Paso obligatorio izquierda","Fin obligación"],ok:1},
    {q:"Señal R-405 único sentido:",a:["Doble sentido","Sentido único","Prohibido entrar"],ok:1},
    {q:"Señal R-407 vía reservada ciclistas:",a:["Prohibido bicis","Vía obligatoria ciclistas","Recomendado bicis"],ok:1},
    {q:"Señal R-410 vía reservada peatones y ciclos:",a:["Prohibido peatones","Vía reservada peatones y ciclos","Solo peatones"],ok:1},
    {q:"Señal R-411 velocidad mínima:",a:["Prohibición","Obligación velocidad mínima","Información"],ok:1},
    {q:"Señal R-412 fin velocidad mínima:",a:["Inicio","Fin velocidad mínima","Continúa"],ok:1},
    {q:"Señal R-413 alumbrado corto alcance:",a:["Prohibido luces","Obligatorio luces cruce","Recomendado luces"],ok:1},
    {q:"Señal R-414 fin alumbrado corto:",a:["Inicio","Fin obligación luces","Continúa"],ok:1},
    {q:"Señal R-415 cadenas para nieve:",a:["Prohibido cadenas","Obligación cadenas nieve","Recomendado cadenas"],ok:1},
    {q:"Señal R-416 fin cadenas nieve:",a:["Inicio","Fin obligación cadenas","Continúa"],ok:1},
    {q:"Señal R-417 uso obligatorio cinturón:",a:["Prohibido cinturón","Obligatorio cinturón seguridad","Recomendado cinturón"],ok:1},
    {q:"Señal R-418 vía para automóviles:",a:["Prohibido coches","Vía reservada automóviles","Recomendado coches"],ok:1},
    {q:"Señal R-422 fin vía reservada:",a:["Inicio","Fin vía reservada","Continúa"],ok:1},

    // === PELIGRO P-1 a P-50 === Pág 78-80
    {q:"Rombo amarillo P-1:",a:["Peligro indefinido","Información","Obligación"],ok:0},
    {q:"Señal P-2 intersección con prioridad:",a:["Peligro cruce","Intersección con prioridad derecha","Ceda el paso"],ok:1},
    {q:"Señal P-3 semáforos:",a:["Información","Peligro semáforos","Prohibición"],ok:1},
    {q:"Señal P-4 intersección giratoria:",a:["Prohibido girar","Peligro rotonda","Ceda el paso"],ok:1},
    {q:"Señal P-13a curva peligrosa derecha:",a:["Curva a la derecha","Curva peligrosa derecha","Obligación girar"],ok:1},
    {q:"Señal P-13b curva peligrosa izquierda:",a:["Curva a la izquierda","Curva peligrosa izquierda","Obligación girar"],ok:1},
    {q:"Señal P-14a curvas peligrosas primera derecha:",a:["Curva simple","Curvas peligrosas, primera derecha","Prohibido curvas"],ok:1},
    {q:"Señal P-15 perfil irregular:",a:["Badenes","Perfil irregular calzada","Obras"],ok:1},
    {q:"Señal P-16a bajada peligrosa:",a:["Subida","Bajada con fuerte pendiente","Curva"],ok:1},
    {q:"Señal P-16b subida peligrosa:",a:["Bajada","Subida con fuerte pendiente","Curva"],ok:1},
    {q:"Señal P-17 estrechamiento:",a:["Ensanchamiento","Estrechamiento calzada","Puente estrecho"],ok:1},
    {q:"Señal P-17a estrechamiento derecha:",a:["Estrechamiento izquierda","Estrechamiento por la derecha","Puente"],ok:1},
    {q:"Señal P-17b estrechamiento izquierda:",a:["Estrechamiento derecha","Estrechamiento por la izquierda","Puente"],ok:1},
    {q:"Señal P-18 obras:",a:["Información","Peligro obras","Prohibición"],ok:1},
    {q:"Señal P-19 pavimento deslizante:",a:["Pavimento nuevo","Peligro pavimento deslizante","Obras"],ok:1},
    {q:"Señal P-20 peatones:",a:["Prohibido peatones","Peligro paso peatones","Zona peatones"],ok:1},
    {q:"Señal P-21 niños:",a:["Zona escolar","Peligro niños, colegio cerca","Parque infantil"],ok:1},
    {q:"Señal P-22 ciclistas:",a:["Prohibido bicis","Peligro ciclistas","Carril bici"],ok:1},
    {q:"Señal P-23 animales domésticos:",a:["Prohibido animales","Peligro animales domésticos","Granja"],ok:1},
    {q:"Señal P-24 animales salvajes:",a:["Prohibido cazar","Peligro animales salvajes","Zoo"],ok:1},
    {q:"Señal P-25 circulación dos sentidos:",a:["Sentido único","Peligro circulación dos sentidos","Prohibido adelantar"],ok:1},
    {q:"Señal P-26 desprendimientos:",a:["Peligro zona desprendimientos","Prohibición parar","Obligación casco"],ok:0},
    {q:"Señal P-28 proyección gravilla:",a:["Obras","Peligro proyección gravilla","Camino tierra"],ok:1},
    {q:"Señal P-29 viento transversal:",a:["Información","Peligro viento lateral fuerte","Prohibición"],ok:1},
    {q:"Señal P-30 escalón lateral:",a:["Badenes","Peligro escalón lateral calzada","Obras"],ok:1},
    {q:"Señal P-31 congestión:",a:["Atasco","Peligro retención","Autopista"],ok:1},
    {q:"Señal P-32 obstrucción calzada:",a:["Obras","Peligro obstrucción calzada","Prohibido parar"],ok:1},
    {q:"Señal P-33 visibilidad reducida:",a:["Niebla","Peligro visibilidad reducida","Túnel"],ok:1},
    {q:"Señal P-34 pavimento deslizante hielo/nieve:",a:["Pavimento mojado","Peligro hielo o nieve","Obras"],ok:1},
    {q:"Señal P-50 otros peligros:",a:["Peligro genérico","Fin peligros","Información"],ok:0},

    // === INDICACIÓN S-1 a S-62 CARRILES === Pág 88-90
    {q:"Señal S-50 carriles reservados:",a:["Carril bus","Carriles en sentido contrario al habitual","Carril bici"],ok:1},
    {q:"Señal S-51 carril bus:",a:["Carril para todos","Carril reservado bus/taxi","Prohibido bus"],ok:1},
    {q:"Señal S-52 fin carril bus:",a:["Inicio carril bus","Fin carril reservado bus","Continúa carril"],ok:1},
    {q:"Señal S-53 carril bus-VAO:",a:["Carril bus","Carril bus y vehículos alta ocupación","Carril bici"],ok:1},
    {q:"Señal S-60 bifurcación:",a:["Fin autopista","Bifurcación hacia derecha","Salida autopista"],ok:1},
    {q:"Señal S-61 bifurcación izquierda:",a:["Bifurcación derecha","Bifurcación hacia izquierda","Fin autopista"],ok:1},
    {q:"Señal S-62 preseñalización carriles:",a:["Información","Preseñalización de carriles","Prohibición"],ok:1},

    // === SERVICIOS S-100 a S-126 === Pág 92-95
    {q:"Señal S-100 estación servicio:",a:["Prohibición repostar","Estación de servicio","Área descanso"],ok:1},
    {q:"Señal S-101 taller mecánico:",a:["Taller reparación","Gasolinera","Hotel"],ok:0},
    {q:"Señal S-102 teléfono:",a:["Prohibido teléfono","Teléfono SOS","Hotel"],ok:1},
    {q:"Señal S-103 restaurante:",a:["Hotel","Restaurante","Área descanso"],ok:1},
    {q:"Señal S-104 hotel:",a:["Restaurante","Hotel o motel","Camping"],ok:1},
    {q:"Señal S-105 camping:",a:["Hotel","Camping","Área descanso"],ok:1},
    {q:"Señal S-106 terreno caravanas:",a:["Camping","Terreno para caravanas","Hotel"],ok:1},
    {q:"Señal S-107 merendero:",a:["Restaurante","Merendero","Área descanso"],ok:1},
    {q:"Señal S-108 punto partida excursiones:",a:["Hotel","Punto partida excursiones","Mirador"],ok:1},
    {q:"Señal S-109 camping y caravanas:",a:["Solo camping","Camping y terreno caravanas","Solo caravanas"],ok:1},
    {q:"Señal S-110 hotel:",a:["Hotel","Hostal","Albergue"],ok:0},
    {q:"Señal S-111 restaurante:",a:["Restaurante","Cafetería","Bar"],ok:0},
    {q:"Señal S-112 cafetería:",a:["Restaurante","Cafetería","Bar"],ok:1},
    {q:"Señal S-113 área descanso:",a:["Gasolinera","Área de descanso","Hotel"],ok:1},
    {q:"Señal S-114 aparcamiento:",a:["Prohibido parar","Aparcamiento","Parada bus"],ok:1},
    {q:"Señal S-115 aparcamiento cubierto:",a:["Aparcamiento","Aparcamiento cubierto","Prohibido aparcar"],ok:1},
    {q:"Señal S-116 aparcamiento vigilado:",a:["Aparcamiento","Aparcamiento vigilado","Prohibido aparcar"],ok:1},
    {q:"Señal S-117 hospital:",a:["Hotel","Hospital","Helipuerto"],ok:1},
    {q:"Señal S-118 puesto socorro:",a:["Hospital","Puesto de socorro","Farmacia"],ok:1},
    {q:"Señal S-119 bascula:",a:["Taller","Báscula para camiones","Gasolinera"],ok:1},
    {q:"Señal S-120 control policía:",a:["Hotel","Control de policía","Aduana"],ok:1},
    {q:"Señal S-121 extintor:",a:["Gasolinera","Extintor incendios","Taller"],ok:1},
    {q:"Señal S-122 salida emergencia:",a:["Información","Salida de emergencia","Prohibición"],ok:1},
    {q:"Señal S-123 área servicio:",a:["Gasolinera","Área de servicio completa","Hotel"],ok:1},
    {q:"Señal S-124 punto recarga eléctrico:",a:["Gasolinera","Punto recarga vehículo eléctrico","Taller"],ok:1},
    {q:"Señal S-125 punto información:",a:["Hotel","Punto de información turística","Policía"],ok:1},
    {q:"Señal S-126 centro inspección:",a:["Taller","Centro inspección técnica vehículos","Gasolinera"],ok:1},

    // === PANELES COMPLEMENTARIOS S-800 a S-870 === Pág 96
    {q:"Panel S-800 distancia:",a:["Decora","Indica distancia a peligro","No sirve"],ok:1},
    {q:"Panel S-810 longitud tramo:",a:["Anchura","Longitud del tramo peligroso","Altura"],ok:1},
    {q:"Panel S-820 extensión prohibición:",a:["Inicio","Extensión de la prohibición","Fin"],ok:1},
    {q:"Panel S-830 fin prohibición:",a:["Inicio","Fin de prohibición","Continúa"],ok:1},
    {q:"Panel S-840 dirección tramo:",a:["Decora","Indica dirección del tramo","No sirve"],ok:1},
    {q:"Panel S-850 itinerario desvío:",a:["Decora","Itinerario de desvío","No sirve"],ok:1},
    {q:"Panel S-860 nieve:",a:["Lluvia","Peligro nieve/hielo","Viento"],ok:1},
    {q:"Panel S-870 texto:",a:["Decora","Texto complementario","No sirve"],ok:1}
],
  normas: [
    // === ALCOHOL Y DROGAS === Pág 45-48
    {q:"Tasa de alcohol general turismos:",a:["0,5 g/l sangre","0,3 g/l sangre","0,0 g/l sangre"],ok:0},
    {q:"Tasa de alcohol noveles y profesionales:",a:["0,5 g/l","0,3 g/l","0,0 g/l"],ok:2},
    {q:"Tasa de alcohol ciclomotor:",a:["0,5 g/l","0,3 g/l","0,15 g/l"],ok:1},
    {q:"Negarse a prueba alcoholemia:",a:["Multa 500€","Delito penal","Solo aviso"],ok:1},
    {q:"Alcohol >0,6 g/l sangre:",a:["Multa 500€","Delito penal","Retirada 3 meses"],ok:1},
    {q:"Drogas al volante:",a:["Multa","Delito penal","Solo aviso"],ok:1},
    {q:"Medicamentos con somnolencia:",a:["Se puede conducir","No conducir si afecta","Solo trayecto corto"],ok:1},
    
    // === VELOCIDAD === Pág 25-30
    {q:"Límite ciudad genérico 2026:",a:["30 km/h","50 km/h","40 km/h"],ok:1},
    {q:"Límite calle plataforma única:",a:["20 km/h","30 km/h","50 km/h"],ok:0},
    {q:"Límite autovía turismos:",a:["100 km/h","120 km/h","130 km/h"],ok:1},
    {q:"Límite autopista turismos:",a:["100 km/h","120 km/h","140 km/h"],ok:1},
    {q:"Límite convencional 90 km/h:",a:["Turismos","Camiones","Todos"],ok:0},
    {q:"Límite convencional camiones:",a:["90 km/h","80 km/h","70 km/h"],ok:1},
    {q:"Velocidad +60km/h en vía 50:",a:["Multa grave","Delito penal","Solo multa"],ok:1},
    {q:"Velocidad mínima autopista:",a:["50 km/h","60 km/h","70 km/h"],ok:1},
    {q:"Velocidad mínima autovía:",a:["50 km/h","60 km/h","70 km/h"],ok:1},
    {q:"Velocidad zona escolar:",a:["50 km/h","30 km/h","20 km/h"],ok:1},
    
    // === CINTURÓN Y SEGURIDAD === Pág 55-60
    {q:"Cinturón obligatorio:",a:["Solo delante","Solo conductor","Todos los ocupantes"],ok:2},
    {q:"Multa no llevar cinturón:",a:["3 puntos + 200€","Solo 100€","Aviso"],ok:0},
    {q:"Multa no llevar cinturón detrás:",a:["2 puntos","3 puntos","4 puntos"],ok:1},
    {q:"Casco moto obligatorio:",a:["Solo ciudad","Siempre","Solo carretera"],ok:1},
    {q:"Multa no llevar casco moto:",a:["2 puntos","3 puntos + 200€","4 puntos"],ok:1},
    {q:"SRI grupo 0 hasta:",a:["9 kg","13 kg","18 kg"],ok:1},
    {q:"SRI grupo 1:",a:["9-18 kg","15-25 kg","22-36 kg"],ok:0},
    {q:"SRI de espaldas hasta:",a:["9 meses","15 meses","2 años"],ok:1},
    {q:"Multa niño sin SRI:",a:["3 puntos + 200€","Solo 100€","Aviso"],ok:0},
    
    // === PUNTOS Y PERMISOS === Pág 10-18
    {q:"Edad mínima carnet B:",a:["16 años","17 años","18 años"],ok:2},
    {q:"Puntos carnet nuevo:",a:["8 puntos","12 puntos","15 puntos"],ok:1},
    {q:"Puntos máximo sin infracciones:",a:["12 puntos","15 puntos","20 puntos"],ok:1},
    {q:"Pérdida total puntos:",a:["Suspensión 3 meses","Suspensión 6 meses + curso","Retirada definitiva"],ok:1},
    {q:"Recuperar puntos parcial:",a:["Curso 12h + 6 puntos","Curso 24h + 12 puntos","Automático 2 años"],ok:0},
    {q:"Recuperar puntos total:",a:["Curso 12h","Curso 24h + examen","Automático 3 años"],ok:1},
    {q:"Caducidad permiso B hasta 65 años:",a:["5 años","10 años","15 años"],ok:1},
    {q:"Caducidad permiso B desde 65 años:",a:["2 años","3 años","5 años"],ok:2},
    {q:"Años sin infracciones +2 puntos:",a:["1 año","2 años","3 años"],ok:1},
    {q:"Años sin infracciones +1 punto:",a:["1 año","3 años","5 años"],ok:1},
    
    // === DOCUMENTACIÓN E ITV === Pág 20-24
    {q:"Documentación obligatoria:",a:["Solo DNI","Permiso + ITV + Seguro","Solo permiso"],ok:1},
    {q:"ITV turismo nuevo primera:",a:["2 años","4 años","6 años"],ok:1},
    {q:"ITV turismo 4-10 años:",a:["Anual","Cada 2 años","Cada 4 años"],ok:1},
    {q:"ITV turismo +10 años:",a:["Anual","Cada 2 años","Cada 6 meses"],ok:0},
    {q:"Multa sin ITV en vigor:",a:["100€","200€ + inmovilización","Solo aviso"],ok:1},
    {q:"Seguro obligatorio mínimo:",a:["Solo RC","RC + robo","Todo riesgo"],ok:0},
    {q:"Multa circular sin seguro:",a:["500€ a 3000€","100€","Solo aviso"],ok:0},
    {q:"Chaleco reflectante obligatorio:",a:["Solo noche","Al bajar del vehículo en vía","No obligatorio"],ok:1},
    {q:"Multa no llevar chaleco:",a:["80€","200€","Solo aviso"],ok:0},
    {q:"Triángulos avería:",a:["1 triángulo","2 triángulos a 50m","No obligatorios"],ok:1},
    {q:"Multa no señalizar avería autovía:",a:["80€","200€","Solo aviso"],ok:1},
    
    // === INFRACCIONES Y PUNTOS === Pág 35-44
    {q:"Multa móvil en mano:",a:["3 puntos + 200€","6 puntos + 200€","Solo 100€"],ok:1},
    {q:"Multa saltarse STOP:",a:["2 puntos","3 puntos","4 puntos + 200€"],ok:2},
    {q:"Multa saltarse semáforo rojo:",a:["3 puntos","4 puntos + 200€","6 puntos"],ok:1},
    {q:"Multa saltarse ceda el paso:",a:["2 puntos","3 puntos","4 puntos + 200€"],ok:2},
    {q:"Multa adelantar línea continua:",a:["3 puntos","4 puntos + 200€","6 puntos"],ok:1},
    {q:"Multa no ceder paso peatón cebra:",a:["2 puntos","3 puntos","4 puntos + 200€"],ok:2},
    {q:"Multa circular arcén sin causa:",a:["2 puntos","3 puntos","4 puntos + 200€"],ok:2},
    {q:"Conducir sin carnet:",a:["Multa 500€","Delito penal","Solo aviso"],ok:1},
    {q:"Huir accidente con heridos:",a:["Multa","Delito penal","Retirada 6 meses"],ok:1},
    {q:"Velocidad +20km/h ciudad:",a:["Multa leve","Multa grave + 2 puntos","Solo aviso"],ok:1},
    {q:"Velocidad +50km/h autopista:",a:["Multa leve","Multa muy grave + 6 puntos","Solo aviso"],ok:1},
    
    // === PRIORIDAD === Pág 48-54
    {q:"Peatón tiene preferencia:",a:["Nunca","Siempre en paso cebra","Solo con semáforo"],ok:1},
    {q:"Ciclista tiene preferencia:",a:["Nunca","En carril bici y rotonda","Siempre"],ok:1},
    {q:"Bus tiene preferencia:",a:["Nunca","Saliendo de parada señalizada","Siempre"],ok:1},
    {q:"Ambulancia tiene preferencia:",a:["Nunca","Con luces y sonido prioritario","Siempre"],ok:1},
    {q:"Policía tiene preferencia:",a:["Nunca","En servicio urgente","Siempre"],ok:1},
    {q:"Prioridad derecha:",a:["Nunca","En cruce sin señales","Siempre"],ok:1},
    {q:"Prioridad rotonda:",a:["El que entra","El que circula dentro","El más rápido"],ok:1},
    {q:"Prioridad subida cuesta estrecha:",a:["Baja","Sube","El más grande"],ok:1},
    {q:"Prioridad tranvía:",a:["Nunca","Siempre","Solo de noche"],ok:1},
    {q:"Prioridad tren paso nivel:",a:["Nunca","Siempre","Solo de día"],ok:1},
    {q:"Prioridad bus escolar parando:",a:["Nunca","Cuando para con luces","Siempre"],ok:1},
    
    // === ZBE ZONAS BAJAS EMISIONES 2026 === Pág 85-87 NUEVO
    {q:"Coche sin etiqueta en ZBE:",a:["Puede entrar siempre","Prohibido salvo excepciones","Solo de noche"],ok:1},
    {q:"Etiqueta B en ZBE Madrid 2026:",a:["Acceso libre","Prohibido lunes-viernes 7-20h","Solo residentes"],ok:1},
    {q:"Etiqueta C en ZBE Barcelona:",a:["Acceso libre","Prohibido laborables 7-20h","Solo fines semana"],ok:1},
    {q:"Etiqueta ECO en ZBE:",a:["Prohibido","Acceso libre","Solo residentes"],ok:1},
    {q:"Etiqueta 0 en ZBE:",a:["Prohibido","Acceso libre + aparcar gratis","Solo residentes"],ok:1},
    {q:"Multa entrar ZBE sin etiqueta:",a:["80€","200€","Solo aviso"],ok:1},
    {q:"Moto sin etiqueta en ZBE:",a:["Prohibido","Permitido","Solo de noche"],ok:0},
    {q:"Vehículo histórico en ZBE:",a:["Prohibido","Exento con autorización","Solo fines semana"],ok:1},
    {q:"ZBE activa fines de semana:",a:["Sí siempre","Depende ciudad","Nunca"],ok:1},
    {q:"Cómo saber si mi coche puede entrar ZBE:",a:["Preguntar","Web DGT + etiqueta parabrisas","Solo ITV"],ok:1},
    
    // === PATINETES ELÉCTRICOS 2026 === Pág 88-90 NUEVO
    {q:"Patinete eléctrico por acera:",a:["Permitido","Prohibido, solo calzada","Solo si hay carril"],ok:1},
    {q:"Velocidad máxima patinete:",a:["45 km/h","25 km/h","50 km/h"],ok:1},
    {q:"Patinete necesita seguro:",a:["No","Sí obligatorio","Solo si >25km/h"],ok:1},
    {q:"Casco patinete obligatorio:",a:["Nunca","Menores 16 años","Siempre"],ok:1},
    {q:"Patinete por carril bici:",a:["Prohibido","Obligatorio si existe","Opcional"],ok:1},
    {q:"Patinete con auriculares:",a:["Permitido","Prohibido","Solo uno"],ok:1},
    {q:"Patinete con pasajero:",a:["Permitido","Prohibido","Solo niños"],ok:1},
    {q:"Patinete alcohol:",a:["0,5 g/l","0,0 g/l","0,3 g/l"],ok:1},
    {q:"Patinete móvil en mano:",a:["Permitido","Prohibido 200€ multa","Solo parado"],ok:1},
    {q:"Edad mínima patinete:",a:["14 años","16 años","18 años"],ok:1},
    
    // === TACÓGRAFO Y TIEMPOS === Pág 91-92 NUEVO
    {q:"Tacógrafo obligatorio:",a:["Todos coches","Vehículos >3,5t o 9 plazas","Solo camiones"],ok:1},
    {q:"Tiempo conducción máximo sin pausa:",a:["2h","4h 30min","6h"],ok:1},
    {q:"Pausa mínima tras 4h 30min:",a:["15min","30min","45min"],ok:2},
    {q:"Conducción diaria máxima:",a:["8h","9h ampliable 10h","12h"],ok:1},
    {q:"Descanso diario mínimo:",a:["8h","11h","12h"],ok:1},
    {q:"Conducción semanal máxima:",a:["45h","56h","60h"],ok:1},
    {q:"Descanso semanal mínimo:",a:["24h","45h","36h"],ok:1},
    
    // === REMOLQUES Y CARGAS === Pág 70-74
    {q:"Remolque ligero hasta:",a:["350 kg","750 kg","1000 kg"],ok:1},
    {q:"Remolque >750kg necesita:",a:["Nada","Permiso B+E","Permiso C"],ok:1},
    {q:"Carga sobresale detrás máximo:",a:["1 metro","2 metros","3 metros"],ok:0},
    {q:"Carga sobresale señalizar:",a:["No hace falta","Panel V-20","Luces emergencia"],ok:1},
    {q:"Carga sobresale de noche:",a:["Panel V-20","Luz roja detrás","Nada"],ok:1},
    {q:"Peso maletero:",a:["Peso alto","Peso bajo y bien sujeto","Como sea"],ok:1},
    {q:"Bicicleta en portabicis:",a:["No señalizar","Panel V-20 si sobresale","Solo luces"],ok:1},
    
    // === CONDUCCIÓN Y SEGURIDAD === Pág 52-68
    {q:"Distancia seguridad seco:",a:["1 segundo","2 segundos","3 segundos"],ok:1},
    {q:"Distancia seguridad lluvia:",a:["Igual","Doble","Triple"],ok:1},
    {q:"Distancia adelantar ciclista:",a:["1 metro","1,5 metros","2 metros"],ok:1},
    {q:"Intermitente antes girar:",a:["1 segundo","3 segundos","5 segundos"],ok:1},
    {q:"Cambio carril:",a:["Gira volante","Espejo + ángulo muerto + intermitente","Solo espejo"],ok:1},
    {q:"Obstrucción calzada:",a:["Para en medio","Chaleco + triángulos 50m","Toca claxon"],ok:1},
    {q:"Coche parado arcén:",a:["Acelera","Pasa lento + 1,5m distancia","Cambia carril"],ok:1},
    {q:"Túnel luces obligatorias:",a:["Posición","Cruce","Largas"],ok:1},
    {q:"Obras señal naranja:",a:["Sigue señales viejas","Respeta señales provisionales","Ignora señales"],ok:1},
    {q:"Cambio sentido:",a:["Donde quieras","Solo permitido","Nunca"],ok:1},
    {q:"Marcha atrás:",a:["Cuando quieras","Solo imprescindible y corto","Nunca"],ok:1},
    {q:"Adelantamiento seguro:",a:["Lento y largo","Rápido y volver pronto","Con música alta"],ok:1},
    {q:"Adelantar paso peatones:",a:["Sí, con cuidado","No, nunca","Solo bicis"],ok:1},
    {q:"Adelantar en intersección:",a:["Sí siempre","No, salvo rotonda","Solo motos"],ok:1},
    
    // === INCORPORACIONES Y SALIDAS === Pág 60-65
    {q:"Incorporación carril aceleración:",a:["Para al final","Acelera para igualar velocidad","Entra lento"],ok:1},
    {q:"Salida autopista carril izquierdo:",a:["Corta carriles","Cambia con tiempo + señaliza","Sigue recto"],ok:1},
    {q:"Ceda paso incorporación:",a:["Acelera","Cede a los de vía principal","Tienes preferencia"],ok:1},
    {q:"STOP incorporación sin línea:",a:["Para en medio","Para antes intersección","No pares"],ok:1},
    {q:"Glorieta 2 carriles salir 2ª:",a:["Carril derecho","Carril izquierdo interior","Cualquiera"],ok:1},
    {q:"Glorieta 2 carriles salir 1ª:",a:["Carril derecho exterior","Carril izquierdo","Cualquiera"],ok:0},
    
    // === VEHÍCULOS ESPECIALES === Pág 75-80
    {q:"Conductor novel señal V-13:",a:["L verde","L blanca fondo verde","N naranja"],ok:1},
    {q:"Vehículo lento V-4:",a:["Triángulo rojo","Triángulo naranja","Círculo rojo"],ok:1},
    {q:"Transporte escolar V-10:",a:["Cuadrado azul","Cuadrado amarillo niños","Triángulo rojo"],ok:1},
    {q:"Mercancías peligrosas:",a:["Panel naranja","Panel amarillo","Panel rojo"],ok:0},
    {q:"Vehículo prioritario parado:",a:["Acelera","Reduce y cede paso","Toca claxon"],ok:1},
    
    // === MEDIOAMBIENTE Y EFICIENCIA === Pág 82-84
    {q:"Conducción eficiente reduce:",a:["Solo ruido","Consumo + CO2 15%","Velocidad"],ok:1},
    {q:"Apagar motor parado >:",a:["Nunca","30 segundos","5 minutos"],ok:1},
    {q:"Marcha larga rpm bajas:",a:["Fuerza motor","Ahorra combustible","Rompe coche"],ok:1},
    {q:"Aire acondicionado:",a:["Reduce consumo","Aumenta consumo 10%","No afecta"],ok:1},
    {q:"Neumáticos desinflados:",a:["Menos consumo","Más consumo + CO2","Menos ruido"],ok:1},
    {q:"Peso innecesario 100kg:",a:["No afecta","Aumenta consumo 6%","Reduce consumo"],ok:1},
    {q:"Baca en techo:",a:["Reduce consumo","Aumenta resistencia + consumo","No afecta"],ok:1},
    {q:"Arrancar en frío:",a:["Acelerar fuerte","Arrancar y salir suave","Esperar 5 min"],ok:1},
    
    // === SITUACIONES ESPECIALES === Pág 90-92
    {q:"Animal en vía:",a:["Tocar claxon fuerte","Frenar suave, no volantazo","Acelerar"],ok:1},
    {q:"Tractor vía interurbana:",a:["Adelantar rápido","Paciencia, adelantar seguro","Tocar claxon"],ok:1},
    {q:"Final autovía incorporación:",a:["Acelera","Cede al incorporarte","Tienes preferencia"],ok:1},
    {q:"Zona ORA:",a:["Aparca libre","Mira panel horario/pago","Solo residentes"],ok:1},
    {q:"Park & Ride:",a:["Aparca y bus/tren","Solo bus","Solo coche"],ok:0},
    {q:"Carril bus:",a:["Prohibido excepto bus/taxi","Abierto todos","Solo bici"],ok:0},
    {q:"Carril bici línea continua:",a:["Se puede aparcar","Nunca circular ni aparcar","Solo para girar"],ok:1},
    {q:"Paso nivel sin barreras:",a:["Cruza rápido","Para, mira, escucha","Toca claxon"],ok:1},
    {q:"Puente móvil:",a:["Acelera para pasar","Para antes barrera","Rodea barrera"],ok:1},
    {q:"Vado permanente:",a:["Aparca","Prohibido aparcar","Solo 5 min"],ok:1}
],
  mecanica: [
    // === NEUMÁTICOS === Pág 55-58
    {q:"Presión baja causa:",a:["Mayor consumo","Menor adherencia","Las dos + riesgo reventón"],ok:2},
    {q:"Neumático liso profundidad mínima:",a:["1mm","1,6mm","2mm"],ok:1},
    {q:"Neumático liso consecuencias:",a:["Multa 200€","Multa + accidente","Solo multa"],ok:1},
    {q:"Presión alta causa:",a:["Mayor consumo","Menor adherencia centro","No pasa nada"],ok:1},
    {q:"Desgaste irregular neumático:",a:["Normal","Paralelismo mal o amortiguadores","Presión correcta"],ok:1},
    {q:"Neumáticos M+S significa:",a:["Solo verano","Mud+Snow barro y nieve","Máxima velocidad"],ok:1},
    {q:"Neumáticos 3PMSF significa:",a:["Solo lluvia","Homologado nieve severa","Máxima carga"],ok:1},
    {q:"Rotar neumáticos cada:",a:["5000km","10000km","20000km"],ok:1},
    {q:"Neumático reventón a 120km/h:",a:["Frena fuerte","Sujeta volante, reduce gas, no frenes brusco","Frena a fondo"],ok:1},
    
    // === FRENOS === Pág 35-40
    {q:"Líquido de frenos bajo:",a:["Desgaste pastillas","Fuga","Las dos pueden ser"],ok:2},
    {q:"Pastillas frenos gastadas síntoma:",a:["Mejor frenada","Ruido metálico + menor frenada","No pasa nada"],ok:1},
    {q:"Discos frenos rayados síntoma:",a:["Mejor frenada","Vibración al frenar","No pasa nada"],ok:1},
    {q:"Pedal freno esponjoso:",a:["Normal","Aire en circuito","Pastillas nuevas"],ok:1},
    {q:"Pedal freno se hunde:",a:["Normal","Fuga líquido o bomba rota","Pastillas gastadas"],ok:1},
    {q:"ABS bloquea ruedas:",a:["Sí","No, evita bloqueo","Solo en mojado"],ok:1},
    {q:"Testigo ABS encendido:",a:["No frena nada","Frenos funcionan pero sin ABS","No pasa nada"],ok:1},
    {q:"Frenar con ABS:",a:["Bombea pedal","Pisa fuerte y mantenido","Frena suave"],ok:1},
    {q:"ESP qué hace:",a:["Frena solo","Corrige trayectoria si derrapa","Aumenta potencia"],ok:1},
    {q:"Testigo ESP encendido fijo:",a:["ESP actuando","ESP desconectado o avería","Normal"],ok:1},
    
    // === MOTOR Y LUBRICACIÓN === Pág 25-30
    {q:"Testigo aceite rojo encendido:",a:["Revisar nivel","Para motor YA, sin presión","Cambiar aceite"],ok:1},
    {q:"Testigo aceite amarillo:",a:["Para YA","Nivel bajo, revisar pronto","Cambiar aceite"],ok:1},
    {q:"Aceite muy alto varilla:",a:["Mejor lubricación","Puede dañar catalizador","No pasa nada"],ok:1},
    {q:"Aceite muy bajo varilla:",a:["Mejor consumo","Fricción, gripaje motor","No pasa nada"],ok:1},
    {q:"Humo azul escape significa:",a:["Normal","Aceite quemado en cilindros","Exceso combustible"],ok:1},
    {q:"Humo negro escape significa:",a:["Normal","Exceso combustible, mezcla rica","Aceite quemado"],ok:1},
    {q:"Humo blanco denso escape:",a:["Normal frío","Refrigerante en cilindros, junta culata","Aceite quemado"],ok:1},
    {q:"Motor pierde potencia cuesta:",a:["Normal","Filtro aire sucio o avería","No pasa nada"],ok:1},
    {q:"Motor se cala al ralentí:",a:["Normal","Válvula ralentí o inyección","No pasa nada"],ok:1},
    {q:"Consumo aceite normal:",a:["0 litros","Hasta 1L cada 1000km","5L cada 1000km"],ok:1},
    
    // === REFRIGERACIÓN === Pág 31-34
    {q:"Anticongelante sirve para:",a:["Solo frío","Frío y calor, anti-corrosión","Solo calor"],ok:1},
    {q:"Nivel refrigerante bajo:",a:["Añade agua","Añade refrigerante mismo color","No toques"],ok:1},
    {q:"Sobrecalentamiento motor:",a:["Acelera para enfriar","Para, apaga motor, espera","Abre tapón caliente"],ok:1},
    {q:"Testigo temperatura rojo:",a:["Revisa pronto","Para YA, motor sobrecalentado","Normal"],ok:1},
    {q:"Ventilador no salta:",a:["Normal","Termostato o ventilador roto","No pasa nada"],ok:1},
    {q:"Calefacción no calienta:",a:["Normal invierno","Termostato cerrado o sin refrigerante","Radiador roto"],ok:1},
    
    // === BATERÍA Y ELÉCTRICO === Pág 41-44
    {q:"Batería descargada arrancar:",a:["Empujar solo","Pinzas +12V con +12V","Las dos"],ok:2},
    {q:"Testigo batería encendido:",a:["Batería cargando","Alternador no carga","No pasa nada"],ok:1},
    {q:"Bornes batería sulfatados:",a:["Normal","Limpia con agua + bicarbonato","Cambia batería"],ok:1},
    {q:"Batería dura media:",a:["1 año","4-5 años","10 años"],ok:1},
    {q:"Luces no encienden:",a:["Bombilla fundida","Fusible roto","Las dos pueden ser"],ok:2},
    {q:"Intermitente va rápido:",a:["Normal","Bombilla fundida mismo lado","Relé roto"],ok:1},
    {q:"Claxon no suena:",a:["Normal","Fusible o claxon roto","No pasa nada"],ok:1},
    {q:"Fusible fundido:",a:["Puente con cable","Cambia por mismo amperaje","Pon más amperios"],ok:1},
    
    // === SUSPENSIÓN Y DIRECCIÓN === Pág 45-48
    {q:"Amortiguadores gastados:",a:["Mejor confort","Menor adherencia, balanceo","No pasa nada"],ok:1},
    {q:"Dirección dura:",a:["Mejor control","Falta líquido dirección asistida","No pasa nada"],ok:1},
    {q:"Volante vibra 80-120km/h:",a:["Normal","Ruedas desequilibradas","Dirección rota"],ok:1},
    {q:"Coche tira a un lado:",a:["Normal","Paralelismo mal o neumático bajo","No pasa nada"],ok:1},
    {q:"Ruido al girar volante:",a:["Normal","Palier o rótula rota","Dirección rota"],ok:1},
    {q:"Holguera dirección:",a:["Normal","Rótulas o caja dirección gastadas","No pasa nada"],ok:1},
    
    // === TRANSMISIÓN === Pág 49-52
    {q:"Embrague patina síntoma:",a:["Mejor salida","Motor revoluciona pero no avanza","No pasa nada"],ok:1},
    {q:"Caja cambios rasca marchas:",a:["Normal","Sincronizadores gastados","No pasa nada"],ok:1},
    {q:"Ruido al acelerar:",a:["Normal","Correa distribución o alternador","Motor roto"],ok:1},
    {q:"Vibración al acelerar:",a:["Normal","Palier o soporte motor roto","No pasa nada"],ok:1},
    {q:"Cambio automático tirones:",a:["Normal","Nivel aceite caja bajo","No pasa nada"],ok:1},
    
    // === ESCAPE Y EMISIONES === Pág 53-54
    {q:"Escape ruidoso:",a:["Mejor potencia","Agujero o junta rota, multa","No pasa nada"],ok:1},
    {q:"Humo negro ITV:",a:["Pasa ITV","No pasa, exceso CO","Normal diésel"],ok:1},
    {q:"Catalizador roto síntoma:",a:["Más potencia","Ruido metálico + más consumo","No pasa nada"],ok:1},
    {q:"Filtro partículas diésel:",a:["No existe","Reduce partículas, se regenera","Aumenta potencia"],ok:1},
    {q:"AdBlue para qué sirve:",a:["Combustible","Reduce NOx en diésel Euro 6","Aceite"],ok:1},
    {q:"Testigo AdBlue encendido:",a:["Normal","Rellenar AdBlue o no arranca","No pasa nada"],ok:1},
    
    // === HÍBRIDOS Y ELÉCTRICOS === Pág 72-76 NUEVO DGT 2026
    {q:"Coche híbrido etiqueta:",a:["Siempre ECO","Depende autonomía eléctrica","Siempre 0"],ok:1},
    {q:"Híbrido enchufable PHEV 50km:",a:["Etiqueta ECO","Etiqueta 0","Etiqueta C"],ok:1},
    {q:"Híbrido no enchufable HEV:",a:["Etiqueta 0","Etiqueta ECO","Etiqueta C"],ok:1},
    {q:"Coche eléctrico en túnel luces:",a:["Apagar luces","Luces encendidas igual que combustión","No necesita"],ok:1},
    {q:"Cargar eléctrico en lluvia:",a:["Peligroso","Seguro, conectores estancos IP67","Prohibido"],ok:1},
    {q:"Batería híbrido 12V descargada:",a:["Empujar","Pinzas como coche normal","No se puede"],ok:1},
    {q:"Mantenimiento eléctrico vs combustión:",a:["Igual","Menor: sin aceite, filtros, correas","Mayor"],ok:1},
    {q:"Freno regenerativo eléctrico:",a:["No existe","Recarga batería al frenar","Solo híbridos"],ok:1},
    {q:"Coche eléctrico se queda sin batería:",a:["Empujar","Grúa, no se puede remolcar","Remolcar normal"],ok:1},
    {q:"Cable carga eléctrico dañado:",a:["Usar igual","No usar, riesgo electrocución","Solo lento"],ok:1},
    
    // === LIMPIAPARABRISAS Y VISIBILIDAD === Pág 59-60
    {q:"Líquido limpia parabrisas:",a:["Solo agua","Agua + producto anti-mosquitos","Solo producto"],ok:1},
    {q:"Limpiaparabrisas no limpia bien:",a:["Normal","Gomas gastadas o sucias","Motor roto"],ok:1},
    {q:"Cristales empañados rápido:",a:["Abrir ventana","A/C + desempañar","Poner calor máximo"],ok:1},
    {q:"Luneta térmica no funciona:",a:["Normal","Fusible o luneta rota","No pasa nada"],ok:1},
    
    // === AVERÍAS Y SÍNTOMAS === Pág 61-64
    {q:"Coche no arranca, hace clack:",a:["Normal","Batería descargada o motor arranque","No pasa nada"],ok:1},
    {q:"Coche se para en marcha:",a:["Normal","Falta combustible o avería grave","No pasa nada"],ok:1},
    {q:"Coche pierde potencia cuesta:",a:["Normal","Filtro aire sucio o turbo roto","No pasa nada"],ok:1},
    {q:"Coche consume mucho de repente:",a:["Normal","Presión baja, freno agarrotado o avería","No pasa nada"],ok:1},
    {q:"Coche humea mucho:",a:["Normal frío","Avería motor grave","No pasa nada"],ok:1},
    {q:"Coche huele a quemado:",a:["Normal","Embrague, frenos o cortocircuito","No pasa nada"],ok:1},
    {q:"Coche huele a gasolina:",a:["Normal","Fuga combustible, peligro incendio","No pasa nada"],ok:1},
    {q:"Coche huele a aceite quemado:",a:["Normal","Fuga aceite sobre escape","No pasa nada"],ok:1},
    {q:"Coche huele dulce refrigerante:",a:["Normal","Fuga refrigerante","No pasa nada"],ok:1},
    {q:"Ruido al pasar baches:",a:["Normal","Amortiguadores o rótulas gastadas","Ruedas nuevas"],ok:1},
    {q:"Puerta no cierra bien:",a:["Normal","Cerradura rota o puerta caída","Goma desgastada"],ok:1},
    {q:"Ventana no baja:",a:["Normal","Motor elevalunas o fusible roto","No pasa nada"],ok:1},
    {q:"Asiento no se mueve:",a:["Normal","Motor asiento o guía rota","Palanca rota"],ok:1},
    {q:"Aire acondicionado no enfría:",a:["Normal","Falta gas o compresor roto","Filtro sucio"],ok:1}
],
  auxilios: [
    // === PROTOCOLO PAS === Pág 40-41
    {q:"¿Qué haces primero ante un accidente?",a:["Llamar al 112","Proteger la zona","Socorrer heridos"],ok:1},
    {q:"Orden correcto protocolo PAS:",a:["Socorrer, Avisar, Proteger","Proteger, Avisar, Socorrer","Avisar, Proteger, Socorrer"],ok:1},
    {q:"Para proteger en autopista:",a:["Triángulos 50m","Triángulos 100m + chaleco","Solo luces emergencia"],ok:1},
    
    // === HEMORRAGIAS === Pág 42-45
    {q:"En una hemorragia arterial, ¿qué haces?",a:["Compresión directa fuerte","Elevar extremidad","Dar aspirina"],ok:0},
    {q:"Hemorragia nasal: ¿qué haces?",a:["Inclinar cabeza atrás","Pellizcar nariz e inclinar adelante","Sonarse fuerte"],ok:1},
    {q:"Herida que no para de sangrar:",a:["Poner torniquete ya","Compresión directa + 112","Agua oxigenada"],ok:1},
    {q:"Hemorragia externa grave:",a:["Esperar que pare","Compresión directa + elevar miembro","Poner alcohol"],ok:1},
    {q:"Torniquete se usa cuando:",a:["Siempre","Solo si amputación o compresión no funciona","Nunca"],ok:1},
    
    // === INCONSCIENCIA Y PLS === Pág 46-48
    {q:"Posición lateral de seguridad sirve para:",a:["Evitar asfixia por vómito","Acelerar recuperación","Reducir dolor"],ok:0},
    {q:"Ante pérdida de conocimiento breve:",a:["Sentar inmediato","PLS si respira","Dar azúcar"],ok:1},
    {q:"Ante vómito con inconsciencia:",a:["PLS inmediato","Boca arriba","Sentado"],ok:0},
    {q:"Convulsión acabada, paciente dormido:",a:["Despertar a golpes","PLS","Sentado"],ok:1},
    {q:"Inconsciente no respira:",a:["PLS","Iniciar RCP 30:2","Solo ventilaciones"],ok:1},
    
    // === RCP ADULTO Y NIÑO === Pág 50-55 ACTUALIZADO 2026
    {q:"RCP en adulto: compresión/ventilación:",a:["15/2","30/2","20/3"],ok:1},
    {q:"RCP en niño 1-8 años:",a:["30/2 igual adulto","15/2","5 ventilaciones inicio + 30/2"],ok:2},
    {q:"RCP en lactante <1 año:",a:["30/2","15/2 con 2 dedos","5 ventilaciones + 30/2"],ok:1},
    {q:"Profundidad compresión adulto:",a:["3-4 cm","5-6 cm","7-8 cm"],ok:1},
    {q:"Profundidad compresión niño:",a:["2-3 cm","4-5 cm","5-6 cm"],ok:1},
    {q:"Profundidad compresión lactante:",a:["1-2 cm","4 cm","2-3 cm"],ok:0},
    {q:"Frecuencia compresiones RCP:",a:["60/min","100-120/min","150/min"],ok:1},
    {q:"Parada respiratoria: frecuencia ventilación:",a:["6-8/min","12/min","20/min"],ok:0},
    {q:"Niño inconsciente que no respira:",a:["5 ventilaciones iniciales + RCP","30 compresiones directas","Respirarle a cara"],ok:0},
    
    // === DEA === Pág 56-58 NUEVO 2026
    {q:"¿Cuándo usas DEA?",a:["Si no respira","Si inconsciente y no respira","Si está dormido"],ok:1},
    {q:"DEA en niño 1-8 años:",a:["No usar","Usar con parches pediátricos","Usar parches adulto"],ok:1},
    {q:"DEA en lactante <1 año:",a:["No usar nunca","Usar si no hay pediátricos","Solo manual"],ok:1},
    {q:"DEA con parche mojado:",a:["Poner igual","Secar pecho antes","No usar"],ok:1},
    {q:"DEA dice 'no tocar paciente':",a:["Seguir RCP","No tocar durante análisis/descarga","Tocar igual"],ok:1},
    
    // === OBSTRUCCIÓN VÍA AÉREA === Pág 49-50
    {q:"¿Qué haces si alguien se atraganta consciente?",a:["Dar agua","5 golpes espalda + 5 compresiones abdominales","Respiración boca-boca"],ok:1},
    {q:"Atragantado queda inconsciente:",a:["Seguir golpes","Iniciar RCP","Dar agua"],ok:1},
    {q:"Atragantamiento lactante:",a:["Heimlich normal","5 golpes espalda + 5 compresiones torácicas","Dar agua"],ok:1},
    {q:"Embarazada atragantada:",a:["Heimlich normal","Compresiones torácicas","Golpes espalda"],ok:1},
    
    // === TRAUMATISMOS === Pág 60-65
    {q:"Ante una fractura abierta:",a:["Reducir hueso","Cubrir con gasa estéril sin tocar hueso","Mover extremidad"],ok:1},
    {q:"Fractura de clavícula: inmovilización:",a:["Con férula","Cabestrillo","Estirando brazo"],ok:1},
    {q:"Trauma craneal con vómito:",a:["Normal","Signo de alarma, no mover","Dar agua"],ok:1},
    {q:"Trauma torácico con dificultad respiratoria:",a:["Normal","Grave, posible neumotórax","No importa"],ok:1},
    {q:"Fractura abierta sangrando mucho:",a:["Quitar hueso","Compresión directa alrededor herida","Elevar extremidad"],ok:1},
    {q:"Ante caída de más de 3m:",a:["No mover + 112","Levantar rápido","Mover suavemente"],ok:0},
    {q:"¿Cuándo NO debes quitar el casco a un motorista?",a:["Si respira mal","Si hay riesgo lesión cervical","Si está consciente"],ok:1},
    {q:"Trauma columna sospecha:",a:["Sentar","No mover, mantener alineación","PLS"],ok:1},
    
    // === QUEMADURAS === Pág 66-68
    {q:"Ante quemaduras de 2º grado:",a:["Agua fría 10-20 min","Hielo directo","Pomada grasa"],ok:0},
    {q:"Quemadura química en el ojo:",a:["Frotar","Lavado abundante agua 15 min","Tapar con gasa seca"],ok:1},
    {q:"Quemadura eléctrica:",a:["Tocar paciente","Cortar corriente antes de tocar","Agua inmediata"],ok:1},
    {q:"Quemadura grave >10% cuerpo:",a:["Pomada","No pomada, tapar estéril + 112","Hielo"],ok:1},
    {q:"Ropa pegada a quemadura:",a:["Arrancar","No quitar, cortar alrededor","Mojar"],ok:1},
    
    // === URGENCIAS MÉDICAS === Pág 69-72
    {q:"Síntoma de infarto:",a:["Dolor torácico opresivo","Dolor de rodilla","Visión borrosa"],ok:0},
    {q:"Síntoma de angina de pecho:",a:["Dolor rodilla","Opresión pecho que cede reposo","Dolor cabeza"],ok:1},
    {q:"Síntoma de ictus FAST:",a:["Fiebre Alta","Cara caída, Brazo débil, Habla rara","Dolor estómago"],ok:1},
    {q:"Ataque de asma grave:",a:["Agua fría","Posición sentado + inhalador","Estirar en suelo"],ok:1},
    {q:"Shock hipovolémico: posición:",a:["Sentado","Tumbado con piernas elevadas","Boca abajo"],ok:1},
    {q:"Hipoglucemia consciente:",a:["Insulina","Azúcar por boca 15g","Agua sola"],ok:1},
    {q:"Convulsión: ¿qué NO haces?",a:["Proteger cabeza","Poner objeto en boca","Cronometrar tiempo"],ok:1},
    {q:"Golpe de calor: síntoma:",a:["Piel fría y húmeda","Piel caliente y seca + confusión","Temblores"],ok:1},
    {q:"Hipotermia grave: ¿qué haces?",a:["Friccionar piel","Aislar del frío + calentar lento","Dar alcohol"],ok:1},
    {q:"Síntoma de alergia grave anafilaxia:",a:["Dificultad respirar + hinchazón","Dolor estómago","Picor de nariz"],ok:0},
    {q:"Anafilaxia adrenalina:",a:["Oral","Intramuscular muslo","Intravenosa"],ok:1},
    
    // === INTOXICACIONES Y OTROS === Pág 70-72
    {q:"Intoxicación: ¿qué NO haces?",a:["Llamar 112","Provocar vómito sin indicación","Observar paciente"],ok:1},
    {q:"Ante intoxicación por gas:",a:["Encender luz","Ventilar + salir + 112","Dar agua"],ok:1},
    {q:"Mordedura de serpiente:",a:["Cortar herida","Inmovilizar extremidad + 112","Succionar veneno"],ok:1},
    {q:"Esguince tobillo:",a:["Calor inmediata","Frío + compresión + elevación","Masaje fuerte"],ok:1},
    {q:"Deshidratación grave: síntoma:",a:["Orina abundante","Sed intensa + piel seca","Sudoración excesiva"],ok:1},
    {q:"Herida con objeto clavado:",a:["Quitar objeto","Inmovilizar objeto + 112","Presionar alrededor"],ok:1},
    {q:"Ante amputación dedo:",a:["Poner parte en hielo directo","Envolver gasa estéril + bolsa + hielo externo","Guardar seco"],ok:1},
    {q:"Picadura abeja alergia:",a:["Esperar","Adrenalina si hay + 112","Vinagre"],ok:1}
],
  medioambiente: [
    // === ETIQUETAS AMBIENTALES === Pág 15-20
    {q:"¿Qué es la etiqueta ambiental B?",a:["Eléctrico","Gasolina Euro 3/4/5/6 y Diésel Euro 4/5","Híbrido"],ok:1},
    {q:"Etiqueta B: diésel de:",a:["Euro 3","Euro 4, 5 y 6","Euro 2"],ok:1},
    {q:"Etiqueta B: gasolina de:",a:["Euro 2","Euro 3, 4, 5 y 6","Euro 1"],ok:1},
    {q:"Etiqueta B: color:",a:["Verde","Amarillo","Azul"],ok:1},
    {q:"Etiqueta C: coche gasolina de:",a:["Euro 3","Euro 4, 5 y 6","Eléctrico"],ok:1},
    {q:"Etiqueta C: diésel de:",a:["Euro 3","Euro 4, 5 y 6","Euro 2"],ok:1},
    {q:"Etiqueta C: color:",a:["Verde","Amarillo","Gris"],ok:0},
    {q:"Etiqueta ECO: incluye:",a:["Solo eléctrico","Híbridos, GLP, GNC","Diésel Euro 6"],ok:1},
    {q:"Etiqueta ECO: híbridos enchufables:",a:["No","Sí, con autonomía <40km","Sí, todos"],ok:1},
    {q:"Etiqueta ECO: gas natural:",a:["No","Sí, GNC y GLP","Solo biogás"],ok:1},
    {q:"Etiqueta ECO: color:",a:["Azul","Verde-azul","Amarillo"],ok:1},
    {q:"Coche con etiqueta 0 emite:",a:["CO2 bajo","Cero emisiones tubo escape","Solo CO"],ok:1},
    {q:"Etiqueta 0: ejemplos:",a:["Diésel Euro 6","Eléctrico, H2, PHEV ≥40km autonomía","Gasolina Euro 5"],ok:1},
    {q:"Etiqueta 0: recarga PHEV:",a:["No hace falta","Obligatoria para mantener etiqueta","Solo gas"],ok:1},
    {q:"Etiqueta A no existe porque:",a:["Todos contaminan","Ya es 0 y ECO las mejores","No hay coches"],ok:1},
    
    // === ZBE ZONAS BAJAS EMISIONES 2026 === Pág 85-87
    {q:"¿Qué es ZBE?",a:["Zona azul","Zona bajas emisiones","Zona bus"],ok:1},
    {q:"¿Qué prohíbe ZBE sin etiqueta?",a:["Nada","Acceso según ciudad y horario","Aparcar"],ok:1},
    {q:"Etiqueta 0: ventaja ZBE:",a:["Ninguna","Acceso libre + aparcar gratis","Ha de pagar"],ok:1},
    {q:"Etiqueta ECO: ventaja ZBE:",a:["Gratis ZBE","Acceso libre","Nada"],ok:1},
    {q:"Etiqueta C: puede entrar ZBE?",a:["Nunca","Depende ciudad/hora","Siempre"],ok:1},
    {q:"Etiqueta B: exenta ZBE?",a:["Siempre","Depende ciudad, cada vez más restricciones","Nunca"],ok:1},
    {q:"Etiqueta B: ventaja ZBE:",a:["Gratis ZBE","Acceso cada vez más limitado","Nada"],ok:1},
    {q:"Etiqueta 0: aparcamiento ZBE?",a:["Nunca gratis","Puede ser gratis según ayuntamiento","Siempre paga"],ok:1},
    {q:"Etiqueta 0: exento impuesto circulación?",a:["Nunca","Depende ayuntamiento","Siempre"],ok:1},
    {q:"Moto sin etiqueta en ZBE 2026:",a:["Prohibido","Permitido hasta 2027","Solo de noche"],ok:1},
    {q:"Multa entrar ZBE sin permiso:",a:["50€","200€","Solo aviso"],ok:1},
    {q:"Cómo saber si puedo entrar ZBE:",a:["Preguntar","Web DGT + etiqueta parabrisas","Solo ITV"],ok:1},
    
    // === CONDUCCIÓN EFICIENTE === Pág 25-35
    {q:"Conducción eficiente reduce:",a:["Solo ruido","Consumo + CO2 hasta 15%","Velocidad"],ok:1},
    {q:"¿Cuándo debes apagar motor?",a:["Nunca","Parado >30 segundos","Solo en semáforo"],ok:1},
    {q:"Cambiar marcha antes 2500 rpm gasolina:",a:["Gasta más","Ahorra + contamina menos","No cambia"],ok:1},
    {q:"Cambiar marcha antes 2000 rpm diésel:",a:["Fuerza motor","Ahorra + contamina menos","Rompe coche"],ok:1},
    {q:"Velocidad constante ahorra:",a:["Nada","Combustible + emisiones","Solo tiempo"],ok:1},
    {q:"Marcha larga con rpm bajas:",a:["Fuerza motor","Conducción eficiente","Rompen coche"],ok:1},
    {q:"Frenar con motor:",a:["Gasta más","Ahorra combustible + frenos","No cambia"],ok:1},
    {q:"Anticipar tráfico:",a:["No sirve","Reduce frenadas + consumo","Aumenta velocidad"],ok:1},
    {q:"Arrancar y marchar sin esperar:",a:["Mal","Correcto, no calentar parado","Solo frío"],ok:1},
    {q:"Dejar ralentí calentando:",a:["Necesario","Contamina y gasta innecesario","Obligatorio invierno"],ok:1},
    {q:"Apagar motor bajando cuesta:",a:["Correcto","Peligroso, pierdes dirección/frenos","Obligatorio"],ok:1},
    {q:"Usar marcha adecuada:",a:["No importa","Reduce emisiones + consumo","Aumenta velocidad"],ok:1},
    {q:"Conducir a revoluciones altas:",a:["Ahorra","Contamina + gasta más","No afecta"],ok:1},
    
    // === VELOCIDAD Y CONSUMO === Pág 30-32
    {q:"Circular a 120 vs 100 km/h:",a:["Mismo consumo","Gasta +30% combustible","Gasta -10%"],ok:1},
    {q:"Conducción brusca:",a:["Ahorra","Aumenta CO2 hasta 40%","No afecta"],ok:1},
    {q:"Acelerar bruscamente:",a:["Ahorra","Aumenta contaminación","No afecta"],ok:1},
    {q:"Motor frío consume:",a:["Menos","Más hasta 50%","Igual"],ok:1},
    
    // === NEUMÁTICOS Y CARGA === Pág 36-38
    {q:"Neumáticos desinflados provocan:",a:["Menos consumo","Más consumo + CO2 + desgaste","Menos ruido"],ok:1},
    {q:"Neumáticos en buen estado:",a:["No importa","Reducen consumo + seguridad","Aumentan ruido"],ok:1},
    {q:"Revisar presión neumáticos:",a:["Cada año","Cada mes en frío","Solo ITV"],ok:1},
    {q:"Llevar peso innecesario:",a:["No afecta","Aumenta consumo 6% cada 100kg","Reduce consumo"],ok:1},
    {q:"Carga en el techo/baca:",a:["Reduce consumo","Aumenta resistencia + consumo 15%","No afecta"],ok:1},
    {q:"Cerrar ventanas autopista:",a:["Aumenta ruido","Reduce resistencia aerodinámica","No cambia"],ok:1},
    
    // === CLIMATIZACIÓN === Pág 39-40
    {q:"Usar aire acondicionado:",a:["Reduce consumo","Aumenta consumo 5-10%","No afecta"],ok:1},
    {q:"A/C a 21º vs 18º:",a:["Igual consumo","Menor consumo","Mayor confort"],ok:1},
    
    // === MANTENIMIENTO === Pág 41-45
    {q:"Cambio de aceite tardío:",a:["Mejora motor","Contamina más + daña motor","No afecta"],ok:1},
    {q:"Cambiar filtro aire sucio:",a:["No sirve","Reduce consumo hasta 10%","Aumenta potencia"],ok:1},
    {q:"Revisión ITVE al día:",a:["No afecta","Reduce emisiones + consumo","Aumenta consumo"],ok:1},
    {q:"Mantenimiento coche:",a:["No afecta medio ambiente","Clave para contaminar menos","Solo para ITV"],ok:1},
    {q:"Bujías gastadas gasolina:",a:["No afecta","Aumenta consumo + emisiones","Mejora potencia"],ok:1},
    
    // === HÍBRIDOS Y ELÉCTRICOS === Pág 46-50 NUEVO 2026
    {q:"Híbrido no enchufable consume:",a:["Igual que gasolina","Menos en ciudad por regeneración","Más siempre"],ok:1},
    {q:"PHEV autonomía eléctrica 50km:",a:["Etiqueta ECO","Etiqueta 0","Etiqueta C"],ok:1},
    {q:"Eléctrico puro emisiones:",a:["CO2 bajo","Cero emisiones tubo escape","Solo CO"],ok:1},
    {q:"Freno regenerativo eléctrico:",a:["No existe","Recarga batería al decelerar","Solo híbridos"],ok:1},
    {q:"Cargar eléctrico noche:",a:["Más caro","Más barato + energía renovable","Igual"],ok:1},
    {q:"GLP/GNC vs gasolina:",a:["Contamina más","Contamina menos CO2 + NOx","Igual"],ok:1},
    
    // === SITUACIONES PRÁCTICAS === Pág 47-50
    {q:"Arrancar en frío:",a:["Acelerar fuerte","Arrancar y salir suave sin revolucionar","Esperar 5 min"],ok:1},
    {q:"Aparcar cuesta abajo:",a:["Punto muerto","Marcha atrás + freno mano","Solo freno mano"],ok:1},
    {q:"Aparcar cuesta arriba:",a:["Punto muerto","1ª marcha + freno mano","Solo freno mano"],ok:1},
    {q:"Repostar motor encendido:",a:["Correcto","Prohibido + peligroso","Obligatorio"],ok:1},
    {q:"Móvil repostando:",a:["Permitido","Prohibido por riesgo chispa","Solo llamadas"],ok:1}
 ]
};

// 160 CASOS REALES DE CONDUCCIÓN
const SITUACIONES= {
  clima: [
    {q:"Lluvia intensa: ¿qué haces?",a:["Acelero para salir","Reduzco velocidad y aumento distancia","Freno en seco"],ok:1},
    {q:"Niebla espesa:",a:["Luces largas","Antiniebla + cortas","Sin luces"],ok:1},
    {q:"Hielo en la calzada:",a:["Freno fuerte","Marchas largas sin frenar brusco","Acelero"],ok:1},
    {q:"Charcos grandes:",a:["Acelera","Evita y reduce velocidad","Frena fuerte"],ok:1},
    {q:"Viento lateral fuerte:",a:["Sujeta el volante firme","Deja ir el volante","Acelera"],ok:0},
    {q:"Nieve en la carretera:",a:["Acelera","Cadenas o neumáticos M+S + marcha larga","Frena brusco"],ok:1},
    {q:"Granizo:",a:["Para bajo puente","Sigue igual","Acelera para pasar rápido"],ok:0},
    {q:"Sol de cara que deslumbra:",a:["Apaga luces","Visera + gafas sol","Acelera"],ok:1},
    {q:"Asfalto muy caliente:",a:["Acelera","Vigila neumáticos, reduce velocidad","Frena brusco"],ok:1},
    {q:"Lluvia después de sequía:",a:["Conducción normal","Muy peligroso, el asfalto resbala más","Acelera"],ok:1},
    {q:"Niebla en túnel:",a:["Apaga luces","Antiniebla + cortas, distancia grande","Luces largas"],ok:1},
    {q:"Tormenta con rayos:",a:["Acelera","Sigue, coche hace de jaula Faraday","Para en campo abierto"],ok:1},
    {q:"Viento en puente:",a:["Sujeta fuerte volante, reduce","Acelera para pasar","Deja ir volante"],ok:0},
    {q:"Balsa helada:",a:["Frena encima","Evita o pasa muy lento sin girar volante","Acelera"],ok:1},
    {q:"Lluvia + línea blanca:",a:["Pisa línea","Evita pisar líneas, resbalan","Acelera"],ok:1},
    {q:"Niebla + salida autopista:",a:["Acelera para salir","Reduce mucho antes, señaliza pronto","Corta carriles"],ok:1},
    {q:"Sol bajo en horizonte:",a:["Apaga luces","Visera, aumenta distancia","Acelera"],ok:1},
    {q:"Lluvia + motocicleta al lado:",a:["Adelanta rápido","Aumenta distancia lateral, el agua le deslumbra","Toca claxon"],ok:1},
    {q:"Viento + camión adelantando:",a:["Acelera","Sujeta volante, mantén distancia","Cambia carril brusco"],ok:0},
    {q:"Nieve honda:",a:["Acelera fuerte","Marcha larga, gas suave, sin giros bruscos","Frena motor brusco"],ok:1},
    {q:"Granizada en autopista:",a:["Acelera para salir","Reduce mucho, distancia x3, manos firmes al volante","Frena brusco"],ok:1},
    {q:"Cristales empañados por dentro:",a:["Abrir ventana y A/C desempañar","Poner calor a máximo sin aire","Seguir igual"],ok:0},
    {q:"Chubasco repentino en zona urbana:",a:["Acelera","Reduce, vigila pasos de peatón resbaladizos","Frena encima marcas blancas"],ok:1},
    {q:"Tormenta de arena:",a:["Luces largas","Antiniebla + reducir velocidad, cerrar ventilación","Apagar luces"],ok:1},
    {q:"Hielo negro en puente:",a:["Frenar suave","No frenar ni girar, mantener trayectoria","Acelerar para pasar rápido"],ok:1},
    {q:"Lluvia + noche:",a:["Conducción normal","Aumentar distancia, vigilar deslumbramientos","Poner largas"],ok:1},
    {q:"Viento fuerte + moto delante:",a:["Adelantar rápido","Mantener distancia lateral, puede moverse brusco","Tocar claxon"],ok:1},
    {q:"Niebla + curva cerrada:",a:["Tocar claxon","Reducir antes de la curva, cortas + antiniebla","Largas"],ok:1},
    {q:"Asfalto mojado + frenada:",a:["Frenar brusco","Frenar progresivo, evitar bloqueo","Acelerar"],ok:1},
    {q:"Nieve derretida en arcén:",a:["Circular por arcén","Evitar salpicar peatones, reducir","Acelerar"],ok:1},
    {q:"Calor extrema y atasco:",a:["Apagar motor","Vigilar temperatura, mantener distancia","Poner calefacción"],ok:1},
    {q:"Niebla + salida túnel:",a:["Acelerar al salir","Adaptar vista, reducir antes de entrar","Largas dentro túnel"],ok:1},
    {q:"Lluvia + balsa de agua:",a:["Pasar por medio rápido","Evitar si es profunda, pasar lento por lateral","Frenar dentro del agua"],ok:1},
    {q:"Viento + remolque:",a:["Sujetar firme, reducir velocidad","Ir normal","Acelerar para estabilizar"],ok:0},
    {q:"Sol de tarde y asfalto mojado:",a:["Largas","Cortas, aumentar distancia, visera","Apagar luces"],ok:1},
    {q:"Nieve + bajada pronunciada:",a:["Frenar brusco","Marcha corta, freno motor, sin bloquear ruedas","Punto muerto"],ok:1},
    {q:"Niebla + cambio de carril:",a:["Cambiar rápido","Señalizar antes, mirar doble, cambiar lento","Sin señalizar"],ok:1},
    {q:"Lluvia + bicicleta al lado:",a:["Adelantar pegado","Más distancia lateral, vigilar salpicaduras","Tocar claxon"],ok:1},
    {q:"Hielo + semáforo en verde:",a:["Acelerar fuerte","Arrancar suave, marcha larga","Frenar en el cruce"],ok:1},
    {q:"Viento lateral + salida túnel:",a:["Sujetar volante firme, reducir","Ir igual","Acelerar para compensar"],ok:0}
  ],
  urbano: [
    {q:"Peatón cruza fuera paso cebra:",a:["Toca claxon","Reduce, prepárate para parar","Acelera"],ok:1},
    {q:"Niño corre hacia calzada:",a:["Toca claxon","Frena, prevé que puede correr","Acelera"],ok:1},
    {q:"Bici va por acera:",a:["Toca claxon","Reduce, puede bajar a calzada","Acelera"],ok:1},
    {q:"Bus para en parada:",a:["Avanza por derecha","Reduce, puede cruzar gente","Acelera"],ok:1},
    {q:"Taxi para en doble fila:",a:["Toca claxon","Cambia carril con precaución","Pasa por acera"],ok:1},
    {q:"Puerta coche aparcado se abre:",a:["Acelera","Reduce, mira retrovisores antes","Toca claxon"],ok:1},
    {q:"Patinete eléctrico zigzaguea:",a:["Avanza rápido","Aumenta distancia, prevé giro brusco","Toca claxon largo"],ok:1},
    {q:"Perro cruza carretera:",a:["Toca claxon fuerte","Reduce, puede girar el perro","Acelera"],ok:1},
    {q:"Moto hace carril-bus:",a:["Ciérrale paso","Mantén carril, no cierres","Acelera para adelantar"],ok:1},
    {q:"Coche aparca en batería:",a:["Acelera para pasar","Reduce, puede salir marcha atrás","Toca claxon"],ok:1},
    {q:"Peatón habla teléfono cruzando:",a:["Toca claxon","Reduce, no te verá","Acelera"],ok:1},
    {q:"Grupo gente ocupa acera y baja a calzada:",a:["Acelera","Reduce, cede paso","Toca claxon largo"],ok:1},
    {q:"Coche escuela con L delante:",a:["Avanza rápido","Aumenta distancia, puede frenar brusco","Toca claxon"],ok:1},
    {q:"Camión basura marcha atrás:",a:["Acelera para pasar","Para, luz amarilla girando","Toca claxon"],ok:1},
    {q:"Ciclista sin casco en acera:",a:["Acelera","Reduce, puede bajar a calzada","Toca claxon"],ok:1},
    {q:"Semáforo en ámbar y estás cerca:",a:["Frena fuerte","Si no puedes parar seguro, pasa","Acelera"],ok:1},
    {q:"Cruce sin señal y coche derecha llega:",a:["Acelera","Cede paso al de la derecha","Toca claxon"],ok:1},
    {q:"Glorieta y coche dentro no sale:",a:["Entra","Espera que salga, él tiene preferencia","Toca claxon"],ok:1},
    {q:"Paso cebra elevado:",a:["Acelera","Reduce mucho, puede haber gente","Frena encima"],ok:1},
    {q:"Coche policía aparcado con luces:",a:["Acelera","Reduce mucho, prevé agente en vía","Cambia carril brusco"],ok:1},
    {q:"Peatón con paraguas cruza:",a:["Acelera","Reduce, no ve bien por lados","Tocar claxon"],ok:1},
    {q:"Coche escuela hace maniobra:",a:["Tocar claxon","Aumentar distancia, paciencia","Adelantar pegado"],ok:1},
    {q:"Furgoneta hace carga en doble fila:",a:["Pasar por acera","Cambiar carril con precaución, mirar ciclista","Tocar claxon largo"],ok:1},
    {q:"Niño con pelota en acera:",a:["Acelera","Reduce, puede salir detrás coche","Tocar claxon"],ok:1},
    {q:"Semáforo peatones en verde intermitente:",a:["Acelerar","No entrar si no puedes cruzar entero","Parar sobre paso"],ok:1},
    {q:"Moto filtrando entre coches:",a:["Cerrarle paso","Mantener trayectoria, mirar retrovisores","Abrir puerta"],ok:1},
    {q:"Bus escolar para:",a:["Adelantar","Reducir, niños pueden cruzar","Tocar claxon"],ok:1},
    {q:"Glorieta pequeña y coche grande dentro:",a:["Entrar","Ceder paso, él tiene prioridad dentro","Tocar claxon"],ok:1},
    {q:"Coche aparca en línea y pone marcha atrás:",a:["Acelera para pasar","Parar, dejar maniobrar","Tocar claxon"],ok:1},
    {q:"Ciclista indica giro con brazo:",a:["Adelantarle","Respetar señal, ceder paso","Tocar claxon"],ok:1},
    {q:"Peatón cruza con semáforo rojo:",a:["Tocar claxon","Frenar, ceder paso por seguridad","Acelerar"],ok:1},
    {q:"Taxi enciende luz libre:",a:["Acelera","Reducir, puede parar de golpe","Cerrarle paso"],ok:1},
    {q:"Coche sale de garaje sin ver:",a:["Acelera","Reducir, tocar claxon suave","Pasar pegado"],ok:1},
    {q:"Patinete sube a acera:",a:["Tocar claxon","Reducir, puede caer a calzada","Adelantar rápido"],ok:1},
    {q:"Cruce con agente regulando:",a:["Hacer caso semáforo","Hacer caso agente, ignorar semáforo","Seguir recto"],ok:1},
    {q:"Coche detrás muy cerca en atasco:",a:["Frenar brusco","Mantener distancia, evitar frenadas secas","Acelerar"],ok:1},
    {q:"Perro atado cruza tirando correa:",a:["Acelera","Reducir, puede atravesar entero","Tocar claxon"],ok:1},
    {q:"Peatón habla por móvil y no mira:",a:["Tocar claxon largo","Reducir, preparar parada","Acelerar"],ok:1},
    {q:"Camión girando derecha en cruce:",a:["Adelantarle por derecha","Esperar, tiene ángulo muerto grande","Cortarle giro"],ok:1},
    {q:"Paso de peatones sin pintar pero frecuentado:",a:["Acelerar","Reducir, ceder paso si gente espera","Tocar claxon"],ok:1}
  ],
  carretera: [
    {q:"Has de hacer cambio sentido en carretera:",a:["Donde sea","Solo donde lo permite señal y visibilidad","En rotonda siempre"],ok:1},
    {q:"Coche lento delante en curva:",a:["Adelanta en curva","Espera recta con visibilidad","Toca claxon"],ok:1},
    {q:"Línea continua + coche lento:",a:["Avanza","No adelantar nunca","Toca claxon"],ok:1},
    {q:"Camión sube lento cuesta:",a:["Avanza en cuesta","Espera arriba si hace falta","Toca claxon"],ok:1},
    {q:"Animal salvaje en arcén:",a:["Toca claxon","Reduce, puede saltar","Acelera"],ok:1},
    {q:"Coche averiado en arcén:",a:["Acelera","Reduce, aléjate del arcén","Cambia carril brusco"],ok:1},
    {q:"Carretera cortada, desvío:",a:["Sigue recto","Sigue señales amarillas desvío","Ignora señales"],ok:1},
    {q:"Coche detrás te hace luces:",a:["Frena","Mantén velocidad, cambia carril cuando puedas","Acelera"],ok:1},
    {q:"Has de salir próxima salida y vas carril izquierdo:",a:["Corta carriles","Cambia con tiempo, espejos + ángulo muerto","Sigue recto"],ok:1},
    {q:"Incorporación con carril aceleración corto:",a:["Para al final","Acelera fuerte para igualar velocidad","Entra lento"],ok:1},
    {q:"Túnel sin luz:",a:["Apaga luces","Enciende cruce inmediato","Sigue sin luces"],ok:1},
    {q:"Puente estrecho y viene coche:",a:["Acelera","El que está más cerca cede","Toca claxon"],ok:1},
    {q:"Desprendimiento piedras en vía:",a:["Acelera","Reduce, esquiva si seguro","Frena encima piedras"],ok:1},
    {q:"Carretera con curvas y ciclista:",a:["Avanza en curva","Espera recta, 1.5m distancia","Toca claxon"],ok:1},
    {q:"Señal ‘fin límite velocidad’:",a:["Acelera a 140","Sigue límite genérico vía","Para"],ok:1},
    {q:"Coche adelanta en zona prohibida:",a:["Ciérrale paso","Mantén carril, no aceleres","Acelera"],ok:1},
    {q:"Incorporación por carril lento:",a:["Para","Acelera para igualar velocidad, cede","Entra cortando"],ok:1},
    {q:"Carretera estrecha y viene coche:",a:["Acelera","El que puede apartarse cede","Toca claxon"],ok:1},
    {q:"Señal ‘ceda el paso’ y no viene nadie:",a:["Para siempre","Reduce, mira, si libre sigue","Acelera"],ok:1},
    {q:"Señal ‘STOP’ y visibilidad buena:",a:["No pares","Parada total, después mira y sigue","Acelera"],ok:1},
    {q:"Señal ‘curva peligrosa’:",a:["Mantener velocidad","Reducir antes de entrar, no frenar dentro","Acelerar a la salida"],ok:1},
    {q:"Coche lento en carril derecho autopista:",a:["Adelantar por izquierda","Mantener carril, no adelantar por derecha","Tocar claxon"],ok:1},
    {q:"Línea discontinua y viene coche de cara:",a:["Adelantar rápido","Esperar, no adelantar","Tocar largas"],ok:1},
    {q:"Bajada larga y cargado:",a:["Punto muerto","Marcha corta, freno motor","Frenar constante"],ok:1},
    {q:"Coche adelanta y no vuelve al carril:",a:["Cerrarle paso","Reducir, dejar que vuelva","Acelerar"],ok:1},
    {q:"Señal ‘viento lateral’:",a:["Sujetar volante, reducir","Ir igual","Acelerar"],ok:0},
    {q:"Túnel largo y atasco:",a:["Apagar luces","Luces encendidas, distancia, sin cambiar carril","Avituallamiento"],ok:1},
    {q:"Carretera comarcal sin arcén:",a:["Circular por medio","Pegarte a la derecha, vigilar ciclistas","Adelantar en curva"],ok:1},
    {q:"Coche con remolque balancea:",a:["Adelantar rápido","Aumentar distancia, no provocar corrientes aire","Tocar largas"],ok:1},
    {q:"Señal ‘fin autopista’:",a:["Acelerar","Reducir, adaptar a nueva vía","Seguir igual"],ok:1},
    {q:"Incorporación y carril lleno:",a:["Parar al final","Ceder paso, esperar hueco seguro","Entrar cortando"],ok:1},
    {q:"Carretera con firme dañado:",a:["Acelerar para salir","Reducir, agarrar volante firme","Cambiar carril brusco"],ok:1},
    {q:"Coche detrás adelanta en zona prohibida:",a:["Cerrarle paso","Mantener velocidad, no acelerar","Frenar delante"],ok:1},
    {q:"Señal ‘cruce caminos’:",a:["Acelerar","Reducir, mirar laterales","Tocar claxon"],ok:1},
    {q:"Puente móvil y se abre:",a:["Acelerar para pasar","Parar antes barrera, respetar señal","Rodear barrera"],ok:1},
    {q:"Carretera estrecha y bicicleta:",a:["Adelantar tocando claxon","1.5m distancia, esperar recta","Adelantar en curva"],ok:1},
    {q:"Señal ‘animales sueltos’:",a:["Ir igual","Reducir, mirar arcenes","Acelerar"],ok:1},
    {q:"Coche averiado ocupa medio carril:",a:["Pasar pegado","Cambiar carril o reducir mucho","Tocar largas"],ok:1},
    {q:"Carretera con obras y carril desviado:",a:["Seguir GPS","Hacer caso señales naranja, reducir","Ir por arcén"],ok:1},
    {q:"Señal ‘prohibido adelantar’ y vas lento:",a:["Adelantar igual","Respetar señal, no adelantar","Tocar claxon"],ok:1}
  ],
    emergencia: [
    {q:"Ambulancia detrás con luces y sonido:",a:["Acelera","Apártate a derecha y para si hace falta","Toca claxon"],ok:1},
    {q:"Coche en llamas delante:",a:["Acelera para pasar","Para lejos, avisa 112, no te acerques","Abre capó"],ok:1},
    {q:"Accidente con herido en vía:",a:["Sigue","Para, señaliza, avisa 112, no muevas herido","Mueve herido"],ok:1},
    {q:"Has pinchado rueda en autopista:",a:["Para en carril derecho","Arcén derecho, chaleco + triángulos a 50m","Para en carril izquierdo"],ok:1},
    {q:"Coche pierde potencia y se para:",a:["Para en medio","Arcén, luces emergencia, avisa","Sigue sin gas"],ok:1},
    {q:"Humo sale motor:",a:["Acelera para llegar","Para, apaga motor, no abras capó inmediato","Abre tapón refrigerante"],ok:1},
    {q:"Frenada falla bajando puerto:",a:["Acelera","Usa freno motor + arcén seguridad","Apaga motor"],ok:1},
    {q:"Conductor se encuentra mal:",a:["Sigue","Para seguro, llama 112, coloca en posición lateral seguro","Sigue"],ok:1},
    {q:"Viajero tiene ataque epiléptico:",a:["Acelera","Para seguro, protege, no le sujetes, llama 112","Sigue"],ok:1},
    {q:"Coche vuelca delante:",a:["Acelera para pasar","Para lejos, avisa 112, no muevas ocupantes","Sácalos tú"],ok:1},
    {q:"Fuga combustible:",a:["Acelera","Para, apaga motor, no fumes, avisa 112","Fuma para ver de dónde sale"],ok:1},
    {q:"Piedra rompe parabrisas:",a:["Acelera","Reduce, para seguro, tapa agujero si hace falta","Sigue sin ver"],ok:1},
    {q:"Airbag salta sin choque:",a:["Acelera","Para seguro, apaga motor","Sigue"],ok:1},
    {q:"Neumático revienta a 120km/h:",a:["Frena fuerte","Sujeta volante firme, reduce gas sin frenar brusco","Frena a fondo"],ok:1},
    {q:"Pedal freno se hunde sin frenar:",a:["Acelera","Freno motor + freno mano progresivo, arcén","Apaga motor en marcha"],ok:1},
    {q:"Dirección se bloquea:",a:["Acelera","Para lo más rápido posible seguro, luces emergencia","Sigue"],ok:1},
    {q:"Coche se incendia con gente dentro:",a:["Abre tú puertas","Ayuda a salir, llama 112, no arriesgues vida","Sigue"],ok:1},
    {q:"Peatón atropellado:",a:["Sigue","Para, señaliza, avisa 112, no muevas","Muévelo a acera"],ok:1},
    {q:"Animal grande embestido y vivo en vía:",a:["Acelera","Señaliza, avisa 112, no te acerques","Sácalo tú"],ok:1},
    {q:"Has de socorrer pero no sabes primeros auxilios:",a:["No hagas nada","Señaliza, avisa 112, tranquiliza herido, espera ayuda","Mueve herido"],ok:1},
    {q:"Coche con humo blanco denso por el tubo:",a:["Acelera","Para seguro, apaga motor, avisa grúa","Abre tapón aceite"],ok:1},
    {q:"Conductor delante se duerme:",a:["Tocar largas","Aumentar distancia, avisar 112 si peligro","Adelantar rápido"],ok:1},
    {q:"Piedra en la vía y no puedes esquivar:",a:["Frenar brusco","Sujetar volante, pasar por encima recto","Girar brusco"],ok:1},
    {q:"Airbag no salta en choque leve:",a:["Seguir","Parar, revisar heridos, avisar 112","Tocar claxon"],ok:1},
    {q:"Pedal acelerador se atasca:",a:["Apagar motor en marcha","Punto muerto, frenar progresivo, arcén","Acelerar más"],ok:1},
    {q:"Peatón cae a la vía:",a:["Acelera para pasar","Para, señaliza, avisa 112","Moverlo tú"],ok:1},
    {q:"Coche con matrícula extranjera perdido:",a:["Tocar claxon","Reducir, dejar espacio, no presionar","Adelantar pegado"],ok:1},
    {q:"Batería se descarga y coche se para:",a:["Parar en el carril","Arcén, luces emergencia, triángulos 50m","Seguir sin luces"],ok:1},
    {q:"Conductor delante lanza objeto:",a:["Acelera para pasar","Aumentar distancia, avisar si peligro","Tocar claxon"],ok:1},
    {q:"Rueda de repuesto cae del coche delante:",a:["Frenar brusco","Reducir, esquivar si seguro, avisar","Pasar por encima"],ok:1},
    {q:"Coche con puerta abierta circulando:",a:["Adelantar","Tocar claxon suave, avisar","Ignorar"],ok:1},
    {q:"Has de hacer RCP y no sabes:",a:["No hacer nada","Llamar 112, seguir instrucciones operador","Mover herido"],ok:1},
    {q:"Coche con humo negro y pérdida potencia:",a:["Acelerar","Para seguro, apaga motor","Seguir hasta taller"],ok:1},
    {q:"Peatón sangrando por cabeza:",a:["Moverlo a acera","No mover, tapar herida, avisar 112","Dar agua"],ok:1},
    {q:"Coche con luz de freno fundida:",a:["Ignorar","Aumentar distancia, avisar con claxon leve","Tocar largas"],ok:1},
    {q:"Has de evacuar coche rápido:",a:["Salir por ventana","Cortacinturón + rompevidrio, salir ordenado","Abrir puerta normal"],ok:0},
    {q:"Coche con matrícula tapada:",a:["Adelantar","Aumentar distancia, no perseguir","Cerrarle paso"],ok:1},
    {q:"Conductor tiene ataque de pánico:",a:["Seguir","Para seguro, tranquilizar, avisar si hace falta","Presionar para seguir"],ok:1},
    {q:"Señal acústica continua del coche:",a:["Ignorar","Para seguro, revisa cuadro, avisa grúa","Acelerar"],ok:1},
    {q:"Has de señalizar accidente de noche:",a:["Poner triángulos a 10m","Triángulos 50m vía, 100m autopista, chaleco","Solo luces emergencia"],ok:1}
  ]
};

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

// ===== ESTADO + LÓGICA =====
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
  console.log("GasDrive DGT ES V8.5 cargado");
  console.log("PREGUNTAS:", typeof PREGUNTAS!== 'undefined'? 'OK' : 'FALTA');
  console.log("SITUACIONES:", typeof SITUACIONES!== 'undefined'? 'OK' : 'FALTA');

  // 1. Mostrar intro SIEMPRE al abrir
  mostrarIntro();

  // 2. Cargar datos básicos
  actualizarCoins();
  actualizarMensajeMotivacional();

  // 3. CARGAR TEMARIO POR DEFECTO - Así al quitar la intro ya está todo listo
  cargarTemario();

  // 4. Precargar solo la primera pregunta de test para que vaya rápido cuando cambies de tab
  if(typeof PREGUNTAS!== 'undefined') {
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

function cargarPregunta(cat) {
  const s = estado.test[cat];
  const preguntas = barajarArray(PREGUNTAS[cat] || []);
  if(!preguntas || preguntas.length === 0) {
    document.getElementById(`test-${cat}-pregunta`).textContent = 'No hay preguntas en esta categoria';
    return;
  }
  const pOriginal = preguntas[s.idx % preguntas.length];
  const opcionesBarajadas = barajarArray(pOriginal.a);
  const textoCorrecto = pOriginal.a[pOriginal.ok];
  const nuevoIndexCorrecto = opcionesBarajadas.indexOf(textoCorrecto);
  const p = {...pOriginal, a: opcionesBarajadas, ok: nuevoIndexCorrecto};
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

  // === REGISTRAR PROGRESO DGT ===
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

function cargarSituacion(cat) {
  if(!cat) cat = sitCategoriaActiva;
  const s = estado.sit[cat];
  const casos = barajarArray(SITUACIONES[cat] || []);
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

  // === REGISTRAR PROGRESO CASOS ===
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

function iniciarExamen(e) {
  const todas = [
...PREGUNTAS.general,
...PREGUNTAS.senales,
...PREGUNTAS.normas,
...PREGUNTAS.mecanica,
...SITUACIONES.clima
  ];
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

  // === REGISTRAR EXAMEN EN PROGRESO ===
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

// === NUEVO: GESTIÓN DE TIEMPO EN TEMARIOS ===
function abrirPDF(id) {
  const temario = PROGRESO.temarios[id];
  if (!temario) return;

  // Marca cuando entra
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
    background:#0a0a0a;z-index:9999;
    display:flex;flex-direction:column;
  `;
  modal.innerHTML = `
    <div style="background:#1a1a1a;padding:12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #333">
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

  // Calcula tiempo dedicado en segundos
  const tiempoSesion = Math.floor((Date.now() - temario.ultimaEntrada) / 1000);
  temario.tiempo += tiempoSesion;

  // 100% por temario = 170 min = 10200 segundos
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

// ===== TAB PROGRESO - AUTOESCUELA ONLINE CON MENSAJES INTELIGENTES =====
function pintarProgreso() {
  const contenedor = document.getElementById('progreso-lista');
  if(!contenedor) return;

  // === TESTS ===
  const testsTotal = 630;
  let testsUnicas = 0;
  Object.values(PROGRESO.tests).forEach(t => testsUnicas += t.unicas.length);
  const pctTests = Math.min(100, Math.floor((testsUnicas / testsTotal) * 100));

  // === CASOS ===
  const casosTotal = 80;
  let casosUnicas = 0;
  Object.values(PROGRESO.casos).forEach(c => casosUnicas += c.unicas.length);
  const pctCasos = Math.min(100, Math.floor((casosUnicas / casosTotal) * 100));

  // === EXÁMENES ===
  const ex = PROGRESO.examenes;
  let pctExamen = ex.realizados >= 3? Math.round((ex.aprobados / ex.realizados) * 100) : 0;
  if (ex.historial.slice(-3).every(n => n >= 27)) pctExamen = Math.min(100, pctExamen + 10);

  // === TEMARIOS - 100% = 2h 50min POR TEMARIO = 14h 10min TOTAL ===
  const temariosData = PROGRESO.temarios;
  const tiempoTotalTemarios =
    temariosData.senales.tiempo +
    temariosData.normas.tiempo +
    temariosData.mecanica.tiempo +
    temariosData.auxilios.tiempo +
    temariosData.medioambiente.tiempo;

  // 5 temarios x 170 min = 850 min = 51000 segundos = 100%
  const pctTemarios = Math.min(100, Math.floor((tiempoTotalTemarios / 51000) * 100));

  // === TOTAL GLOBAL ===
  const pctTotal = Math.floor((pctTests + pctCasos + pctExamen + pctTemarios) / 4);

  document.getElementById('progreso-total').textContent = pctTotal + '%';
  document.getElementById('progreso-total-bar').style.width = pctTotal + '%';

  // === MENSAJE INTELIGENTE MEJORADO CON PÁGINAS ===
  let msg = '';
  if (pctTotal < 50) msg = 'Empieza por los Tests. Domina lo básico';
  else if (pctTotal < 70) {
    // Busca la categoría más débil y muestra el subtema específico
    let catDebil = '', minPct = 100;
    const nombres = {general:'General', senales:'Señales', normas:'Normas', mecanica:'Mecánica', auxilios:'Auxilios', medioambiente:'Medio Ambiente'};
    Object.keys(PROGRESO.tests).forEach(k => {
      const t = PROGRESO.tests[k];
      const pct = t.total? Math.round((t.aciertos / t.total) * 100) : 0;
      if (pct < minPct && t.total >= 5) { minPct = pct; catDebil = k; }
    });

    // Busca el mensaje específico del subtema débil
    if (catDebil && SUBTEMAS_DEBILES[catDebil]) {
      const subtemas = SUBTEMAS_DEBILES[catDebil];
      let subMsg = subtemas.find(s => minPct >= s.pct) || subtemas[subtemas.length - 1];
      msg = `⚠️ Repasa: ${subMsg.msg}`;
    } else {
      msg = `Refuerza ${nombres[catDebil] || catDebil}: ${minPct}% acierto`;
    }
  }
  else if (pctTotal < 80) msg = 'Casi listo. Aprueba 2 exámenes seguidos con 27+';
  else msg = '¡PREPARADO! Ya puedes presentarte a la DGT';
  document.getElementById('progreso-mensaje').textContent = msg;

  // BOTÓN DGT
  document.getElementById('btn-dgt-oficial').disabled = pctTotal < 80;

   // DETALLE TIEMPO
  const tiempoSenales = Math.floor(temariosData.senales.tiempo / 60);
  const tiempoNormas = Math.floor(temariosData.normas.tiempo / 60);
  const tiempoMecanica = Math.floor(temariosData.mecanica.tiempo / 60);
  const tiempoAuxilios = Math.floor(temariosData.auxilios.tiempo / 60);
  const tiempoMedio = Math.floor(temariosData.medioambiente.tiempo / 60);
  const tiempoTotalHoras = Math.floor(tiempoTotalTemarios / 3600);
  const tiempoTotalMin = Math.floor((tiempoTotalTemarios % 3600) / 60);

   // === MENSAJES INDIVIDUALES POR TEST CON PÁGINAS ===
  function getMensajeTest(cat) {
    const t = PROGRESO.tests[cat];
    if (t.total < 5) return '';
    const pct = Math.round((t.aciertos / t.total) * 100);
    if (pct >= 85) return '<div style="font-size:11px;color:#2ecc71;margin-top:4px">✓ Dominado</div>';
    
    const subtemas = SUBTEMAS_DEBILES[cat];
    if (!subtemas) return '';
    
    // Busca el mensaje que corresponde al porcentaje actual
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
      <p style="font-size:10px;color:#555;margin:2px 0 0">
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




  




 
 



  
