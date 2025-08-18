// src/pages/PrototypePage.jsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PROTOTYPES } from "../prototypes";
import PrevNext from "../components/PrevNext";

// 👇 importa tus componentes
import CustomCursor from "../components/prototypes/CustomCursor";
import PlaygroundCard from "../components/prototypes/PlaygroundCard";
import VanishInput from "../components/prototypes/VanishInput";
import DarkModeToggle from "../components/DarkModeToggle";
import GooeyTooltip from "../components/prototypes/GooeyTooltip";
import PillNavBarDarkDock from "../components/prototypes/PillNavBarDarkDock";
import TodoBasic from "../components/prototypes/TodoBasic";
import Sidebar from "../components/prototypes/Sidebar";
import PrototypeLayout from "../components/PrototypeLayout";

export default function PrototypePage() {
  const { id } = useParams();
  const data = PROTOTYPES[id];
  const [enabled, setEnabled] = useState(false);
  const [seed, setSeed] = useState(null);

  // Preparar navegación anterior/posterior
  const prototypeIds = Object.keys(PROTOTYPES).map(Number).sort((a, b) => a - b);
  const currentIndex = prototypeIds.indexOf(Number(id));
  const prevId = currentIndex > 0 ? prototypeIds[currentIndex - 1] : null;
  const nextId = currentIndex >= 0 && currentIndex < prototypeIds.length - 1 ? prototypeIds[currentIndex + 1] : null;

  // Función para renderizar el contenido del prototipo
  const renderPrototypeContent = () => {
    // Caso especial: prototipo 1 con interacción
    if (id === "1") {
      return (
        <PrototypeLayout
          title="Custom Cursor + Hover Card"
          date="January 2025"
          description="Probá pasar el mouse por la card y el botón. El cursor reacciona a elementos interactivos."
          relative={true}
          customCursor={enabled && <CustomCursor seed={seed} />}
        >
          <div
            onMouseEnter={(e) => {
              setSeed({ x: e.clientX, y: e.clientY });
              setEnabled(true);
            }}
            onMouseLeave={() => setEnabled(false)}
            className={`transition-colors ${enabled ? "cursor-none" : ""}`}
          >
            <div className="grid place-items-center py-6">
              <PlaygroundCard />
            </div>
          </div>
        </PrototypeLayout>
      );
    }

    // ===== Prototype 2: Vanish Input =====
    if (id === "2") {
      return (
        <PrototypeLayout
          title="Vanish Input"
          date="February 2025"
          description="Escribí y presioná Enter: las letras se borran y el caret regresa a su lugar."
        >
          <div className="grid place-items-center py-8">
            <div className="w-full max-w-md">
              <VanishInput
                placeholder="¿Qué necesitas?"
                icon="🔍"
                minWidth={172}
                maxWidth={400}
                onSubmit={(text) => console.log("submit:", text)}
              />
            </div>
          </div>
        </PrototypeLayout>
      );
    }

    // ===== Prototype 3: Dark Mode Toggle (interactivo) =====
    if (id === "3") {
      return (
        <PrototypeLayout
          title="Dark Mode Toggle"
          date="March 2025"
          description="Alterná entre modo claro y oscuro para ver cómo cambian los componentes en tiempo real."
        >
          <div className="grid place-items-center py-6">
            <div className="scale-150">
              <DarkModeToggle />
            </div>
          </div>
        </PrototypeLayout>
      );
    }

    // ===== Prototype 4: Gooey Tooltip (interactivo) =====
    if (id === "4") {
      return (
        <PrototypeLayout
          title="Gooey Tooltip"
          date="March 2024"
          description="Pasá el mouse por el botón para ver el tooltip con efecto 'gooey'."
        >
          <div className="grid place-items-center py-8">
            {/* En card, no hace falta fullScreen */}
            <GooeyTooltip />
          </div>
        </PrototypeLayout>
      );
    }

    // ===== Prototype 5: Pill Nav Dock (embedded en card) =====
    if (id === "5") {
      return (
        <PrototypeLayout
          title="Pill Nav Dock"
          date="April 2025"
          description="Navbar dock embebida dentro de la caja."
        >
          {/* Área de demostración: la navbar se alinea al fondo de la caja */}
          <div className="relative h-48 flex items-end justify-center">
            <PillNavBarDarkDock embedded />
          </div>
        </PrototypeLayout>
      );
    }

    // ===== Prototype 6: Todo list + Animated Checkbox =====
    if (id === "6") {
      return (
        <PrototypeLayout
          title="Todo List + Animated Checkbox"
          date="May 2025"
          description="Checkbox con tick animado (stroke), glow y ripple al marcar."
        >
          <div className="grid place-items-center py-6">
            <TodoBasic />
          </div>
        </PrototypeLayout>
      );
    }

    // ===== Prototype 7: Sidebar demo (embebida) =====
    if (id === "7") {
      return (
        <PrototypeLayout
          title="Sidebar Demo"
          date="June 2025"
          className="overflow-x-hidden"
        >
          {/* Área de preview (tema dual) sin caja gris */}
          <div className="h-96 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-white flex overflow-x-hidden">
            {/* Sidebar embebida */}
            <Sidebar
              embedded
              initialCollapsed={false} // ponelo en true si querés arrancar colapsada
            />

            {/* Contenido de ejemplo */}
            <main className="flex-1 min-w-0 p-4 space-y-3 overflow-auto">
              <h2 className="text-lg font-semibold ml-8">Content</h2>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 h-24" />
                ))}
              </div>
            </main>
          </div>
        </PrototypeLayout>
      );
    }

    // Resto de prototipos (lo que ya tenías)
    if (!data) {
      return (
        <div className="bg-white text-black dark:bg-neutral-900 dark:text-white p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-end mb-4">
              <div className="flex items-center gap-4">
                {/* Toggle Dark Mode */}
                <DarkModeToggle />
              </div>
            </div>

            <div className="text-center">
              <div className="p-6 text-sm text-neutral-400">No prototype found for "{id}".</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white text-black dark:bg-neutral-900 dark:text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-4">
              {/* Toggle Dark Mode */}
              <DarkModeToggle />
            </div>
          </div>

          <div className="text-center">
            {data.type === "video" ? (
              <video
                src={data.src}
                autoPlay loop controls muted playsInline
                className="w-full h-auto"
                style={{ maxHeight: "70vh" }}
              />
            ) : data.type === "image" ? (
              <img src={data.src} alt={data.title} className="w-full h-auto" />
            ) : data.type === "iframe" ? (
              <iframe
                src={data.src}
                className="w-full"
                style={{ height: "70vh" }}
                allow="fullscreen"
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen overflow-x-hidden">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 pt-4">

        {/* Layout más compacto */}
        <div className="flex flex-col lg:flex-row lg:gap-x-[80px]">
          
          {/* RAIL IZQUIERDO: Volver + Título (sticky) */}
          <aside className="hidden lg:block lg:w-[200px] lg:flex-shrink-0">
            <div 
              style={{
                position: 'sticky',
                top: '31px',
                width: '200px',
                zIndex: 20,
                maxHeight: 'calc(100vh - 40px)',
                overflowY: 'auto'
              }}
            >
              {/* Volver */}
              <Link className="essay-back block mb-3" to="/">← Volver</Link>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-1 max-w-[800px] mx-auto">
            {/* Renderizar el contenido del prototipo */}
            {renderPrototypeContent()}

            {/* Prev / Next */}
            <div className="mt-8">
              <PrevNext
                prev={prevId ? { title: PROTOTYPES[prevId]?.title || `Prototype ${prevId}`, href: `/prototype/${prevId}` } : null}
                next={nextId ? { title: PROTOTYPES[nextId]?.title || `Prototype ${nextId}`, href: `/prototype/${nextId}` } : null}
              />
            </div>
          </div>

          {/* Espacio derecho más pequeño */}
          <div className="hidden lg:block lg:w-[200px] lg:flex-shrink-0" />
        </div>
      </div>
    </main>
  );
}
