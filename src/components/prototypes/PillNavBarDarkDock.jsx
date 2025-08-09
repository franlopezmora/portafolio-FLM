// components/PillNavBarDarkDock.jsx
"use client"

import { useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, Trophy, Plus, Calendar, User } from "lucide-react"

export default function PillNavBarDarkDock() {
  const [activeKey, setActiveKey] = useState("home")
  const [mouseX, setMouseX] = useState(null)
  const [tooltipFor, setTooltipFor] = useState(null)
  const [pressTimer, setPressTimer] = useState(null)
  const [isDockHovering, setIsDockHovering] = useState(false)
  const containerRef = useRef(null)

  const items = useMemo(() => ([
    { label: "Inicio",     icon: Home,     key: "home",         href: "" },
    { label: "Torneos",    icon: Trophy,   key: "tournaments",  href: "" },
    { label: "Crear",      icon: Plus,     key: "create",       href: "" },
    { label: "Calendario", icon: Calendar, key: "calendar",     href: "" },
    { label: "Perfil",     icon: User,     key: "profile",      href: "" },
  ]), [])

  // Dock params
  const baseSize = 24
  const maxBoost = 12
  const influence = 60              // menor alcance => vecinos casi no reaccionan
  const elevBoost = 6
  const slotH = 22 // reserva de altura para cada ícono
  const basePadY = 8                // padding vertical base del dock (px)
  const dockLiftPad = 4            // cuánto aumenta el alto del dock al hover (px)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMouseX(e.clientX - rect.left)
  }
  const handleMouseLeave = () => setMouseX(null)

  // Curva enfocada: 1 en el centro, 0 fuera. Vecinos casi no se mueven.
  const easeFor = (centerX) => {
    if (mouseX == null) return 0
    const d = Math.abs(mouseX - centerX)
    const lin = Math.max(0, 1 - d / influence)
    return Math.pow(lin, 3.2)
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsDockHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setIsDockHovering(false); setTooltipFor(null); handleMouseLeave() }}
      className="
        fixed bottom-8 left-1/2 -translate-x-1/2
        w-[92vw] max-w-md
        rounded-full px-4
        bg-gray-900/80 backdrop-blur-md
        border border-white/10 shadow-2xl
        select-none
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
      // 👉 elevamos el ALTO del dock con paddingTop (no movemos los íconos)
      initial={false}
      animate={{
        paddingTop: isDockHovering ? basePadY + dockLiftPad : basePadY,
        paddingBottom: basePadY,
      }}
      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
    >
      <ul className="flex items-end justify-between gap-2">
        {items.map((item, i) => {
          const Icon = item.icon
          const fraction = (i + 0.5) / items.length
          const centerX = containerRef.current
            ? containerRef.current.getBoundingClientRect().width * fraction
            : 0

          const eased = easeFor(centerX)
          const iconPx = Math.round(baseSize + maxBoost * eased)
          const isActive = item.key === activeKey
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
                    rounded-xl
                  `}
                  aria-describedby={tooltipFor === item.key ? tooltipId : undefined}
                  onMouseEnter={() => setTooltipFor(item.key)}
                  onMouseLeave={() => setTooltipFor(null)}
                  onFocus={() => setTooltipFor(item.key)}
                  onBlur={() => setTooltipFor(null)}
                  onTouchStart={() => {
                    clearTimeout(pressTimer || undefined)
                    const t = setTimeout(() => setTooltipFor(item.key), 350)
                    setPressTimer(t)
                  }}
                  onTouchEnd={() => { clearTimeout(pressTimer || undefined); setPressTimer(null) }}
                  onTouchCancel={() => { clearTimeout(pressTimer || undefined); setPressTimer(null) }}
                >
                  {/* SLOT con altura fija: la línea no varía */}
                  <motion.div
                    className="relative flex items-end justify-center"
                    style={{ height: slotH, willChange: "transform" }}
                    animate={{ y: -(elevBoost * eased) }} // solo el ítem hover se eleva
                    transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.25 }}
                  >
                    <Icon
                      style={{
                        width: iconPx,
                        height: iconPx,
                        transition: "width 80ms linear, height 80ms linear",
                      }}
                    />
                    {/* Glow sutil */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{ filter: "blur(8px)" }}
                      animate={{
                        opacity: isActive ? 0.3 : Math.min(0.25, eased / 2),
                        scale: 1 + 0.2 * eased,
                      }}
                    >
                      <span
                        className={`block w-full h-full rounded-full ${isActive ? "bg-blue-500/60" : "bg-white/20"}`}
                      />
                    </motion.span>
                  </motion.div>
                </motion.button>
              </Link>

              {/* Tooltip cuadrado, centrado y sin piquito */}
              <AnimatePresence>
                {tooltipFor === item.key && (
                  <div className="pointer-events-none absolute bottom-full left-0 right-0 mb-2 flex justify-center z-10">
                    <motion.div
                      id={tooltipId}
                      role="tooltip"
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: -30, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
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
