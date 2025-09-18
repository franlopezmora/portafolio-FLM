import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { projects } from "../content/projects";

export default function Landing() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white transition-colors overflow-x-hidden pt-28 md:pt-28">
        <div className="mx-auto max-w-[850px] px-5 py-6">

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

        </section>

         {/* Sección de Trabajo */}
         <section className="mb-14">
           <h2 className="text-xl font-medium mb-8">Experience</h2>
           <div className="relative">
             {/* Timeline vertical */}
             <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700"></div>
             
             <div className="space-y-8">
               {/* Experiencia 1 */}
               <div className="relative pl-8">
                 {/* Punto del timeline */}
                 <div className="absolute left-[-5px] top-1 w-3 h-3 bg-neutral-300 dark:bg-neutral-700 border border-neutral-400 dark:border-neutral-600 rounded-full"></div>
                 
                 <div className="space-y-2">
                   <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">Abril 2025 - Present</p>
                   <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Desarrollador Full Stack</h3>
                   <a href="https://cids.com.ar" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                     <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white">CIDS</span>
                     <svg className="w-3 h-3 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   </a>
                   <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-[60ch]">
                     Desarrollo de soluciones para administración pública utilizando tecnologías avanzadas. 
                     En mi rol, he mejorado la agilidad del desarrollo implementando técnicas modernas, 
                     creando librerías TypeScript para compartir utilidades entre proyectos, escribiendo 
                     documentación y actualizando proyectos obsoletos a nuevas tecnologías.
                   </p>
                 </div>
               </div>
               
               {/* Experiencia 2 */}
               <div className="relative pl-8">
                 {/* Punto del timeline */}
                 <div className="absolute left-[-5px] top-1 w-3 h-3 bg-neutral-300 dark:bg-neutral-700 border border-neutral-400 dark:border-neutral-600 rounded-full"></div>
                 
                 <div className="space-y-2">
                   <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">Junio 2024 - Mayo 2025</p>
                   <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Operador de Redes</h3>
                   <a href="https://labsis.unlp.edu.ar" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                     <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white">LABSIS</span>
                     <svg className="w-3 h-3 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   </a>
                   <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-[60ch]">
                     Operación y mantenimiento de infraestructura de red sísmica. Administración de 
                     servidores Linux, gestión de contenedores Docker y despliegue de servicios en AWS. 
                     Monitoreo continuo de sistemas críticos y resolución de incidencias técnicas.
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </section>

        {/* Sección de Proyectos (estilo pheralb) */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Projects</h2>
            <Link to="/proyectos" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded text-sm text-neutral-500 hover:text-white dark:text-neutral-400 dark:hover:text-white transition-colors">
              More
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects
              .filter(p => ["cruma","tpi-backend"].includes(p.id))
              .map((p) => (
              <article
                key={p.id}
                className="p-4 rounded-lg border-[0.5px] border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900 shadow-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] card-glow card-glow-border"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - r.left; // x dentro de la card
                  const y = e.clientY - r.top;  // y dentro de la card
                  e.currentTarget.style.setProperty('--x', x + 'px');
                  e.currentTarget.style.setProperty('--y', y + 'px');
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <a href={p.href} className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                      {p.id === "cruma" && (
                        <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                          <img src="/icons/Group 4.svg" alt="CRUMA" className="w-6 h-6" />
                        </div>
                      )}
                      {p.id === "tpi-backend" && (
                        <div className="w-7 h-7 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                          <img src="/icons/Group 5.svg" alt="Driver Test Manager" className="w-6 h-6" />
                        </div>
                      )}
                      <span className="font-medium text-neutral-700 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white truncate">{p.title}</span>
                      <svg
                        className="w-3 h-3 text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    {p.updated && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300">updated</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
                        <img 
                          src="/icons/GitHub_light.svg" 
                          alt="GitHub" 
                          className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter dark:invert" 
                        />
                      </a>
                    )}
                    {(p.href && !p.github) && (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label="Abrir enlace" className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{p.description}</p>
                {p.tags && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => {
                      const getTechIcon = (tech) => {
                        switch (tech) {
                          case 'React':
                            return (
                              <picture>
                                <source media="(prefers-color-scheme: dark)" srcSet="/icons/React_dark.svg" />
                                <img src="/icons/React_light.svg" alt="React" className="w-4 h-4" />
                              </picture>
                            );
                          case 'Next.js':
                            return (
                              <picture>
                                <source media="(prefers-color-scheme: dark)" srcSet="/icons/nextjs_icon_dark.svg" />
                                <img src="/icons/nextjs_icon_dark.svg" alt="Next.js" className="w-4 h-4" />
                              </picture>
                            );
                          case 'Java':
                            return <img src="/icons/java.svg" alt="Java" className="w-4 h-4" />;
                          case 'Spring Boot':
                            return <img src="/icons/spring.svg" alt="Spring Boot" className="w-4 h-4" />;
                          case 'PostgreSQL':
                            return <img src="/icons/postgresql.svg" alt="PostgreSQL" className="w-4 h-4" />;
                          case 'Docker':
                            return <img src="/icons/docker.svg" alt="Docker" className="w-4 h-4" />;
                          case 'JWT':
                            return <img src="/icons/jwt.svg" alt="JWT" className="w-4 h-4" />;
                          default:
                            return null;
                        }
                      };
                      
                      return (
                        <span key={t} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 text-xs font-mono border border-neutral-200 dark:border-neutral-600">
                          {getTechIcon(t)}
                          {t}
                        </span>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

         {/* Sección Craft */}
         <section className="mb-16">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-xl font-medium">Components</h2>
             <Link to="/craft" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded text-sm text-neutral-500 hover:text-white dark:text-neutral-400 dark:hover:text-white transition-colors">
               More
               <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                 <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
             </Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-colors card-glow card-glow-border"
               onMouseMove={(e) => {
                 const r = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - r.left; const y = e.clientY - r.top;
                 e.currentTarget.style.setProperty('--x', x + 'px');
                 e.currentTarget.style.setProperty('--y', y + 'px');
               }}
             >
               <div className="flex items-start justify-between">
                 <div className="flex items-center gap-2">
                   <Link to="/prototype/2" className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                     <div className="w-7 h-7 rounded bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                       <img src="/icons/SVGRepo_iconCarrier-1.svg" alt="Vanish Input" className="w-4 h-4" />
                     </div>
                     <span className="font-medium text-neutral-700 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white truncate">Vanish Input</span>
                     <svg
                       className="w-3 h-3 text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
                       viewBox="0 0 24 24"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   </Link>
                 </div>
                 <div className="flex items-center gap-3 ml-4">
                   <a href="https://github.com/franlopezmora/portafolio-FLM" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
                     <img 
                       src="/icons/GitHub_light.svg" 
                       alt="GitHub" 
                       className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter dark:invert" 
                     />
                   </a>
                 </div>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                 Input que desaparece con animación suave
               </p>
             </div>

             <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-colors card-glow card-glow-border"
               onMouseMove={(e) => {
                 const r = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - r.left; const y = e.clientY - r.top;
                 e.currentTarget.style.setProperty('--x', x + 'px');
                 e.currentTarget.style.setProperty('--y', y + 'px');
               }}
             >
               <div className="flex items-start justify-between">
                 <div className="flex items-center gap-2">
                   <Link to="/prototype/4" className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                     <div className="w-7 h-7 rounded bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                       <img src="/icons/Vector.svg" alt="Gooey Tooltip" className="w-4 h-4" />
                     </div>
                     <span className="font-medium text-neutral-700 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white truncate">Gooey Tooltip</span>
                     <svg
                       className="w-3 h-3 text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
                       viewBox="0 0 24 24"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   </Link>
                 </div>
                 <div className="flex items-center gap-3 ml-4">
                   <a href="https://github.com/franlopezmora/portafolio-FLM" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
                     <img 
                       src="/icons/GitHub_light.svg" 
                       alt="GitHub" 
                       className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter dark:invert" 
                     />
                   </a>
                 </div>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                 Tooltip con efecto gooey y animaciones
               </p>
             </div>

             <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-colors card-glow card-glow-border"
               onMouseMove={(e) => {
                 const r = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - r.left; const y = e.clientY - r.top;
                 e.currentTarget.style.setProperty('--x', x + 'px');
                 e.currentTarget.style.setProperty('--y', y + 'px');
               }}
             >
               <div className="flex items-start justify-between">
                 <div className="flex items-center gap-2">
                   <Link to="/prototype/6" className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                     <div className="w-7 h-7 rounded bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                       <img src="/icons/Group 3.svg" alt="Animated Checkbox" className="w-4 h-4" />
                     </div>
                     <span className="font-medium text-neutral-700 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white truncate">Animated Checkbox</span>
                     <svg
                       className="w-3 h-3 text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all"
                       viewBox="0 0 24 24"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg"
                     >
                       <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   </Link>
                 </div>
                 <div className="flex items-center gap-3 ml-4">
                   <a href="https://github.com/franlopezmora/portafolio-FLM" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group">
                     <img 
                       src="/icons/GitHub_light.svg" 
                       alt="GitHub" 
                       className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter dark:invert" 
                     />
                   </a>
                 </div>
               </div>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                 Checkbox con animaciones fluidas
               </p>
             </div>


           </div>
         </section>

         {/* Footer */}
         <footer className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8 mb-20">
           <p>© 2025 Francisco López Mora.</p>
         </footer>
        </div>
        
        <BottomNav />
      </main>
    </>
  );
}
