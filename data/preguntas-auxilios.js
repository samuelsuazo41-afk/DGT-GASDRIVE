 const PREGUNTAS_AUXILIOS= [
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
];
