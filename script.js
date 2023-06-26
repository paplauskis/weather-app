const locationDiv = document.querySelector('.location');
const timeDiv = document.querySelector('.time');
const currentDayDiv = document.querySelector('.current-day');
const weatherDescriptionDiv = document.querySelector('.weather-description');
const temperatureDiv = document.querySelector('.temperature');
const feelsLikeDiv = document.querySelector('.feels-like');
const windDiv = document.querySelector('.wind');
const windDirectionDiv = document.querySelector('.wind-direction');
const humidityDiv = document.querySelector('.humidity');
const locationInput = document.querySelector('#location-input');
const searchLocation = document.querySelector('.search-icon');
searchLocation.addEventListener('click', () =>
  getWeatherData(locationInput.value)
);

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=19cc7f00cfe947b68e0134240232106&q=${city}`,
      { mode: 'cors' }
    );
    const weatherData = await response.json();
    displayWeatherData(weatherData);
  } catch (error) {
    console.log(error);
  }
}

function displayWeatherData(data) {
  locationDiv.textContent = `${data.location.name}, ${data.location.country}`;
  timeDiv.textContent = `${data.location.localtime.substring(11)}`;
  currentDayDiv.textContent = checkDayOfWeek(data);
  weatherDescriptionDiv.textContent = data.current.condition.text;
  temperatureDiv.textContent = `${data.current.temp_c}°C`;
  feelsLikeDiv.textContent = `${data.current.feelslike_c}°C`;
  windDiv.textContent = `${data.current.wind_kph}kph`;
  windDirectionDiv.textContent = data.current.wind_dir;
  humidityDiv.textContent = `${data.current.humidity}%`;
}

function checkDayOfWeek(data) {
  if (data.current.is_day === 1) return 'Monday';
  else if (data.current.is_day === 2) return 'Tuesday';
  else if (data.current.is_day === 3) return 'Wednesday';
  else if (data.current.is_day === 4) return 'Thursday';
  else if (data.current.is_day === 5) return 'Friday';
  else if (data.current.is_day === 6) return 'Saturday';
  else return 'Sunday';
}

getWeatherData('london');
