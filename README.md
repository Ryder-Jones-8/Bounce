# Bounce - Travel Search Web App

A modern, responsive travel search application built with React, TypeScript, and Vite. Find and explore accommodations with an intuitive interface featuring dark mode, city autocomplete, and smart search results.

## Features

- 🏠 **Smart Search**: City autocomplete, date range picker, and guest selector
- 🌙 **Dark Mode**: Toggle between light and dark themes with persistent preference
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and builds
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🎯 **Highlight Cards**: Featured results for best value, easy transit, and full service
- 📋 **Virtual Scrolling**: Efficient rendering of large result lists
- 🧪 **Type Safe**: Full TypeScript support with strict type checking
- ✅ **Tested**: Unit tests with Vitest and Testing Library

## Tech Stack

- **Frontend**: React 18, TypeScript, React Router DOM
- **Styling**: Tailwind CSS with dark mode support
- **Build Tool**: Vite
- **Testing**: Vitest, Testing Library
- **State Management**: React Context API
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── HighlightCard.tsx
│   ├── RatingBadge.tsx
│   ├── AmenityIcon.tsx
│   ├── PriceTag.tsx
│   └── LoadingSpinner.tsx
├── context/             # React Context for state management
│   └── SearchContext.tsx
├── hooks/               # Custom React hooks
│   └── useTheme.ts
├── pages/               # Page components
│   ├── HomePage.tsx
│   └── ResultsPage.tsx
├── test/                # Test files
│   ├── setup.ts
│   ├── api.test.ts
│   └── useTheme.test.ts
├── utils/               # Utility functions
│   └── api.ts
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bounce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## Features in Detail

### Search Functionality
- **City Autocomplete**: Type-ahead search with debounced API calls
- **Date Range Picker**: Intuitive date selection with validation
- **Guest Selector**: Easy increment/decrement controls

### Results Display
- **Highlight Cards**: Three featured properties (best value, easy transit, full service)
- **Virtual Scrolling**: Efficiently renders large lists of results
- **Loading States**: Skeleton screens while fetching data
- **Error Handling**: Graceful error states with retry options

### Theme System
- **Dark Mode Default**: Starts in dark mode for better UX
- **Theme Toggle**: Switch between light/dark with 🌞/🌚 button
- **Persistent Preference**: Remembers theme choice in localStorage
- **System Preference**: Respects OS theme preference

### Performance
- **Code Splitting**: Lazy-loaded routes with React.Suspense
- **ESM Imports**: Modern import syntax throughout
- **Optimized Images**: Lazy loading with proper alt text
- **Virtual Scrolling**: Handles thousands of results efficiently

## API Integration

The app includes a mock API layer that simulates real accommodation data. To integrate with a real API:

1. Update `VITE_API_URL` in your `.env` file
2. Modify the `searchApi` function in `src/utils/api.ts`
3. Update type definitions in `src/context/SearchContext.tsx`

## Testing

Run the test suite:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage

# Run tests with UI
npm run test:ui
```

## Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Images from [Unsplash](https://unsplash.com/)
#   B o u n c e 
 
 