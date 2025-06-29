// Quiz.js - Sistema de Quiz con preguntas aleatorias
let dataManager;
let preguntas = [];
let indice = 0;
let puntaje = 0;
let respuestasUsuario = [];
let currentTheme = 'light';
let currentFontSize = 'normal';

const preguntaElemento = document.getElementById('question');
const opcionesElemento = document.getElementById('options');
const resultadoElemento = document.getElementById('result');

// Inicializar el quiz
async function inicializarQuiz() {
    try {
        // Cargar preferencias del usuario
        cargarPreferenciasUsuario();
        
        // Crear instancia del DataManager
        dataManager = new DataManager();
        
        // Cargar datos
        const datosCargados = await dataManager.cargarDatos();
        
        if (datosCargados) {
            // Verificar si ya completó el quiz de esta semana
            if (dataManager.verificarQuizCompletado()) {
                mostrarQuizYaCompletado();
                return;
            }
            
            // Seleccionar 5 preguntas aleatorias
            preguntas = dataManager.seleccionarPreguntasAleatorias(5);
            
            if (preguntas.length > 0) {
                console.log(`Quiz inicializado con ${preguntas.length} preguntas`);
                mostrarPregunta();
            } else {
                mostrarError('No se pudieron cargar las preguntas');
            }
        } else {
            mostrarError('Error al cargar los datos del quiz');
        }
    } catch (error) {
        console.error('Error al inicializar quiz:', error);
        mostrarError('Error al inicializar el quiz');
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
            '--font-size-small': '1rem',
            '--font-size-normal': '1.2rem',
            '--font-size-large': '1.4rem',
            '--font-size-xlarge': '1.8rem',
            '--font-size-xxlarge': '3.5rem'
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

// Mostrar mensaje si ya completó el quiz de esta semana
function mostrarQuizYaCompletado() {
    const stats = dataManager.obtenerEstadisticasUsuario();
    const quizActual = dataManager.obtenerQuizActual();
    
    resultadoElemento.innerHTML = `
        <div class="quiz-completado-mensaje">
            <h2>✅ Quiz ya completado</h2>
            <p>Ya has completado el quiz de esta semana.</p>
            <div class="resultado-semana">
                <h3>Tu resultado:</h3>
                <p>Puntaje: ${quizActual.puntaje}/${quizActual.total} (${Math.round(quizActual.porcentaje)}%)</p>
            </div>
            <div class="acciones-quiz">
                <button onclick="goBack()" class="btn-volver">⬅ Volver al Inicio</button>
            </div>
        </div>
    `;
}

// Mostrar la pregunta actual
function mostrarPregunta() {
    if (indice < preguntas.length) {
        const pregunta = preguntas[indice];
        preguntaElemento.textContent = pregunta.pregunta;
        
        opcionesElemento.innerHTML = '';
        pregunta.opciones.forEach((opcion, i) => {
            const boton = document.createElement('button');
            boton.className = 'opcion-btn';
            boton.textContent = opcion;
            boton.onclick = () => validarRespuesta(opcion);
            opcionesElemento.appendChild(boton);
        });
    } else {
        mostrarResultado();
    }
}

// Validar respuesta del usuario
function validarRespuesta(opcionSeleccionada) {
    const pregunta = preguntas[indice];
    const esCorrecta = opcionSeleccionada === pregunta.respuesta_correcta;
    
    if (esCorrecta) {
        puntaje++;
    }
    
    respuestasUsuario.push({
        pregunta: pregunta.pregunta,
        seleccion: opcionSeleccionada,
        correcta: pregunta.respuesta_correcta,
        categoria: pregunta.categoria
    });
    
    indice++;
    mostrarPregunta();
}

// Mostrar resultado final
function mostrarResultado() {
    const porcentaje = Math.round((puntaje / preguntas.length) * 100);
    const mensaje = porcentaje >= 80 ? '¡Excelente trabajo!' : 
                   porcentaje >= 60 ? '¡Buen trabajo!' : 
                   porcentaje >= 40 ? '¡Sigue practicando!' : '¡No te rindas!';
    
    const stats = dataManager.obtenerEstadisticasUsuario();
    const puntajeTotal = stats.puntajeTotal + puntaje;
    const quizzesCompletados = stats.quizzesCompletados + 1;
    
    resultadoElemento.innerHTML = `
        <div class="resultado-final">
            <h2>🎉 Quiz Completado</h2>
            <div class="puntaje">${puntaje}/${preguntas.length}</div>
            <div class="mensaje">${mensaje}</div>
            <div class="puntaje-acumulado">
                <h3>Puntaje Total</h3>
                <div class="puntaje-info">
                    <p>Esta semana: ${puntaje} puntos</p>
                    <p>Total acumulado: ${puntajeTotal} puntos</p>
                </div>
            </div>
        </div>
        <div class="acciones-quiz">
            <button onclick="goBack()" class="btn-volver">⬅ Volver al Inicio</button>
        </div>
    `;
    
    // Guardar resultado
    dataManager.guardarResultadoQuiz({
        puntaje: puntaje,
        total: preguntas.length,
        porcentaje: porcentaje,
        respuestas: respuestasUsuario,
        fecha: new Date().toISOString()
    });
}

// Función para ir al inicio
function goBack() {
    window.location.href = 'index.html';
}

// Mostrar error
function mostrarError(mensaje) {
    opcionesElemento.innerHTML = "";
    resultadoElemento.innerHTML = `
        <div class="error">
            <p>❌ ${mensaje}</p>
            <p>Intenta recargar la página o vuelve más tarde.</p>
            <button onclick="goBack()" class="btn-regresar">⬅ Volver al Inicio</button>
        </div>
    `;
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const modal = document.getElementById('preferences-modal');
    if (event.target === modal) {
        cerrarPreferencias();
    }
});

// Inicializar el quiz cuando se carga el DOM
document.addEventListener('DOMContentLoaded', inicializarQuiz);
