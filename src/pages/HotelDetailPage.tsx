import React from 'react'
import { useParams, Link } from 'react-router-dom'

const HotelDetailPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/results"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Results
        </Link>

        {/* Hotel Detail */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Hotel Image */}
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                alt="Hotel"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Hotel Info */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Hotel Details
              </h1>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Hotel ID: {hotelId}
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-900 dark:text-white font-semibold">4.8 Rating</span>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">5 min walk to Metro Station</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant'].map((amenity) => (
                    <span
                      key={amenity}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      $299
                      <span className="text-lg font-normal text-gray-600 dark:text-gray-400">/night</span>
                    </span>
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-semibold transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              About This Hotel
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This is a placeholder hotel detail page. In a real application, this would show 
              detailed information about the specific hotel, including photos, amenities, 
              reviews, availability, and booking options.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Location & Transport
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Conveniently located in the heart of the city with easy access to public 
              transportation, major attractions, and business districts. Perfect for both 
              leisure and business travelers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetailPage
