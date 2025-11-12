# TripPlanner - Secure Deployment Guide

## API Key Security

### Before Deployment:

1. **Replace API Keys:**
   - Get your own Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Replace `YOUR_GOOGLE_MAPS_API_KEY` in `index.html` with your actual key

2. **Environment Variables:**
   - Set `GOOGLE_MAPS_API_KEY` environment variable on your hosting platform
   - Never commit actual API keys to version control

3. **Weather API:**
   - Currently uses free wttr.in API (no key required)
   - No security concerns for weather functionality

### Deployment Steps:

1. Clone repository
2. Set environment variables on hosting platform
3. Update API key placeholder in code
4. Deploy to your hosting service

### Security Best Practices:

- API keys are excluded from git via `.gitignore`
- Use environment variables for production
- Restrict API key usage to your domain
- Monitor API usage regularly