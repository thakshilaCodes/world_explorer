// src/pages/Landing.js
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiArrowRight, FiGlobe, FiBarChart2, FiFlag, 
  FiBook, FiChevronLeft, FiChevronRight, 
  FiMapPin, FiInfo, FiSearch, FiStar 
} from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/parallax'

// Sample carousel images
const carouselImages = [
  {
    src: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e',
    alt: 'World map',
    caption: 'Explore Every Corner of the Globe',
    description: 'Discover fascinating details about countries worldwide'
  },
  {
    src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
    alt: 'Mountain landscape',
    caption: 'Discover Breathtaking Landscapes',
    description: 'From mountains to oceans, experience natural wonders'
  },
  {
    src: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
    alt: 'City skyline',
    caption: 'Experience Diverse Cultures',
    description: 'Learn about languages, traditions, and local customs'
  }
]

// Popular countries data with more details
const popularCountries = [
  { flag: '🇺🇸', name: 'United States', continent: 'North America', population: '331 million' },
  { flag: '🇯🇵', name: 'Japan', continent: 'Asia', population: '126 million' }, 
  { flag: '🇫🇷', name: 'France', continent: 'Europe', population: '67 million' },
  { flag: '🇧🇷', name: 'Brazil', continent: 'South America', population: '212 million' },
  { flag: '🇳🇬', name: 'Nigeria', continent: 'Africa', population: '206 million' },
  { flag: '🇦🇺', name: 'Australia', continent: 'Oceania', population: '25 million' },
  { flag: '🇮🇳', name: 'India', continent: 'Asia', population: '1.3 billion' },
  { flag: '🇨🇦', name: 'Canada', continent: 'North America', population: '38 million' }
]

// App features with more details
const appFeatures = [
  { 
    icon: <FiGlobe size={32} />, 
    title: "200+ Countries", 
    desc: "Comprehensive global coverage",
    details: "Access detailed information about every recognized nation on Earth"
  },
  { 
    icon: <FiBarChart2 size={32} />, 
    title: "Detailed Statistics", 
    desc: "Population, area, GDP and more",
    details: "Compare multiple metrics across different regions with interactive charts"
  },
  { 
    icon: <FiFlag size={32} />, 
    title: "Cultural Insights", 
    desc: "Languages, currencies, and traditions",
    details: "Understand the cultural heritage and social customs of different societies"
  }
]

export default function Landing() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showCountryDetails, setShowCountryDetails] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Initialize dark mode based on system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Filter countries based on search input
  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredCountries(popularCountries);
    } else {
      const filtered = popularCountries.filter(country => 
        country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.continent.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchValue]);
  
  // Handle country selection
  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setShowCountryDetails(true);
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors duration-500`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center transition-colors duration-500 overflow-hidden">
        {/* Navigation Bar */}
        <nav className="w-full flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md z-50 sticky top-0">
          <div className="flex items-center gap-2">
            <FiGlobe className="text-2xl text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl text-gray-800 dark:text-white">World Explorer</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link to="/home" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Explore</Link>
          </div>
        </nav>

        {/* Hero Carousel Section */}
        <div className="w-full relative h-[70vh] max-h-[700px]">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            parallax={true}
            effect="fade"
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            className="h-full w-full"
          >
            {carouselImages.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10 flex flex-col items-center justify-center px-4">
                  <motion.h2 
                    data-swiper-parallax="-300"
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 max-w-4xl mb-4"
                  >
                    {image.caption}
                  </motion.h2>
                  <motion.p
                    data-swiper-parallax="-200"
                    className="text-xl text-white/90 text-center max-w-2xl mb-8"
                  >
                    {image.description}
                  </motion.p>
                  <motion.div
                    data-swiper-parallax="-100"
                  >
                    <Link
                      to="/home"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      Start Your Journey <FiArrowRight className="inline" />
                    </Link>
                  </motion.div>
                </div>
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation Arrows */}
          <button className="swiper-button-prev !hidden md:!flex absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all">
            <FiChevronLeft size={24} />
          </button>
          <button className="swiper-button-next !hidden md:!flex absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all">
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Main Content Section */}
        <div className="w-full flex flex-col items-center px-6 py-16 max-w-7xl">
          {/* Features Section with Interactive Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-full max-w-6xl mb-24"
          >
            <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-12">
              Why Use <span className="text-blue-600 dark:text-blue-400">World Explorer</span>?
            </h2>
            
            <div className="grid grid-cols-1, md:grid-cols-3 gap-8">
              {appFeatures.map((feature, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer ${activeFeature === i ? 'ring-2 ring-blue-500 transform scale-105' : ''}`}
                  onClick={() => setActiveFeature(activeFeature === i ? null : i)}
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.desc}</p>
                  
                  <AnimatePresence>
                    {activeFeature === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          {feature.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Country Explorer Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full mt-8 mb-24 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-white mb-8">
              Explore Popular Destinations
            </h2>
            
            {/* Search Box */}
            <div className="relative max-w-md mx-auto mb-12">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by country or continent..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 dark:bg-gray-700/90 text-gray-700 dark:text-gray-200 outline-none transition-all"
              />
            </div>
            
            {/* Country Grid with Hover Effects */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:gap-8">
              {filteredCountries.map((country, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center cursor-pointer bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  onClick={() => handleCountryClick(country)}
                >
                  <div className="text-5xl sm:text-6xl p-2 mb-2 filter drop-shadow-md transition-transform duration-300">
                    {country.flag}
                  </div>
                  <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                    {country.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {country.continent}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Country Details Modal */}
            <AnimatePresence>
              {showCountryDetails && selectedCountry && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                  onClick={() => setShowCountryDetails(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                        <span className="text-4xl">{selectedCountry.flag}</span>
                        {selectedCountry.name}
                      </h3>
                      <button 
                        onClick={() => setShowCountryDetails(false)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-blue-500 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300">Continent: {selectedCountry.continent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiInfo className="text-blue-500 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300">Population: {selectedCountry.population}</span>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                        <Link 
                          to={`/country/${selectedCountry.name.toLowerCase()}`}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          <FiStar size={18} /> Explore {selectedCountry.name}
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="w-full max-w-4xl text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-2xl py-12 px-6 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Expand Your World Knowledge?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of explorers who are discovering our world's rich diversity of cultures, languages, and landscapes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/home"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Start Exploring <FiArrowRight className="inline" />
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <FiBook className="inline" /> Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
       

        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 0.1, 0], scale: [0, 1.5, 0] }}
              transition={{ 
                delay: Math.random() * 2,
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute rounded-full bg-blue-400/20 dark:bg-blue-600/10"
              style={{
                width: `${50 + Math.random() * 200}px`,
                height: `${50 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}