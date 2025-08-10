// components/AnimatedTickCheckbox.jsx
"use client"

import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedTickCheckbox({
  checked,
  onChange,
  size = 24,
  color = "#22c55e", // emerald-500
  className = "",
}) {
  const handleToggle = () => onChange?.(!checked)
  const handleKey = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      handleToggle()
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      onKeyDown={handleKey}
      aria-pressed={checked}
      aria-label={checked ? "Desmarcar" : "Marcar"}
      className={`relative inline-grid place-items-center outline-none ${className}`}
      style={{ width: size + 10, height: size + 10 }}
    >
      {/* Backplate */}
      <motion.span
        className="absolute inset-0 rounded-md border"
        initial={false}
        animate={{
          backgroundColor: checked ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.02)",
          borderColor: checked ? color : "rgba(255,255,255,0.3)",
          scale: checked ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Ripple solo al marcar */}
      <AnimatePresence>
        {checked && (
          <motion.span
            key="ripple"
            className="absolute inset-0 rounded-md"
            style={{ backgroundColor: "rgba(34,197,94,0.25)" }}
            initial={{ scale: 0.2, opacity: 0.6 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Check dibujándose */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className="relative"
      >
        {/* opcional: contorno interior suave */}
        <motion.rect
          x="2" y="2" width="20" height="20" rx="5"
          stroke={checked ? color : "rgba(255,255,255,0.35)"}
          strokeWidth="1.2"
          opacity={0.3}
        />
<motion.path
  d="M6 12l4 4 8-8"
  stroke={color}
  strokeWidth="3"
  strokeLinecap="round"
  strokeLinejoin="round"
  initial={{ pathLength: 0, opacity: 0 }}          // evita el punto al primer render
  animate={{
    pathLength: checked ? 1 : 0,                    // trazo se dibuja
    opacity: checked ? 1 : 0,                       // oculto del todo cuando está desmarcado
  }}
  transition={{
    pathLength: { duration: 0.25, ease: "easeOut" },
  }}
/>

      </motion.svg>
      {/* Glow solo cuando está marcado */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-md"
        style={{ filter: "blur(6px)" }}
        initial={false}
        animate={{ boxShadow: checked ? `0 0 16px ${color}88` : "0 0 0 rgba(0,0,0,0)" }}
        transition={{ duration: 0.25 }}
      />
    </button>
  )
}
