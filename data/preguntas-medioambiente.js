export const PREGUNTAS_MEDIOAMBIENTE = [
    // === ETIQUETAS AMBIENTALES === Pág 15-20
    {q:"¿Qué es la etiqueta ambiental B?",a:["Eléctrico","Gasolina Euro 3/4/5/6 y Diésel Euro 4/5","Híbrido"],ok:1},
    {q:"Etiqueta B: diésel de:",a:["Euro 3","Euro 4, 5 y 6","Euro 2"],ok:1},
    {q:"Etiqueta B: gasolina de:",a:["Euro 2","Euro 3, 4, 5 y 6","Euro 1"],ok:1},
    {q:"Etiqueta B: color:",a:["Verde","Amarillo","Azul"],ok:1, img:"etiqueta-b.png"},
    {q:"Etiqueta C: coche gasolina de:",a:["Euro 3","Euro 4, 5 y 6","Eléctrico"],ok:1},
    {q:"Etiqueta C: diésel de:",a:["Euro 3","Euro 4, 5 y 6","Euro 2"],ok:1},
    {q:"Etiqueta C: color:",a:["Verde","Amarillo","Gris"],ok:0, img:"etiqueta-c.png"},
    {q:"Etiqueta ECO: incluye:",a:["Solo eléctrico","Híbridos, GLP, GNC","Diésel Euro 6"],ok:1},
    {q:"Etiqueta ECO: híbridos enchufables:",a:["No","Sí, con autonomía <40km","Sí, todos"],ok:1},
    {q:"Etiqueta ECO: gas natural:",a:["No","Sí, GNC y GLP","Solo biogás"],ok:1},
    {q:"Etiqueta ECO: color:",a:["Azul","Verde-azul","Amarillo"],ok:1, img:"etiqueta-eco.png"},
    {q:"Coche con etiqueta 0 emite:",a:["CO2 bajo","Cero emisiones tubo escape","Solo CO"],ok:1},
    {q:"Etiqueta 0: ejemplos:",a:["Diésel Euro 6","Eléctrico, H2, PHEV ≥40km autonomía","Gasolina Euro 5"],ok:1, img:"etiqueta-0.png"},
    {q:"Etiqueta 0: recarga PHEV:",a:["No hace falta","Obligatoria para mantener etiqueta","Solo gas"],ok:1},
    {q:"Etiqueta A no existe porque:",a:["Todos contaminan","Ya es 0 y ECO las mejores","No hay coches"],ok:1},

    // === ZBE ZONAS BAJAS EMISIONES 2026 === Pág 85-87
    {q:"¿Qué es ZBE?",a:["Zona azul","Zona bajas emisiones","Zona bus"],ok:1, img:"senal-r118-zbe.png"},
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
    {q:"Cómo saber si puedo entrar ZBE:",a:["Preguntar","Web DGT + etiqueta parabrisas","Solo ITV"],ok:1, img:"colocacion-etiqueta.png"},

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
];
