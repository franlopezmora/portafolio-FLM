import { Link, useLocation } from "react-router-dom";
import { getSiblingsFor } from "../content/ordering";
import { useLanguage } from "../context/LanguageContext";

export default function PrevNext() {
  const { pathname } = useLocation();
  const { t, language } = useLanguage();
  const { prev, next } = getSiblingsFor(pathname, language);
  
  // Helper function to get translated text
  const getTranslatedText = (text) => {
    if (!text) return "";
    if (typeof text === "string") return text;
    if (typeof text === "object" && text[language]) return text[language];
    if (typeof text === "object" && text.ES) return text.ES; // Fallback to Spanish
    return text;
  };

  if (!prev && !next) return null;

  return (
    <nav className="mt-10 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-4 text-[14px]">
      <div className="min-h-[48px]">
        {prev && (
          <Link
            to={prev.route}
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <div className="uppercase tracking-wide text-[12px] mb-1">{t('prevNext.previous')}</div>
            <div className="font-medium">{getTranslatedText(prev.title) || t('prevNext.previous')}</div>
          </Link>
        )}
      </div>

      <div className="min-h-[48px] text-right ml-auto">
        {next && (
          <Link
            to={next.route}
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <div className="uppercase tracking-wide text-[12px] mb-1">{t('prevNext.next')}</div>
            <div className="font-medium">{getTranslatedText(next.title) || t('prevNext.next')}</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
