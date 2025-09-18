import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import BottomNav from "../components/BottomNav";
import { projects } from "../content/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors overflow-x-hidden">
      <div className="mx-auto max-w-[980px] px-5 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Hola, soy Francisco.</h1>
            <p className="text-neutral-600 dark:text-neutral-300 mt-2 max-w-[60ch]">
              Desarrollador full‑stack orientado a producto. Me gustan las interfaces simples,
              la performance web y construir cosas útiles. Actualmente explorando ideas y escribiendo.
            </p>
          </div>
          <DarkModeToggle />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-medium mb-2">Ahora</h2>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
              <li>• Construyendo pequeños prototipos y utilidades.</li>
              <li>• Escribiendo notas y ensayos breves.</li>
              <li>• Trabajando con React, Node y diseño de producto.</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-medium mb-2">Rápidos</h2>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 text-sm">
              <li>
                <Link className="underline underline-offset-4" to="/craft">Mi trabajo y prototipos →</Link>
              </li>
              <li>
                <Link className="underline underline-offset-4" to="/essay/crafting-cruma">Ensayo destacado →</Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Proyectos destacados */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Proyectos</h2>
            <Link to="/proyectos" className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 underline underline-offset-4">
              Más →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter(p => ["toast","react-symbols","typethings","cruma","tpi-backend","svgl","slug","project-hackathon"].includes(p.id))
              .slice(0, 6)
              .map((p) => (
              <article key={p.id} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-800">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex items-center gap-2">
                    <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {p.title}
                      <span className="ml-1 align-top text-neutral-400">↗</span>
                    </h3>
                    {p.updated && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">updated</span>
                    )}
                  </div>
                  <a href={p.github || p.href || '#'} target={p.github || p.href ? "_blank" : undefined} rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                    <span aria-hidden>○</span>
                  </a>
                </div>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{p.description}</p>

                {p.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
