// DataManager.js - Manejo de datos JSON para Plantalingo
class DataManager {
    constructor() {
        this.preguntas = [];
        this.articulos = [];
        this.datosCuriosos = [];
        this.semanaActual = this.calcularSemanaActual();
    }

    // Calcular la semana actual del año
    calcularSemanaActual() {
        const ahora = new Date();
        const inicioAno = new Date(ahora.getFullYear(), 0, 1);
        const dias = Math.floor((ahora - inicioAno) / (24 * 60 * 60 * 1000));
        return Math.ceil((dias + inicioAno.getDay() + 1) / 7);
    }

    // Cargar datos desde archivos JSON
    async cargarDatos() {
        try {
            // Cargar preguntas
            const respuestaPreguntas = await fetch('data/preguntas.json');
            const datosPreguntas = await respuestaPreguntas.json();
            this.preguntas = datosPreguntas.preguntas;

            // Cargar artículos
            const respuestaArticulos = await fetch('data/articulos.json');
            const datosArticulos = await respuestaArticulos.json();
            this.articulos = datosArticulos.articulos;
            this.datosCuriosos = datosArticulos.datos_curiosos;

            console.log('Datos cargados exitosamente');
            return true;
        } catch (error) {
            console.error('Error al cargar datos:', error);
            return false;
        }
    }

    // Seleccionar 5 preguntas aleatorias para el quiz
    seleccionarPreguntasAleatorias(cantidad = 5) {
        if (this.preguntas.length === 0) {
            console.error('No hay preguntas disponibles');
            return [];
        }

        // Mezclar el array de preguntas
        const preguntasMezcladas = [...this.preguntas].sort(() => Math.random() - 0.5);
        
        // Seleccionar las primeras 5 (o la cantidad especificada)
        return preguntasMezcladas.slice(0, Math.min(cantidad, this.preguntas.length));
    }

    // Obtener artículos para la semana actual
    obtenerArticulosSemana() {
        if (this.articulos.length === 0) {
            console.error('No hay artículos disponibles');
            return [];
        }

        // Calcular qué artículos mostrar basado en la semana actual
        const articulosPorSemana = 3; // Mostrar 3 artículos por semana
        const inicio = ((this.semanaActual - 1) * articulosPorSemana) % this.articulos.length;
        const fin = Math.min(inicio + articulosPorSemana, this.articulos.length);

        let articulosSeleccionados = this.articulos.slice(inicio, fin);

        // Si no hay suficientes artículos, tomar desde el principio
        if (articulosSeleccionados.length < articulosPorSemana) {
            const faltantes = articulosPorSemana - articulosSeleccionados.length;
            articulosSeleccionados = articulosSeleccionados.concat(this.articulos.slice(0, faltantes));
        }

        return articulosSeleccionados;
    }

    // Obtener dato curioso para la semana actual
    obtenerDatoCuriosoSemana() {
        if (this.datosCuriosos.length === 0) {
            console.error('No hay datos curiosos disponibles');
            return null;
        }

        // Calcular qué dato curioso mostrar basado en la semana actual
        const indice = (this.semanaActual - 1) % this.datosCuriosos.length;
        return this.datosCuriosos[indice];
    }

    // Obtener información de la semana actual
    obtenerInfoSemana() {
        return {
            numero: this.semanaActual,
            fecha: new Date().toLocaleDateString('es-CL'),
            articulos: this.obtenerArticulosSemana(),
            datoCurioso: this.obtenerDatoCuriosoSemana()
        };
    }

