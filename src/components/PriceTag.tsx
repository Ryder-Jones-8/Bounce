import React from 'react'

interface PriceTagProps {
  price: number
  className?: string
}

const PriceTag: React.FC<PriceTagProps> = ({ price, className = '' }) => {
  return (
    <div className={`${className}`}>
      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
        ${price}
      </span>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
        /night
      </span>
    </div>
  )
}

export default PriceTag
