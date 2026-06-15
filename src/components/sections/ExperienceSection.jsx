import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useLanguage } from "../../context/LanguageContext";
import SectionHeading from "../SectionHeading";

export default function ExperienceSection() {
  const [ref, isVisible] = useScrollAnimation(100);
  const { t } = useLanguage();

  const experiences = [
    {
      period: t("experience.cids.period"),
      title: t("experience.cids.title"),
      company: t("experience.cids.company"),
      companyUrl: "http://www.cids.frc.utn.edu.ar/",
      description: t("experience.cids.description"),
    },
    {
      period: t("experience.labsis.period"),
      title: t("experience.labsis.title"),
      company: t("experience.labsis.company"),
      companyUrl: "https://labsys.frc.utn.edu.ar/",
      description: t("experience.labsis.description"),
    },
  ];

  return (
    <section
      ref={ref}
      className={`mb-24 transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <SectionHeading title={t("experience.title")} description={t("experience.description")} />

      <div className="mt-7 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white/60 px-5 dark:border-neutral-800 dark:bg-neutral-900/60 sm:px-7">
        {experiences.map((experience, index) => (
          <article
            key={experience.company}
            className={`relative py-6 pl-7 sm:py-7 sm:pl-9 ${index < experiences.length - 1 ? "border-b border-neutral-200/80 dark:border-neutral-800" : ""}`}
          >
            <div className="absolute bottom-0 left-0 top-0 w-px bg-neutral-200 dark:bg-neutral-800" />
            <div className="absolute left-[-4px] top-[31px] h-2.5 w-2.5 rounded-full border-2 border-neutral-50 bg-neutral-400 dark:border-neutral-900 dark:bg-neutral-600" />

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
                {experience.period}
              </p>
              <span className="h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" aria-hidden="true" />
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white"
              >
                {experience.company}
                <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <h3 className="mt-3 max-w-[34ch] text-lg font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-xl">
              {experience.title}
            </h3>
            <p className="mt-3 max-w-[72ch] text-sm leading-6 text-neutral-600 dark:text-neutral-400 sm:text-[15px]">
              {experience.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
