import React from "react";
import clsx from "clsx";

type UpdatedPillProps = {
  /** Mostrar/ocultar sin desmontar el nodo (evita reinicios de animación) */
  on?: boolean;
  /** Texto a mostrar (por defecto “updated”) */
  label?: string;
  /** Ícono opcional (ej. <svg/>) */
  icon?: React.ReactNode;
  className?: string;
  /** Si querés cambiar el title/aria-label para accesibilidad */
  title?: string;
};

export default function UpdatedPill({
  on = true,
  label = "updated",
  icon,
  className,
  title,
}: UpdatedPillProps) {
  return (
    <span
      title={title ?? (on ? label : undefined)}
      aria-hidden={!on}
      className={clsx(
        // base pill
        "inline-flex items-center justify-center rounded-full border px-2 h-5 text-[10px] font-medium",
        "transition-opacity duration-200",
        // borders
        "border-neutral-300 dark:border-neutral-800",
        // gradient background (igual a tu span anterior)
        "bg-[linear-gradient(110deg,#f5f5f5,45%,#d4d4d4,55%,#f5f5f5)]",
        "dark:bg-[linear-gradient(110deg,#171717,45%,#262626,55%,#171717)]",
        "bg-[length:200%_100%]",
        // text color
        "text-neutral-700 dark:text-neutral-200",
        // animación
        "badge-shine",
        // visibilidad sin desmontar
        on ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
    >
      {icon ? <span className="mr-1 inline-flex">{icon}</span> : null}
      {label}
    </span>
  );
}
