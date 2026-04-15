// nav.js - Header y navbar compartido
async function initNav(paginaActiva) {
  // Verificar sesión
  const { data: { session } } = await db.auth.getSession();
  
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }

  const { data: userData } = await db.from('usuarios')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (!userData) {
    window.location.href = 'index.html';
    return null;
  }

  const usuario = { 
    id: session.user.id, 
    nombre: userData.nombre, 
    email: session.user.email 
  };

  // Inyectar navbar
  const navHTML = `
    <nav class="navbar">
      <a href="index.html" class="nav-item ${paginaActiva === 'prode' ? 'active' : ''}">
        <span class="nav-icon">⚽</span>
        <span class="nav-label">Prode</span>
      </a>
      <a href="grupo.html" class="nav-item ${paginaActiva === 'grupo' ? 'active' : ''}">
        <span class="nav-icon">👥</span>
        <span class="nav-label">Mi grupo</span>
      </a>
      <a href="ranking.html" class="nav-item ${paginaActiva === 'ranking' ? 'active' : ''}">
        <span class="nav-icon">🏆</span>
        <span class="nav-label">Ranking</span>
      </a>
      <a href="selecciones.html" class="nav-item ${paginaActiva === 'selecciones' ? 'active' : ''}">
        <span class="nav-icon">🌍</span>
        <span class="nav-label">Selecciones</span>
      </a>
      <a href="#" class="nav-item" onclick="cerrarSesionNav(); return false;">
        <span class="nav-icon">🚪</span>
        <span class="nav-label">Salir</span>
      </a>
    </nav>
  `;

  // Insertar navbar después del header
  document.getElementById('main-header').insertAdjacentHTML('afterend', navHTML);

  return usuario;
}

async function cerrarSesionNav() {
  await db.auth.signOut();
  window.location.href = 'index.html';
}