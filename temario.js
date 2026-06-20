// temario.js V19.2.7 ESP - WEB 
// Array de temarios oficiales DGT 2026 
// Los PDFs están en la raíz del proyecto, junto a index.html 

// DIRECTO A WINDOW.SIN CONST. Así app.js lo ve al instante
window.TEMARIO = [
  { 
    id: 1, 
    key: 'senales', 
    titulo: "1. Señales de tráfico", 
    archivo: "01_Senales_Tomo_I_RD_465_2025.pdf", 
    icono: "🚦", 
    subtitulo: "RD 465/2025", 
    descripcion: "Señales de peligro, prioridad, prohibición, obligación e indicación" 
  },
  { 
    id: 2, 
    key: 'normas', 
    titulo: "2. Normas de circulación", 
    archivo: "02_Normas_Circulacion_Tomo_II_Edicion_2024.pdf", 
    icono: "📋", 
    subtitulo: "Edición 2024", 
    descripcion: "Velocidades, prioridades, adelantamientos, alumbrado y carriles" 
  },
  { 
    id: 3, 
    key: 'auxilios', 
    titulo: "3. Primeros Auxilios", 
    archivo: "03_Manual_IX_Primeros_Auxilios_2025.pdf", 
    icono: "🚑", 
    subtitulo: "Manual IX 2025", 
    descripcion: "Conducta PAS, RCP, hemorragias y valoración ABC" 
  },
  { 
    id: 4, 
    key: 'mecanica', 
    titulo: "4. Mecánica del vehículo", 
    archivo: "04_Manual_VIII_Mecanica_2024.pdf", 
    icono: "⚙️", 
    subtitulo: "Manual VIII 2024", 
    descripcion: "Motor, frenos ABS, neumáticos y niveles de líquidos" 
  },
  { 
    id: 5, 
    key: 'medioambiente', 
    titulo: "5. Medio Ambiente + Distintivos DGT", 
    archivo: "05_Medio_Ambiente_Distintivos_DGT_2025.pdf", 
    icono: "♻️", 
    subtitulo: "Distintivos DGT 2025", 
    descripcion: "Etiquetas 0/ECO/C/B, ZBE y conducción eficiente" 
  }
];

// Función auxiliar
window.getTemarioByKey = function(key) { 
  return window.TEMARIO.find(t => t.key === key); 
};

console.log('✅ TEMARIO definido:', window.TEMARIO.length, 'items');