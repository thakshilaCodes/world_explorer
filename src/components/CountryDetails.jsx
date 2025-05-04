import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import { 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaMoneyBillWave, 
  FaLanguage,
  FaFlag,
  FaLandmark,
  FaClock
} from 'react-icons/fa'
import { IoPeople, IoPricetag } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { Tooltip } from 'react-tooltip'

export default function CountryDetails({ country }) {
  const navigate = useNavigate()
  
  // Format currency data with symbols
  const formatCurrencies = () => {
    if (!country.currencies) return 'N/A'
    return Object.entries(country.currencies)
      .map(([code, currency]) => `${currency.symbol || '¤'} - ${currency.name} (${code})`)
      .join(', ')
  }

  // Format languages with native names if available
  const formatLanguages = () => {
    if (!country.languages) return 'N/A'
    return Object.entries(country.languages)
      .map(([code, name]) => {
        const nativeName = country.name.nativeName?.[code]?.common
        return nativeName ? `${name} (${nativeName})` : name
      })
      .join(', ')
  }

  // Format Google Maps link
  const googleMapsLink = country.maps?.googleMaps || '#'

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      {/* Back button with improved styling */}
      <motion.button
        onClick={() => navigate(-1)}
        className="mb-8 px-6 py-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center gap-3 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
        whileHover={{ x: -5 }}
        variants={fadeIn}
      >
        <FiArrowLeft className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
        <span className="font-medium">Back to Countries</span>
      </motion.button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Flag image with enhanced zoom effect */}
        <motion.div 
          className="relative group overflow-hidden rounded-xl shadow-xl border border-gray-100 dark:border-gray-700"
          variants={fadeIn}
        >
          <img
            src={country.flags.svg || country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <FaFlag className="text-blue-300" />
            <span>Official Flag</span>
          </div>
        </motion.div>

        {/* Country details */}
        <motion.div 
          className="dark:text-white space-y-8"
          variants={fadeIn}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{country.name.common}</h1>
              <p className="text-gray-600 dark:text-gray-300 italic">{country.name.official}</p>
            </div>
            <a 
              href={googleMapsLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              data-tooltip-id="map-tooltip"
              data-tooltip-content="Open in Google Maps"
            >
              <FiExternalLink className="w-5 h-5" />
              <Tooltip id="map-tooltip" />
            </a>
          </div>

          {/* Key details in cards with hover effects */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <IoPeople className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium">POPULATION</span>
              </div>
              <p className="text-lg font-semibold">{country.population.toLocaleString()}</p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <FaGlobe className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium">REGION</span>
              </div>
              <p className="text-lg font-semibold">
                {country.region}
                {country.subregion && (
                  <span className="block text-sm text-gray-500 dark:text-gray-400">{country.subregion}</span>
                )}
              </p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <FaMapMarkerAlt className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium">CAPITAL</span>
              </div>
              <p className="text-lg font-semibold">{country.capital?.[0] || 'N/A'}</p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <IoPricetag className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-medium">TLD</span>
              </div>
              <p className="text-lg font-semibold">
                {country.tld?.join(', ') || 'N/A'}
              </p>
            </motion.div>
          </div>

          {/* Detailed information sections with icons */}
          <div className="space-y-6">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-blue-600 dark:text-blue-400">
                <FaMoneyBillWave className="w-5 h-5" />
                <span>Currency Information</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{formatCurrencies()}</p>
            </motion.div>

            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-green-600 dark:text-green-400">
                <FaLanguage className="w-5 h-5" />
                <span>Language Information</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{formatLanguages()}</p>
            </motion.div>

            {country.timezones && (
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-amber-600 dark:text-amber-400">
                  <FaClock className="w-5 h-5" />
                  <span>Time Zones</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {country.timezones.map((tz, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tz}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

{country.borders && (
  <motion.div 
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
    whileHover={{ scale: 1.01 }}
  >
    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
      <FaLandmark className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      <span>Border Countries</span>
    </h3>
    <div className="flex flex-wrap gap-3">
      {country.borders.map((borderCode) => (
        <button
          key={borderCode}
          onClick={() => navigate(`/country/${country.borderNames?.[borderCode] || borderCode}`)}
          className="px-4 py-2 bg-gray-50 dark:bg-gray-700 shadow rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 group"
        >
          <span>{country.borderNames?.[borderCode] || borderCode}</span>
          <FiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  </motion.div>
)}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}