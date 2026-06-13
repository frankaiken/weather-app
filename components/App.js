const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// This is our master dashboard array state
let pinnedCities = [];

async function handleSearch() {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    // Check if we already pinned this city to avoid duplicate tiles
    const isDuplicate = pinnedCities.some(
        city => city.name.toLowerCase().split(',')[0].trim() === cityName.toLowerCase()
    );
    if (isDuplicate) {
        Interface.showError("That city is already pinned to your dashboard!");
        return;
    }

    try {
        // Fetch raw multi-day payload from our existing API module
        const data = await WeatherAPI.fetchWeather(cityName);
        
        // Filter out unique upcoming forecast days at noon (indices 8, 16, 24 roughly capture next 3 days)
        const dailyForecasts = data.fullList.filter((item, idx) => idx > 0 && item.dt_txt.includes("12:00:00")).slice(0, 3);
        const mappedForecast = dailyForecasts.map(item => {
            return {
                day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
                temp: item.main.temp,
                icon: item.weather[0].icon
            };
        });

        // Structure a custom, clean data object for this city card
        const newCity = {
            id: Date.now().toString(), // Generate a unique timestamp ID string
            name: `${data.name}, ${data.sys.country}`,
            current: {
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon
            },
            forecast: mappedForecast
        };

        // Add the city object to our state array and reset input bar
        pinnedCities.push(newCity);
        cityInput.value = "";

        // Push state update to layout renderer, providing our deletion handler logic below
        Interface.renderDashboard(pinnedCities, removeCity);

    } catch (error) {
        Interface.showError(error.message);
    }
}

// Deletion callback handler: filters out the clicked ID and updates display
function removeCity(cityId) {
    pinnedCities = pinnedCities.filter(city => city.id !== cityId);
    Interface.renderDashboard(pinnedCities, removeCity);
}

// Bind Actions
searchBtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleSearch(); });

// Initial structural render to show "empty state" placeholder text right away
Interface.renderDashboard(pinnedCities, removeCity);