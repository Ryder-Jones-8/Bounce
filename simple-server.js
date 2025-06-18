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

// Mock search endpoint for testing
app.post('/api/search', (req, res) => {
  const { destination } = req.body
  
  // Simple hash function for consistent data generation
  const simpleHash = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  
  // Generate destination-specific hotel names
  const getDestinationHotels = (dest) => {
    const city = dest.split(',')[0].trim()
    
    if (city.toLowerCase().includes('paris')) {
      return [
        'Le Grand Paris Hotel',
        'Hotel des Champs-Élysées',
        'Boutique Louvre Palace',
        'The Eiffel Tower Inn',
        'Montmartre Luxury Suites'
      ]
    } else if (city.toLowerCase().includes('london')) {
      return [
        'The Royal Westminster',
        'Thames View Hotel',
        'Covent Garden Boutique',
        'Tower Bridge Lodge',
        'Hyde Park Manor'
      ]
    } else if (city.toLowerCase().includes('tokyo')) {
      return [
        'Shibuya Sky Hotel',
        'Imperial Palace Inn',
        'Ginza Luxury Suites',
        'Harajuku Modern Hotel',
        'Tokyo Bay Resort'
      ]
    } else if (city.toLowerCase().includes('new york')) {
      return [
        'Manhattan Grand Hotel',
        'Times Square Boutique',
        'Central Park View Hotel',
        'Brooklyn Bridge Inn',
        'Fifth Avenue Luxury'
      ]
    } else if (city.toLowerCase().includes('los angeles')) {
      return [
        'Hollywood Hills Hotel',
        'Beverly Hills Boutique',
        'Santa Monica Beach Resort',
        'Downtown LA Tower',
        'Sunset Strip Inn'
      ]
    } else if (city.toLowerCase().includes('miami')) {
      return [
        'South Beach Grand',
        'Art Deco Boutique Hotel',
        'Biscayne Bay Resort',
        'Ocean Drive Inn',
        'Coral Gables Luxury'
      ]
    } else {
      return [
        `${city} Grand Hotel`,
        `The ${city} Boutique`,
        `${city} Business Center`,
        `Historic ${city} Inn`,
        `${city} Luxury Resort`
      ]
    }
  }
    const hotelNames = getDestinationHotels(destination || 'Downtown')
  const mockResults = hotelNames.map((name, index) => {
    const hotelHash = simpleHash(name) // Only hash the hotel name for stability
    const basePrice = 120 + (hotelHash % 280) // Stable price between $120-$400
    const price = basePrice + (index * 20) // Add small index increment for variety
    const baseRating = 3.5 + ((hotelHash % 15) / 10) // Stable rating 3.5-5.0
    const rating = Math.round(Math.min(baseRating, 5.0) * 10) / 10
    
    return {
      id: `hotel-${hotelHash % 10000}`, // Stable ID based on name hash only
      name: name,
      price: price,
      rating: rating,
      photo: `https://images.unsplash.com/photo-${1566073771259 + (hotelHash % 50) * 1000}?w=400`,
      transit: index === 0 ? '2 min walk to Metro' : 
               index === 1 ? '5 min walk to Station' :
               index === 2 ? '3 min walk to Bus Stop' :
               `${index + 3} min to transport`,
      amenities: index === 0 ? ['WiFi', 'Pool', 'Spa', 'Restaurant'] :
                 index === 1 ? ['WiFi', 'Gym', 'Business Center'] :
                 index === 2 ? ['WiFi', 'Bar', 'Room Service'] :
                 ['WiFi', 'Pool', 'Breakfast'],
      ctaUrl: `/hotel/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`
    }
  })
  
  // Add a few more hotels with stable data
  const additionalHotels = Array.from({ length: 15 }, (_, i) => {
    const hotelName = `${destination.split(',')[0]} Hotel ${i + 6}`
    const hotelHash = simpleHash(hotelName) // Hash only the hotel name
    const basePrice = 100 + (hotelHash % 200) // Stable pricing
    const price = basePrice + (i * 15) // Add index increment
    const baseRating = 3.2 + ((hotelHash % 18) / 10) // Stable rating
    const rating = Math.round(Math.min(baseRating, 5.0) * 10) / 10
    
    return {
      id: `hotel-${(hotelHash % 10000) + 1000}`, // Stable ID
      name: hotelName,
      price: price,
      rating: rating,
      photo: `https://images.unsplash.com/photo-${1566073771259 + ((hotelHash % 50) + 5) * 1000}?w=400`,
      transit: `${i + 5} min to city center`,
      amenities: i % 3 === 0 ? ['WiFi', 'Pool', 'Gym'] : 
                 i % 3 === 1 ? ['WiFi', 'Spa', 'Restaurant'] :
                 ['WiFi', 'Business Center'],
      ctaUrl: `/hotel/hotel-${(hotelHash % 10000) + 1000}`
    }
  })
  
  const allResults = [...mockResults, ...additionalHotels]
  
  res.json({
    count: allResults.length,
    data: allResults
  })
})

