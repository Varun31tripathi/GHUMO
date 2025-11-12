// Weather API Integration for TripPlanner
class WeatherAPI {
    constructor() {
        this.baseUrl = 'https://wttr.in';
    }

    async getWeather(cityName, countryCode = 'IN') {
        try {
            const response = await fetch(
                `${this.baseUrl}/${cityName}?format=j1`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const current = data.current_condition[0];
            
            return {
                temperature: Math.round(current.temp_C),
                description: current.weatherDesc[0].value.toLowerCase(),
                icon: '01d',
                humidity: current.humidity,
                windSpeed: Math.round(current.windspeedKmph * 0.278),
                pressure: current.pressure,
                feelsLike: Math.round(current.FeelsLikeC)
            };
        } catch (error) {
            console.error('Weather API Error:', error);
            return null;
        }
    }

    getBestTimeToVisit(weatherData) {
        if (!weatherData) return 'Weather data unavailable';
        
        const temp = weatherData.temperature;
        const humidity = weatherData.humidity;
        
        if (temp >= 20 && temp <= 30 && humidity < 70) {
            return 'Excellent time to visit! Perfect weather conditions.';
        } else if (temp >= 15 && temp <= 35 && humidity < 80) {
            return 'Good time to visit. Pleasant weather expected.';
        } else if (temp < 10 || temp > 40) {
            return 'Consider visiting during milder months.';
        } else if (humidity > 85) {
            return 'High humidity. Consider visiting during drier months.';
        } else {
            return 'Fair weather conditions for visiting.';
        }
    }

    renderWeatherWidget(weatherData, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!weatherData) {
            container.innerHTML = '<div class="text-gray-500">Weather data unavailable</div>';
            return;
        }

        container.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <img src="https://openweathermap.org/img/w/${weatherData.icon}.png" 
                         alt="${weatherData.description}" 
                         class="w-12 h-12">
                    <div class="ml-3">
                        <div class="text-2xl font-bold text-orange-600">${weatherData.temperature}°C</div>
                        <div class="text-sm text-gray-600 capitalize">${weatherData.description}</div>
                        <div class="text-xs text-gray-500">Feels like ${weatherData.feelsLike}°C</div>
                    </div>
                </div>
                <div class="text-right text-sm text-gray-600">
                    <div>Humidity: ${weatherData.humidity}%</div>
                    <div>Wind: ${weatherData.windSpeed} m/s</div>
                </div>
            </div>
        `;
    }
}

// Initialize weather API
const weatherAPI = new WeatherAPI();

// Global function to fetch and display weather
window.fetchWeather = async function(cityName) {
    const weatherData = await weatherAPI.getWeather(cityName);
    weatherAPI.renderWeatherWidget(weatherData, `weatherInfo-${cityName}`);
};

// Global function to get best time to visit
window.getBestTimeToVisit = async function(cityName) {
    const weatherData = await weatherAPI.getWeather(cityName);
    return weatherAPI.getBestTimeToVisit(weatherData);
};