export default function ProyectoCard({ titulo, descripcion, gif, essay, proto }) {
  const isVideo = typeof gif === "string" && /\.(mp4|webm)$/i.test(gif);

  return (
    <article
      className="
        break-inside-avoid rounded-xl border p-4 shadow-sm
        bg-white text-neutral-900 border-neutral-200
        dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700
        transition-colors duration-200
      "
    >
      {/* Media */}
      {gif ? (
        isVideo ? (
          <video
            src={gif}
            autoPlay
            loop
            muted
            playsInline
            className="w-full rounded-lg mb-3 object-contain"
          />
        ) : (
          <img
            src={gif}
            alt={titulo}
            className="w-full rounded-lg mb-3 object-contain"
            loading="lazy"
          />
        )
      ) : (
        // Fallback si no hay gif: shimmer sutil
        <div
          className="
            w-full h-40 rounded-lg mb-3
            bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200
            dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700
            animate-pulse
          "
          aria-hidden="true"
        />
      )}

      {/* Texto */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold">{titulo}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{descripcion}</p>
          <p className="text-xs text-neutral-400 mt-1">Junio 2025</p>
        </div>

        {(essay || proto) && (
          <div className="mt-4 space-y-2">
            {essay && (
              <div
                className="
                  text-sm text-center py-2 rounded-lg border
                  bg-neutral-100 text-neutral-800 border-neutral-200
                  dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
                "
              >
                {essay}
              </div>
            )}
            {proto && (
              <div
                className="
                  text-sm text-center py-2 rounded-lg border
                  bg-neutral-100 text-neutral-800 border-neutral-200
                  dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
                "
              >
                {proto}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
