import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function ProyectoCard({
  titulo, descripcion, gif, webm, poster, essay, fecha,
  prototype, protoLabel = "View Prototype",
  overlayPos = "bottom",
  titleColor = "light",
  essayLabel = "Read Essay",
  playbackRate = 1,
  videosReady = true,
}) {
  const navigate = useNavigate();
  const [firstFrameBlur, setFirstFrameBlur] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const isExternalPrototype = typeof prototype === "string" && /^https?:\/\//i.test(prototype);
  const essayIsRoute = typeof essay === "string" && essay.startsWith("/");
  const essayIsExternal = typeof essay === "string" && /^https?:\/\//i.test(essay);
  
  const dest = essay
    ? (essayIsExternal ? { type: "external", url: essay } : { type: "route", url: essay })
    : prototype
      ? (isExternalPrototype ? { type: "external", url: prototype } : { type: "route", url: prototype })
      : null;

  const hasDest = !!dest;
  const showEssayLinkBtn = essayIsRoute || essayIsExternal;
  const showEssayBlock = !!(essay && !showEssayLinkBtn);
  const showProtoBtn = !!prototype;
  const showDescription = !!descripcion;
  const showActions = showEssayBlock || showEssayLinkBtn || showProtoBtn;

  const hasVideo = (gif && /\.mp4$/i.test(gif)) || (webm && /\.webm$/i.test(webm));
  const fullBleedOnly = !showActions && !showDescription;
  const hasValidPoster = poster && !poster.includes('.mp4') && !poster.includes('.webm');

  // Función para capturar el primer frame y generar blur
  const captureFirstFrame = (videoElement) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Usar las dimensiones reales del video
      canvas.width = videoElement.videoWidth || 400;
      canvas.height = videoElement.videoHeight || 300;
      
      // Dibujar el primer frame
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      // Convertir a data URL (el blur se aplicará con CSS)
      const dataURL = canvas.toDataURL('image/jpeg', 0.8);
      resolve(dataURL);
    });
  };

  // Efecto para capturar el primer frame cuando el video se carga
  useEffect(() => {
    if (hasVideo && videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        // Ir al primer frame
        video.currentTime = 0.1;
        
        const handleSeeked = () => {
          captureFirstFrame(video).then(setFirstFrameBlur);
          video.removeEventListener('seeked', handleSeeked);
        };
        
        video.addEventListener('seeked', handleSeeked);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [hasVideo, titulo]);

  // Efecto para forzar la reproducción cuando videosReady cambie
  useEffect(() => {
    if (hasVideo && videosReady && videoRef.current) {
      const video = videoRef.current;
      
      // Forzar reproducción cuando el video esté listo
      const playVideo = () => {
        video.play().catch(console.log);
      };
      
      // Intentar reproducir inmediatamente
      playVideo();
      
      // También intentar cuando el video esté completamente listo
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
      }
      
      return () => {
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, [hasVideo, videosReady]);

  // Resetear el estado de carga de imagen cuando cambie el gif
  useEffect(() => {
    setImageLoaded(false);
  }, [gif]);

  // Resetear el estado de reproducción cuando cambie el video
  useEffect(() => {
    setVideoPlaying(false);
  }, [webm, gif]);

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
        break-inside-avoid rounded-xl border overflow-hidden
        bg-white text-neutral-900 border-neutral-200
        dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700
        transition-colors duration-200
        ${fullBleedOnly ? "p-0" : "p-1"}
        ${hasDest ? "cursor-pointer" : "cursor-default"}
      `}
      role={hasDest ? "link" : undefined}
      tabIndex={hasDest ? 0 : undefined}
      aria-label={hasDest ? `Abrir: ${essay ? `essay de ${titulo}` : titulo}` : undefined}
      onClick={handleCardClick}
      onKeyDown={(e) => hasDest && (e.key === "Enter" || e.key === " ") && handleCardClick()}
    >
      {/* Media */}
             <div className="relative overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-700">
        {hasVideo ? (
          <>
            {/* Video único que se muestra/oculta */}
            <video
              ref={videoRef}
              playsInline
              autoPlay={videosReady}
              muted
              key={`${webm}|${gif}|${poster}`}
              loop
              preload="auto"
              poster={poster || gif}
              className={`w-full h-auto object-contain rounded-lg transition-all duration-500 ease-out ${
                videosReady && videoPlaying ? 'opacity-100 blur-0' : 'opacity-0 blur-sm absolute'
              }`}
              onLoadedMetadata={(e) => { e.currentTarget.playbackRate = playbackRate; }}
              onPlay={(e) => { 
                if (e.currentTarget.playbackRate !== playbackRate) e.currentTarget.playbackRate = playbackRate;
                setVideoPlaying(true);
              }}
              onPause={() => setVideoPlaying(false)}
              onCanPlay={() => {
                // Asegurar que el video se reproduzca cuando esté listo
                if (videosReady && videoRef.current) {
                  videoRef.current.play().catch(console.log);
                }
              }}
            >
              {webm && <source src={`${webm}#t=0.01`} type="video/webm" />}
              {gif && <source src={`${gif}#t=0.01`} type="video/mp4" />}
            </video>
            
            {/* Blur placeholder del primer frame */}
            {firstFrameBlur ? (
              <img
                src={firstFrameBlur}
                alt={titulo}
                className={`w-full h-auto object-contain rounded-lg transition-all duration-500 ease-out ${
                  videosReady && videoPlaying ? 'opacity-0 blur-sm absolute' : 'opacity-100 blur-sm'
                }`}
                style={{
                  filter: 'blur(8px)'
                }}
              />
            ) : hasValidPoster ? (
              /* Usar poster válido como fallback */
              <img
                src={poster}
                alt={titulo}
                className={`w-full h-auto object-contain rounded-lg transition-all duration-500 ease-out ${
                  videosReady && videoPlaying ? 'opacity-0 blur-sm absolute' : 'opacity-100 blur-sm'
                }`}
                style={{
                  filter: 'blur(8px)'
                }}
              />
            ) : (
              /* Fallback mientras se genera el blur del primer frame */
              <div
                className={`w-full h-auto rounded-lg transition-all duration-500 ease-out ${
                  videosReady && videoPlaying ? 'opacity-0 blur-sm absolute' : 'opacity-100 blur-sm'
                }`}
                style={{
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  filter: 'blur(8px)',
                  minHeight: '200px'
                }}
              >
                {/* Placeholder mientras carga el primer frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
                </div>
              </div>
            )}
          </>
        ) : gif ? (
          <>
            {/* Imagen principal */}
            <img
              src={gif}
              alt={titulo}
              loading="lazy"
              decoding="async"
              className={`w-full h-auto object-contain rounded-lg ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={(e) => {
                setImageLoaded(true);
              }}
            />
            
            {/* Placeholder con imagen blureada mientras carga */}
            {!imageLoaded && (
              <img
                src={gif}
                alt={titulo}
                className="absolute inset-0 w-full h-auto object-contain rounded-lg"
                style={{
                  filter: 'blur(8px)'
                }}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full animate-pulse rounded-lg" />
        )}

        {/* Overlay */}
        {(!titulo && !fecha) && (
          <div
            className={`absolute inset-0 rounded-xl pointer-events-none
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
                ${titleColor === "dark" 
                  ? "text-neutral-900" 
                  : "text-[hsl(0,0%,93%)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                }`}
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
