// components/prototypes/Sidebar.jsx
"use client"

import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink } from "react-router-dom"
import {
  Menu, ChevronLeft, LayoutDashboard, FlaskConical, FolderKanban,
  PenSquare, Settings, User
} from "lucide-react"

function useMediaQuery(q) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = (e) => setOk(e.matches)
    setOk(m.matches)
    m.addEventListener?.("change", on)
    return () => m.removeEventListener?.("change", on)
  }, [q])
  return ok
}

export default function Sidebar({
  initialCollapsed = false,
  items: itemsProp,
  embedded = false,
}) {
  const [collapsed, setCollapsed] = useState(initialCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mdUp = useMediaQuery("(min-width: 768px)")
  useEffect(() => { if (mdUp) setMobileOpen(false) }, [mdUp])

  const items = useMemo(() => itemsProp ?? ([
    { label: "Dashboard", to: "/",            icon: LayoutDashboard },
    { label: "Proyectos", to: "/projects",    icon: FolderKanban },
    { label: "Prototypes",to: "/prototype/1", icon: FlaskConical },
    { label: "Notas",     to: "/notes",       icon: PenSquare },
    { label: "Ajustes",   to: "/settings",    icon: Settings },
  ]), [itemsProp])

  // medidas fijas
  const W_COLLAPSED = 76
  const W_EXPANDED  = 200
  const LABEL_MAX   = 185
  const ICON_NUDGE  = -8

  return (
    <>
      {/* Botón mobile */}
      {!embedded && (
        <button
          className="md:hidden fixed top-3 left-3 z-50 inline-flex items-center justify-center w-10 h-10 rounded-lg
                     bg-white text-neutral-900 border border-neutral-200
                     dark:bg-neutral-900 dark:text-white/90 dark:border-white/10"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Backdrop mobile */}
      {!embedded && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>
      )}

      <motion.aside
        className={`
          ${embedded ? "static" : "fixed md:static"} z-50 md:z-auto left-0 top-0
          h-screen md:h-auto
          bg-white text-neutral-900 border-r border-neutral-200
          dark:bg-neutral-900 dark:text-white/90 dark:border-white/10
          flex flex-col select-none min-w-0
        `}
        initial={false}
        animate={{
          width: collapsed ? W_COLLAPSED : W_EXPANDED,
          x: (mdUp || embedded) ? 0 : (mobileOpen ? 0 : -W_EXPANDED),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="relative h-14 px-2">
          <div className="grid h-full items-center"
               style={{ gridTemplateColumns: `${W_COLLAPSED}px 1fr` }}>
            {/* Col 1: icono fijo/centrado */}
            <div className="grid place-items-center" style={{ transform: `translateX(${ICON_NUDGE}px)` }}>
              <div className="grid place-items-center w-8 h-8 rounded-lg
                              bg-neutral-100 border border-neutral-200
                              dark:bg-white/10 dark:border-white/10">
                <User className="w-5 h-5" />
              </div>
            </div>

            {/* Col 2: label con maxWidth animado */}
            <motion.div
              className="overflow-hidden whitespace-nowrap font-semibold tracking-tight"
              initial={false}
              animate={{ maxWidth: collapsed ? 0 : LABEL_MAX, opacity: collapsed ? 0 : 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              Tu Proyecto
            </motion.div>
          </div>

          {/* Toggle (desktop) */}
          <button
            onClick={() => setCollapsed(v => !v)}
            className="hidden md:inline-flex absolute -right-3.5 top-3 items-center justify-center w-7 h-7 rounded-full
                       bg-white text-neutral-900 border border-neutral-200
                       dark:bg-neutral-900 dark:text-white/90 dark:border-white/10"
            aria-label={collapsed ? "Expandir" : "Colapsar"}
            title={collapsed ? "Expandir" : "Colapsar"}
          >
            <motion.div initial={false} animate={{ rotate: collapsed ? 180 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
              <ChevronLeft className="w-4 h-4" />
            </motion.div>
          </button>

          {!embedded && (
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden absolute right-3 top-3 text-neutral-600 hover:text-neutral-900
                         dark:text-white/70 dark:hover:text-white"
              aria-label="Cerrar"
            >
              ✕
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="px-2 py-2 flex-1 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className={`
                      grid items-center rounded-lg border h-10 px-1 w-full text-left
                      border-transparent text-neutral-700 hover:bg-neutral-100 hover:border-neutral-200
                      dark:text-white/80 dark:hover:bg-white/5 dark:hover:border-white/10
                    `}
                    style={{ gridTemplateColumns: `${W_COLLAPSED}px 1fr` }}
                  >
                    {/* Col 1: icono */}
                    <div
                      className="grid place-items-center"
                      style={{ transform: `translateX(${ICON_NUDGE - 5}px)` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Col 2: label animado */}
                    <motion.span
                      className="overflow-hidden whitespace-nowrap"
                      initial={false}
                      animate={{ maxWidth: collapsed ? 0 : LABEL_MAX, opacity: collapsed ? 0 : 1 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      {item.label}
                    </motion.span>

                    {/* Tooltip en colapsado */}
                    {collapsed && (
                      <span
                        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2
                                  rounded-md px-2 py-1 text-xs bg-neutral-900 text-white opacity-0
                                  border border-white/10 group-hover:opacity-100"
                      >
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>


        {/* Footer */}
        <div className="border-t border-neutral-200 dark:border-white/10 px-2 py-2">
          <button
            className="grid items-center rounded-lg border h-10 px-1 w-full
                       border-transparent hover:bg-neutral-100 hover:border-neutral-200
                       dark:hover:bg-white/5 dark:hover:border-white/10"
            style={{ gridTemplateColumns: `${W_COLLAPSED}px 1fr` }}
            onClick={() => alert("Config…")}
          >
            <div className="grid place-items-center" style={{ transform: `translateX(${ICON_NUDGE - 5}px)` }}>
              <Settings className="w-5 h-5" />
            </div>
            <motion.span
              className="overflow-hidden whitespace-nowrap"
              initial={false}
              animate={{ maxWidth: collapsed ? 0 : LABEL_MAX - 95, opacity: collapsed ? 0 : 1 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              Preferencias
            </motion.span>
          </button>
        </div>
      </motion.aside>

      {/* Empuje de layout solo fuera de embedded */}
      {!embedded && (
        <div className="hidden md:block" style={{ width: collapsed ? W_COLLAPSED : W_EXPANDED }} />
      )}
    </>
  )
}
