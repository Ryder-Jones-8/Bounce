import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'
import { getCityAutocomplete } from '../utils/api'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { state, updateCriteria } = useSearch()
  const [cityQuery, setCityQuery] = useState('')
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Handle city autocomplete
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (cityQuery.length > 2) {
        const suggestions = await getCityAutocomplete(cityQuery)
        setCitySuggestions(suggestions)
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timeoutId)
  }, [cityQuery])

  const handleCitySelect = (city: string) => {
    setCityQuery(city)
    updateCriteria({ destination: city })
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    if (!state.criteria.destination || !state.criteria.startDate || !state.criteria.endDate) {
      alert('Please fill in all required fields')
      return
    }

    const params = new URLSearchParams({
      destination: state.criteria.destination,
      startDate: state.criteria.startDate,
      endDate: state.criteria.endDate,
      guests: state.criteria.guests.toString(),
    })

    navigate(`/results?${params.toString()}`)
  }

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl text-blue-100 dark:text-gray-300">
            Discover amazing accommodations with Bounce
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Destination Input */}
            <div className="relative lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Where are you going?
              </label>
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value)
                  updateCriteria({ destination: e.target.value })
                }}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="City, country, or region"
              />
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                  {citySuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleCitySelect(suggestion)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Check-in
              </label>
              <input
                type="date"
                min={today}
                value={state.criteria.startDate}
                onChange={(e) => updateCriteria({ startDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Check-out
              </label>
              <input
                type="date"
                min={state.criteria.startDate || tomorrow}
                value={state.criteria.endDate}
                onChange={(e) => updateCriteria({ endDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Guests
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => updateCriteria({ guests: Math.max(1, state.criteria.guests - 1) })}
                className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
                disabled={state.criteria.guests <= 1}
              >
                <span className="text-xl font-bold">-</span>
              </button>
              <span className="text-xl font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">
                {state.criteria.guests} {state.criteria.guests === 1 ? 'guest' : 'guests'}
              </span>
              <button
                onClick={() => updateCriteria({ guests: Math.min(10, state.criteria.guests + 1) })}
                className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
                disabled={state.criteria.guests >= 10}
              >
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-8">
            <button
              onClick={handleSearch}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Search Accommodations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
