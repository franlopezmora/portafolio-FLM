import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { projects } from "../content/projects";
import GitHubStars from "../components/GitHubStars";

export default function Proyectos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  return (
    <>
      <Header />
      <main className="min-h-screen bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white overflow-x-hidden pt-28 md:pt-28 pb-16">
        <div className="mx-auto max-w-[850px] px-5 py-6">
          
          {/* Search bar */}
          <div className="relative mb-5">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Repositories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="block w-full pl-10 pr-10 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-800 focus:border-transparent shadow-sm"
            />
            {isFocused && searchTerm && (
              <button 
                onMouseDown={(e) => {
                  e.preventDefault();
                  setSearchTerm("");
                  inputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-md"
              >
                <svg className="h-4 w-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Stats and GitHub link */}
          <div className="flex items-center justify-between mb-5">
             <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
               <img src="/icons/Group 1.svg" alt="Repositories" className="w-4 h-4 dark:hidden" />
               <img src="/icons/Group 2.svg" alt="Repositories" className="w-4 h-4 hidden dark:block" />
               <span className="text-sm font-mono">
                 {projects.filter(p => 
                   searchTerm === "" || 
                   p.title.toLowerCase().includes(searchTerm.toLowerCase())
                 ).length} repositories
               </span>
             </div>
            <a 
              href="https://github.com/franlopezmora" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center gap-1 px-1 py-0.5 -mx-1 -my-0.5 rounded text-sm font-mono text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              View on GitHub
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          
          <div className="space-y-3">
            {projects
              .filter(p => 
                searchTerm === "" || 
                p.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((p) => (
              <article
                key={p.id}
                className="p-4 rounded-lg border-[0.5px] border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] card-glow card-glow-border"
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
                    <a href={p.href} className="group inline-flex items-center gap-2 px-1 py-0.5 -mx-1 -my-0.5 rounded hover:text-white dark:hover:text-white transition-colors">
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
                          className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity dark:hidden" 
                        />
                        <img 
                          src="/icons/GitHub_dark.svg" 
                          alt="GitHub" 
                          className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity hidden dark:block" 
                        />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{p.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  {p.tags && (
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => {
                        const getTechIcon = (tech) => {
                          switch (tech) {
                            case 'React':
                              return (
                                <>
                                  <img src="/icons/React_light.svg" alt="React" className="w-4 h-4 dark:hidden" />
                                  <img src="/icons/React_dark.svg" alt="React" className="w-4 h-4 hidden dark:block" />
                                </>
                              );
                            case 'Next.js':
                              return (
                                <>
                                  <img src="/icons/nextjs_icon_dark.svg" alt="Next.js" className="w-4 h-4 dark:hidden" />
                                  <img src="/icons/nextjs_icon_dark.svg" alt="Next.js" className="w-4 h-4 hidden dark:block" />
                                </>
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
                            case 'WCAG':
                              return (
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              );
                            case 'API REST':
                              return (
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              );
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
                  {p.githubOwner && p.githubRepo && (
                    <GitHubStars owner={p.githubOwner} repo={p.githubRepo} />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
        <BottomNav />
      </main>
    </>
  );
}


