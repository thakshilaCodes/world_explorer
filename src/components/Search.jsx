import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiX, FiInfo, FiGlobe } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showTips, setShowTips] = useState(false)
  const inputRef = useRef(null)
  const searchExamples = ['Japan', 'Brazil', 'Germany', 'South Africa']

  // Debounce search with cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
    inputRef.current?.focus()
  }

  const handleExampleClick = (example) => {
    setSearchTerm(example)
    inputRef.current?.focus()
  }

  return (
    <div className="mb-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSearch(searchTerm)
        }}
        className="relative"
      >
        {/* Main Search Input */}
        <motion.div 
          className={`flex items-center border-2 ${isFocused ? 'border-blue-500 shadow-lg' : 'border-gray-300 dark:border-gray-600'} rounded-xl transition-all duration-200 bg-white dark:bg-gray-700`}
          whileHover={{ scale: 1.01 }}
        >
          <div className="pl-4 text-gray-400 dark:text-gray-400">
            <FiSearch className="w-5 h-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search for a country..."
            className="w-full py-3 px-4 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              setIsFocused(true)
              setShowTips(true)
            }}
            onBlur={() => setIsFocused(false)}
            aria-label="Search countries"
          />

          {searchTerm && (
            <motion.button
              type="button"
              onClick={handleClear}
              className="pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Clear search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>

        {/* Search Tips Section */}
        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 shadow-xl rounded-xl overflow-hidden"
            >
              <div className="p-4">
                {/* Quick Examples */}
                {!searchTerm && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <FiGlobe className="mr-2" />
                      <span>Try searching for:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {searchExamples.map((example) => (
                        <motion.button
                          key={example}
                          type="button"
                          onClick={() => handleExampleClick(example)}
                          className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {example}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Tips */}
                <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                  <FiInfo className="mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Search tips:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Country name (e.g. "France")</li>
                      <li>Partial name (e.g. "Uni" for United States)</li>
                      <li>Country code (e.g. "US" for United States)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <div className="border-t border-gray-200 dark:border-gray-600 p-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowTips(false)}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Got it, hide tips
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Search Status */}
      <AnimatePresence>
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex justify-between items-center mt-2 px-1"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {searchTerm.length > 0 && `${searchTerm.length} character${searchTerm.length !== 1 ? 's' : ''}`}
            </span>
            {searchTerm.length > 20 && (
              <span className="text-xs text-blue-500 flex items-center">
                <FiInfo className="mr-1" /> Try a shorter name
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}