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

### NUEVO: Keywords mapeadas EXACTO a tus preguntas de PREGUNTAS.js
KEYWORDS = {
    # SEÑALES - Prioridad
    "r-1": "ceda_paso", "r-2": "stop", "r-3": "calzada_prioridad", "r-4": "fin_prioridad",
    "r-5": "prioridad_contrario", "r-6": "prioridad_respecto",
    # SEÑALES - Prohibición
    "r-101": "prohibido_entrada", "r-102": "prohibido_motor", "r-104": "prohibido_motos",
    "r-105": "prohibido_camiones", "r-106": "prohibido_buses", "r-300": "velocidad_max",
    "r-301": "fin_velocidad", "r-305": "adelantar_prohibido", "r-307": "adelantar_camiones",
    # SEÑALES - Obligación
    "r-400": "sentido_obligatorio", "r-401": "obligatorio_derecha", "r-413": "cadenas",
    "r-415": "cadenas_nieve", "r-417": "cinturon",
    # SEÑALES - Peligro
    "p-1": "peligro", "p-3": "semaforos", "p-4": "rotonda", "p-13a": "curva_derecha",
    "p-13b": "curva_izquierda", "p-20": "peatones", "p-21": "ninos", "p-24": "animales_salvajes",
    # SEÑALES - Servicios
    "s-100": "gasolinera", "s-102": "telefono", "s-113": "area_descanso",
    "s-116": "aparcamiento_vigilado", "s-124": "recarga_electrico", "s-126": "itv",
    # MECÁNICA
    "abs": "testigo_abs", "esp": "esp", "aceite": "aceite", "refrigerante": "refrigerante",
    "batería": "bateria", "bateria": "bateria", "adblue": "adblue", "fap": "fap",
    "neumático": "neumatico", "neumatico": "neumatico", "pastillas": "pastillas",
    # NORMAS
    "zbe": "zbe", "patinete": "patinete", "tacografo": "tacografo", "v-13": "novel",
    "cinturón": "cinturon", "casco": "casco", "sri": "sri", "itv": "itv",
    # AUXILIOS
    "rcp": "rcp", "dea": "dea", "ictus": "ictus", "pls": "pls", "heimlich": "heimlich",
    "hemorragia": "hemorragia", "quemadura": "quemadura", "fractura": "fractura",
    # MEDIOAMBIENTE
    "etiqueta b": "etiqueta_b", "etiqueta c": "etiqueta_c", "etiqueta eco": "etiqueta_eco",
    "etiqueta 0": "etiqueta_0", "baca": "baca", "regenerativo": "regenerativo",
    "híbrido": "hibrido", "eléctrico": "electrico", "glp": "glp", "gnc": "gnc"
}

def limpiar_nombre(texto):
    ### NUEVO: Limpia nombres para que sean válidos en archivo
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
    mapeo_generado = {} # ### NUEVO: Para generar imagenes.js automático

    for pdf, carpeta in PDFS.items():
        if not os.path.exists(pdf):
            print(f"⚠️ No encontrado: {pdf}")
            continue

        os.makedirs(f"img/{carpeta}", exist_ok=True)
        doc = fitz.open(pdf)

        for pag_num, pag in enumerate(doc, 1):
            imagenes = pag.get_images(full=True)
            texto_pag = pag.get_text().lower()

            for img_idx, img in enumerate(imagenes):
                xref = img[0]
                pix = fitz.Pixmap(doc, xref)

                # ### NUEVO: Filtra imágenes muy pequeñas < 100x100
                if pix.width < 100 or pix.height < 100:
                    pix = None
                    continue

                if pix.n - pix.alpha < 4: # GRAY o RGB
                    nombre_base = f"p{pag_num}"
                    sufijo = f"img{img_idx}"

                    # Busca keyword más específica primero
                    for key in sorted(KEYWORDS.keys(), key=len, reverse=True):
                        if key in texto_pag:
                            sufijo = KEYWORDS[key]
                            break

                    ### NUEVO: Limpia el sufijo
                    sufijo = limpiar_nombre(sufijo)

                    ext = "jpg" ### NUEVO: Todo a JPG para peso
                    if pix.alpha:
                        pix = fitz.Pixmap(fitz.csRGB, pix) # Quita transparencia

                    ruta = f"img/{carpeta}/{nombre_base}_{sufijo}.{ext}"

                    # Evita sobreescribir si ya existe
                    contador = 1
                    ruta_final = ruta
                    while os.path.exists(ruta_final):
                        ruta_final = f"img/{carpeta}/{nombre_base}_{sufijo}_{contador}.{ext}"
                        contador += 1

                    pix.save(ruta_final, output="jpeg", jpg_quality=85) ### NUEVO: Comprime
                    print(f"✅ {ruta_final}")

                    ### NUEVO: Guarda para generar imagenes.js
                    mapeo_generado[f"Pag {pag_num} {sufijo}"] = ruta_final.replace("img/", "./img/")

                pix = None
        doc.close()

    ### NUEVO: Genera imagenes.js automáticamente
    with open("imagenes_extraidas.js", "w", encoding="utf-8") as f:
        f.write("// AUTO-GENERADO - Revisa y copia a tu imagenes.js\n")
        f.write("const IMAGENES_EXTRAIDAS = {\n")
        for k, v in mapeo_generado.items():
            f.write(f' "{k}": "{v}",\n')
        f.write("};\n")
    print(f"\n🎯 Generado imagenes_extraidas.js con {len(mapeo_generado)} imágenes")

if __name__ == "__main__":
    extraer()
    print("\n🎯 Listo. Revisa img/ y imagenes_extraidas.js")