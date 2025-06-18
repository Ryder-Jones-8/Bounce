import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ResultsPage = lazy(() => import('./pages/ResultsPage'))
const HotelDetailPage = lazy(() => import('./pages/HotelDetailPage'))

const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? '🌞' : '🌚'}
        </button>        {/* Routes */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/hotel/:hotelId" element={<HotelDetailPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
