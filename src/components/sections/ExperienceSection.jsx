export default function ExperienceSection() {
  const experiences = [
    {
      period: "Abril 2025 - Present",
      title: "Desarrollador Full Stack",
      company: "CIDS",
      companyUrl: "https://cids.com.ar",
      description: "Desarrollo de soluciones para administración pública utilizando tecnologías avanzadas. En mi rol, he mejorado la agilidad del desarrollo implementando técnicas modernas, creando librerías TypeScript para compartir utilidades entre proyectos, escribiendo documentación y actualizando proyectos obsoletos a nuevas tecnologías."
    },
    {
      period: "Junio 2024 - Mayo 2025",
      title: "Operador de Redes",
      company: "LABSIS",
      companyUrl: "https://labsis.unlp.edu.ar",
      description: "Operación y mantenimiento de infraestructura de red sísmica. Administración de servidores Linux, gestión de contenedores Docker y despliegue de servicios en AWS. Monitoreo continuo de sistemas críticos y resolución de incidencias técnicas."
    }
  ];

  return (
    <section className="mb-14">
      <h2 className="text-xl font-medium mb-8">Experience</h2>
      <div className="relative">
        {/* Timeline vertical */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-neutral-300 dark:bg-neutral-700"></div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8">
              {/* Punto del timeline */}
              <div className="absolute left-[-5px] top-1 w-3 h-3 bg-neutral-300 dark:bg-neutral-700 border border-neutral-400 dark:border-neutral-600 rounded-full"></div>
              
              <div className="space-y-2">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{exp.period}</p>
                <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{exp.title}</h3>
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                  <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white">{exp.company}</span>
                  <svg className="w-3 h-3 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-[60ch]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
