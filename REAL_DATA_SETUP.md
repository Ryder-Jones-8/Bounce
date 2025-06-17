# 🌐 Real Data Integration Guide

Your Bounce app is now set up to use real travel data! Here's how to get it working with live APIs.

## 🚀 Quick Setup (5 minutes)

### 1. Get Free Amadeus API Access

1. **Sign up**: Go to [developers.amadeus.com](https://developers.amadeus.com/)
2. **Create account**: Use your email to register
3. **Create app**: 
   - Name: "Bounce Travel App"
   - Description: "Travel search application"
4. **Get credentials**: Copy your API Key and API Secret

### 2. Configure Environment Variables

1. **Create .env file** in your project root:
   ```bash
   cp .env.example .env
   ```

2. **Add your credentials** to `.env`:
   ```env
   VITE_AMADEUS_API_KEY=your_actual_api_key_here
   VITE_AMADEUS_API_SECRET=your_actual_api_secret_here
   ```

3. **Restart your dev server**:
   ```bash
   npm run dev
   ```

## ✨ What You Get With Real Data

### 🏨 **Hotel Search**
- Real hotel listings from Amadeus
- Actual hotel names and locations
- Global coverage (200+ countries)

### 🌍 **City Autocomplete** 
- Real city names and countries
- IATA airport codes
- Intelligent search suggestions

### 🔄 **Smart Fallback**
- If API fails → automatically uses mock data
- No broken experience for users
- Perfect for development and demos

## 🛠️ Alternative APIs

### **Booking.com Partner Network**
- Most comprehensive hotel data
- Requires partnership approval
- Best pricing and availability

### **Hotels.com API**
- Good global coverage
- Competitive rates
- Easy integration

### **TripAdvisor API**
- Rich review data
- Photos and ratings
- Popular destinations

## 🔧 Advanced Integration

### **Add Pricing Data**
To get real pricing, you'll need hotel booking APIs:

```typescript
// Example: Add to searchAmadeusHotels function
const pricingResponse = await amadeusApi.get('/shopping/hotel-offers', {
  headers: { Authorization: `Bearer ${token}` },
  params: {
    hotelIds: hotel.hotelId,
    checkInDate: criteria.startDate,
    checkOutDate: criteria.endDate,
    adults: criteria.guests
  }
})
```

### **Add Photos**
Integrate with hotel photo APIs:

```typescript
// Use hotel image services
const photoUrl = `https://photos.hotelbeds.com/giata/bigger/${hotel.giataId}.jpg`
```

### **Add Reviews**
Integrate TripAdvisor or Google Places:

```typescript
const reviews = await getTripAdvisorReviews(hotel.name)
```

## 📊 API Rate Limits

### **Amadeus Free Tier**
- 🆓 Free forever
- 1,000 API calls/month
- Perfect for development and small apps

### **Production Scaling**
- Paid plans available
- Higher rate limits
- SLA guarantees

## 🐛 Troubleshooting

### **Common Issues**

1. **CORS Errors**: Use a proxy or backend API
2. **Rate Limits**: Implement caching and request throttling
3. **API Keys**: Make sure they're in `.env` not source code

### **Debug Mode**
Check browser console for API response logs and error messages.

## 🎯 Next Steps

1. ✅ Set up Amadeus API (5 min)
2. ✅ Test with real searches  
3. 🔄 Add hotel booking integration
4. 📸 Integrate real hotel photos
5. ⭐ Add review data
6. 💰 Implement real pricing

Your app will automatically use real data once configured, with smooth fallback to mock data during development!
