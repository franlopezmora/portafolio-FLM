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
        el.style.scrollMarginTop = "96px";
        return { id: el.id, text: el.textContent || "", level: el.tagName.toLowerCase() };
      });
      setToc(items);
    }, 0);
    return () => clearTimeout(t);
  }, [Mod]);

  const HEADER_OFFSET = 96;
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  if (notFound) {
    return (
      <main className="essay-wrap bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="mx-auto max-w-[1000px] px-4 md:px-6 lg:px-8 py-10">
          <Link className="essay-back block mb-6" to="/essays">← Volver</Link>
          <h1 className="essay-title">No encontrado</h1>
          <p className="essay-meta">El ensayo “{slug}” no existe.</p>
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
  <main className="essay-wrap bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
    {/* Contenedor general ancho para que el sidebar pueda ir bien a la izquierda */}
    <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-8">

        {/* Masthead */}
        <div className="
          grid grid-cols-1
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1000px)_minmax(0,1fr)]
          lg:gap-x-[160px] items-baseline pt-6
        ">
        {/* Volver (col 1, alineado a la derecha para quedar pegado al contenido) */}
        <div className="hidden lg:block justify-self-end w-[240px]">
          <Link className="essay-back" to="/">← Volver</Link>
        </div>

        {/* Header (col 2, contenido centrado) */}
        <header className="">
          <div className="mx-auto max-w-[1000px] px-2">
            <h1 className="essay-title">{frontmatter.title || "Untitled"}</h1>
            {(frontmatter.date || frontmatter.description) && (
              <p className="essay-meta mt-1">
                {frontmatter.date && <span>{frontmatter.date}</span>}
                {frontmatter.description && <> &middot; <span>{frontmatter.description}</span></>}
              </p>
            )}
          </div>
        </header>

        {/* Col 3 vacía (aire) */}
        <div className="hidden lg:block" />
      </div>

        {/* Cuerpo */}
        <div className="
          grid grid-cols-1
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1000px)_minmax(0,1fr)]
          lg:gap-x-[160px]
        ">
        {/* TOC (col 1, fijo 240px y sticky) */}
        <aside className="hidden lg:block justify-self-end w-[240px] sticky top-20 self-start pt-2">
          <nav className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400 pr-2">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`block w-full text-left hover:text-neutral-900 dark:hover:text-neutral-100 transition ${
                  item.level === "h3" ? "pl-4 text-[13px]" : ""
                }`}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </aside>

        {/* Contenido (col 2, siempre centrado) */}
        <section>
          <article ref={articleRef} className="essay-prose mx-auto max-w-[1000px]">
            {Mod ? <Mod /> : <div className="text-neutral-500 dark:text-neutral-400">Cargando…</div>}
          </article>
            <div className="mx-auto max-w-[1000px] mt-10">
              <PrevNext
                prev={prevItem ? { title: prevItem.title, href: prevItem.href } : null}
                next={nextItem ? { title: nextItem.title, href: nextItem.href } : null}
              />
            </div>
        </section>

        {/* Col 3 vacía */}
        <div className="hidden lg:block" />
      </div>

    </div>
  </main>
);


}
