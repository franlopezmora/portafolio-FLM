'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

function getInitialDark() {
  try {
    const stored = localStorage.getItem('dark')
    if (stored !== null) return stored === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState(getInitialDark)
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', String(dark))
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
      className="
        relative inline-flex items-center
        w-14 h-8
        min-w-[56px] min-h-[32px]
        shrink-0
        overflow-hidden
        rounded-full p-1
        bg-gray-300 dark:bg-gray-600
        transition-colors duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30
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
