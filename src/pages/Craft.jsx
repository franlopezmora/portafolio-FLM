import Masonry from "react-masonry-css";
import ProyectoCard from "../components/ProyectoCard";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { homeItems } from "../content/homeItems";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect, useMemo } from "react";
import { fetchManifest, buildBySrcMap, pickMeta } from "../utils/mediaManifest";

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

export default function Craft() {
  // Ordená igual que querés que navegue Prev/Next (más nuevo primero)
  const proyectos = [...homeItems].sort((a,b) => parseDate(b.fecha) - parseDate(a.fecha));

  const breakpointColumnsObj = { default: 3, 960: 2, 480: 1 };
  
  // Hook para animación del masonry
  const [masonryRef, masonryVisible] = useScrollAnimation(0);
  const [videosReady, setVideosReady] = useState(true); // Cambiar a true para mostrar cards inmediatamente

  // Manifest desde public (no se puede importar desde /public)
  const [manifestData, setManifestData] = useState([]);
  useEffect(() => { fetchManifest().then(setManifestData); }, []);
  const bySrc = useMemo(() => buildBySrcMap(manifestData), [manifestData]);

  // Activar videos después de que la animación termine
  useEffect(() => {
    if (masonryVisible) {
      const timer = setTimeout(() => {
        setVideosReady(true);
      }, 200); // Reducido a 200ms para carga más rápida
      return () => clearTimeout(timer);
    }
  }, [masonryVisible]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white overflow-x-hidden pt-28 md:pt-28 pb-24">
        <div className="mx-auto px-5">

        <div 
          ref={masonryRef}
          className={`transition-transform duration-300 ease-out will-change-transform ${
            masonryVisible 
              ? 'translate-y-0' 
              : 'translate-y-2'
          }`}
          style={{
            transform: masonryVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 8px, 0)',
            opacity: masonryVisible ? 1 : 0
          }}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-x-2 justify-center"
            columnClassName="masonry-column"
          >
            {proyectos.map((p, idx) => {
              const meta = pickMeta(bySrc, p);
              const initialRatio = meta ? (meta.w / meta.h) : null;
              const initialBlurSrc = meta?.lqip ?? null;
              const poster = meta?.poster ?? p.poster;

              return (
                <ProyectoCard
                  key={`${p.titulo}-${idx}`}
                  {...p}
                  poster={poster}
                  initialRatio={initialRatio}
                  initialBlurSrc={initialBlurSrc}
                  videosReady={videosReady}
                />
              );
            })}
          </Masonry>
        </div>
        </div>
        <BottomNav />
      </main>
    </>
  );
}


