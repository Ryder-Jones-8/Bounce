import express from 'express'
import axios from 'axios'

const router = express.Router()

// Amadeus API configuration
const AMADEUS_API_KEY = process.env.VITE_AMADEUS_API_KEY
const AMADEUS_API_SECRET = process.env.VITE_AMADEUS_API_SECRET
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1'

// Amadeus token cache
let amadeusToken = null
let tokenExpiry = 0

// Get Amadeus access token
const getAmadeusToken = async () => {
  if (amadeusToken && Date.now() < tokenExpiry) {
    return amadeusToken
  }

  try {
    console.log('🔑 Getting new Amadeus token...')
    const response = await axios.post(
      `${AMADEUS_BASE_URL}/security/oauth2/token`,
      `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    
    amadeusToken = response.data.access_token
    tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000 // 1 min buffer
    
    console.log('✅ Got Amadeus token successfully')
    return amadeusToken
  } catch (error) {
    console.error('❌ Failed to get Amadeus token:', error.response?.data || error.message)
    throw new Error('Authentication failed')
  }
}

// City coordinates mapping for major cities
const cityCoordinates = {
  'paris': { lat: 48.8566, lng: 2.3522 },
  'london': { lat: 51.5074, lng: -0.1278 },
  'new york': { lat: 40.7128, lng: -74.0060 },
  'tokyo': { lat: 35.6762, lng: 139.6503 },
  'rome': { lat: 41.9028, lng: 12.4964 },
  'barcelona': { lat: 41.3851, lng: 2.1734 },
  'amsterdam': { lat: 52.3676, lng: 4.9041 },
  'berlin': { lat: 52.5200, lng: 13.4050 },
  'sydney': { lat: -33.8688, lng: 151.2093 },
  'bangkok': { lat: 13.7563, lng: 100.5018 },
  'dubai': { lat: 25.2048, lng: 55.2708 },
  'singapore': { lat: 1.3521, lng: 103.8198 },
  'istanbul': { lat: 41.0082, lng: 28.9784 },
  'los angeles': { lat: 34.0522, lng: -118.2437 },
  'miami': { lat: 25.7617, lng: -80.1918 },
  'madrid': { lat: 40.4168, lng: -3.7038 },
  'vienna': { lat: 48.2082, lng: 16.3738 },
  'prague': { lat: 50.0755, lng: 14.4378 },
  'copenhagen': { lat: 55.6761, lng: 12.5683 },
  'stockholm': { lat: 59.3293, lng: 18.0686 }
}

// Get random amenities
const getRandomAmenities = () => {
  const allAmenities = ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Breakfast', 'Business Center', 'Conference Room', 'Pet-friendly', 'Air Conditioning', 'Room Service']
  const numAmenities = Math.floor(Math.random() * 4) + 3
  return allAmenities.sort(() => 0.5 - Math.random()).slice(0, numAmenities)
}

// Get hotel photos (Unsplash)
const getHotelPhoto = (index) => {
  const photos = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'
  ]
  return photos[index % photos.length]
}

// Search hotels endpoint
router.post('/search', async (req, res) => {
  try {
    const { destination, startDate, endDate, guests } = req.body
    
    console.log(`🔍 Searching hotels for: ${destination} (${guests} guests, ${startDate} to ${endDate})`)
    
    if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
      console.warn('⚠️ Amadeus API credentials not configured')
      return res.status(500).json({ error: 'API credentials not configured' })
    }

    // Get city coordinates
    const cityKey = destination.toLowerCase().split(',')[0].trim()
    const coordinates = cityCoordinates[cityKey]
    
    if (!coordinates) {
      console.warn(`⚠️ No coordinates found for ${destination}`)
      return res.status(400).json({ error: 'City not supported yet' })
    }

    // Get Amadeus token
    const token = await getAmadeusToken()
    
    // Search for hotels using Amadeus API
    console.log(`📍 Searching hotels near ${destination} (${coordinates.lat}, ${coordinates.lng})`)
    
    const hotelResponse = await axios.get(
      `${AMADEUS_BASE_URL}/reference-data/locations/hotels/by-geocode`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          radius: 20,
          radiusUnit: 'KM',
          hotelSource: 'ALL'
        }
      }
    )

    console.log(`✅ Found ${hotelResponse.data.data?.length || 0} hotels from Amadeus`)

    if (!hotelResponse.data.data || hotelResponse.data.data.length === 0) {
      return res.status(404).json({ error: 'No hotels found for this destination' })
    }

    // Transform Amadeus data to our format
    const hotels = hotelResponse.data.data.slice(0, 25).map((hotel, index) => ({
      id: hotel.hotelId || `amadeus-${index}`,
      name: hotel.name || `Hotel in ${destination}`,
      price: Math.floor(Math.random() * 300) + 80, // Random pricing since basic API doesn't include rates
      rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // Random rating between 3.5-5
      photo: getHotelPhoto(index),
      transit: hotel.address?.lines?.[0] || hotel.address?.cityName || 'City Center',
      amenities: getRandomAmenities(),
      ctaUrl: `/booking/${hotel.hotelId || index}`,
    }))

    console.log(`🎉 Returning ${hotels.length} hotels`)
    
    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
      query: { destination, startDate, endDate, guests }
    })

  } catch (error) {
    console.error('❌ Hotel search error:', error.response?.data || error.message)
    res.status(500).json({
      error: 'Hotel search failed',
      message: error.message
    })
  }
})

// City autocomplete endpoint
router.get('/cities', async (req, res) => {
  try {
    const { q: query } = req.query
    
    if (!query || query.length < 2) {
      return res.json({ data: [] })
    }

    console.log(`🔍 Searching cities for: "${query}"`)

    if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
      // Fallback to local cities
      const localCities = Object.keys(cityCoordinates).map(city => 
        city.charAt(0).toUpperCase() + city.slice(1) + ', ' + 
        (city === 'new york' ? 'United States' : 
         city === 'los angeles' ? 'United States' :
         city === 'miami' ? 'United States' :
         city === 'london' ? 'United Kingdom' :
         city === 'paris' ? 'France' :
         city === 'tokyo' ? 'Japan' :
         'Various')
      )
      
      const matches = localCities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
      
      return res.json({ data: matches })
    }

    // Try Amadeus city search
    const token = await getAmadeusToken()
    const response = await axios.get(
      `${AMADEUS_BASE_URL}/reference-data/locations`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          keyword: query,
          subType: 'CITY',
          sort: 'analytics.travelers.score',
          view: 'LIGHT'
        }
      }
    )

    if (response.data.data && response.data.data.length > 0) {
      console.log(`✅ Found ${response.data.data.length} real cities from Amadeus`)
      const cities = response.data.data.slice(0, 5).map(location => 
        `${location.name}, ${location.address?.countryName || location.address?.countryCode || ''}`
      ).filter(city => city.includes(','))
      
      res.json({ data: cities })
    } else {
      res.json({ data: [] })
    }

  } catch (error) {
    console.error('❌ City search error:', error.response?.data || error.message)
    res.status(500).json({
      error: 'City search failed',
      message: error.message
    })
  }
})

export default router
