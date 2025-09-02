# 🌐 Portafolio Personal Fullstack

Este es mi portafolio como desarrollador fullstack, donde muestro proyectos destacados que abarcan desde frontend interactivo hasta backend con microservicios. La interfaz está inspirada en el estilo visual de [rauno.me](https://rauno.me), con un diseño tipo masonry, animaciones suaves y efectos visuales minimalistas.

## 🛠️ Tecnologías utilizadas

- **React 19** – para el frontend dinámico
- **TailwindCSS** – para el estilo moderno y responsivo
- **React Masonry** – para el layout tipo masonry
- **React Router** – para navegación SPA
- **MDX** – para contenido dinámico de ensayos
- **Vite** – para el entorno de desarrollo ultrarrápido
- **Lucide React** – para iconografía moderna

## 📂 Estructura del proyecto

```
/src
  ├─ /components
  │   ├─ /prototypes          # Componentes de prototipos interactivos
  │   │   ├─ CustomCursor.jsx
  │   │   ├─ DarkModeToggle.jsx
  │   │   ├─ GooeyTooltip.jsx
  │   │   ├─ PillNavBarDarkDock.jsx
  │   │   ├─ PlaygroundCard.jsx
  │   │   ├─ Sidebar.jsx
  │   │   ├─ TodoBasic.jsx
  │   │   └─ VanishInput.jsx
  │   ├─ PrototypeLayout.jsx  # Layout común para prototipos
  │   ├─ DarkModeToggle.jsx   # Toggle de modo oscuro
  │   ├─ ProyectoCard.jsx     # Tarjetas de proyectos
  │   ├─ PrevNext.jsx         # Navegación entre páginas
  │   └─ EssayImage.jsx       # Componente para imágenes en ensayos
  ├─ /pages
  │   ├─ Home.jsx             # Página principal con masonry
  │   ├─ PrototypePage.jsx    # Página de prototipos
  │   └─ EssayPage.jsx        # Página de ensayos con TOC
  ├─ /essays                  # Contenido MDX
  │   └─ crafting-cruma.mdx   # Ensayo sobre Cruma
  ├─ /styles                  # Estilos CSS personalizados
  │   └─ essay.css            # Estilos específicos para ensayos
  ├─ /content                 # Datos de proyectos
  │   ├─ homeItems.js         # Configuración de proyectos
  │   └─ ordering.js          # Orden de navegación
  └─ /images                  # Imágenes estáticas
```

## 🚀 Cómo correr el proyecto

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/franlopezmora/portafolio-FLM.git
   cd portafolio-FLM
   ```

2. Instalá dependencias:
   ```bash
   npm install
   ```

3. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 🎯 Características principales

### 🏠 Página Principal
- **Layout Masonry** – Grid responsivo con tarjetas de proyectos
- **Modo oscuro** – Toggle automático con persistencia en localStorage
- **Diseño centrado** – Contenido centrado a 1100px máximo
- **Sin scroll horizontal** – Optimizado para evitar overflow

### 📝 Sistema de Ensayos
- **TOC fijo** – Tabla de contenidos que permanece en posición al hacer scroll
- **Imágenes adaptativas** – Fijas a 900px, se adaptan fluidamente por debajo
- **Texto centrado** – Contenido limitado a 720px para mejor legibilidad
- **Responsive inteligente** – TOC se oculta <1200px, contenido se centra

### 🎨 Prototipos Interactivos
- **7 prototipos** – Demos en vivo de componentes UI
- **Layout consistente** – Header con título, fecha y toggle de modo oscuro
- **Navegación prev/next** – Entre prototipos y ensayos
- **Componentes embebidos** – Sidebar, tooltips, inputs animados

### 🎨 Diseño y UX
- **Paleta neutral** – Grises y blancos con soporte para modo oscuro
- **Tipografía clara** – Jerarquía visual bien definida
- **Animaciones sutiles** – Transiciones suaves sin ser intrusivas
- **Accesibilidad** – Navegación por teclado y ARIA labels

## 📱 Responsividad

- **Desktop (>1200px)**: Layout completo con TOC fijo y contenido centrado
- **Tablet (960-1199px)**: TOC oculto, contenido centrado, imágenes adaptativas
- **Mobile (<960px)**: Layout de una columna, masonry responsivo

## 🧠 Inspiración

Este diseño está inspirado en la estética limpia y funcional de [rauno.me](https://rauno.me), adaptado para mostrar mis propios proyectos y experiencia como desarrollador fullstack.

## 📬 Contacto

- **Email**: franciscolopezmora3@gmail.com
- **GitHub**: [franlopezmora](https://github.com/franlopezmora)
- **LinkedIn**: [Francisco López Mora](https://www.linkedin.com/in/franciscolopezmora/)

---

*Desarrollado con ❤️ en React y Vite*
