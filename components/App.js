const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function handleSearch() {
    const city = cityInput.value.trim();

    // Guard clause: don't look up an empty string
    if (!city) {
        Interface.showError("Please enter a city name first!");
        return;
    }

    try {
        // Call our API module and wait for the object
        const weatherData = await WeatherAPI.fetchWeather(city);
        
        // Pass the result to our interface renderer
        Interface.renderWeather(weatherData);
    } catch (error) {
        // Catch any network errors or 404s thrown by WeatherAPI
        Interface.showError(error.message);
    }
}

// Trigger search when clicking the button
searchBtn.addEventListener("click", handleSearch);

// Also trigger search if they hit the "Enter" key inside the input bar
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});