import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../hooks/useTheme'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('useTheme', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    document.documentElement.classList.remove('dark')
  })

  it('should default to dark mode', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useTheme())
    
    expect(result.current.isDark).toBe(true)
  })

  it('should toggle theme', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(result.current.isDark).toBe(false)
  })

  it('should save theme preference to localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null)
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })
})
