import { Link, useLocation, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { FiHome, FiInfo, FiStar, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [error, setError] = useState('')
  
  // Helper function to determine active link
  const isActive = (path) => location.pathname === path

  async function handleLogout() {
    setError('')
    try {
      await logout()
      navigate('/')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Title with hover effect */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">CE</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors">
              World Explorer
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/home" 
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${isActive('/') 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FiHome className="w-5 h-5" />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/about" 
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${isActive('/about') 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FiInfo className="w-5 h-5" />
              <span>About</span>
            </Link>
            
            <Link 
              to="/favorites" 
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${isActive('/favorites') 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FiStar className="w-5 h-5" />
              <span>Favorites</span>
            </Link>
          </nav>

          {/* Auth and mobile menu controls */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="hidden md:flex items-center gap-1 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}

            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-gray-600 dark:text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive('/') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiHome className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              <Link 
                to="/about" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive('/about') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiInfo className="w-5 h-5" />
                <span>About</span>
              </Link>
              
              <Link 
                to="/favorites" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isActive('/favorites') 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiStar className="w-5 h-5" />
                <span>Favorites</span>
              </Link>

              {currentUser ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300">
                    <FiUser className="w-5 h-5" />
                    <span className="text-sm truncate">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiLogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
            {error && (
              <div className="mt-2 px-4 py-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}