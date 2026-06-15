import { Link } from "react-router-dom";
import GitHubStars from "./GitHubStars";
import UpdatedPill from "./UpdatedPill";

const toneClasses = {
  primary:
    "border-violet-200/90 bg-gradient-to-br from-violet-50/90 via-white/70 to-indigo-50/70 dark:border-violet-900/70 dark:from-violet-950/25 dark:via-neutral-900/80 dark:to-indigo-950/20",
  enterprise:
    "border-slate-300/90 bg-gradient-to-br from-slate-100/80 via-white/70 to-neutral-50/70 dark:border-slate-700/80 dark:from-slate-900/55 dark:via-neutral-900/80 dark:to-neutral-900/70",
  default:
    "border-neutral-200/90 bg-white/70 dark:border-neutral-800 dark:bg-neutral-900/70",
};

const getTranslatedText = (value, language) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] || value.ES || "";
};

function TechIcon({ tech }) {
  switch (tech) {
    case "React":
      return (
        <>
          <img src="/icons/React_light.svg" alt="" className="h-3.5 w-3.5 dark:hidden" />
          <img src="/icons/React_dark.svg" alt="" className="hidden h-3.5 w-3.5 dark:block" />
        </>
      );
    case "Next.js":
      return <img src="/icons/nextjs_icon_dark.svg" alt="" className="h-3.5 w-3.5" />;
    case "NextAuth":
      return <img src="/icons/nextauth.svg" alt="" className="h-3.5 w-3.5" />;
    case "Prisma":
      return (
        <>
          <img src="/icons/Prisma_light.svg" alt="" className="h-3.5 w-3.5 dark:hidden" />
          <img src="/icons/Prisma_dark.svg" alt="" className="hidden h-3.5 w-3.5 dark:block" />
        </>
      );
    case "Java":
      return <img src="/icons/java.svg" alt="" className="h-3.5 w-3.5" />;
    case "Spring Boot":
      return <img src="/icons/spring.svg" alt="" className="h-3.5 w-3.5" />;
    case "PostgreSQL":
      return <img src="/icons/postgresql.svg" alt="" className="h-3.5 w-3.5" />;
    case "Docker":
      return <img src="/icons/docker.svg" alt="" className="h-3.5 w-3.5" />;
    case "JWT":
      return <img src="/icons/jwt.svg" alt="" className="h-3.5 w-3.5" />;
    case "TypeScript":
      return <img src="/icons/typescript.svg" alt="" className="h-3.5 w-3.5" />;
    case "Tailwind CSS":
      return <img src="/icons/tailwindcss.svg" alt="" className="h-3.5 w-3.5" />;
    case "Node.js":
      return <img src="/icons/nodejs.svg" alt="" className="h-3.5 w-3.5" />;
    default:
      return null;
  }
}

function ProjectIcon({ projectId, prominent = false }) {
  const size = prominent ? "h-11 w-11 rounded-xl" : "h-9 w-9 rounded-lg";
  const imageSize = prominent ? "h-8 w-8" : "h-6 w-6";

  switch (projectId) {
    case "pique":
      return (
        <div className={`${size} flex items-center justify-center bg-neutral-100 dark:bg-neutral-800`}>
          <img src="/icons/pique-isotipo.svg" alt="" className={imageSize} />
        </div>
      );
    case "sge":
      return (
        <div className={`${size} flex items-center justify-center bg-gradient-to-br from-slate-500 to-slate-700 text-[10px] font-semibold text-white shadow-sm`}>
          SGE
        </div>
      );
    case "calip-backoffice":
      return (
        <div className={`${size} flex items-center justify-center bg-neutral-100 dark:bg-neutral-800`}>
          <img src="/icons/calip-mark.svg" alt="" className={imageSize} />
        </div>
      );
    case "link-shorter":
      return (
        <div className={`${size} flex items-center justify-center bg-neutral-100 dark:bg-neutral-800`}>
          <img src="/icons/link-shorter.svg" alt="" className={imageSize} />
        </div>
      );
    case "colorcheck":
      return (
        <div className={`${size} flex items-center justify-center bg-neutral-100 dark:bg-neutral-800`}>
          <img src="/icons/icon.svg" alt="" className={imageSize} />
        </div>
      );
    case "cruma":
      return (
        <div className={`${size} flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-500`}>
          <img src="/icons/Group 4.svg" alt="" className={imageSize} />
        </div>
      );
    case "tpi-backend":
      return (
        <div className={`${size} flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500`}>
          <img src="/icons/Group 5.svg" alt="" className={imageSize} />
        </div>
      );
    case "chess-analyzer":
      return (
        <div className={`${size} flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700`}>
          <img src="/icons/chess-analyzer.svg" alt="" className={imageSize} />
        </div>
      );
    default:
      return (
        <div className={`${size} flex items-center justify-center bg-neutral-200 text-sm font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200`}>
          {projectId.slice(0, 1).toUpperCase()}
        </div>
      );
  }
}

function ArrowIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProductProjectCard({
  project,
  language,
  tone = "default",
  prominent = false,
  showStars = false,
  className = "",
}) {
  const description = getTranslatedText(project.description, language);
  const category = getTranslatedText(project.category, language);
  const badge = getTranslatedText(project.badge, language);
  const isInternal = project.href?.startsWith("/");
  const titleClass = prominent
    ? "text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl"
    : "text-base font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-lg";
  const titleContent = (
    <>
      <span>{project.title}</span>
      <ArrowIcon className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 motion-reduce:transform-none" />
    </>
  );

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
  };

  return (
    <article
      data-project-id={project.id}
      className={`card-glow card-glow-border relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition-colors duration-200 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6 ${toneClasses[tone]} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {tone === "primary" && (
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent" />
      )}

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {category && (
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
              {category}
            </span>
          )}
          {project.year && (
            <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
              {project.year}
            </span>
          )}
        </div>
        {badge ? (
          <span className="rounded-full border border-neutral-300/80 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-950/40 dark:text-neutral-200">
            {badge}
          </span>
        ) : (
          (project.status || project.updated) && (
            <UpdatedPill label={project.status || undefined} />
          )
        )}
      </div>

      <div className="relative z-10 mt-5 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <ProjectIcon projectId={project.id} prominent={prominent} />
          {project.href ? (
            isInternal ? (
              <Link to={project.href} className={`group/title inline-flex min-w-0 items-center gap-1.5 hover:text-neutral-600 dark:hover:text-neutral-200 ${titleClass}`}>
                {titleContent}
              </Link>
            ) : (
              <a href={project.href} target="_blank" rel="noopener noreferrer" className={`group/title inline-flex min-w-0 items-center gap-1.5 hover:text-neutral-600 dark:hover:text-neutral-200 ${titleClass}`}>
                {titleContent}
              </a>
            )
          ) : (
            <h3 className={titleClass}>{project.title}</h3>
          )}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub: ${project.title}`}
            className="relative z-20 shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100"
          >
            <img src="/icons/GitHub_light.svg?v=4" alt="" className="h-5 w-5 dark:hidden" />
            <img src="/icons/GitHub_dark.svg?v=4" alt="" className="hidden h-5 w-5 dark:block" />
          </a>
        )}
      </div>

      <p className={`relative z-10 mt-4 leading-6 text-neutral-600 dark:text-neutral-400 ${prominent ? "max-w-[68ch] text-[15px] sm:text-base" : "text-sm"}`}>
        {description}
      </p>

      {project.tags?.length > 0 && (
        <div className="relative z-10 mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.tags.map((tag) => {
            const label = getTranslatedText(tag, language);

            return (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-300"
              >
                <TechIcon tech={label} />
                {label}
              </span>
            );
          })}
        </div>
      )}

      {showStars && project.githubOwner && project.githubRepo && (
        <div className="relative z-10 mt-4 flex justify-end border-t border-neutral-200/70 pt-4 dark:border-neutral-800">
          <GitHubStars owner={project.githubOwner} repo={project.githubRepo} />
        </div>
      )}
    </article>
  );
}
