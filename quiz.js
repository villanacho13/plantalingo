// Quiz.js - Sistema de Quiz con preguntas aleatorias
let dataManager;
let preguntas = [];
let indice = 0;
let puntaje = 0;
let respuestasUsuario = [];

const preguntaElemento = document.getElementById('question');
const opcionesElemento = document.getElementById('options');
const resultadoElemento = document.getElementById('result');

// Inicializar el quiz
async function inicializarQuiz() {
    try {
        // Crear instancia del DataManager
        dataManager = new DataManager();
        
        // Cargar datos
        const datosCargados = await dataManager.cargarDatos();
        
        if (datosCargados) {
            // Verificar si se quiere mostrar resultados de un quiz completado
            const mostrarResultados = localStorage.getItem('mostrarResultadosQuiz');
            if (mostrarResultados) {
                localStorage.removeItem('mostrarResultadosQuiz'); // Limpiar después de usar
                const resultados = JSON.parse(mostrarResultados);
                mostrarResultadosQuizCompletado(resultados);
                return;
            }
            
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

// Mostrar resultados detallados del quiz completado
function mostrarResultadosQuizCompletado(resultados) {
    preguntaElemento.textContent = "Resultados del Quiz";
    opcionesElemento.innerHTML = "";
    
    const porcentaje = Math.round((resultados.puntaje / resultados.total) * 100);
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

    resultadoElemento.innerHTML = `
        <div class="resultado-final">
            <h2>📊 Resultados del Quiz - Semana ${resultados.semana}</h2>
            <p class="puntaje">Obtuviste ${resultados.puntaje} de ${resultados.total} respuestas correctas (${porcentaje}%)</p>
            <p class="mensaje">${mensaje}</p>
            
            <div class="puntaje-acumulado">
                <h3>🏆 Puntaje Acumulado</h3>
                <div class="puntaje-info">
                    <p><strong>Esta semana:</strong> +${resultados.puntaje} puntos</p>
                    <p><strong>Total acumulado:</strong> ${resultados.puntajeTotal} puntos</p>
                    <p><strong>Quizzes completados:</strong> ${resultados.totalQuizzes}</p>
                </div>
            </div>
        </div>
    `;

    // Mostrar todas las respuestas (correctas e incorrectas)
    if (resultados.respuestas && resultados.respuestas.length > 0) {
        resultadoElemento.innerHTML += `
            <div class="respuestas-detalladas">
                <h3>📝 Revisión de Respuestas:</h3>
                ${resultados.respuestas.map((r, index) => `
                    <div class="respuesta-item ${r.esCorrecta ? 'correcta' : 'incorrecta'}">
                        <div class="respuesta-header">
                            <span class="numero-pregunta">Pregunta ${index + 1}</span>
                            <span class="estado-respuesta">${r.esCorrecta ? '✅ Correcta' : '❌ Incorrecta'}</span>
                        </div>
                        <p class="pregunta-texto"><strong>Pregunta:</strong> ${r.pregunta}</p>
                        <p class="respuesta-usuario"><strong>Tu respuesta:</strong> ${r.seleccion}</p>
                        <p class="respuesta-correcta"><strong>Respuesta correcta:</strong> ${r.correcta}</p>
                        <p class="categoria-pregunta"><strong>Categoría:</strong> ${traducirCategoria(r.categoria)}</p>
                    </div>
                `).join("")}
            </div>
        `;
    }

    // Agregar botones de acción
    resultadoElemento.innerHTML += `
        <div class="acciones-quiz">
            <button onclick="verHistorialCompleto()" class="btn-historial">📈 Ver Historial Completo</button>
            <button onclick="goBack()" class="btn-regresar">⬅ Volver al Inicio</button>
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
                    <div class="error">
                        <p><strong>❌ Pregunta:</strong> ${r.pregunta}</p>
                        <p><strong>Tu respuesta:</strong> ${r.seleccion}</p>
                        <p><strong>Respuesta correcta:</strong> ${r.correcta}</p>
                        <p><strong>Categoría:</strong> ${traducirCategoria(r.categoria)}</p>
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
            respuestas: respuestasUsuario
        });
    }

    // Agregar botones de acción
    resultadoElemento.innerHTML += `
        <div class="acciones-quiz">
            <button onclick="verHistorialCompleto()" class="btn-historial">📈 Ver Historial Completo</button>
            <button onclick="goBack()" class="btn-regresar">⬅ Volver al Inicio</button>
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
        <div class="error-mensaje">
            <p>❌ ${mensaje}</p>
            <button onclick="inicializarQuiz()" class="btn-reintentar">🔄 Reintentar</button>
            <button onclick="goBack()" class="btn-regresar">⬅ Volver al Inicio</button>
        </div>
    `;
}

function goBack() {
    // Limpiar cualquier dato temporal antes de volver
    localStorage.removeItem('mostrarResultadosQuiz');
    window.location.href = "index.html";
}

// Inicializar el quiz cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarQuiz);
