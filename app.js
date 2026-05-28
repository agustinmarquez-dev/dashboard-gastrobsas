// ============================================================
// APP.JS — lógica, router y vistas
// Depende de: data.js (cargado antes en index.html)
// ============================================================

// ============================================================
// CHART HELPERS
// ============================================================
let _charts = [];
function destroyCharts(){ _charts.forEach(c=>{try{c.destroy()}catch(e){}}); _charts=[]; }
function mkOpt(){
  return {
    responsive:true, maintainAspectRatio:false,
    plugins:{ legend:{display:false}, tooltip:{enabled:true} },
    scales:{
      x:{ grid:{display:false}, ticks:{font:{size:10},color:'#94A3B8'} },
      y:{ grid:{color:'#F1F5F9'}, ticks:{font:{size:10},color:'#94A3B8'} }
    }
  };
}
function makeChart(id, cfg){
  const el = document.getElementById(id);
  if(!el) return;
  const c = new Chart(el, cfg);
  _charts.push(c);
  return c;
}

// ============================================================
// ROUTER
// ============================================================
const ROUTES = {
  index:           { label:'Panel Ejecutivo',    render: renderIndex },
  sabores:         { label:'Sabores Express',    render: ()=>renderSector('sabores') },
  extremas:        { label:'Extremas',           render: ()=>renderSector('extremas') },
  staff:           { label:'Staff Corporativo',  render: ()=>renderSector('staff') },
  fabrica:         { label:'Fábrica',            render: ()=>renderSector('fabrica') },
  judiciales:      { label:'Informes Judiciales',render: renderJudiciales },
  inspecciones:    { label:'Inspecciones',       render: renderInspecciones },
  accidentabilidad:{ label:'Accidentabilidad',   render: renderAccidentabilidad },
  rotacion:        { label:'Rotación',           render: renderRotacion }
};

function go(route){
  destroyCharts();
  const r = ROUTES[route] || ROUTES.index;
  document.getElementById('crumb').textContent = r.label;
  document.querySelectorAll('.nav-item').forEach(b=>{
    b.classList.toggle('active', b.dataset.route===route);
  });
  document.getElementById('content').scrollTop = 0;
  r.render();
}

document.getElementById('sb-nav').addEventListener('click', e=>{
  const btn = e.target.closest('.nav-item');
  if(!btn) return;
  go(btn.dataset.route);
});

// Sidebar collapse — desktop usa clase "collapsed", mobile usa "sb-expanded" como drawer
const sb        = document.getElementById('sidebar');
const sbOverlay = document.getElementById('sb-overlay');

function toggleSb(){
  if(window.innerWidth <= 640){
    // Mobile: abre/cierra como drawer overlay
    const isOpen = sb.classList.toggle('sb-expanded');
    sbOverlay.classList.toggle('visible', isOpen);
  } else {
    // Desktop: colapsa/expande normalmente
    sb.classList.toggle('collapsed');
  }
}
function closeMobileSb(){
  sb.classList.remove('sb-expanded');
  sbOverlay.classList.remove('visible');
}

document.getElementById('sb-toggle').addEventListener('click', toggleSb);
document.getElementById('sb-toggle-mini').addEventListener('click', toggleSb);
sbOverlay.addEventListener('click', closeMobileSb);

// Cerrar drawer al navegar en mobile
document.getElementById('sb-nav').addEventListener('click', ()=>{
  if(window.innerWidth <= 640) closeMobileSb();
});

// ============================================================
// BOTÓN "Actualizar datos"
// ============================================================
// FUTURA CONEXIÓN SUPABASE
// Aquí irá la lógica para recargar datos desde Supabase
// y volver a renderizar la vista activa
// NO implementar todavía
// ============================================================
document.getElementById('upload-btn').addEventListener('click', ()=>{
  alert('Aquí se conectará Supabase para actualizar los datos.');
});

// ============================================================
// HELPERS DE COLOR
// ============================================================
function ausColorFor(v){ return v < 5 ? '#2563EB' : v < 8 ? '#64748B' : '#7C8499'; }
function rotColorFor(v){ return v < 5 ? '#2563EB' : v < 7 ? '#64748B' : '#7C8499'; }

