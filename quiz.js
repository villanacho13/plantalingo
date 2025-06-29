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

// Mostrar mensaje si ya completó el quiz de esta semana
function mostrarQuizYaCompletado() {
    const quizSemana = dataManager.obtenerQuizSemanaActual();
    const stats = dataManager.obtenerEstadisticasUsuario();
    
    preguntaElemento.textContent = "Quiz ya completado";
    opcionesElemento.innerHTML = "";
    resultadoElemento.innerHTML = `
        <div class="quiz-completado-mensaje">
            <h2>✅ Ya completaste el quiz de esta semana</h2>
            <div class="resultado-semana">
                <p class="puntaje-semana">Puntaje obtenido: ${quizSemana.puntaje}/5</p>
                <p class="porcentaje-semana">(${Math.round((quizSemana.puntaje/5)*100)}%)</p>
            </div>
            
            <div class="estadisticas-acumuladas">
                <h3>📊 Tu Progreso Total</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-numero">${stats.puntajeTotal}</span>
                        <span class="stat-label">Puntaje Total</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-numero">${stats.totalQuizzes}</span>
                        <span class="stat-label">Quizzes Completados</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-numero">${stats.promedioPuntaje}</span>
                        <span class="stat-label">Promedio</span>
                    </div>
                </div>
            </div>
            
            <div class="acciones-quiz">
                <button onclick="verHistorialCompleto()" class="btn-historial">📈 Ver Historial Completo</button>
                <button onclick="goBack()" class="btn-regresar">⬅ Volver al Inicio</button>
            </div>
        </div>
    `;
}

function mostrarPregunta() {
    if (indice >= preguntas.length) {
        mostrarResultado();
        return;
    }

    const actual = preguntas[indice];
    preguntaElemento.textContent = `${actual.pregunta} (${indice + 1}/${preguntas.length})`;
    opcionesElemento.innerHTML = "";

    // Mezclar las opciones para que no siempre esté la respuesta correcta en la misma posición
    const opcionesMezcladas = [...actual.opciones].sort(() => Math.random() - 0.5);

    opcionesMezcladas.forEach(opcion => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.className = 'opcion-btn';
        boton.onclick = () => validarRespuesta(opcion);
        opcionesElemento.appendChild(boton);
    });
}

