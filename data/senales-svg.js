export const SENALES_SVG = {
  // === PROHIBICIÓN R-1 a R-20 ===
  "r-1": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,10 190,190 10,190" fill="#c62828" stroke="white" stroke-width="10"/><text x="100" y="150" font-family="Arial Black" font-size="90" fill="white" text-anchor="middle">STOP</text></svg>`,

  "r-2": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,10 190,190 10,190" fill="white" stroke="#c62828" stroke-width="12"/><text x="100" y="140" font-family="Arial Black" font-size="38" fill="#c62828" text-anchor="middle">CEDA EL</text><text x="100" y="175" font-family="Arial Black" font-size="38" fill="#c62828" text-anchor="middle">PASO</text></svg>`,

  "r-100": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="95" fill="white" stroke="#d32f2f" stroke-width="12"/><path d="M30 30 L170 170" stroke="#d32f2f" stroke-width="15" stroke-linecap="round"/></svg>`,

  "r-114": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="95" fill="white" stroke="#d32f2f" stroke-width="12"/><line x1="30" y1="30" x2="170" y2="170" stroke="#d32f2f" stroke-width="15" stroke-linecap="round"/><circle cx="70" cy="100" r="15" fill="#222"/><path d="M60 115 L60 140 M60 140 L50 150 M60 140 L70 150" stroke="#222" stroke-width="8" stroke-linecap="round"/><circle cx="130" cy="100" r="15" fill="#222"/><path d="M120 115 L120 145 M120 145 L110 155 M120 145 L130 155" stroke="#222" stroke-width="8" stroke-linecap="round"/></svg>`,

  // === PELIGRO P-1 a P-20 ===
  "p-13a": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,10 190,190 10,190" fill="#ffb300" stroke="#222" stroke-width="10"/><path d="M100 60 Q70 100 100 140 Q130 100 100 60" stroke="#222" stroke-width="12" fill="none"/></svg>`,

  "p-15": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,10 190,190 10,190" fill="#ffb300" stroke="#222" stroke-width="10"/><circle cx="100" cy="100" r="40" fill="#222"/><path d="M100 70 L100 130" stroke="#ffb300" stroke-width="15"/></svg>`,

  // === INDICACIÓN S-50 a S-120 ===
  "s-50": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="180" height="180" rx="20" fill="#1e5aa8"/><path d="M60 120 L80 100 L100 120 L120 90 L140 120" stroke="white" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  "s-51": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="180" height="180" rx="20" fill="#1e5aa8"/><text x="100" y="130" font-family="Arial Black" font-size="100" fill="white" text-anchor="middle">30</text></svg>`,

  "s-118": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" rx="20" fill="#1e5aa8"/><text x="100" y="120" font-family="Arial Black" font-size="120" fill="white" text-anchor="middle">P</text><circle cx="160" cy="160" r="12" fill="white"/><path d="M150 150 L150 135 L165 135" stroke="white" stroke-width="8" fill="none" stroke-linecap="round"/></svg>`,

  // === OBLIGACIÓN ===
  "r-402": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="95" fill="#1e5aa8"/><path d="M60 100 L100 60 L140 100 L100 140 Z" fill="white"/></svg>`,

  // === FIN PROHIBICIÓN ===
  "r-500": `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="95" fill="white" stroke="#222" stroke-width="12"/><line x1="35" y1="35" x2="165" y2="165" stroke="#222" stroke-width="12" stroke-linecap="round"/></svg>`
  //... Aquí van las 190+ restantes
}
