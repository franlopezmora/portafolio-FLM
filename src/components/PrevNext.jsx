import { Link, useLocation } from "react-router-dom";
import { getSiblingsFor } from "../content/ordering";

export default function PrevNext() {
  const { pathname } = useLocation();
  const { prev, next } = getSiblingsFor(pathname);

  if (!prev && !next) return null;

  return (
    <nav className="mt-10 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-4 text-[14px]">
      <div className="min-h-[48px]">
        {prev && (
          <Link
            to={prev.route}
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <div className="uppercase tracking-wide text-[12px] mb-1">Anterior</div>
            <div className="font-medium">{prev.title || "Anterior"}</div>
          </Link>
        )}
      </div>

      <div className="min-h-[48px] text-right ml-auto">
        {next && (
          <Link
            to={next.route}
            className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            <div className="uppercase tracking-wide text-[12px] mb-1">Siguiente</div>
            <div className="font-medium">{next.title || "Siguiente"}</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
