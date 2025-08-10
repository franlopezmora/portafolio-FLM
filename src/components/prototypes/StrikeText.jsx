// components/prototypes/StrikeText.jsx
"use client"

import { motion } from "framer-motion"

export default function StrikeText({
  striked = false,
  children,
  className = "",
  thickness = 2,          // px
  duration = 0.5,
  
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* texto */}
      <span className={striked ? "text-neutral-400" : ""}>{children}</span>

      {/* línea que se dibuja de izq a der */}
<motion.span
  aria-hidden
  className="absolute left-0 top-1/2 w-full -translate-y-1/2 bg-current pointer-events-none"
  style={{ height: thickness, transformOrigin: "left center", opacity: 1 }}
  initial={{ scaleX: striked ? 1 : 0 }}
  animate={{ scaleX: striked ? 1 : 0 }}
  transition={{ duration, ease: "easeOut" }}
/>

    </span>
  )
}
