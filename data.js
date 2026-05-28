// ============================================================
// DATA — todos los datos del dashboard
// ============================================================
// FUTURA CONEXIÓN SUPABASE
// Reemplazar estos objetos con llamadas a Supabase:
//   const { data } = await supabase.from('sectores').select('*')
//   const { data } = await supabase.from('kpis').select('*')
//   const { data } = await supabase.from('accidentes').select('*')
// NO implementar todavía
// ============================================================

const meses     = ['Ene','Feb','Mar','Abr','May'];
const mesesFull = ['Enero','Febrero','Marzo','Abril','Mayo'];
const datesISO  = ['31 Ene 2026','28 Feb 2026','31 Mar 2026','30 Abr 2026','31 May 2026'];

const PASTEL_PALETTE = ['#60A5FA','#818CF8','#38BDF8','#64748B','#93C5FD','#A5B4FC'];

const SECTORS = {
  sabores: {
    name: 'Sabores Express',
    emoji: '🥟',
    desc: 'Cadena de locales gastronómicos',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg,#93C5FD,#60A5FA)',
    soft: '#DBEAFE',
    softBorder: '#BFDBFE',
    empleados: 501,
    dotacion: [489,491,495,498,501],
    dotacionTrend: { value:'▲ 3', dir:'up', text:'vs. mes anterior' },
    ausentismo: 3.56,
    ausentismoTrend: { value:'▼ 0.5%', dir:'up', text:'vs. mes anterior' },
    ausData: [4.1,4.16,5.17,3.56,3.8],
    rotacion: 5.8,
    rotacionTrend: { value:'▲ 0.2%', dir:'down', text:'vs. mes anterior' },
    accidentes: 4,
    accidentesTrend: { value:'▼ 1', dir:'up', text:'vs. mismo período' },
    hsExtras: [489,521,445,501,520],
    rotData: [5.4,5.5,5.6,5.7,5.8],
    accMes:  [1,1,1,0,1],
    accTipo: { 'Laboral':3, 'In Itinere':1 },
    ultimos: [
      { emp:'GARCIA, M.', sec:'Operaciones', fecha:'Mar 2026', estado:'En tratamiento', dias:45, tipo:'LABORAL' },
      { emp:'LOPEZ, R.', sec:'Cocina', fecha:'Feb 2026', estado:'Alta', dias:12, tipo:'ALTA' },
      { emp:'TORRES, A.', sec:'Atención', fecha:'Ene 2026', estado:'Alta', dias:8, tipo:'ALTA' }
    ]
  },
  extremas: {
    name: 'Extremas',
    emoji: '🍔',
    desc: 'Operaciones gastronómicas premium',
    color: '#818CF8',
    gradient: 'linear-gradient(135deg,#A5B4FC,#818CF8)',
    soft: '#E0E7FF',
    softBorder: '#C7D2FE',
    empleados: 322,
    dotacion: [314,318,315,320,322],
    dotacionTrend: { value:'▲ 2', dir:'up', text:'vs. mes anterior' },
    ausentismo: 4.38,
    ausentismoTrend: { value:'▼ 0.2%', dir:'up', text:'vs. mes anterior' },
    ausData: [5.1,4.8,5.0,4.55,4.38],
    rotacion: 7.2,
    rotacionTrend: { value:'▲ 1.4%', dir:'down', text:'vs. mes anterior' },
    accidentes: 6,
    accidentesTrend: { value:'▲ 1', dir:'down', text:'vs. mismo período' },
    hsExtras: [892,945,1020,978,1011],
    rotData: [5.8,6.1,6.5,6.8,7.2],
    accMes:  [1,1,2,1,1],
    accTipo: { 'Laboral':5, 'In Itinere':1 },
    ultimos: [
      { emp:'MARTINEZ, J.', sec:'Cocina', fecha:'May 2026', estado:'En tratamiento', dias:22, tipo:'LABORAL' },
      { emp:'SOSA, D.', sec:'Salón', fecha:'Abr 2026', estado:'En tratamiento', dias:30, tipo:'LABORAL' },
      { emp:'PEREZ, C.', sec:'Logística', fecha:'Mar 2026', estado:'Alta', dias:15, tipo:'ALTA' },
      { emp:'RAMIREZ, F.', sec:'Cocina', fecha:'Feb 2026', estado:'Alta', dias:9, tipo:'ALTA' }
    ]
  },
  staff: {
    name: 'Staff Corporativo',
    emoji: '👥',
    desc: 'Gerencia y administración central',
    color: '#38BDF8',
    gradient: 'linear-gradient(135deg,#7DD3FC,#38BDF8)',
    soft: '#E0F2FE',
    softBorder: '#BAE6FD',
    empleados: 210,
    dotacion: [204,207,208,208,210],
    dotacionTrend: { value:'▲ 2', dir:'up', text:'vs. mes anterior' },
    ausentismo: 9.28,
    ausentismoTrend: { value:'▲ 1.1%', dir:'down', text:'vs. mes anterior' },
    ausData: [7.2,7.9,8.5,8.7,9.28],
    rotacion: 4.1,
    rotacionTrend: { value:'▼ 0.3%', dir:'up', text:'vs. mes anterior' },
    accidentes: 1,
    accidentesTrend: { value:'= 0', dir:'neutral', text:'vs. mismo período' },
    hsExtras: [120,135,142,118,128],
    rotData: [3.5,3.7,3.9,4.0,4.1],
    accMes:  [0,0,0,1,0],
    accTipo: { 'Laboral':0, 'In Itinere':1 },
    ultimos: [
      { emp:'FERNANDEZ, P.', sec:'Finanzas', fecha:'Abr 2026', estado:'Alta', dias:5, tipo:'ALTA' }
    ]
  },
  fabrica: {
    name: 'Fábrica',
    emoji: '🏭',
    desc: 'Planta de producción · Turnos rotativos',
    color: '#64748B',
    gradient: 'linear-gradient(135deg,#94A3B8,#64748B)',
    soft: '#F1F5F9',
    softBorder: '#CBD5E1',
    empleados: 214,
    dotacion: [210,212,213,213,214],
    dotacionTrend: { value:'▲ 1', dir:'up', text:'vs. mes anterior' },
    ausentismo: 11.43,
    ausentismoTrend: { value:'▲ 2.1%', dir:'down', text:'vs. mes anterior' },
    ausData: [8.4,9.2,10.1,9.3,11.43],
    rotacion: 8.5,
    rotacionTrend: { value:'▲ 0.8%', dir:'down', text:'vs. mes anterior' },
    accidentes: 3,
    accidentesTrend: { value:'▼ 1', dir:'up', text:'vs. mismo período' },
    hsExtras: [612,650,701,688,742],
    rotData: [7.5,7.7,8.0,8.2,8.5],
    accMes:  [1,0,1,0,1],
    accTipo: { 'Laboral':3, 'In Itinere':0 },
    ultimos: [
      { emp:'GIMENEZ, O.', sec:'Línea 2', fecha:'May 2026', estado:'En tratamiento', dias:18, tipo:'LABORAL' },
      { emp:'AGUIRRE, L.', sec:'Línea 1', fecha:'Mar 2026', estado:'Alta', dias:11, tipo:'ALTA' },
      { emp:'SILVA, B.', sec:'Mantenimiento', fecha:'Feb 2026', estado:'Alta', dias:7, tipo:'ALTA' }
    ]
  }
};

