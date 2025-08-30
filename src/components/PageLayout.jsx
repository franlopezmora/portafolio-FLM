import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function PageLayout({ 
  children, 
  backTo = "/",
  backText = "← Volver",
  showToc = false,
  toc = [],
  onTocItemClick = () => {}
}) {
  return (
    <main 
      className="bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg-color, #fafafa)',
        minHeight: '100vh'
      }}
    >
      <div className="mx-auto max-w-[1200px] px-0 pt-6">

        {/* Layout con flexbox para mejor control del sticky */}
        <div className="flex gap-x-10">
          
          {/* RAIL IZQUIERDO: Volver + TOC (sticky) */}
          <aside className="toc-rail w-[200px] flex-shrink-0">
            <div 
              style={{
                position: 'fixed',
                top: '32px',
                left: 'calc(50% - 600px)',
                width: '200px',
                zIndex: 20,
                maxHeight: 'calc(100vh - 64px)',
                overflowY: 'auto',
                overflowX: 'visible'
              }}
            >
              {/* Volver */}
              <div className="pl-2">
                <Link className="essay-back block mb-4 -ml-2" to={backTo}>{backText}</Link>
              </div>

              {/* TOC (solo si se solicita) */}
              {showToc && toc.length > 0 && (
                <nav className="space-y-0 text-[14px] text-neutral-500 dark:text-neutral-400">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTocItemClick(item.id)}
                      className={`block w-full text-left transition-colors duration-200 py-0.5 px-2 rounded tracking-tight
                        ${item.level === "h3" ? "pl-6 text-[14px]" : "pl-2"}
                        hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800
                      `}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div className="w-full max-w-[720px] mx-auto pb-32">
            {children}
          </div>

          {/* Espacio derecho para balance visual */}
          <div className="toc-spacer w-[200px] flex-shrink-0">
            <div 
              style={{
                position: 'fixed',
                top: '32px',
                right: 'calc(50% - 600px)',
                width: '200px',
                zIndex: 20,
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
