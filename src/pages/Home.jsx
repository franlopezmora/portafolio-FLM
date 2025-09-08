import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import BottomNav from "../components/BottomNav";

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
      </div>
      <BottomNav />
    </main>
  );
}
