const apiKey = "7dd2f5fe25cefd82c045bcfe988d097b";

async function getWeather() {

    let city = document.getElementById("cityInput").value.trim();
    let loading = document.getElementById("loading");

    loading.innerHTML = "⏳ Loading...";

    try {

        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        let data = await response.json();

        document.getElementById("weatherResult").style.display = "block";

        document.getElementById("cityName").innerText =
            data.name;

        document.getElementById("temperature").innerText =
            `🌡 Temperature: ${data.main.temp}°C`;

        document.getElementById("description").innerText =
            `☁ Weather: ${data.weather[0].description}`;

        document.getElementById("humidity").innerText =
            `💧 Humidity: ${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `🌬 Wind Speed: ${data.wind.speed} m/s`;

        let iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        loading.innerText = "";

    }

    catch (error) {

        loading.innerHTML = "❌ City not found";

        document.getElementById("weatherResult").style.display = "none";

    }
}

document.getElementById("cityInput")
    .addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            getWeather();
        }

    });