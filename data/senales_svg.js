// GASDRIVE DGT V8.8.1 - SENALES SVG VECTORIALES RD 465/2025 LIMPIO
const SENALES_SVG = {
  // === SECCIÓN 3.2: PRIORIDAD r-1 a r-6 ===
  "r-1": `<svg viewBox="0 0 200 200"><polygon points="100,180 20,20 180,20" fill="#E74C3C"/><polygon points="100,165 35,35 165,35" fill="white"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="#000">STOP</text></svg>`,
  
  "r-2": `<svg viewBox="0 0 200 200"><polygon points="100,20 20,180 180,180" fill="#E74C3C"/><polygon points="100,35 35,165 165,165" fill="white"/><text x="100" y="120" text-anchor="middle" font-size="28" font-weight="bold" fill="#000">CEDA EL PASO</text></svg>`,
  
  "r-3": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#000" stroke-width="12"/><path d="M50 100 L100 60 L150 100 L100 140 Z" fill="none" stroke="#000" stroke-width="12"/><path d="M100 60 L100 140" stroke="#000" stroke-width="12"/></svg>`,
  
  "r-4": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#000" stroke-width="12"/><path d="M50 100 L100 60 L150 100 L100 140 Z" fill="none" stroke="#000" stroke-width="12"/><path d="M100 60 L100 140" stroke="#000" stroke-width="12"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-5": `<svg viewBox="0 0 200 200"><rect x="30" y="50" width="140" height="100" rx="15" fill="white" stroke="#000" stroke-width="10"/><path d="M50 80 L70 70 L90 80 M110 80 L130 70 L150 80" stroke="#000" stroke-width="8" fill="none"/><path d="M70 80 L70 120 M90 80 L90 120 M110 80 L110 120 M130 80 L130 120" stroke="#000" stroke-width="6"/></svg>`,
  
  "r-6": `<svg viewBox="0 0 200 200"><rect x="30" y="50" width="140" height="100" rx="15" fill="white" stroke="#000" stroke-width="10"/><path d="M50 120 L70 130 L90 120 M110 120 L130 130 L150 120" stroke="#000" stroke-width="8" fill="none"/><path d="M70 120 L70 80 M90 120 L90 80 M110 120 L110 80 M130 120 L130 80" stroke="#000" stroke-width="6"/></svg>`,

  // === SECCIÓN 3.3: PROHIBICIÓN ENTRADA r-100 a r-116 ===
  "r-100": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><rect x="50" y="90" width="100" height="20" fill="#E74C3C" rx="5"/></svg>`,
  
  "r-101": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="#000">STOP</text></svg>`,
  
  "r-102": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="70" cy="100" r="18" fill="#000"/><path d="M70 100 L70 130 M70 115 L60 130 M70 115 L80 130" stroke="#000" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="100" r="18" fill="#000"/><path d="M130 100 L130 140 M130 120 L120 140 M130 120 L140 140" stroke="#000" stroke-width="8" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-103": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><rect x="60" y="70" width="80" height="60" rx="10" fill="#000"/><circle cx="80" cy="140" r="15" fill="#000"/><circle cx="120" cy="140" r="15" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-104": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="100" cy="100" r="30" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-105": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><rect x="60" y="80" width="80" height="40" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-106": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><rect x="55" y="75" width="90" height="50" rx="8" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-107": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M70 80 L130 80 L130 120 L70 120 Z" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-108": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="70" cy="100" r="18" fill="#000"/><path d="M70 100 L70 130 M70 115 L60 130 M70 115 L80 130" stroke="#000" stroke-width="8" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-109": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M60 90 L140 90 L140 110 L60 110 Z" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-110": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="100" cy="100" r="20" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-111": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><rect x="60" y="80" width="80" height="40" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-112": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="100" cy="100" r="20" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-113": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="100" cy="100" r="20" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-114": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="70" cy="100" r="18" fill="#000"/><path d="M70 100 L70 130 M70 115 L60 130 M70 115 L80 130" stroke="#000" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="100" r="18" fill="#000"/><path d="M130 100 L130 140 M130 120 L120 140 M130 120 L140 140" stroke="#000" stroke-width="8" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-115": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="100" cy="100" r="20" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-116": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><circle cx="100" cy="100" r="20" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,

  // === SECCIÓN 3.4: RESTRICCIÓN PASO r-200 a r-204 ===
  "r-200": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="70" font-weight="bold" fill="#000">5t</text></svg>`,
  
  "r-201": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="60" font-weight="bold" fill="#000">3,5t</text></svg>`,
  
  "r-202": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="60" font-weight="bold" fill="#000">2,5m</text></svg>`,
  
  "r-203": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="70" font-weight="bold" fill="#000">4m</text></svg>`,
  
  "r-204": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="60" font-weight="bold" fill="#000">10m</text></svg>`,

  // === SECCIÓN 3.5: PROHIBICIÓN r-300 a r-311 ===
  "r-300": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="70" font-weight="bold" fill="#000">50</text></svg>`,
  
  "r-301": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#000" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="70" font-weight="bold" fill="#000">50</text><line x1="35" y1="35" x2="165" y2="165" stroke="#000" stroke-width="14"/></svg>`,
  
  "r-302": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M100 60 Q70 100 100 140" stroke="#000" stroke-width="14" fill="none" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-303": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M100 60 Q130 100 100 140" stroke="#000" stroke-width="14" fill="none" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-304": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M100 60 Q130 100 100 140 Q70 100 100 60" stroke="#000" stroke-width="14" fill="none" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-305": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M100 40 L100 130 M60 90 L100 50 L140 90" stroke="#000" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-306": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#000" stroke-width="12"/><path d="M100 40 L100 130 M60 90 L100 50 L140 90" stroke="#000" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#000" stroke-width="14"/></svg>`,
  
  "r-307": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><rect x="60" y="80" width="80" height="40" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-308": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#000" stroke-width="12"/><rect x="60" y="80" width="80" height="40" fill="#000"/><line x1="35" y1="35" x2="165" y2="165" stroke="#000" stroke-width="14"/></svg>`,
  
  "r-309": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><text x="100" y="105" text-anchor="middle" font-size="35" font-weight="bold" fill="#000">ZONA</text><text x="100" y="130" text-anchor="middle" font-size="35" font-weight="bold" fill="#000">TURÍSTICA</text><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-310": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#E74C3C" stroke-width="12"/><path d="M70 90 L130 90 M70 110 L130 110" stroke="#000" stroke-width="12" stroke-linecap="round"/><line x1="35" y1="35" x2="165" y2="165" stroke="#E74C3C" stroke-width="14"/></svg>`,
  
  "r-311": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="white" stroke="#0057B8" stroke-width="12"/><text x="100" y="115" text-anchor="middle" font-size="70" font-weight="bold" fill="#000">30</text></svg>`,

  // === SECCIÓN 3.6: OBLIGACIÓN r-400 a r-422 ===
  "r-400": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 L100 150 M60 110 L100 70 L140 110" stroke="white" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-401": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 L100 150 M60 90 L100 130 L140 90" stroke="white" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-402": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M50 100 L150 100 M90 60 L130 100 L90 140" stroke="white" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-403": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M50 100 L150 100 M110 60 L70 100 L110 140" stroke="white" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-404": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 Q70 100 100 150 Q130 100 100 50" stroke="white" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`,
  
  "r-405": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 Q130 100 100 150 Q70 100 100 50" stroke="white" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`,
  
  "r-406": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 Q130 100 100 150 M60 90 L100 130 L140 90" stroke="white" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-407": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 Q70 100 100 150 M60 110 L100 70 L140 110" stroke="white" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-408": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 Q70 100 100 150 Q130 100 100 50 M60 90 L100 130 L140 90" stroke="white" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-409": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 50 Q130 100 100 150 Q70 100 100 50 M60 110 L100 70 L140 110" stroke="white" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-410": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M50 100 L150 100" stroke="white" stroke-width="18" stroke-linecap="round"/></svg>`,
  
  "r-411": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M50 100 L150 100 M90 60 L130 100 M90 140 L130 100" stroke="white" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-412": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M50 100 L150 100 M110 60 L70 100 M110 140 L70 100" stroke="white" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "r-413": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><circle cx="70" cy="100" r="18" fill="white"/><path d="M70 100 L70 130 M70 115 L60 130 M70 115 L80 130" stroke="#0057B8" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="100" r="18" fill="white"/><path d="M130 100 L130 140 M130 120 L120 140 M130 120 L140 140" stroke="#0057B8" stroke-width="8" stroke-linecap="round"/></svg>`,
  
  "r-414": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><circle cx="100" cy="100" r="30" fill="white"/></svg>`,
  
  "r-415": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><rect x="60" y="80" width="80" height="40" fill="white"/></svg>`,
  
  "r-416": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M70 80 L130 80 L130 120 L70 120 Z" fill="white"/></svg>`,
  
  "r-417": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><rect x="60" y="80" width="80" height="40" fill="white"/></svg>`,
  
  "r-418": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 60 L100 140 M60 100 L140 100" stroke="white" stroke-width="18" stroke-linecap="round"/></svg>`,
  
  "r-419": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><circle cx="100" cy="100" r="35" fill="white"/><circle cx="100" cy="100" r="20" fill="#0057B8"/></svg>`,
  
  "r-420": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 60 Q70 100 100 140 Q130 100 100 60" stroke="white" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`,
  
  "r-421": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 60 Q130 100 100 140 Q70 100 100 60" stroke="white" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`,
  
  "r-422": `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="95" fill="#0057B8"/><path d="M100 60 L100 140 M60 100 L140 100 M80 80 L120 120 M120 80 L80 120" stroke="white" stroke-width="14" stroke-linecap="round"/></svg>`,

  // === SECCIÓN 3.8: INDICACIÓN s-50 a s-58 ===
  "s-50": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">MIRADOR</text></svg>`,
  
  "s-51": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">CARGA</text></svg>`,
  
  "s-52": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">DESCARGA</text></svg>`,
  
  "s-53": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-54": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">PESO</text></svg>`,
  
  "s-55": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="50" font-weight="bold" fill="white">TÚNEL</text></svg>`,
  
  "s-56": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">PUENTE</text></svg>`,
  
  "s-57": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">VIADUCTO</text></svg>`,
  
  "s-58": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">GLORIETA</text></svg>`,

  // === SECCIÓN 3.8: INDICACIÓN s-114 a s-126 ===
  "s-114": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="80" font-weight="bold" fill="white">P</text></svg>`,
  
  "s-115": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="100" text-anchor="middle" font-size="40" font-weight="bold" fill="white">HOSPITAL</text><text x="100" y="130" text-anchor="middle" font-size="40" font-weight="bold" fill="white">H</text></svg>`,
  
  "s-116": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 Q100 60 140 100 Q100 140 60 100 M70 100 Q100 70 130 100 Q100 130 70 100" stroke="white" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`,
  
  "s-117": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="60" font-weight="bold" fill="white">GLP</text></svg>`,
  
  "s-118": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="55" font-weight="bold" fill="white">GNC</text></svg>`,
  
    "s-119": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="55" font-weight="bold" fill="white">GNC</text></svg>`,
  
  "s-120": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="50" font-weight="bold" fill="white">H2</text></svg>`,
  
  "s-121": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 80 L140 80 L130 120 L70 120 Z" fill="white"/><circle cx="80" cy="130" r="10" fill="#0057B8"/><circle cx="120" cy="130" r="10" fill="#0057B8"/></svg>`,
  
  "s-122": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><circle cx="100" cy="100" r="25" fill="white"/><path d="M100 75 L100 125 M75 100 L125 100" stroke="#0057B8" stroke-width="10" stroke-linecap="round"/></svg>`,
  
  "s-123": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="70" font-weight="bold" fill="white">i</text></svg>`,
  
  "s-124": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M70 100 L130 100 M100 70 L100 130" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-125": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M80 90 L120 90 L120 110 L80 110 Z" fill="white"/><path d="M90 90 L90 70 M110 90 L110 70" stroke="white" stroke-width="8" stroke-linecap="round"/></svg>`,
  
  "s-126": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><circle cx="70" cy="100" r="18" fill="white"/><path d="M70 100 L70 130 M70 115 L60 130 M70 115 L80 130" stroke="#0057B8" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="100" r="18" fill="white"/><path d="M130 100 L130 140 M130 120 L120 140 M130 120 L140 140" stroke="#0057B8" stroke-width="8" stroke-linecap="round"/></svg>`,

  // === SECCIÓN 3.12: DIRECCIÓN s-221 a s-229 ===
  "s-221": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-222": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-223": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-224": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-225": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-226": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-227": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-228": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-229": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,

  // === SECCIÓN 3.13: IDENTIFICACIÓN CARRETERAS s-320 a s-352 ===
  "s-320": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">N-340</text></svg>`,
  
  "s-330": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">A-1</text></svg>`,
  
  "s-340": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">AP-7</text></svg>`,
  
  "s-350": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">E-15</text></svg>`,
  
  "s-351": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">E-90</text></svg>`,
  
  "s-352": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">E-80</text></svg>`,

  // === SECCIÓN 3.15: CONFIRMACIÓN s-360 a s-369 ===
  "s-360": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">50 km</text></svg>`,
  
  "s-361": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">MADRID</text></svg>`,
  
  "s-362": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">BARCELONA</text></svg>`,
  
  "s-363": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">VALENCIA</text></svg>`,
  
  "s-364": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">SEVILLA</text></svg>`,
  
  "s-365": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">ZARAGOZA</text></svg>`,
  
  "s-366": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">MÁLAGA</text></svg>`,
  
  "s-367": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">MURCIA</text></svg>`,
  
  "s-368": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">PALMA</text></svg>`,
  
  "s-369": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">LAS PALMAS</text></svg>`,

  // === SECCIÓN 3.11: PRESEÑALIZACIÓN s-370 a s-377 ===
  "s-370": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-371": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-372": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-373": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-374": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-375": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-376": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,
  
  "s-377": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="white" stroke-width="16" stroke-linecap="round"/></svg>`,

  // === SECCIÓN 3.16: USO ESPECÍFICO POBLADO s-440 a s-447 ===
  "s-440": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">RESIDENCIAL</text></svg>`,
  
  "s-441": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="white">FIN RESIDENCIAL</text></svg>`,
  
  "s-442": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">ZONA 30</text></svg>`,
  
  "s-443": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="white">FIN ZONA 30</text></svg>`,
  
  "s-444": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">ESCOLAR</text></svg>`,
  
  "s-445": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="white">FIN ESCOLAR</text></svg>`,
  
  "s-446": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">COMERCIAL</text></svg>`,
  
  "s-447": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="white">FIN COMERCIAL</text></svg>`,

  // === SECCIÓN 3.14: LOCALIZACIÓN s-500, s-510, s-520, s-521 ===
  "s-500": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">GIRONA</text></svg>`,
  
  "s-510": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">GIRONA</text></svg>`,
  
  "s-520": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">CASSÀ</text></svg>`,
  
  "s-521": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">CASSÀ</text></svg>`,

  // === SECCIÓN 3.18: OTRAS SEÑALES s-600 a s-601 ===
  "s-600": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="45" font-weight="bold" fill="white">AUTOVÍA</text></svg>`,
  
  "s-601": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="15" fill="#0057B8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="white">FIN AUTOVÍA</text></svg>`,

  // === SECCIÓN 3.17: PANELES COMPLEMENTARIOS s-800 a s-880 ===
  "s-800": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="50" font-weight="bold" fill="#000">150 m</text></svg>`,
  
  "s-810": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="50" font-weight="bold" fill="#000">2 km</text></svg>`,
  
  "s-820": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><path d="M60 100 L140 100 M120 80 L140 100 L120 120" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "s-830": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><path d="M60 100 L140 100 M80 80 L60 100 L80 120" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "s-840a": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><path d="M60 100 L140 100 M120 80 L140 100 L120 120" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "s-840b": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><path d="M60 100 L140 100 M80 80 L60 100 L80 120" stroke="#000" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  "s-850": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><path d="M60 100 L140 100 M100 60 L100 140" stroke="#000" stroke-width="12" stroke-linecap="round"/></svg>`,
  
  "s-860": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="#000">NIEVE</text></svg>`,
  
  "s-861": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="40" font-weight="bold" fill="#000">SOL</text></svg>`,
  
  "s-870": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">EXCEPTO</text></svg>`,
  
  "s-871": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">RESIDENTES</text></svg>`,
  
  "s-872": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">AUTOBUSES</text></svg>`,
  
  "s-873": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">TAXIS</text></svg>`,
  
  "s-874": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">BICLETAS</text></svg>`,
  
  "s-875": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">PEATONES</text></svg>`,
  
  "s-876": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">CARGA</text></svg>`,
  
  "s-877": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">DESCARGA</text></svg>`,
  
  "s-878": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">8-20h</text></svg>`,
  
  "s-879": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">MAX 2h</text></svg>`,
  
  "s-880": `<svg viewBox="0 0 200 200"><rect x="10" y="10" width="180" height="180" rx="10" fill="white" stroke="#000" stroke-width="8"/><text x="100" y="115" text-anchor="middle" font-size="30" font-weight="bold" fill="#000">PMR</text></svg>`
};
window.SENALES_SVG = SENALES_SVG;