// ============================================================
// HELPERS DE COMPONENTES HTML
// ============================================================
function kpiCard(color, label, val, trendVal, trendDir, cmp, icon){
  const trendCls = trendDir==='up' ? 'trend-up' : trendDir==='down' ? 'trend-dn' : 'trend-neutral';
  return `<div class="kpi ${color}">
    <div class="kpi-header">
      <span class="kpi-label">${label}</span>
      <div class="kpi-icon ${color}">${icon}</div>
    </div>
    <div class="kpi-val">${val}</div>
    <div class="kpi-foot"><span class="${trendCls}">${trendVal}</span><span class="kpi-cmp">${cmp}</span></div>
  </div>`;
}

function unitCard(key){
  const s = SECTORS[key];
  const isBrand = (key==='sabores' || key==='extremas');
  const logoCls = 'unit-logo' + (isBrand ? ' brand' : '');
  const logoStyle = isBrand ? '' : `style="background:${s.soft};border:1px solid ${s.softBorder}"`;
  return `<button class="unit-card" data-unit-card="${key}">
    <div class="${logoCls}" ${logoStyle}>${ICONS[key] || s.emoji}</div>
    <div class="unit-name">${s.name}</div>
    <div class="unit-desc">${s.desc}</div>
    <div class="unit-metrics">
      <div><div class="unit-met-val">${s.empleados}</div><div class="unit-met-lbl">empleados</div></div>
      <div style="text-align:right"><div class="unit-met-val" style="color:${ausColorFor(s.ausentismo)}">${s.ausentismo}%</div><div class="unit-met-lbl">ausentismo</div></div>
    </div>
  </button>`;
}

function comparisonRow(key){
  const s = SECTORS[key];
  return `<div class="stat-row" onclick="go('${key}')">
    <div class="stat-left"><div class="stat-dot" style="background:${s.color}"></div>${s.name}</div>
    <div class="stat-vals">
      <span class="stat-v">${s.empleados}</span>
      <span class="stat-v" style="color:${ausColorFor(s.ausentismo)}">${s.ausentismo}%</span>
      <span class="stat-v" style="color:${rotColorFor(s.rotacion)}">${s.rotacion}%</span>
    </div>
  </div>`;
}

