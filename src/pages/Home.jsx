import Masonry from "react-masonry-css"
import ProyectoCard from "../components/ProyectoCard"
import DarkModeToggle from "../components/DarkModeToggle"

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


export default function Home() {
  const proyectos = [
    {
      titulo: "Custom Cursor",
      descripcion: "",
      gif: "public/gifs/gestor-turnos.mp4",
      prototype: "/prototype/1",
    },
    {
      titulo: "Vanish Input",
      descripcion: "",
      gif: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/vanish-input/vanish-input.mp4",
      webm: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/vanish-input/vanish-input.webm",
      poster: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/vanish-input/vanish-input-poster.jpg",
      prototype: "/prototype/2",
      playbackRate: 1.9,      
    },
    {
      titulo: "Dark Mode Toggle",
      descripcion: "",
      gif: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/dark-mode-toggle/dark-mode-toggle.mp4",
      webm: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/dark-mode-toggle/dark-mode-toggle.webm",
      poster: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/dark-mode-toggle/dark-mode-toggle-poster.jpg",
      prototype: "/prototype/3", 
    },
    {
      titulo: "Gooey Tooltip",
      descripcion: "",
      gif: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/gooey-tooltip/gooey-tooltip.mp4",
      webm: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/gooey-tooltip/gooey-tooltip.webm",
      poster: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/gooey-tooltip/gooey-tooltip-poster.jpg",
      prototype: "/prototype/4", 
    },
    {
      titulo: "Pill Nav Dock",
      descripcion: "",
      gif: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/nav-dock.mp4",
      webm: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/nav-dock.webm",
      poster: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/nav-dock-poster.jpg",
      prototype: "/prototype/5",
    },
    {
      titulo: "Animated Checkbox",
      descripcion: "",
      gif: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/animated-checkbox/animated-checkbox.mp4",
      webm: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/animated-checkbox/animated-checkbox.webm",
      poster: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/animated-checkbox/animated-checkbox-poster.jpg",
      prototype: "/prototype/6",
      titleColor: "dark",
      fecha: "Enero 2025"
    },
    {
      titulo: "Side Bar",
      descripcion: "",
      fecha: "Junio 2025",
      prototype: "/prototype/7",
gif: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/side-bar/side-bar.mp4",
webm: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/side-bar/side-bar.webm",
poster: "https://cdn.jsdelivr.net/gh/franlopezmora/portfolio-assets@main/videos/side-bar/side-bar-poster.jpg",
},
    {
      titulo: "Animación de personaje",
      descripcion: "",
      gif: "",
      essay: "http://localhost:5173/prototype/3",
      overlayPos: "top",
      titleColor: "dark",
      fecha: "Marzo 2025",
    },
    {
      titulo: "Dashboard de pruebas",
      descripcion: "",
      gif: "",
      prototype: "View Prototype →"
    }
  ]
//const proyectosDesordenados = shuffle(proyectos)

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    0: 1
  }

  return (
    <main className="min-h-screen px-2 sm:px-2 py-2 bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors">
      <div className="sticky top-2 z-50 flex justify-end pr-2 mb-1">
        <DarkModeToggle />
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-x-2"        // horizontal gap reducido
        columnClassName="masonry-column"
      >
        {proyectos.map((p, idx) => (
          <ProyectoCard key={idx} {...p} />
        ))}
      </Masonry>
    </main>
  )
}