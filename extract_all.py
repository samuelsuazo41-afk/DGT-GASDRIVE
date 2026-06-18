import fitz # PyMuPDF
import os
import json

def extraer_pdf(pdf_path, output_folder, codigos, mapeo_imagenes):
    """Extrae imágenes de un PDF y las renombra según CODIGOS"""
    os.makedirs(output_folder, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"Extrayendo: {pdf_path}")
    print(f"Guardando en: {output_folder}/")
    print(f"Buscando {len(codigos)} imágenes...")
    print(f"{'='*60}\n")

    doc = fitz.open(pdf_path)
    img_count = 0
    codigo_index = 0

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        images = page.get_images(full=True)

        for img_index, img in enumerate(images):
            if codigo_index >= len(codigos):
                break

            try:
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]

                codigo = codigos[codigo_index]
                # Forzamos PNG para web
                filename = f"{codigo}.png"
                filepath = os.path.join(output_folder, filename)

                with open(filepath, "wb") as f:
                    f.write(image_bytes)

                # Ruta relativa para la web - CRÍTICO
                ruta_web = f"./img/{os.path.basename(output_folder)}/{filename}"

                # Busca qué pregunta usa este código
                # Ejemplo: r-1 → "¿Qué significa la señal R-1?"
                if output_folder.endswith("senales"):
                    pregunta_key = f"¿Qué significa la señal {codigo.upper().replace('-', ')}?"
                elif output_folder.endswith("medioambiente"):
                    pregunta_key = codigo.replace("-", " ").title()
                else:
                    pregunta_key = codigo

                mapeo_imagenes[pregunta_key] = ruta_web

                print(f"[{img_count + 1}/{len(codigos)}] Guardada: {filename} → {ruta_web}")
                img_count += 1
                codigo_index += 1

            except Exception as e:
                print(f"Error extrayendo {codigos[codigo_index]}: {e}")

    doc.close()
    print(f"\n✅ {img_count} imágenes extraídas en {output_folder}/")
    return img_count, mapeo_imagenes

def generar_imagenes_js(mapeo, output_file="data/imagenes.js"):
    """Genera el archivo imagenes.js para la app"""
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    contenido = "// GASDRIVE DGT V8.6.5 - MAPEO AUTOMÁTICO DE IMÁGENES\n"
    contenido += "// Generado automáticamente por extraer_imagenes.py\n"
    contenido += "export const IMAGENES = {\n"

    for pregunta, ruta in mapeo.items():
        # Escapa comillas en la pregunta
        pregunta_esc = pregunta.replace('"', '\\"')
        contenido += f' "{pregunta_esc}": "{ruta}",\n'

    contenido += "};\n"

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(contenido)

    print(f"\n✅ Generado {output_file} con {len(mapeo)} rutas")

# ========== CONFIGURACIÓN TOMOS ==========
PDFS = [
    {
        "pdf": "01_Senales_Tomo_I_RD_465_2025.pdf",
        "folder": "data/img/senales",
        "codigos": [
            "r-1","r-2","r-3","r-4","r-5","r-6",
            "r-101","r-102","r-103","r-104","r-105","r-106","r-107","r-108","r-109","r-110","r-111","r-112","r-113","r-114","r-115","r-116",
            "r-200","r-201","r-202","r-203","r-204",
            "r-300","r-301","r-302","r-303","r-304","r-305","r-306","r-307","r-308","r-309","r-310","r-311",
            "r-400","r-401","r-402","r-403","r-404","r-405","r-406","r-407","r-408","r-409","r-410","r-411","r-412","r-413","r-414","r-415","r-416","r-417","r-418","r-419","r-420","r-421","r-422",
            "p-1","p-2","p-3","p-4","p-5","p-6","p-7","p-8","p-9","p-10","p-11","p-12","p-13a","p-13b","p-14a","p-14b","p-15","p-16a","p-16b","p-17","p-17a","p-17b","p-18","p-19","p-20","p-21","p-22","p-23","p-24","p-25","p-26","p-27","p-28","p-29","p-30","p-31","p-32","p-33","p-34","p-35","p-36","p-37","p-38","p-39","p-40","p-41","p-42","p-43","p-44","p-45","p-46","p-47","p-48","p-49","p-50",
            "s-50","s-51","s-52","s-53","s-54","s-55","s-56","s-57","s-58","s-59","s-60","s-61","s-62","s-63","s-100","s-101","s-102","s-103","s-104","s-105","s-106","s-107","s-108","s-109","s-110","s-111","s-112","s-113","s-114","s-115","s-116","s-117","s-118","s-119","s-120","s-121","s-122","s-123","s-124","s-125","s-126",
            "s-230","s-231","s-232","s-233","s-234","s-235","s-236","s-237","s-238","s-239","s-240","s-241",
            "s-370","s-371","s-372","s-373","s-374","s-375","s-376","s-377",
            "s-200","s-201","s-202","s-203","s-204","s-205","s-206","s-207","s-208","s-209","s-210","s-211","s-212","s-213","s-214","s-215","s-216","s-217","s-218","s-219","s-220","s-221","s-222","s-223","s-224","s-225","s-226","s-227","s-228","s-229",
            "s-320","s-330","s-340","s-350","s-351","s-352",
            "s-500","s-510","s-520","s-521",
            "s-360","s-361","s-362","s-363","s-364","s-365","s-366","s-367","s-368","s-369",
            "s-440","s-441","s-442","s-443","s-444","s-445","s-446","s-447",
            "s-600","s-601",
            "s-800","s-810","s-820","s-830","s-840a","s-840b","s-850","s-860","s-861","s-870","s-871","s-872","s-873","s-874","s-875","s-876","s-877","s-878","s-879","s-880"
        ]
    },
    {
        "pdf": "05_Medio_Ambiente_Distintivos_DGT_2025.pdf",
        "folder": "data/img/medioambiente",
        "codigos": [
            "etiqueta-b",
            "etiqueta-c",
            "etiqueta-eco",
            "etiqueta-0",
            "senal-r118-zbe",
            "colocacion-etiqueta",
            "tabla-euro"
        ]
    }
]
# ==========================================

if __name__ == "__main__":
    total = 0
    mapeo_global = {}

    for config in PDFS:
        if os.path.exists(config["pdf"]):
            count, mapeo = extraer_pdf(config["pdf"], config["folder"], config["codigos"], mapeo_global)
            total += count
            mapeo_global.update(mapeo)
        else:
            print(f"\n⚠️ No encontrado: {config['pdf']} - Sáltate este PDF\n")

    # Genera imagenes.js automático
    generar_imagenes_js(mapeo_global)

    print(f"\n{'='*60}")
    print(f"🎉 TOTAL: {total} imágenes extraídas")
    print(f"{'='*60}")
    print("\nEstructura final:")
    print("data/img/senales/ → 122 PNG")
    print("data/img/medioambiente/ → 7 PNG")
    print("data/imagenes.js → mapeo automático generado")
    print("\nNombres ya coinciden con IMAGENES en imagenes.js")