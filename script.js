// Script.js - Manejo de la página principal de Plantalingo
let dataManager;
let currentTheme = 'light';
let currentFontSize = 'normal';

// Inicializar la página principal
async function inicializarPagina() {
    try {
        // Cargar preferencias del usuario
        cargarPreferenciasUsuario();
        
        // Crear instancia del DataManager
        dataManager = new DataManager();
        
        // Mostrar skeleton loaders mientras se cargan los datos
        mostrarSkeletonLoaders();
        
        // Cargar datos
        const datosCargados = await dataManager.cargarDatos();
        
        if (datosCargados) {
            // Verificar que los datos del usuario se mantengan
            const stats = dataManager.obtenerEstadisticasUsuario();
            console.log('Estadísticas del usuario cargadas:', stats);
            
            // Ocultar skeleton loaders y mostrar contenido
            ocultarSkeletonLoaders();
            
            // Mostrar información de la semana actual
            mostrarInfoSemana();
            
            // Cargar artículos de la semana
            cargarArticulosSemana();
            
            // Mostrar puntaje total y estado del quiz
            mostrarPuntajeTotal();
            mostrarEstadoQuiz();
            
            console.log('Página inicializada exitosamente');
        } else {
            ocultarSkeletonLoaders();
            mostrarError('Error al cargar los datos');
        }
    } catch (error) {
        console.error('Error al inicializar página:', error);
        ocultarSkeletonLoaders();
        mostrarError('Error al cargar la página');
    }
}

// Sistema de preferencias de usuario
function cargarPreferenciasUsuario() {
    // Cargar tema
    const temaGuardado = localStorage.getItem('plantalingo_theme') || 'light';
    aplicarTema(temaGuardado);
    
    // Cargar tamaño de fuente
    const fontSizeGuardado = localStorage.getItem('plantalingo_font_size') || 'normal';
    aplicarTamañoFuente(fontSizeGuardado);
    
    // Crear controles de tema
    crearControlesTema();
}

function crearControlesTema() {
    // Crear contenedor de controles
    const themeControls = document.createElement('div');
    themeControls.className = 'theme-controls';
    
    // Botón de cambio de tema
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = currentTheme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    themeToggle.onclick = cambiarTema;
    
    // Botón de preferencias
    const preferencesBtn = document.createElement('button');
    preferencesBtn.className = 'preferences-btn';
    preferencesBtn.innerHTML = '⚙️';
    preferencesBtn.onclick = mostrarPreferencias;
    
    themeControls.appendChild(themeToggle);
    themeControls.appendChild(preferencesBtn);
    
    // Insertar al inicio del body
    document.body.insertBefore(themeControls, document.body.firstChild);
    
    // Crear modal de preferencias
    crearModalPreferencias();
}

