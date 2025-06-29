# 🌱 Plantalingo - Plataforma de Educación Ambiental

Plantalingo es una plataforma web interactiva diseñada para promover la educación ambiental en Chile. Ofrece artículos semanales, datos curiosos y quizzes interactivos sobre temas ambientales relevantes para el país.

## ✨ Características Principales

- **Artículos Semanales**: Contenido educativo sobre biodiversidad, conservación, cambio climático y más
- **Datos Curiosos**: Información interesante sobre la naturaleza chilena
- **Quiz Interactivo**: Preguntas aleatorias con sistema de puntajes acumulativos
- **Sistema de Puntajes**: Seguimiento del progreso semanal y total
- **Rotación Automática**: Contenido que cambia automáticamente cada semana
- **Imágenes Visuales**: Soporte para imágenes en artículos y datos curiosos
- **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles y de escritorio

## 🚀 Cómo Usar

### Para Usuarios
1. Visita la plataforma en: https://villanacho13.github.io/plantalingo/
2. Lee los artículos semanales sobre educación ambiental
3. Descubre datos curiosos sobre la naturaleza chilena
4. Completa el quiz semanal para poner a prueba tus conocimientos
5. Revisa tu puntaje total y progreso

### Para Desarrolladores/Administradores

#### Agregar Nuevas Imágenes
1. Coloca las imágenes en la carpeta `images/`
2. Nombra las imágenes según el patrón usado en `data/articulos.json`
3. Ejemplos de nombres:
   - `biodiversidad-chile.jpg`
   - `ecosistemas-chile.jpg`
   - `especies-peligro.jpg`
   - `cambio-climatico.jpg`
   - `agricultura-sostenible.jpg`
   - `energias-renovables.jpg`
   - `oceanos-chile.jpg`
   - `humedales.jpg`
   - `economia-circular.jpg`
   - `parques-nacionales.jpg`
   - `polinizadores.jpg`
   - `agua-recurso.jpg`
   - `especies-invasoras.jpg`
   - `educacion-ambiental.jpg`
   - `turismo-sostenible.jpg`
   - `bosque-nativo.jpg`
   - `contaminacion-atmosferica.jpg`
   - `semillas-nativas.jpg`
   - `eficiencia-energetica.jpg`
   - `movilidad-sostenible.jpg`

#### Para Datos Curiosos:
   - `alerce.jpg`
   - `desierto-florido.jpg`
   - `copihue.jpg`
   - `pinguinos-humboldt.jpg`
   - `palma-chilena.jpg`
   - `observatorios-chile.jpg`
   - `quillay.jpg`
   - `glaciares.jpg`
   - `huemul.jpg`
   - `cactus.jpg`

#### Agregar Nuevos Artículos
1. Edita el archivo `data/articulos.json`
2. Agrega un nuevo objeto con la siguiente estructura:
```json
{
  "id": 21,
  "titulo": "Título del Artículo",
  "contenido": "Contenido del artículo...",
  "categoria": "categoria",
  "fecha_publicacion": "2025-05-26",
  "semana": 21,
  "imagen": "images/nombre-imagen.jpg"
}
```

#### Agregar Nuevos Datos Curiosos
1. En el mismo archivo `data/articulos.json`
2. Agrega un nuevo objeto en la sección `datos_curiosos`:
```json
{
  "id": 11,
  "titulo": "Dato Curioso de la Semana",
  "contenido": "Contenido del dato curioso...",
  "semana": 11,
  "imagen": "images/nombre-imagen.jpg"
}
```

#### Agregar Nuevas Preguntas al Quiz
1. Edita el archivo `data/preguntas.json`
2. Agrega nuevas preguntas siguiendo la estructura existente

## 📁 Estructura del Proyecto

```
plantalingo/
├── index.html              # Página principal
├── quiz.html               # Página del quiz
├── style.css               # Estilos CSS
├── script.js               # JavaScript principal
├── quiz.js                 # JavaScript del quiz
├── config.js               # Configuración
├── data/
│   ├── articulos.json      # Artículos y datos curiosos
│   └── preguntas.json      # Preguntas del quiz
├── images/                 # Carpeta para imágenes
│   └── placeholder.txt     # Instrucciones para imágenes
├── js/
│   └── dataManager.js      # Gestor de datos
└── README.md               # Este archivo
```

## 🎯 Sistema de Puntajes

- **1 Quiz por semana**: Los usuarios solo pueden completar un quiz por semana
- **5 preguntas aleatorias**: Cada quiz contiene 5 preguntas seleccionadas aleatoriamente
- **Puntaje acumulativo**: Los puntos se suman al total del usuario
- **Estadísticas detalladas**: Seguimiento del progreso por categoría

## 🌍 Categorías de Contenido

- **Biodiversidad**: Especies nativas y conservación
- **Ecosistemas**: Hábitats naturales de Chile
- **Conservación**: Protección del medio ambiente
- **Cambio Climático**: Impactos y soluciones
- **Agricultura**: Prácticas sostenibles
- **Energía**: Energías renovables
- **Océanos**: Vida marina y protección
- **Sostenibilidad**: Desarrollo sostenible
- **Áreas Protegidas**: Parques nacionales
- **Recursos Naturales**: Gestión de recursos
- **Educación**: Educación ambiental
- **Turismo**: Turismo sostenible
- **Bosques**: Bosques nativos
- **Contaminación**: Problemas ambientales
- **Transporte**: Movilidad sostenible

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la página
- **CSS3**: Estilos y diseño responsivo
- **JavaScript**: Funcionalidad interactiva
- **JSON**: Almacenamiento de datos
- **LocalStorage**: Persistencia de datos del usuario
- **GitHub Pages**: Hosting gratuito

## 📱 Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (iOS, Android)
- ✅ Tablets
- ✅ Computadoras de escritorio

## 🔧 Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/villanacho13/plantalingo.git
```

2. Navega al directorio:
```bash
cd plantalingo
```

3. Abre `index.html` en tu navegador o usa un servidor local:
```bash
python -m http.server 8000
```

## 📝 Notas Importantes

- **Imágenes**: Asegúrate de que las imágenes sean libres de derechos o tengas permiso para usarlas
- **Optimización**: Las imágenes deben estar optimizadas (máximo 1MB por imagen)
- **Formatos**: Se recomienda usar JPG, PNG o GIF
- **Nombres**: Usa nombres descriptivos y sin espacios para las imágenes

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado para promover la educación ambiental en Chile.

---

**¡Únete a Plantalingo y aprende sobre el medio ambiente de Chile de manera interactiva y divertida!** 🌱🇨🇱 