// ============================================================
// VIEW: INDEX
// ============================================================
function renderIndex(){
  const html = `
    <div class="page-header">
      <div class="greeting">Buenos días, César.</div>
      <div class="page-title">Panel Ejecutivo</div>
      <div class="page-sub">Resumen general de indicadores — Mayo 2026</div>
    </div>

    <div class="dir-hero">
      <div class="dir-hero-img">
        <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=70" alt="Equipo Dirección RRHH">
      </div>
      <div class="dir-hero-body">
        <div class="dir-hero-eyebrow">Dirección de Recursos Humanos</div>
        <div class="dir-hero-title">Personas, cultura y operaciones</div>
        <div class="dir-hero-text">
          Centralizamos la gestión de las 4 unidades de negocio: Sabores Express, Extremas,
          Staff Corporativo y Fábrica. Hacé clic en cualquier unidad o módulo para ver el detalle.
        </div>
        <div class="dir-hero-row">
          <div><div class="stat-mini-val">1.247</div><div class="stat-mini-lbl">Empleados</div></div>
          <div><div class="stat-mini-val">4</div><div class="stat-mini-lbl">Unidades</div></div>
          <div><div class="stat-mini-val">38</div><div class="stat-mini-lbl">Convenios</div></div>
          <div><div class="stat-mini-val">12</div><div class="stat-mini-lbl">Provincias</div></div>
        </div>
      </div>
    </div>

    <div class="kpi-grid">
      ${kpiCard('blue','Dotación Total','1.247','▲ 2.3%','up','vs. mes anterior','👥')}
      ${kpiCard('sky','Ausentismo','4.69%','▼ 0.3%','up','vs. mes anterior','📅')}
      ${kpiCard('indigo','Rotación Mensual','6.2%','▲ 1.1%','down','vs. mes anterior','🔄')}
      ${kpiCard('slate','Accidentes YTD','14','▼ 3','up','vs. mismo período','⚠️')}
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Evolución de Dotación</div>
        <div class="chart-sub">Ene–May 2026 por unidad</div>
        <canvas id="c-evol"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Ausentismo Corporativo</div>
        <div class="chart-sub">% mensual 2026</div>
        <canvas id="c-aus"></canvas>
      </div>
    </div>

    <div class="section-title">Unidades</div>
    <div class="units-grid">
      ${unitCard('sabores')}
      ${unitCard('extremas')}
      ${unitCard('staff')}
      ${unitCard('fabrica')}
    </div>

    <div class="bottom-row">
      <div>
        <div class="section-title">Comparativa por Unidad</div>
        <div class="stat-card">
          <div class="stat-head"><span>Unidad</span><div style="display:flex;gap:24px"><span>Dotación</span><span>Ausen.</span><span>Rotac.</span></div></div>
          ${comparisonRow('sabores')}
          ${comparisonRow('extremas')}
          ${comparisonRow('staff')}
          ${comparisonRow('fabrica')}
        </div>
      </div>
      <div>
        <div class="section-title">Novedades</div>
        <div class="alert-card danger"><span class="alert-icon">!</span><div><div class="alert-title">Ausentismo elevado — Fábrica</div><div class="alert-body">Alcanzó 11.43%, superando el umbral crítico del 6%.</div></div></div>
        <div class="alert-card warning"><span class="alert-icon">i</span><div><div class="alert-title">Rotación en alza — Extremas</div><div class="alert-body">Subió 1.4 puntos vs. el mes anterior.</div></div></div>
        <div class="alert-card success"><span class="alert-icon">✓</span><div><div class="alert-title">Reducción de accidentes</div><div class="alert-body">YTD disminuyó 3 eventos vs. mismo período 2025.</div></div></div>
      </div>
    </div>
  `;
  document.getElementById('content').innerHTML = html;

  document.querySelectorAll('[data-unit-card]').forEach(el=>{
    el.addEventListener('click', ()=>go(el.dataset.unitCard));
  });

  makeChart('c-evol', {
    type:'line',
    data:{
      labels:meses,
      datasets:[
        {label:'Sabores',data:SECTORS.sabores.dotacion,borderColor:SECTORS.sabores.color,backgroundColor:SECTORS.sabores.color,tension:.4,pointRadius:3,fill:false},
        {label:'Extremas',data:SECTORS.extremas.dotacion,borderColor:SECTORS.extremas.color,backgroundColor:SECTORS.extremas.color,tension:.4,pointRadius:3,fill:false},
        {label:'Staff',data:SECTORS.staff.dotacion,borderColor:SECTORS.staff.color,backgroundColor:SECTORS.staff.color,tension:.4,pointRadius:3,fill:false},
        {label:'Fábrica',data:SECTORS.fabrica.dotacion,borderColor:SECTORS.fabrica.color,backgroundColor:SECTORS.fabrica.color,tension:.4,pointRadius:3,fill:false}
      ]
    },
    options:{...mkOpt(), plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12,color:'#475569'}}}}
  });
  makeChart('c-aus',{
    type:'bar',
    data:{labels:meses,datasets:[{data:[4.26,4.33,6.82,4.69,4.5],backgroundColor:'#60A5FA',borderRadius:6}]},
    options:mkOpt()
  });
}

// ============================================================
// VIEW: SECTOR (reutilizable para las 4 unidades)
// ============================================================
let _currentSector = null;

function trendBetween(arr, idx, lessIsBetter, decimals, suffix){
  if(idx<=0) return {value:'—', dir:'neutral'};
  const delta = +(arr[idx] - arr[idx-1]).toFixed(decimals||0);
  if(delta === 0) return {value:'= 0'+(suffix||''), dir:'neutral'};
  const sign = delta > 0 ? '▲' : '▼';
  const dir = lessIsBetter ? (delta < 0 ? 'up' : 'down') : (delta > 0 ? 'up' : 'down');
  return { value: `${sign} ${Math.abs(delta).toFixed(decimals||0)}${suffix||''}`, dir };
}

function sectorKpis(s, idx){
  const dotT = trendBetween(s.dotacion, idx, false, 0, '');
  const ausT = trendBetween(s.ausData,  idx, true,  2, '%');
  const rotT = trendBetween(s.rotData,  idx, true,  1, '%');
  const accYtdArr = s.accMes.map((_,i)=> s.accMes.slice(0,i+1).reduce((a,b)=>a+b,0));
  const accT = trendBetween(accYtdArr, idx, true, 0, '');
  const accYtd = accYtdArr[idx];
  return `
    ${kpiCard('blue','Dotación',String(s.dotacion[idx]),dotT.value,dotT.dir,'vs. mes anterior','👥')}
    ${kpiCard('sky','Ausentismo',s.ausData[idx]+'%',ausT.value,ausT.dir,'vs. mes anterior','📅')}
    ${kpiCard('indigo','Rotación',s.rotData[idx]+'%',rotT.value,rotT.dir,'vs. mes anterior','🔄')}
    ${kpiCard('slate','Accidentes YTD',String(accYtd),accT.value,accT.dir,'hasta '+mesesFull[idx],'⚠️')}
  `;
}

