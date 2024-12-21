const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your valid API key

document.getElementById('getWeather').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  const loadingIndicator = document.getElementById('loading');
  const weatherResult = document.getElementById('weatherResult');

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  loadingIndicator.classList.remove('d-none');
  weatherResult.innerHTML = '';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { temp, humidity } = data.main;
      const { description, icon } = data.weather[0];

      weatherResult.innerHTML = `
        <h2 class="mb-3">${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="mb-3">
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Weather:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
      `;
    })
    .catch(error => {
      console.error('Error:', error);
      weatherResult.innerHTML = `<p class="text-danger">City not found or an error occurred.</p>`;
    })
    .finally(() => {
      loadingIndicator.classList.add('d-none');
    });
});

// Theme Toggle
document.getElementById('themeButton').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
