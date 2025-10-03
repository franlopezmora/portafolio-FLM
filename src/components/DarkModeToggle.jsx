'use client'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

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
  const { t } = useLanguage()
  const [dark, setDark] = useState(getInitialDark)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dark', String(dark))
  }, [dark])

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(true)
    }, 500) // 500ms delay
    setHoverTimeout(timeout)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setShowTooltip(false)
  }

  return (
    <div className="group relative">
      <button
        onClick={() => setDark(d => !d)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          absolute left-1 w-4 h-4
          transition-opacity duration-300
          ${dark ? 'opacity-100' : 'opacity-20'}
        `}
        style={{ color: '#FFD700' }}
      />
      <Moon
        className={`
          absolute right-1 w-4 h-4
          transition-opacity duration-300
          ${dark ? 'opacity-20' : 'opacity-100'}
        `}
        style={{ color: '#525252' }}
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
      {showTooltip && (
        <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2.5 px-2 py-1 text-xs text-white bg-black border border-white/20 rounded opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {t('header.changeTheme')}
        </span>
      )}
    </div>
  )
}
