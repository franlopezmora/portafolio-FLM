import { Link } from "react-router-dom";
import { projects } from "../../content/projects";

export default function ProjectsSection() {
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
      case 'TypeScript':
        return <img src="/icons/typescript.svg" alt="TypeScript" className="w-4 h-4" />;
      case 'Tailwind CSS':
        return <img src="/icons/tailwindcss.svg" alt="Tailwind CSS" className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getProjectIcon = (projectId) => {
    switch (projectId) {
      case "colorcheck":
        return (
          <div className="w-7 h-7 rounded bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
            <img src="/icons/icon.svg" alt="ColorCheck" className="w-5 h-5" />
          </div>
        );
      case "cruma":
        return (
          <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
            <img src="/icons/Group 4.svg" alt="CRUMA" className="w-6 h-6" />
          </div>
        );
      case "tpi-backend":
        return (
          <div className="w-7 h-7 rounded bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <img src="/icons/Group 5.svg" alt="Driver Test Manager" className="w-6 h-6" />
          </div>
        );
      default:
        return null;
    }
  };

  const featuredProjects = projects.filter(p => ["colorcheck","cruma","tpi-backend"].includes(p.id));

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Projects</h2>
        <Link to="/proyectos" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors">
          More
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredProjects.map((p) => (
          <article
            key={p.id}
            className="p-4 rounded-lg border-[0.5px] border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900 shadow-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] card-glow card-glow-border"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - r.left;
              const y = e.clientY - r.top;
              e.currentTarget.style.setProperty('--x', x + 'px');
              e.currentTarget.style.setProperty('--y', y + 'px');
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <a href={p.href} className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                  {getProjectIcon(p.id)}
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
                {p.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 text-xs font-mono border border-neutral-200 dark:border-neutral-600">
                    {getTechIcon(t)}
                    {t}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
