// Utilidades para cargar y usar el manifest de media (LQIP)

export async function fetchManifest() {
  try {
    const res = await fetch('/media-manifest.json');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export function buildBySrcMap(entries) {
  return new Map((entries || []).map(e => [e.src, e]));
}

// Prioriza webm; luego mp4 en gif; luego imagen local
export function keyForItem(it) {
  if (!it) return null;
  if (it.webm) return it.webm;
  if (it.gif && /\.mp4$/i.test(it.gif)) return it.gif;
  if (it.gif && it.gif.startsWith('/')) return it.gif;
  return null;
}

export function pickMeta(map, item) {
  const key = keyForItem(item);
  return key ? map.get(key) : undefined;
}


