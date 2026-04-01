// ================================
// ESTADO GLOBAL
// ================================
let usuarioActual = null;
let pronosticos = {};
let faseActual = 'grupos';
let resultadosReales = {};
let pronMapElim = {};



// ================================
// AUTH
// ================================
function switchTab(tab) {
  document.getElementById('tab-registro').style.display = tab === 'registro' ? 'block' : 'none';
  document.getElementById('tab-login').style.display = tab === 'login' ? 'block' : 'none';
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', (i === 0 && tab === 'registro') || (i === 1 && tab === 'login'));
  });
}

async function registrarse() {
  const nombre = document.getElementById('reg-nombre').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errorEl = document.getElementById('login-error');

  if (!nombre || !email || !password) {
    errorEl.textContent = 'Completá todos los campos';
    return;
  }

  // Crear auth en Supabase
  const { data: authData, error: authError } = await db.auth.signUp({ email, password });
  if (authError) { errorEl.textContent = authError.message; return; }

  // Guardar nombre en tabla usuarios
  const { error: dbError } = await db.from('usuarios').insert({
    id: authData.user.id,
    nombre,
    email
  });

  if (dbError) { errorEl.textContent = dbError.message; return; }

  usuarioActual = { id: authData.user.id, nombre, email };
  mostrarApp();
}

async function iniciarSesion() {
  const email = document.getElementById('log-email').value.trim();
  const password = document.getElementById('log-password').value;
  const errorEl = document.getElementById('login-error');

  const { data: authData, error: authError } = await db.auth.signInWithPassword({ email, password });
  if (authError) { errorEl.textContent = 'Email o contraseña incorrectos'; return; }

  // Buscar nombre del usuario
  const { data: userData } = await db.from('usuarios').select('*').eq('id', authData.user.id).single();
  usuarioActual = { id: authData.user.id, nombre: userData.nombre, email };
  await cargarPronosticos();
  mostrarApp();
}

async function checkSesion() {
  const { data: { session } } = await db.auth.getSession();
  if (session) {
    const { data: userData } = await db.from('usuarios').select('*').eq('id', session.user.id).single();
    if (userData) {
      usuarioActual = { id: session.user.id, nombre: userData.nombre, email: session.user.email };
      await cargarPronosticos();
      mostrarApp();
    }
  }
}

async function mostrarApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('main-header').classList.add('header-chico');
  await actualizarPuntajeHeader();
  render();
  renderMisGrupos();
}

async function actualizarPuntajeHeader() {
  const total = await getPuntajeUsuario(usuarioActual.id);
  console.log('Puntos calculados:', total);
  usuarioActual.puntos = total;
}
// ================================
// PRONÓSTICOS
// ================================
async function cargarPronosticos() {
  const { data } = await db.from('pronosticos')
    .select('*')
    .eq('usuario_id', usuarioActual.id);

  pronosticos = {};
  if (data) {
    data.forEach(p => {
      pronosticos[p.partido_id] = {
        golesLocal: p.goles_local,
        golesVisitante: p.goles_visitante
      };
    });
  }

  // Cargar resultados reales también
  const { data: resultados } = await db.from('resultados').select('*');
  resultadosReales = {};
  if (resultados) {
    resultados.forEach(r => {
      resultadosReales[r.partido_id] = {
        golesLocal: r.goles_local,
        golesVisitante: r.goles_visitante
      };
    });
  }
}

async function actualizarPronostico(partidoId, campo, valor) {
  if (!pronosticos[partidoId]) pronosticos[partidoId] = { golesLocal: '', golesVisitante: '' };
  pronosticos[partidoId][campo] = valor;

  const gl = campo === 'golesLocal' ? valor : pronosticos[partidoId].golesLocal;
  const gv = campo === 'golesVisitante' ? valor : pronosticos[partidoId].golesVisitante;

  await db.from('pronosticos').upsert({
    usuario_id: usuarioActual.id,
    partido_id: partidoId,
    goles_local: gl === '' ? null : parseInt(gl),
    goles_visitante: gv === '' ? null : parseInt(gv),
    updated_at: new Date().toISOString()
  }, { onConflict: 'usuario_id,partido_id' });

  await render();
  await renderMisGrupos();
}

