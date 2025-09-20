import { Link } from "react-router-dom";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function ComponentsSection() {
  const [ref, isVisible] = useScrollAnimation(300);
  const components = [
    {
      id: "vanish-input",
      title: "Vanish Input",
      description: "Input que desaparece con animación suave",
      icon: "/icons/SVGRepo_iconCarrier-1.svg",
      gradient: "from-purple-400 to-blue-500",
      link: "/prototype/2"
    },
    {
      id: "gooey-tooltip",
      title: "Gooey Tooltip",
      description: "Tooltip con efecto gooey y animaciones",
      icon: "/icons/Vector.svg",
      gradient: "from-pink-400 to-purple-500",
      link: "/prototype/4"
    },
    {
      id: "animated-checkbox",
      title: "Animated Checkbox",
      description: "Checkbox con animaciones fluidas",
      icon: "/icons/Group 3.svg",
      gradient: "from-green-400 to-emerald-500",
      link: "/prototype/6"
    },
    {
      id: "pill-nav-bar",
      title: "Pill Nav Bar",
      description: "Barra de navegación estilo dock con animaciones",
      icon: null, // SVG inline
      gradient: "from-purple-400 to-purple-500",
      link: "/prototype/7"
    }
  ];

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty('--x', x + 'px');
    e.currentTarget.style.setProperty('--y', y + 'px');
  };

  return (
    <section 
      ref={ref}
      className={`flex flex-col space-y-4 mb-16 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Components</h2>
        <Link to="/craft" className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors">
          More
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {components.map((component) => (
          <div
            key={component.id}
            className={`p-4 rounded-lg border ${component.id === 'pill-nav-bar' ? 'border-[0.5px] border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900 shadow-sm' : 'border-neutral-200 dark:border-neutral-800'} card-glow card-glow-border`}
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Link to={component.link} className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-neutral-600 dark:hover:text-white transition-colors">
                  <div className={`w-7 h-7 rounded bg-gradient-to-br ${component.gradient} flex items-center justify-center`}>
                    {component.icon ? (
                      <img src={component.icon} alt={component.title} className="w-4 h-4" />
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-neutral-700 dark:text-neutral-100 group-hover:text-neutral-900 dark:group-hover:text-white truncate">{component.title}</span>
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
                    src="/icons/GitHub_light.svg?v=2" 
                    alt="GitHub" 
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity dark:hidden" 
                  />
                  <img 
                    src="/icons/GitHub_dark.svg?v=2" 
                    alt="GitHub" 
                    className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity hidden dark:block" 
                  />
                </a>
              </div>
            </div>
            <p className={`text-sm text-neutral-600 dark:text-neutral-400 ${component.id === 'pill-nav-bar' ? 'mt-3 mb-4' : 'mt-3'}`}>
              {component.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
