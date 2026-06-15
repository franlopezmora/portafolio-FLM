# Portafolio personal — Francisco López Mora

Portafolio bilingüe de Francisco López Mora, desarrollador full-stack enfocado en construir productos web reales: sistemas SaaS, backoffices, dashboards, reservas, pagos y flujos de negocio.

La aplicación presenta proyectos, experiencia profesional, ensayos técnicos en MDX y prototipos interactivos. Mantiene una interfaz minimalista con modo oscuro, cambio de idioma, animaciones sutiles y placeholders LQIP para medios.

## Proyectos destacados

- **Pique**: proyecto principal de producto y startup. SaaS multi-club para reservas, agenda, clientes, caja, pagos, dashboards, clases, profesores, stock, POS básico y operaciones del club. Sitio público: [pique.ar](https://pique.ar/).
- **SGE — Sistema de Gestión Electoral**: experiencia profesional full-stack sobre flujos empresariales con Java, Struts, EJB, WildFly/JBoss, Oracle, Maven e Hibernate/JPA.
- **Calip Backoffice**: backoffice privado orientado a ventas, inventario, pagos, caja y dashboards administrativos, acompañado por una [web pública](https://calip-backoffice-storefront.vercel.app/).
- **CRUMA**: producto web para planificar horarios universitarios y resolver conflictos de materias y correlativas.
- **Driver Test Manager**: sistema distribuido con microservicios para coordinar pruebas de manejo.

## Stack real del portafolio

- **Vite**: entorno de desarrollo y build.
- **React 19**: interfaz y componentes.
- **React Router**: navegación SPA.
- **TailwindCSS**: estilos responsivos y modo oscuro.
- **Framer Motion**: animaciones.
- **MDX**: ensayos técnicos bilingües.
- **EmailJS**: formulario de contacto.
- **React Masonry CSS**: grilla de prototipos y ensayos.
- **PrismJS**: resaltado de código.
- **Sharp + script LQIP**: generación de placeholders para imágenes y videos.

Este repositorio usa Vite + React. No es un proyecto Next.js.

## Estructura principal

```text
src/
  components/           Componentes compartidos y secciones del home
  content/              Datos de proyectos, craft y navegación
  context/              Idioma y traducciones ES/EN
  essays/               Ensayos técnicos MDX
  pages/                Landing, proyectos, craft, ensayos y prototipos
  styles/               Estilos de ensayos y resaltado de código
scripts/
  build-lqip-from-homeitems.mjs
public/
  lqip/                 Placeholders generados
  media-manifest.json   Metadatos de medios generados
```

Contenido central:

- `src/content/projects.js`: proyectos del home y página de proyectos.
- `src/context/LanguageContext.jsx`: hero, experiencia y textos bilingües.
- `src/content/homeItems.js`: prototipos y ensayos mostrados en Craft.

## Desarrollo local

Requisitos:

- Node.js 20.19+ o 22.12+, versiones soportadas por Vite 7.
- npm.
- ffmpeg opcional, usado por LQIP cuando un video no tiene poster.

```bash
git clone https://github.com/franlopezmora/portafolio-FLM.git
cd portafolio-FLM
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # inicia Vite en desarrollo
npm run lint     # ejecuta ESLint
npm run lqip     # regenera placeholders y media-manifest.json
npm run build    # ejecuta LQIP y genera el build de Vite
npm run preview  # sirve el build localmente
```

## Funcionalidades

- Portfolio bilingüe en español e inglés.
- Modo claro y oscuro.
- Home con experiencia, productos destacados y componentes.
- Página de proyectos con búsqueda por nombre, descripción y tecnología.
- Ensayos MDX con navegación y bloques de código.
- Prototipos interactivos.
- Formulario de contacto mediante EmailJS.
- Animaciones y carga optimizada de imágenes y videos con LQIP.

## LQIP

`npm run lqip` procesa los medios definidos en `src/content/homeItems.js`, genera thumbnails en `public/lqip/` y actualiza `public/media-manifest.json`.

Conviene versionar esos archivos para que el build de despliegue no dependa de ffmpeg.

## Despliegue

El proyecto incluye configuración para Vercel en `vercel.json`. Al ser una SPA con React Router, esa configuración conserva el acceso directo a sus rutas.

## Contacto

- Email: franciscolopezmora3@gmail.com
- GitHub: [franlopezmora](https://github.com/franlopezmora)
- LinkedIn: [Francisco López Mora](https://www.linkedin.com/in/franciscolopezmora/)
