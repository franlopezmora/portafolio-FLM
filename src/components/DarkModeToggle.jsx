'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function DarkModeToggle() {
  // 1) Inicializo a partir de localStorage o pref. del SO:
  const [dark, setDark] = useState(false)
  useEffect(() => {
    // solo en cliente
    const stored = localStorage.getItem('dark')
    if (stored !== null) {
      setDark(stored === 'true')
    } else {
      // si no hay en storage, uso preferencia del sistema
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  // 2) Cuando cambia, ajusto <html> y guardo
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
      className="
        relative inline-flex items-center
        w-14 h-8 p-1
        bg-gray-300 dark:bg-gray-600
        rounded-full
        transition-colors duration-300
      "
    >
      <Sun
        className={`
          absolute left-1 w-4 h-4 text-yellow-500
          transition-opacity duration-300
          ${dark ? 'opacity-100' : 'opacity-20'}
        `}
      />
      <Moon
        className={`
          absolute right-1 w-4 h-4 text-gray-900
          transition-opacity duration-300
          ${dark ? 'opacity-20' : 'opacity-100'}
        `}
      />
      <span
        className={`
          block w-6 h-6 bg-white
          rounded-full shadow-md
          transform transition-transform duration-300
          ${dark ? 'translate-x-6' : 'translate-x-0'}
        `}
      />
    </button>
  )
}