function validarRespuesta(opcionSeleccionada) {
    const preguntaActual = preguntas[indice];
    const esCorrecta = opcionSeleccionada === preguntaActual.respuesta;

    if (esCorrecta) {
        puntaje++;
    }

    respuestasUsuario.push({
        pregunta: preguntaActual.pregunta,
        seleccion: opcionSeleccionada,
        correcta: preguntaActual.respuesta,
        esCorrecta: esCorrecta,
        categoria: preguntaActual.categoria,
        dificultad: preguntaActual.dificultad
    });

    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    preguntaElemento.textContent = "¡Quiz finalizado!";
    opcionesElemento.innerHTML = "";
    
    const porcentaje = Math.round((puntaje / preguntas.length) * 100);
    let mensaje = "";
    
    if (porcentaje === 100) {
        mensaje = "🎉 ¡Perfecto! Todas tus respuestas fueron correctas.";
    } else if (porcentaje >= 80) {
        mensaje = "👏 ¡Excelente! Muy buen conocimiento sobre educación ambiental.";
    } else if (porcentaje >= 60) {
        mensaje = "👍 ¡Buen trabajo! Sigue aprendiendo sobre el medio ambiente.";
    } else {
        mensaje = "📚 ¡Sigue estudiando! La educación ambiental es importante.";
    }

    // Obtener estadísticas actualizadas
    const stats = dataManager.obtenerEstadisticasUsuario();
    const nuevoPuntajeTotal = stats.puntajeTotal + puntaje;

    resultadoElemento.innerHTML = `
        <div class="resultado-final">
            <h2>Resultado del Quiz</h2>
            <p class="puntaje">Obtuviste ${puntaje} de ${preguntas.length} respuestas correctas (${porcentaje}%)</p>
            <p class="mensaje">${mensaje}</p>
            
            <div class="puntaje-acumulado">
                <h3>🏆 Puntaje Acumulado</h3>
                <div class="puntaje-info">
                    <p><strong>Esta semana:</strong> +${puntaje} puntos</p>
                    <p><strong>Total acumulado:</strong> ${nuevoPuntajeTotal} puntos</p>
                    <p><strong>Quizzes completados:</strong> ${stats.totalQuizzes + 1}</p>
                </div>
            </div>
            
            <div class="estadisticas">
                <h3>Estadísticas por Categoría:</h3>
                ${generarEstadisticasCategoria()}
            </div>
        </div>
    `;

    // Mostrar respuestas incorrectas
    const incorrectas = respuestasUsuario.filter(r => !r.esCorrecta);
    if (incorrectas.length > 0) {
        resultadoElemento.innerHTML += `
            <div class="respuestas-incorrectas">
                <h3>Respuestas incorrectas:</h3>
                ${incorrectas.map(r => `
                    <div class="respuesta-item incorrecta">
                        <div class="respuesta-header">
                            <span class="numero-pregunta">Pregunta ${respuestasUsuario.indexOf(r) + 1}</span>
                            <span class="estado-respuesta">Incorrecta</span>
                        </div>
                        <div class="pregunta-texto">${r.pregunta}</div>
                        <div class="respuesta-usuario">Tu respuesta: ${r.seleccion}</div>
                        <div class="respuesta-correcta">Respuesta correcta: ${r.correcta}</div>
                        <div class="categoria-pregunta">Categoría: ${traducirCategoria(r.categoria)}</div>
                    </div>
                `).join("")}
            </div>
        `;
    }

    // Guardar resultado en localStorage
    if (dataManager) {
        dataManager.guardarResultadoQuiz({
            puntaje: puntaje,
            total: preguntas.length,
            porcentaje: porcentaje,
            respuestas: respuestasUsuario,
            fecha: new Date().toISOString()
        });
    }

    // Agregar botones de acción
    resultadoElemento.innerHTML += `
        <div class="acciones-quiz">
            <button onclick="verEstadisticas()" class="btn-estadisticas">📊 Ver Estadísticas</button>
            <button onclick="goBack()" class="btn-volver">⬅ Volver al Inicio</button>
        </div>
    `;
}

function generarEstadisticasCategoria() {
    const estadisticas = {};
    
    respuestasUsuario.forEach(respuesta => {
        if (!estadisticas[respuesta.categoria]) {
            estadisticas[respuesta.categoria] = { correctas: 0, total: 0 };
        }
        estadisticas[respuesta.categoria].total++;
        if (respuesta.esCorrecta) {
            estadisticas[respuesta.categoria].correctas++;
        }
    });

    return Object.entries(estadisticas).map(([categoria, stats]) => {
        const porcentaje = Math.round((stats.correctas / stats.total) * 100);
        return `
            <div class="categoria-stats">
                <span class="categoria-nombre">${traducirCategoria(categoria)}:</span>
                <span class="categoria-puntaje">${stats.correctas}/${stats.total} (${porcentaje}%)</span>
            </div>
        `;
    }).join("");
}

function traducirCategoria(categoria) {
    const traducciones = {
        'flora_nativa': 'Flora Nativa',
        'conservacion': 'Conservación',
        'conceptos_basicos': 'Conceptos Básicos',
        'ecosistemas': 'Ecosistemas',
        'problemas_ambientales': 'Problemas Ambientales',
        'acciones_sostenibles': 'Acciones Sostenibles',
        'procesos_naturales': 'Procesos Naturales',
        'cambio_climatico': 'Cambio Climático',
        'recursos_naturales': 'Recursos Naturales',
        'energia': 'Energía',
        'areas_protegidas': 'Áreas Protegidas',
        'fauna_nativa': 'Fauna Nativa',
        'agricultura_sostenible': 'Agricultura Sostenible',
        'geografia_chile': 'Geografía de Chile',
        'oceanos': 'Océanos',
        'bosques': 'Bosques',
        'contaminacion': 'Contaminación',
        'transporte': 'Transporte',
        'educacion': 'Educación',
        'turismo': 'Turismo',
        'sostenibilidad': 'Sostenibilidad'
    };
    
    return traducciones[categoria] || categoria;
}