function monthTabsHtml(activeIdx){
  const labels = ['Ene','Feb','Mar','Abr','May'];
  return `
    <div class="month-tabs" role="tablist">
      ${labels.map((m,i)=>`
        <button class="month-btn ${i===activeIdx?'active':''}" onclick="selectMonth(this, ${i})" type="button">
          <span class="mb-mon">${m}</span>
          <span class="mb-year">2026</span>
        </button>
      `).join('')}
    </div>
  `;
}

function monthDetailHtml(s, idx){
  const sName = s.name.replace(/'/g, "\\'");
  const status = idx === 4 ? 'En revisión' : 'Disponible';
  const pillCls = status === 'Disponible' ? 'pill-green' : 'pill-amber';
  const mes = mesesFull[idx];
  return `
    <div class="month-panel-head">
      <div>
        <div class="month-panel-title">Informe Mensual — ${mes} 2026</div>
        <div class="month-panel-sub">${s.name} · Emitido el ${datesISO[idx]}</div>
      </div>
      <span class="pill ${pillCls}">${status}</span>
    </div>
    <div class="month-panel-actions">
      <button class="rep-btn" onclick="alert('Vista previa: ${mes} 2026 — ${sName}')" type="button">👁 Ver detalle</button>
      <button class="rep-btn primary" onclick="alert('Descargando: Informe ${mes} 2026 — ${sName}.pdf')" type="button">⬇ Descargar PDF</button>
    </div>
  `;
}

function drawSectorCharts(s, idx){
  destroyCharts();
  const dotPointColors = [0,1,2,3,4].map(i => i===idx ? '#1E40AF' : s.color);
  const dotPointRadii  = [0,1,2,3,4].map(i => i===idx ? 7 : 3.5);
  makeChart('sc-evol', {
    type:'line',
    data:{labels:meses,datasets:[{
      data:s.dotacion,
      borderColor:s.color,
      backgroundColor:s.color+'33',
      tension:.4, fill:true,
      pointRadius: dotPointRadii,
      pointBackgroundColor: dotPointColors,
      pointBorderColor: dotPointColors,
      pointBorderWidth: 2
    }]},
    options:mkOpt()
  });
  const ausColors = [0,1,2,3,4].map(i => i===idx ? '#1E40AF' : s.color);
  makeChart('sc-aus', {
    type:'bar',
    data:{labels:meses,datasets:[{data:s.ausData,backgroundColor:ausColors,borderRadius:6}]},
    options:mkOpt()
  });
  const hsColors = [0,1,2,3,4].map(i => i===idx ? '#1E40AF' : '#93C5FD');
  makeChart('sc-hs', {
    type:'bar',
    data:{labels:meses,datasets:[{data:s.hsExtras,backgroundColor:hsColors,borderRadius:6}]},
    options:mkOpt()
  });
  makeChart('sc-acc', {
    type:'doughnut',
    data:{
      labels:Object.keys(s.accTipo),
      datasets:[{data:Object.values(s.accTipo),backgroundColor:['#60A5FA','#A5B4FC','#7DD3FC']}]
    },
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10},color:'#475569'}}}}
  });
}

window.selectMonth = function(btn, idx){
  const tabs = btn.parentElement;
  tabs.querySelectorAll('.month-btn').forEach(b=>b.classList.toggle('active', b===btn));
  if(_currentSector){
    const s = SECTORS[_currentSector];
    const kpiEl = document.getElementById('sector-kpis');
    if(kpiEl) kpiEl.innerHTML = sectorKpis(s, idx);
    const detailEl = document.getElementById('month-detail');
    if(detailEl) detailEl.innerHTML = monthDetailHtml(s, idx);
    drawSectorCharts(s, idx);
  }
};