// ============================================================
// ICONS — SVGs de la sidebar y tarjetas de unidad
// ============================================================
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11L12 3l9 8v9a1 1 0 0 1-1 1h-5v-7h-4v7H4a1 1 0 0 1-1-1V11z"/></svg>`,
  empresa: `<svg viewBox="0 0 28 28" fill="none" stroke="#1E3A8A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="10" r="4"/><path d="M7.5 8.5H5a1 1 0 0 0 0 2h2a1 1 0 0 1 0 2H4.5"/><line x1="6" y1="6" x2="6" y2="7"/><line x1="6" y1="13" x2="6" y2="14"/><rect x="12" y="17" width="3" height="7" fill="#1E3A8A" stroke="none" rx=".5"/><rect x="16.5" y="13" width="3" height="11" fill="#1E3A8A" stroke="none" rx=".5"/><rect x="21" y="9" width="3" height="15" fill="#1E3A8A" stroke="none" rx=".5"/><path d="M13 12l4-4 3 3 4-5"/><polyline points="21,6 24,6 24,9"/></svg>`,
  sabores: `<svg viewBox="0 0 80 70" fill="none"><ellipse cx="40" cy="35" rx="35" ry="28" fill="#0F172A"/><ellipse cx="40" cy="35" rx="30" ry="23" fill="none" stroke="white" stroke-width="1"/><path d="M10 50 Q40 38 70 50" stroke="white" stroke-width=".8" fill="none" opacity=".5"/><text x="40" y="33" text-anchor="middle" fill="white" font-family="Arial Black,Arial" font-size="11" font-weight="900" letter-spacing=".5">SABORES</text><text x="40" y="47" text-anchor="middle" fill="white" font-family="Arial Black,Arial" font-size="11" font-weight="900" letter-spacing=".5">EXPRESS</text></svg>`,
  extremas: `<svg viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="26" fill="#0F172A"/><text x="30" y="38" text-anchor="middle" fill="white" font-family="Arial Black,Arial" font-size="20" font-weight="900">EXT</text><line x1="10" y1="10" x2="50" y2="50" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="10" x2="10" y2="50" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/></svg>`,
  staff: `<svg viewBox="0 0 28 28" fill="#1E3A8A"><circle cx="8" cy="9" r="2.8"/><circle cx="20" cy="9" r="2.8"/><circle cx="14" cy="6.5" r="3.5"/><path d="M2 21c0-3 2-5 5-5h2c2.7 0 5 2 5 5v1H2v-1z" opacity=".75"/><path d="M14 21c0-3 2-5 5-5h2c2.7 0 5 2 5 5v1H14v-1z" opacity=".75"/><path d="M6 23c0-4 3.6-7.5 8-7.5s8 3.5 8 7.5v1H6v-1z"/></svg>`,
  fabrica: `<svg viewBox="0 0 24 24" fill="#1E3A8A"><path d="M2 22V11l5 3V11l5 3V11l5 3V7h3v15H2z"/><rect x="5" y="17" width="2" height="3" fill="#EAF0F7"/><rect x="10" y="17" width="2" height="3" fill="#EAF0F7"/><rect x="15" y="17" width="2" height="3" fill="#EAF0F7"/><rect x="19" y="9" width="1.5" height="3" fill="#EAF0F7"/></svg>`,
  judiciales: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="20"/><circle cx="12" cy="3" r=".6" fill="#1E3A8A"/><line x1="7" y1="20" x2="17" y2="20"/><line x1="5" y1="7" x2="19" y2="7"/><path d="M2 14l3-7 3 7H2z" fill="#1E3A8A"/><path d="M16 14l3-7 3 7h-6z" fill="#1E3A8A"/></svg>`,
  inspecciones: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><line x1="15.5" y1="15.5" x2="21" y2="21"/><polyline points="6.5,10 9.5,12.8 13.5,8"/></svg>`,
  accidentabilidad: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"><path d="M12 3L22 21H2L12 3z"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17.5" r="1" fill="#1E3A8A" stroke="none"/></svg>`,
  rotacion: `<svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5 A9 9 0 1 1 4 17"/><polyline points="2,3 4,7 8,5"/></svg>`
};
