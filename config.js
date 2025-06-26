// Config.js - Configuración del sistema Plantalingo

const CONFIG = {
    // Configuración general
    APP_NAME: "Plantalingo",
    VERSION: "1.0.0",
    
    // Configuración de artículos
    ARTICULOS: {
        POR_SEMANA: 3,           // Número de artículos a mostrar por semana
        TOTAL_ARTICULOS: 20,     // Total de artículos disponibles
        ROTACION_AUTOMATICA: true // Si los artículos rotan automáticamente
    },
    
    // Configuración del quiz
    QUIZ: {
        PREGUNTAS_POR_QUIZ: 5,   // Número de preguntas por quiz
        TOTAL_PREGUNTAS: 60,     // Total de preguntas disponibles
        MEZCLAR_OPCIONES: true,  // Si las opciones se mezclan
        GUARDAR_RESULTADOS: true // Si se guardan los resultados
    },
    
    // Configuración de datos curiosos
    DATOS_CURIOSOS: {
        TOTAL_DISPONIBLES: 10,   // Total de datos curiosos disponibles
        ROTACION_AUTOMATICA: true // Si rotan automáticamente
    },
    
    // Configuración de almacenamiento
    STORAGE: {
        PREFIX: "plantalingo_",
        MAX_RESULTADOS: 10,      // Máximo número de resultados a guardar
        EXPIRACION_DIAS: 365     // Días de expiración de datos
    },
    
    // Configuración de categorías
    CATEGORIAS: {
        ARTICULOS: [
            'biodiversidad',
            'ecosistemas', 
            'conservacion',
            'cambio_climatico',
            'agricultura',
            'energia',
            'oceanos',
            'sostenibilidad',
            'areas_protegidas',
            'recursos_naturales',
            'educacion',
            'turismo',
            'bosques',
            'contaminacion',
            'transporte'
        ],
        PREGUNTAS: [
            'flora_nativa',
            'conservacion',
            'conceptos_basicos',
            'ecosistemas',
            'problemas_ambientales',
            'acciones_sostenibles',
            'procesos_naturales',
            'cambio_climatico',
            'recursos_naturales',
            'energia',
            'areas_protegidas',
            'fauna_nativa',
            'agricultura_sostenible',
            'geografia_chile',
            'oceanos',
            'bosques',
            'contaminacion',
            'transporte',
            'educacion',
            'turismo',
            'sostenibilidad'
        ]
    },
    
    // Configuración de dificultades
    DIFICULTADES: ['facil', 'medio', 'dificil'],
    
    // Configuración de mensajes
    MENSAJES: {
        QUIZ: {
            PERFECTO: "🎉 ¡Perfecto! Todas tus respuestas fueron correctas.",
            EXCELENTE: "👏 ¡Excelente! Muy buen conocimiento sobre educación ambiental.",
            BUENO: "👍 ¡Buen trabajo! Sigue aprendiendo sobre el medio ambiente.",
            ESTUDIAR: "📚 ¡Sigue estudiando! La educación ambiental es importante."
        },
        ERRORES: {
            CARGAR_DATOS: "Error al cargar los datos",
            CARGAR_PREGUNTAS: "No se pudieron cargar las preguntas",
            CARGAR_PAGINA: "Error al cargar la página"
        }
    },
    
    // Configuración de archivos
    ARCHIVOS: {
        PREGUNTAS: 'data/preguntas.json',
        ARTICULOS: 'data/articulos.json'
    },
    
    // Configuración de fechas
    FECHAS: {
        FORMATO_LOCAL: 'es-CL',
        FORMATO_DISPLAY: {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    }
};

// Función para obtener configuración
function getConfig(key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], CONFIG);
}

// Función para validar configuración
function validarConfig() {
    const errores = [];
    
    // Validar que el número de preguntas por quiz no exceda el total
    if (CONFIG.QUIZ.PREGUNTAS_POR_QUIZ > CONFIG.QUIZ.TOTAL_PREGUNTAS) {
        errores.push('El número de preguntas por quiz no puede exceder el total de preguntas');
    }
    
    // Validar que el número de artículos por semana no exceda el total
    if (CONFIG.ARTICULOS.POR_SEMANA > CONFIG.ARTICULOS.TOTAL_ARTICULOS) {
        errores.push('El número de artículos por semana no puede exceder el total de artículos');
    }
    
    return errores;
}

// Función para obtener estadísticas de configuración
function getEstadisticasConfig() {
    return {
        totalPreguntas: CONFIG.QUIZ.TOTAL_PREGUNTAS,
        preguntasPorQuiz: CONFIG.QUIZ.PREGUNTAS_POR_QUIZ,
        totalArticulos: CONFIG.ARTICULOS.TOTAL_ARTICULOS,
        articulosPorSemana: CONFIG.ARTICULOS.POR_SEMANA,
        totalDatosCuriosos: CONFIG.DATOS_CURIOSOS.TOTAL_DISPONIBLES,
        categoriasArticulos: CONFIG.CATEGORIAS.ARTICULOS.length,
        categoriasPreguntas: CONFIG.CATEGORIAS.PREGUNTAS.length,
        dificultades: CONFIG.DIFICULTADES.length
    };
}

// Exportar para uso global
window.CONFIG = CONFIG;
window.getConfig = getConfig;
window.validarConfig = validarConfig;
window.getEstadisticasConfig = getEstadisticasConfig; 