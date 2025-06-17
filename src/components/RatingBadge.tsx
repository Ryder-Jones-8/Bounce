import React from 'react'

interface RatingBadgeProps {
  rating: number
  className?: string
}

const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-yellow-400 mr-1">⭐</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default RatingBadge
