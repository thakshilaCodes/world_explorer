import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import CountryDetails from '../components/CountryDetails'
import { FiLoader, FiAlertCircle } from 'react-icons/fi'

export default function CountryPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true)
        setError(null)
        // Fetch by name first
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        )
        const countryData = response.data[0]
        
        // If country has borders, fetch their names
        if (countryData.borders && countryData.borders.length > 0) {
          const bordersResponse = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}`
          )
          // Create a mapping of border codes to common names
          const borderMap = {}
          bordersResponse.data.forEach(borderCountry => {
            borderMap[borderCountry.cca3] = borderCountry.name.common
          })
          // Add border names to the country data
          countryData.borderNames = borderMap
        }
        
        setCountry(countryData)
      } catch (error) {
        console.error('Error fetching country:', error)
        // Try to fetch by code if name fails
        try {
          const codeResponse = await axios.get(
            `https://restcountries.com/v3.1/alpha/${name}`
          )
          setCountry(codeResponse.data[0])
        } catch (codeError) {
          setError(error.response?.data?.message || 'Failed to load country data')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [name])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto px-4 py-12 flex flex-col items-center justify-center"
        >
          <div className="animate-spin text-blue-500 mb-4">
            <FiLoader size={48} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Discovering {name}...
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Gathering all the fascinating details about this country
          </p>
        </motion.div>
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center"
        >
          <div className="text-red-500 mb-4">
            <FiAlertCircle size={48} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Oops! We hit a roadblock
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            {error || `We couldn't find information about ${name}. It might be misspelled or this country doesn't exist in our database.`}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      
      <CountryDetails country={country} />
    </motion.div>
  )
}