import { Link } from "react-router-dom";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useLanguage } from "../../context/LanguageContext";

export default function HeroSection() {
  const [ref, isVisible] = useScrollAnimation(0);
  const { t } = useLanguage();

  return (
    <section
      ref={ref}
      className={`mb-24 transition-all duration-500 motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-white/70 px-5 py-8 shadow-[0_24px_80px_-52px_rgba(0,0,0,0.35)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-[0_24px_80px_-52px_rgba(255,255,255,0.12)] sm:px-8 sm:py-10 md:px-10 md:py-12">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-neutral-400/70 to-transparent dark:via-neutral-600/70" />

        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          {t("hero.kicker")}
        </p>

        <h1
          className="mt-5 max-w-[21ch] text-3xl font-medium leading-[1.12] tracking-[-0.035em] text-neutral-950 dark:text-white sm:text-4xl md:text-5xl"
        >
          {t("hero.title")}
        </h1>

        <div className="mt-6 max-w-[68ch] space-y-3 text-[15px] leading-7 text-neutral-600 dark:text-neutral-300 sm:text-base">
          <p>{t("hero.description1")}</p>
          <p className="text-neutral-500 dark:text-neutral-400">{t("hero.description2")}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/proyectos"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            {t("hero.primaryCta")}
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="/Francisco Lopez Mora CV.pdf"
            download
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-950 dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {t("hero.secondaryCta")}
          </a>
        </div>

      </div>
    </section>
  );
}
