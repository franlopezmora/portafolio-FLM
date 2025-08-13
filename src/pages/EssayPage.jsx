// src/pages/EssayPage.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/essay.css";
import PrevNext from "../components/PrevNext";

// Mapeo dinámico de todos los MDX en /essays
// Vite devolverá módulos con { default: Component, frontmatter? }
const mdxModules = import.meta.glob("../essays/*.mdx");

function slugify(str = "") {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function EssayPage() {
  const { slug } = useParams();

  const [Mod, setMod] = useState(null);           // componente MDX
  const [frontmatter, setFrontmatter] = useState({}); // metadata del MDX
  const [notFound, setNotFound] = useState(false);

  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);

  // Cargar el MDX correspondiente al slug
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setNotFound(false);
      setMod(null);
      setFrontmatter({});

      // Buscamos por nombre de archivo: crafting-cruma.mdx -> slug "crafting-cruma"
      const entry = Object.entries(mdxModules).find(([path]) => {
        const name = path.split("/").pop().replace(/\.mdx$/i, "");
        return name === slug;
      });

      if (!entry) {
        if (!cancelled) setNotFound(true);
        return;
      }

      const [, loader] = entry;
      const mod = await loader(); // { default: Component, frontmatter? }

      if (cancelled) return;

      setMod(() => mod.default || null);
      // Algunos toolchains exponen frontmatter como export nombrado "frontmatter"
      // otros lo exponen como "metadata". Probamos ambos.
      setFrontmatter(mod.frontmatter || mod.metadata || {});
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  // Construye TOC desde los h2/h3 del MDX y asegura IDs
  useEffect(() => {
    if (!Mod) return; // esperamos a que cargue el componente
    // Timeout corto para asegurar que el HTML esté montado
    const t = setTimeout(() => {
      if (!articleRef.current) return;
      const nodes = Array.from(articleRef.current.querySelectorAll("h2, h3"));

      const items = nodes.map((el) => {
        if (!el.id) el.id = slugify(el.textContent || "");
        // margen de scroll para que no lo tape el top-nav
        el.style.scrollMarginTop = "96px";
        return {
          id: el.id,
          text: el.textContent || "",
          level: el.tagName.toLowerCase(), // 'h2' | 'h3'
        };
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
    // Actualizamos el hash (opcional)
    history.replaceState(null, "", `#${id}`);
  };

  // Render
  if (notFound) {
    return (
      <main className="essay-wrap bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="essay-topnav">
          <Link className="essay-back" to="/essays">← Volver</Link>
        </div>
        <div className="mx-auto max-w-[720px] px-6 py-10">
          <h1 className="essay-title">No encontrado</h1>
          <p className="essay-meta">El ensayo “{slug}” no existe.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1000px] essay-wrap bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top bar */}
      <div className="essay-topnav">
        <Link className="essay-back" to="/essays">← Volver</Link>
      </div>

      {/* Header */}
      <header className="essay-header">
        <h1 className="essay-title">{frontmatter.title || "Untitled"}</h1>
        {(frontmatter.date || frontmatter.description) && (
          <p className="essay-meta">
            {/* Vas a usar formato “Febrero 2024”, así que lo mostramos tal cual */}
            {frontmatter.date && <span>{frontmatter.date}</span>}
            {frontmatter.description && (
              <>
                {" "}&middot;{" "}
                <span>{frontmatter.description}</span>
              </>
            )}
          </p>
        )}
      </header>

      {/* Body con TOC + contenido */}
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 grid grid-cols-12 gap-6">
        {/* TOC (izquierda) */}
        <aside className="hidden lg:block col-span-3 pt-2 sticky top-20 self-start">
          <nav className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
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

        {/* Contenido */}
        <article ref={articleRef} className="essay-prose col-span-12 lg:col-span-9">
          {Mod ? <Mod /> : (
            <div className="text-neutral-500 dark:text-neutral-400">Cargando…</div>
          )}
        </article>
      </div>

      {/* Prev / Next: fuera del grid para ocupar ancho completo */}
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <PrevNext />
      </div>
    </main>
  );
}
