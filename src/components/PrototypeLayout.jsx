import "../styles/essay.css";

export default function PrototypeLayout({ 
  description, 
  children, 
  className = "",
  relative = false,
  customCursor = null
}) {
  return (
    <div className={`${relative ? 'relative' : ''} bg-neutral-50 text-black dark:bg-neutral-900 dark:text-white rounded-xl border border-neutral-200 dark:border-neutral-700 ${className}`}>
      {/* Cursor custom si se proporciona */}
      {customCursor}
      
      <div className="p-6">
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
