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
      gif: "public/gifs/gestor-turnos-sin-comprimir.mp4",
      prototype: "/prototype/2",      
    },
    {
      titulo: "Dark Mode Toggle",
      descripcion: "",
      gif: "public/gifs/gestor-turnos-sin-comprimir-tanto.mp4",
      prototype: "/prototype/3", 
    },
    {
      titulo: "Gooey Tooltip",
      descripcion: "",
      gif: "",
      prototype: "/prototype/4", 
    },
    {
      titulo: "Pill Nav Dock",
      descripcion: "",
      gif: "",
      prototype: "/prototype/5",
    },
    {
      titulo: "Animated Checkbox",
      descripcion: "",
      gif: "",
      prototype: "/prototype/6",
      fecha: "Enero 2025"
    },
    {
      titulo: "Calculadora reactiva",
      descripcion: "",
      fecha: "Marzo 2025",
      gif: ""
    },
    {
      titulo: "Animación de personaje",
      descripcion: "",
      gif: "",
      essay: "Read Essay",
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