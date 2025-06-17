import { describe, it, expect, vi } from 'vitest'
import { debounce, formatDate, calculateDaysBetween, validateDateRange } from '../utils/helpers'

describe('Helper Functions', () => {
  describe('debounce', () => {
    it('should delay function execution', async () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('arg1')
      debouncedFn('arg2')
      debouncedFn('arg3')
      
      expect(mockFn).not.toHaveBeenCalled()
      
      await new Promise(resolve => setTimeout(resolve, 150))
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('arg3')
    })
  })

  describe('formatDate', () => {
    it('should format date string correctly', () => {
      const dateString = '2024-12-25'
      const formatted = formatDate(dateString)
      expect(formatted).toMatch(/Dec 25, 2024/)
    })
  })

  describe('calculateDaysBetween', () => {
    it('should calculate days between two dates', () => {
      const startDate = '2024-12-01'
      const endDate = '2024-12-05'
      const days = calculateDaysBetween(startDate, endDate)
      expect(days).toBe(4)
    })
  })

  describe('validateDateRange', () => {
    it('should return true for valid date range', () => {
      const result = validateDateRange('2024-12-01', '2024-12-05')
      expect(result).toBe(true)
    })

    it('should return false for invalid date range', () => {
      const result = validateDateRange('2024-12-05', '2024-12-01')
      expect(result).toBe(false)
    })

    it('should return false for empty dates', () => {
      const result = validateDateRange('', '2024-12-05')
      expect(result).toBe(false)
    })
  })
})
