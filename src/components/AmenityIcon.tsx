import React from 'react'

interface AmenityIconProps {
  amenity: string
  className?: string
}

const AmenityIcon: React.FC<AmenityIconProps> = ({ amenity, className = '' }) => {
  const getIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return '📶'
      case 'pool':
        return '🏊'
      case 'spa':
        return '🧖'
      case 'gym':
        return '💪'
      case 'restaurant':
        return '🍽️'
      case 'bar':
        return '🍹'
      case 'breakfast':
        return '🥐'
      case 'pet-friendly':
        return '🐕'
      case 'business center':
        return '💼'
      case 'conference room':
        return '📊'
      case 'kids club':
        return '🎮'
      case 'tennis court':
        return '🎾'
      case 'historic tours':
        return '🏛️'
      default:
        return '✨'
    }
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <span className="text-lg">{getIcon(amenity)}</span>
      <span className="text-xs text-gray-600 dark:text-gray-400">{amenity}</span>
    </div>
  )
}

export default AmenityIcon
