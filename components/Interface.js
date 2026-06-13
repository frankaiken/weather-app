const Interface = {
    // Grab all our HTML elements
    displayCard: document.getElementById("weatherDisplay"),
    cityName: document.getElementById("cityName"),
    temp: document.getElementById("temperature"),
    desc: document.getElementById("description"),
    humidity: document.getElementById("humidity"),
    wind: document.getElementById("wind"),
    errorBox: document.getElementById("errorMessage"),

    renderWeather(data) {
        // Hide any previous errors and show the weather card
        this.errorBox.className = "error-hide";
        this.displayCard.classList.remove("hidden");

        // Inject the live data into the DOM
        this.cityName.innerText = `${data.name}, ${data.sys.country}`;
        this.temp.innerText = `${Math.round(data.main.temp)}°C`;
        this.desc.innerText = data.weather[0].description;
        this.humidity.innerText = `${data.main.humidity}%`;
        this.wind.innerText = `${data.wind.speed} m/s`;
    },

    showError(message) {
        // Hide the old data card and show a styled error alert
        this.displayCard.classList.add("hidden");
        this.errorBox.innerText = message;
        this.errorBox.className = "error-show";
    }
};