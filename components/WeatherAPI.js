const WeatherAPI = {
    // PASTE YOUR ACTUAL KEY INSIDE THESE QUOTES:
    apiKey: "5fcf66d53aaebe728ca29ac8a8c360be", 
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",

    // An async function always returns a Promise (a guarantee of future data)
    async fetchWeather(cityName) {
        // units=metric gives us Celsius. Change to units=imperial for Fahrenheit
        const url = `${this.baseUrl}?q=${cityName}&appid=${this.apiKey}&units=metric`;

        // The await keyword stops execution here until the network request finishes
        const response = await fetch(url);

        // If the server returns a 404 (City not found) or other error
        if (!response.ok) {
            throw new Error("City not found. Please check the spelling!");
        }

        // Parse the raw incoming stream of text into a clean JavaScript object
        const data = await response.json();
        return data;
    }
};