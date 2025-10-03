import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const Item = ({ to, external = false, label }) => {
    const isActive = !external && pathname === to;
    const base = "px-3 py-2 rounded-full text-sm transition-colors";
    const active = "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900";
    const inactive = "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 hover:bg-neutral-300/80 dark:hover:bg-neutral-700";
    if (external) {
      return (
        <a href={to} target="_blank" rel="noreferrer" className={`${base} ${inactive}`}>
          {label}
        </a>
      );
    }
    return (
      <Link to={to} className={`${base} ${isActive ? active : inactive}`}>
        {label}
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 px-2 py-2 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-neutral-900/60">
        <Item to="/" label={t('bottomNav.home')} />
        <Item to="/proyectos" label={t('bottomNav.projects')} />
        <Item to="/craft" label={t('bottomNav.craft')} />
      </div>
    </nav>
  );
}


