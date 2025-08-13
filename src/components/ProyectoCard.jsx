import { Link, useNavigate } from "react-router-dom";

export default function ProyectoCard({
  titulo, descripcion, gif, webm, poster, essay, fecha,
  prototype, protoLabel = "View Prototype",
  overlayPos = "bottom",
  titleColor = "light",
  essayLabel = "Read Essay",
  playbackRate = 1,
}) {
  const navigate = useNavigate();

  const isExternalPrototype = typeof prototype === "string" && /^https?:\/\//i.test(prototype);
  const essayIsRoute    = typeof essay === "string" && essay.startsWith("/");
  const essayIsExternal = typeof essay === "string" && /^https?:\/\//i.test(essay);
  const dest = essay
    ? (essayIsExternal ? { type: "external", url: essay } : { type: "route", url: essay })
    : prototype
      ? (isExternalPrototype ? { type: "external", url: prototype } : { type: "route", url: prototype })
      : null;

  const hasDest = !!dest;
  const showEssayLinkBtn = essayIsRoute || essayIsExternal;
  const showEssayBlock   = !!(essay && !showEssayLinkBtn);
  const showProtoBtn     = !!prototype;
  const showDescription  = !!descripcion;
  const showActions      = showEssayBlock || showEssayLinkBtn || showProtoBtn;

  const hasVideo = (gif && /\.mp4$/i.test(gif)) || (webm && /\.webm$/i.test(webm));
  const fullBleedOnly = !showActions && !showDescription;

  // 👇 Nuevo: mostrar gradiente SOLO si no hay media alguna
  const showGradient = !(hasVideo || (gif && !/\.mp4$/i.test(gif)) || poster);

  const ctaClasses = `
    block w-full text-center text-sm font-medium py-2 rounded-lg
    bg-neutral-200 text-gray-900 hover:bg-neutral-300
    dark:bg-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-700
    transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 dark:focus-visible:ring-black/40
  `;

  const handleCardClick = () => {
    if (!dest) return;
    if (dest.type === "external") {
      window.open(dest.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(dest.url);
    }
  };

  return (
    <article
      className={`
        break-inside-avoid rounded-[8px] border shadow-sm
        bg-white text-neutral-900 border-neutral-200
        dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700
        transition-colors duration-200 transform
        ${fullBleedOnly ? "p-0" : "p-1"}
        ${hasDest ? "cursor-pointer" : "cursor-default"}
      `}
      style={{ borderRadius: "8px" }}
      role={hasDest ? "link" : undefined}
      tabIndex={hasDest ? 0 : undefined}
      aria-label={hasDest ? `Abrir: ${essay ? `essay de ${titulo}` : titulo}` : undefined}
      onClick={handleCardClick}
      onKeyDown={(e) => hasDest && (e.key === "Enter" || e.key === " ") && handleCardClick()}
    >
      {/* Media */}
      <div
        className={`
          relative overflow-hidden rounded-[8px]
          bg-neutral-100 dark:bg-neutral-700
        `}
      >
        {hasVideo ? (
          <video
            playsInline
            autoPlay
            muted
            key={`${webm}|${gif}|${poster}`} 
            defaultmuted="true"
            loop
            preload="metadata"
            poster={poster}
            className="w-full h-auto block rounded-[8px]"
            style={{ borderRadius: "8px" }}
            onLoadedMetadata={(e) => { e.currentTarget.playbackRate = playbackRate; }}
            onPlay={(e) => { if (e.currentTarget.playbackRate !== playbackRate) e.currentTarget.playbackRate = playbackRate; }}
          >
            {webm && <source src={`${webm}#t=0.01`} type="video/webm" />}
            {gif  && <source src={`${gif}#t=0.01`} type="video/mp4" />}
          </video>
        ) : gif ? (
          <img
            src={gif}
            alt={titulo}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block rounded-[8px]"
          />
        ) : (
          <div className="w-full min-h-[200px] animate-pulse rounded-[8px]" />
        )}

        {/* Overlay */}
        {(!titulo && !fecha) && (
          <div
            className={`absolute inset-0 rounded-[8px] pointer-events-none
              ${overlayPos === "top"
                ? "bg-gradient-to-b from-black/55 via-black/10 to-transparent"
                : "bg-gradient-to-t from-black/55 via-black/10 to-transparent"
              }`}
          />
        )}

        {/* Título y fecha */}
        <div className={`absolute inset-0 flex ${overlayPos === "top" ? "items-start" : "items-end"}`}>
          <div className={`relative z-10 flex w-full items-center justify-between p-2 ${overlayPos === "top" ? "pt-2" : "pb-2"}`}>
            <h3
              className={`truncate max-w-[70%] font-sans text-[13px] leading-[28px] font-normal rounded-[8px]
                ${titleColor === "dark" 
                  ? "text-neutral-900" 
                  : "text-[hsl(0,0%,93%)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                }`}
            >
              {titulo}
            </h3>
            {fecha && (
              <p className="truncate max-w-[70%] font-sans text-[13px] leading-[28px] font-normal rounded-[8px] text-gray-500">
                {fecha}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Acciones */}
      {!fullBleedOnly && (essay || prototype) && (
        <div className="mt-1 space-y-2">
          {essay ? (
            essayIsExternal ? (
              <a
                href={essay}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClasses}
                onClick={(e) => e.stopPropagation()}
              >
                {essayLabel}
              </a>
            ) : (
              <Link
                to={essay}
                className={ctaClasses}
                onClick={(e) => e.stopPropagation()}
              >
                {essayLabel}
              </Link>
            )
          ) : isExternalPrototype ? (
            <a
              href={prototype}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClasses}
              onClick={(e) => e.stopPropagation()}
            >
              {protoLabel}
            </a>
          ) : (
            <Link
              to={prototype}
              className={ctaClasses}
              onClick={(e) => e.stopPropagation()}
            >
              {protoLabel}
            </Link>
          )}
        </div>
      )}

    </article>

  );
}
