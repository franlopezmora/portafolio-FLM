// src/components/EssayImage.jsx
import React from "react";

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
  if (!resolved) {
    console.warn(`[EssayImage] No se encontró "${src}" en src/images`);
    return null;
  }

  const figure = (
    <figure className={`essay-frame ${className}`}>
      <img src={resolved} alt={alt} loading="lazy" />
      {caption && (
        <figcaption className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );

  return bleed ? <div className="bleed">{figure}</div> : figure;
}
