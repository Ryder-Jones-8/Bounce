import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

// Basic middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}))
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' })
})

// Mock search endpoint with completely stable data
app.post('/api/search', (req, res) => {
  const { destination } = req.body
  
  // Pre-defined stable hotel data by city
  const getStableHotelData = (dest) => {
    const city = dest.split(',')[0].trim().toLowerCase()
    
    if (city.includes('paris')) {
      return [
        { name: 'Le Grand Paris Hotel', price: 320, rating: 4.3 },
        { name: 'Hotel des Champs-Élysées', price: 285, rating: 4.7 },
        { name: 'Boutique Louvre Palace', price: 395, rating: 4.5 },
        { name: 'The Eiffel Tower Inn', price: 275, rating: 4.2 },
        { name: 'Montmartre Luxury Suites', price: 445, rating: 4.8 }
      ]
    } else if (city.includes('london')) {
      return [
        { name: 'The Royal Westminster', price: 380, rating: 4.6 },
        { name: 'Thames View Hotel', price: 295, rating: 4.4 },
        { name: 'Covent Garden Boutique', price: 425, rating: 4.7 },
        { name: 'Tower Bridge Lodge', price: 265, rating: 4.1 },
        { name: 'Hyde Park Manor', price: 495, rating: 4.9 }
      ]
    } else if (city.includes('tokyo')) {
      return [
        { name: 'Shibuya Sky Hotel', price: 250, rating: 4.5 },
        { name: 'Imperial Palace Inn', price: 375, rating: 4.8 },
        { name: 'Ginza Luxury Suites', price: 520, rating: 4.9 },
        { name: 'Harajuku Modern Hotel', price: 195, rating: 4.2 },
        { name: 'Tokyo Bay Resort', price: 345, rating: 4.6 }
      ]
    } else if (city.includes('new york')) {
      return [
        { name: 'Manhattan Grand Hotel', price: 425, rating: 4.5 },
        { name: 'Times Square Boutique', price: 395, rating: 4.3 },
        { name: 'Central Park View Hotel', price: 595, rating: 4.8 },
        { name: 'Brooklyn Bridge Inn', price: 285, rating: 4.1 },
        { name: 'Fifth Avenue Luxury', price: 725, rating: 4.9 }
      ]
    } else if (city.includes('los angeles')) {
      return [
        { name: 'Hollywood Hills Hotel', price: 325, rating: 4.4 },
        { name: 'Beverly Hills Boutique', price: 495, rating: 4.7 },
        { name: 'Santa Monica Beach Resort', price: 385, rating: 4.6 },
        { name: 'Downtown LA Tower', price: 275, rating: 4.2 },
        { name: 'Sunset Strip Inn', price: 225, rating: 4.0 }
      ]
    } else if (city.includes('miami')) {
      return [
        { name: 'South Beach Grand', price: 295, rating: 4.4 },
        { name: 'Art Deco Boutique Hotel', price: 235, rating: 4.2 },
        { name: 'Biscayne Bay Resort', price: 385, rating: 4.6 },
        { name: 'Ocean Drive Inn', price: 195, rating: 4.0 },
        { name: 'Coral Gables Luxury', price: 425, rating: 4.7 }
      ]
    } else {
      // Generic city hotels with stable data
      const cityName = city.charAt(0).toUpperCase() + city.slice(1)
      return [
        { name: `${cityName} Grand Hotel`, price: 185, rating: 4.1 },
        { name: `The ${cityName} Boutique`, price: 225, rating: 4.3 },
        { name: `${cityName} Business Center`, price: 165, rating: 3.9 },
        { name: `Historic ${cityName} Inn`, price: 145, rating: 4.0 },
        { name: `${cityName} Luxury Resort`, price: 295, rating: 4.5 }
      ]
    }
  }
  
  const stableHotels = getStableHotelData(destination || 'Downtown')
  const mockResults = stableHotels.map((hotel, index) => ({
    id: `hotel-${index + 1}`,
    name: hotel.name,
    price: hotel.price,
    rating: hotel.rating,
    photo: `https://images.unsplash.com/photo-${1566073771259 + index * 1000}?w=400`,
    transit: index === 0 ? '2 min walk to Metro' : 
             index === 1 ? '5 min walk to Station' :
             index === 2 ? '3 min walk to Bus Stop' :
             `${index + 3} min to transport`,
    amenities: index === 0 ? ['WiFi', 'Pool', 'Spa', 'Restaurant'] :
               index === 1 ? ['WiFi', 'Gym', 'Business Center'] :
               index === 2 ? ['WiFi', 'Bar', 'Room Service'] :
               ['WiFi', 'Pool', 'Breakfast'],
    ctaUrl: `/hotel/${encodeURIComponent(hotel.name.toLowerCase().replace(/\s+/g, '-'))}`
  }))
  
  // Add a few more hotels with stable data
  const cityName = destination.split(',')[0].trim()
  const additionalHotels = Array.from({ length: 15 }, (_, i) => ({
    id: `hotel-${i + 6}`,
    name: `${cityName} Hotel ${i + 6}`,
    price: 125 + (i * 18), // Stable incremental pricing
    rating: Math.round((3.8 + (i * 0.08)) * 10) / 10, // Stable incremental rating
    photo: `https://images.unsplash.com/photo-${1566073771259 + (i + 5) * 1000}?w=400`,
    transit: `${i + 5} min to city center`,
    amenities: i % 3 === 0 ? ['WiFi', 'Pool', 'Gym'] : 
               i % 3 === 1 ? ['WiFi', 'Spa', 'Restaurant'] :
               ['WiFi', 'Business Center'],
    ctaUrl: `/hotel/hotel-${i + 6}`
  }))
  
  const allResults = [...mockResults, ...additionalHotels]
  
  res.json({
    count: allResults.length,
    data: allResults
  })
})

