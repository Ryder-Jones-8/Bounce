# Bounce Travel App - Backend Setup Guide

## Quick Start (Recommended)

### Option 1: Simple Backend (No Dependencies)
1. Open a new terminal in VS Code (`Terminal > New Terminal`)
2. Navigate to the project root: `cd "c:\Users\ryder\OneDrive\Documents\Bounce"`
3. Start the simple backend: `node simple-server.js`
4. Open another terminal and start the frontend: `npm run dev`
5. Visit http://localhost:5173 to see the app

### Option 2: Full Backend with Amadeus API

#### Step 1: Install Backend Dependencies
```bash
cd "c:\Users\ryder\OneDrive\Documents\Bounce\server"
npm install
```

#### Step 2: Start Backend Server
```bash
npm start
```

#### Step 3: Start Frontend (in another terminal)
```bash
cd "c:\Users\ryder\OneDrive\Documents\Bounce"
npm run dev
```

## Verification Steps

### Check Backend is Running
1. Open browser and go to: http://localhost:3001/api/health
2. You should see: `{"status":"ok","message":"Backend server is running"}`

### Check Frontend is Running
1. Open browser and go to: http://localhost:5173
2. You should see the Bounce travel search interface

### Test Real Data Integration
1. Enter a city like "Paris" in the search form
2. Select dates and guests
3. Click "Search Hotels"
4. Check browser console (F12) for logs:
   - "🔍 Searching hotels via backend API..."
   - "✅ Backend returned X real hotels" (if backend works)
   - "🔄 Using fallback mock data" (if backend is down)

## Environment Variables

The app uses these environment variables (already configured in `.env`):

```env
# Frontend API URL
VITE_API_URL=http://localhost:3001/api

# Backend Amadeus API Credentials (secure)
AMADEUS_API_KEY=lDr7v7DCFAcJLwmkyRAMUoXCPHOAooGn
AMADEUS_API_SECRET=A9VJ4r14w394zmGG
```

## Troubleshooting

### If Backend Won't Start
- Check if Node.js is installed: `node --version`
- Make sure you're in the correct directory
- Try the simple server first: `node simple-server.js`

### If Frontend Shows Mock Data
- Check if backend is running on port 3001
- Check browser console for error messages
- The app gracefully falls back to mock data if backend is unavailable

### Port Conflicts
- If port 3001 is busy, edit `simple-server.js` and change `PORT = 3001` to another port
- Update `VITE_API_URL` in `.env` to match the new port

## Features Included

✅ **Frontend (React + TypeScript + Vite)**
- Dark mode with toggle
- City autocomplete search
- Date range picker
- Guest selector
- Search results with virtual scrolling
- Highlight cards for featured hotels
- Responsive design with Tailwind CSS

✅ **Backend Integration**
- Express.js proxy server
- Real Amadeus API integration for hotel search
- City autocomplete via Amadeus API
- CORS configuration for frontend
- Secure API key handling
- Graceful fallback to mock data

✅ **Real Data Sources**
- Amadeus Travel API for hotel data
- City location search
- Real hotel names, locations, and details

## Next Steps

1. **Start the app** using the commands above
2. **Test the search functionality** with real cities
3. **Check the console logs** to see real vs mock data
4. **Customize the styling** or add more features as needed

The app is now fully functional with real backend data integration!
