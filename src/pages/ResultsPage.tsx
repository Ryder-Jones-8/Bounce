import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../context/SearchContext'
import HighlightCard from '../components/HighlightCard'
import RatingBadge from '../components/RatingBadge'
import AmenityIcon from '../components/AmenityIcon'
import PriceTag from '../components/PriceTag'
import { SearchResult } from '../context/SearchContext'

const ITEM_HEIGHT = 200
const CONTAINER_HEIGHT = 600

const ResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { state, updateCriteria, searchAccommodations } = useSearch()
  const [showAllOptions, setShowAllOptions] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  // Virtual scrolling calculations
  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT)
  const endIndex = Math.min(startIndex + Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT) + 1, state.results.length)
  const visibleItems = useMemo(() => state.results.slice(startIndex, endIndex), [state.results, startIndex, endIndex])

  useEffect(() => {
    // Update criteria from URL params
    const destination = searchParams.get('destination')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const guests = searchParams.get('guests')

    if (destination && startDate && endDate && guests) {
      updateCriteria({
        destination,
        startDate,
        endDate,
        guests: parseInt(guests, 10),
      })

      // Trigger search
      searchAccommodations()
    }
  }, [searchParams, updateCriteria, searchAccommodations])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
            
            {/* Highlights Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* List Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 flex">
                  <div className="w-32 h-24 bg-gray-300 dark:bg-gray-700 rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{state.error}</p>
          <button
            onClick={searchAccommodations}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Stays in {state.criteria.destination}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {state.criteria.startDate} - {state.criteria.endDate} • {state.criteria.guests} {state.criteria.guests === 1 ? 'guest' : 'guests'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            {state.results.length} properties found
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {state.highlights.bestValue && (
            <HighlightCard {...state.highlights.bestValue} />
          )}
          {state.highlights.easyTransit && (
            <HighlightCard {...state.highlights.easyTransit} />
          )}
          {state.highlights.fullService && (
            <HighlightCard {...state.highlights.fullService} />
          )}
        </div>

        {/* All Options Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowAllOptions(!showAllOptions)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                All Options ({state.results.length})
              </h2>
              <span className="text-primary-600 dark:text-primary-400 text-lg">
                {showAllOptions ? '−' : '+'}
              </span>
            </button>
          </div>

          {showAllOptions && (
            <div
              className="relative overflow-auto"
              style={{ height: CONTAINER_HEIGHT }}
              onScroll={handleScroll}
            >
              {/* Virtual scrolling spacer */}
              <div style={{ height: state.results.length * ITEM_HEIGHT }}>
                <div style={{ transform: `translateY(${startIndex * ITEM_HEIGHT}px)` }}>
                  {visibleItems.map((result, index) => (
                    <ResultCard
                      key={result.id}
                      result={result}
                      actualIndex={startIndex + index}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ResultCardProps {
  result: SearchResult
  actualIndex: number
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div
      className="flex p-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      style={{ height: ITEM_HEIGHT }}
    >
      {/* Image */}
      <div className="w-48 h-32 flex-shrink-0 mr-6">
        <img
          src={result.photo}
          alt={result.name}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {result.name}
          </h3>
          
          <div className="flex items-center space-x-4 mb-3">
            <RatingBadge rating={result.rating} />
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{result.transit}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {result.amenities.slice(0, 4).map((amenity, index) => (
              <AmenityIcon key={index} amenity={amenity} />
            ))}
            {result.amenities.length > 4 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                +{result.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <PriceTag price={result.price} />
          <a
            href={result.ctaUrl}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
