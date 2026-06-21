const PREGUNTAS_NORMAS = [
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
    {q:"Vado permanente:",a:["Aparca","Prohibido aparcar","Solo 5 min"],ok:1},

    // === LUCES TEMA 15 === Pág 279-289
    {q:"Luz de cruce obligatoria:",a:["Solo noche","Noche + túneles + niebla + lluvia","Solo túneles"],ok:1},
    {q:"Luz carretera/corta:",a:["Carretera se usa en ciudad","Cruce alumbra 40m, carretera 100m","Son iguales"],ok:1},
    {q:"Antiniebla delantera:",a:["Siempre encendida","Niebla intensa, lluvia fuerte o nieve","De noche"],ok:1},
    {q:"Antiniebla trasera:",a:["Con lluvia normal","Solo niebla intensa o lluvia muy fuerte","Siempre"],ok:1},
    {q:"Avería luces noche en vía:",a:["Seguir con posición","Parar, señalizar y pedir ayuda","Pon largas"],ok:1},
    {q:"Luces emergencia:",a:["Solo accidente","Inmovilización, emergencia, obras","Adelantar"],ok:1},
    {q:"Luz posición sola:",a:["Permitida siempre","Prohibida en marcha, solo parado","Obligatoria ciudad"],ok:1},
    {q:"Intermitente averiado:",a:["Sacar brazo señalando","Seguir sin avisar","Tocar claxon"],ok:0},
    {q:"Luz marcha atrás:",a:["Blanca, se enciende al meter marcha atrás","Roja fija","Amarilla"],ok:0},
    {q:"Túnel alumbrado encendido:",a:["Posición","Cruce obligatoria","Largas"],ok:1},

    // === ADELANTAMIENTO TEMA 10-11 === Pág 212-229
    {q:"Distancia frontal camión >3,5t:",a:["30 metros","50 metros mínimo","10 metros"],ok:1},
    {q:"Adelantar en intersección:",a:["Sí, si hay prioridad","No, prohibido salvo rotonda","Solo motos"],ok:1},
    {q:"Adelantar en paso peatones:",a:["Sí, con cuidado","No, nunca","Solo bicis"],ok:1},
    {q:"Adelantar línea continua:",a:["Sí, rápido","No, salvo ciclista a <10km/h","Siempre"],ok:1},
    {q:"Adelantar curva sin visibilidad:",a:["Sí, con claxon","No, prohibido","Solo si hay 2 carriles"],ok:1},
    {q:"Vehículo adelantado debe:",a:["Acelerar","Mantener velocidad/dar facilidades","Frenar"],ok:1},
    {q:"Adelantar por derecha:",a:["Nunca","Permitido en ciudad 2+ carriles si tráfico denso","Siempre"],ok:1},
    {q:"Separación lateral ciclista:",a:["1 metro","1,5 metros mínimo","0,5 metros"],ok:1},

    // === PARADA Y ESTACIONAMIENTO TEMA 14 === Pág 269-272
    {q:"Distancia mínima borde calzada:",a:["1 metro","3 metros mínimo","5 metros"],ok:1},
    {q:"Parar en vado permanente:",a:["5 minutos máximo","Prohibido siempre","Permitido si no molesta"],ok:1},
    {q:"Estacionar carga/descarga horario:",a:["Permitido siempre","Prohibido en horario señalizado","Solo 10 min"],ok:1},
    {q:"Parar en paso peatones:",a:["Permitido sin obstaculizar","Prohibido","Solo 30 seg"],ok:1},
    {q:"Estacionar doble fila:",a:["Permitido con conductor","Prohibido siempre","Solo 2 min"],ok:1},
    {q:"Parar mediana/separador:",a:["Permitido moto","Prohibido siempre","Permitido coche"],ok:1},
    {q:"Colocar vehículo parado:",a:["Como quieras","Paralelo al borde salvo señal","En diagonal siempre"],ok:1},

    // === SEMÁFOROS Y AGENTES TEMA 7 === Pág 140-159
    {q:"Semáforo ámbar fijo:",a:["Acelera para pasar","Detente salvo no puedas con seguridad","Sigue igual"],ok:1},
    {q:"Semáforo ámbar intermitente:",a:["Pare obligatorio","Precaución, paso regulado por prioridad","Acelera"],ok:1},
    {q:"Agente brazo extendido horizontal:",a:["Pare todos","Avance todos","Pare los que vienen de frente"],ok:2},
    {q:"Agente brazo vertical arriba:",a:["Siga","Pare todos salvo que ya estén en cruce","Acelere"],ok:1},
    {q:"Agente brazo balanceando:",a:["Pare","Exige acelerar","Exige disminuir velocidad"],ok:2},

    // === MANIOBRAS TEMA 9 === Pág 195-210
    {q:"Marcha atrás:",a:["Cuando quieras","Solo imprescindible y trayecto corto","Nunca"],ok:1},
    {q:"Cambio sentido:",a:["Donde quieras","Solo donde esté permitido y sin peligro","Nunca en ciudad"],ok:1},
    {q:"Incorporación vía desde arcén:",a:["Sales directo","Cedes paso a los de vía principal","Tienes preferencia"],ok:1},
    {q:"Desplazamiento lateral carril:",a:["Giras volante","Espejo + ángulo muerto + intermitente","Solo espejo"],ok:1},
    {q:"Obstrucción calzada sin señalizar:",a:["Multa","Multa + retirada vehículo","Solo aviso"],ok:0},

    // === OTRAS NORMAS === Pág 341-378
    {q:"Transporte niños <135cm:",a:["Delante siempre","Atrás con SRI adecuado a peso/talla","Sin SRI si trayecto corto"],ok:1},
    {q:"Puertas abiertas:",a:["Prohibido circular","Permitido en atasco","Solo moto"],ok:0},
    {q:"Publicidad en vehículo particular:",a:["Libre","Prohibida salvo autorización","Solo luna trasera"],ok:1},
    {q:"Abandono vehículo vía pública:",a:["6 meses = residuo sólido","1 mes = residuo sólido","Nunca es residuo"],ok:0},
    {q:"Deteriorar señal tráfico:",a:["Multa leve","Multa grave + retirada puntos","Solo aviso"],ok:1}
];
window.PREGUNTAS_NORMAS = PREGUNTAS_NORMAS;