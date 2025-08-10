import { Link } from "react-router-dom";

export default function ProyectoCard({
  titulo, descripcion, gif, essay, fecha,
  prototype, protoLabel = "View Prototype",
}) {
  const isVideo = typeof gif === "string" && /\.(mp4|webm)$/i.test(gif);
  const isExternalPrototype = typeof prototype === "string" && /^https?:\/\//i.test(prototype);
  const isExternalEssay = typeof essay === "string" && /^https?:\/\//i.test(essay);

  const showEssayBlock   = !!(essay && !isExternalEssay);
  const showEssayLinkBtn = !prototype && isExternalEssay;
  const showProtoBtn     = !!prototype;
  const showActions      = showEssayBlock || showEssayLinkBtn || showProtoBtn;
  const showDescription  = !!descripcion;

  const fullBleedOnly = !showActions && !showDescription;

  return (
    <article
      className={`
        break-inside-avoid rounded-xl border shadow-sm
        bg-white text-neutral-900 border-neutral-200
        dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700
        transition-colors duration-200
        ${fullBleedOnly ? "p-0" : "p-1"}
      `}
    >
      {/* Media */}
      <div
        className={`
          relative overflow-hidden
          ${fullBleedOnly ? "rounded-xl" : "rounded-lg"}
          bg-neutral-100 dark:bg-neutral-700 aspect-[16/9]
        `}
      >
        {gif ? (
          isVideo ? (
            <video src={gif} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <img src={gif} alt={titulo} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          )
        ) : (
          <div className="absolute inset-0 animate-pulse" />
        )}

        {/* Gradiente + overlay */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-end">
          <div className="relative z-10 flex w-full items-end justify-between p-2">
            <h2 className="truncate max-w-[70%] text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              {titulo}
            </h2>
            {fecha && (
              <p className="truncate max-w-[70%] text-gray-400 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {fecha}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Descripción */}
      {showDescription && !fullBleedOnly && (
        <div className="px-1 pt-1">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{descripcion}</p>
        </div>
      )}

      {/* Acciones */}
      {!fullBleedOnly && showActions && (
        <div className="mt-1 space-y-2">
          {showEssayBlock && (
            <div className="
              text-sm text-center py-2 rounded-lg border
              bg-neutral-100 text-neutral-900 border-neutral-200
              dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
            ">
              {essay}
            </div>
          )}

          {showProtoBtn ? (
            isExternalPrototype ? (
              <a
                href={prototype}
                target="_blank" rel="noopener noreferrer"
                className="block w-full text-center text-sm font-medium py-2 rounded-lg
                           bg-neutral-100 text-neutral-900 border border-neutral-200
                           dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
                           hover:bg-neutral-200/70 dark:hover:bg-neutral-600/80 transition"
              >
                {protoLabel}
              </a>
            ) : (
              <Link
                to={prototype}
                className="block w-full text-center text-sm font-medium py-2 rounded-lg
                           bg-neutral-100 text-neutral-900 border border-neutral-200
                           dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
                           hover:bg-neutral-200/70 dark:hover:bg-neutral-600/80 transition"
              >
                {protoLabel}
              </Link>
            )
          ) : showEssayLinkBtn ? (
            <a
              href={essay}
              target="_blank" rel="noopener noreferrer"
              className="block w-full text-center text-sm font-medium py-2 rounded-lg
                         bg-neutral-100 text-neutral-900 border border-neutral-200
                         dark:bg-neutral-700 dark:text-white/90 dark:border-white/10
                         hover:bg-neutral-200/70 dark:hover:bg-neutral-600/80 transition"
            >
              Read Essay
            </a>
          ) : null}
        </div>
      )}
    </article>
  );
}
