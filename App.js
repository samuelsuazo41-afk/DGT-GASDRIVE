// GASDRIVE DGT V8.2 ES - 630 PREGUNTAS DGT 2026
const VERSION = "8.2";

// COMBO DOPAMINA
const EMOJIS_ACIERTO = ['🚀','💎','👑','🔥','💯','⚡','🏆','🦄','🤑','✅','💪','😎','🎯','💥','🌟','🎉'];
const EMOJIS_FALLO = ['❌','💀','😭','⛔','💔','😵','🤦','🚫','💩','🤡','💥','😤'];

// INTRO SCREEN - Aparece SIEMPRE al abrir
function mostrarIntro(){
  if(localStorage.getItem('gasdrive_intro_vista')) return;
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="intro-screen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:linear-gradient(135deg,#1a1a2e,#16213e);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center;padding:20px">
      <div style="font-size:64px;margin-bottom:20px">🚗</div>
      <h1 style="font-size:32px;margin:0 0 10px">GasDrive DGT 2026</h1>
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
  localStorage.setItem('gasdrive_intro_vista','1');
  document.getElementById('intro-screen').remove();
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
const PREGUNTES = {
  general: [
    {q:"¿Cuál es la velocidad máxima en zona urbana?",a:["30 km/h","50 km/h","60 km/h"],ok:1},
    {q:"¿Qué indica una luz amarilla intermitente?",a:["Parada total","Precaución","Acelera"],ok:1},
    {q:"Distancia de seguridad en seco:",a:["1 segundo","2 segundos","3 segundos"],ok:1},
    {q:"¿Se puede adelantar en línea continua?",a:["Sí","No, nunca","Solo motos"],ok:1},
    {q:"Tasa de alcohol general:",a:["0.5 g/l","0.3 g/l","0.8 g/l"],ok:0},
    {q:"Prioridad en la rotonda:",a:["El que entra","El que circula dentro","El más rápido"],ok:1},
    {q:"Luces de cruce obligatorias:",a:["Siempre","Noche/túneles","Solo lluvia"],ok:1},
    {q:"¿Móvil al volante?",a:["Permitido manos libres","Prohibido siempre","Solo mensajes"],ok:0},
    {q:"Distancia mínima para adelantar un ciclista:",a:["1 metro","1.5 metros","2 metros"],ok:1},
    {q:"¿Cuándo usar el claxon en ciudad?",a:["Saludar","Evitar accidente","Nunca"],ok:1},
    {q:"Velocidad en zona 30:",a:["20 km/h","30 km/h","40 km/h"],ok:1},
    {q:"Intermitente antes de girar:",a:["1 segundo","3 segundos","5 segundos"],ok:1},
    {q:"Prioridad en paso de peatones:",a:["Nunca","Siempre al peatón","Solo si hay semáforo"],ok:1},
    {q:"Casco obligatorio:",a:["Solo moto grande","Moto y ciclista <16","Solo ciclista"],ok:1},
    {q:"Alcohol noveles:",a:["0.5 g/l","0.3 g/l","0.0 g/l"],ok:2},
    {q:"Cinturón obligatorio:",a:["Solo delante","Solo conductor","Todos los ocupantes"],ok:2},
    {q:"Edad mínima carnet B:",a:["16 años","17 años","18 años"],ok:2},
    {q:"Límite autovía turismos:",a:["100 km/h","120 km/h","130 km/h"],ok:1},
    {q:"Límite autopista turismos:",a:["100 km/h","120 km/h","140 km/h"],ok:1},
    {q:"Adelantar en paso de peatones:",a:["Sí, con cuidado","No, nunca","Solo bicis"],ok:1},
    {q:"En cuesta estrecha:",a:["Baja tiene preferencia","Sube tiene preferencia","El más grande"],ok:1},
    {q:"Luces en túnel:",a:["Posición","Cruce","Largas"],ok:1},
    {q:"Señal amarilla intermitente:",a:["Parada","Precaución máxima","Vía libre"],ok:1},
    {q:"Ceder paso a emergencia:",a:["Acelerar","Apartarse y parar","Tocar claxon"],ok:1},
    {q:"Distancia detención a 50 km/h:",a:["14m","28m","40m"],ok:1},
    {q:"Aquaplaning: ¿qué haces?",a:["Frenas fuerte","Reduces gas sin frenar","Aceleras"],ok:1},
    {q:"Niebla: ¿qué luz?",a:["Largas","Antiniebla + cortas","Sin luces"],ok:1},
    {q:"Hielo: ¿cómo frenar?",a:["Fuerte","Suave con marchas largas","Freno motor"],ok:1},
    {q:"Charco grande:",a:["Acelera","Evita y reduce","Frena fuerte"],ok:1},
    {q:"Viento lateral:",a:["Sujeta volante firme","Deja ir volante","Acelera"],ok:0},
    {q:"Conductor novel señal:",a:["L verde","L roja","N naranja"],ok:1},
    {q:"Gafas obligatorias:",a:["Siempre si las necesitas","Solo de noche","Nunca"],ok:0},
    {q:"Música alta:",a:["Permitida","Prohibida si tapa sonidos","Solo clásica"],ok:1},
    {q:"Comer conduciendo:",a:["Permitido","Prohibido si distrae","Solo chicle"],ok:1},
    {q:"Medicamentos con somnolencia:",a:["Se puede conducir","No conducir","Solo trayecto corto"],ok:1},
    {q:"Señal A detrás:",a:["Coche rápido","No llega a 60km/h","Novel"],ok:1},
    {q:"Tractor en vía:",a:["Adelantar rápido","Paciencia y adelantar seguro","Tocar claxon"],ok:1},
    {q:"Animal en vía:",a:["Tocar claxon","Parar y no asustar","Acelera"],ok:1},
    {q:"Final autovía:",a:["Acelera","Cede al incorporarte","Tienes preferencia"],ok:1},
    {q:"Zona ORA:",a:["Aparca libre","Mira panel antes","Solo residentes"],ok:1},
    {q:"Park & Ride:",a:["Aparca y bus","Solo bus","Solo coche"],ok:0},
    {q:"Carril bus:",a:["Prohibido excepto bus/taxi","Abierto a todos","Solo bici"],ok:0},
    {q:"Carril bici:",a:["Se puede aparcar","Nunca circular ni aparcar","Solo para girar"],ok:1},
    {q:"Ceda el paso:",a:["Acelera","Reduce y mira a ambos lados","Para siempre"],ok:1},
    {q:"Cambio carril:",a:["Gira volante","Espejo + ángulo muerto + intermitente","Solo espejo"],ok:1},
    {q:"Obstrucción:",a:["Para en medio","Avisa con triángulos a 50m","Toca claxon"],ok:1},
    {q:"Coche parado arcén:",a:["Acelera","Pasa lento con precaución","Cambia carril"],ok:1},
    {q:"Túnel largo:",a:["Apaga luces","Mantén distancia y luces encendidas","Acelera"],ok:1},
    {q:"Obras:",a:["Sigue señales viejas","Respeta señales provisionales","Ignora señales"],ok:1},
    {q:"Cambio sentido:",a:["Donde quieras","Solo permitido","Nunca"],ok:1},
    {q:"Marcha atrás:",a:["Cuando quieras","Solo imprescindible y corto","Nunca"],ok:1},
    {q:"Adelantamiento:",a:["Lento y largo","Rápido y seguro","Con música alta"],ok:1},
    {q:"No entrar:",a:["Círculo rojo","Triángulo","Cuadrado azul"],ok:0},
    {q:"Semáforo con flecha:",a:["Ignora flecha","Sigue flecha","Espera verde"],ok:1},
    {q:"STOP sin línea:",a:["Para en medio","Para antes de intersección","No pares"],ok:1},
    {q:"Colegio:",a:["50km/h","30km/h con niños","120km/h"],ok:1},
    {q:"Luces posición de noche:",a:["Sirven","No sirven","Solo ciudad"],ok:1},
    {q:"Luces largas a otro:",a:["Deslumbra","Apaga a 150m","Déjalas encendidas"],ok:1},
    {q:"Avería:",a:["Para en medio","Chaleco + triángulos a 50m","Toca claxon"],ok:1},
    {q:"Extintor:",a:["No hace falta","Revisa fecha caducidad","Solo camiones"],ok:1},
    {q:"Repuesto:",a:["No hace falta revisar","Comprueba presión cada mes","Solo si pincha"],ok:1},
    {q:"Batería:",a:["Limpia bornes si cuesta arrancar","Tírala","Solo taller"],ok:0},
    {q:"Líquido limpia:",a:["Solo agua","Nunca solo agua","Solo anticongelante"],ok:1},
    {q:"Temperatura alta:",a:["Acelera","Para y espera enfriar","Abre tapón"],ok:1},
    {q:"Nivel aceite:",a:["Por debajo mínimo","Entre mín y máx","Por encima máx"],ok:1},
    {q:"Retrovisores:",a:["Ver mucho coche","Ver justo un poco de carrocería","Cerrados"],ok:1},
    {q:"Posición asiento:",a:["Piernas estiradas","Rodillas flexionadas, brazos relajados","Tirado atrás"],ok:1},
    {q:"Objetos sueltos:",a:["Seguros","Proyectiles en choque","Solo detrás"],ok:1},
    {q:"SRI grupo 0:",a:["Delante marcha","De espaldas a la marcha","De lado"],ok:1},
    {q:"Perro en el coche:",a:["Suelto","Arnés o transportín","En asiento delantero"],ok:1},
    {q:"Maletero:",a:["Peso alto","Peso bajo y bien sujeto","Como sea"],ok:1},
    {q:"Distancia con camión:",a:["Igual","Más del doble","Menos"],ok:1},
    {q:"Aquaplaning:",a:["Frena","No frenes, reduce gas","Acelera"],ok:1},
    {q:"Nieve:",a:["Neumáticos normales","Cadenas o M+S","Acelera"],ok:1},
    {q:"Ráfaga viento:",a:["Deja ir volante","Sujeta volante y reduce","Acelera"],ok:1},
    {q:"Bajada larga:",a:["Frena siempre","Frena con motor","Punto muerto"],ok:1},
    {q:"Zona 30:",a:["Solo coches","Peatones pueden ir por calzada","No peatones"],ok:1},
    {q:"Flecha verde semáforo:",a:["Espera","Tienes preferencia","Cede"],ok:1},
    {q:"Policía regulando:",a:["Sigue semáforo","Obedece gestos policía","Ignora"],ok:1},
    {q:"Repasar errores:",a:["Nunca","Cada día 10 min","Solo antes examen"],ok:1},
    {q:"En vía urbana de doble sentido sin acera, ¿por dónde camina el peatón?",a:["Por la calzada","Por la acera izquierda","Por la acera derecha"],ok:0},
    {q:"Velocidad máxima en vía urbana de plataforma única?",a:["20 km/h","30 km/h","50 km/h"],ok:0},
    {q:"Distancia mínima para abrir puerta y bajar del vehículo?",a:["0,5 m","1 m","1,5 m"],ok:1},
    {q:"En caso de accidente con heridos, ¿qué es prioridad?",a:["Mover los heridos","Avisar 112 y proteger","Apartar vehículos"],ok:1},
    {q:"¿Qué neumático se gasta primero?",a:["Delante izquierdo","Detrás derecho","Todos igual"],ok:0},
    {q:"En vía interurbana, ¿cuál es el límite para ciclomotores?",a:["45 km/h","60 km/h","80 km/h"],ok:0},
    {q:"¿Qué indica una línea blanca en zig-zag en el arcén?",a:["Aparcamiento prohibido","Parada prohibida","Zona de carga"],ok:1},
    {q:"En caso de niebla espesa, ¿qué luz está prohibida?",a:["Antiniebla delantera","Antiniebla trasera","Luces de cruce"],ok:2},
    {q:"¿Cuál es la carga máxima que sobresale por detrás sin señalizar?",a:["1 m","2 m","3 m"],ok:0},
    {q:"En rotonda de dos carriles, ¿para salir en la segunda salida?",a:["Carril derecho","Carril izquierdo","Cualquiera"],ok:1},
    {q:"¿Qué significa la señal V-23 en el vehículo?",a:["Conductor novel","Vehículo lento","Transporte escolar"],ok:2},
    {q:"Con lluvia intensa, ¿cuál es el riesgo principal?",a:["Sobreviraje","Aquaplaning","Subviraje"],ok:1},
    {q:"Al bajar una pendiente larga con vehículo pesado?",a:["Punto muerto","Frenar continuamente","Reducir marcha y freno motor"],ok:2},
    {q:"¿Qué distancia de seguridad con moto en lluvia?",a:["Igual","Doble","Triple"],ok:1},
    {q:"En caso de incendio en el vehículo, ¿primero?",a:["Abrir capó","Cortar contacto y extintor","Llamar seguro"],ok:1},
    {q:"¿Qué indica el panel azul con bicicleta?",a:["Prohibición","Obligación carril bici","Recomendación"],ok:1},
    {q:"En túnel, ¿qué luz es obligatoria?",a:["Posición","Cruce","Largas"],ok:1},
    {q:"¿Cuál es la velocidad en calle residencial?",a:["20 km/h","30 km/h","50 km/h"],ok:0},
    {q:"Al adelantar tranvía, ¿por dónde pasas?",a:["Por la izquierda","Por la derecha si hay espacio","Nunca adelantas"],ok:1},
    {q:"¿Qué haces si el motor se cala en subida?",a:["Freno de mano + arrancar","Punto muerto + frenar","Acelera fuerte"],ok:0},
    {q:"En vía con tres carriles, ¿dónde circula el vehículo lento?",a:["Carril izquierdo","Carril central","Carril derecho"],ok:2},
    {q:"¿Qué indica la señal de fin de población?",a:["Inicio límite 50","Fin límite 50","Inicio autovía"],ok:1},
    {q:"Con viento fuerte lateral en puente, ¿qué haces?",a:["Acelera","Sujeta firme el volante","Cambia carril"],ok:1},
    {q:"En caso de vertido de aceite en la calzada?",a:["Acelera para pasar rápido","Avisa y circula con precaución","Frena fuerte"],ok:1}
  ],
    senales: [
    {q:"Señal de STOP octogonal:",a:["Cede el paso","Parada obligatoria","Precaución"],ok:1},
    {q:"Triángulo invertido es:",a:["STOP","Ceda el paso","No entrar"],ok:1},
    {q:"Círculo rojo con línea:",a:["Obligación","Prohibición","Fin prohibición"],ok:1},
    {q:"Señal azul cuadrada:",a:["Prohibición","Información","Peligro"],ok:1},
    {q:"Rombo amarillo:",a:["Peligro","Información","Obligación"],ok:0},
    {q:"Círculo azul con flecha:",a:["Prohibición","Obligación girar","Información"],ok:1},
    {q:"Cuadrado verde con flechas:",a:["Peligro","Direcciones permitidas","Prohibición"],ok:1},
    {q:"Línea continua:",a:["Se puede cruzar","No cruzar","Solo bicis"],ok:1},
    {q:"Línea discontinua:",a:["No cruzar","Se puede cruzar","Solo girar"],ok:1},
    {q:"Doble línea continua:",a:["Se puede cruzar","No cruzar nunca","Solo adelantar"],ok:1},
    {q:"Señal fin velocidad:",a:["Inicio límite","Fin límite","Nuevo límite"],ok:1},
    {q:"Señal fin prohibición:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Panel complementario:",a:["Decora","Aporta información adicional","No sirve"],ok:1},
    {q:"Señal peligro triangular:",a:["Información","Prohibición","Avisa de peligro"],ok:2},
    {q:"Señal fin vía preferente:",a:["Inicio preferente","Fin preferente","Nueva preferente"],ok:1},
    {q:"Señal zona peatones:",a:["Prohibido peatones","Zona peatones","Solo coches"],ok:1},
    {q:"Señal fin zona peatones:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal calle residencial:",a:["Autopista","Calle residencial","Zona industrial"],ok:1},
    {q:"Fin calle residencial:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal túnel:",a:["Peligro","Información túnel","Prohibición"],ok:1},
    {q:"Señal puente móvil:",a:["Información","Peligro puente móvil","Prohibición"],ok:1},
    {q:"Señal salida de emergencia:",a:["Información","Prohibición","Peligro"],ok:0},
    {q:"Señal paso a nivel:",a:["Información","Peligro paso a nivel","Prohibición"],ok:1},
    {q:"Señal viento lateral:",a:["Información","Peligro viento lateral","Prohibición"],ok:1},
    {q:"Señal animales salvajes:",a:["Información","Peligro animales","Prohibición"],ok:1},
    {q:"Señal cruce:",a:["Información","Peligro cruce","Prohibición"],ok:1},
    {q:"Señal semáforos:",a:["Información","Peligro semáforos","Prohibición"],ok:1},
    {q:"Señal obras:",a:["Información","Peligro obras","Prohibición"],ok:1},
    {q:"Señal fin obras:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal velocidad mínima:",a:["Prohibición","Obligación velocidad mínima","Información"],ok:1},
    {q:"Señal fin velocidad mínima:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal prohibición giro izquierda:",a:["Permitido","Prohibido giro izquierda","Obligación girar"],ok:1},
    {q:"Señal prohibición giro derecha:",a:["Permitido","Prohibido giro derecha","Obligación girar"],ok:1},
    {q:"Señal prohibición cambio sentido:",a:["Permitido","Prohibido cambio sentido","Obligación"],ok:1},
    {q:"Señal prohibición adelantar:",a:["Permitido","Prohibido adelantar","Obligación adelantar"],ok:1},
    {q:"Señal fin prohibición adelantar:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal zona escolar:",a:["Información","Peligro zona escolar","Prohibición"],ok:1},
    {q:"Señal fin zona escolar:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal zona 30:",a:["Información","Límite 30km/h","Prohibición 30"],ok:1},
    {q:"Señal fin zona 30:",a:["Inicio","Fin","Continúa"],ok:1},
    {q:"Señal triangular fondo amarillo con paleta?",a:["Peligro obras","Peligro policía","Peligro semáforos"],ok:0},
    {q:"Señal circular fondo azul con número 30?",a:["Velocidad mínima","Velocidad máxima","Velocidad recomendada"],ok:2},
    {q:"Señal rectangular azul con autobús?",a:["Carril bus","Parada bus","Prohibición bus"],ok:0},
    {q:"Señal triangular con bicicleta y niño?",a:["Peligro escuela","Peligro ciclistas","Peligro zona escolar"],ok:2},
    {q:"Señal circular rojo con camión?",a:["Prohibición camiones","Fin prohibición camiones","Obligación camiones"],ok:0},
    {q:"Señal rectangular verde con avión?",a:["Aeropuerto","Helipuerto","Zona vuelo bajo"],ok:0},
    {q:"Señal triangular con barco?",a:["Peligro puerto","Peligro puente móvil","Peligro embarcadero"],ok:1},
    {q:"Señal circular azul con cadena?",a:["Obligación cadenas","Prohibición cadenas","Recomendación cadenas"],ok:0},
    {q:"Señal rectangular azul con P?",a:["Prohibición parar","Aparcamiento","Parada bus"],ok:1},
    {q:"Señal triangular con curva cerrada?",a:["Peligro curva peligrosa","Peligro revuelta","Peligro giro brusco"],ok:0},
    {q:"Señal circular rojo con 3,5t?",a:["Peso máximo 3,5t","Peso mínimo 3,5t","Fin peso máximo"],ok:0},
    {q:"Señal rectangular azul con H?",a:["Hotel","Hospital","Helipuerto"],ok:1},
    {q:"Señal triangular con semáforo?",a:["Peligro semáforo","Obligación semáforo","Fin semáforo"],ok:0},
    {q:"Señal circular azul con flecha curva?",a:["Prohibición girar","Obligación girar","Recomendación girar"],ok:1},
    {q:"Señal rectangular verde con salida?",a:["Salida autovía","Entrada autovía","Área servicio"],ok:0},
    {q:"Señal triangular con animales domésticos?",a:["Peligro animales salvajes","Peligro animales domésticos","Peligro rebaños"],ok:2},
    {q:"Señal circular rojo con bicicleta?",a:["Prohibición bicis","Fin prohibición bicis","Obligación bicis"],ok:0},
    {q:"Señal rectangular azul con gasolinera?",a:["Estación servicio","Prohibición repostar","Área descanso"],ok:0},
    {q:"Señal triangular con puente estrecho?",a:["Peligro puente estrecho","Peligro puente móvil","Prohibición puente"],ok:0},
    {q:"Señal circular azul con rayo?",a:["Obligación luces","Prohibición luces","Recomendación luces"],ok:0},
    {q:"Señal rectangular verde con información?",a:["Preaviso salida","Confirmación itinerario","Inicio autovía"],ok:1},
    {q:"Señal triangular con desprendimientos?",a:["Peligro zona desprendimientos","Prohibición parar","Obligación casco"],ok:0},
    {q:"Señal circular rojo con claxon?",a:["Prohibición claxon","Obligación claxon","Fin prohibición claxon"],ok:0}
  ],
  normas: [
    {q:"Tasa de alcohol noveles:",a:["0.5 g/l","0.3 g/l","0.0 g/l"],ok:2},
    {q:"Cinturón obligatorio:",a:["Solo delante","Solo conductor","Todos"],ok:2},
    {q:"Edad mínima carnet B:",a:["16 años","17 años","18 años"],ok:2},
    {q:"Límite autovía turismos:",a:["100 km/h","120 km/h","130 km/h"],ok:1},
    {q:"Límite ciudad genérico:",a:["30 km/h","50 km/h","40 km/h"],ok:1},
    {q:"Puntos carnet nuevo:",a:["8 puntos","12 puntos","15 puntos"],ok:1},
    {q:"Pérdida total puntos:",a:["Suspensión 3 meses","Suspensión 6 meses","Retirada carnet"],ok:0},
    {q:"Recuperar puntos:",a:["Curso 12h","Curso 24h","Automático en 2 años"],ok:1},
    {q:"Documentación obligatoria:",a:["Solo DNI","Permiso + ITV + Seguro","Solo permiso"],ok:1},
    {q:"ITV turismo nuevo:",a:["A los 2 años","A los 4 años","A los 6 años"],ok:1},
    {q:"Seguro obligatorio:",a:["Solo RC","RC + robo","Todo riesgo"],ok:0},
    {q:"Multa móvil:",a:["3 puntos + 200€","6 puntos + 200€","Solo 100€"],ok:1},
    {q:"Multa cinturón:",a:["3 puntos + 200€","Solo 100€","Aviso"],ok:0},
    {q:"Alcohol >0.6 g/l:",a:["Multa","Delito penal","Solo aviso"],ok:1},
    {q:"Negarse a alcohol:",a:["Multa","Delito penal","Solo aviso"],ok:1},
    {q:"Velocidad +20km/h en ciudad:",a:["Multa leve","Multa grave + 2 puntos","Solo aviso"],ok:1},
    {q:"Velocidad +60km/h autopista:",a:["Multa leve","Delito penal","Solo aviso"],ok:1},
    {q:"Conducir sin carnet:",a:["Multa","Delito penal","Solo aviso"],ok:1},
    {q:"Huir accidente:",a:["Multa","Delito penal","Solo aviso"],ok:1},
    {q:"Peatón tiene preferencia:",a:["Nunca","Siempre en paso cebra","Solo con semáforo"],ok:1},
    {q:"Ciclista tiene preferencia:",a:["Nunca","En carril bici","Siempre"],ok:1},
    {q:"Moto tiene preferencia:",a:["Nunca","En rotonda","Siempre"],ok:1},
    {q:"Bus tiene preferencia:",a:["Nunca","Saliendo de parada","Siempre"],ok:1},
    {q:"Taxi tiene preferencia:",a:["Nunca","En carril bus","Siempre"],ok:1},
    {q:"Ambulancia tiene preferencia:",a:["Nunca","Con luces y sonido","Siempre"],ok:1},
    {q:"Policía tiene preferencia:",a:["Nunca","En servicio","Siempre"],ok:1},
    {q:"Bomberos tiene preferencia:",a:["Nunca","En servicio","Siempre"],ok:1},
    {q:"Protección Civil tiene preferencia:",a:["Nunca","En servicio","Siempre"],ok:1},
    {q:"Prioridad derecha:",a:["Nunca","En cruce sin señales","Siempre"],ok:1},
    {q:"Prioridad izquierda:",a:["Nunca","En rotonda","Siempre"],ok:1},
    {q:"Prioridad delante:",a:["Nunca","En giro","Siempre"],ok:1},
    {q:"Prioridad atrás:",a:["Nunca","En marcha atrás","Siempre"],ok:0},
    {q:"Prioridad subida:",a:["Nunca","En cuesta estrecha","Siempre"],ok:1},
    {q:"Prioridad bajada:",a:["Nunca","En cuesta estrecha","Siempre"],ok:0},
    {q:"Prioridad tranvía:",a:["Nunca","Siempre","Solo de noche"],ok:1},
    {q:"Prioridad tren:",a:["Nunca","Siempre en paso nivel","Solo de día"],ok:1},
    {q:"Prioridad bus escolar:",a:["Nunca","Cuando para","Siempre"],ok:1},
    {q:"Prioridad coche oficial:",a:["Nunca","Con luces","Siempre"],ok:1},
    {q:"Prioridad moto policía:",a:["Nunca","En servicio","Siempre"],ok:1},
    {q:"Prioridad bicicleta:",a:["Nunca","En carril bici","Siempre"],ok:1},
    {q:"Prioridad patinete:",a:["Nunca","En carril bici","Siempre"],ok:1},
    {q:"Prioridad peatón inválido:",a:["Nunca","Siempre","Solo con bastón"],ok:1},
    {q:"Prioridad niño:",a:["Nunca","Siempre","Solo en colegio"],ok:1},
    {q:"Prioridad gente mayor:",a:["Nunca","Siempre","Solo con bastón"],ok:1},
    {q:"Prioridad mujer embarazada:",a:["Nunca","Siempre","Solo con cinturón"],ok:1},
    {q:"Prioridad conductor novel:",a:["Nunca","Siempre","Solo con L"],ok:0},
    {q:"Prioridad conductor profesional:",a:["Nunca","Siempre","Solo con taxi"],ok:0},
    {q:"Prioridad conductor extranjero:",a:["Nunca","Siempre","Solo con pasaporte"],ok:0},
    {q:"Prioridad conductor local:",a:["Nunca","Siempre","Solo con DNI"],ok:0},
    {q:"Prioridad conductor turista:",a:["Nunca","Siempre","Solo con mapa"],ok:0},
    {q:"¿Cuántos puntos se pierden por no llevar casco moto?",a:["2 puntos","3 puntos","4 puntos"],ok:1},
    {q:"¿Cuál es la caducidad del permiso B hasta los 65 años?",a:["5 años","10 años","15 años"],ok:1},
    {q:"Multa por circular sin ITV en vigor?",a:["100€","200€ + inmovilización","Solo aviso"],ok:1},
    {q:"¿Cuántos puntos por saltarse un STOP?",a:["2 puntos","3 puntos","4 puntos"],ok:2},
    {q:"¿Cuál es la tasa alcohol profesional?",a:["0,5 g/l","0,3 g/l","0,15 g/l"],ok:1},
    {q:"¿Cuántos puntos por adelantar en línea continua?",a:["3 puntos","4 puntos","6 puntos"],ok:1},
    {q:"¿Qué documentación hay que llevar siempre?",a:["DNI","Permiso + ITV + Seguro","Solo permiso"],ok:1},
    {q:"¿Cuántos puntos por no respetar semáforo rojo?",a:["3 puntos","4 puntos","6 puntos"],ok:1},
    {q:"Multa por no llevar chaleco reflectante?",a:["80€","200€","Solo aviso"],ok:0},
    {q:"¿Cuántos años sin cometer infracciones para recuperar 2 puntos?",a:["1 año","2 años","3 años"],ok:1},
    {q:"¿Cuál es la multa por conducir con móvil en la mano?",a:["100€","200€ + 6 puntos","Solo 80€"],ok:1},
    {q:"¿Cuántos puntos por circular por arcén sin causa?",a:["2 puntos","3 puntos","4 puntos"],ok:2},
    {q:"¿Cuál es la ITV de un coche de 8 años?",a:["Anual","Cada 2 años","Cada 6 meses"],ok:0},
    {q:"Multa por no llevar triángulos en avería?",a:["80€","200€","Solo aviso"],ok:0},
    {q:"¿Cuántos puntos por no ceder paso a peatón en cebra?",a:["2 puntos","3 puntos","4 puntos"],ok:2},
    {q:"¿Cuál es la velocidad que comporta delito penal?",a:["+40 km/h","Exceder +60 km/h límite","Cualquier exceso"],ok:1},
    {q:"Multa por aparcar en carril bus?",a:["80€","200€ + retirada vehículo","Solo aviso"],ok:0},
    {q:"¿Cuántos puntos por no llevar cinturón detrás?",a:["2 puntos","3 puntos","4 puntos"],ok:1},
    {q:"¿Cuál es la caducidad del permiso a partir de los 65 años?",a:["2 años","3 años","5 años"],ok:2},
    {q:"Multa por circular sin seguro?",a:["500€ a 3000€","100€","Solo aviso"],ok:0},
    {q:"¿Cuántos puntos por saltarse ceda el paso?",a:["2 puntos","3 puntos","4 puntos"],ok:2},
    {q:"¿Cuál es la tasa alcohol para ciclomotor?",a:["0,5 g/l","0,3 g/l","0,15 g/l"],ok:1},
    {q:"Multa por no señalizar avería en autovía?",a:["80€","200€","Solo aviso"],ok:0}
  ],
  mecanica: [
    {q:"Presión baja causa:",a:["Mayor consumo","Menor adherencia","Las dos"],ok:2},
    {q:"Líquido de frenos bajo:",a:["Desgaste pastillas","Fuga","Las dos pueden ser"],ok:2},
    {q:"Testigo aceite rojo:",a:["Revisar nivel","Para el motor YA","Cambiar aceite"],ok:1},
    {q:"Batería descargada:",a:["Empujar","Pinzas","Las dos"],ok:2},
    {q:"Neumático liso:",a:["Multa","Accidente","Las dos"],ok:2},
    {q:"Anticongelante sirve para:",a:["Solo frío","Frío y calor","Solo calor"],ok:1},
    {q:"Nivel refrigerante bajo:",a:["Añade agua","Añade refrigerante","No toques"],ok:1},
    {q:"Sobrecalentamiento:",a:["Acelera","Para y espera","Abre tapón"],ok:1},
    {q:"Aceite muy alto:",a:["Mejor lubricación","Puede dañar el motor","No pasa nada"],ok:1},
    {q:"Aceite muy bajo:",a:["Mejor consumo","Fricción y desgaste","No pasa nada"],ok:1},
    {q:"Pastillas frenos gastadas:",a:["Mejor frenada","Menor frenada + ruido","No pasa nada"],ok:1},
    {q:"Discos frenos rayados:",a:["Mejor frenada","Vibración al frenar","No pasa nada"],ok:1},
    {q:"Amortiguadores gastados:",a:["Mejor confort","Menor adherencia","No pasa nada"],ok:1},
    {q:"Dirección dura:",a:["Mejor control","Falta líquido dirección","No pasa nada"],ok:1},
    {q:"Embrague patina:",a:["Mejor salida","Pérdida potencia","No pasa nada"],ok:1},
    {q:"Caja cambios rasca:",a:["Normal","Sincronizadores gastados","No pasa nada"],ok:1},
    {q:"Escape ruidoso:",a:["Mejor potencia","Agujero o junta rota","No pasa nada"],ok:1},
    {q:"Humo blanco escape:",a:["Normal","Vapor de agua o refrigerante","Aceite quemado"],ok:1},
    {q:"Humo negro escape:",a:["Normal","Exceso combustible","Aceite quemado"],ok:1},
    {q:"Humo azul escape:",a:["Normal","Aceite quemado","Exceso combustible"],ok:1},
    {q:"Testigo motor amarillo:",a:["Para YA","Revisa pronto","No pasa nada"],ok:1},
    {q:"Testigo ABS encendido:",a:["No frena","ABS no funciona","No pasa nada"],ok:1},
    {q:"Testigo airbag encendido:",a:["Airbag no funciona","Airbag mejorado","No pasa nada"],ok:0},
    {q:"Testigo batería encendido:",a:["Batería cargando","Alternador falla","No pasa nada"],ok:1},
    {q:"Testigo presión neumáticos:",a:["Presión correcta","Presión baja","No pasa nada"],ok:1},
    {q:"Líquido limpia parabrisas:",a:["Solo agua","Agua + producto","Solo producto"],ok:1},
    {q:"Limpiaparabrisas no limpia:",a:["Normal","Gomas gastadas","Motor roto"],ok:1},
    {q:"Luces no encienden:",a:["Bombilla fundida","Fusible roto","Las dos"],ok:2},
    {q:"Intermitente va rápido:",a:["Normal","Bombilla fundida","Relé roto"],ok:1},
    {q:"Claxon no suena:",a:["Normal","Fusible o claxon roto","No pasa nada"],ok:1},
    {q:"Aire acondicionado no enfría:",a:["Normal","Falta gas","Compresor roto"],ok:1},
    {q:"Calefacción no calienta:",a:["Normal","Termostato cerrado","Radiador roto"],ok:1},
    {q:"Puerta no cierra:",a:["Normal","Cerradura rota","Goma desgastada"],ok:1},
    {q:"Ventana no baja:",a:["Normal","Motor elevalunas roto","Fusible roto"],ok:1},
    {q:"Asiento no se mueve:",a:["Normal","Motor asiento roto","Palanca rota"],ok:1},
    {q:"Volante vibra:",a:["Normal","Ruedas desequilibradas","Dirección rota"],ok:1},
    {q:"Coche tira a un lado:",a:["Normal","Paralelismo mal","Neumático bajo"],ok:1},
    {q:"Frenada vibra:",a:["Normal","Discos alabeados","Pastillas nuevas"],ok:1},
    {q:"Ruido al girar:",a:["Normal","Palier roto","Dirección rota"],ok:1},
    {q:"Ruido al acelerar:",a:["Normal","Correa desgastada","Motor roto"],ok:1},
    {q:"Ruido al frenar:",a:["Normal","Pastillas gastadas","Discos nuevos"],ok:1},
    {q:"Ruido al pasar baches:",a:["Normal","Suspensión gastada","Ruedas nuevas"],ok:1},
    {q:"Coche no arranca:",a:["Normal","Batería o motor arranque","No pasa nada"],ok:1},
    {q:"Coche se para:",a:["Normal","Falta combustible o avería","No pasa nada"],ok:1},
    {q:"Coche pierde potencia:",a:["Normal","Filtro sucio o avería","No pasa nada"],ok:1},
    {q:"Coche consume mucho:",a:["Normal","Presión baja o avería","No pasa nada"],ok:1},
    {q:"Coche humea:",a:["Normal","Avería motor","No pasa nada"],ok:1},
    {q:"Coche huele a quemado:",a:["Normal","Fricción o cortocircuito","No pasa nada"],ok:1},
    {q:"Coche huele a gasolina:",a:["Normal","Fuga combustible","No pasa nada"],ok:1},
    {q:"Coche huele a aceite:",a:["Normal","Fuga aceite","No pasa nada"],ok:1},
    {q:"Coche huele a refrigerante:",a:["Normal","Fuga refrigerante","No pasa nada"],ok:1}
  ],
  auxilios: [
    {q:"¿Qué haces primero ante un accidente?",a:["Llamar al 112","Mover al herido","Dar agua"],ok:0},
    {q:"En una hemorragia arterial, ¿qué haces?",a:["Comprimir directo","Elevar extremidad","Dar aspirina"],ok:0},
    {q:"Posición lateral de seguridad sirve para:",a:["Evitar asfixia","Acelerar recuperación","Reducir dolor"],ok:0},
    {q:"Ante una fractura abierta:",a:["Reducir hueso","Cubrir con gasa estéril","Mover extremidad"],ok:1},
    {q:"RCP en adulto: compresión/ventilación:",a:["15/2","30/2","20/3"],ok:1},
    {q:"¿Cuándo NO debes quitar el casco a un motorista?",a:["Si respira mal","Si está consciente","Si no hay riesgo cervical"],ok:0},
    {q:"Síntoma de infarto:",a:["Dolor torácico","Dolor de rodilla","Visión borrosa"],ok:0},
    {q:"Ante quemaduras de 2º grado:",a:["Agua fría 10 min","Hielo directo","Pomada grasa"],ok:0},
    {q:"¿Qué haces si alguien se atraganta?",a:["Dar agua","Golpe espalda","Respiración boca-boca"],ok:1},
    {q:"Convulsión: ¿qué NO haces?",a:["Proteger cabeza","Poner objeto boca","Cronometrar tiempo"],ok:1},
    {q:"Shock hipovolémico: posición:",a:["Sentado","Tumbado con piernas elevadas","Boca abajo"],ok:1},
    {q:"Mordedura de serpiente:",a:["Cortar herida","Inmovilizar extremidad","Succionar veneno"],ok:1},
    {q:"Hipotermia grave: ¿qué haces?",a:["Friccionar piel","Aislar del frío","Dar alcohol"],ok:1},
    {q:"Golpe de calor: síntoma:",a:["Piel fría","Piel caliente y seca","Temblores"],ok:1},
    {q:"Fractura de clavícula: inmovilización:",a:["Con férula","Cabestrillo","Estirando brazo"],ok:1},
    {q:"Ante pérdida de conocimiento breve:",a:["Sentar inmediato","PLS si respira","Dar azúcar"],ok:1},
    {q:"Hemorragia nasal: ¿qué haces?",a:["Inclinar cabeza atrás","Pellizcar nariz","Sonarse"],ok:1},
    {q:"Quemadura química en el ojo:",a:["Frotar","Lavado abundante agua","Tapar con gasa seca"],ok:1},
    {q:"Ataque de asma grave:",a:["Agua fría","Posición sentado","Estirar en suelo"],ok:1},
    {q:"¿Cuándo usas DEA?",a:["Si no respira","Si no hay pulso","Si está dormido"],ok:1},
    {q:"Herida con objeto clavado:",a:["Quitar objeto","Inmovilizar objeto","Presionar alrededor"],ok:1},
    {q:"Síntoma de ictus:",a:["Dolor estómago","Caída cara","Escalofríos"],ok:1},
    {q:"Esguince tobillo:",a:["Calor inmediata","Frío + compresión","Masaje fuerte"],ok:1},
    {q:"Ante vómito con inconsciencia:",a:["PLS","Boca arriba","Sentado"],ok:0},
    {q:"Intoxicación: ¿qué NO haces?",a:["Llamar 112","Provocar vómito sin indicación","Observar paciente"],ok:1},
    {q:"Hipoglucemia consciente:",a:["Insulina","Azúcar por boca","Agua sola"],ok:1},
    {q:"Trauma craneal con vómito:",a:["Normal","Signo de alarma","No importa"],ok:1},
    {q:"Parada respiratoria: frecuencia ventilación:",a:["6-8/min","12/min","20/min"],ok:0},
    {q:"Ante amputación:",a:["Poner parte en hielo directo","Cubrir herida","Guardar parte seco"],ok:1},
    {q:"Síntoma de alergia grave:",a:["Dificultad para respirar","Dolor estómago","Picor de nariz"],ok:0},
    {q:"Deshidratación grave: síntoma:",a:["Orina abundante","Sed intensa","Sudoración excesiva"],ok:1},
    {q:"Trauma torácico con dificultad respiratoria:",a:["Normal","Peligroso","No importa"],ok:1},
    {q:"Fractura abierta sangrando mucho:",a:["Quitar hueso","Compresión directa","Elevar extremidad"],ok:1},
    {q:"Ante intoxicación por gas:",a:["Encender luz","Ventilar + salir","Dar agua"],ok:1},
    {q:"Convulsión acabada, paciente dormido:",a:["Despertar","PLS","Sentado"],ok:1},
    {q:"Herida que no para de sangrar:",a:["Poner torniquete","Compresión + 112","Agua oxigenada"],ok:1},
    {q:"Síntoma de angina de pecho:",a:["Dolor rodilla","Opresión pecho","Dolor cabeza"],ok:1},
    {q:"Ante caída de más de 3m:",a:["No mover + 112","Levantar rápido","Mover suavemente"],ok:0},
    {q:"Quemadura eléctrica:",a:["Tocar paciente","Cortar corriente antes","Agua inmediata"],ok:1},
    {q:"Niño inconsciente que no respira:",a:["5 ventilaciones iniciales","30 compresiones","Respirarle a cara"],ok:0},
    {q:"Hemorragia externa grave:",a:["Esperar que pare","Compresión + elevar","Poner alcohol"],ok:1}
  ],
    medioambiente: [
    {q:"¿Qué es la etiqueta ambiental B?",a:["Eléctrico","Gasolina Euro 4+","Híbrido"],ok:1},
    {q:"Coche con etiqueta 0 emite:",a:["CO2 bajo","Cero emisiones tubo","Solo CO"],ok:1},
    {q:"Conducción eficiente reduce:",a:["Solo ruido","Consumo + CO2","Velocidad"],ok:1},
    {q:"¿Cuándo debes apagar motor?",a:["Nunca","Parado >30s","Solo en semáforo"],ok:1},
    {q:"Etiqueta C: coche gasolina de:",a:["Euro 3","Euro 4 a Euro 6","Eléctrico"],ok:1},
    {q:"Neumáticos desinflados provocan:",a:["Menos consumo","Más consumo CO2","Menos ruido"],ok:1},
    {q:"Acelerar bruscamente:",a:["Ahorra","Aumenta contaminación","No afecta"],ok:1},
    {q:"Etiqueta ECO: incluye:",a:["Solo eléctrico","Híbrido + gas","Diesel Euro 6"],ok:1},
    {q:"Velocidad constante ahorra:",a:["Nada","Combustible + emisiones","Solo tiempo"],ok:1},
    {q:"¿Qué es ZBE?",a:["Zona azul","Zona bajas emisiones","Zona bus"],ok:1},
    {q:"Cambiar marcha antes 2500 rpm:",a:["Gasta más","Ahorra + contamina menos","No cambia"],ok:1},
    {q:"Etiqueta A no existe porque:",a:["Todos contaminan","Ya es 0 y ECO","No hay coches"],ok:1},
    {q:"Usar aire acondicionado:",a:["Reduce consumo","Aumenta consumo","No afecta"],ok:1},
    {q:"Circular a 120 vs 100 km/h:",a:["Mismo consumo","Gasta +30%","Gasta -10%"],ok:1},
    {q:"Etiqueta 0: ejemplos:",a:["Diesel Euro 6","Eléctrico, H2, PHEV 40km","Gasolina Euro 5"],ok:1},
    {q:"Llevar peso innecesario:",a:["No afecta","Aumenta consumo","Reduce consumo"],ok:1},
    {q:"Cambio de aceite tardío:",a:["Mejora","Contamina más","No afecta"],ok:1},
    {q:"Etiqueta B: diesel de:",a:["Euro 3","Euro 4,5,6","Euro 2"],ok:1},
    {q:"Frenar con motor:",a:["Gasta más","Ahorra combustible","No cambia"],ok:1},
    {q:"¿Qué prohíbe ZBE sin etiqueta?",a:["Nada","Acceso según ciudad","Aparcar"],ok:1},
    {q:"Marcha larga con rpm bajas:",a:["Fuerza motor","Conducción eficiente","Rompen coche"],ok:1},
    {q:"Etiqueta C: diesel de:",a:["Euro 3","Euro 4,5,6","Euro 2"],ok:1},
    {q:"Dejar ralentí calentando:",a:["Necesario","Contamina y gasta","Obligatorio invierno"],ok:1},
    {q:"Neumáticos en buen estado:",a:["No importa","Reducen consumo","Aumentan ruido"],ok:1},
    {q:"Etiqueta 0: ventaja ZBE:",a:["Ninguna","Acceso libre","Ha de pagar"],ok:1},
    {q:"Conducción brusca:",a:["Ahorra","Aumenta CO2 hasta 40%","No afecta"],ok:1},
    {q:"Etiqueta ECO: gas natural:",a:["No","Sí","Solo biogás"],ok:1},
    {q:"Cerrar ventanas autopista:",a:["Aumenta ruido","Reduce resistencia","No cambia"],ok:1},
    {q:"Etiqueta B: ventaja:",a:["Gratis ZBE","Acceso limitado","Nada"],ok:1},
    {q:"Anticipar tráfico:",a:["No sirve","Reduce frenadas","Aumenta velocidad"],ok:1},
    {q:"Etiqueta C: ventaja:",a:["Nada","Acceso ZBE","Gratis aparcamiento"],ok:1},
    {q:"Motor frío consume:",a:["Menos","Más","Igual"],ok:1},
    {q:"Etiqueta 0: recarga PHEV:",a:["No hace falta","Hace falta para etiqueta","Solo gas"],ok:1},
    {q:"Revisión ITVE al día:",a:["No afecta","Reduce emisiones","Aumenta consumo"],ok:1},
    {q:"Etiqueta B: color:",a:["Verde","Amarillo","Azul"],ok:1},
    {q:"Apagar motor bajando:",a:["Correcto","Peligroso","Obligatorio"],ok:1},
    {q:"Etiqueta ECO: color:",a:["Azul","Verde-azul","Amarillo"],ok:1},
    {q:"Carga en el techo:",a:["Reduce consumo","Aumenta resistencia","No afecta"],ok:1},
    {q:"Etiqueta 0: exento impuesto circulación?",a:["Nunca","Depende ayuntamiento","Siempre"],ok:1},
    {q:"Cambiar filtro aire sucio:",a:["No sirve","Reduce consumo","Aumenta potencia"],ok:1},
    {q:"Etiqueta C: color:",a:["Verde","Amarillo","Gris"],ok:1},
    {q:"Usar marcha adecuada:",a:["No importa","Reduce emisiones","Aumenta velocidad"],ok:1},
    {q:"Etiqueta B: exenta ZBE?",a:["Siempre","Depende ciudad","Nunca"],ok:1},
    {q:"Arrancar y marchar sin esperar:",a:["Mal","Correcto","Solo frío"],ok:1},
    {q:"Etiqueta 0: aparcamiento?",a:["Nunca gratis","Puede ser gratis","Siempre paga"],ok:1},
    {q:"Revisar presión neumáticos:",a:["Cada año","Cada mes","Solo ITVE"],ok:1},
    {q:"Etiqueta ECO: híbridos enchufables:",a:["No","Sí, >40km","Sí, todos"],ok:1},
    {q:"Conducir a revoluciones altas:",a:["Ahorra","Contamina + gasta","No afecta"],ok:1},
    {q:"Etiqueta C: puede entrar ZBE?",a:["Nunca","Depende ciudad/hora","Siempre"],ok:1},
    {q:"Mantenimiento coche:",a:["No afecta medio","Clave para contaminar menos","Solo para ITV"],ok:1}
  ]
};

// 160 CASOS REALES DE CONDUCCIÓN
const SITUACIONS = {
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

// ===== ESTADO + LÓGICA - GASDRIVE DGT ES V8.2 =====
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
  console.log("GasDrive DGT ES V8.2 cargado");
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

// TEST con preguntas aleatorias cada vez
function cargarPregunta(cat) {
  const s = estado.test[cat];
  const preguntas = barajarArray(PREGUNTAS[cat]);
  if(!preguntas || preguntas.length === 0) return;
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
  const casos = barajarArray(SITUACIONES[cat]);
  if(!casos || casos.length === 0) return;
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
    alert('Faltan preguntas. Necesitas 30 minimo.');
    return;
  }
  estado.examen.preguntas = barajarArray(todas).slice(0, 30);
  estado.examen.activa = true;
  estado.examen.index = 0;
  estado.examen.aciertos = 0;
  estado.examen.fallos = 0;
  estado.examen.categoria = 'general';

  const tipoExamen = {
    general: "EXAMEN OFICIAL 30 PREGUNTAS - General",
    mecanica: "EXAMEN OFICIAL 30 PREGUNTAS - Mecanica",
    medioambiente: "EXAMEN OFICIAL 30 PREGUNTAS - Medio Ambiente",
    senales: "EXAMEN OFICIAL 30 PREGUNTAS - Senales"
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
    <div class="temario-item" onclick="abrirPDF('./01_Senales_Tomo_I_RD_465_2025.pdf')">
      <div style="font-size:40px">🚦</div>
      <div>Senales</div>
      <div style="font-size:11px;color:#999">RD 465/2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf')">
      <div style="font-size:40px">📋</div>
      <div>Normas Circulacion</div>
      <div style="font-size:11px;color:#999">Edicion 2024</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./03_Manual_IX_Primeros_Auxilios_2025.pdf')">
      <div style="font-size:40px">🚑</div>
      <div>Primeros Auxilios</div>
      <div style="font-size:11px;color:#999">Manual IX 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./04_Manual_VIII_Mecanica_2024.pdf')">
      <div style="font-size:40px">⚙️</div>
      <div>Mecanica</div>
      <div style="font-size:11px;color:#999">Manual VIII 2025</div>
    </div>
    <div class="temario-item" onclick="abrirPDF('./05_Medio_Ambiente_Distintius_DGT_2025.pdf')">
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
    "Cada fallo te hace mas fuerte 🔥",
    "El examen DGT es tuyo 🚗",
    "No pares ahora 💎",
    "Concentrate y aprobaras 👑"
  ];
  const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
  const el = document.getElementById('motivacion');
  if(el) el.textContent = msg;
}

// SERVICE WORKER REGISTRO
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
.then(reg => console.log('SW registrado'))
.catch(err => console.log('SW error:', err));
  });
}
 


  
