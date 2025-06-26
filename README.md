# Plantalingo - Plataforma de Educación Ambiental

## 🌱 Descripción

Plantalingo es una plataforma web educativa sobre educación ambiental que ofrece artículos semanales y quizzes interactivos. El sistema está diseñado para proporcionar contenido fresco y variado cada semana, manteniendo el interés de los usuarios.

## ✨ Características Implementadas

### 📚 Sistema de Artículos Semanales
- **Rotación automática**: Los artículos cambian automáticamente cada semana
- **20 artículos disponibles**: Cubren diversos temas de educación ambiental
- **Datos curiosos**: Cada semana se muestra un dato curioso diferente
- **Categorización**: Artículos organizados por temas (biodiversidad, conservación, etc.)

### 🎯 Sistema de Quiz con Preguntas Aleatorias
- **60 preguntas disponibles**: Banco extenso de preguntas sobre educación ambiental
- **Selección aleatoria**: Cada quiz muestra 5 preguntas diferentes
- **Categorización**: Preguntas organizadas por categorías y niveles de dificultad
- **Estadísticas detalladas**: Análisis por categoría y historial de resultados
- **Persistencia**: Los resultados se guardan en localStorage

### 📊 Funcionalidades Avanzadas
- **Cálculo automático de semanas**: El sistema determina la semana actual del año
- **Estadísticas del usuario**: Seguimiento de progreso y rendimiento
- **Interfaz responsiva**: Diseño adaptativo para diferentes dispositivos
- **Manejo de errores**: Sistema robusto de manejo de errores

## 🗂️ Estructura del Proyecto

```
plantalingo/
├── data/
│   ├── preguntas.json      # Banco de 60 preguntas del quiz
│   └── articulos.json      # 20 artículos + 10 datos curiosos
├── js/
│   └── dataManager.js      # Lógica de manejo de datos
├── inicio.html             # Página principal con artículos
├── quiz.html              # Página del quiz
├── quiz.js                # Lógica del quiz
├── script.js              # Lógica de la página principal
├── style.css              # Estilos CSS
└── README.md              # Este archivo
```

## 🚀 Cómo Funciona

### Sistema de Artículos
1. **Cálculo de semana**: El sistema calcula automáticamente la semana actual del año
2. **Selección de contenido**: Basado en la semana, selecciona 3 artículos específicos
3. **Rotación**: Los artículos rotan automáticamente cada semana
4. **Dato curioso**: Se muestra un dato curioso diferente cada semana

### Sistema de Quiz
1. **Carga de preguntas**: Se cargan las 60 preguntas desde el archivo JSON
2. **Selección aleatoria**: Se seleccionan 5 preguntas al azar
3. **Mezcla de opciones**: Las opciones de respuesta se mezclan para mayor variedad
4. **Evaluación**: Se evalúa cada respuesta y se generan estadísticas
5. **Persistencia**: Los resultados se guardan para seguimiento del progreso

## 📝 Cómo Actualizar el Contenido

### Agregar Nuevas Preguntas
1. Abrir `data/preguntas.json`
2. Agregar nuevas preguntas al array `preguntas`
3. Incluir los campos: `id`, `pregunta`, `opciones`, `respuesta`, `categoria`, `dificultad`

### Agregar Nuevos Artículos
1. Abrir `data/articulos.json`
2. Agregar nuevos artículos al array `articulos`
3. Incluir los campos: `id`, `titulo`, `contenido`, `categoria`, `fecha_publicacion`, `semana`

### Agregar Nuevos Datos Curiosos
1. Abrir `data/articulos.json`
2. Agregar nuevos datos al array `datos_curiosos`
3. Incluir los campos: `id`, `titulo`, `contenido`, `semana`

## 🎨 Categorías Disponibles

### Artículos
- Biodiversidad
- Ecosistemas
- Conservación
- Cambio Climático
- Agricultura
- Energía
- Océanos
- Sostenibilidad
- Áreas Protegidas
- Recursos Naturales
- Educación
- Turismo
- Bosques
- Contaminación
- Transporte

### Preguntas del Quiz
- Flora Nativa
- Conservación
- Conceptos Básicos
- Ecosistemas
- Problemas Ambientales
- Acciones Sostenibles
- Procesos Naturales
- Cambio Climático
- Recursos Naturales
- Energía
- Áreas Protegidas
- Fauna Nativa
- Agricultura Sostenible
- Geografía de Chile
- Océanos
- Bosques
- Contaminación
- Transporte
- Educación
- Turismo
- Sostenibilidad

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y animaciones
- **JavaScript ES6+**: Lógica de la aplicación
- **JSON**: Almacenamiento de datos
- **localStorage**: Persistencia de datos del usuario

## 📱 Características Responsivas

- Diseño adaptativo para móviles, tablets y desktop
- Navegación optimizada para diferentes tamaños de pantalla
- Botones y elementos interactivos adaptados para touch

## 🎯 Beneficios del Sistema

1. **Contenido Fresco**: Los usuarios siempre ven contenido nuevo
2. **Variedad**: 60 preguntas diferentes aseguran variedad en los quizzes
3. **Engagement**: Sistema de estadísticas motiva la participación
4. **Escalabilidad**: Fácil agregar nuevo contenido
5. **Mantenimiento**: Actualización semanal automática sin intervención manual

## 🚀 Instalación y Uso

1. Clonar o descargar el proyecto
2. Abrir `inicio.html` en un navegador web
3. ¡Listo! El sistema funcionará automáticamente

## 📈 Próximas Mejoras Sugeridas

- Sistema de usuarios con cuentas
- Base de datos real (MySQL/PostgreSQL)
- Panel de administración para gestionar contenido
- Sistema de notificaciones para nuevos artículos
- Integración con redes sociales
- Sistema de logros y badges
- Contenido multimedia (imágenes, videos)

---

**Desarrollado para promover la educación ambiental y crear conciencia sobre la importancia de proteger nuestro planeta.** 🌍 