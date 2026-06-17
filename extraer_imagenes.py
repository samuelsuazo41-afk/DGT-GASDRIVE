import fitz # pip install PyMuPDF
import os
import re

PDFS = {
    "01_Senales_Tomo_I_RD_465_2025.pdf": "senales",
    "02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf": "normas",
    "03_Manual_IX_Primeros_Auxilios_2025.pdf": "auxilios",
    "04_Manual_VIII_Mecanica_2024.pdf": "mecanica",
    "05_Medio_Ambiente_Distintivos_DGT_2025.pdf": "medioambiente"
}

# === CLAVE: MAPEA PREGUNTA EXACTA DE PREGUNTAS.JS → NOMBRE ARCHIVO ===
# Copia la pregunta EXACTA de tu PREGUNTAS.js como clave
MAPEO_PREGUNTAS = {
    # SEÑALES
    "Señal de STOP octogonal R-2:": "p65_stop",
    "Triángulo invertido R-1 es:": "p65_ceda_paso",
    "Señal R-3 calzada con prioridad:": "p66_calzada_prioridad",
    "Señal R-4 fin de prioridad:": "p66_fin_prioridad",
    "Señal R-5 prioridad sentido contrario:": "p66_prioridad_contrario",
    "Señal R-6 prioridad respecto contrario:": "p66_prioridad_respecto",
    "Círculo rojo con línea R-101:": "p68_prohibido_entrada",
    "Señal R-102 entrada prohibida vehículos motor:": "p68_prohibido_motor",
    "Señal R-104 entrada prohibida motos:": "p68_prohibido_motos",
    "Señal R-105 entrada prohibida camiones:": "p68_prohibido_camiones",
    "Señal R-106 entrada prohibida buses:": "p69_prohibido_buses",
    "Señal R-107 entrada prohibida ciclos:": "p69_prohibido_bicis",
    "Señal R-108 entrada prohibida ciclomotores:": "p69_prohibido_ciclomotor",
    "Señal R-111 entrada prohibida vehículos agrícolas:": "p69_prohibido_tractor",
    "Señal R-112 entrada prohibida animales montura:": "p69_prohibido_montura",
    "Señal R-113 entrada prohibida carros mano:": "p69_prohibido_carros",
    "Señal R-114 entrada prohibida peatones:": "p69_prohibido_peatones",
    "Señal R-116 entrada prohibida animales sueltos:": "p70_prohibido_ganado",
    "Señal circular rojo con 3,5t R-201:": "p70_peso_35t",
    "Señal R-202 anchura máxima:": "p70_anchura_max",
    "Señal R-203 altura máxima:": "p70_altura_max",
    "Señal R-204 longitud máxima:": "p70_longitud_max",
    "Señal R-300 velocidad máxima:": "p72_velocidad_max",
    "Señal R-301 fin velocidad máxima:": "p72_fin_velocidad",
    "Señal R-302 giro izquierda prohibido:": "p73_giro_izq_prohibido",
    "Señal R-303 giro derecha prohibido:": "p73_giro_der_prohibido",
    "Señal R-304 cambio sentido prohibido:": "p73_cambio_sentido_prohibido",
    "Señal R-305 adelantamiento prohibido:": "p73_adelantar_prohibido",
    "Señal R-306 fin prohibición adelantar:": "p73_fin_adelantar",
    "Señal R-307 adelantamiento prohibido camiones:": "p73_adelantar_camiones",
    "Señal R-308 fin prohibición adelantar camiones:": "p74_fin_adelantar_camiones",
    "Señal R-309 zona prohibida adelantar:": "p74_zona_adelantar",
    "Señal R-310 señales acústicas prohibidas:": "p74_claxon_prohibido",
    "Círculo azul con flecha R-400:": "p75_sentido_obligatorio",
    "Señal R-401 sentido obligatorio derecha:": "p75_obligatorio_derecha",
    "Señal R-402 sentido obligatorio izquierda:": "p75_obligatorio_izquierda",
    "Señal R-403 paso obligatorio derecha:": "p75_paso_derecha",
    "Señal R-404 paso obligatorio izquierda:": "p75_paso_izquierda",
    "Señal R-405 único sentido:": "p75_sentido_unico",
    "Señal R-407 vía reservada ciclistas:": "p76_carril_bici",
    "Señal R-410 vía reservada peatones y ciclos:": "p76_peatones_ciclos",
    "Señal R-411 velocidad mínima:": "p76_velocidad_min",
    "Señal R-412 fin velocidad mínima:": "p76_fin_vel_min",
    "Señal R-413 alumbrado corto alcance:": "p76_luces_cruce",
    "Señal R-414 fin alumbrado corto:": "p76_fin_luces",
    "Señal R-415 cadenas para nieve:": "p76_cadenas",
    "Señal R-416 fin cadenas nieve:": "p77_fin_cadenas",
    "Señal R-417 uso obligatorio cinturón:": "p77_cinturon",
    "Señal R-418 vía para automóviles:": "p77_automoviles",
    "Señal R-422 fin vía reservada:": "p77_fin_reservada",
    "Rombo amarillo P-1:": "p78_peligro",
    "Señal P-2 intersección con prioridad:": "p78_interseccion_prioridad",
    "Señal P-3 semáforos:": "p78_semaforos",
    "Señal P-4 intersección giratoria:": "p78_rotonda",
    "Señal P-13a curva peligrosa derecha:": "p78_curva_derecha",
    "Señal P-13b curva peligrosa izquierda:": "p78_curva_izquierda",
    "Señal P-14a curvas peligrosas primera derecha:": "p79_curvas_derecha",
    "Señal P-15 perfil irregular:": "p79_perfil_irregular",
    "Señal P-16a bajada peligrosa:": "p79_bajada",
    "Señal P-16b subida peligrosa:": "p79_subida",
    "Señal P-17 estrechamiento:": "p79_estrechamiento",
    "Señal P-17a estrechamiento derecha:": "p79_estrecha_derecha",
    "Señal P-17b estrechamiento izquierda:": "p79_estrecha_izquierda",
    "Señal P-18 obras:": "p79_obras",
    "Señal P-19 pavimento deslizante:": "p79_deslizante",
    "Señal P-20 peatones:": "p79_peatones",
    "Señal P-21 niños:": "p79_ninos",
    "Señal P-22 ciclistas:": "p79_ciclistas",
    "Señal P-23 animales domésticos:": "p80_animales_domesticos",
    "Señal P-24 animales salvajes:": "p80_animales_salvajes",
    "Señal P-25 circulación dos sentidos:": "p80_dos_sentidos",
    "Señal P-26 desprendimientos:": "p80_desprendimientos",
    "Señal P-28 proyección gravilla:": "p80_gravilla",
    "Señal P-29 viento transversal:": "p80_viento",
    "Señal P-30 escalón lateral:": "p80_escalon",
    "Señal P-31 congestión:": "p80_congestion",
    "Señal P-32 obstrucción calzada:": "p80_obstruccion",
    "Señal P-33 visibilidad reducida:": "p80_visibilidad",
    "Señal P-34 pavimento deslizante hielo/nieve:": "p80_hielo",
    "Señal P-50 otros peligros:": "p80_otros_peligros",
    "Señal S-50 carriles reservados:": "p88_carriles_reservados",
    "Señal S-51 carril bus:": "p88_carril_bus",
    "Señal S-52 fin carril bus:": "p88_fin_bus",
    "Señal S-53 carril bus-VAO:": "p88_bus_vao",
    "Señal S-60 bifurcación:": "p89_bifurcacion_derecha",
    "Señal S-61 bifurcación izquierda:": "p89_bifurcacion_izquierda",
    "Señal S-62 preseñalización carriles:": "p90_presenalizacion",
    "Señal S-100 estación servicio:": "p92_gasolinera",
    "Señal S-101 taller mecánico:": "p92_taller",
    "Señal S-102 teléfono:": "p92_telefono",
    "Señal S-103 restaurante:": "p92_restaurante",
    "Señal S-104 hotel:": "p92_hotel",
    "Señal S-105 camping:": "p93_camping",
    "Señal S-106 terreno caravanas:": "p93_caravanas",
    "Señal S-107 merendero:": "p93_merendero",
    "Señal S-108 punto partida excursiones:": "p93_excursiones",
    "Señal S-109 camping y caravanas:": "p93_camping_caravanas",
    "Señal S-110 hotel:": "p93_hotel_2",
    "Señal S-111 restaurante:": "p93_restaurante_2",
    "Señal S-112 cafetería:": "p93_cafeteria",
    "Señal S-113 área descanso:": "p94_area_descanso",
    "Señal S-114 aparcamiento:": "p94_aparcamiento",
    "Señal S-115 aparcamiento cubierto:": "p94_aparcamiento_cubierto",
    "Señal S-116 aparcamiento vigilado:": "p94_aparcamiento_vigilado",
    "Señal S-117 hospital:": "p94_hospital",
    "Señal S-118 puesto socorro:": "p94_socorro",
    "Señal S-119 bascula:": "p94_bascula",
    "Señal S-120 control policía:": "p94_policia",
    "Señal S-121 extintor:": "p94_extintor",
    "Señal S-122 salida emergencia:": "p95_salida_emergencia",
    "Señal S-123 área servicio:": "p95_area_servicio",
    "Señal S-124 punto recarga eléctrico:": "p95_recarga_electrico",
    "Señal S-125 punto información:": "p95_informacion",
    "Señal S-126 centro inspección:": "p95_itv",
    "Panel S-800 distancia:": "p96_distancia",
    "Panel S-810 longitud tramo:": "p96_longitud",
    "Panel S-820 extensión prohibición:": "p96_extension",
    "Panel S-830 fin prohibición:": "p96_fin_prohibicion",
    "Panel S-840 dirección tramo:": "p96_direccion",
    "Panel S-850 itinerario desvío:": "p96_desvio",
    "Panel S-860 nieve:": "p96_nieve",
    "Panel S-870 texto:": "p96_texto",
    
    # NORMAS - añade las que uses
    "Obstrucción calzada:": "img/normas/p104_obstruccion.jpg",
    "Tasa de alcohol general turismos:": "img/normas/p45_tasa_general.jpg",
    "Límite ciudad genérico 2026:": "img/normas/p25_limite_ciudad.jpg",
}

