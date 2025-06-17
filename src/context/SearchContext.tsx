import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface SearchCriteria {
  destination: string
  startDate: string
  endDate: string
  guests: number
}

export interface SearchResult {
  id: string
  name: string
  price: number
  rating: number
  photo: string
  transit: string
  amenities: string[]
  ctaUrl: string
}

export interface HighlightCard {
  label: string
  photo: string
  name: string
  price: number
  transit: string
  ctaUrl: string
}

interface SearchState {
  criteria: SearchCriteria
  results: SearchResult[]
  highlights: {
    bestValue: HighlightCard | null
    easyTransit: HighlightCard | null
    fullService: HighlightCard | null
  }
  loading: boolean
  error: string | null
}

type SearchAction =
  | { type: 'UPDATE_CRITERIA'; payload: Partial<SearchCriteria> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RESULTS'; payload: SearchResult[] }
  | { type: 'SET_HIGHLIGHTS'; payload: SearchState['highlights'] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_SEARCH' }

const initialState: SearchState = {
  criteria: {
    destination: '',
    startDate: '',
    endDate: '',
    guests: 1,
  },
  results: [],
  highlights: {
    bestValue: null,
    easyTransit: null,
    fullService: null,
  },
  loading: false,
  error: null,
}

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'UPDATE_CRITERIA':
      return {
        ...state,
        criteria: { ...state.criteria, ...action.payload },
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_RESULTS':
      return { ...state, results: action.payload, loading: false }
    case 'SET_HIGHLIGHTS':
      return { ...state, highlights: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'RESET_SEARCH':
      return { ...initialState, criteria: state.criteria }
    default:
      return state
  }
}

interface SearchContextType {
  state: SearchState
  updateCriteria: (criteria: Partial<SearchCriteria>) => void
  searchAccommodations: () => Promise<void>
  resetSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  const updateCriteria = (criteria: Partial<SearchCriteria>) => {
    dispatch({ type: 'UPDATE_CRITERIA', payload: criteria })
  }

  const searchAccommodations = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'SET_ERROR', payload: null })

      // Import the API function dynamically to avoid circular dependencies
      const { searchApi } = await import('../utils/api')
      const results = await searchApi(state.criteria)
      
      dispatch({ type: 'SET_RESULTS', payload: results })
      
      // Generate highlights from results
      const highlights = generateHighlights(results)
      dispatch({ type: 'SET_HIGHLIGHTS', payload: highlights })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Search failed' })
    }
  }

  const resetSearch = () => {
    dispatch({ type: 'RESET_SEARCH' })
  }

  const value: SearchContextType = {
    state,
    updateCriteria,
    searchAccommodations,
    resetSearch,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

const generateHighlights = (results: SearchResult[]): SearchState['highlights'] => {
  if (results.length === 0) {
    return { bestValue: null, easyTransit: null, fullService: null }
  }

  const bestValue = results.reduce((prev, current) => 
    (current.price < prev.price) ? current : prev
  )

  const easyTransit = results.find(result => 
    result.transit.toLowerCase().includes('station') || 
    result.transit.toLowerCase().includes('metro')
  ) || results[0]

  const fullService = results.reduce((prev, current) => 
    (current.amenities.length > prev.amenities.length) ? current : prev
  )

  return {
    bestValue: {
      label: 'Best Value',
      photo: bestValue.photo,
      name: bestValue.name,
      price: bestValue.price,
      transit: bestValue.transit,
      ctaUrl: bestValue.ctaUrl,
    },
    easyTransit: {
      label: 'Easy Transit',
      photo: easyTransit.photo,
      name: easyTransit.name,
      price: easyTransit.price,
      transit: easyTransit.transit,
      ctaUrl: easyTransit.ctaUrl,
    },
    fullService: {
      label: 'Full Service',
      photo: fullService.photo,
      name: fullService.name,
      price: fullService.price,
      transit: fullService.transit,
      ctaUrl: fullService.ctaUrl,
    },
  }
}