// ================================
// HELPERS
// ================================
function getSeleccion(id) {
  return SELECCIONES.find(s => s.id === id);
}

function getPartidosGrupo(grupo) {
  return PARTIDOS.filter(p => p.grupo === grupo);
}

function getSeleccionesGrupo(grupo) {
  return SELECCIONES.filter(s => s.grupo === grupo);
}

function calcularTabla(grupo) {
  const selecciones = getSeleccionesGrupo(grupo);
  const tabla = {};
  selecciones.forEach(s => {
    tabla[s.id] = { id: s.id, pts: 0, gf: 0, gc: 0, dg: 0, pj: 0 };
  });

  getPartidosGrupo(grupo).forEach(p => {
    const pron = pronosticos[p.id];
    if (!pron || pron.golesLocal === '' || pron.golesVisitante === '') return;
    const gl = parseInt(pron.golesLocal);
    const gv = parseInt(pron.golesVisitante);
    tabla[p.local].pj++; tabla[p.visitante].pj++;
    tabla[p.local].gf += gl; tabla[p.local].gc += gv;
    tabla[p.visitante].gf += gv; tabla[p.visitante].gc += gl;
    if (gl > gv) { tabla[p.local].pts += 3; }
    else if (gl < gv) { tabla[p.visitante].pts += 3; }
    else { tabla[p.local].pts += 1; tabla[p.visitante].pts += 1; }
  });

  Object.values(tabla).forEach(t => t.dg = t.gf - t.gc);
  return Object.values(tabla).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
}

function gruposCompletos() {
  return true; // TODO: sacar esto antes de lanzar
}

function toggleGrupos() {
  const body = document.getElementById('grupos-privados-body');
  const icon = document.getElementById('grupos-toggle-icon');
  if (body.style.display === 'none') {
    body.style.display = 'block';
    icon.textContent = '▲';
    renderMisGrupos();
  } else {
    body.style.display = 'none';
    icon.textContent = '▼';
  }
}

