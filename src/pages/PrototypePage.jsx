// src/pages/PrototypePage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PROTOTYPES } from "../prototypes";

// 👇 importa tus componentes
import CustomCursor from "../components/prototypes/CustomCursor";
import PlaygroundCard from "../components/prototypes/PlaygroundCard";

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
            <Link to="/" className="text-sm underline">← Back</Link>
          </div>

          {/* ⬇️ Este es el contenedor grande */}
            <div
            onMouseEnter={(e) => {
                setSeed({ x: e.clientX, y: e.clientY }); // posición actual del mouse
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
