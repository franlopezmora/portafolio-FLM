import { homeItems } from "./homeItems";

const ES_MONTHS = {
  "enero": "January", "febrero": "February", "marzo": "March", "abril": "April", 
  "mayo": "May", "junio": "June", "julio": "July", "agosto": "August", 
  "septiembre": "September", "octubre": "October", 
  "noviembre": "November", "diciembre": "December",
  "Enero": "January", "Febrero": "February", "Marzo": "March", "Abril": "April", 
  "Mayo": "May", "Junio": "June", "Julio": "July", "Agosto": "August", 
  "Septiembre": "September", "Octubre": "October", 
  "Noviembre": "November", "Diciembre": "December"
};

const pad2 = (n) => String(n).padStart(2, "0");

function parseDateLoose(d) {
  if (!d) return -Infinity;
  if (d instanceof Date) return +d;
  
  // Handle translated dates
  const dateStr = typeof d === "string" ? d : d.ES;
  
  // ej: "Agosto 2025" -> "01 August 2025"
  const match = dateStr.match(/^([a-zA-ZáéíóúñÁÉÍÓÚÑ]+)\s+(\d{4})$/);
  if (match) {
    const [, month, year] = match;
    const englishMonth = ES_MONTHS[month];
    if (englishMonth) {
      return Date.parse(`01 ${englishMonth} ${year}`);
    }
  }
  
  // Try standard Date.parse for other formats
  const t = Date.parse(dateStr);
  if (!Number.isNaN(t)) return t;
  
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

function toTitle(it, route, language = 'ES') {
  // Handle translated titles
  const getTranslatedText = (text) => {
    if (!text) return null;
    if (typeof text === "string") return text;
    if (typeof text === "object" && text[language]) return text[language];
    if (typeof text === "object" && text.ES) return text.ES; // Fallback to Spanish
    return text;
  };

  return (
    getTranslatedText(it.title) ||
    getTranslatedText(it.name) ||
    getTranslatedText(it.titulo) ||
    getTranslatedText(it.label) ||
    getTranslatedText(it.caption) ||
    prettifyRouteTitle(route)
  );
}

export function getOrderedRoutables(language = 'ES') {
  return homeItems
    .map((it, i) => {
      const route = toRoute(it);
      if (!route) return null;
      return {
        ...it,
        route,
        title: toTitle(it, route, language),
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

export function getSiblingsFor(pathname, language = 'ES') {
  const path = normalizeRoute(pathname);
  const ordered = getOrderedRoutables(language);
  const idx = ordered.findIndex((it) => it.route === path);
  
  if (idx === -1) return { prev: null, next: null };
  
  return {
    prev: idx > 0 ? ordered[idx - 1] : null,
    next: idx < ordered.length - 1 ? ordered[idx + 1] : null,
  };
}
