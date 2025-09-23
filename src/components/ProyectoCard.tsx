import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, CSSProperties } from "react";

type ProyectoCardProps = {
  titulo: string;
  descripcion?: string;
  gif?: string;          // puede ser .mp4 si lo usás como video
  webm?: string;         // .webm
  poster?: string;
  essay?: string;
  fecha?: string;
  prototype?: string;
  protoLabel?: string;
  overlayPos?: "top" | "bottom";
  titleColor?: "light" | "dark";
  essayLabel?: string;
  playbackRate?: number;
  videosReady?: boolean;
  initialRatio?: number | null;
  initialBlurSrc?: string | null;
};

export default function ProyectoCard({
  titulo, descripcion, gif, webm, poster, essay, fecha,
  prototype, protoLabel = "View Prototype",
  overlayPos = "bottom",
  titleColor = "light",
  essayLabel = "Read Essay",
  playbackRate = 1,
  videosReady = true,
  initialRatio,
  initialBlurSrc,
}: ProyectoCardProps) {
  const navigate = useNavigate();

  // ---- Estados ----
  const [firstFrameBlur, setFirstFrameBlur] = useState<string | null>(initialBlurSrc ?? null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [mediaRatio, setMediaRatio] = useState<number | null>(initialRatio ?? null);     // w/h
  const [reservedCardMinH, setReservedCardMinH] = useState<number | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // video 'playing'
  const [showBlur, setShowBlur] = useState(true);      // overlay blur visible

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const articleRef = useRef<HTMLElement | null>(null);
  const extrasRef = useRef<HTMLDivElement | null>(null);

  const RATIO_CACHE_KEY = "proyectoCard_media_ratios_v2";
  const HEURISTIC_RATIO = 1; // cuadrado como última opción (altura variable pero estable)

  // ---- Helpers cache ratio ----
  const getCachedRatio = (src?: string | null) => {
    try {
      if (!src) return null;
      const raw = localStorage.getItem(RATIO_CACHE_KEY);
      if (!raw) return null;
      const map = JSON.parse(raw) as Record<string, number>;
      const r = map?.[src];
      return typeof r === "number" && r > 0 ? r : null;
    } catch { return null; }
  };
  const setCachedRatio = (src: string | null | undefined, ratio: number) => {
    try {
      if (!src || !(ratio > 0)) return;
      const raw = localStorage.getItem(RATIO_CACHE_KEY);
      const map: Record<string, number> = raw ? JSON.parse(raw) : {};
      map[src] = ratio;
      localStorage.setItem(RATIO_CACHE_KEY, JSON.stringify(map));
    } catch {}
  };

  // ---- Medir ratio de imágenes rápido (para poster) ----
  function measureImageRatio(src?: string | null): Promise<number | null> {
    return new Promise((resolve) => {
      if (!src) return resolve(null);
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          resolve(img.naturalWidth / img.naturalHeight);
        } else resolve(null);
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  // ---- Derivados ----
  const isExternalPrototype = typeof prototype === "string" && /^https?:\/\//i.test(prototype ?? "");
  const essayIsRoute = typeof essay === "string" && (essay?.startsWith("/") ?? false);
  const essayIsExternal = typeof essay === "string" && /^https?:\/\//i.test(essay ?? "");

  const dest = essay
    ? (essayIsExternal ? { type: "external" as const, url: essay } : { type: "route" as const, url: essay })
    : prototype
      ? (isExternalPrototype ? { type: "external" as const, url: prototype } : { type: "route" as const, url: prototype })
      : null;

  const hasDest = !!dest;
  const showEssayLinkBtn = !!(essay && (essayIsRoute || essayIsExternal));
  const showEssayBlock = !!(essay && !showEssayLinkBtn);
  const showProtoBtn = !!prototype;
  const showDescription = !!descripcion;
  const showActions = showEssayBlock || showEssayLinkBtn || showProtoBtn;

  const hasVideo = (!!gif && /\.mp4$/i.test(gif)) || (!!webm && /\.webm$/i.test(webm ?? ""));
  const fullBleedOnly = !showActions && !showDescription;

  // ---- Capturar primer frame para blur (video) ----
  const captureFirstFrame = (videoElement: HTMLVideoElement) => {
    return new Promise<string | null>((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);
      canvas.width = videoElement.videoWidth || 400;
      canvas.height = videoElement.videoHeight || 300;
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    });
  };

  useEffect(() => {
    if (hasVideo && videoRef.current) {
      const video = videoRef.current;
      const onLoadedData = () => {
        video.currentTime = 0.1;
        const onSeeked = () => {
          captureFirstFrame(video).then((url) => url && setFirstFrameBlur(url));
          video.removeEventListener("seeked", onSeeked);
        };
        video.addEventListener("seeked", onSeeked);
      };
      video.addEventListener("loadeddata", onLoadedData);
      return () => video.removeEventListener("loadeddata", onLoadedData);
    }
  }, [hasVideo, titulo]);

  // ---- Reset flags al cambiar src ----
  useEffect(() => { setImageLoaded(false); }, [gif]);
  useEffect(() => { setVideoPlaying(false); setHasStarted(false); setShowBlur(true); }, [webm, gif]);

  // ---- Elegir ratio INICIAL antes de cargar el media (para reservar altura) ----
  useEffect(() => {
    let cancelled = false;
    async function pickInitialRatio() {
      if (initialRatio != null) return; // ya viene del manifiesto
      // Imagen
      if (gif && !/\.mp4$/i.test(gif)) {
        const cached = getCachedRatio(gif);
        if (!cancelled) setMediaRatio(cached ?? HEURISTIC_RATIO);
        return;
      }
      // Video
      const videoSrc =
        (webm && /\.webm$/i.test(webm)) ? webm :
        (gif &&  /\.mp4$/i.test(gif))   ? gif  : null;

      if (videoSrc) {
        const cached = getCachedRatio(videoSrc);
        if (cached) { if (!cancelled) setMediaRatio(cached); return; }
        // Intentar ratio del poster
        const posterRatio = await measureImageRatio(poster || null);
        if (!cancelled) setMediaRatio(posterRatio ?? HEURISTIC_RATIO);
        return;
      }
      // Sin media: mantengo la card abierta con cuadrado
      if (!cancelled) setMediaRatio(HEURISTIC_RATIO);
    }
    pickInitialRatio();
    return () => { cancelled = true; };
  }, [gif, webm, poster, initialRatio]);

  // ---- Recalcular altura reservada (media + extras) → sin CLS ----
  useEffect(() => {
    if (!articleRef.current) return;
    const calc = () => {
      const el = articleRef.current!;
      const cardWidth = el.clientWidth || 0;
      const mediaHeight = mediaRatio ? (cardWidth / mediaRatio) : 320; // fallback visual
      const extrasHeight = extrasRef.current ? extrasRef.current.offsetHeight : 0;
      const paddingY = fullBleedOnly ? 0 : 8;
      const safety = 1;
      setReservedCardMinH(Math.ceil(mediaHeight + extrasHeight + paddingY + safety));
    };
    const ro = new ResizeObserver(calc);
    ro.observe(articleRef.current);

    const mo = new MutationObserver(calc);
    if (extrasRef.current) mo.observe(extrasRef.current, { childList: true, subtree: true });

    calc();
    return () => { ro.disconnect(); mo.disconnect(); };
  }, [mediaRatio, fullBleedOnly, showActions, showDescription]);

  // ---- OBSERVER de viewport ----
  useEffect(() => {
    if (!articleRef.current) return;
    const io = new IntersectionObserver(
      (entries) => setIsInView(entries[0].isIntersecting),
      { root: null, threshold: 0.2 }
    );
    io.observe(articleRef.current);
    return () => io.disconnect();
  }, []);

  // ---- Autoplay visible + listo ----
  useEffect(() => {
    if (!hasVideo || !videoRef.current) return;
    if (!isInView || !videosReady) return;
    const v = videoRef.current;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const onCanPlay = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [hasVideo, isInView, videosReady]);

  // ---- BLUR control ----
  const handlePlaying = () => { setHasStarted(true); setShowBlur(false); setVideoPlaying(true); };
  const handlePauseLike = () => { setHasStarted(false); setShowBlur(true); setVideoPlaying(false); };

  // Fuente de blur reutilizable (video e imagen)
  const blurSrc = firstFrameBlur ?? initialBlurSrc ?? poster ?? null;

  const ctaClasses =
    "block w-full text-center text-sm font-medium py-2 rounded-lg " +
    "bg-neutral-200 text-gray-900 hover:bg-neutral-300 " +
    "dark:bg-neutral-600 dark:text-gray-100 dark:hover:bg-neutral-700 " +
    "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 dark:focus-visible:ring-black/40";

  const handleCardClick = () => {
    if (!dest) return;
    if (dest.type === "external") window.open(dest.url, "_blank", "noopener,noreferrer");
    else navigate(dest.url);
  };

  const hasDestRole: Partial<React.HTMLAttributes<HTMLElement>> = hasDest
    ? { role: "link", tabIndex: 0, "aria-label": `Abrir: ${essay ? `essay de ${titulo}` : titulo}` }
    : {};

  return (
    <article
      ref={articleRef}
      style={reservedCardMinH ? { minHeight: reservedCardMinH } : undefined}
      className={`
        break-inside-avoid rounded-xl border overflow-hidden
        bg-white text-neutral-900 border-neutral-200
        dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700
        transition-colors duration-200
        ${fullBleedOnly ? "p-0" : "p-1"}
        ${hasDest ? "cursor-pointer" : "cursor-default"}
      `}
      onClick={handleCardClick}
      onKeyDown={(e) => hasDest && (e.key === "Enter" || e.key === " ") && handleCardClick()}
      {...hasDestRole}
    >
      {/* Media (altura reservada por ratio) */}
      <div
        className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-700"
        style={{
          aspectRatio: `${mediaRatio ?? HEURISTIC_RATIO} / 1`,
          maxHeight: reservedCardMinH ? undefined : "clamp(200px, 45vw, 600px)",
        }}
      >
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              crossOrigin="anonymous"
              playsInline
              autoPlay={isInView && videosReady}
              muted
              loop
              preload={isInView ? "auto" : "none"}
              poster={isInView ? (poster || gif || undefined) : undefined}
              className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-300 ${hasStarted ? "opacity-100" : "opacity-0"}`}
              onLoadedMetadata={(e) => {
                const v = e.currentTarget;
                v.playbackRate = playbackRate;
                const vw = v.videoWidth, vh = v.videoHeight;
                if (vw > 0 && vh > 0) {
                  const r = vw / vh;
                  setMediaRatio(r);
                  const videoSrc =
                    (webm && /\.webm$/i.test(webm ?? "")) ? webm! :
                    (gif &&  /\.mp4$/i.test(gif ?? ""))     ? gif!  : null;
                  setCachedRatio(videoSrc, r);
                }
              }}
              onPlaying={handlePlaying}
              onPlay={handlePlaying}
              onPause={handlePauseLike}
              onWaiting={handlePauseLike}
              onStalled={handlePauseLike}
              onSuspend={() => { if (!isInView) handlePauseLike(); }}
            >
              {isInView && webm && <source src={`${webm}#t=0.01`} type="video/webm" />}
              {isInView && gif  && <source src={`${gif}#t=0.01`}  type="video/mp4"  />}
            </video>

            {/* PLACEHOLDER BLUR: visible hasta que el video esté realmente 'playing' */}
            {blurSrc ? (
              <>
                <img
                  src={blurSrc}
                  alt=""
                  aria-hidden="true"
                  fetchPriority="high"
                  className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-300 ${showBlur ? "opacity-100" : "opacity-0"}`}
                  style={{ filter: "blur(10px)" }}
                />
                {/* Tinte SIEMPRE disponible (no depende de estado) */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none opacity-0 dark:opacity-100"
                  style={{ background: "rgba(0,0,0,.22)" }}
                  aria-hidden="true"
                />
              </>
            ) : (
              <div
                className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${showBlur ? "opacity-100" : "opacity-0"}`}
                style={{ background: "linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)", filter: "blur(10px)" }}
                aria-hidden="true"
              />
            )}
          </>
        ) : gif ? (
          <div className="relative w-full h-full">
            {/* Imagen real */}
            <img
              src={gif}
              alt={titulo}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={(e) => {
                const nw = e.currentTarget.naturalWidth || 0;
                const nh = e.currentTarget.naturalHeight || 0;
                if (nw > 0 && nh > 0) {
                  const r = nw / nh;
                  setMediaRatio(r);
                  setCachedRatio(gif, r);
                }
                setImageLoaded(true);
              }}
            />
            {/* Placeholder -> usar LQIP si existe */}
            {blurSrc ? (
              <>
                <img
                  src={blurSrc}
                  alt=""
                  aria-hidden="true"
                  fetchPriority="high"
                  className={`absolute inset-0 w-full h-full object-contain rounded-lg transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`}
                  style={{ filter: "blur(10px)" }}
                />
                {/* Tinte SIEMPRE disponible (no depende de estado) */}
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none opacity-0 dark:opacity-100"
                  style={{ background: "rgba(0,0,0,.22)" }}
                  aria-hidden="true"
                />
              </>
            ) : (
              <div
                className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`}
                style={{ background: "linear-gradient(135deg,#f3f4f6 0%,#e5e7eb 100%)", filter: "blur(8px)" }}
                aria-hidden="true"
              />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full rounded-lg animate-pulse" />
        )}

        {/* Overlay */}
        {(!titulo && !fecha) && (
          <div className={`absolute inset-0 rounded-xl pointer-events-none
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
              className={`truncate max-w-[70%] font-sans text-[13px] leading-[28px] font-normal
                ${titleColor === "dark" ? "text-neutral-900" : "text-[hsl(0,0%,93%)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"}`}
            >
              {titulo}
            </h3>
            {fecha && (
              <p className="truncate max-w-[70%] font-sans text-[13px] leading-[28px] font-normal text-gray-500">
                {fecha}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Acciones */}
      {!fullBleedOnly && (essay || prototype) && (
        <div ref={extrasRef} className="mt-1 space-y-2">
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
                to={essay as string}
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
              to={prototype as string}
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
