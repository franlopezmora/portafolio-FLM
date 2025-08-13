import Masonry from "react-masonry-css";
import ProyectoCard from "../components/ProyectoCard";
import DarkModeToggle from "../components/DarkModeToggle";
import { homeItems } from "../content/homeItems";

// (opcional) parse robusto por si alguna fecha viene como "Junio 2025"
const parseDate = (d) => {
  if (!d) return 0;
  const t = Date.parse(d);
  if (!Number.isNaN(t)) return t;
  // ej: "Junio 2025" -> 01 Junio 2025
  try { return Date.parse(d.replace(/(\w+)\s+(\d{4})/, "01 $1 $2")); } catch { return 0; }
};

export default function Home() {
  // Ordená igual que querés que navegue Prev/Next (más nuevo primero)
  const proyectos = [...homeItems].sort((a,b) => parseDate(b.fecha) - parseDate(a.fecha));

  const breakpointColumnsObj = { default: 3, 1024: 3, 768: 2, 0: 1 };

  return (
    <main className="min-h-screen px-2 sm:px-2 py-2 bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors">
      <div className="sticky top-2 z-50 flex justify-end pr-2 mb-1">
        <DarkModeToggle />
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-x-2"
        columnClassName="masonry-column"
      >
        {proyectos.map((p, idx) => (
          <ProyectoCard key={idx} {...p} />
        ))}
      </Masonry>
    </main>
  );
}
