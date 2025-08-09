// components/PillNavBarDarkDock.jsx
"use client"

import { useRef, useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { Home, Trophy, Plus, Calendar, User } from "lucide-react"

export default function PillNavBarDarkDock() {
  const [activeKey, setActiveKey] = useState("home")
  const [mouseX, setMouseX] = useState(null)
  const [tooltipFor, setTooltipFor] = useState(null)      // key del item con tooltip visible
  const [pressTimer, setPressTimer] = useState(null)      // long-press handler
  const containerRef = useRef(null)

  const items = useMemo(() => ([
    { label: "Inicio",     icon: Home,     key: "home",         href: "/" },
    { label: "Torneos",    icon: Trophy,   key: "tournaments",  href: "/tournaments" },
    { label: "Crear",      icon: Plus,     key: "create",       href: "/create" },
    { label: "Calendario", icon: Calendar, key: "calendar",     href: "/calendar" },
    { label: "Perfil",     icon: User,     key: "profile",      href: "/profile" },
  ]), [])

  // Parámetros del dock
  const baseSize = 24
  const maxBoost = 10
  const influence = 90
  const elevBoost = 6
  const labelMinOpacity = 0.55

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMouseX(e.clientX - rect.left)
  }
  const handleMouseLeave = () => setMouseX(null)

  const sizeFor = (centerX) => {
    if (mouseX == null) return baseSize
    const d = Math.abs(mouseX - centerX)
    const falloff = Math.exp(-(d * d) / (2 * (influence * influence)))
    return baseSize + maxBoost * falloff
  }

  // --- Tooltip helpers ---
  const showTooltip = useCallback((key) => setTooltipFor(key), [])
  const hideTooltip = useCallback(() => setTooltipFor(null), [])

  // Long press (mobile): ~350ms para mostrar tooltip
  const startPress = (key) => {
    clearTimeout(pressTimer || undefined)
    const t = setTimeout(() => showTooltip(key), 350)
    setPressTimer(t)
  }
  const endPress = () => {
    clearTimeout(pressTimer || undefined)
    setPressTimer(null)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { handleMouseLeave(); hideTooltip() }}
      className="
        fixed center left-1/2 -translate-x-1/2
        w-[92vw] max-w-md
        rounded-full px-4 py-2
        bg-gray-900/80 backdrop-blur-md
        border border-white/10 shadow-2xl
        select-none
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <ul className="flex items-end justify-between gap-2">
        {items.map((item, i) => {
          const Icon = item.icon
          const fraction = (i + 0.5) / items.length
          const centerX = containerRef.current
            ? containerRef.current.getBoundingClientRect().width * fraction
            : 0
          const iconPx = Math.round(sizeFor(centerX))
          const isActive = item.key === activeKey
          const tooltipId = `tooltip-${item.key}`

          return (
            <li key={item.key} className="flex-1 relative">
              <Link
                href={item.href}
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
                  style={{ lineHeight: 1 }}
                  aria-describedby={tooltipFor === item.key ? tooltipId : undefined}
                  onMouseEnter={() => showTooltip(item.key)}
                  onMouseLeave={hideTooltip}
                  onFocus={() => showTooltip(item.key)}
                  onBlur={hideTooltip}
                  onTouchStart={() => startPress(item.key)}
                  onTouchEnd={() => { endPress(); /* no oculto hasta que salga */ }}
                  onTouchCancel={endPress}
                >
                  <motion.div
                    animate={{ y: mouseX != null ? -elevBoost : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.25 }}
                    className="relative"
                    style={{ willChange: "transform" }}
                  >
                    <Icon
                      style={{
                        width: iconPx,
                        height: iconPx,
                        transition: "width 80ms linear, height 80ms linear",
                      }}
                    />
                    {/* Glow */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      style={{ filter: "blur(8px)" }}
                      animate={{
                        opacity:
                          isActive
                            ? 0.3
                            : mouseX == null
                            ? 0
                            : Math.min(0.25, (iconPx - baseSize) / maxBoost / 2),
                        scale: 1.1,
                      }}
                    >
                      <span
                        className={`block w-full h-full rounded-full ${isActive ? "bg-blue-500/60" : "bg-white/20"}`}
                      />
                    </motion.span>
                  </motion.div>

                  {/* Label base (siempre visible, pero con opacidad adaptativa) */}
                  <motion.span
                    className="mt-1 text-[11px] tracking-tight"
                    animate={{
                      opacity:
                        isActive
                          ? 1
                          : mouseX == null
                          ? labelMinOpacity
                          : Math.max(labelMinOpacity, 0.5 + (iconPx - baseSize) / (maxBoost * 1.5)),
                      y: mouseX != null ? -2 : 0,
                    }}
                    transition={{ type: "tween", duration: 0.12 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </Link>

              {/* Tooltip flotante */}
              <AnimatePresence>
                {tooltipFor === item.key && (
                  <motion.div
                    id={tooltipId}
                    role="tooltip"
                    initial={{ opacity: 0, y: 8, scale: 0.98, x: -25 }}
                    animate={{ opacity: 1, y: -40, scale: 1}}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    className="
                      pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full
                      whitespace-nowrap rounded-full px-3 py-1 text-xs
                      bg-white/10 text-white backdrop-blur-md border border-white/15 shadow-lg
                    "
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0
                                 border-x-8 border-x-transparent border-t-8 border-t-white/10"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
