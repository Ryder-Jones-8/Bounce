import React, { useState, useEffect } from 'react'
import { useSearch } from '../context/SearchContext'
import { getCityAutocomplete } from '../utils/api'
import { debounce } from '../utils/helpers'

interface SearchFormProps {
  onSearch?: () => void
  compact?: boolean
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, compact = false }) => {
  const { state, updateCriteria } = useSearch()
  const [cityQuery, setCityQuery] = useState(state.criteria.destination)
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Debounced city search
  const debouncedCitySearch = debounce(async (query: string) => {
    if (query.length > 2) {
      const suggestions = await getCityAutocomplete(query)
      setCitySuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, 300)

  useEffect(() => {
    debouncedCitySearch(cityQuery)
  }, [cityQuery])

  const handleCitySelect = (city: string) => {
    setCityQuery(city)
    updateCriteria({ destination: city })
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.()
  }

  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className={`${compact ? 'space-y-4' : 'space-y-6'}`}>
      <div className={`grid ${compact ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-4`}>
        {/* Destination Input */}
        <div className={`relative ${compact ? '' : 'lg:col-span-2'}`}>
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
            required
          />
          
          {/* Autocomplete Suggestions */}
          {showSuggestions && citySuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
              {citySuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
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
            required
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
            required
          />
        </div>

        {/* Guests Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Guests
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => updateCriteria({ guests: Math.max(1, state.criteria.guests - 1) })}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
              disabled={state.criteria.guests <= 1}
            >
              <span className="text-lg font-bold">-</span>
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[3rem] text-center">
              {state.criteria.guests}
            </span>
            <button
              type="button"
              onClick={() => updateCriteria({ guests: Math.min(10, state.criteria.guests + 1) })}
              className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
              disabled={state.criteria.guests >= 10}
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Button */}
      {onSearch && (
        <div className={compact ? 'pt-4' : 'pt-6'}>
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Search Accommodations
          </button>
        </div>
      )}
    </form>
  )
}

export default SearchForm
