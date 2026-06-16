import fitz # pip install PyMuPDF
import os

PDFS = {
    "Senales_DGT.pdf": "senales",
    "Mecanica_DGT.pdf": "mecanica", 
    "Normas_DGT.pdf": "normas",
    "Auxilios_DGT.pdf": "auxilios",
    "Medioambiente_DGT.pdf": "medioambiente"
}

KEYWORDS = {
    "stop": "stop", "ceda": "ceda_paso", "prohibido": "prohibido", "r-101": "entrada_prohibida",
    "r-300": "velocidad_max", "r-400": "sentido_obligatorio", "s-50": "bus_vao",
    "abs": "testigo_abs", "aceite": "aceite", "adblue": "adblue", "fap": "fap",
    "zbe": "zbe", "patinete": "patinete", "tacografo": "tacografo", "v-13": "novel",
    "rcp": "rcp", "dea": "dea", "ictus": "ictus", "pls": "pls", "heimlich": "heimlich",
    "etiqueta b": "etiqueta_b", "etiqueta c": "etiqueta_c", "etiqueta eco": "etiqueta_eco", 
    "etiqueta 0": "etiqueta_0", "baca": "baca", "regenerativo": "regenerativo"
}

def extraer():
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
                
                if pix.n - pix.alpha < 4: # GRAY o RGB
                    nombre_base = f"p{pag_num}"
                    sufijo = f"img{img_idx}"
                    
                    # Busca keyword más específica primero
                    for key in sorted(KEYWORDS.keys(), key=len, reverse=True):
                        if key in texto_pag:
                            sufijo = KEYWORDS[key]
                            break
                    
                    ext = "png" if pix.alpha else "jpg"
                    ruta = f"img/{carpeta}/{nombre_base}_{sufijo}.{ext}"
                    
                    # Evita sobreescribir si ya existe
                    contador = 1
                    ruta_final = ruta
                    while os.path.exists(ruta_final):
                        ruta_final = f"img/{carpeta}/{nombre_base}_{sufijo}_{contador}.{ext}"
                        contador += 1
                    
                    pix.save(ruta_final)
                    print(f"✅ {ruta_final}")
                pix = None
        doc.close()

if __name__ == "__main__":
    extraer()
    print("\n🎯 Listo. Revisa las carpetas img/ y completa imagenes.js")