// Mock cities endpoint with city, state/country format
app.get('/api/cities', (req, res) => {
  const query = req.query.q || ''
  
  // Comprehensive city, state/country format
  const cities = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA',
    'Austin, TX',
    'Jacksonville, FL',
    'Fort Worth, TX',
    'Columbus, OH',
    'Charlotte, NC',
    'San Francisco, CA',
    'Indianapolis, IN',
    'Seattle, WA',
    'Denver, CO',
    'Washington, DC',
    'Boston, MA',
    'Nashville, TN',
    'Detroit, MI',
    'Portland, OR',
    'Las Vegas, NV',
    'Memphis, TN',
    'Louisville, KY',
    'Baltimore, MD',
    'Milwaukee, WI',
    'Atlanta, GA',
    'Miami, FL',
    'Colorado Springs, CO',
    'Raleigh, NC',
    'Tampa, FL',
    'New Orleans, LA',
    'Cleveland, OH',
    'Honolulu, HI',
    'Orlando, FL',
    'Cincinnati, OH',
    'Pittsburgh, PA',
    'St. Louis, MO',
    'Minneapolis, MN',
    'Anchorage, AK',
    'Buffalo, NY',
    'Salt Lake City, UT',
    'Paris, France',
    'London, United Kingdom',
    'Berlin, Germany',
    'Madrid, Spain',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Vienna, Austria',
    'Prague, Czech Republic',
    'Budapest, Hungary',
    'Stockholm, Sweden',
    'Copenhagen, Denmark',
    'Oslo, Norway',
    'Helsinki, Finland',
    'Dublin, Ireland',
    'Brussels, Belgium',
    'Zurich, Switzerland',
    'Geneva, Switzerland',
    'Lisbon, Portugal',
    'Athens, Greece',
    'Istanbul, Turkey',
    'Tokyo, Japan',
    'Osaka, Japan',
    'Kyoto, Japan',
    'Seoul, South Korea',
    'Beijing, China',
    'Shanghai, China',
    'Hong Kong, China',
    'Mumbai, India',
    'Delhi, India',
    'Bangalore, India',
    'Sydney, Australia',
    'Melbourne, Australia',
    'Brisbane, Australia',
    'Toronto, Canada',
    'Montreal, Canada',
    'Vancouver, Canada'
  ]
  
  const matches = cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  )
  
  res.json({
    data: matches.slice(0, 8) // Return up to 8 suggestions
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
  console.log(`✅ Stable data generation - no more spinning prices!`)
})