    // Verificar si el usuario ya completó el quiz de esta semana
    verificarQuizCompletado() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        return quizCompletados.some(quiz => quiz.semana === this.semanaActual);
    }

    // Obtener el resultado del quiz de esta semana si ya fue completado
    obtenerQuizSemanaActual() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        return quizCompletados.find(quiz => quiz.semana === this.semanaActual);
    }

    // Obtener todos los quizzes completados
    obtenerQuizzesCompletados() {
        return JSON.parse(localStorage.getItem('plantalingo_quizzes_completados') || '[]');
    }

    // Guardar resultado del quiz semanal
    guardarResultadoQuiz(resultado) {
        const quizCompletados = this.obtenerQuizzesCompletados();
        
        // Verificar si ya existe un quiz para esta semana
        const quizExistenteIndex = quizCompletados.findIndex(quiz => quiz.semana === this.semanaActual);
        
        if (quizExistenteIndex !== -1) {
            // Actualizar el quiz existente
            quizCompletados[quizExistenteIndex] = {
                ...resultado,
                fecha: new Date().toISOString(),
                semana: this.semanaActual
            };
        } else {
            // Agregar nuevo quiz
            quizCompletados.push({
                ...resultado,
                fecha: new Date().toISOString(),
                semana: this.semanaActual
            });
        }
        
        localStorage.setItem('plantalingo_quizzes_completados', JSON.stringify(quizCompletados));
        
        // Actualizar puntaje total
        this.actualizarPuntajeTotal();
    }

    // Obtener puntaje total acumulado
    obtenerPuntajeTotal() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        return quizCompletados.reduce((total, quiz) => total + quiz.puntaje, 0);
    }

    // Obtener número total de quizzes completados
    obtenerTotalQuizzes() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        return quizCompletados.length;
    }

    // Obtener promedio de puntaje
    obtenerPromedioPuntaje() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        if (quizCompletados.length === 0) return 0;
        
        const puntajeTotal = this.obtenerPuntajeTotal();
        return (puntajeTotal / quizCompletados.length).toFixed(1);
    }

    // Obtener mejor puntaje
    obtenerMejorPuntaje() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        if (quizCompletados.length === 0) return 0;
        
        return Math.max(...quizCompletados.map(quiz => quiz.puntaje));
    }

    // Obtener estadísticas completas del usuario
    obtenerEstadisticasUsuario() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        
        if (quizCompletados.length === 0) {
            return {
                totalQuizzes: 0,
                puntajeTotal: 0,
                promedioPuntaje: 0,
                mejorPuntaje: 0,
                semanaActual: this.semanaActual,
                quizCompletadoEstaSemana: false
            };
        }

        return {
            totalQuizzes: quizCompletados.length,
            puntajeTotal: this.obtenerPuntajeTotal(),
            promedioPuntaje: this.obtenerPromedioPuntaje(),
            mejorPuntaje: this.obtenerMejorPuntaje(),
            semanaActual: this.semanaActual,
            quizCompletadoEstaSemana: this.verificarQuizCompletado()
        };
    }

    // Actualizar puntaje total en localStorage
    actualizarPuntajeTotal() {
        const puntajeTotal = this.obtenerPuntajeTotal();
        localStorage.setItem('plantalingo_puntaje_total', puntajeTotal.toString());
    }

    // Obtener historial de quizzes (últimos 10)
    obtenerHistorialQuiz() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        return quizCompletados.slice(-10).reverse();
    }

    // Obtener progreso semanal (qué semanas ha completado)
    obtenerProgresoSemanal() {
        const quizCompletados = this.obtenerQuizzesCompletados();
        const semanasCompletadas = quizCompletados.map(quiz => quiz.semana);
        
        // Crear array con las primeras 52 semanas del año
        const progreso = [];
        for (let semana = 1; semana <= 52; semana++) {
            progreso.push({
                semana: semana,
                completada: semanasCompletadas.includes(semana),
                puntaje: quizCompletados.find(q => q.semana === semana)?.puntaje || 0
            });
        }
        
        return progreso;
    }

    // Filtrar preguntas por categoría
    filtrarPreguntasPorCategoria(categoria) {
        return this.preguntas.filter(pregunta => pregunta.categoria === categoria);
    }

    // Filtrar preguntas por dificultad
    filtrarPreguntasPorDificultad(dificultad) {
        return this.preguntas.filter(pregunta => pregunta.dificultad === dificultad);
    }

    // Obtener estadísticas de las preguntas
    obtenerEstadisticasPreguntas() {
        const categorias = {};
        const dificultades = {};

        this.preguntas.forEach(pregunta => {
            // Contar por categoría
            categorias[pregunta.categoria] = (categorias[pregunta.categoria] || 0) + 1;
            
            // Contar por dificultad
            dificultades[pregunta.dificultad] = (dificultades[pregunta.dificultad] || 0) + 1;
        });

        return {
            total: this.preguntas.length,
            categorias,
            dificultades
        };
    }
}

// Exportar para uso global
window.DataManager = DataManager; 