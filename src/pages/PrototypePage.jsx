// src/pages/PrototypePage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PROTOTYPES } from "../prototypes";

// 👇 importa tus componentes
import CustomCursor from "../components/prototypes/CustomCursor";
import PlaygroundCard from "../components/prototypes/PlaygroundCard";
import VanishInput from "../components/prototypes/VanishInput";
import DarkModeDemo from "../components/prototypes/DarkModeDemo";
import GooeyTooltip from "../components/prototypes/GooeyTooltip";

export default function PrototypePage() {
  const { id } = useParams();
  const data = PROTOTYPES[id];
  const [enabled, setEnabled] = useState(false);
  const [seed, setSeed] = useState(null); // {x,y} para iniciar el cursor custom sin saltos

// Caso especial: prototipo 1 con interacción
if (id === "1") {
  return (
    <div className="relative min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white p-4">
      {/* Cursor custom SOLO cuando estás dentro del contenedor grande */}
      {enabled && <CustomCursor seed={seed} />}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Prototype: Custom Cursor + Hover Card</h1>

          <div className="flex items-center gap-4">
            {/* Toggle Dark Mode */}
            <DarkModeDemo />
            <Link to="/" className="text-sm underline">← Back</Link>
          </div>
        </div>

        {/* ⬇️ Este es el contenedor grande */}
        <div
          onMouseEnter={(e) => {
            setSeed({ x: e.clientX, y: e.clientY });
            setEnabled(true);
          }}
          onMouseLeave={() => setEnabled(false)}
          className={`rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/5 dark:bg-neutral-800/50 p-8 transition-colors
            ${enabled ? "cursor-none" : ""}`}
        >
          <p className="text-neutral-500 mb-6">
            Probá pasar el mouse por la card y el botón. El cursor reacciona a elementos interactivos.
          </p>

          <div className="grid place-items-center py-8">
            <PlaygroundCard />
          </div>
        </div>
      </div>
    </div>
  );
}


// ===== Prototype 2: Vanish Input =====
if (id === "2") {
  return (
    <div className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Prototype: Vanish Input</h1>

          <div className="flex items-center gap-4">
            {/* Toggle Dark Mode */}
            <DarkModeDemo />
            <Link to="/" className="text-sm underline">← Back</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/5 dark:bg-neutral-800/50 p-8">
          <p className="text-neutral-500 mb-6">
            Escribí y presioná <kbd>Enter</kbd>: las letras se borran y el caret regresa a su lugar.
          </p>

          <div className="grid place-items-center py-12">
            <VanishInput
              size="xl"
              fontSize={28}
              iconSize={30}
              paddingX={22}
              paddingY={16}
              minWidth={325}
            />

          </div>
        </div>
      </div>
    </div>
  );
}


// ===== Prototype 3: Dark Mode Toggle (interactivo)
if (id === "3") {
  return (
    <div className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Prototype: Dark Mode Toggle</h1>
          <Link to="/" className="text-sm underline">← Back</Link>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/5 dark:bg-neutral-800/50 p-8">
          <p className="text-neutral-500 mb-6">
            Alterná entre modo claro y oscuro para ver cómo cambian los componentes en tiempo real.
          </p>

          <div className="grid place-items-center py-8">
              <div className="scale-150">
                
                <DarkModeDemo />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Prototype 4: Gooey Tooltip (interactivo)
if (id === "4") {
  return (
    <div className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Prototype: Gooey Tooltip</h1>
          <div className="flex items-center gap-4">
            {/* Toggle Dark Mode */}
            <DarkModeDemo />
            <Link to="/" className="text-sm underline">← Back</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/5 dark:bg-neutral-800/50 p-8">
          <p className="text-neutral-500 mb-6">
            Pasá el mouse por el botón para ver el tooltip con efecto “gooey”.
          </p>

          <div className="grid place-items-center py-12">
            {/* En card, no hace falta fullScreen */}
            <GooeyTooltip />
          </div>
        </div>
      </div>
    </div>
  );
}



  // Resto de prototipos (lo que ya tenías)
  return (
    <div className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Prototype: {data?.title ?? id}</h1>
          <Link to="/" className="text-sm underline">← Back</Link>
        </div>

        <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-800">
          {!data ? (
            <div className="p-8 text-sm text-neutral-400">No prototype found for “{id}”.</div>
          ) : data.type === "video" ? (
            <video
              src={data.src}
              autoPlay loop controls muted playsInline
              className="w-full h-auto"
              style={{ maxHeight: "80vh" }}
            />
          ) : data.type === "image" ? (
            <img src={data.src} alt={data.title} className="w-full h-auto" />
          ) : data.type === "iframe" ? (
            <iframe
              src={data.src}
              className="w-full"
              style={{ height: "80vh" }}
              allow="fullscreen"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
