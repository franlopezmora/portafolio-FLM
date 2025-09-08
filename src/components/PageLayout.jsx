import { Link, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import DarkModeToggle from "./DarkModeToggle";

export default function PageLayout({ 
  children, 
  backTo = "/",
  backText = "← Volver",
  showToc = false,
  toc = [],
  onTocItemClick = () => {}
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };
  return (
    <main 
      className="bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: 'var(--bg-color, #fafafa)',
        minHeight: '100vh'
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 pt-6">

        {/* Layout con flexbox para mejor control del sticky */}
        <div className="flex gap-x-10 lg:gap-x-10">
          
          {/* RAIL IZQUIERDO: Volver + TOC (sticky) - Desktop */}
          <aside className="toc-rail w-[200px] flex-shrink-0 hidden lg:block">
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
                <button type="button" onClick={handleBack} className="essay-back block mb-4 -ml-2">{backText}</button>
              </div>

              {/* TOC (solo si se solicita) */}
              {showToc && toc.length > 0 && (
                <nav className="space-y-0 text-[14px] text-neutral-500 dark:text-neutral-400">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTocItemClick(item.id)}
                      className={`block w-[170px] text-left transition-colors duration-200 py-0.5 px-2 rounded tracking-tight
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
            {/* Header responsive para móvil/tablet */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <button type="button" onClick={handleBack} className="essay-back -ml-2">{backText}</button>
              <DarkModeToggle />
            </div>
            
            {children}
          </div>

          {/* Espacio derecho para balance visual - Desktop */}
          <div className="toc-spacer w-[200px] flex-shrink-0 hidden lg:block">
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
      <BottomNav />
    </main>
  );
}