def limpiar_nombre(texto):
    texto = texto.lower()
    texto = re.sub(r'[áàäâ]', 'a', texto)
    texto = re.sub(r'[éèëê]', 'e', texto)
    texto = re.sub(r'[íìïî]', 'i', texto)
    texto = re.sub(r'[óòöô]', 'o', texto)
    texto = re.sub(r'[úùüû]', 'u', texto)
    texto = re.sub(r'[^a-z0-9_]', '_', texto)
    texto = re.sub(r'_+', '_', texto)
    return texto.strip('_')

def extraer():
    imagenes_js_final = {}

    for pdf, carpeta in PDFS.items():
        if not os.path.exists(pdf):
            print(f"⚠️ No encontrado: {pdf}")
            continue

        os.makedirs(f"img/{carpeta}", exist_ok=True)
        doc = fitz.open(pdf)

        for pag_num, pag in enumerate(doc, 1):
            imagenes = pag.get_images(full=True)
            texto_pag = pag.get_text()

            for img_idx, img in enumerate(imagenes):
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)

                if pix.width < 100 or pix.height < 100:
                    pix = None
                    continue

                if pix.n - pix.alpha < 4:
                    # Busca qué pregunta de MAPEO_PREGUNTAS está en esta página
                    for pregunta, nombre_archivo in MAPEO_PREGUNTAS.items():
                        if nombre_archivo.startswith(f"p{pag_num}_") and pregunta not in imagenes_js_final:
                            ext = "jpg"
                            if pix.alpha:
                                pix = fitz.Pixmap(fitz.csRGB, pix)
                            
                            ruta = f"img/{carpeta}/{nombre_archivo}.{ext}"
                            pix.save(ruta, output="jpeg", jpg_quality=85)
                            print(f"✅ {ruta}")
                            
                            imagenes_js_final[pregunta] = f"./{ruta}"
                            break

                pix = None
        doc.close()

    # Genera imagenes.js con claves EXACTAS
    with open("imagenes.js", "w", encoding="utf-8") as f:
        f.write("// AUTO-GENERADO - Claves exactas de PREGUNTAS.js\n")
        f.write("const IMAGENES = {\n")
        for k, v in imagenes_js_final.items():
            f.write(f' "{k}": "{v}",\n')
        f.write("};\n")
    print(f"\n🎯 Generado imagenes.js con {len(imagenes_js_final)} imágenes")

if __name__ == "__main__":
    extraer()
    print("\n🎯 Listo. Revisa imagenes.js")