/**
 * ============================================================
 * ICONS — src/assets/icons/icons.js
 * ============================================================
 * Registro centralizado de todos los íconos SVG de la app.
 * Centralised registry of all SVG icons in the app.
 *
 * Incluye:
 *  - Íconos de navegación del sidebar
 *  - Logotipos de unidades de negocio (Sabores, Extremas, etc.)
 *  - Íconos de sección (Judiciales, Inspecciones, etc.)
 *
 * Uso / Usage:
 *   import { ICONS, getIcon } from './icons.js';
 *   element.innerHTML = ICONS.home;
 *   element.innerHTML = getIcon('sabores', { width: 40 });
 * ============================================================
 */

/**
 * Mapa de íconos SVG indexados por nombre.
 * SVG icons map indexed by name.
 *
 * Convención de tamaño en viewBox: los SVGs son escalables,
 * el tamaño final lo controla el CSS del contenedor (.nav-ico, .unit-logo).
 */
export const ICONS = {

  /* ----------------------------------------------------------
     NAVEGACIÓN — Sidebar nav icons
     ---------------------------------------------------------- */
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 11L12 3l9 8v9a1 1 0 0 1-1 1h-5v-7h-4v7H4a1 1 0 0 1-1-1V11z"/>
  </svg>`,

  empresa: `<svg viewBox="0 0 28 28" fill="none" stroke="#1E3A8A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="10" r="4"/>
    <path d="M7.5 8.5H5a1 1 0 0 0 0 2h2a1 1 0 0 1 0 2H4.5"/>
    <line x1="6" y1="6" x2="6" y2="7"/>
    <line x1="6" y1="13" x2="6" y2="14"/>
    <rect x="12" y="17" width="3" height="7" fill="#1E3A8A" stroke="none" rx=".5"/>
    <rect x="16.5" y="13" width="3" height="11" fill="#1E3A8A" stroke="none" rx=".5"/>
    <rect x="21" y="9" width="3" height="15" fill="#1E3A8A" stroke="none" rx=".5"/>
    <path d="M13 12l4-4 3 3 4-5"/><polyline points="21,6 24,6 24,9"/>
  </svg>`,

  /* ----------------------------------------------------------
     LOGOTIPOS — Unidades de negocio
     ---------------------------------------------------------- */
  sabores: `<svg viewBox="0 0 80 70" fill="none">
    <ellipse cx="40" cy="35" rx="35" ry="28" fill="#0F172A"/>
    <ellipse cx="40" cy="35" rx="30" ry="23" fill="none" stroke="white" stroke-width="1"/>
    <path d="M10 50 Q40 38 70 50" stroke="white" stroke-width=".8" fill="none" opacity=".5"/>
    <text x="40" y="33" text-anchor="middle" fill="white" font-family="Arial Black,Arial" font-size="11" font-weight="900" letter-spacing=".5">SABORES</text>
    <text x="40" y="47" text-anchor="middle" fill="white" font-family="Arial Black,Arial" font-size="11" font-weight="900" letter-spacing=".5">EXPRESS</text>
  </svg>`,

  extremas: `<svg viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="26" fill="#0F172A"/>
    <text x="30" y="38" text-anchor="middle" fill="white" font-family="Arial Black,Arial" font-size="20" font-weight="900">EXT</text>
    <line x1="10" y1="10" x2="50" y2="50" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
    <line x1="50" y1="10" x2="10" y2="50" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
  </svg>`,

  staff: `<svg viewBox="0 0 28 28" fill="#1E3A8A">
    <circle cx="8" cy="9" r="2.8"/>
    <circle cx="20" cy="9" r="2.8"/>
    <circle cx="14" cy="6.5" r="3.5"/>
    <path d="M2 21c0-3 2-5 5-5h2c2.7 0 5 2 5 5v1H2v-1z" opacity=".75"/>
    <path d="M14 21c0-3 2-5 5-5h2c2.7 0 5 2 5 5v1H14v-1z" opacity=".75"/>
    <path d="M6 23c0-4 3.6-7.5 8-7.5s8 3.5 8 7.5v1H6v-1z"/>
  </svg>`,

  fabrica: `<svg viewBox="0 0 24 24" fill="#1E3A8A">
    <path d="M2 22V11l5 3V11l5 3V11l5 3V7h3v15H2z"/>
    <rect x="5" y="17" width="2" height="3" fill="#EAF0F7"/>
    <rect x="10" y="17" width="2" height="3" fill="#EAF0F7"/>
    <rect x="15" y="17" width="2" height="3" fill="#EAF0F7"/>
    <rect x="19" y="9" width="1.5" height="3" fill="#EAF0F7"/>
  </svg>`,

  /* ----------------------------------------------------------
     MÓDULOS DE GESTIÓN — Management section icons
     ---------------------------------------------------------- */
  judiciales: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="3" x2="12" y2="20"/>
    <circle cx="12" cy="3" r=".6" fill="#1E3A8A"/>
    <line x1="7" y1="20" x2="17" y2="20"/>
    <line x1="5" y1="7" x2="19" y2="7"/>
    <path d="M2 14l3-7 3 7H2z" fill="#1E3A8A"/>
    <path d="M16 14l3-7 3 7h-6z" fill="#1E3A8A"/>
  </svg>`,

  inspecciones: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="10" cy="10" r="7"/>
    <line x1="15.5" y1="15.5" x2="21" y2="21"/>
    <polyline points="6.5,10 9.5,12.8 13.5,8"/>
  </svg>`,

  accidentabilidad: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">
    <path d="M12 3L22 21H2L12 3z"/>
    <line x1="12" y1="10" x2="12" y2="14"/>
    <circle cx="12" cy="17.5" r="1" fill="#1E3A8A" stroke="none"/>
  </svg>`,

  rotacion: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 6.5 A9 9 0 1 1 4 17"/>
    <polyline points="2,3 4,7 8,5"/>
  </svg>`,

  siniestralidad: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 3h9l4 4v14H5V3z"/>
    <polyline points="14,3 14,7 18,7"/>
    <line x1="8" y1="11" x2="14" y2="11"/>
    <line x1="8" y1="14" x2="12" y2="14"/>
    <circle cx="17" cy="17" r="3.5" fill="#1E3A8A" stroke="none"/>
    <line x1="17" y1="15" x2="17" y2="17.5" stroke="white"/>
    <circle cx="17" cy="18.8" r=".5" fill="white" stroke="none"/>
  </svg>`,

  locales: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2C7.6 2 5 5.4 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-3.6-2.6-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5" fill="#1E3A8A" stroke="none"/>
  </svg>`,

  /* ----------------------------------------------------------
     ÍCONOS DE MOBILE NAV
     ---------------------------------------------------------- */
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>`,

  building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/>
  </svg>`,

  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>`,

  more: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
    <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
  </svg>`,

};

/**
 * Obtiene un ícono SVG por nombre.
 * Gets an SVG icon by name.
 *
 * @param {string} name - Nombre del ícono
 * @returns {string} SVG string o string vacío si no existe
 */
export function getIcon(name) {
  return ICONS[name] ?? '';
}

/**
 * Inyecta íconos SVG en todos los elementos con [data-icon].
 * Injects SVG icons into all elements with [data-icon].
 *
 * @param {Element} context - Contexto de búsqueda (default: document)
 */
export function injectIcons(context = document) {
  context.querySelectorAll('[data-icon]').forEach(el => {
    const key = el.dataset.icon;
    if (ICONS[key]) el.innerHTML = ICONS[key];
  });
}
