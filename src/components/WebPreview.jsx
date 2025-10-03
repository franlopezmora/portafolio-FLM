import clsx from "clsx";

export default function WebPreview({ url, image, title, favicon, siteName, fullBleed = false, className }) {
  if (fullBleed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx("block group", className)}
        style={{
          textDecoration: "none",
          fontFamily: "var(--fonts-body)",
          WebkitFontSmoothing: "antialiased",
          color: "inherit",
          cursor: "pointer",
          boxSizing: "border-box",
          width: "100%",
          position: "relative",
          borderRadius: "12px",
          margin: 0,
          overflow: "hidden",
          outlineOffset: "2px",
        }}
      >
        {/* IMAGEN FULL BLEED: sin padding, sin bordes externos */}
        <div className="relative w-full overflow-hidden">
          <img
            src={image || "/images/previews/placeholder.png"}
            alt={title || "Preview"}
            className="w-full h-auto transform transition-transform duration-500 ease-out group-hover:scale-105"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "12px",
              willChange: "transform",
            }}
          />
        </div>

        {/* Pie de card flotante */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-lg px-3 py-2">
          {favicon && (
            <img
              src={favicon}
              alt="Favicon"
              className="w-4 h-4 rounded-sm flex-shrink-0"
            />
          )}
          {siteName && (
            <span
              className="flex-1 truncate"
              style={{
                fontFamily: "var(--fonts-body)",
                fontWeight: 400,
                color: "var(--colors-gray12)",
                fontSize: "var(--fontSizes-14)",
                lineHeight: "var(--lineHeights-16)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
                textDecoration: "none",
              }}
            >
              {siteName}
            </span>
          )}
          <svg
            className="w-4 h-4 text-neutral-700 dark:text-neutral-400 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "block group overflow-hidden rounded-lg border bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
        className
      )}
      style={{
        textDecoration: "none",
        fontFamily: "var(--fonts-body)",
        WebkitFontSmoothing: "antialiased",
        color: "inherit",
        cursor: "pointer",
        boxSizing: "border-box",
        width: "100%",
        position: "relative",
        borderRadius: "12px",
        margin: 0,              // sin márgenes forzados
        overflow: "hidden",     // recorte firme para el zoom
        outlineOffset: "2px",
        // sin padding general: lo aplicamos solo en las zonas de texto
      }}
    >
       {/* IMAGEN: con padding, radios heredados y recorte limpio */}
       <div
         className="relative w-full overflow-hidden p-2"
         style={{ borderRadius: "inherit"}} // asegura el mismo radio que la card
       >
         <div className="relative w-full overflow-hidden rounded-md">
           <img
             src={image || "/images/previews/placeholder.png"}
             alt={title || "Preview"}
             className="w-full h-auto transform transition-transform duration-500 ease-out group-hover:scale-105"
             style={{
               display: "block",
               width: "100%",
               height: "auto",
               objectFit: "cover",
               borderRadius: "inherit",   // mismo radio que el wrapper
               willChange: "transform",
             }}
           />
         </div>
       </div>

      {title && (
        <div className="px-3 pt-3">
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-100">
            {title}
          </h3>
        </div>
      )}

      {/* Pie de card */}
      <div className="px-3 pb-3 flex items-center gap-2">
        {favicon && (
          <img
            src={favicon}
            alt="Favicon"
            className="w-4 h-4 rounded-sm flex-shrink-0"
          />
        )}
        {siteName && (
          <span
            className="flex-1 truncate"
            style={{
              fontFamily: "var(--fonts-body)",
              fontWeight: 400,
              color: "var(--colors-gray12)",
              fontSize: "var(--fontSizes-14)",
              lineHeight: "var(--lineHeights-16)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              textDecoration: "none",
            }}
          >
            {siteName}
          </span>
        )}
        <svg
          className="w-4 h-4 text-neutral-700 dark:text-neutral-400 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}