async function renderEliminatorios(fase, titulo) {
  const app = document.getElementById('app');

  // Traer partidos eliminatorios de esta fase
  const { data: partidos } = await db.from('partidos_eliminatorios')
    .select('*')
    .eq('fase', fase)
    .order('posicion');

  // Traer pronósticos del usuario para esta fase
  const { data: pronEliminatorios } = await db.from('pronosticos_eliminatorios')
    .select('*')
    .eq('usuario_id', usuarioActual.id);

pronMapElim = {};
pronEliminatorios?.forEach(p => {
  pronMapElim[p.partido_id] = p.ganador;
  pronMapElim[p.partido_id + '_gl'] = p.goles_local;
  pronMapElim[p.partido_id + '_gv'] = p.goles_visitante;
});

  const faseTabs = await renderFaseTabs();

  let html = `
    <div class="top-bar">
      <span class="usuario-saludo">👋 Hola, <strong>${usuarioActual.nombre}</strong> · <span class="puntaje-header">⭐ ${usuarioActual.puntos !== undefined ? usuarioActual.puntos : 0} pts</span></span>
      <div style="display:flex;gap:8px">
        <a href="ranking.html" class="btn-cerrar">🏆 Ranking</a>
        <button class="btn-cerrar" onclick="cerrarSesion()">Salir</button>
      </div>
    </div>

    <div class="grupos-privados-section">
  <div class="grupos-privados-header" onclick="toggleGrupos()">
    <span class="grupos-privados-titulo">👥 Mis grupos</span>
    <span id="grupos-toggle-icon">▼</span>
  </div>
  <div id="grupos-privados-body" style="display:none">
    <div class="grupos-privados-acciones">
      <button class="btn-grupo" onclick="crearGrupoPrivado()">➕ Crear grupo</button>
      <button class="btn-grupo btn-grupo-secundario" onclick="unirseAGrupo()">🔑 Unirme a un grupo</button>
    </div>
    <div id="mis-grupos"></div>
  </div>
</div>
    ${faseTabs}
<div class="grupo-activo">
      <div class="grupo-activo-header">
        <h3 class="grupo-titulo">${titulo}</h3>
      </div>
      <div class="grupo-activo-body">
        <div class="eliminatorios-grid">
          ${partidos && partidos.length > 0 ? partidos.map(p => {
            const local = getSeleccion(p.equipo_local);
            const visitante = getSeleccion(p.equipo_visitante);
            if (!local || !visitante) return '';
            return `
              <div class="eliminatorio-card" data-partido="${p.id}">
                <div class="elim-partido-num">Partido ${p.posicion}</div>
                <div class="elim-equipos">
                  <div class="elim-equipo ${pronMapElim[p.id] === local.id ? 'ganador-elegido' : ''}" data-equipo="${local.id}">
                    <div class="elim-img-container">
                      ${local.imagen
                        ? `<img src="${local.imagen}" class="elim-img">`
                        : `<div class="elim-emoji">${local.bandera}</div>`
                      }
                    </div>
                    <div class="elim-nombre">${local.personaje !== 'TU PERSONAJE' ? local.personaje : local.nombre}</div>
                    ${local.personaje !== 'TU PERSONAJE' ? `<div class="elim-pais">${local.nombre}</div>` : ''}
                    ${pronMapElim[p.id] === local.id ? '<div class="elim-winner-badge">✅ Ganador</div>' : ''}
                  </div>

                  <div class="elim-centro">
                    <div class="partido-card-inputs">
                      <input type="number" min="0" max="20"
                        value="${pronMapElim[p.id + '_gl'] !== undefined && pronMapElim[p.id + '_gl'] !== null ? pronMapElim[p.id + '_gl'] : ''}"
                        onchange="actualizarPronosticoElim('${p.id}', '${local.id}', '${visitante.id}', 'gl', this.value)"
                        class="goles-input">
                      <span class="elim-vs">-</span>
                      <input type="number" min="0" max="20"
                        value="${pronMapElim[p.id + '_gv'] !== undefined && pronMapElim[p.id + '_gv'] !== null ? pronMapElim[p.id + '_gv'] : ''}"
                        onchange="actualizarPronosticoElim('${p.id}', '${local.id}', '${visitante.id}', 'gv', this.value)"
                        class="goles-input">
                    </div>
                  </div>

                  <div class="elim-equipo ${pronMapElim[p.id] === visitante.id ? 'ganador-elegido' : ''}" data-equipo="${visitante.id}">
                    <div class="elim-img-container">
                      ${visitante.imagen
                        ? `<img src="${visitante.imagen}" class="elim-img">`
                        : `<div class="elim-emoji">${visitante.bandera}</div>`
                      }
                    </div>
                    <div class="elim-nombre">${visitante.personaje !== 'TU PERSONAJE' ? visitante.personaje : visitante.nombre}</div>
                    ${visitante.personaje !== 'TU PERSONAJE' ? `<div class="elim-pais">${visitante.nombre}</div>` : ''}
                    ${pronMapElim[p.id] === visitante.id ? '<div class="elim-winner-badge">✅ Ganador</div>' : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('') : '<p class="sin-partidos">Los cruces se generan cuando el admin habilita esta fase.</p>'}
        </div>
      </div>
    </div>
  `;

  app.innerHTML = html;
  renderMisGrupos();
}

async function actualizarPronosticoElim(partidoId, localId, visitanteId, campo, valor) {
  const gl = campo === 'gl' ? parseInt(valor) : (pronMapElim[partidoId + '_gl'] ?? null);
  const gv = campo === 'gv' ? parseInt(valor) : (pronMapElim[partidoId + '_gv'] ?? null);

  // Actualizar estado local sin rerenderizar
  pronMapElim[partidoId + '_' + campo] = parseInt(valor);

  let ganador = null;
  if (gl !== null && gv !== null && !isNaN(gl) && !isNaN(gv)) {
    if (gl > gv) ganador = localId;
    else if (gv > gl) ganador = visitanteId;
  }

  pronMapElim[partidoId] = ganador;

  // Actualizar el badge de ganador en el DOM sin rerenderizar todo
  const card = document.querySelector(`[data-partido="${partidoId}"]`);
  if (card) {
    card.querySelectorAll('.elim-equipo').forEach(el => el.classList.remove('ganador-elegido'));
    card.querySelectorAll('.elim-winner-badge').forEach(el => el.remove());
    if (ganador) {
      const ganadorEl = card.querySelector(`[data-equipo="${ganador}"]`);
      if (ganadorEl) {
        ganadorEl.classList.add('ganador-elegido');
        ganadorEl.insertAdjacentHTML('beforeend', '<div class="elim-winner-badge">✅ Ganador</div>');
      }
    }
  }

  // Guardar en Supabase en segundo plano
  db.from('pronosticos_eliminatorios').upsert({
    usuario_id: usuarioActual.id,
    partido_id: partidoId,
    ganador: ganador,
    goles_local: isNaN(gl) ? null : gl,
    goles_visitante: isNaN(gv) ? null : gv,
    updated_at: new Date().toISOString()
  }, { onConflict: 'usuario_id,partido_id' });
}


// ================================
// RENDER
// ================================
async function render() {
  await actualizarPuntajeHeader();
  if (faseActual === 'grupos') renderGrupos();
  else if (faseActual === 'dieciseisavos') renderEliminatorios('dieciseisavos', '16avos de Final');
}


// ================================
// GRUPOS PRIVADOS
// ================================
function generarCodigo() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function crearGrupoPrivado() {
  const nombre = prompt('¿Cómo se llama tu grupo? (ej: "Los Pibes del trabajo")');
  if (!nombre) return;

  const codigo = generarCodigo();

  const { data, error } = await db.from('grupos_prode').insert({
    nombre,
    codigo,
    creador_id: usuarioActual.id
  }).select().single();

  if (error) { alert('Error al crear el grupo'); return; }

  // Unirse automáticamente como miembro
  await db.from('grupo_miembros').insert({
    grupo_id: data.id,
    usuario_id: usuarioActual.id
  });

  alert(`✅ Grupo "${nombre}" creado!\n\nCódigo para compartir: ${codigo}\n\nMandáselo a tus amigos por WhatsApp.`);
  renderMisGrupos();
}

async function unirseAGrupo() {
  const codigo = prompt('Ingresá el código del grupo:');
  if (!codigo) return;

  const { data: grupo, error } = await db.from('grupos_prode')
    .select('*')
    .eq('codigo', codigo.toUpperCase())
    .single();

  if (error || !grupo) { alert('Código incorrecto. Fijate bien.'); return; }

  const { error: memberError } = await db.from('grupo_miembros').insert({
    grupo_id: grupo.id,
    usuario_id: usuarioActual.id
  });

  if (memberError) { alert('Ya sos miembro de este grupo.'); return; }

  alert(`✅ Te uniste a "${grupo.nombre}"!`);
  renderMisGrupos();
}

async function renderMisGrupos() {
  const container = document.getElementById('mis-grupos');
  if (!container) return;
   const body = document.getElementById('grupos-privados-body');
  const estaAbierto = body && body.style.display !== 'none';
  if (!estaAbierto) return;
  const { data: membresias } = await db.from('grupo_miembros')
    .select('grupo_id')
    .eq('usuario_id', usuarioActual.id);

  if (!membresias || membresias.length === 0) {
    container.innerHTML = `<p class="sin-grupos">Todavía no estás en ningún grupo.</p>`;
    return;
  }

  const grupoIds = membresias.map(m => m.grupo_id);
  const { data: grupos } = await db.from('grupos_prode')
    .select('*')
    .in('id', grupoIds);

  let html = '';

  for (const grupo of grupos) {
    const ranking = await getRankingGrupo(grupo.id);
    const miPosicion = ranking.findIndex(r => r.id === usuarioActual.id) + 1;

    html += `
      <div class="grupo-privado">
        <div class="grupo-privado-header">
          <span class="grupo-privado-nombre">${grupo.nombre}</span>
          <span class="grupo-privado-codigo">🔑 ${grupo.codigo}</span>
        </div>

        <div class="ranking-grupo">
          ${ranking.map((r, i) => `
            <div class="ranking-fila ${r.id === usuarioActual.id ? 'ranking-yo' : ''}">
              <span class="ranking-pos">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}°`}</span>
              <span class="ranking-nombre">${r.nombre} ${r.id === usuarioActual.id ? '(vos)' : ''}</span>
              <span class="ranking-puntos">${r.puntos} pts</span>
            </div>
          `).join('')}
        </div>

        ${ranking.length === 1 ? `
          <p class="invitar-amigos">📲 Compartí el código <strong>${grupo.codigo}</strong> con tus amigos</p>
        ` : ''}
      </div>
    `;
  }

  container.innerHTML = html;
}
async function renderFaseTabs() {
  const { data: fases } = await db.from('fases').select('*');
  if (!fases) return '';

  const orden = [
    { id: 'grupos', label: '⚽ Grupos' },
    { id: 'dieciseisavos', label: '🏆 16avos' },
    { id: 'octavos', label: '⚔️ Octavos' },
    { id: 'cuartos', label: '🎯 Cuartos' },
    { id: 'semifinales', label: '🔥 Semis' },
    { id: 'final', label: '👑 Final' },
  ];

  const fasesMap = {};
  fases.forEach(f => fasesMap[f.id] = f);

  return `
    <div class="fases-tabs">
      ${orden.map(f => {
        const habilitada = fasesMap[f.id]?.habilitada;
        const activa = faseActual === f.id;
        return `
          <button
            class="fase-tab ${activa ? 'active' : ''} ${!habilitada ? 'deshabilitado' : ''}"
            onclick="${habilitada ? `cambiarFase('${f.id}')` : 'void(0)'}">
            ${f.label}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function cambiarFase(fase) {
  faseActual = fase;
  window.grupoActivo = null;
  render();
}

async function renderGrupos() {
  const app = document.getElementById('app');
  const grupos = [...new Set(SELECCIONES.map(s => s.grupo))].sort();
  const grupoActivo = window.grupoActivo || grupos[0];
  const partidos = getPartidosGrupo(grupoActivo);
  const tabla = calcularTabla(grupoActivo);
  const completados = partidos.filter(p => {
    const pron = pronosticos[p.id];
    return pron && pron.golesLocal !== null && pron.golesLocal !== '' &&
           pron.golesVisitante !== null && pron.golesVisitante !== '';
  }).length;
  let html = `
    <div class="top-bar">
      <span class="usuario-saludo">👋 Hola, <strong>${usuarioActual.nombre}</strong> · <span class="puntaje-header">⭐ ${usuarioActual.puntos !== undefined ? usuarioActual.puntos : 0} pts</span></span>
      <div style="display:flex;gap:8px">
        <a href="ranking.html" class="btn-cerrar">🏆 Ranking</a>
        <button class="btn-cerrar" onclick="cerrarSesion()">Salir</button>
      </div>
    </div>

   <div class="grupos-privados-section">
  <div class="grupos-privados-header" onclick="toggleGrupos()">
    <span class="grupos-privados-titulo">👥 Mis grupos</span>
    <span id="grupos-toggle-icon">▼</span>
  </div>
  <div id="grupos-privados-body" style="display:none">
    <div class="grupos-privados-acciones">
      <button class="btn-grupo" onclick="crearGrupoPrivado()">➕ Crear grupo</button>
      <button class="btn-grupo btn-grupo-secundario" onclick="unirseAGrupo()">🔑 Unirme a un grupo</button>
    </div>
    <div id="mis-grupos"></div>
  </div>
</div>

    ${await renderFaseTabs()}

    <div class="fase-header">
      <h2 class="fase-titulo">⚽ Fase de Grupos</h2>
      <p class="fase-subtitulo">Completá todos los partidos para avanzar</p>
    </div>

    <div class="grupos-tabs">
      ${grupos.map(g => `
        <button class="grupo-tab ${g === grupoActivo ? 'active' : ''}" onclick="cambiarGrupo('${g}')">
          Grupo ${g}
        </button>
      `).join('')}
    </div>

  <div class="grupo-activo">
  <div class="grupo-activo-header">
  <h3 class="grupo-titulo">Grupo ${grupoActivo}</h3>
  </div>
  <div class="grupo-activo-body">

        <div class="partidos-lista">
          ${partidos.map(p => {
            const local = getSeleccion(p.local);
            const visitante = getSeleccion(p.visitante);
            const pron = pronosticos[p.id] || { golesLocal: '', golesVisitante: '' };
            const bloqueado = resultadosReales[p.id];
            return `
              <div class="partido-card ${bloqueado ? 'partido-bloqueado' : ''}">
                <div class="partido-card-equipo">
                  <div class="partido-card-img-container">
                    ${local.imagen
                      ? `<img src="${local.imagen}" class="partido-card-img">`
                      : `<div class="partido-card-emoji">${local.bandera}</div>`
                    }
                  </div>
                 <div class="partido-card-nombre">${local.personaje !== 'TU PERSONAJE' ? local.personaje : local.nombre}</div>
                  ${local.personaje !== 'TU PERSONAJE' ? `<div class="partido-card-pais">${local.nombre}</div>` : ''}
                </div>

                <div class="partido-card-centro">
                  ${bloqueado
                    ? `<div class="resultado-final">${bloqueado.golesLocal} - ${bloqueado.golesVisitante}</div>`
                    : `<div class="partido-card-inputs">
                        <input type="number" min="0" max="20"
                          value="${pron.golesLocal !== null && pron.golesLocal !== '' ? pron.golesLocal : ''}"
                          onchange="actualizarPronostico('${p.id}', 'golesLocal', this.value)"
                          class="goles-input">
                        <span class="vs">-</span>
                        <input type="number" min="0" max="20"
                          value="${pron.golesVisitante !== null && pron.golesVisitante !== '' ? pron.golesVisitante : ''}"
                          onchange="actualizarPronostico('${p.id}', 'golesVisitante', this.value)"
                          class="goles-input">
                      </div>`
                  }
                </div>

                <div class="partido-card-equipo">
                  <div class="partido-card-img-container">
                    ${visitante.imagen
                      ? `<img src="${visitante.imagen}" class="partido-card-img">`
                      : `<div class="partido-card-emoji">${visitante.bandera}</div>`
                    }
                  </div>
                  <div class="partido-card-nombre">${visitante.personaje !== 'TU PERSONAJE' ? visitante.personaje : visitante.nombre}</div>
                  ${visitante.personaje !== 'TU PERSONAJE' ? `<div class="partido-card-pais">${visitante.nombre}</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="tabla">
          <h4 class="seccion-label">Tabla de posiciones</h4>
          <table>
            <thead>
              <tr><th>Equipo</th><th>PJ</th><th>PTS</th><th>DG</th></tr>
            </thead>
            <tbody>
              ${tabla.map((t, i) => {
                const s = getSeleccion(t.id);
                return `
                  <tr class="${i < 2 ? 'clasifica' : ''}">
                    <td>${s.bandera} ${s.nombre}</td>
                    <td>${t.pj}</td>
                    <td><strong>${t.pts}</strong></td>
                    <td>${t.dg >= 0 ? '+' : ''}${t.dg}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

      </div>
    
  `;

  if (gruposCompletos()) {
    html += `
      <div class="avanzar-container">
        <button class="btn-avanzar" onclick="avanzarFase()">
          ¡Grupos completos! Avanzar a 16avos →
        </button>
      </div>
    `;
  }

  app.innerHTML = html;
  renderMisGrupos();
}

function cambiarGrupo(grupo) {
  window.grupoActivo = grupo;
  render();
}
async function cerrarSesion() {
  await db.auth.signOut();
  usuarioActual = null;
  pronosticos = {};
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
}

function avanzarFase() {
  faseActual = 'dieciseisavos';
  render();
}

// ================================
// SISTEMA DE PUNTOS
// ================================
function calcularPuntos(pronostico, resultado) {
  if (!pronostico || !resultado) return null;

  const gl_p = parseInt(pronostico.golesLocal);
  const gv_p = parseInt(pronostico.golesVisitante);
  const gl_r = parseInt(resultado.golesLocal);
  const gv_r = parseInt(resultado.golesVisitante);

  if (isNaN(gl_p) || isNaN(gv_p)) return null;

  // Determinar ganador
  const ganador = (g, v) => g > v ? 'local' : g < v ? 'visitante' : 'empate';
  const ganador_p = ganador(gl_p, gv_p);
  const ganador_r = ganador(gl_r, gv_r);

  const acerto_ganador = ganador_p === ganador_r;
  const acerto_diferencia = (gl_p - gv_p) === (gl_r - gv_r);
  const acerto_exacto = gl_p === gl_r && gv_p === gv_r;

  let puntos = 0;
  if (acerto_ganador) puntos += 1;
  if (acerto_diferencia) puntos += 2;
  if (acerto_exacto) puntos += 4;

  return { puntos, acerto_ganador, acerto_diferencia, acerto_exacto };
}

async function calcularYGuardarPuntajes(partidoId) {
  // Buscar resultado real
  const { data: resultado } = await db.from('resultados')
    .select('*')
    .eq('partido_id', partidoId)
    .single();

  if (!resultado) return;

  // Buscar todos los pronósticos de ese partido
  const { data: todosPronosticos } = await db.from('pronosticos')
    .select('*')
    .eq('partido_id', partidoId);

  if (!todosPronosticos) return;

  // Calcular y guardar puntaje de cada usuario
  for (const pron of todosPronosticos) {
    const calc = calcularPuntos(
      { golesLocal: pron.goles_local, golesVisitante: pron.goles_visitante },
      { golesLocal: resultado.goles_local, golesVisitante: resultado.goles_visitante }
    );

    if (!calc) continue;

    await db.from('puntajes').upsert({
      usuario_id: pron.usuario_id,
      partido_id: partidoId,
      puntos: calc.puntos,
      acerto_ganador: calc.acerto_ganador,
      acerto_diferencia: calc.acerto_diferencia,
      acerto_exacto: calc.acerto_exacto,
      calculado_en: new Date().toISOString()
    }, { onConflict: 'usuario_id,partido_id' });
  }
}

async function getPuntajeUsuario(usuarioId) {
  const { data } = await db.from('puntajes')
    .select('puntos')
    .eq('usuario_id', usuarioId);

  if (!data) return 0;
  return data.reduce((acc, p) => acc + p.puntos, 0);
}

async function getRankingGlobal() {
  const { data: usuarios } = await db.from('usuarios').select('id, nombre');
  if (!usuarios) return [];

  const ranking = [];
  for (const u of usuarios) {
    const total = await getPuntajeUsuario(u.id);
    ranking.push({ id: u.id, nombre: u.nombre, puntos: total });
  }

  return ranking.sort((a, b) => b.puntos - a.puntos);
}

async function getRankingGrupo(grupoId) {
  const { data: miembros } = await db.from('grupo_miembros')
    .select('usuario_id')
    .eq('grupo_id', grupoId);

  if (!miembros) return [];

  const ranking = [];
  for (const m of miembros) {
    const { data: userData } = await db.from('usuarios')
      .select('nombre')
      .eq('id', m.usuario_id)
      .single();

    const total = await getPuntajeUsuario(m.usuario_id);
    ranking.push({ id: m.usuario_id, nombre: userData?.nombre, puntos: total });
  }

  return ranking.sort((a, b) => b.puntos - a.puntos);
}
// ================================
// ARRANQUE
// ================================
checkSesion();