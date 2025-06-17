import React from 'react'

interface HighlightCardProps {
  label: string
  photo: string
  name: string
  price: number
  transit: string
  ctaUrl: string
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  label,
  photo,
  name,
  price,
  transit,
  ctaUrl,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Label Badge */}
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            ${price}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              /night
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{transit}</span>
        </div>

        <a
          href={ctaUrl}
          className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-md transition-colors duration-200 font-medium"
        >
          View Details
        </a>
      </div>
    </div>
  )
}

export default HighlightCard
