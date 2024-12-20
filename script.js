const apiKey = '3be53ea06057413d2c7c3c9a29db4e07'; // Replace with your OpenWeatherMap API key

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
        return;
      }

      const { name } = data;
      const { temp, humidity } = data.main;
      const { description } = data.weather[0];

      document.getElementById('weatherResult').innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Weather: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('weatherResult').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    });
});
