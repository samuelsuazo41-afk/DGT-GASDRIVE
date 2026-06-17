import fitz # PyMuPDF
import os

PDF_PATH = "01_Senales_Tomo_I_RD_465_2025.pdf"
OUTPUT_FOLDER = "data/img/senales"

# Lista de códigos del Tomo I en orden exacto del BOE RD 465/2025
CODIGOS = [
    # PRIORIDAD
    "r-1","r-2","r-3","r-4","r-5","r-6",
    # PROHIBICIÓN ENTRADA
    "r-101","r-102","r-103","r-104","r-105","r-106","r-107","r-108","r-109","r-110","r-111","r-112","r-113","r-114","r-115","r-116",
    # RESTRICCIÓN
    "r-200","r-201","r-202","r-203","r-204",
    # OTRAS PROHIBICIÓN
    "r-300","r-301","r-302","r-303","r-304","r-305","r-306","r-307","r-308","r-309","r-310","r-311",
    # OBLIGACIÓN
    "r-400","r-401","r-402","r-403","r-404","r-405","r-406","r-407","r-408","r-409","r-410","r-411","r-412","r-413","r-414","r-415","r-416","r-417","r-418","r-419","r-420","r-421","r-422",
    # PELIGRO
    "p-1","p-2","p-3","p-4","p-5","p-6","p-7","p-8","p-9","p-10","p-11","p-12","p-13a","p-13b","p-14a","p-14b","p-15","p-16a","p-16b","p-17","p-17a","p-17b","p-18","p-19","p-20","p-21","p-22","p-23","p-24","p-25","p-26","p-27","p-28","p-29","p-30","p-31","p-32","p-33","p-34","p-35","p-36","p-37","p-38","p-39","p-40","p-41","p-42","p-43","p-44","p-45","p-46","p-47","p-48","p-49","p-50",
    # INDICACIONES
    "s-50","s-51","s-52","s-53","s-54","s-55","s-56","s-57","s-58","s-59","s-60","s-61","s-62","s-63","s-100","s-101","s-102","s-103","s-104","s-105","s-106","s-107","s-108","s-109","s-110","s-111","s-112","s-113","s-114","s-115","s-116","s-117","s-118","s-119","s-120","s-121","s-122","s-123","s-124","s-125","s-126",
    # CARRILES
    "s-230","s-231","s-232","s-233","s-234","s-235","s-236","s-237","s-238","s-239","s-240","s-241",
    # PRESEÑALIZACIÓN
    "s-370","s-371","s-372","s-373","s-374","s-375","s-376","s-377",
    # DIRECCIÓN
    "s-200","s-201","s-202","s-203","s-204","s-205","s-206","s-207","s-208","s-209","s-210","s-211","s-212","s-213","s-214","s-215","s-216","s-217","s-218","s-219","s-220","s-221","s-222","s-223","s-224","s-225","s-226","s-227","s-228","s-229",
    # IDENTIFICACIÓN
    "s-320","s-330","s-340","s-350","s-351","s-352",
    # LOCALIZACIÓN
    "s-500","s-510","s-520","s-521",
    # CONFIRMACIÓN
    "s-360","s-361","s-362","s-363","s-364","s-365","s-366","s-367","s-368","s-369",
    # POBLADO
    "s-440","s-441","s-442","s-443","s-444","s-445","s-446","s-447",
    # OTRAS
    "s-600","s-601",
    # PANELES
    "s-800","s-810","s-820","s-830","s-840a","s-840b","s-850","s-860","s-861","s-870","s-871","s-872","s-873","s-874","s-875","s-876","s-877","s-878","s-879","s-880"
]

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

doc = fitz.open(PDF_PATH)
img_count = 0
codigo_index = 0

for page_num in range(len(doc)):
    page = doc.load_page(page_num)
    images = page.get_images(full=True)

    for img_index, img in enumerate(images):
        if codigo_index >= len(CODIGOS):
            break

        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        ext = base_image["ext"]

        codigo = CODIGOS[codigo_index]
        filename = f"{codigo.replace('-', '')}.{ext}"
        filepath = os.path.join(OUTPUT_FOLDER, filename)

        with open(filepath, "wb") as f:
            f.write(image_bytes)

        print(f"Guardada: {filename}")
        img_count += 1
        codigo_index += 1

doc.close()
print(f"\n✅ Listo! {img_count} imágenes extraídas en {OUTPUT_FOLDER}/")
print("Nombres: r2.png, p20.png, s51.png, etc. Ya coinciden con imagenes.js")