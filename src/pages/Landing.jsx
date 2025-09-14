import { Link } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";
import BottomNav from "../components/BottomNav";

export default function Landing() {
  return (
    <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors overflow-x-hidden">
      <div className="mx-auto max-w-[600px] px-5 py-6">
        {/* Header con toggle */}
        <div className="flex justify-end mb-8">
          <DarkModeToggle />
        </div>

        {/* Sección Personal */}
        <section className="mb-16">

           {/* Bio */}
           <div className="text-left mb-8">
             <h1 className="text-2xl sm:text-3xl font-normal mb-4">
               <span className="font-bold">Francisco López Mora</span> es un desarrollador full‑stack.
             </h1>
             
             <div className="space-y-3 text-neutral-600 dark:text-neutral-300 max-w-[60ch]">
               <p>
                 Me gustan las interfaces simples, la performance web y construir cosas útiles. 
                 actualmente explorando ideas y escribiendo.
               </p>
               
               <p>
                 Paso mis días construyendo prototipos y utilidades, y mis noches escribiendo 
                 notas y ensayos breves sobre desarrollo y diseño de producto.
               </p>
             </div>
           </div>

           {/* Enlaces sociales */}
           <div className="flex justify-start space-x-6 mb-12 mt-12">
             
             <div className="relative group">
               <a href="https://github.com/franlopezmora" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                 </svg>
               </a>
               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                 Ver GitHub
                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
               </div>
             </div>
             
             <div className="relative group">
               <a href="/Francisco Lopez Mora CV.pdf" download className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                 </svg>
               </a>
               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                 Descargar CV
                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
               </div>
             </div>
             <div className="relative group">
               <a href="mailto:francisco@example.com" className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                 </svg>
               </a>
               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                 Enviar email
                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
               </div>
             </div>
           </div>
        </section>

         {/* Sección de Trabajo */}
         <section className="mb-16">
           <h2 className="text-xl font-medium mb-6">trabajo</h2>
           <div className="space-y-4">
             <div className="flex items-center space-x-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
                 CIDS
               </div>
               <div className="flex-1">
                 <h3 className="font-medium">Desarrollador Full Stack</h3>
                 <p className="text-sm text-neutral-600 dark:text-neutral-400">Abril 2025 - Ahora</p>
                 <div className="flex flex-wrap gap-1 mt-2">
                   <span className="inline-block px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                     AngularJS
                   </span>
                   <span className="inline-block px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                     Java
                   </span>
                   <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                     SQL
                   </span>
                 </div>
               </div>
             </div>
             
             <div className="flex items-center space-x-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white font-bold text-sm">
                 LABSIS
               </div>
               <div className="flex-1">
                 <h3 className="font-medium">Operador de Redes</h3>
                 <p className="text-sm text-neutral-600 dark:text-neutral-400">Junio 2024 - Mayo 2025</p>
                 <div className="flex flex-wrap gap-1 mt-2">
                   <span className="inline-block px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                     Linux
                   </span>
                   <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                     Docker
                   </span>
                   <span className="inline-block px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                     AWS
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </section>

         {/* Sección de Proyectos */}
         <section className="mb-16">
           <h2 className="text-xl font-medium mb-6">proyectos destacados</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Link to="/essay/crafting-cruma" className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                   C
                 </div>
                 <h3 className="font-medium">CRUMA</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Planificador de horarios hecho por y para estudiantes
               </p>
               <div className="flex flex-wrap gap-1 mb-2">
                 <span className="inline-block px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                   Java
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                   React
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full">
                   PostgreSQL
                 </span>
               </div>
               <span className="text-xs text-neutral-500 dark:text-neutral-400">Ver ensayo →</span>
             </Link>

             <Link to="/essay/crafting-tpi-backend" className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                   TPI
                 </div>
                 <h3 className="font-medium">TPI Backend</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Sistema completo con microservicios para gestionar pruebas de manejo
               </p>
               <div className="flex flex-wrap gap-1 mb-2">
                 <span className="inline-block px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                   Java
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                   React
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                   Docker
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                   Microservicios
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full">
                   PostgreSQL
                 </span>
               </div>
               <span className="text-xs text-neutral-500 dark:text-neutral-400">Ver ensayo →</span>
             </Link>

             <div className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                   DSI
                 </div>
                 <h3 className="font-medium">TPI DSI</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Sistema de gestión de red sísmica con análisis UML y patrones de diseño
               </p>
               <div className="flex flex-wrap gap-1 mb-2">
                 <span className="inline-block px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
                   C#
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                   PostgreSQL
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                   WinForms
                 </span>
                 <span className="inline-block px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                   UML
                 </span>
               </div>
             </div>
           </div>
         </section>

         {/* Sección Craft */}
         <section className="mb-16">
           <h2 className="text-xl font-medium mb-6">craft</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Link to="/prototype/2" className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                   V
                 </div>
                 <h3 className="font-medium">Vanish Input</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Input que desaparece con animación suave
               </p>
               <span className="text-xs text-neutral-500 dark:text-neutral-400">Ver prototipo →</span>
             </Link>

             <Link to="/prototype/4" className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                   G
                 </div>
                 <h3 className="font-medium">Gooey Tooltip</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Tooltip con efecto gooey y animaciones
               </p>
               <span className="text-xs text-neutral-500 dark:text-neutral-400">Ver prototipo →</span>
             </Link>

             <Link to="/prototype/6" className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                   A
                 </div>
                 <h3 className="font-medium">Animated Checkbox</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Checkbox con animaciones fluidas
               </p>
               <span className="text-xs text-neutral-500 dark:text-neutral-400">Ver prototipo →</span>
             </Link>

             <Link to="/craft" className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-500 to-slate-500 flex items-center justify-center text-white text-xs font-bold">
                   +
                 </div>
                 <h3 className="font-medium">Ver todos los prototipos</h3>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                 Explora todos mis prototipos y experimentos
               </p>
               <span className="text-xs text-neutral-500 dark:text-neutral-400">Ver craft completo →</span>
             </Link>
           </div>
         </section>

         {/* Enlaces rápidos */}
         <section className="mb-16">
           <h2 className="text-xl font-medium mb-6">rápidos</h2>
           <div className="space-y-3">
             <Link 
               to="/proyectos" 
               className="block p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
             >
               <div className="flex items-center justify-between">
                 <span>Todos mis proyectos</span>
                 <span className="text-neutral-400">→</span>
               </div>
             </Link>
           </div>
         </section>

         {/* Footer */}
         <footer className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8 mb-20">
           <p>© 2025 Francisco López Mora.</p>
         </footer>
      </div>
      
      <BottomNav />
    </main>
  );
}
