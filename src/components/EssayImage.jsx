// src/components/EssayImage.jsx
import React, { useState, useRef, useEffect } from "react";

const files = import.meta.glob("../images/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  as: "url",
});

const byName = Object.fromEntries(
  Object.entries(files).map(([p, url]) => [p.split("/").pop(), url])
);

function resolveSrc(src) {
  if (!src) return null;
  if (/^https?:\/\//.test(src) || src.startsWith("/")) return src;
  return byName[src] ?? null;
}

export default function EssayImage({ src, alt = "", caption, className = "", bleed = false }) {
  const resolved = resolveSrc(src);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(null);
  const imgRef = useRef(null);
  const [showBlur, setShowBlur] = useState(true);

  if (!resolved) {
    console.warn(`[EssayImage] No se encontró "${src}" en src/images`);
    return null;
  }

  // Efecto para manejar la carga de la imagen
  useEffect(() => {
    if (imgRef.current) {
      const img = imgRef.current;
      
      const handleLoad = () => {
        // Capturar dimensiones reales de la imagen
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
        setImageLoaded(true);
        // Ocultar blur después de un breve delay para transición suave
        setTimeout(() => setShowBlur(false), 100);
      };
      
      const handleError = () => {
        setImageError(true);
        setImageLoaded(true); // Para ocultar el placeholder
        setShowBlur(false);
      };
      
      img.addEventListener('load', handleLoad);
      img.addEventListener('error', handleError);
      
      // Si la imagen ya está cargada (cache)
      if (img.complete && img.naturalHeight !== 0) {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight
        });
        setImageLoaded(true);
        setShowBlur(false);
      }
      
      return () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };
    }
  }, [resolved]);

  const figure = (
    <figure className={`essay-frame ${className}`}>
      <div className="relative">
        {/* Imagen principal */}
        <img 
          ref={imgRef}
          src={resolved} 
          alt={alt} 
          loading="lazy"
          className={`transition-all duration-500 ease-out ${
            imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm absolute'
          }`}
        />
        
        {/* Blur placeholder mientras carga */}
        {showBlur && !imageError && (
          <img
            src={resolved}
            alt={alt}
            className="w-full h-auto object-contain transition-all duration-500 ease-out opacity-100 blur-sm"
            style={{
              filter: 'blur(8px)'
            }}
          />
        )}
        
        {/* Placeholder de error */}
        {imageError && (
          <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Error al cargar imagen</span>
          </div>
        )}
      </div>
      
      {caption && (
        <figcaption className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  return bleed ? <div className="bleed">{figure}</div> : figure;
}
