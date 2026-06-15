import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import ProductProjectCard from "../components/ProductProjectCard";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../content/projects";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";

export default function Proyectos() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [introRef, introVisible] = useScrollAnimation(0);
  const [projectsRef, projectsVisible] = useScrollAnimation(100);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        inputRef.current?.blur();
        setSearchTerm("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const normalizedSearch = searchTerm.toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const category = typeof project.category === "string"
      ? project.category
      : project.category?.[language] || project.category?.ES || "";
    const tags = project.tags?.map((tag) =>
      typeof tag === "string" ? tag : tag?.[language] || tag?.ES || ""
    );

    return (
      searchTerm === "" ||
      project.title.toLowerCase().includes(normalizedSearch) ||
      project.description[language].toLowerCase().includes(normalizedSearch) ||
      category.toLowerCase().includes(normalizedSearch) ||
      tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch))
    );
  });

  const githubLink = (
    <a
      href="https://github.com/franlopezmora"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
    >
      {t("proyectos.viewOnGitHub")}
      <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden bg-neutral-50 pb-24 pt-24 text-black dark:bg-neutral-900 dark:text-white sm:pt-28">
        <div className="mx-auto max-w-[960px] px-4 py-4 sm:px-6">
          <section
            ref={introRef}
            className={`transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none ${
              introVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <SectionHeading
              as="h1"
              title={t("proyectos.title")}
              description={t("proyectos.description")}
              action={githubLink}
            />

            <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-neutral-200/90 bg-white/60 p-3 dark:border-neutral-800 dark:bg-neutral-900/60 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative min-w-0 flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t("proyectos.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="block min-h-11 w-full rounded-xl border border-neutral-200 bg-white/80 py-2 pl-10 pr-20 text-sm text-neutral-900 shadow-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-950/40 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-neutral-600"
                />
                <kbd className="pointer-events-none absolute inset-y-0 right-3 hidden items-center font-mono text-[11px] text-neutral-400 sm:flex">
                  Ctrl K
                </kbd>
                {isFocused && searchTerm && (
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setSearchTerm("");
                      inputRef.current?.focus();
                    }}
                    className="absolute inset-y-0 right-2 flex items-center rounded-lg px-2 text-neutral-400 hover:text-neutral-700 sm:right-16 dark:hover:text-neutral-200"
                    aria-label="Clear search"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2 px-1 text-neutral-500 dark:text-neutral-400">
                <img src="/icons/Group 1.svg" alt="" className="h-4 w-4 dark:hidden" />
                <img src="/icons/Group 2.svg" alt="" className="hidden h-4 w-4 dark:block" />
                <span className="font-mono text-xs">
                  {filteredProjects.length} {t(filteredProjects.length === 1 ? "proyectos.project" : "proyectos.repositories")}
                </span>
              </div>
            </div>
          </section>

          <section
            ref={projectsRef}
            className={`mt-6 grid grid-cols-1 gap-4 transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none md:grid-cols-2 ${
              projectsVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {filteredProjects.map((project) => {
              const isPrimary = project.id === "pique";
              const isEnterprise = project.id === "sge";

              return (
                <ProductProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  tone={isPrimary ? "primary" : isEnterprise ? "enterprise" : "default"}
                  prominent={isPrimary || isEnterprise}
                  showStars
                  className={isPrimary || isEnterprise ? "md:col-span-2" : ""}
                />
              );
            })}
          </section>
        </div>
        <BottomNav />
      </main>
    </>
  );
}
