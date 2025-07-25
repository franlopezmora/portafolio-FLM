import Masonry from "react-masonry-css"
import ProyectoCard from "./components/ProyectoCard"

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


export default function App() {
  const proyectos = [
    {
      titulo: "Gestor de turnos",
      descripcion: "Sistema para turnos de lavadero a domicilio",
      gif: "public/gifs/gestor-turnos.mp4",
      essay: "Read Essay →"
    },
    {
      titulo: "TPI Backend 2025",
      descripcion: "Microservicios con reportes y notificaciones",
      gif: "public/gifs/gestor-turnos-sin-comprimir.mp4",
      proto: "View Prototype →"
    },
    {
      titulo: "Buscador de películas",
      descripcion: "Frontend que consume la API de TMDB",
      gif: "public/gifs/gestor-turnos-sin-comprimir-tanto.mp4"
    },
    {
      titulo: "Editor de código",
      descripcion: "Un editor de markdown con vista previa en tiempo real",
      gif: "",
      essay: "Read Essay →"
    },
    {
      titulo: "Notificador por Discord",
      descripcion: "Sistema de alertas backend con microservicios",
      gif: "https://media4.giphy.com/media/v1.Y2lkPTgyYTE0OTNibGQyeGl4MXY3amdtc3U1ZDMxYzcyNGptNW10ZXd4dzB5MGExbmZ4eSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/3CCXHZWV6F6O9VQ7FL/giphy.webp"
    },
    {
      titulo: "TP Redes IP",
      descripcion: "Visualizador de topologías con simulación de paquetes",
      gif: "https://media3.giphy.com/media/v1.Y2lkPTgyYTE0OTNibGQyeGl4MXY3amdtc3U1ZDMxYzcyNGptNW10ZXd4dzB5MGExbmZ4eSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/tHIRLHtNwxpjIFqPdV/giphy.webp",
      proto: "View Prototype →"
    },
    {
      titulo: "Calculadora reactiva",
      descripcion: "Ejercicio interactivo de investigación operativa",
      gif: "https://media0.giphy.com/media/v1.Y2lkPTgyYTE0OTNibGQyeGl4MXY3amdtc3U1ZDMxYzcyNGptNW10ZXd4dzB5MGExbmZ4eSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/Pkm4BdrRYlfiKPGJiW/giphy.webp"
    },
    {
      titulo: "Animación de personaje",
      descripcion: "Diseño de indumentaria digital con movimientos",
      gif: "https://media1.giphy.com/media/v1.Y2lkPTgyYTE0OTNiYnd1dTBobXcyYXFrOTZ6YnVmdTgwaTh3ZGt1Z3p0bnpvOHhucTVrYyZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/RB46T9ysjzDEs/200.webp",
      essay: "Read Essay →"
    },
    {
      titulo: "Dashboard de pruebas",
      descripcion: "Estadísticas en vivo de las pruebas de vehículos",
      gif: "https://media3.giphy.com/media/v1.Y2lkPTgyYTE0OTNiOHZoeDcxcTV2N3M4cGN4amNibTl3Y3EzbjF1eHZ4aDY4d3VjMXZtMSZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/3oEjI80DSa1grNPTDq/200.webp",
      proto: "View Prototype →"
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
    <main className="bg-neutral-50 text-black min-h-screen px-2 sm:px-2 py-2">
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