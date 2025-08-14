import DarkModeToggle from "./DarkModeToggle";

export default function PrototypeLayout({ 
  title, 
  date, 
  description, 
  children, 
  className = "",
  relative = false,
  customCursor = null
}) {
  return (
    <div className={`${relative ? 'relative' : ''} bg-white text-black dark:bg-neutral-900 dark:text-white p-4 ${className}`}>
      {/* Cursor custom si se proporciona */}
      {customCursor}
      
      <div className="max-w-4xl mx-auto">
        {/* Header con título, fecha y toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-left">
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {date}
            </p>
          </div>
          <div className="flex items-center gap-4" style={{ marginTop: '-7px' }}>
            {/* Toggle Dark Mode */}
            <DarkModeToggle />
          </div>
        </div>

        {description && (
          <p className="text-neutral-500 mb-4 text-sm">
            {description}
          </p>
        )}

        {/* Contenido del prototipo */}
        {children}
      </div>
    </div>
  );
}
