import { Link } from "react-router-dom";
import { projects } from "../../content/projects";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useLanguage } from "../../context/LanguageContext";
import ProductProjectCard from "../ProductProjectCard";
import SectionHeading from "../SectionHeading";

const featuredProjectIds = [
  "pique",
  "sge",
  "calip-backoffice",
  "cruma",
  "link-shorter",
  "tpi-backend",
];

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation(200);
  const { t, language } = useLanguage();
  const featuredProjects = projects.filter((project) => featuredProjectIds.includes(project.id));

  const moreLink = (
    <Link
      to="/proyectos"
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
    >
      {t("projects.more")}
      <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );

  return (
    <section
      ref={ref}
      className={`mb-24 transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <SectionHeading title={t("projects.title")} description={t("projects.description")} action={moreLink} />

      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredProjects.map((project) => {
          const isPrimary = project.id === "pique";
          const isEnterprise = project.id === "sge";

          return (
            <ProductProjectCard
              key={project.id}
              project={project}
              language={language}
              tone={isPrimary ? "primary" : isEnterprise ? "enterprise" : "default"}
              prominent={isPrimary || isEnterprise}
              className={isPrimary || isEnterprise ? "md:col-span-2" : ""}
            />
          );
        })}
      </div>
    </section>
  );
}
