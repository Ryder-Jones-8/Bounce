# 🚀 Backend Setup Instructions

## Quick Start (2 minutes)

### 1. Install Backend Dependencies
```bash
cd server
npm install
```

### 2. Start Backend Server
```bash
npm run dev
```

### 3. Start Frontend (in another terminal)
```bash
cd ..
npm run dev
```

### 4. Test the Integration
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api
- Health check: http://localhost:3001/health

## ✅ What You Get

### 🎯 **Real Amadeus Hotel Data**
- ✅ Actual hotel names from Amadeus API
- ✅ Real locations and addresses  
- ✅ Global coverage (20+ major cities)
- ✅ Professional API integration

### 🌍 **Live City Autocomplete**
- ✅ Real city suggestions from Amadeus
- ✅ Country information included
- ✅ Smart fallback to local data

### 🛡️ **Production Ready**
- ✅ Secure API key handling (backend only)
- ✅ CORS properly configured
- ✅ Error handling and fallbacks
- ✅ Rate limiting and caching

## 🏗️ Backend Architecture

```
server/
├── src/
│   ├── server.js          # Main Express server
│   └── routes/
│       └── travel.js      # Travel API endpoints
├── package.json           # Backend dependencies
└── README.md             # This file
```

## 📋 Available Endpoints

### POST `/api/search`
Search for hotels
```json
{
  "destination": "Paris, France",
  "startDate": "2024-12-15", 
  "endDate": "2024-12-20",
  "guests": 2
}
```

### GET `/api/cities?q=paris`
Get city autocomplete suggestions

### GET `/health`
Backend health check

## 🔧 Environment Variables

The backend automatically reads from your `.env` file:
- `VITE_AMADEUS_API_KEY` - Your Amadeus API key
- `VITE_AMADEUS_API_SECRET` - Your Amadeus API secret

## 🚨 Troubleshooting

### Backend Not Starting?
1. Make sure you're in the `server` directory
2. Run `npm install` first
3. Check if port 3001 is available

### No Real Data?
1. Check backend console for Amadeus API errors
2. Verify your API credentials in `.env`
3. Backend will automatically fall back to mock data

### CORS Issues?
The backend is configured to accept requests from:
- http://localhost:5173 (Vite dev server)
- http://127.0.0.1:5173 (alternative localhost)

## 📊 Supported Cities

Currently supports real data for:
- Paris, France
- London, United Kingdom  
- New York, United States
- Tokyo, Japan
- Rome, Italy
- Barcelona, Spain
- Amsterdam, Netherlands
- Berlin, Germany
- And 15+ more major cities!

## 🎉 Success Indicators

When working correctly, you should see:

**Backend Console:**
```
🚀 Bounce API Server running on http://localhost:3001
🔑 Getting new Amadeus token...
✅ Got Amadeus token successfully
📍 Searching hotels near Paris (48.8566, 2.3522)
✅ Found 25 hotels from Amadeus
```

**Frontend Console:**
```
🔍 Searching hotels via backend API...
✅ Backend returned 25 real hotels
```

**In Your App:**
- Real hotel names (not "Luxury Downtown Hotel")
- Actual addresses and locations
- Professional looking results

Your travel app now has enterprise-grade backend integration! 🎯
