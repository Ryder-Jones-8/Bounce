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

export const searchApi = async (criteria: SearchCriteria): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  try {
    // In a real app, this would make an actual API call
    // const response = await api.post('/search', criteria)
    // return response.data
    
    // For now, return mock data with some filtering
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
  } catch (error) {
    console.error('Search API error:', error)
    throw new Error('Failed to search accommodations')
  }
}

export const getCityAutocomplete = async (query: string): Promise<string[]> => {
  // Mock city data for autocomplete
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
  ]
  
  return cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)
}
