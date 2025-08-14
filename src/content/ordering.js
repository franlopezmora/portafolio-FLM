import { homeItems } from "./homeItems";

const ES_MONTHS = {
  "enero": 1, "febrero": 2, "marzo": 3, "abril": 4, "mayo": 5, "junio": 6,
  "julio": 7, "agosto": 8, "septiembre": 9, "setiembre": 9, "octubre": 10,
  "noviembre": 11, "diciembre": 12,
};

const pad2 = (n) => String(n).padStart(2, "0");

function parseDateLoose(d) {
  if (!d) return -Infinity;
  if (d instanceof Date) return +d;
  
  const s = String(d).trim();
  const t = Date.parse(s);
  if (!Number.isNaN(t)) return t;

  const m1 = s.toLowerCase().match(/^([a-záéíóúñ]+)\s+(\d{4})$/i);
  if (m1) {
    const mm = ES_MONTHS[m1[1]];
    if (mm) return Date.parse(`${m1[2]}-${pad2(mm)}-01`);
  }
  
  const m2 = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
  if (m2) {
    const [, dd, mm, yyyy] = m2;
    return Date.parse(`${yyyy}-${pad2(mm)}-${pad2(dd)}`);
  }
  
  return -Infinity;
}

function normalizeRoute(r) {
  if (!r) return null;
  if (r.length > 1 && r.endsWith("/")) return r.slice(0, -1);
  return r;
}

function prettifyRouteTitle(route) {
  if (!route) return null;
  
  if (route.startsWith("/essays/")) {
    const slug = route.split("/").pop();
    return slug
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
  }
  
  if (route.startsWith("/prototypes/")) {
    const id = route.split("/").pop();
    return `Prototipo ${id}`;
  }
  
  return route.replace(/^\//, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function toRoute(it) {
  return normalizeRoute(it.route || it.href || it.essay || it.prototype || null);
}

function toTitle(it, route) {
  return (
    it.title ||
    it.name ||
    it.titulo ||
    it.label ||
    it.caption ||
    prettifyRouteTitle(route)
  );
}

export function getOrderedRoutables() {
  return homeItems
    .map((it, i) => {
      const route = toRoute(it);
      if (!route) return null;
      return {
        ...it,
        route,
        title: toTitle(it, route),
        __i: i,
        __ts: parseDateLoose(it.fecha),
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.__ts !== a.__ts) return b.__ts - a.__ts;
      return a.__i - b.__i;
    });
}

export function getSiblingsFor(pathname) {
  const path = normalizeRoute(pathname);
  const ordered = getOrderedRoutables();
  const idx = ordered.findIndex((it) => it.route === path);
  
  if (idx === -1) return { prev: null, next: null };
  
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}
