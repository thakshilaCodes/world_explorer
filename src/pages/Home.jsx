import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from '../components/Search'
import Filter from '../components/Filter'
import CountryCard from '../components/CountryCard'
import LoadingSkeleton from '../components/LoadingSkeleton'
import EmptyState from '../components/EmptyState'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [allLanguages, setAllLanguages] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError(null)
        // Specify only the fields we need to reduce bandwidth
        const fields = 'name,flags,cca3,population,region,subregion,capital,languages,currencies,timezones'
        const response = await axios.get(`https://restcountries.com/v3.1/all?fields=${fields}`)
        
        // Sort countries alphabetically by name
        const sortedCountries = response.data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        )
        setCountries(sortedCountries)
        setFilteredCountries(sortedCountries)
        
        // Extract all unique languages
        const languages = new Set()
        sortedCountries.forEach(country => {
          if (country.languages) {
            Object.values(country.languages).forEach(lang => languages.add(lang))
          }
        })
        setAllLanguages(Array.from(languages).sort())
      } catch (error) {
        console.error('Error fetching countries:', error)
        setError('Failed to load countries. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    // Combined search and filter effect
    let result = [...countries]
    
    // Apply search filter
    if (searchTerm.trim()) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply region filter
    if (selectedRegion) {
      result = result.filter(country => country.region === selectedRegion)
    }
    
    // Apply language filter
    if (selectedLanguage) {
      result = result.filter(country => 
        country.languages && 
        Object.values(country.languages).includes(selectedLanguage))
    }
    
    setFilteredCountries(result)
  }, [searchTerm, selectedRegion, selectedLanguage, countries])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleRegionFilter = (region) => {
    setSelectedRegion(region)
  }

  const handleLanguageFilter = (language) => {
    setSelectedLanguage(language)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedRegion('')
    setSelectedLanguage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8">
        {/* Controls Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
            <Search 
              onSearch={handleSearch} 
              value={searchTerm}
              placeholder="Search for a country..."
              className="flex-grow max-w-2xl"
            />
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Filter 
                onFilter={handleRegionFilter} 
                selectedValue={selectedRegion}
                options={['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']}
                placeholder="Filter by Region"
                icon="region"
                className="w-full md:w-48"
              />
              <Filter 
                onFilter={handleLanguageFilter} 
                selectedValue={selectedLanguage}
                options={allLanguages}
                placeholder="Filter by Language"
                icon="language"
                className="w-full md:w-60"
              />
            </div>
          </div>
          
          {(searchTerm || selectedRegion || selectedLanguage) && (
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300 mb-4">
              <span>Filters applied:</span>
              {searchTerm && (
                <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full flex items-center gap-1">
                  <span>Search:</span> 
                  <span className="font-medium">"{searchTerm}"</span>
                </span>
              )}
              {selectedRegion && (
                <span className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full flex items-center gap-1">
                  <span>Region:</span>
                  <span className="font-medium">{selectedRegion}</span>
                </span>
              )}
              {selectedLanguage && (
                <span className="bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full flex items-center gap-1">
                  <span>Language:</span>
                  <span className="font-medium">{selectedLanguage}</span>
                </span>
              )}
              <button 
                onClick={clearFilters}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Clear all</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </section>

        {/* Content Section */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(12)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4 text-lg">{error}</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredCountries.length === 0 ? (
            <EmptyState 
              title="No countries found"
              message="Try adjusting your search or filter criteria"
              onReset={clearFilters}
            />
          ) : (
            <>
              <div className="mb-4 text-gray-600 dark:text-gray-300">
                Showing {filteredCountries.length} of {countries.length} countries
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredCountries.map((country) => (
                  <CountryCard 
                    key={country.cca3} 
                    country={country} 
                    className="hover:scale-105 transition-transform duration-200"
                    highlightLanguage={selectedLanguage}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>Country Explorer © {new Date().getFullYear()}</p>
          <p className="text-sm mt-1">Data provided by REST Countries API</p>
        </div>
      </footer>
    </div>
  )
}