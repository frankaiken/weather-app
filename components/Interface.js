const Interface = {
    gridContainer: document.getElementById("weatherGrid"),
    errorBox: document.getElementById("errorMessage"),

    // This method takes the full array of pinned cities and prints them all out
    renderDashboard(citiesArray, onDeleteCallback) {
        this.errorBox.className = "error-hide";
        
        // Clear out the grid so we don't duplicate existing cards on re-render
        this.gridContainer.innerHTML = "";

        if (citiesArray.length === 0) {
            this.gridContainer.innerHTML = `<p class="empty-state">No pinned cities. Add some above!</p>`;
            return;
        }

        // Loop over every city currently stored in our app state
        citiesArray.forEach(city => {
            const card = document.createElement("div");
            card.className = "weather-card";

            // Generate card layout containing a close button 'X' and future forecast row
            card.innerHTML = `
                <button class="remove-btn" data-id="${city.id}">&times;</button>
                <h2>${city.name}</h2>
                <div class="weather-main">
                    <img src="https://openweathermap.org/img/wn/${city.current.icon}@2x.png" alt="weather icon">
                    <span class="temp-text">${Math.round(city.current.temp)}°C</span>
                    <p class="desc-text">${city.current.description}</p>
                </div>
                <div class="forecast-row">
                    ${city.forecast.map(f => `
                        <div class="mini-forecast-item">
                            <span>${f.day}</span>
                            <img src="https://openweathermap.org/img/wn/${f.icon}.png" alt="forecast icon">
                            <span>${Math.round(f.temp)}°</span>
                        </div>
                    `).join('')}
                </div>
            `;

            // Attach an event listener directly to this card's specific close button
            const closeBtn = card.querySelector(".remove-btn");
            closeBtn.addEventListener("click", () => {
                onDeleteCallback(city.id);
            });

            // Stick the completed card directly onto our live screen layout
            this.gridContainer.appendChild(card);
        });
    },

    showError(message) {
        this.errorBox.innerText = message;
        this.errorBox.className = "error-show";
    }
};