// Mock cities endpoint for testing
app.get('/api/cities', (req, res) => {
  const query = req.query.q || ''
  
  // More specific city, state/country format
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
    'El Paso, TX',
    'Nashville, TN',
    'Detroit, MI',
    'Oklahoma City, OK',
    'Portland, OR',
    'Las Vegas, NV',
    'Memphis, TN',
    'Louisville, KY',
    'Baltimore, MD',
    'Milwaukee, WI',
    'Albuquerque, NM',
    'Tucson, AZ',
    'Fresno, CA',
    'Sacramento, CA',
    'Mesa, AZ',
    'Kansas City, MO',
    'Atlanta, GA',
    'Miami, FL',
    'Colorado Springs, CO',
    'Raleigh, NC',
    'Omaha, NE',
    'Long Beach, CA',
    'Virginia Beach, VA',
    'Oakland, CA',
    'Minneapolis, MN',
    'Tampa, FL',
    'Tulsa, OK',
    'Arlington, TX',
    'New Orleans, LA',
    'Wichita, KS',
    'Cleveland, OH',
    'Anaheim, CA',
    'Honolulu, HI',
    'Henderson, NV',
    'Stockton, CA',
    'Lexington, KY',
    'Corpus Christi, TX',
    'Riverside, CA',
    'Santa Ana, CA',
    'Orlando, FL',
    'Cincinnati, OH',
    'Pittsburgh, PA',
    'St. Louis, MO',
    'Greensboro, NC',
    'Plano, TX',
    'Lincoln, NE',
    'Anchorage, AK',
    'Buffalo, NY',
    'Chula Vista, CA',
    'Fort Wayne, IN',
    'Chandler, AZ',
    'St. Petersburg, FL',
    'Laredo, TX',
    'Durham, NC',
    'Irvine, CA',
    'Madison, WI',
    'Norfolk, VA',
    'Lubbock, TX',
    'Gilbert, AZ',
    'Winston-Salem, NC',
    'Glendale, AZ',
    'Reno, NV',
    'Hialeah, FL',
    'Chesapeake, VA',
    'Scottsdale, AZ',
    'North Las Vegas, NV',
    'Irving, TX',
    'Fremont, CA',
    'Baton Rouge, LA',
    'Richmond, VA',
    'Boise, ID',
    'San Bernardino, CA',
    'Birmingham, AL',
    'Spokane, WA',
    'Rochester, NY',
    'Des Moines, IA',
    'Modesto, CA',
    'Fayetteville, NC',
    'Tacoma, WA',
    'Oxnard, CA',
    'Fontana, CA',
    'Columbus, GA',
    'Montgomery, AL',
    'Moreno Valley, CA',
    'Shreveport, LA',
    'Aurora, IL',
    'Yonkers, NY',
    'Akron, OH',
    'Huntington Beach, CA',
    'Little Rock, AR',
    'Augusta, GA',
    'Amarillo, TX',
    'Glendale, CA',
    'Mobile, AL',
    'Grand Rapids, MI',
    'Salt Lake City, UT',
    'Tallahassee, FL',
    'Huntsville, AL',
    'Grand Prairie, TX',
    'Knoxville, TN',
    'Worcester, MA',
    'Newport News, VA',
    'Brownsville, TX',
    'Overland Park, KS',
    'Santa Clarita, CA',
    'Providence, RI',
    'Garden Grove, CA',
    'Chattanooga, TN',
    'Oceanside, CA',
    'Jackson, MS',
    'Fort Lauderdale, FL',
    'Santa Rosa, CA',
    'Rancho Cucamonga, CA',
    'Port St. Lucie, FL',
    'Tempe, AZ',
    'Ontario, CA',
    'Vancouver, WA',
    'Cape Coral, FL',
    'Sioux Falls, SD',
    'Springfield, MO',
    'Peoria, AZ',
    'Pembroke Pines, FL',
    'Elk Grove, CA',
    'Salem, OR',
    'Lancaster, CA',
    'Corona, CA',
    'Eugene, OR',
    'Palmdale, CA',
    'Salinas, CA',
    'Springfield, MA',
    'Pasadena, TX',
    'Fort Collins, CO',
    'Hayward, CA',
    'Pomona, CA',
    'Cary, NC',
    'Rockford, IL',
    'Alexandria, VA',
    'Escondido, CA',
    'McKinney, TX',
    'Kansas City, KS',
    'Joliet, IL',
    'Sunnyvale, CA',
    'Torrance, CA',
    'Bridgeport, CT',
    'Lakewood, CO',
    'Hollywood, FL',
    'Paterson, NJ',
    'Naperville, IL',
    'Syracuse, NY',
    'Mesquite, TX',
    'Dayton, OH',
    'Savannah, GA',
    'Clarksville, TN',
    'Orange, CA',
    'Pasadena, CA',
    'Fullerton, CA',
    'Killeen, TX',
    'Frisco, TX',
    'Hampton, VA',
    'McAllen, TX',
    'Warren, MI',
    'Bellevue, WA',
    'West Valley City, UT',
    'Columbia, MO',
    'Olathe, KS',
    'Sterling Heights, MI',
    'New Haven, CT',
    'Miramar, FL',
    'Waco, TX',
    'Thousand Oaks, CA',
    'Cedar Rapids, IA',
    'Charleston, SC',
    'Visalia, CA',
    'Topeka, KS',
    'Elizabeth, NJ',
    'Gainesville, FL',
    'Thornton, CO',
    'Roseville, CA',
    'Carrollton, TX',
    'Coral Springs, FL',
    'Stamford, CT',
    'Simi Valley, CA',
    'Concord, CA',
    'Hartford, CT',
    'Kent, WA',
    'Lafayette, LA',
    'Midland, TX',
    'Surprise, AZ',
    'Denton, TX',
    'Victorville, CA',
    'Evansville, IN',
    'Santa Clara, CA',
    'Abilene, TX',
    'Athens, GA',
    'Vallejo, CA',
    'Allentown, PA',
    'Norman, OK',
    'Beaumont, TX',
    'Independence, MO',
    'Murfreesboro, TN',
    'Ann Arbor, MI',
    'Fargo, ND',
    'Wilmington, NC',
    'Golden, CO',
    'Columbia, SC',
    'Carmel, IN',
    'Round Rock, TX',
    'Clearwater, FL',
    'Waterbury, CT',
    'Gresham, OR',
    'Fairfield, CA',
    'Billings, MT',
    'Lowell, MA',
    'San Buenaventura, CA',
    'Pueblo, CO',
    'High Point, NC',
    'West Covina, CA',
    'Richmond, CA',
    'Murrieta, CA',
    'Cambridge, MA',
    'Antioch, CA',
    'Temecula, CA',
    'Norwalk, CA',
    'Centennial, CO',
    'Everett, WA',
    'Palm Bay, FL',
    'Wichita Falls, TX',
    'Green Bay, WI',
    'Daly City, CA',
    'Burbank, CA',
    'Richardson, TX',
    'Pompano Beach, FL',
    'North Charleston, SC',
    'Broken Arrow, OK',
    'Boulder, CO',
    'West Palm Beach, FL',
    'Westminster, CO',
    'Santa Maria, CA',
    'El Monte, CA',
    'Rialto, CA',
    'Davenport, IA',
    'Odessa, TX',
    'Tuscaloosa, AL',
    'Sandy Springs, GA',
    'Lansing, MI',
    'Inglewood, CA',
    'Miami Gardens, FL',
    'Tyler, TX',
    'Hillsboro, OR',
    'Lewisville, TX',
    'Bend, OR',
    'College Station, TX',
    'Pearland, TX',
    'League City, TX',
    'Sugar Land, TX',
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
    'Warsaw, Poland',
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
    'Moscow, Russia',
    'St. Petersburg, Russia',
    'Kiev, Ukraine',
    'Bucharest, Romania',
    'Sofia, Bulgaria',
    'Zagreb, Croatia',
    'Ljubljana, Slovenia',
    'Bratislava, Slovakia',
    'Tallinn, Estonia',
    'Riga, Latvia',
    'Vilnius, Lithuania',
    'Tokyo, Japan',
    'Osaka, Japan',
    'Kyoto, Japan',
    'Hiroshima, Japan',
    'Nagoya, Japan',
    'Sapporo, Japan',
    'Fukuoka, Japan',
    'Yokohama, Japan',
    'Kobe, Japan',
    'Kawasaki, Japan',
    'Saitama, Japan',
    'Chiba, Japan',
    'Beijing, China',
    'Shanghai, China',
    'Guangzhou, China',
    'Shenzhen, China',
    'Chengdu, China',
    'Hangzhou, China',
    'Wuhan, China',
    'Xian, China',
    'Nanjing, China',
    'Tianjin, China',
    'Hong Kong, China',
    'Macau, China',
    'Seoul, South Korea',
    'Busan, South Korea',
    'Incheon, South Korea',
    'Daegu, South Korea',
    'Daejeon, South Korea',
    'Gwangju, South Korea',
    'Ulsan, South Korea',
    'Mumbai, India',
    'Delhi, India',
    'Bangalore, India',
    'Hyderabad, India',
    'Ahmedabad, India',
    'Chennai, India',
    'Kolkata, India',
    'Surat, India',
    'Pune, India',
    'Jaipur, India',
    'Lucknow, India',
    'Kanpur, India',
    'Nagpur, India',
    'Visakhapatnam, India',
    'Indore, India',
    'Thane, India',
    'Bhopal, India',
    'Patna, India',
    'Vadodara, India',
    'Ghaziabad, India',
    'Sydney, Australia',
    'Melbourne, Australia',
    'Brisbane, Australia',
    'Perth, Australia',
    'Adelaide, Australia',
    'Gold Coast, Australia',
    'Newcastle, Australia',
    'Canberra, Australia',
    'Central Coast, Australia',
    'Wollongong, Australia',
    'Logan City, Australia',
    'Geelong, Australia',
    'Hobart, Australia',
    'Townsville, Australia',
    'Cairns, Australia',
    'Toronto, Canada',
    'Montreal, Canada',
    'Vancouver, Canada',
    'Calgary, Canada',
    'Edmonton, Canada',
    'Ottawa, Canada',
    'Mississauga, Canada',
    'Winnipeg, Canada',
    'Quebec City, Canada',
    'Hamilton, Canada',
    'Brampton, Canada',
    'Surrey, Canada',
    'Laval, Canada',
    'Halifax, Canada',
    'London, Canada',
    'Markham, Canada',
    'Vaughan, Canada',
    'Gatineau, Canada',
    'Longueuil, Canada',
    'Burnaby, Canada',
    'Saskatoon, Canada',
    'Kitchener, Canada',
    'Windsor, Canada',
    'Regina, Canada',
    'Richmond, Canada',
    'Richmond Hill, Canada',
    'Oakville, Canada',
    'Burlington, Canada',
    'Greater Sudbury, Canada',
    'Sherbrooke, Canada',
    'Oshawa, Canada',
    'Saguenay, Canada',
    'Lévis, Canada',
    'Barrie, Canada',
    'Abbotsford, Canada',
    'St. Catharines, Canada',
    'Coquitlam, Canada',
    'Trois-Rivières, Canada',
    'Guelph, Canada',
    'Cambridge, Canada',
    'Whitby, Canada',
    'Kelowna, Canada',
    'Kingston, Canada',
    'Ajax, Canada',
    'Langley, Canada',
    'Saanich, Canada',
    'Milton, Canada',
    'Moncton, Canada',
    'Thunder Bay, Canada',
    'Dieppe, Canada',
    'Waterloo, Canada',
    'Delta, Canada',
    'Chatham-Kent, Canada',
    'Red Deer, Canada',
    'Kamloops, Canada',
    'Brantford, Canada',
    'Cape Breton, Canada',
    'Lethbridge, Canada',
    'Saint-Jean-sur-Richelieu, Canada',
    'Clarington, Canada',
    'Pickering, Canada',
    'Nanaimo, Canada',
    'Sudbury, Canada',
    'North Vancouver, Canada',
    'Brossard, Canada'
  ]
  
  const matches = cities.filter(city => 
    city.toLowerCase().includes(query.toLowerCase())
  )
  
  res.json({
    data: matches.slice(0, 8) // Return more suggestions
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
})
