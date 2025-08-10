// components/prototypes/TodoBasic.jsx
"use client"

import { useState } from "react"
import AnimatedTickCheckbox from "./AnimatedTickCheckbox"
import { Plus, X } from "lucide-react"
import StrikeText from "./StrikeText"

export default function TodoBasic() {
  const [items, setItems] = useState([
    { id: 1, text: "Diseñar wireframes", done: false },
    { id: 2, text: "Armar navbar dock", done: true },
  ])
  const [text, setText] = useState("")

  const add = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setItems((arr) => [{ id: Date.now(), text: t, done: false }, ...arr])
    setText("")
  }

  const toggle = (id, val) =>
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, done: val } : it)))

  const removeItem = (id) =>
    setItems((arr) => arr.filter((it) => it.id !== id))

  const clearCompleted = () =>
    setItems((arr) => arr.filter((it) => !it.done))

  const remaining = items.filter((it) => !it.done).length

  return (
    <div className="w-full max-w-md">
      {/* Form */}
      <form onSubmit={add} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nueva tarea…"
          className="flex-1 rounded-md border border-neutral-200/50 dark:border-neutral-700/60 bg-white/60 dark:bg-neutral-800/60 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400/60"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-white/10 bg-white/10 hover:bg-white/15 text-white backdrop-blur-sm"
          title="Agregar"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </form>

      {/* Lista */}
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="group flex items-center justify-between rounded-md border border-neutral-200/50 dark:border-neutral-700/60 bg-white/40 dark:bg-neutral-800/40 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <AnimatedTickCheckbox
                checked={it.done}
                onChange={(v) => toggle(it.id, v)}
                size={22}
                color="#3b82f6" // azul
              />
                <StrikeText striked={it.done}>
                {it.text}
                </StrikeText>
            </div>
            <button
              onClick={() => removeItem(it.id)}
              className="opacity-70 hover:opacity-100 p-1 rounded-md hover:bg-white/10"
              title="Eliminar"
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-neutral-400 px-1 py-4 text-center">
            Nada por aquí. ¡Agregá tu primera tarea!
          </li>
        )}
      </ul>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>
          {remaining} pendiente{remaining === 1 ? "" : "s"}
        </span>
        <button
          onClick={clearCompleted}
          className="hover:underline"
        >
          Limpiar completadas
        </button>
      </div>
    </div>
  )
}
