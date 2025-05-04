import { useEffect, useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize state from localStorage (server-side fallback to false)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  useEffect(() => {
    // Apply the class based on darkMode state
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center gap-2 text-gray-700 dark:text-white"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <>
          <FiSun className="w-5 h-5" />
          <span className="sr-only md:not-sr-only">Light Mode</span>
        </>
      ) : (
        <>
          <FiMoon className="w-5 h-5" />
          <span className="sr-only md:not-sr-only">Dark Mode</span>
        </>
      )}
    </button>
  )
}