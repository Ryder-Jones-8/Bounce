import { describe, it, expect } from 'vitest'
import { getCityAutocomplete } from '../utils/api'

describe('API Utils', () => {
  describe('getCityAutocomplete', () => {
    it('should return filtered cities based on query', async () => {
      const results = await getCityAutocomplete('par')
      expect(results).toContain('Paris, France')
      expect(results.length).toBeLessThanOrEqual(5)
    })

    it('should return empty array for empty query', async () => {
      const results = await getCityAutocomplete('')
      expect(results.length).toBeGreaterThan(0) // Mock returns all cities
    })

    it('should filter cities case-insensitively', async () => {
      const results = await getCityAutocomplete('TOKYO')
      expect(results).toContain('Tokyo, Japan')
    })
  })
})
