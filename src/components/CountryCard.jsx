import { Link } from 'react-router-dom'
import { 
  FaUsers, 
  FaGlobe, 
  FaCity, 
  FaLandmark, 
  FaLanguage, 
  FaMoneyBillWave,
  FaArrowRight,
  FaStar
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip'
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { addFavorite, removeFavorite, getFavorites } from '../services/favorites'

export default function CountryCard({ country }) {
  const { currentUser } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loadingFavorite, setLoadingFavorite] = useState(false)
  
  // Format population with commas
  const formattedPopulation = country.population.toLocaleString()
  
  // Get first language and currency
  const languages = country.languages ? Object.values(country.languages) : []
  const primaryLanguage = languages[0] || 'N/A'
  const primaryCurrency = country.currencies ? Object.values(country.currencies)[0] : null
  const currencySymbol = primaryCurrency?.symbol || primaryCurrency?.name?.substring(0, 1) || '$'
  const currencyName = primaryCurrency?.name || 'N/A'

  // Check if country is favorite on mount
// In your CountryCard component, update the useEffect for checking favorites:

useEffect(() => {
  async function checkFavorite() {
    if (currentUser) {
      const favorites = await getFavorites(currentUser.uid);
      // Change this line to check for the country code in the favorites array
      setIsFavorite(favorites.some(fav => fav.code === country.cca3));
    }
  }
  checkFavorite();
}, [currentUser, country.cca3]);

// And update the toggleFavorite function:
async function toggleFavorite(e) {
  e.preventDefault();
  e.stopPropagation();
  
  if (!currentUser) return;
  
  setLoadingFavorite(true);
  try {
    if (isFavorite) {
      await removeFavorite(currentUser.uid, country.cca3);
    } else {
      await addFavorite(currentUser.uid, country.cca3, country); // Make sure to pass country data
    }
    setIsFavorite(!isFavorite);
  } catch (error) {
    console.error('Error updating favorite:', error);
  }
  setLoadingFavorite(false);
}

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -8,
      transition: { type: 'spring', stiffness: 300 }
    }
  }

  const badgeVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="h-full"
    >
      <Link
        to={`/country/${country.name.common}`}
        className="block h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group relative border border-gray-100 dark:border-gray-700"
      >
        {/* Favorite button (only shows when user is logged in) */}
        {currentUser && (
          <button
            onClick={toggleFavorite}
            disabled={loadingFavorite}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md transition-all ${
              isFavorite 
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/40'
                : 'text-gray-400 bg-white dark:bg-gray-700 hover:text-yellow-500'
            }`}
            data-tooltip-id="favorite-tooltip"
            data-tooltip-content={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FaStar className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            <Tooltip id="favorite-tooltip" />
          </button>
        )}

        {/* Flag image with overlay effect */}
        <div className="relative overflow-hidden h-48">
          <img
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Country name overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <motion.h2 
              className="text-2xl font-bold truncate"
              whileHover={{ x: 5 }}
            >
              {country.name.common}
            </motion.h2>
            <p className="text-sm opacity-90">{country.name.official}</p>
          </div>
        </div>

        {/* Country details */}
        <div className="p-5">
          <div className="space-y-4">
            {/* Population with animated counter effect */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full"
                whileHover={{ rotate: 10 }}
              >
                <FaUsers className="text-blue-600 dark:text-blue-300" />
              </motion.div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                <p className="text-gray-700 dark:text-gray-200 font-medium">
                  {formattedPopulation}
                </p>
              </div>
            </div>
            
            {/* Region with continent info */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full"
                whileHover={{ rotate: 10 }}
              >
                <FaGlobe className="text-green-600 dark:text-green-300" />
              </motion.div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Region</p>
                <p className="text-gray-700 dark:text-gray-200 font-medium">
                  {country.region}
                  {country.subregion && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 block">
                      {country.subregion}
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Capital with tooltip */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full"
                whileHover={{ rotate: 10 }}
              >
                <FaCity className="text-purple-600 dark:text-purple-300" />
              </motion.div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
                <p className="text-gray-700 dark:text-gray-200 font-medium">
                  {country.capital?.[0] || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick facts badges with tooltips */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-2">
            {primaryCurrency && (
              <motion.div 
                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full"
                data-tooltip-id={`currency-tooltip-${country.cca3}`}
                data-tooltip-content={`${currencyName} (${primaryCurrency?.code || 'N/A'})`}
                variants={badgeVariants}
                whileHover="hover"
              >
                <FaMoneyBillWave size={12} />
                <span>{currencySymbol}</span>
                <Tooltip id={`currency-tooltip-${country.cca3}`} />
              </motion.div>
            )}
            
            {primaryLanguage && (
              <motion.div 
                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full"
                data-tooltip-id={`language-tooltip-${country.cca3}`}
                data-tooltip-content={`${primaryLanguage}${languages.length > 1 ? ` (+${languages.length - 1} more)` : ''}`}
                variants={badgeVariants}
                whileHover="hover"
              >
                <FaLanguage size={12} />
                <span>{primaryLanguage.substring(0, 15)}</span>
                <Tooltip id={`language-tooltip-${country.cca3}`} />
              </motion.div>
            )}
            
            {country.timezones?.[0] && (
              <motion.div 
                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full"
                data-tooltip-id={`timezone-tooltip-${country.cca3}`}
                data-tooltip-content={`Timezone: ${country.timezones[0]}${country.timezones.length > 1 ? ` (+${country.timezones.length - 1} more)` : ''}`}
                variants={badgeVariants}
                whileHover="hover"
              >
                <FaLandmark size={12} />
                <span>UTC{country.timezones[0].split('UTC')[1]?.substring(0, 3)}</span>
                <Tooltip id={`timezone-tooltip-${country.cca3}`} />
              </motion.div>
            )}
          </div>

          {/* Explore CTA that appears on hover */}
          <motion.div 
            className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-full shadow-md"
            >
              Explore <FaArrowRight size={12} />
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
}