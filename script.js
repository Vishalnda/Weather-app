window.addEventListener('DOMContentLoaded', () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log("MetaMask detected but not used in this project.");
  }
});

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    document.getElementById('result').innerHTML = `<p class='text-danger'>Please enter a city name.</p>`;
    return;
  }

  const apiKey = 'ed50589d785c4eee53698415034739b2'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const result = `
        <h4>${data.name}, ${data.sys.country}</h4>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>☁️ Description: ${data.weather[0].description}</p>
      `;
      document.getElementById('result').innerHTML = result;
    })
    .catch(error => {
      document.getElementById('result').innerHTML = `<p class='text-danger'>${error.message}</p>`;
    });
}