function crearModalPreferencias() {
    const modal = document.createElement('div');
    modal.className = 'preferences-modal';
    modal.id = 'preferences-modal';
    
    modal.innerHTML = `
        <div class="preferences-content">
            <div class="preferences-header">
                <h2>Preferencias</h2>
                <button class="close-btn" onclick="cerrarPreferencias()">&times;</button>
            </div>
            <div class="preference-item">
                <label for="theme-select">Tema:</label>
                <select id="theme-select" class="preference-control" onchange="cambiarTemaDesdeSelect()">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                </select>
            </div>
            <div class="preference-item">
                <label>Tamaño de fuente:</label>
                <div class="font-size-controls">
                    <button class="font-size-btn" data-size="small" onclick="cambiarTamañoFuente('small')">A</button>
                    <button class="font-size-btn active" data-size="normal" onclick="cambiarTamañoFuente('normal')">A</button>
                    <button class="font-size-btn" data-size="large" onclick="cambiarTamañoFuente('large')">A</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Actualizar valores iniciales
    document.getElementById('theme-select').value = currentTheme;
    actualizarBotonesTamañoFuente();
}

function mostrarPreferencias() {
    const modal = document.getElementById('preferences-modal');
    modal.classList.add('show');
}

function cerrarPreferencias() {
    const modal = document.getElementById('preferences-modal');
    modal.classList.remove('show');
}

function cambiarTema() {
    const nuevoTema = currentTheme === 'light' ? 'dark' : 'light';
    aplicarTema(nuevoTema);
    localStorage.setItem('plantalingo_theme', nuevoTema);
    
    // Actualizar botón
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = nuevoTema === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    }
    
    // Actualizar select en modal
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = nuevoTema;
    }
}

function cambiarTemaDesdeSelect() {
    const themeSelect = document.getElementById('theme-select');
    const nuevoTema = themeSelect.value;
    aplicarTema(nuevoTema);
    localStorage.setItem('plantalingo_theme', nuevoTema);
    
    // Actualizar botón
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = nuevoTema === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro';
    }
}

function aplicarTema(tema) {
    currentTheme = tema;
    document.documentElement.setAttribute('data-theme', tema);
}

function cambiarTamañoFuente(tamaño) {
    currentFontSize = tamaño;
    aplicarTamañoFuente(tamaño);
    localStorage.setItem('plantalingo_font_size', tamaño);
    actualizarBotonesTamañoFuente();
}

function aplicarTamañoFuente(tamaño) {
    const sizes = {
        small: {
            '--font-size-small': '0.8rem',
            '--font-size-normal': '0.9rem',
            '--font-size-large': '1.1rem',
            '--font-size-xlarge': '1.3rem',
            '--font-size-xxlarge': '2.5rem'
        },
        normal: {
            '--font-size-small': '0.9rem',
            '--font-size-normal': '1rem',
            '--font-size-large': '1.2rem',
            '--font-size-xlarge': '1.5rem',
            '--font-size-xxlarge': '3rem'
        },
        large: {
            '--font-size-small': '1.2rem',
            '--font-size-normal': '1.4rem',
            '--font-size-large': '1.6rem',
            '--font-size-xlarge': '2rem',
            '--font-size-xxlarge': '4rem'
        }
    };
    
    const root = document.documentElement;
    Object.entries(sizes[tamaño]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}

function actualizarBotonesTamañoFuente() {
    const botones = document.querySelectorAll('.font-size-btn');
    botones.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === currentFontSize) {
            btn.classList.add('active');
        }
    });
}

// Animaciones de carga - Skeleton Loaders
function mostrarSkeletonLoaders() {
    const container = document.getElementById('articulos-container');
    if (!container) return;
    
    let html = '';
    
    // Skeleton para artículos
    for (let i = 0; i < 3; i++) {
        html += `
            <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text" style="width: 60%;"></div>
            </div>
        `;
    }
    
    // Skeleton para dato curioso
    html += `
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text" style="width: 70%;"></div>
        </div>
    `;
    
    container.innerHTML = html;
}

function ocultarSkeletonLoaders() {
    const container = document.getElementById('articulos-container');
    if (container) {
        container.innerHTML = '';
    }
}

// Mostrar información de la semana actual
function mostrarInfoSemana() {
    const infoSemana = dataManager.obtenerInfoSemana();
    
    const semanaElement = document.getElementById('semana-actual');
    const fechaElement = document.getElementById('fecha-actual');
    
    if (semanaElement) {
        semanaElement.textContent = `Semana ${infoSemana.numero}`;
    }
    
    if (fechaElement) {
        fechaElement.textContent = infoSemana.fecha;
    }
}

// Mostrar puntaje total del usuario
function mostrarPuntajeTotal() {
    const stats = dataManager.obtenerEstadisticasUsuario();
    
    const puntajeElement = document.getElementById('puntaje-total');
    const quizzesElement = document.getElementById('quizzes-completados');
    const promedioElement = document.getElementById('promedio-puntaje');
    
    if (puntajeElement) {
        puntajeElement.textContent = stats.puntajeTotal;
    }
    
    if (quizzesElement) {
        const texto = stats.totalQuizzes === 1 ? 'quiz completado' : 'quizzes completados';
        quizzesElement.textContent = `${stats.totalQuizzes} ${texto}`;
    }
    
    if (promedioElement) {
        promedioElement.textContent = `Promedio: ${stats.promedioPuntaje}`;
    }
}

// Mostrar estado del quiz semanal
function mostrarEstadoQuiz() {
    const stats = dataManager.obtenerEstadisticasUsuario();
    const statusInfo = document.getElementById('status-info');
    const btnQuiz = document.getElementById('btn-quiz');
    
    if (!statusInfo || !btnQuiz) return;
    
    if (stats.quizCompletadoEstaSemana) {
        // Quiz ya completado esta semana
        const quizSemana = dataManager.obtenerQuizSemanaActual();
        statusInfo.innerHTML = `
            <div class="quiz-completado">
                <p>✅ Ya completaste el quiz de esta semana</p>
                <p class="puntaje-semana">Puntaje: ${quizSemana.puntaje}/5</p>
                <p class="porcentaje-semana">(${Math.round((quizSemana.puntaje/5)*100)}%)</p>
            </div>
        `;
        
        btnQuiz.textContent = 'Quiz Completado';
        btnQuiz.disabled = true;
        btnQuiz.classList.add('disabled');
    } else {
        // Quiz disponible
        statusInfo.innerHTML = `
            <div class="quiz-disponible">
                <p>🎯 ¡Nuevo quiz disponible!</p>
                <p>Completa 5 preguntas sobre educación ambiental</p>
            </div>
        `;
        
        btnQuiz.textContent = 'Comenzar Quiz';
        btnQuiz.disabled = false;
        btnQuiz.classList.remove('disabled');
        btnQuiz.onclick = goToQuiz;
    }
}

// Cargar artículos de la semana actual
function cargarArticulosSemana() {
    const infoSemana = dataManager.obtenerInfoSemana();
    const container = document.getElementById('articulos-container');
    
    if (!container) return;
    
    let html = '';
    
    // Agregar artículos de la semana
    infoSemana.articulos.forEach(articulo => {
        const imagenHTML = articulo.imagen ? 
            `<div class="articulo-imagen-container">
                <img src="${articulo.imagen}" alt="${articulo.titulo}" class="articulo-imagen" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="imagen-placeholder" style="display: none;">Imagen no disponible</div>
             </div>` :
            `<div class="imagen-placeholder">🌱 Imagen no disponible</div>`;
        
        html += `
            <div class="articulo">
                ${imagenHTML}
                <h2>${articulo.titulo}</h2>
                <p>${articulo.contenido}</p>
                <div class="articulo-meta">
                    <span class="categoria">${traducirCategoria(articulo.categoria)}</span>
                    <span class="fecha">${formatearFecha(articulo.fecha_publicacion)}</span>
                </div>
            </div>
        `;
    });
    
    // Agregar dato curioso de la semana
    if (infoSemana.datoCurioso) {
        const imagenDatoHTML = infoSemana.datoCurioso.imagen ? 
            `<div class="dato-curioso-imagen-container">
                <img src="${infoSemana.datoCurioso.imagen}" alt="${infoSemana.datoCurioso.titulo}" class="dato-curioso-imagen" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="imagen-placeholder" style="display: none;">Imagen no disponible</div>
             </div>` :
            `<div class="imagen-placeholder">🌱 Imagen no disponible</div>`;
        
        html += `
            <div class="datos-curiosos">
                ${imagenDatoHTML}
                <h2>${infoSemana.datoCurioso.titulo}</h2>
                <p>${infoSemana.datoCurioso.contenido}</p>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Traducir categorías de artículos
function traducirCategoria(categoria) {
    const traducciones = {
        'biodiversidad': 'Biodiversidad',
        'ecosistemas': 'Ecosistemas',
        'conservacion': 'Conservación',
        'cambio_climatico': 'Cambio Climático',
        'agricultura': 'Agricultura',
        'energia': 'Energía',
        'oceanos': 'Océanos',
        'sostenibilidad': 'Sostenibilidad',
        'areas_protegidas': 'Áreas Protegidas',
        'recursos_naturales': 'Recursos Naturales',
        'educacion': 'Educación',
        'turismo': 'Turismo',
        'bosques': 'Bosques',
        'contaminacion': 'Contaminación',
        'transporte': 'Transporte'
    };
    
    return traducciones[categoria] || categoria;
}

// Formatear fecha para mostrar
function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Mostrar error en la página
function mostrarError(mensaje) {
    const container = document.getElementById('articulos-container');
    if (container) {
        container.innerHTML = `
            <div class="error-mensaje">
                <p>❌ ${mensaje}</p>
                <button onclick="inicializarPagina()" class="btn-reintentar">🔄 Reintentar</button>
            </div>
        `;
    }
}

// Función para ir al quiz
function goToQuiz() {
    // Verificar si ya completó el quiz de esta semana
    if (dataManager && dataManager.verificarQuizCompletado()) {
        alert('Ya completaste el quiz de esta semana. ¡Vuelve la próxima semana para un nuevo desafío!');
        return;
    }
    
    window.location.href = "quiz.html";
}

// Inicializar la página cuando se carga el DOM
document.addEventListener('DOMContentLoaded', inicializarPagina);