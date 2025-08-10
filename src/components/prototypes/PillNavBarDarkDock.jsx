// components/PillNavBarDarkDock.jsx
"use client"

import { useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, Trophy, Plus, Calendar, User } from "lucide-react"

export default function PillNavBarDarkDock({ embedded = false } = {}) {
  const [activeKey, setActiveKey] = useState("home")
  const [tooltipFor, setTooltipFor] = useState(null)
  const [pressTimer, setPressTimer] = useState(null)
  const [isDockHovering, setIsDockHovering] = useState(false)
  const [hoveredKey, setHoveredKey] = useState(null)
  const containerRef = useRef(null)

  const items = useMemo(() => ([
    { label: "Inicio",     icon: Home,     key: "home",         href: "" },
    { label: "Torneos",    icon: Trophy,   key: "tournaments",  href: "" },
    { label: "Crear",      icon: Plus,     key: "create",       href: "" },
    { label: "Calendario", icon: Calendar, key: "calendar",     href: "" },
    { label: "Perfil",     icon: User,     key: "profile",      href: "" },
  ]), [])

  // Parámetros
  const baseSize = 24
  const maxBoost = 12
  const elevBoost = 6
  const slotH = 22 // reserva de altura para cada ícono
  const basePadY = 8                // padding vertical base del dock (px)
  const dockLiftPad = 6            // cuánto aumenta el alto del dock al hover (px)

    const containerPosClasses = embedded
    ? "relative mx-auto"                             // ⬅️ dentro de la card
    : "fixed bottom-8 left-1/2 -translate-x-1/2"   // ⬅️ flotante global (default)


  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsDockHovering(true)}
      onMouseLeave={() => { setIsDockHovering(false); setTooltipFor(null); setHoveredKey(null) }}
      className={`
        ${containerPosClasses}
        w-[340px]
        rounded-full px-4
        bg-gray-900/80 backdrop-blur-md
        border border-white/10 shadow-2xl
        select-none
      `}
      style={{ WebkitTapHighlightColor: "transparent" }}
      initial={false}
      animate={{
        paddingTop: isDockHovering ? basePadY + dockLiftPad : basePadY,
        paddingBottom: basePadY,
      }}
      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
    >
      <ul className="flex items-end justify-between gap-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.key === activeKey
          const isHovered = hoveredKey === item.key
          const iconPx = isHovered ? baseSize + maxBoost : baseSize
          const tooltipId = `tooltip-${item.key}`

          return (
            <li key={item.key} className="flex-1 relative">
              <Link
                to={item.href}
                onClick={() => setActiveKey(item.key)}
                aria-label={item.label}
                className="block"
              >
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  className={`
                    mx-auto flex flex-col items-center justify-end
                    text-white ${isActive ? "text-blue-400" : "text-white/80 hover:text-white"}
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70
                    rounded-full p-2 transition-colors
                  `}
                  onMouseEnter={() => { setHoveredKey(item.key); setTooltipFor(item.key) }}
                  onMouseLeave={() => { setHoveredKey(null); setTooltipFor(null) }}
                  onFocus={() => { setHoveredKey(item.key); setTooltipFor(item.key) }}
                  onBlur={() => { setHoveredKey(null); setTooltipFor(null) }}
                  onTouchStart={() => {
                    clearTimeout(pressTimer || undefined)
                    const t = setTimeout(() => setTooltipFor(item.key), 350)
                    setPressTimer(t)
                  }}
                  onTouchEnd={() => { clearTimeout(pressTimer || undefined); setPressTimer(null) }}
                  onTouchCancel={() => { clearTimeout(pressTimer || undefined); setPressTimer(null) }}
                  aria-describedby={tooltipFor === item.key ? tooltipId : undefined}
                >
                  <motion.div
                    className="relative flex items-end justify-center"
                    style={{ height: slotH, willChange: "transform" }}
                    animate={{ y: isHovered ? -elevBoost : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.25 }}
                  >
                    <Icon
                    style={{
                        width: iconPx,
                        height: iconPx,
                        transition: "width 80ms linear, height 80ms linear",
                        filter: isActive ? "drop-shadow(0 0 6px rgba(59, 130, 246, 0.8))" : "none"
                    }}
                    />
                  </motion.div>
                </motion.button>
              </Link>

              <AnimatePresence>
                {tooltipFor === item.key && (
                  <div className="pointer-events-none absolute bottom-full left-0 right-0 mb-2 flex justify-center z--1000000">
                    <motion.div
                      id={tooltipId}
                      role="tooltip"
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: -20, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 350, damping: 24 }}
                      className="origin-bottom whitespace-nowrap rounded-md px-3 py-1 text-xs bg-black/90 text-white shadow-lg"
                    >
                      {item.label}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}