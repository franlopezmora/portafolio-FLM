import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/essay.css";
import PrevNext from "../components/PrevNext";
import { homeItems } from "../content/homeItems";

const parseDate = (d) => {
  if (!d) return 0;
  const t = Date.parse(d);
  if (!Number.isNaN(t)) return t;
  try { return Date.parse(d.replace(/(\w+)\s+(\d{4})/, "01 $1 $2")); } catch { return 0; }
};

const mdxModules = import.meta.glob("../essays/*.mdx");

function slugify(str = "") {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export default function EssayPage() {
  const { slug } = useParams();

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

      const entry = Object.entries(mdxModules).find(([path]) => {
        const name = path.split("/").pop().replace(/\.mdx$/i, "");
        return name === slug;
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
  }, [slug]);

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
          <Link className="essay-back block mb-6" to="/essays">← Volver</Link>
          <h1 className="essay-title">No encontrado</h1>
          <p className="essay-meta">El ensayo "{slug}" no existe.</p>
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
<main className="bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 min-h-screen">
  <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8 pt-6">

    {/* Layout con flexbox para mejor control del sticky */}
    <div className="flex flex-col lg:flex-row lg:gap-x-[160px]">
      
      {/* RAIL IZQUIERDO: Volver + TOC (sticky) */}
      <aside className="hidden lg:block lg:w-[240px] lg:flex-shrink-0">
        <div 
          style={{
            position: 'fixed',
            top: '32px',
            left: 'calc(50% - 800px + 40px)',
            width: '240px',
            zIndex: 9999,
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto'
          }}
        >
          {/* Volver */}
          <Link className="essay-back block mb-4" to="/">← Volver</Link>

          {/* TOC */}
          <nav className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`block w-full text-left transition-colors duration-200 py-1 px-2 rounded
                  ${item.level === "h3" ? "pl-6 text-[13px]" : "pl-2"}
                  hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800
                `}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 max-w-[1000px] mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="essay-title">{frontmatter.title || "Untitled"}</h1>
          {(frontmatter.date || frontmatter.description) && (
            <p className="essay-meta mt-1">
              {frontmatter.date && <span>{frontmatter.date}</span>}
              {frontmatter.description && <> &middot; <span>{frontmatter.description}</span></>}
            </p>
          )}
        </header>

        {/* Artículo */}
        <article ref={articleRef} className="essay-prose">
          {Mod ? <Mod /> : <div className="text-neutral-500 dark:text-neutral-400">Cargando…</div>}
        </article>

        {/* Prev / Next */}
        <div className="mt-10">
          <PrevNext
            prev={prevItem ? { title: prevItem.title, href: prevItem.href } : null}
            next={nextItem ? { title: nextItem.title, href: nextItem.href } : null}
          />
        </div>
      </div>

      {/* Espacio derecho para balance visual */}
      <div className="hidden lg:block lg:w-[240px] lg:flex-shrink-0" />
    </div>
  </div>
</main>
);


}
