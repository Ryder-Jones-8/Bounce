import axios from 'axios'
import { SearchCriteria, SearchResult } from '../context/SearchContext'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Amadeus API configuration
const AMADEUS_API_KEY = import.meta.env.VITE_AMADEUS_API_KEY
const AMADEUS_API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1'

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Amadeus API client
export const amadeusApi = axios.create({
  baseURL: AMADEUS_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// Amadeus authentication
let amadeusToken: string | null = null
let tokenExpiry: number = 0

const getAmadeusToken = async (): Promise<string> => {
  if (amadeusToken && Date.now() < tokenExpiry) {
    return amadeusToken!
  }

  try {
    const response = await amadeusApi.post('/security/oauth2/token', 
      `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`
    )
    
    amadeusToken = response.data.access_token
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000 // 1 min buffer
    
    return amadeusToken!
  } catch (error) {
    console.error('Failed to get Amadeus token:', error)
    throw new Error('Authentication failed')
  }
}

// Real Amadeus hotel search
const searchAmadeusHotels = async (criteria: SearchCriteria): Promise<SearchResult[]> => {
  if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
    console.warn('Amadeus API credentials not configured, using mock data')
    return getMockResults(criteria)
  }

  try {
    const token = await getAmadeusToken()
    
    // First, get city IATA code
    const cityResponse = await amadeusApi.get('/reference-data/locations/cities', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        keyword: criteria.destination,
        max: 1
      }
    })

    if (!cityResponse.data.data?.[0]) {
      throw new Error('City not found')
    }

    const cityCode = cityResponse.data.data[0].iataCode

    // Search for hotels
    const hotelResponse = await amadeusApi.get('/reference-data/locations/hotels/by-city', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        cityCode,
        radius: 20,
        radiusUnit: 'KM',
        hotelSource: 'ALL'
      }
    })

    // Transform Amadeus data to our format
    return hotelResponse.data.data.slice(0, 25).map((hotel: any, index: number) => ({
      id: hotel.hotelId || `amadeus-${index}`,
      name: hotel.name || 'Hotel Name',
      price: Math.floor(Math.random() * 300) + 50, // Amadeus doesn't provide pricing in this endpoint
      rating: Math.random() * 2 + 3, // Random rating between 3-5
      photo: `https://images.unsplash.com/photo-${1566073771259 + index}?w=400`,
      transit: hotel.address?.lines?.[0] || 'Location details available',
      amenities: ['WiFi', 'Reception', 'Room Service'], // Basic amenities
      ctaUrl: `/booking/${hotel.hotelId || index}`,
    }))

  } catch (error) {
    console.error('Amadeus API error:', error)
    // Fallback to mock data
    return getMockResults(criteria)
  }
}

// Mock data for development
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
  {
    id: '4',
    name: 'Historic Boutique Inn',
    price: 179,
    rating: 4.5,
    photo: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
    transit: '3 min walk to Metro',
    amenities: ['WiFi', 'Restaurant', 'Historic Tours'],
    ctaUrl: '/booking/4',
  },
  {
    id: '5',
    name: 'Family Resort & Spa',
    price: 349,
    rating: 4.9,
    photo: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    transit: '10 min drive to City Center',
    amenities: ['WiFi', 'Pool', 'Spa', 'Kids Club', 'Restaurant', 'Bar', 'Tennis Court'],
    ctaUrl: '/booking/5',
  },
]

// Mock data for development and fallback
const getMockResults = (criteria: SearchCriteria): SearchResult[] => {
  let results = [...mockResults]
  
  // Simple filtering based on destination
  if (criteria.destination.toLowerCase().includes('paris')) {
    results = results.slice(0, 3)
  } else if (criteria.destination.toLowerCase().includes('tokyo')) {
    results = results.slice(1, 4)
  }
  
  // Add more results for demonstration
  const additionalResults = Array.from({ length: 20 }, (_, i) => ({
    ...mockResults[i % mockResults.length],
    id: `${mockResults[i % mockResults.length].id}-${i + 6}`,
    name: `${mockResults[i % mockResults.length].name} ${i + 6}`,
    price: mockResults[i % mockResults.length].price + (i * 10),
  }))
  
  return [...results, ...additionalResults]
}

export const searchApi = async (criteria: SearchCriteria): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  try {
    // Try real API first
    if (AMADEUS_API_KEY && AMADEUS_API_SECRET) {
      return await searchAmadeusHotels(criteria)
    }
    
    // Fallback to mock data
    return getMockResults(criteria)
  } catch (error) {
    console.error('Search API error:', error)
    // Always fallback to mock data on error
    return getMockResults(criteria)
  }
}

export const getCityAutocomplete = async (query: string): Promise<string[]> => {
  if (query.length < 2) return []
  
  // Try real Amadeus city search first
  if (AMADEUS_API_KEY && AMADEUS_API_SECRET) {
    try {
      const token = await getAmadeusToken()
      const response = await amadeusApi.get('/reference-data/locations/cities', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          keyword: query,
          max: 5
        }
      })
      
      return response.data.data.map((city: any) => 
        `${city.name}, ${city.address.countryName}`
      )
    } catch (error) {
      console.warn('Amadeus city search failed, using mock data:', error)
    }
  }
  
  // Fallback to mock city data
  const cities = [
    'Paris, France',
    'Tokyo, Japan', 
    'New York, USA',
    'London, UK',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Berlin, Germany',
    'Sydney, Australia',
    'Bangkok, Thailand',
    'Dubai, UAE',
    'Singapore, Singapore',
    'Istanbul, Turkey',
    'Los Angeles, USA',
    'Prague, Czech Republic',
    'Vienna, Austria',
    'Budapest, Hungary',
    'Copenhagen, Denmark',
    'Stockholm, Sweden',
    'Helsinki, Finland'
  ]
  
  return cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)
}
