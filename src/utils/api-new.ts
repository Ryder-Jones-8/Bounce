import axios from 'axios'
import { SearchCriteria, SearchResult } from '../context/SearchContext'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Mock data for fallback
const mockResults: SearchResult[] = [
  {
    id: '1',
    name: 'Luxury Downtown Hotel',
    price: 299,
    rating: 4.8,
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    transit: '2 min walk to Metro Station',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
    ctaUrl: '/booking/1',
  },
  {
    id: '2',
    name: 'Cozy Boutique Stay',
    price: 149,
    rating: 4.6,
    photo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    transit: '5 min walk to Bus Stop',
    amenities: ['WiFi', 'Breakfast', 'Pet-friendly'],
    ctaUrl: '/booking/2',
  },
  {
    id: '3',
    name: 'Modern Business Hotel',
    price: 199,
    rating: 4.7,
    photo: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    transit: '1 min walk to Train Station',
    amenities: ['WiFi', 'Business Center', 'Gym', 'Conference Room'],
    ctaUrl: '/booking/3',
  },
]

// Fallback mock data function
const getMockResults = (criteria: SearchCriteria): SearchResult[] => {
  let results = [...mockResults]
  
  // Simple filtering based on destination
  if (criteria.destination.toLowerCase().includes('paris')) {
    results = results.slice(0, 2)
  } else if (criteria.destination.toLowerCase().includes('tokyo')) {
    results = results.slice(1, 3)
  }
  
  // Add more results for demonstration
  const additionalResults = Array.from({ length: 15 }, (_, i) => ({
    ...mockResults[i % mockResults.length],
    id: `${mockResults[i % mockResults.length].id}-${i + 4}`,
    name: `${mockResults[i % mockResults.length].name} ${i + 4}`,
    price: mockResults[i % mockResults.length].price + (i * 10),
  }))
  
  return [...results, ...additionalResults]
}

// Real backend hotel search
export const searchApi = async (criteria: SearchCriteria): Promise<SearchResult[]> => {
  console.log('🔍 Searching hotels via backend API...')
  
  try {
    const response = await api.post('/search', {
      destination: criteria.destination,
      startDate: criteria.startDate,
      endDate: criteria.endDate,
      guests: criteria.guests
    })
    
    console.log(`✅ Backend returned ${response.data.count} real hotels`)
    return response.data.data
    
  } catch (error) {
    console.error('❌ Backend search failed:', error)
    
    // Fallback to mock data if backend is down
    console.log('🔄 Using fallback mock data')
    return getMockResults(criteria)
  }
}

// Real backend city search
export const getCityAutocomplete = async (query: string): Promise<string[]> => {
  if (query.length < 2) return []
  
  console.log(`🔍 Searching cities via backend: "${query}"`)
  
  try {
    const response = await api.get('/cities', {
      params: { q: query }
    })
    
    console.log(`✅ Backend returned ${response.data.data.length} cities`)
    return response.data.data
    
  } catch (error) {
    console.error('❌ Backend city search failed:', error)
    
    // Fallback to local city data
    const cities = [
      'Paris, France',
      'London, United Kingdom', 
      'New York, United States',
      'Tokyo, Japan',
      'Rome, Italy',
      'Barcelona, Spain',
      'Amsterdam, Netherlands',
      'Berlin, Germany',
      'Sydney, Australia',
      'Bangkok, Thailand',
      'Dubai, United Arab Emirates',
      'Singapore, Singapore',
      'Madrid, Spain',
      'Vienna, Austria',
      'Prague, Czech Republic',
      'Copenhagen, Denmark',
      'Stockholm, Sweden',
      'Los Angeles, United States',
      'Miami, United States'
    ]
    
    return cities.filter(city => 
      city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
  }
}
