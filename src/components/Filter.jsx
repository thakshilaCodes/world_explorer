import { useState } from 'react'
import { FaChevronDown, FaGlobeAmericas, FaLanguage } from 'react-icons/fa'

export default function Filter({ 
  onFilter, 
  selectedValue, 
  options, 
  placeholder, 
  icon,
  className 
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (value) => {
    onFilter(value === placeholder ? '' : value)
    setIsOpen(false)
  }

  const getIcon = () => {
    switch (icon) {
      case 'language':
        return <FaLanguage className="text-gray-500 dark:text-gray-400" />
      case 'region':
        return <FaGlobeAmericas className="text-gray-500 dark:text-gray-400" />
      default:
        return null
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Custom select button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-lg shadow-md transition-all duration-200 ${
          isOpen ? 'ring-2 ring-blue-500' : ''
        } bg-white dark:bg-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <span>{selectedValue || placeholder}</span>
        </div>
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <ul
            role="listbox"
            className="py-1 max-h-60 overflow-auto"
          >
            <li>
              <button
                onClick={() => handleSelect(placeholder)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
                  !selectedValue ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
                role="option"
              >
                All {placeholder.replace('Filter by ', '')}
              </button>
            </li>
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${
                    selectedValue === option ? 'bg-blue-100 dark:bg-blue-900' : ''
                  }`}
                  role="option"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}