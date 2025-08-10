import { Link } from "react-router-dom";

export default function ProyectoCard({
  titulo, descripcion, gif, essay, fecha,
  prototype, protoLabel = "View Prototype →"
}) {
  const isVideo = typeof gif === "string" && /\.(mp4|webm)$/i.test(gif);
  const isExternal = typeof prototype === "string" && /^https?:\/\//i.test(prototype);

  return (
    <article className="
      break-inside-avoid rounded-xl border p-4 shadow-sm
      bg-white text-neutral-900 border-neutral-200
      dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700
      transition-colors duration-200
    ">
      {gif ? (
        isVideo ? (
          <video src={gif} autoPlay loop muted playsInline className="w-full rounded-lg mb-3 object-contain" />
        ) : (
          <img src={gif} alt={titulo} className="w-full rounded-lg mb-3 object-contain" loading="lazy" />
        )
      ) : (
        <div className="w-full h-40 rounded-lg mb-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
      )}

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold">{titulo}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{descripcion}</p>
          <p className="text-xs text-neutral-400 mt-1">{fecha}</p>
        </div>

        {(essay || prototype) && (
          <div className="mt-4 space-y-2">
            {essay && (
              <div className="
                text-sm text-center py-2 rounded-lg border
                bg-neutral-100 text-neutral-800 border-neutral-200
                dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
              ">
                {essay}
              </div>
            )}

            {prototype && (
              isExternal ? (
                <a
                  href={prototype}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-center py-2 rounded-lg border
                             bg-neutral-900 text-white border-neutral-700
                             dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-300
                             hover:opacity-90 transition"
                >
                  {protoLabel}
                </a>
              ) : (
                <Link
                  to={prototype}
                  className="block text-sm text-center py-2 rounded-lg border
                             bg-neutral-900 text-white border-neutral-700
                             dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-300
                             hover:opacity-90 transition"
                >
                  {protoLabel}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </article>
  );
}
