import Masonry from "react-masonry-css";
import ProyectoCard from "../components/ProyectoCard";
import DarkModeToggle from "../components/DarkModeToggle";
import { homeItems } from "../content/homeItems";

// Mapeo directo de meses en español a inglés
const ES_MONTHS = {
  "enero": "January", "febrero": "February", "marzo": "March", "abril": "April", 
  "mayo": "May", "junio": "June", "julio": "July", "agosto": "August", 
  "septiembre": "September", "octubre": "October", 
  "noviembre": "November", "diciembre": "December",
  "Enero": "January", "Febrero": "February", "Marzo": "March", "Abril": "April", 
  "Mayo": "May", "Junio": "June", "Julio": "July", "Agosto": "August", 
  "Septiembre": "September", "Octubre": "October", 
  "Noviembre": "November", "Diciembre": "December"
};

const parseDate = (d) => {
  if (!d) return 0;
  
  // ej: "Agosto 2025" -> "01 August 2025"
  const match = d.match(/^([a-zA-ZáéíóúñÁÉÍÓÚÑ]+)\s+(\d{4})$/);
  if (match) {
    const [, month, year] = match;
    const englishMonth = ES_MONTHS[month];
    if (englishMonth) {
      return Date.parse(`01 ${englishMonth} ${year}`);
    }
  }
  return 0;
};

export default function Home() {
  // Ordená igual que querés que navegue Prev/Next (más nuevo primero)
  const proyectos = [...homeItems].sort((a,b) => parseDate(b.fecha) - parseDate(a.fecha));

  const breakpointColumnsObj = { default: 3, 960: 2, 480: 1 };

  return (
    <main className="min-h-screen px-1 sm:px-1 py-2 bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors overflow-x-hidden">
      <div className="mx-auto w-full px-1">
        <div className="sticky top-1 z-50 flex justify-end mb-3">
          <DarkModeToggle />
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-x-2 justify-center"
          columnClassName="masonry-column"
        >
          {proyectos.map((p, idx) => (
            <ProyectoCard key={idx} {...p} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
