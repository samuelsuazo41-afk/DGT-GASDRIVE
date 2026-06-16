// assets/imagenes.js
// Mapeo: "Pregunta exacta": "ruta/imagen.jpg"
// Formato: img/temario/pXX_nombre.jpg

const IMAGENES = {
  // === SEÑALES BLOQUE 1 - 100 preguntas ===
  
  // PRIORIDAD R-1 a R-6
  "Señal de STOP octogonal R-2:": "img/senales/p65_stop.jpg",
  "Triángulo invertido R-1 es:": "img/senales/p65_ceda_paso.jpg",
  "Señal R-3 calzada con prioridad:": "img/senales/p66_calzada_prioridad.jpg",
  "Señal R-4 fin de prioridad:": "img/senales/p66_fin_prioridad.jpg",
  "Señal R-5 prioridad sentido contrario:": "img/senales/p66_prioridad_contrario.jpg",
  "Señal R-6 prioridad respecto contrario:": "img/senales/p66_prioridad_respecto.jpg",

  // PROHIBICIÓN R-100 a R-310
  "Círculo rojo con línea R-101:": "img/senales/p68_prohibido_entrada.jpg",
  "Señal R-102 entrada prohibida vehículos motor:": "img/senales/p68_prohibido_motor.jpg",
  "Señal R-104 entrada prohibida motos:": "img/senales/p68_prohibido_motos.jpg",
  "Señal R-105 entrada prohibida camiones:": "img/senales/p68_prohibido_camiones.jpg",
  "Señal R-106 entrada prohibida buses:": "img/senales/p69_prohibido_buses.jpg",
  "Señal R-107 entrada prohibida ciclos:": "img/senales/p69_prohibido_bicis.jpg",
  "Señal R-108 entrada prohibida ciclomotores:": "img/senales/p69_prohibido_ciclomotor.jpg",
  "Señal R-111 entrada prohibida vehículos agrícolas:": "img/senales/p69_prohibido_tractor.jpg",
  "Señal R-112 entrada prohibida animales montura:": "img/senales/p69_prohibido_montura.jpg",
  "Señal R-113 entrada prohibida carros mano:": "img/senales/p69_prohibido_carros.jpg",
  "Señal R-114 entrada prohibida peatones:": "img/senales/p69_prohibido_peatones.jpg",
  "Señal R-116 entrada prohibida animales sueltos:": "img/senales/p70_prohibido_ganado.jpg",
  "Señal circular rojo con 3,5t R-201:": "img/senales/p70_peso_35t.jpg",
  "Señal R-202 anchura máxima:": "img/senales/p70_anchura_max.jpg",
  "Señal R-203 altura máxima:": "img/senales/p70_altura_max.jpg",
  "Señal R-204 longitud máxima:": "img/senales/p70_longitud_max.jpg",
  "Señal R-300 velocidad máxima:": "img/senales/p72_velocidad_max.jpg",
  "Señal R-301 fin velocidad máxima:": "img/senales/p72_fin_velocidad.jpg",
  "Señal R-302 giro izquierda prohibido:": "img/senales/p73_giro_izq_prohibido.jpg",
  "Señal R-303 giro derecha prohibido:": "img/senales/p73_giro_der_prohibido.jpg",
  "Señal R-304 cambio sentido prohibido:": "img/senales/p73_cambio_sentido_prohibido.jpg",
  "Señal R-305 adelantamiento prohibido:": "img/senales/p73_adelantar_prohibido.jpg",
  "Señal R-306 fin prohibición adelantar:": "img/senales/p73_fin_adelantar.jpg",
  "Señal R-307 adelantamiento prohibido camiones:": "img/senales/p73_adelantar_camiones.jpg",
  "Señal R-308 fin prohibición adelantar camiones:": "img/senales/p74_fin_adelantar_camiones.jpg",
  "Señal R-309 zona prohibida adelantar:": "img/senales/p74_zona_adelantar.jpg",
  "Señal R-310 señales acústicas prohibidas:": "img/senales/p74_claxon_prohibido.jpg",

  // OBLIGACIÓN R-400 a R-422
  "Círculo azul con flecha R-400:": "img/senales/p75_sentido_obligatorio.jpg",
  "Señal R-401 sentido obligatorio derecha:": "img/senales/p75_obligatorio_derecha.jpg",
  "Señal R-402 sentido obligatorio izquierda:": "img/senales/p75_obligatorio_izquierda.jpg",
  "Señal R-403 paso obligatorio derecha:": "img/senales/p75_paso_derecha.jpg",
  "Señal R-404 paso obligatorio izquierda:": "img/senales/p75_paso_izquierda.jpg",
  "Señal R-405 único sentido:": "img/senales/p75_sentido_unico.jpg",
  "Señal R-407 vía reservada ciclistas:": "img/senales/p76_carril_bici.jpg",
  "Señal R-410 vía reservada peatones y ciclos:": "img/senales/p76_peatones_ciclos.jpg",
  "Señal R-411 velocidad mínima:": "img/senales/p76_velocidad_min.jpg",
  "Señal R-412 fin velocidad mínima:": "img/senales/p76_fin_vel_min.jpg",
  "Señal R-413 alumbrado corto alcance:": "img/senales/p76_luces_cruce.jpg",
  "Señal R-414 fin alumbrado corto:": "img/senales/p76_fin_luces.jpg",
  "Señal R-415 cadenas para nieve:": "img/senales/p76_cadenas.jpg",
  "Señal R-416 fin cadenas nieve:": "img/senales/p77_fin_cadenas.jpg",
  "Señal R-417 uso obligatorio cinturón:": "img/senales/p77_cinturon.jpg",
  "Señal R-418 vía para automóviles:": "img/senales/p77_automoviles.jpg",
  "Señal R-422 fin vía reservada:": "img/senales/p77_fin_reservada.jpg",

  // PELIGRO P-1 a P-50
  "Rombo amarillo P-1:": "img/senales/p78_peligro.jpg",
  "Señal P-2 intersección con prioridad:": "img/senales/p78_interseccion_prioridad.jpg",
  "Señal P-3 semáforos:": "img/senales/p78_semaforos.jpg",
  "Señal P-4 intersección giratoria:": "img/senales/p78_rotonda.jpg",
  "Señal P-13a curva peligrosa derecha:": "img/senales/p78_curva_derecha.jpg",
  "Señal P-13b curva peligrosa izquierda:": "img/senales/p78_curva_izquierda.jpg",
  "Señal P-14a curvas peligrosas primera derecha:": "img/senales/p79_curvas_derecha.jpg",
  "Señal P-15 perfil irregular:": "img/senales/p79_perfil_irregular.jpg",
  "Señal P-16a bajada peligrosa:": "img/senales/p79_bajada.jpg",
  "Señal P-16b subida peligrosa:": "img/senales/p79_subida.jpg",
  "Señal P-17 estrechamiento:": "img/senales/p79_estrechamiento.jpg",
  "Señal P-17a estrechamiento derecha:": "img/senales/p79_estrecha_derecha.jpg",
  "Señal P-17b estrechamiento izquierda:": "img/senales/p79_estrecha_izquierda.jpg",
  "Señal P-18 obras:": "img/senales/p79_obras.jpg",
  "Señal P-19 pavimento deslizante:": "img/senales/p79_deslizante.jpg",
  "Señal P-20 peatones:": "img/senales/p79_peatones.jpg",
  "Señal P-21 niños:": "img/senales/p79_ninos.jpg",
  "Señal P-22 ciclistas:": "img/senales/p79_ciclistas.jpg",
  "Señal P-23 animales domésticos:": "img/senales/p80_animales_domesticos.jpg",
  "Señal P-24 animales salvajes:": "img/senales/p80_animales_salvajes.jpg",
  "Señal P-25 circulación dos sentidos:": "img/senales/p80_dos_sentidos.jpg",
  "Señal P-26 desprendimientos:": "img/senales/p80_desprendimientos.jpg",
  "Señal P-28 proyección gravilla:": "img/senales/p80_gravilla.jpg",
  "Señal P-29 viento transversal:": "img/senales/p80_viento.jpg",
  "Señal P-30 escalón lateral:": "img/senales/p80_escalon.jpg",
  "Señal P-31 congestión:": "img/senales/p80_congestion.jpg",
  "Señal P-32 obstrucción calzada:": "img/senales/p80_obstruccion.jpg",
  "Señal P-33 visibilidad reducida:": "img/senales/p80_visibilidad.jpg",
  "Señal P-34 pavimento deslizante hielo/nieve:": "img/senales/p80_hielo.jpg",
  "Señal P-50 otros peligros:": "img/senales/p80_otros_peligros.jpg",

  // INDICACIÓN CARRILES S-50 a S-62
  "Señal S-50 carriles reservados:": "img/senales/p88_carriles_reservados.jpg",
  "Señal S-51 carril bus:": "img/senales/p88_carril_bus.jpg",
  "Señal S-52 fin carril bus:": "img/senales/p88_fin_bus.jpg",
  "Señal S-53 carril bus-VAO:": "img/senales/p88_bus_vao.jpg",
  "Señal S-60 bifurcación:": "img/senales/p89_bifurcacion_derecha.jpg",
  "Señal S-61 bifurcación izquierda:": "img/senales/p89_bifurcacion_izquierda.jpg",
  "Señal S-62 preseñalización carriles:": "img/senales/p90_presenalizacion.jpg",

  // SERVICIOS S-100 a S-126
  "Señal S-100 estación servicio:": "img/senales/p92_gasolinera.jpg",
  "Señal S-101 taller mecánico:": "img/senales/p92_taller.jpg",
  "Señal S-102 teléfono:": "img/senales/p92_telefono.jpg",
  "Señal S-103 restaurante:": "img/senales/p92_restaurante.jpg",
  "Señal S-104 hotel:": "img/senales/p92_hotel.jpg",
  "Señal S-105 camping:": "img/senales/p93_camping.jpg",
  "Señal S-106 terreno caravanas:": "img/senales/p93_caravanas.jpg",
  "Señal S-107 merendero:": "img/senales/p93_merendero.jpg",
  "Señal S-108 punto partida excursiones:": "img/senales/p93_excursiones.jpg",
  "Señal S-109 camping y caravanas:": "img/senales/p93_camping_caravanas.jpg",
  "Señal S-110 hotel:": "img/senales/p93_hotel_2.jpg",
  "Señal S-111 restaurante:": "img/senales/p93_restaurante_2.jpg",
  "Señal S-112 cafetería:": "img/senales/p93_cafeteria.jpg",
  "Señal S-113 área descanso:": "img/senales/p94_area_descanso.jpg",
  "Señal S-114 aparcamiento:": "img/senales/p94_aparcamiento.jpg",
  "Señal S-115 aparcamiento cubierto:": "img/senales/p94_aparcamiento_cubierto.jpg",
  "Señal S-116 aparcamiento vigilado:": "img/senales/p94_aparcamiento_vigilado.jpg",
  "Señal S-117 hospital:": "img/senales/p94_hospital.jpg",
  "Señal S-118 puesto socorro:": "img/senales/p94_socorro.jpg",
  "Señal S-119 bascula:": "img/senales/p94_bascula.jpg",
  "Señal S-120 control policía:": "img/senales/p94_policia.jpg",
  "Señal S-121 extintor:": "img/senales/p94_extintor.jpg",
  "Señal S-122 salida emergencia:": "img/senales/p95_salida_emergencia.jpg",
  "Señal S-123 área servicio:": "img/senales/p95_area_servicio.jpg",
  "Señal S-124 punto recarga eléctrico:": "img/senales/p95_recarga_electrico.jpg",
  "Señal S-125 punto información:": "img/senales/p95_informacion.jpg",
  "Señal S-126 centro inspección:": "img/senales/p95_itv.jpg",

  // PANELES S-800 a S-870
  "Panel S-800 distancia:": "img/senales/p96_distancia.jpg",
  "Panel S-810 longitud tramo:": "img/senales/p96_longitud.jpg",
  "Panel S-820 extensión prohibición:": "img/senales/p96_extension.jpg",
  "Panel S-830 fin prohibición:": "img/senales/p96_fin_prohibicion.jpg",
  "Panel S-840 dirección tramo:": "img/senales/p96_direccion.jpg",
  "Panel S-850 itinerario desvío:": "img/senales/p96_desvio.jpg",
  "Panel S-860 nieve:": "img/senales/p96_nieve.jpg",
  "Panel S-870 texto:": "img/senales/p96_texto.jpg",

    // === NORMAS BLOQUE 2 - 160 preguntas ===
  
  // ALCOHOL Y DROGAS
  "Tasa de alcohol general turismos:": "img/normas/p45_tasa_general.jpg",
  "Tasa de alcohol noveles y profesionales:": "img/normas/p45_tasa_novel.jpg",
  "Tasa de alcohol ciclomotor:": "img/normas/p45_tasa_ciclomotor.jpg",
  "Negarse a prueba alcoholemia:": "img/normas/p46_negarse.jpg",
  "Alcohol >0,6 g/l sangre:": "img/normas/p46_delito_alcohol.jpg",
  "Drogas al volante:": "img/normas/p46_drogas.jpg",
  "Medicamentos con somnolencia:": "img/normas/p47_medicamentos.jpg",

  // VELOCIDAD
  "Límite ciudad genérico 2026:": "img/normas/p25_limite_ciudad.jpg",
  "Límite calle plataforma única:": "img/normas/p25_plataforma_unica.jpg",
  "Límite autovía turismos:": "img/normas/p27_limite_autovia.jpg",
  "Límite autopista turismos:": "img/normas/p27_limite_autopista.jpg",
  "Límite convencional 90 km/h:": "img/normas/p27_convencional_90.jpg",
  "Límite convencional camiones:": "img/normas/p28_convencional_camion.jpg",
  "Velocidad +60km/h en vía 50:": "img/normas/p31_delito_velocidad.jpg",
  "Velocidad mínima autopista:": "img/normas/p27_minima_autopista.jpg",
  "Velocidad mínima autovía:": "img/normas/p27_minima_autovia.jpg",
  "Velocidad zona escolar:": "img/normas/p25_zona_escolar.jpg",

  // CINTURÓN Y SEGURIDAD
  "Cinturón obligatorio:": "img/normas/p55_cinturon_todos.jpg",
  "Multa no llevar cinturón:": "img/normas/p55_multa_cinturon.jpg",
  "Multa no llevar cinturón detrás:": "img/normas/p55_multa_detras.jpg",
  "Casco moto obligatorio:": "img/normas/p60_casco_moto.jpg",
  "Multa no llevar casco moto:": "img/normas/p60_multa_casco.jpg",
  "SRI grupo 0 hasta:": "img/normas/p57_sri_0.jpg",
  "SRI grupo 1:": "img/normas/p57_sri_1.jpg",
  "SRI de espaldas hasta:": "img/normas/p57_sri_espaldas.jpg",
  "Multa niño sin SRI:": "img/normas/p57_multa_sri.jpg",

  // PUNTOS Y PERMISOS
  "Edad mínima carnet B:": "img/normas/p15_edad_b.jpg",
  "Puntos carnet nuevo:": "img/normas/p10_puntos_nuevo.jpg",
  "Puntos máximo sin infracciones:": "img/normas/p10_puntos_maximo.jpg",
  "Pérdida total puntos:": "img/normas/p12_perdida_total.jpg",
  "Recuperar puntos parcial:": "img/normas/p13_curso_12h.jpg",
  "Recuperar puntos total:": "img/normas/p12_curso_24h.jpg",
  "Caducidad permiso B hasta 65 años:": "img/normas/p15_caducidad_65.jpg",
  "Caducidad permiso B desde 65 años:": "img/normas/p15_caducidad_65mas.jpg",
  "Años sin infracciones +2 puntos:": "img/normas/p13_mas2puntos.jpg",
  "Años sin infracciones +1 punto:": "img/normas/p13_mas1punto.jpg",

  // DOCUMENTACIÓN E ITV
  "Documentación obligatoria:": "img/normas/p20_documentacion.jpg",
  "ITV turismo nuevo primera:": "img/normas/p20_itv_nuevo.jpg",
  "ITV turismo 4-10 años:": "img/normas/p20_itv_4_10.jpg",
  "ITV turismo +10 años:": "img/normas/p20_itv_10mas.jpg",
  "Multa sin ITV en vigor:": "img/normas/p20_multa_itv.jpg",
  "Seguro obligatorio mínimo:": "img/normas/p21_seguro_rc.jpg",
  "Multa circular sin seguro:": "img/normas/p21_multa_seguro.jpg",
  "Chaleco reflectante obligatorio:": "img/normas/p61_chaleco.jpg",
  "Multa no llevar chaleco:": "img/normas/p61_multa_chaleco.jpg",
  "Triángulos avería:": "img/normas/p61_triangulos.jpg",
  "Multa no señalizar avería autovía:": "img/normas/p61_multa_senalizar.jpg",

  // INFRACCIONES Y PUNTOS
  "Multa móvil en mano:": "img/normas/p35_movil_mano.jpg",
  "Multa saltarse STOP:": "img/normas/p36_multa_stop.jpg",
  "Multa saltarse semáforo rojo:": "img/normas/p36_multa_semaforo.jpg",
  "Multa saltarse ceda el paso:": "img/normas/p36_multa_ceda.jpg",
  "Multa adelantar línea continua:": "img/normas/p37_multa_continua.jpg",
  "Multa no ceder paso peatón cebra:": "img/normas/p48_multa_peaton.jpg",
  "Multa circular arcén sin causa:": "img/normas/p37_multa_arcen.jpg",
  "Conducir sin carnet:": "img/normas/p16_sin_carnet.jpg",
  "Huir accidente con heridos:": "img/normas/p52_huir.jpg",
  "Velocidad +20km/h ciudad:": "img/normas/p30_velocidad_ciudad.jpg",
  "Velocidad +50km/h autopista:": "img/normas/p30_velocidad_autopista.jpg",

  // PRIORIDAD
  "Peatón tiene preferencia:": "img/normas/p48_peaton_cebra.jpg",
  "Ciclista tiene preferencia:": "img/normas/p49_ciclista_prioridad.jpg",
  "Bus tiene preferencia:": "img/normas/p52_bus_parada.jpg",
  "Ambulancia tiene preferencia:": "img/normas/p52_ambulancia.jpg",
  "Policía tiene preferencia:": "img/normas/p52_policia.jpg",
  "Prioridad derecha:": "img/normas/p48_prioridad_derecha.jpg",
  "Prioridad rotonda:": "img/normas/p50_rotonda.jpg",
  "Prioridad subida cuesta estrecha:": "img/normas/p51_subida.jpg",
  "Prioridad tranvía:": "img/normas/p48_tranvia.jpg",
  "Prioridad tren paso nivel:": "img/normas/p82_tren.jpg",
  "Prioridad bus escolar parando:": "img/normas/p93_bus_escolar.jpg",

  // ZBE ZONAS BAJAS EMISIONES 2026
  "Coche sin etiqueta en ZBE:": "img/normas/p85_zbe_sin_etiqueta.jpg",
  "Etiqueta B en ZBE Madrid 2026:": "img/normas/p85_zbe_b_madrid.jpg",
  "Etiqueta C en ZBE Barcelona:": "img/normas/p85_zbe_c_barcelona.jpg",
  "Etiqueta ECO en ZBE:": "img/normas/p86_eco_zbe.jpg",
  "Etiqueta 0 en ZBE:": "img/normas/p86_0_zbe.jpg",
  "Multa entrar ZBE sin etiqueta:": "img/normas/p87_multa_zbe.jpg",
  "Moto sin etiqueta en ZBE:": "img/normas/p87_moto_zbe.jpg",
  "Vehículo histórico en ZBE:": "img/normas/p87_historico_zbe.jpg",
  "ZBE activa fines de semana:": "img/normas/p85_zbe_finde.jpg",
  "Cómo saber si mi coche puede entrar ZBE:": "img/normas/p85_consulta_zbe.jpg",

  // PATINETES ELÉCTRICOS 2026
  "Patinete eléctrico por acera:": "img/normas/p88_patinete_acera.jpg",
  "Velocidad máxima patinete:": "img/normas/p89_velocidad_patinete.jpg",
  "Patinete necesita seguro:": "img/normas/p88_seguro_patinete.jpg",
  "Casco patinete obligatorio:": "img/normas/p89_casco_patinete.jpg",
  "Patinete por carril bici:": "img/normas/p89_carril_bici_patinete.jpg",
  "Patinete con auriculares:": "img/normas/p89_auriculares_patinete.jpg",
  "Patinete con pasajero:": "img/normas/p89_pasajero_patinete.jpg",
  "Patinete alcohol:": "img/normas/p89_alcohol_patinete.jpg",
  "Patinete móvil en mano:": "img/normas/p89_movil_patinete.jpg",
  "Edad mínima patinete:": "img/normas/p89_edad_patinete.jpg",

  // TACÓGRAFO Y TIEMPOS
  "Tacógrafo obligatorio:": "img/normas/p91_tacografo.jpg",
  "Tiempo conducción máximo sin pausa:": "img/normas/p91_tiempo_conduccion.jpg",
  "Pausa mínima tras 4h 30min:": "img/normas/p91_pausa.jpg",
  "Conducción diaria máxima:": "img/normas/p91_diaria_max.jpg",
  "Descanso diario mínimo:": "img/normas/p91_descanso_diario.jpg",
  "Conducción semanal máxima:": "img/normas/p91_semanal_max.jpg",
  "Descanso semanal mínimo:": "img/normas/p91_descanso_semanal.jpg",

  // REMOLQUES Y CARGAS
  "Remolque ligero hasta:": "img/normas/p95_remolque_750.jpg",
  "Remolque >750kg necesita:": "img/normas/p95_be.jpg",
  "Carga sobresale detrás máximo:": "img/normas/p97_carga_detras.jpg",
  "Carga sobresale señalizar:": "img/normas/p97_v20.jpg",
  "Carga sobresale de noche:": "img/normas/p97_luz_roja.jpg",
  "Peso maletero:": "img/normas/p97_peso_maletero.jpg",
  "Bicicleta en portabicis:": "img/normas/p96_portabicis.jpg",

  // CONDUCCIÓN Y SEGURIDAD
  "Distancia seguridad seco:": "img/normas/p32_distancia_seco.jpg",
  "Distancia seguridad lluvia:": "img/normas/p33_distancia_lluvia.jpg",
  "Distancia adelantar ciclista:": "img/normas/p65_15metros.jpg",
  "Intermitente antes girar:": "img/normas/p104_intermitente.jpg",
  "Cambio carril:": "img/normas/p53_cambio_carril.jpg",
  "Obstrucción calzada:": "img/normas/p104_obstruccion.jpg",
  "Coche parado arcén:": "img/normas/p104_parado_arcen.jpg",
  "Túnel luces obligatorias:": "img/normas/p102_tunel_luces.jpg",
  "Obras señal naranja:": "img/normas/p104_obras.jpg",
  "Cambio sentido:": "img/normas/p65_cambio_sentido.jpg",
  "Marcha atrás:": "img/normas/p65_marcha_atras.jpg",
  "Adelantamiento seguro:": "img/normas/p65_adelantamiento.jpg",
  "Adelantar paso peatones:": "img/normas/p66_paso_peatones.jpg",
  "Adelantar en intersección:": "img/normas/p66_interseccion.jpg",

  // INCORPORACIONES Y SALIDAS
  "Incorporación carril aceleración:": "img/normas/p52_carril_aceleracion.jpg",
  "Salida autopista carril izquierdo:": "img/normas/p52_salida_izquierda.jpg",
  "Ceda paso incorporación:": "img/normas/p52_ceda_incorporacion.jpg",
  "STOP incorporación sin línea:": "img/normas/p52_stop_incorporacion.jpg",
  "Glorieta 2 carriles salir 2ª:": "img/normas/p50_glorieta_izquierda.jpg",
  "Glorieta 2 carriles salir 1ª:": "img/normas/p50_glorieta_derecha.jpg",

  // VEHÍCULOS ESPECIALES
  "Conductor novel señal V-13:": "img/normas/p75_l_novel.jpg",
  "Vehículo lento V-4:": "img/normas/p76_triangulo_naranja.jpg",
  "Transporte escolar V-10:": "img/normas/p76_escolar.jpg",
  "Mercancías peligrosas:": "img/normas/p94_panel_naranja.jpg",
  "Vehículo prioritario parado:": "img/normas/p52_prioritario_parado.jpg",

  // MEDIOAMBIENTE Y EFICIENCIA
  "Conducción eficiente reduce:": "img/medioambiente/p25_eficiente.jpg",
  "Apagar motor parado >:": "img/medioambiente/p26_apagar_motor.jpg",
  "Marcha larga rpm bajas:": "img/medioambiente/p27_marcha_larga.jpg",
  "Aire acondicionado:": "img/medioambiente/p39_aa.jpg",
  "Neumáticos desinflados:": "img/medioambiente/p36_neumaticos.jpg",
  "Peso innecesario 100kg:": "img/medioambiente/p37_peso.jpg",
  "Baca en techo:": "img/medioambiente/p38_baca.jpg",
  "Arrancar en frío:": "img/medioambiente/p49_arranque_frio.jpg",

  // SITUACIONES ESPECIALES
  "Animal en vía:": "img/normas/p81_animal_via.jpg",
  "Tractor vía interurbana:": "img/normas/p29_tractor.jpg",
  "Final autovía incorporación:": "img/normas/p52_final_autovia.jpg",
  "Zona ORA:": "img/normas/p71_zona_ora.jpg",
  "Park & Ride:": "img/normas/p53_park_ride.jpg",
  "Carril bus:": "img/normas/p71_carril_bus.jpg",
  "Carril bici línea continua:": "img/normas/p71_carril_bici.jpg",
  "Paso nivel sin barreras:": "img/normas/p82_paso_nivel.jpg",
  "Puente móvil:": "img/normas/p82_puente_movil.jpg",
  "Vado permanente:": "img/normas/p70_vado.jpg",

    // === MECÁNICA BLOQUE 2 - 100 preguntas ===
  
  // NEUMÁTICOS
  "Presión baja causa:": "img/mecanica/p55_presion_baja.jpg",
  "Neumático liso profundidad mínima:": "img/mecanica/p56_profundidad.jpg",
  "Neumático liso consecuencias:": "img/mecanica/p56_liso_multa.jpg",
  "Presión alta causa:": "img/mecanica/p55_presion_alta.jpg",
  "Desgaste irregular neumático:": "img/mecanica/p56_desgaste_irregular.jpg",
  "Neumáticos M+S significa:": "img/mecanica/p57_ms.jpg",
  "Neumáticos 3PMSF significa:": "img/mecanica/p58_3pmsf.jpg",
  "Rotar neumáticos cada:": "img/mecanica/p58_rotar.jpg",
  "Neumático reventón a 120km/h:": "img/mecanica/p62_reventon.jpg",

  // FRENOS
  "Líquido de frenos bajo:": "img/mecanica/p35_liquido_frenos.jpg",
  "Pastillas frenos gastadas síntoma:": "img/mecanica/p36_pastillas.jpg",
  "Discos frenos rayados síntoma:": "img/mecanica/p36_discos.jpg",
  "Pedal freno esponjoso:": "img/mecanica/p37_esponjoso.jpg",
  "Pedal freno se hunde:": "img/mecanica/p37_hunde.jpg",
  "ABS bloquea ruedas:": "img/mecanica/p38_abs.jpg",
  "Testigo ABS encendido:": "img/mecanica/p38_testigo_abs.jpg",
  "Frenar con ABS:": "img/mecanica/p38_frenar_abs.jpg",
  "ESP qué hace:": "img/mecanica/p39_esp.jpg",
  "Testigo ESP encendido fijo:": "img/mecanica/p39_testigo_esp.jpg",

  // MOTOR Y LUBRICACIÓN
  "Testigo aceite rojo encendido:": "img/mecanica/p28_aceite_rojo.jpg",
  "Testigo aceite amarillo:": "img/mecanica/p28_aceite_amarillo.jpg",
  "Aceite muy alto varilla:": "img/mecanica/p28_aceite_alto.jpg",
  "Aceite muy bajo varilla:": "img/mecanica/p28_aceite_bajo.jpg",
  "Humo azul escape significa:": "img/mecanica/p30_humo_azul.jpg",
  "Humo negro escape significa:": "img/mecanica/p30_humo_negro.jpg",
  "Humo blanco denso escape:": "img/mecanica/p30_humo_blanco.jpg",
  "Motor pierde potencia cuesta:": "img/mecanica/p29_perdida_potencia.jpg",
  "Motor se cala al ralentí:": "img/mecanica/p29_cala_ralenti.jpg",
  "Consumo aceite normal:": "img/mecanica/p28_consumo_aceite.jpg",

  // REFRIGERACIÓN
  "Anticongelante sirve para:": "img/mecanica/p31_anticongelante.jpg",
  "Nivel refrigerante bajo:": "img/mecanica/p31_nivel_refrigerante.jpg",
  "Sobrecalentamiento motor:": "img/mecanica/p32_sobrecalentamiento.jpg",
  "Testigo temperatura rojo:": "img/mecanica/p32_testigo_temp.jpg",
  "Ventilador no salta:": "img/mecanica/p33_ventilador.jpg",
  "Calefacción no calienta:": "img/mecanica/p33_calefaccion.jpg",

  // BATERÍA Y ELÉCTRICO
  "Batería descargada arrancar:": "img/mecanica/p41_pinzas.jpg",
  "Testigo batería encendido:": "img/mecanica/p42_testigo_bateria.jpg",
  "Bornes batería sulfatados:": "img/mecanica/p41_bornes.jpg",
  "Batería dura media:": "img/mecanica/p41_duracion_bateria.jpg",
  "Luces no encienden:": "img/mecanica/p43_luces.jpg",
  "Intermitente va rápido:": "img/mecanica/p43_intermitente_rapido.jpg",
  "Claxon no suena:": "img/mecanica/p44_claxon.jpg",
  "Fusible fundido:": "img/mecanica/p44_fusible.jpg",

  // SUSPENSIÓN Y DIRECCIÓN
  "Amortiguadores gastados:": "img/mecanica/p45_amortiguadores.jpg",
  "Dirección dura:": "img/mecanica/p47_direccion_dura.jpg",
  "Volante vibra 80-120km/h:": "img/mecanica/p47_vibra_volante.jpg",
  "Coche tira a un lado:": "img/mecanica/p48_tira_lado.jpg",
  "Ruido al girar volante:": "img/mecanica/p47_ruido_volante.jpg",
  "Holguera dirección:": "img/mecanica/p48_holguera.jpg",

  // TRANSMISIÓN
  "Embrague patina síntoma:": "img/mecanica/p49_embrague_patina.jpg",
  "Caja cambios rasca marchas:": "img/mecanica/p50_rasca_marchas.jpg",
  "Ruido al acelerar:": "img/mecanica/p51_ruido_acelerar.jpg",
  "Vibración al acelerar:": "img/mecanica/p51_vibracion_acelerar.jpg",
  "Cambio automático tirones:": "img/mecanica/p52_tirones_automatico.jpg",

  // ESCAPE Y EMISIONES
  "Escape ruidoso:": "img/mecanica/p53_escape_ruidoso.jpg",
  "Humo negro ITV:": "img/mecanica/p54_humo_itv.jpg",
  "Catalizador roto síntoma:": "img/mecanica/p53_catalizador.jpg",
  "Filtro partículas diésel:": "img/mecanica/p46_fap.jpg",
  "AdBlue para qué sirve:": "img/mecanica/p45_adblue.jpg",
  "Testigo AdBlue encendido:": "img/mecanica/p45_testigo_adblue.jpg",

  // HÍBRIDOS Y ELÉCTRICOS
  "Coche híbrido etiqueta:": "img/mecanica/p73_etiqueta_hibrido.jpg",
  "Híbrido enchufable PHEV 50km:": "img/mecanica/p73_phev_50km.jpg",
  "Híbrido no enchufable HEV:": "img/mecanica/p73_hev.jpg",
  "Coche eléctrico en túnel luces:": "img/mecanica/p75_electrico_tunel.jpg",
  "Cargar eléctrico en lluvia:": "img/mecanica/p75_electrico_lluvia.jpg",
  "Batería híbrido 12V descargada:": "img/mecanica/p74_hibrido_12v.jpg",
  "Mantenimiento eléctrico vs combustión:": "img/mecanica/p74_mantenimiento.jpg",
  "Freno regenerativo eléctrico:": "img/mecanica/p74_regenerativo.jpg",
  "Coche eléctrico se queda sin batería:": "img/mecanica/p75_sin_bateria.jpg",
  "Cable carga eléctrico dañado:": "img/mecanica/p75_cable_danado.jpg",

  // LIMPIAPARABRISAS Y VISIBILIDAD
  "Líquido limpia parabrisas:": "img/mecanica/p59_liquido_limpia.jpg",
  "Limpiaparabrisas no limpia bien:": "img/mecanica/p59_gomas.jpg",
  "Cristales empañados rápido:": "img/mecanica/p60_empanados.jpg",
  "Luneta térmica no funciona:": "img/mecanica/p60_luneta_termica.jpg",

  // AVERÍAS Y SÍNTOMAS
  "Coche no arranca, hace clack:": "img/mecanica/p61_clack.jpg",
  "Coche se para en marcha:": "img/mecanica/p61_para_marcha.jpg",
  "Coche pierde potencia cuesta:": "img/mecanica/p62_pierde_potencia.jpg",
  "Coche consume mucho de repente:": "img/mecanica/p62_consume_mucho.jpg",
  "Coche humea mucho:": "img/mecanica/p62_humea_mucho.jpg",
  "Coche huele a quemado:": "img/mecanica/p63_huele_quemado.jpg",
  "Coche huele a gasolina:": "img/mecanica/p63_huele_gasolina.jpg",
  "Coche huele a aceite quemado:": "img/mecanica/p63_huele_aceite.jpg",
  "Coche huele dulce refrigerante:": "img/mecanica/p63_huele_dulce.jpg",
  "Ruido al pasar baches:": "img/mecanica/p63_ruido_baches.jpg",
  "Puerta no cierra bien:": "img/mecanica/p64_puerta.jpg",
  "Ventana no baja:": "img/mecanica/p64_ventana.jpg",
  "Asiento no se mueve:": "img/mecanica/p64_asiento.jpg",
  "Aire acondicionado no enfría:": "img/mecanica/p64_aa.jpg",

    // === AUXILIOS BLOQUE 3 - 60 preguntas ===
  
  // PROTOCOLO PAS
  "¿Qué haces primero ante un accidente?": "img/auxilios/p40_pas.jpg",
  "Orden correcto protocolo PAS:": "img/auxilios/p40_orden_pas.jpg",
  "Para proteger en autopista:": "img/auxilios/p41_proteger_autopista.jpg",

  // HEMORRAGIAS
  "En una hemorragia arterial, ¿qué haces?": "img/auxilios/p42_hemorragia_arterial.jpg",
  "Hemorragia nasal: ¿qué haces?": "img/auxilios/p43_hemorragia_nasal.jpg",
  "Herida que no para de sangrar:": "img/auxilios/p43_herida_sangra.jpg",
  "Hemorragia externa grave:": "img/auxilios/p42_compresion_directa.jpg",
  "Torniquete se usa cuando:": "img/auxilios/p44_torniquete.jpg",

  // INCONSCIENCIA Y PLS
  "Posición lateral de seguridad sirve para:": "img/auxilios/p46_pls.jpg",
  "Ante pérdida de conocimiento breve:": "img/auxilios/p47_perdida_conocimiento.jpg",
  "Ante vómito con inconsciencia:": "img/auxilios/p47_vomito_inconsciente.jpg",
  "Convulsión acabada, paciente dormido:": "img/auxilios/p47_convulsion_dormido.jpg",
  "Inconsciente no respira:": "img/auxilios/p48_inconsciente_no_respira.jpg",

  // RCP ADULTO Y NIÑO
  "RCP en adulto: compresión/ventilación:": "img/auxilios/p50_rcp_adulto.jpg",
  "RCP en niño 1-8 años:": "img/auxilios/p52_rcp_nino.jpg",
  "RCP en lactante <1 año:": "img/auxilios/p53_rcp_lactante.jpg",
  "Profundidad compresión adulto:": "img/auxilios/p50_profundidad_adulto.jpg",
  "Profundidad compresión niño:": "img/auxilios/p52_profundidad_nino.jpg",
  "Profundidad compresión lactante:": "img/auxilios/p53_profundidad_lactante.jpg",
  "Frecuencia compresiones RCP:": "img/auxilios/p51_frecuencia_rcp.jpg",
  "Parada respiratoria: frecuencia ventilación:": "img/auxilios/p51_ventilacion.jpg",
  "Niño inconsciente que no respira:": "img/auxilios/p52_nino_no_respira.jpg",

  // DEA
  "¿Cuándo usas DEA?": "img/auxilios/p56_dea.jpg",
  "DEA en niño 1-8 años:": "img/auxilios/p57_dea_pediatrico.jpg",
  "DEA en lactante <1 año:": "img/auxilios/p57_dea_lactante.jpg",
  "DEA con parche mojado:": "img/auxilios/p57_dea_mojado.jpg",
  "DEA dice 'no tocar paciente':": "img/auxilios/p57_no_tocar.jpg",

  // OBSTRUCCIÓN VÍA AÉREA
  "¿Qué haces si alguien se atraganta consciente?": "img/auxilios/p49_heimlich.jpg",
  "Atragantado queda inconsciente:": "img/auxilios/p49_atragantado_inconsciente.jpg",
  "Atragantamiento lactante:": "img/auxilios/p50_lactante_atragantado.jpg",
  "Embarazada atragantada:": "img/auxilios/p50_embarazada_atragantada.jpg",

  // TRAUMATISMOS
  "Ante una fractura abierta:": "img/auxilios/p60_fractura_abierta.jpg",
  "Fractura de clavícula: inmovilización:": "img/auxilios/p60_clavicula.jpg",
  "Trauma craneal con vómito:": "img/auxilios/p61_trauma_craneal.jpg",
  "Trauma torácico con dificultad respiratoria:": "img/auxilios/p61_trauma_toracico.jpg",
  "Fractura abierta sangrando mucho:": "img/auxilios/p60_fractura_sangra.jpg",
  "Ante caída de más de 3m:": "img/auxilios/p78_precipitado.jpg",
  "¿Cuándo NO debes quitar el casco a un motorista?": "img/auxilios/p62_casco.jpg",
  "Trauma columna sospecha:": "img/auxilios/p62_trauma_columna.jpg",

  // QUEMADURAS
  "Ante quemaduras de 2º grado:": "img/auxilios/p66_quemadura_2grado.jpg",
  "Quemadura química en el ojo:": "img/auxilios/p66_quimica_ojos.jpg",
  "Quemadura eléctrica:": "img/auxilios/p67_electrica.jpg",
  "Quemadura grave >10% cuerpo:": "img/auxilios/p65_quemadura_grave.jpg",
  "Ropa pegada a quemadura:": "img/auxilios/p66_ropa_pegada.jpg",

  // URGENCIAS MÉDICAS
  "Síntoma de infarto:": "img/auxilios/p69_infarto.jpg",
  "Síntoma de angina de pecho:": "img/auxilios/p69_angina.jpg",
  "Síntoma de ictus FAST:": "img/auxilios/p70_ictus_fast.jpg",
  "Ataque de asma grave:": "img/auxilios/p73_asma.jpg",
  "Shock hipovolémico: posición:": "img/auxilios/p71_shock.jpg",
  "Hipoglucemia consciente:": "img/auxilios/p72_hipoglucemia.jpg",
  "Convulsión: ¿qué NO haces?": "img/auxilios/p71_convulsion.jpg",
  "Golpe de calor: síntoma:": "img/auxilios/p68_golpe_calor.jpg",
  "Hipotermia grave: ¿qué haces?": "img/auxilios/p68_hipotermia_grave.jpg",
  "Síntoma de alergia grave anafilaxia:": "img/auxilios/p73_anafilaxia.jpg",
  "Anafilaxia adrenalina:": "img/auxilios/p73_adrenalina.jpg",

  // INTOXICACIONES Y OTROS
  "Intoxicación: ¿qué NO haces?": "img/auxilios/p70_intoxicacion.jpg",
  "Ante intoxicación por gas:": "img/auxilios/p74_gas.jpg",
  "Mordedura de serpiente:": "img/auxilios/p74_serpiente.jpg",
  "Esguince tobillo:": "img/auxilios/p61_esguince.jpg",
  "Deshidratación grave: síntoma:": "img/auxilios/p69_deshidratacion.jpg",
  "Herida con objeto clavado:": "img/auxilios/p61_objeto_clavado.jpg",
  "Ante amputación dedo:": "img/auxilios/p61_amputacion.jpg",
  "Picadura abeja alergia:": "img/auxilios/p75_abeja_alergia.jpg",

    // === MEDIOAMBIENTE BLOQUE 4 - 80 preguntas ===
  
  // ETIQUETAS AMBIENTALES
  "¿Qué es la etiqueta ambiental B?": "img/medioambiente/p15_etiqueta_b.jpg",
  "Etiqueta B: diésel de:": "img/medioambiente/p15_etiqueta_b_diesel.jpg",
  "Etiqueta B: gasolina de:": "img/medioambiente/p15_etiqueta_b_gasolina.jpg",
  "Etiqueta B: color:": "img/medioambiente/p15_etiqueta_b_color.jpg",
  "Etiqueta C: coche gasolina de:": "img/medioambiente/p16_etiqueta_c.jpg",
  "Etiqueta C: diésel de:": "img/medioambiente/p16_etiqueta_c_diesel.jpg",
  "Etiqueta C: color:": "img/medioambiente/p16_etiqueta_c_color.jpg",
  "Etiqueta ECO: incluye:": "img/medioambiente/p17_etiqueta_eco.jpg",
  "Etiqueta ECO: híbridos enchufables:": "img/medioambiente/p17_eco_phev.jpg",
  "Etiqueta ECO: gas natural:": "img/medioambiente/p17_eco_gas.jpg",
  "Etiqueta ECO: color:": "img/medioambiente/p17_eco_color.jpg",
  "Coche con etiqueta 0 emite:": "img/medioambiente/p18_etiqueta_0.jpg",
  "Etiqueta 0: ejemplos:": "img/medioambiente/p18_ejemplos_0.jpg",
  "Etiqueta 0: recarga PHEV:": "img/medioambiente/p18_recarga_phev.jpg",
  "Etiqueta A no existe porque:": "img/medioambiente/p15_etiqueta_a.jpg",

  // ZBE ZONAS BAJAS EMISIONES 2026
  "¿Qué es ZBE?": "img/medioambiente/p85_zbe.jpg",
  "¿Qué prohíbe ZBE sin etiqueta?": "img/medioambiente/p85_zbe_sin_etiqueta.jpg",
  "Etiqueta 0: ventaja ZBE:": "img/medioambiente/p86_0_zbe.jpg",
  "Etiqueta ECO: ventaja ZBE:": "img/medioambiente/p86_eco_zbe.jpg",
  "Etiqueta C: puede entrar ZBE?": "img/medioambiente/p86_c_zbe.jpg",
  "Etiqueta B: exenta ZBE?": "img/medioambiente/p86_b_zbe.jpg",
  "Etiqueta B: ventaja ZBE:": "img/medioambiente/p86_b_ventaja_zbe.jpg",
  "Etiqueta 0: aparcamiento ZBE?": "img/medioambiente/p86_0_aparcamiento.jpg",
  "Etiqueta 0: exento impuesto circulación?": "img/medioambiente/p86_0_impuesto.jpg",
  "Moto sin etiqueta en ZBE 2026:": "img/medioambiente/p87_moto_zbe.jpg",
  "Multa entrar ZBE sin permiso:": "img/medioambiente/p87_multa_zbe.jpg",
  "Cómo saber si puedo entrar ZBE:": "img/medioambiente/p85_consulta_zbe.jpg",

  // CONDUCCIÓN EFICIENTE
  "Conducción eficiente reduce:": "img/medioambiente/p25_eficiente.jpg",
  "¿Cuándo debes apagar motor?": "img/medioambiente/p26_apagar_motor.jpg",
  "Cambiar marcha antes 2500 rpm gasolina:": "img/medioambiente/p26_cambio_gasolina.jpg",
  "Cambiar marcha antes 2000 rpm diésel:": "img/medioambiente/p26_cambio_diesel.jpg",
  "Velocidad constante ahorra:": "img/medioambiente/p27_velocidad_constante.jpg",
  "Marcha larga con rpm bajas:": "img/medioambiente/p27_marcha_larga.jpg",
  "Frenar con motor:": "img/medioambiente/p27_freno_motor.jpg",
  "Anticipar tráfico:": "img/medioambiente/p28_anticipar.jpg",
  "Arrancar y marchar sin esperar:": "img/medioambiente/p49_arranque_frio.jpg",
  "Dejar ralentí calentando:": "img/medioambiente/p49_ralenti.jpg",
  "Apagar motor bajando cuesta:": "img/medioambiente/p28_apagar_cuesta.jpg",
  "Usar marcha adecuada:": "img/medioambiente/p28_marcha_adecuada.jpg",
  "Conducir a revoluciones altas:": "img/medioambiente/p28_rpm_altas.jpg",

  // VELOCIDAD Y CONSUMO
  "Circular a 120 vs 100 km/h:": "img/medioambiente/p30_120vs100.jpg",
  "Conducción brusca:": "img/medioambiente/p30_brusca.jpg",
  "Acelerar bruscamente:": "img/medioambiente/p30_acelerar_brusco.jpg",
  "Motor frío consume:": "img/medioambiente/p30_motor_frio.jpg",

  // NEUMÁTICOS Y CARGA
  "Neumáticos desinflados provocan:": "img/medioambiente/p36_neumaticos.jpg",
  "Neumáticos en buen estado:": "img/medioambiente/p36_neumaticos_buenos.jpg",
  "Revisar presión neumáticos:": "img/medioambiente/p36_presion.jpg",
  "Llevar peso innecesario:": "img/medioambiente/p37_peso.jpg",
  "Carga en el techo/baca:": "img/medioambiente/p38_baca.jpg",
  "Cerrar ventanas autopista:": "img/medioambiente/p38_ventanas.jpg",

  // CLIMATIZACIÓN
  "Usar aire acondicionado:": "img/medioambiente/p39_aa.jpg",
  "A/C a 21º vs 18º:": "img/medioambiente/p39_temperatura_aa.jpg",

  // MANTENIMIENTO
  "Cambio de aceite tardío:": "img/medioambiente/p41_aceite_tardio.jpg",
  "Cambiar filtro aire sucio:": "img/medioambiente/p42_filtro_aire.jpg",
  "Revisión ITVE al día:": "img/medioambiente/p42_itv.jpg",
  "Mantenimiento coche:": "img/medioambiente/p42_mantenimiento.jpg",
  "Bujías gastadas gasolina:": "img/medioambiente/p42_bujias.jpg",

  // HÍBRIDOS Y ELÉCTRICOS
  "Híbrido no enchufable consume:": "img/medioambiente/p46_hibrido_hev.jpg",
  "PHEV autonomía eléctrica 50km:": "img/medioambiente/p46_phev_50km.jpg",
  "Eléctrico puro emisiones:": "img/medioambiente/p46_electrico_emisiones.jpg",
  "Freno regenerativo eléctrico:": "img/medioambiente/p47_regenerativo.jpg",
  "Cargar eléctrico noche:": "img/medioambiente/p47_cargar_noche.jpg",
  "GLP/GNC vs gasolina:": "img/medioambiente/p46_glp.jpg",

  // SITUACIONES PRÁCTICAS
  "Arrancar en frío:": "img/medioambiente/p49_arranque_frio.jpg",
  "Aparcar cuesta abajo:": "img/medioambiente/p50_aparcar_bajada.jpg",
  "Aparcar cuesta arriba:": "img/medioambiente/p50_aparcar_subida.jpg",
  "Repostar motor encendido:": "img/medioambiente/p50_repostar_motor.jpg",
  "Móvil repostando:": "img/medioambiente/p50_movil_repostar.jpg"
};  
