import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/essay.css";
import PrevNext from "../components/PrevNext";
import PageLayout from "../components/PageLayout";
import { homeItems } from "../content/homeItems";
import { useLanguage } from "../context/LanguageContext";

const parseDate = (d) => {
  if (!d) return 0;
  
  // Handle translated dates
  const dateStr = typeof d === "string" ? d : d.ES;
  
  const t = Date.parse(dateStr);
  if (!Number.isNaN(t)) return t;
  try { return Date.parse(dateStr.replace(/(\w+)\s+(\d{4})/, "01 $1 $2")); } catch { return 0; }
};

const mdxModules = import.meta.glob("../essays/*.mdx");

function slugify(str = "") {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export default function EssayPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  const [Mod, setMod] = useState(null);
  const [frontmatter, setFrontmatter] = useState({});
  const [notFound, setNotFound] = useState(false);

  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);
  
  // Cargar MDX por slug
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setNotFound(false);
      setMod(null);
      setFrontmatter({});

      // Determine which file to load based on language
      const unique = (arr) => [...new Set(arr.filter(Boolean))];
      let baseSlug = slug || "";
      if (baseSlug.endsWith("-en") || baseSlug.endsWith(".en")) {
        baseSlug = baseSlug.slice(0, -3);
      }
      if (baseSlug.endsWith(".es")) {
        baseSlug = baseSlug.slice(0, -3);
      }

      const resolvedSlug = baseSlug === "crafting-cruma" ? "crafting-cruma-v2" : baseSlug;
      const candidates = language === "EN"
        ? unique([`${resolvedSlug}-en`, `${resolvedSlug}.en`, resolvedSlug])
        : unique([resolvedSlug, `${resolvedSlug}.es`]);

      const entry = Object.entries(mdxModules).find(([path]) => {
        const name = path.split("/").pop().replace(/\.mdx$/i, "");
        return candidates.includes(name);
      });

      if (!entry) {
        if (!cancelled) setNotFound(true);
        return;
      }

      const [, loader] = entry;
      const mod = await loader();
      if (cancelled) return;

      setMod(() => mod.default || null);
      setFrontmatter(mod.frontmatter || mod.metadata || {});
    })();
    return () => { cancelled = true; };
  }, [slug, language]);

  // Construir TOC
  useEffect(() => {
    if (!Mod) return;
    const t = setTimeout(() => {
      if (!articleRef.current) return;
      const nodes = Array.from(articleRef.current.querySelectorAll("h2, h3"));
      const items = nodes.map((el) => {
        if (!el.id) el.id = slugify(el.textContent || "");
        el.style.scrollMarginTop = "200px"; // Para que quede arriba de toda la pantalla
        return { id: el.id, text: el.textContent || "", level: el.tagName.toLowerCase() };
      });
      setToc(items);
    }, 0);
    return () => clearTimeout(t);
  }, [Mod]);

  const HEADER_OFFSET = 0;
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  if (notFound) {
    return (
      <main className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen">
        <div className="mx-auto max-w-[1000px] px-4 md:px-6 lg:px-8 py-10">
          <Link className="essay-back block mb-6" to="/essays">{t('essay.back')}</Link>
          <h1 className="essay-title">{t('essay.notFound')}</h1>
          <p className="essay-meta">{t('essay.notFoundDescription', { slug })}</p>
        </div>
      </main>
    );
  }

const proyectos = [...homeItems].sort((a, b) => parseDate(b.fecha) - parseDate(a.fecha));

// Href actual (ensayo)
const currentHref = `/essays/${slug}`;

// Posición en la grilla global
const idx = proyectos.findIndex(it => it?.href === currentHref);

// Prev / Next seguros
const prevItem = idx > 0 ? proyectos[idx - 1] : null;
const nextItem = idx >= 0 && idx < proyectos.length - 1 ? proyectos[idx + 1] : null;

return (
  <PageLayout 
    backTo="/"
    backText={t('essay.back')}
    showToc={true}
    toc={toc}
    onTocItemClick={goTo}
  >
    {/* Header */}
    <header className="mb-6">
      <h1 className="essay-title">{frontmatter.title || t('essay.untitled')}</h1>
      {(frontmatter.date || frontmatter.description) && (
        <p className="essay-meta mt-1">
          {frontmatter.date && <span>{frontmatter.date}</span>}
          {frontmatter.description && <> &middot; <span>{frontmatter.description}</span></>}
        </p>
      )}
    </header>

    {/* Artículo */}
    <article ref={articleRef} className="essay-prose">
      {Mod ? <Mod /> : <div className="text-neutral-500 dark:text-neutral-400">{t('essay.loading')}</div>}
    </article>

         {/* Prev / Next */}
     <div className="mt-10">
       <PrevNext />
     </div>
    </PageLayout>
  );


}
