import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/100 dark:bg-neutral-900/100">
      <div className="mx-auto max-w-[850px] px-5 py-6">
        <div className="flex items-center justify-between">
          {/* Dominio (enlace a landing) */}
          <Link
            to="/"
            className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            aria-label="Ir a inicio"
          >
            portfolio-flm.vercel.app
          </Link>

          {/* Iconos sociales */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/franciscolopezmora" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/franlopezmora" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group transition-colors"
              aria-label="GitHub"
            >
              <img 
                src="/icons/GitHub_light.svg" 
                alt="GitHub" 
                className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity filter dark:invert" 
              />
            </a>

            {/* Email */}
            <a 
              href="mailto:francisco@example.com" 
              className="group transition-colors"
              aria-label="Enviar email"
            >
              <svg className="w-5 h-5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </a>

            {/* CV Download */}
            <a 
              href="/Francisco Lopez Mora CV.pdf" 
              download 
              className="group transition-colors"
              aria-label="Descargar CV"
            >
              <svg className="w-5 h-5 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
