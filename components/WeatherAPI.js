const WeatherAPI = {
    apiKey: "5fcf66d53aaebe728ca29ac8a8c360be", 
    baseUrl: "https://api.openweathermap.org/data/2.5/forecast",

    async fetchWeather(cityName) {
        const url = `${this.baseUrl}?q=${cityName}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or API limits reached.");
        }

        const data = await response.json();
        const currentWeather = data.list[0];

        return {
            name: data.city.name,
            sys: { country: data.city.country },
            main: {
                temp: currentWeather.main.temp,
                humidity: currentWeather.main.humidity
            },
            weather: [{ 
                description: currentWeather.weather[0].description,
                icon: currentWeather.weather[0].icon // Grab current icon code
            }],
            wind: { speed: currentWeather.wind.speed },
            
            // Pass the whole raw forecast list forward so the Interface can filter future days
            fullList: data.list 
        };
    }
};