function verHistorialCompleto() {
    if (!dataManager) return;
    
    const historial = dataManager.obtenerHistorialQuiz();
    const progreso = dataManager.obtenerProgresoSemanal();
    
    let historialHTML = "";
    if (historial.length > 0) {
        historialHTML = `
            <h3>Historial de Quizzes:</h3>
            <div class="historial">
                ${historial.map(r => `
                    <div class="historial-item">
                        <span>Semana ${r.semana} - ${new Date(r.fecha).toLocaleDateString('es-CL')}</span>
                        <span>${r.puntaje}/${r.total} (${Math.round((r.puntaje/r.total)*100)}%)</span>
                    </div>
                `).join("")}
            </div>
        `;
    }
    
    let progresoHTML = "";
    const semanasCompletadas = progreso.filter(p => p.completada);
    if (semanasCompletadas.length > 0) {
        progresoHTML = `
            <h3>Progreso Semanal:</h3>
            <div class="progreso-semanal">
                <p>Has completado ${semanasCompletadas.length} de las ${dataManager.semanaActual} semanas del año</p>
                <div class="progreso-barras">
                    ${semanasCompletadas.slice(-10).map(p => `
                        <div class="semana-barra" title="Semana ${p.semana}: ${p.puntaje}/5">
                            <div class="barra-puntaje" style="height: ${(p.puntaje/5)*100}%"></div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }
    
    resultadoElemento.innerHTML = `
        <div class="historial-completo">
            <h2>📊 Historial Completo</h2>
            ${historialHTML}
            ${progresoHTML}
            <button onclick="mostrarResultado()" class="btn-volver">⬅ Volver al Resultado</button>
        </div>
    `;
}

function mostrarError(mensaje) {
    preguntaElemento.textContent = "Error";
    opcionesElemento.innerHTML = "";
    resultadoElemento.innerHTML = `
        <div class="error">
            <p>❌ ${mensaje}</p>
            <p>Intenta recargar la página o vuelve más tarde.</p>
            <button onclick="goBack()" class="btn-regresar">⬅ Volver al Inicio</button>
        </div>
    `;
}

function goBack() {
    window.location.href = 'index.html';
}

function verEstadisticas() {
    if (!dataManager) return;
    
    const stats = dataManager.obtenerEstadisticasUsuario();
    const historial = dataManager.obtenerHistorialQuiz();
    
    resultadoElemento.innerHTML = `
        <div class="estadisticas-usuario">
            <h2>📊 Estadísticas Detalladas</h2>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-numero">${stats.puntajeTotal}</span>
                    <span class="stat-label">Puntaje Total</span>
                </div>
                <div class="stat-item">
                    <span class="stat-numero">${stats.totalQuizzes}</span>
                    <span class="stat-label">Quizzes Completados</span>
                </div>
                <div class="stat-item">
                    <span class="stat-numero">${stats.promedioPuntaje}</span>
                    <span class="stat-label">Promedio</span>
                </div>
                <div class="stat-item">
                    <span class="stat-numero">${stats.mejorPuntaje}</span>
                    <span class="stat-label">Mejor Puntaje</span>
                </div>
            </div>
            
            ${historial.length > 0 ? `
                <div class="historial">
                    <h3>Historial de Quizzes:</h3>
                    ${historial.slice(-5).map(r => `
                        <div class="historial-item">
                            <span>Semana ${r.semana} - ${new Date(r.fecha).toLocaleDateString('es-CL')}</span>
                            <span>${r.puntaje}/${r.total} (${Math.round((r.puntaje/r.total)*100)}%)</span>
                        </div>
                    `).join("")}
                </div>
            ` : ''}
            
            <div class="acciones-quiz">
                <button onclick="verHistorialCompleto()" class="btn-historial">📈 Ver Historial Completo</button>
                <button onclick="mostrarResultado()" class="btn-volver">⬅ Volver al Resultado</button>
            </div>
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
