import { Link } from "react-router-dom";

export default function ProyectoCard({
  titulo, descripcion, gif, essay, fecha,
  prototype, protoLabel = "View Prototype",
  overlayPos = "bottom",
  titleColor = "light",
  essayLabel = "Read Essay",
}) {
  const isVideo = typeof gif === "string" && /\.(mp4|webm)$/i.test(gif);
  const isExternalPrototype = typeof prototype === "string" && /^https?:\/\//i.test(prototype);

    // Detectamos essay como ruta interna o link externo
  const essayIsRoute    = typeof essay === "string" && essay.startsWith("/");
  const essayIsExternal = typeof essay === "string" && /^https?:\/\//i.test(essay);

  const showEssayLinkBtn = essayIsRoute || essayIsExternal;
  const showEssayBlock   = !!(essay && !showEssayLinkBtn);  
  const showProtoBtn     = !!prototype;
  const showActions      = showEssayBlock || showEssayLinkBtn || showProtoBtn;
  const showDescription  = !!descripcion;

  const fullBleedOnly = !showActions && !showDescription;

  const ctaClasses = `
    block w-full text-center text-sm font-medium py-2 rounded-lg
    bg-neutral-200 text-gray-900 hover:bg-neutral-300
    dark:bg-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-700
    transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 dark:focus-visible:ring-black/40
  `;

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
        <div
          className={`absolute inset-0 rounded-[inherit] pointer-events-none
            ${overlayPos === "top"
              ? "bg-gradient-to-b from-black/55 via-black/10 to-transparent"
              : "bg-gradient-to-t from-black/55 via-black/10 to-transparent"
            }`}
        />

        <div className={`absolute inset-0 flex
          ${overlayPos === "top" ? "items-start" : "items-end"}`}>
          <div className={`relative z-10 flex w-full items-center justify-between
              p-2 ${overlayPos === "top" ? "pt-2" : "pb-2"}`}>
            <h2 className={`truncate max-w-[70%] ${ titleColor === "dark"
                ? "text-neutral-900"
                : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            }`}>
              {titulo}
            </h2>
            {fecha && (
              <p className="truncate max-w-[70%] text-gray-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
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

          {showProtoBtn && (
            isExternalPrototype ? (
              <a href={prototype} target="_blank" rel="noopener noreferrer" className={ctaClasses}>
                {protoLabel}
              </a>
            ) : (
              <Link to={prototype} className={ctaClasses}>
                {protoLabel}
              </Link>
            )
          )}

          {showEssayLinkBtn && (
            essayIsExternal ? (
              <a href={essay} target="_blank" rel="noopener noreferrer" className={ctaClasses}>
                {essayLabel}
              </a>
            ) : (
              <Link to={essay} className={ctaClasses}>
                {essayLabel}
              </Link>
            )
          )}
        </div>
      )}
    </article>
  );
}
