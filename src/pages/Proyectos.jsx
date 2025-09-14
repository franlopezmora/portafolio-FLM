import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import BottomNav from "../components/BottomNav";

export default function Proyectos() {
  const proyectos = [
    {
      titulo: "CRUMA",
      descripcion: "Planificador de horarios hecho por y para estudiantes",
      año: "2025",
      enlace: "/essay/crafting-cruma"
    },
    {
      titulo: "TPI Backend",
      descripcion: "Sistema completo con microservicios para gestionar pruebas de manejo",
      año: "2025",
      enlace: "/essay/crafting-tpi-backend"
    },
    {
      titulo: "TPI DSI",
      descripcion: "Sistema de gestión de red sísmica con análisis UML y patrones de diseño",
      año: "2024",
      enlace: null
    }
  ];

  return (
    <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors overflow-x-hidden pb-16">
      <div className="mx-auto max-w-[600px] px-5 py-6">
        <div className="flex items-center justify-end mb-8">
          <DarkModeToggle />
        </div>

        <div className="space-y-6">
          {proyectos.map((proyecto, index) => (
            <div key={index}>
              {proyecto.enlace ? (
                <Link 
                  to={proyecto.enlace}
                  className="block group hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg p-4 -m-4 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
                        {proyecto.titulo}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {proyecto.descripcion}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 ml-4 flex-shrink-0">
                      {proyecto.año}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="block rounded-lg p-4 -m-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                        {proyecto.titulo}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                        {proyecto.descripcion}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-500 ml-4 flex-shrink-0">
                      {proyecto.año}
                    </span>
                  </div>
                </div>
              )}
              {index < proyectos.length - 1 && (
                <div className="border-t border-neutral-200 dark:border-neutral-800 mt-6"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}


