export const PREGUNTAS_MECANICA = [
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
];
