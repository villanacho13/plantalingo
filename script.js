// Script.js - Manejo de la página principal de Plantalingo
let dataManager;

// Inicializar la página principal
async function inicializarPagina() {
    try {
        // Crear instancia del DataManager
        dataManager = new DataManager();
        
        // Cargar datos
        const datosCargados = await dataManager.cargarDatos();
        
        if (datosCargados) {
            // Mostrar información de la semana actual
            mostrarInfoSemana();
            
            // Cargar artículos de la semana
            cargarArticulosSemana();
            
            // Mostrar puntaje total y estado del quiz
            mostrarPuntajeTotal();
            mostrarEstadoQuiz();
            
            console.log('Página inicializada exitosamente');
        } else {
            mostrarError('Error al cargar los datos');
        }
    } catch (error) {
        console.error('Error al inicializar página:', error);
        mostrarError('Error al cargar la página');
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
        html += `
            <div class="articulo">
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
        html += `
            <div class="datos-curiosos">
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

// Inicializar la página cuando se carga
document.addEventListener('DOMContentLoaded', inicializarPagina);