function renderSector(key){
  const s = SECTORS[key];
  _currentSector = key;
  const initialIdx = 4;
  const html = `
    <div class="sector-hero" style="background:${s.gradient}">
      <div class="sector-hero-left">
        <div class="sector-hero-icon${(key==='sabores'||key==='extremas')?' brand':''}">${ICONS[key] || s.emoji}</div>
        <div class="sector-hero-text">
          <div class="sector-hero-crumbs">Panel ejecutivo › Unidades</div>
          <h2>${s.name}</h2>
          <p>${s.desc} · ${mesesFull[initialIdx]} 2026</p>
        </div>
      </div>
      <div class="sector-badges">
        <span class="sector-badge">${s.empleados} empleados</span>
        <span class="sector-badge">${s.accidentes} accidentes YTD</span>
      </div>
    </div>

    <div class="section-title">Informe mensual — elegí un mes</div>
    ${monthTabsHtml(initialIdx)}

    <div class="kpi-grid" id="sector-kpis">
      ${sectorKpis(s, initialIdx)}
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Evolución Dotación — ${s.name}</div>
        <div class="chart-sub">Ene–May 2026 · resaltado el mes activo</div>
        <canvas id="sc-evol"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Ausentismo Mensual</div>
        <div class="chart-sub">% por mes</div>
        <canvas id="sc-aus"></canvas>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Horas Extras</div>
        <div class="chart-sub">Horas liquidadas por mes</div>
        <canvas id="sc-hs"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Accidentes por Tipo (YTD)</div>
        <div class="chart-sub">Distribución acumulada</div>
        <canvas id="sc-acc"></canvas>
      </div>
    </div>

    <div class="month-panel active" id="month-detail" style="margin-bottom:20px">
      ${monthDetailHtml(s, initialIdx)}
    </div>

    <div class="section-title">Últimos accidentes — ${s.name}</div>
    <div class="stat-card" style="margin-bottom:16px">
      <table class="tbl">
        <thead><tr><th>Empleado</th><th>Sector</th><th>Fecha</th><th>Estado</th><th>Días caídos</th><th>Tipo</th></tr></thead>
        <tbody>
          ${s.ultimos.map(u=>`<tr>
            <td><strong>${u.emp}</strong></td>
            <td>${u.sec}</td>
            <td>${u.fecha}</td>
            <td>${u.estado}</td>
            <td><strong>${u.dias} días</strong></td>
            <td><span class="pill ${u.tipo==='ALTA'?'pill-green':'pill-red'}">${u.tipo}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <button class="back-btn" onclick="go('index')">← Volver al panel</button>
  `;
  document.getElementById('content').innerHTML = html;
  drawSectorCharts(s, initialIdx);
}

// ============================================================
// VIEW: Judiciales
// ============================================================
function renderJudiciales(){
  const filas = [
    { caratula:'PEREZ c/ Empresa s/ Despido', unidad:'Extremas', monto:'$ 4.200.000', estado:'En instrucción', riesgo:'ALTO' },
    { caratula:'LOPEZ c/ Empresa s/ Acc. laboral', unidad:'Fábrica', monto:'$ 6.800.000', estado:'Pericial médica', riesgo:'ALTO' },
    { caratula:'GIMENEZ c/ Empresa s/ Diferencias salariales', unidad:'Sabores', monto:'$ 1.150.000', estado:'Audiencia', riesgo:'MEDIO' },
    { caratula:'SOSA c/ Empresa s/ Despido', unidad:'Extremas', monto:'$ 2.300.000', estado:'Conciliación', riesgo:'BAJO' },
    { caratula:'FERNANDEZ c/ Empresa s/ Acc. laboral', unidad:'Staff', monto:'$ 800.000', estado:'Conciliación', riesgo:'BAJO' }
  ];
  const html = `
    <div class="page-header">
      <div class="greeting">Gestión</div>
      <div class="page-title">⚖️ Informes Judiciales</div>
      <div class="page-sub">Causas activas y contingencias económicas — Mayo 2026</div>
    </div>
    <div class="kpi-grid">
      ${kpiCard('blue','Causas activas','27','▲ 2','down','vs. mes anterior','⚖️')}
      ${kpiCard('slate','Contingencia total','$ 38.4M','▲ 5.2%','down','vs. mes anterior','💰')}
      ${kpiCard('indigo','Riesgo alto','9','= 0','neutral','vs. mes anterior','🔥')}
      ${kpiCard('sky','Cerradas en 2026','11','▲ 4','up','vs. 2025','✅')}
    </div>
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Causas por Unidad</div>
        <div class="chart-sub">Distribución actual</div>
        <canvas id="j-uni"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Evolución de causas</div>
        <div class="chart-sub">Activas vs. cerradas — 2026</div>
        <canvas id="j-evo"></canvas>
      </div>
    </div>
    <div class="section-title">Causas destacadas</div>
    <div class="stat-card">
      <table class="tbl">
        <thead><tr><th>Carátula</th><th>Unidad</th><th>Monto reclamado</th><th>Estado</th><th>Riesgo</th></tr></thead>
        <tbody>
          ${filas.map(f=>`<tr>
            <td><strong>${f.caratula}</strong></td>
            <td>${f.unidad}</td>
            <td>${f.monto}</td>
            <td>${f.estado}</td>
            <td><span class="pill ${f.riesgo==='ALTO'?'pill-red':f.riesgo==='MEDIO'?'pill-amber':'pill-green'}">${f.riesgo}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('content').innerHTML = html;
  makeChart('j-uni',{
    type:'doughnut',
    data:{labels:['Sabores','Extremas','Staff','Fábrica'],datasets:[{data:[6,11,3,7],backgroundColor:[SECTORS.sabores.color,SECTORS.extremas.color,SECTORS.staff.color,SECTORS.fabrica.color]}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10},color:'#475569'}}}}
  });
  makeChart('j-evo',{
    type:'line',
    data:{labels:meses,datasets:[
      {label:'Activas',data:[22,24,25,26,27],borderColor:'#818CF8',backgroundColor:'#818CF8',tension:.4,fill:false},
      {label:'Cerradas',data:[2,4,6,9,11],borderColor:'#38BDF8',backgroundColor:'#38BDF8',tension:.4,fill:false}
    ]},
    options:{...mkOpt(),plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12,color:'#475569'}}}}
  });
}

// ============================================================
// VIEW: Inspecciones
// ============================================================
function renderInspecciones(){
  const filas = [
    { fecha:'15 May 2026', org:'Ministerio de Trabajo', unidad:'Fábrica', resultado:'Observaciones menores', estado:'En descargo' },
    { fecha:'08 May 2026', org:'Municipal', unidad:'Sabores - Local 12', resultado:'Conforme', estado:'Cerrada' },
    { fecha:'22 Abr 2026', org:'SRT', unidad:'Extremas', resultado:'2 observaciones', estado:'Regularizada' },
    { fecha:'05 Abr 2026', org:'AFIP', unidad:'Staff', resultado:'Conforme', estado:'Cerrada' },
    { fecha:'18 Mar 2026', org:'Ministerio de Trabajo', unidad:'Sabores - Local 04', resultado:'Multa', estado:'Apelada' }
  ];
  const html = `
    <div class="page-header">
      <div class="greeting">Gestión</div>
      <div class="page-title">🔍 Inspecciones</div>
      <div class="page-sub">Visitas regulatorias y resultados — 2026</div>
    </div>
    <div class="kpi-grid">
      ${kpiCard('blue','Inspecciones YTD','23','▲ 5','neutral','vs. 2025','🔍')}
      ${kpiCard('sky','Conformes','15','65%','up','del total','✓')}
      ${kpiCard('indigo','Con observaciones','6','26%','neutral','del total','⚠')}
      ${kpiCard('slate','Con multa','2','9%','down','del total','✕')}
    </div>
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Inspecciones por mes</div>
        <div class="chart-sub">Ene–May 2026</div>
        <canvas id="i-mes"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Por Organismo</div>
        <div class="chart-sub">Distribución YTD</div>
        <canvas id="i-org"></canvas>
      </div>
    </div>
    <div class="section-title">Últimas inspecciones</div>
    <div class="stat-card">
      <table class="tbl">
        <thead><tr><th>Fecha</th><th>Organismo</th><th>Unidad</th><th>Resultado</th><th>Estado</th></tr></thead>
        <tbody>
          ${filas.map(f=>{
            const pill = f.estado==='Cerrada' ? 'pill-green' : f.estado==='Apelada' ? 'pill-red' : 'pill-amber';
            return `<tr>
              <td>${f.fecha}</td><td>${f.org}</td><td>${f.unidad}</td><td>${f.resultado}</td>
              <td><span class="pill ${pill}">${f.estado}</span></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('content').innerHTML = html;
  makeChart('i-mes',{
    type:'bar',
    data:{labels:meses,datasets:[
      {label:'Conformes',data:[3,3,4,3,2],backgroundColor:'#60A5FA',borderRadius:4,stack:'a'},
      {label:'Observaciones',data:[1,1,2,1,1],backgroundColor:'#A5B4FC',borderRadius:4,stack:'a'},
      {label:'Multas',data:[0,0,1,0,1],backgroundColor:'#94A3B8',borderRadius:4,stack:'a'}
    ]},
    options:{...mkOpt(),plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12,color:'#475569'}}},scales:{x:{stacked:true,grid:{display:false},ticks:{font:{size:10},color:'#94A3B8'}},y:{stacked:true,grid:{color:'#F1F5F9'},ticks:{font:{size:10},color:'#94A3B8'}}}}
  });
  makeChart('i-org',{
    type:'doughnut',
    data:{labels:['Min. Trabajo','Municipal','SRT','AFIP','Otros'],datasets:[{data:[8,7,4,3,1],backgroundColor:PASTEL_PALETTE}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10},color:'#475569'}}}}
  });
}

// ============================================================
// VIEW: Accidentabilidad
// ============================================================
function renderAccidentabilidad(){
  const html = `
    <div class="page-header">
      <div class="greeting">Gestión</div>
      <div class="page-title">⚠️ Accidentabilidad</div>
      <div class="page-sub">Eventos, días caídos e índices — Mayo 2026</div>
    </div>
    <div class="kpi-grid">
      ${kpiCard('slate','Accidentes YTD','14','▼ 3','up','vs. 2025','⚠️')}
      ${kpiCard('sky','Días caídos','312','▼ 48','up','vs. 2025','📅')}
      ${kpiCard('blue','Índice incidencia','11.2','▼ 1.4','up','por 1000 empl.','📊')}
      ${kpiCard('indigo','Costo estimado','$ 18.6M','▼ 6%','up','vs. 2025','💰')}
    </div>
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Accidentes por Unidad</div>
        <div class="chart-sub">YTD 2026</div>
        <canvas id="a-uni"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Eventos por mes</div>
        <div class="chart-sub">Laboral vs In Itinere</div>
        <canvas id="a-mes"></canvas>
      </div>
    </div>
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Tipo de Lesión</div>
        <div class="chart-sub">Distribución YTD</div>
        <canvas id="a-tipo"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Días caídos por mes</div>
        <div class="chart-sub">2026</div>
        <canvas id="a-dias"></canvas>
      </div>
    </div>
  `;
  document.getElementById('content').innerHTML = html;
  makeChart('a-uni',{
    type:'bar',
    data:{labels:['Sabores','Extremas','Staff','Fábrica'],datasets:[{data:[4,6,1,3],backgroundColor:[SECTORS.sabores.color,SECTORS.extremas.color,SECTORS.staff.color,SECTORS.fabrica.color],borderRadius:6}]},
    options:mkOpt()
  });
  makeChart('a-mes',{
    type:'bar',
    data:{labels:meses,datasets:[
      {label:'Laboral',data:[2,2,3,2,2],backgroundColor:'#60A5FA',borderRadius:4,stack:'a'},
      {label:'In Itinere',data:[1,0,1,1,0],backgroundColor:'#A5B4FC',borderRadius:4,stack:'a'}
    ]},
    options:{...mkOpt(),plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12,color:'#475569'}}},scales:{x:{stacked:true,grid:{display:false},ticks:{font:{size:10},color:'#94A3B8'}},y:{stacked:true,grid:{color:'#F1F5F9'},ticks:{font:{size:10},color:'#94A3B8'}}}}
  });
  makeChart('a-tipo',{
    type:'doughnut',
    data:{labels:['Golpes / contusión','Caída','Esfuerzo','Corte','Quemadura'],datasets:[{data:[5,3,3,2,1],backgroundColor:PASTEL_PALETTE}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10},color:'#475569'}}}}
  });
  makeChart('a-dias',{
    type:'line',
    data:{labels:meses,datasets:[{data:[68,52,84,61,47],borderColor:'#818CF8',backgroundColor:'rgba(129,140,248,.18)',tension:.4,fill:true,pointRadius:3}]},
    options:mkOpt()
  });
}

// ============================================================
// VIEW: Rotación
// ============================================================
function renderRotacion(){
  const filas = [
    { uni:'Sabores Express', altas:14, bajas:12, neto:'+2', rot:'5.8%', motivo:'Renuncia voluntaria' },
    { uni:'Extremas', altas:9, bajas:14, neto:'-5', rot:'7.2%', motivo:'Condiciones de trabajo' },
    { uni:'Staff Corporativo', altas:4, bajas:3, neto:'+1', rot:'4.1%', motivo:'Oportunidad externa' },
    { uni:'Fábrica', altas:6, bajas:8, neto:'-2', rot:'8.5%', motivo:'Renuncia voluntaria' }
  ];
  const html = `
    <div class="page-header">
      <div class="greeting">Gestión</div>
      <div class="page-title">🔄 Rotación</div>
      <div class="page-sub">Altas, bajas y motivos — Mayo 2026</div>
    </div>
    <div class="kpi-grid">
      ${kpiCard('blue','Altas mes','33','▲ 4','up','vs. mes anterior','➕')}
      ${kpiCard('slate','Bajas mes','37','▲ 6','down','vs. mes anterior','➖')}
      ${kpiCard('indigo','Rotación global','6.2%','▲ 1.1%','down','vs. mes anterior','🔄')}
      ${kpiCard('sky','Antigüedad prom.','3.8 años','= 0','neutral','vs. mes anterior','⏱')}
    </div>
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Rotación por Unidad</div>
        <div class="chart-sub">% mensual</div>
        <canvas id="r-uni"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Altas vs Bajas</div>
        <div class="chart-sub">Ene–May 2026</div>
        <canvas id="r-ab"></canvas>
      </div>
    </div>
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Motivos de Baja</div>
        <div class="chart-sub">YTD 2026</div>
        <canvas id="r-mot"></canvas>
      </div>
      <div class="chart-card">
        <div class="chart-title">Rotación global mensual</div>
        <div class="chart-sub">%</div>
        <canvas id="r-glob"></canvas>
      </div>
    </div>
    <div class="section-title">Movimiento por unidad</div>
    <div class="stat-card">
      <table class="tbl">
        <thead><tr><th>Unidad</th><th>Altas</th><th>Bajas</th><th>Neto</th><th>Rotación</th><th>Motivo principal</th></tr></thead>
        <tbody>
          ${filas.map(f=>`<tr>
            <td><strong>${f.uni}</strong></td>
            <td>${f.altas}</td><td>${f.bajas}</td>
            <td><span class="pill ${f.neto.startsWith('+')?'pill-green':'pill-red'}">${f.neto}</span></td>
            <td>${f.rot}</td><td>${f.motivo}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('content').innerHTML = html;
  makeChart('r-uni',{
    type:'bar',
    data:{labels:['Sabores','Extremas','Staff','Fábrica'],datasets:[{data:[5.8,7.2,4.1,8.5],backgroundColor:[SECTORS.sabores.color,SECTORS.extremas.color,SECTORS.staff.color,SECTORS.fabrica.color],borderRadius:6}]},
    options:mkOpt()
  });
  makeChart('r-ab',{
    type:'bar',
    data:{labels:meses,datasets:[
      {label:'Altas',data:[28,31,29,29,33],backgroundColor:'#60A5FA',borderRadius:4},
      {label:'Bajas',data:[24,28,31,31,37],backgroundColor:'#94A3B8',borderRadius:4}
    ]},
    options:{...mkOpt(),plugins:{legend:{display:true,position:'bottom',labels:{font:{size:10},boxWidth:12,color:'#475569'}}}}
  });
  makeChart('r-mot',{
    type:'doughnut',
    data:{labels:['Renuncia voluntaria','Condiciones de trabajo','Oportunidad externa','Despido','Jubilación','Otros'],datasets:[{data:[62,18,9,6,3,2],backgroundColor:PASTEL_PALETTE}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:10},color:'#475569'}}}}
  });
  makeChart('r-glob',{
    type:'line',
    data:{labels:meses,datasets:[{data:[4.8,5.1,5.6,5.1,6.2],borderColor:'#818CF8',backgroundColor:'rgba(129,140,248,.18)',tension:.4,fill:true,pointRadius:3}]},
    options:mkOpt()
  });
}

// ============================================================
// INYECTAR ICONS en sidebar nav
// ============================================================
document.querySelectorAll('[data-icon]').forEach(el=>{
  const k = el.dataset.icon;
  if(ICONS[k]) el.innerHTML = ICONS[k];
});

// ============================================================
// INIT
// ============================================================
go('index');
