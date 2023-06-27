const cityDiv = document.querySelector('.city');
const countryDiv = document.querySelector('.country');
const dateDiv = document.querySelector('.date');
const temperatureDiv = document.querySelector('.temp-div');
const weatherDescriptionDiv = document.querySelector('.weather-description');
const feelsLikeDiv = document.querySelector('.feels-like-div');
const windSpeedDiv = document.querySelector('.wind-speed');
const windDirectionDiv = document.querySelector('.wind-direction');
const visibilityDiv = document.querySelector('.visibility-number');
const visibilityDescription = document.querySelector('.visibility-description');
const humidityDiv = document.querySelector('.humidity-number');
const humidityDescriptionDiv = document.querySelector('.humidity-description');
const precipitationDiv = document.querySelector('.precipitation-mm');
const uvNumberDiv = document.querySelector('.uv-number');
const uvDescriptionDiv = document.querySelector('.uv-description');
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
    console.log(weatherData);
    displayWeatherData(weatherData);
  } catch (error) {
    console.log(error);
  }
}

function displayWeatherData(data) {
  cityDiv.textContent = `${data.location.name}`.toUpperCase();
  countryDiv.textContent = `${data.location.country}`;
  dateDiv.textContent = `${checkDayOfWeek()} ${data.location.localtime.substring(11)}`;
  temperatureDiv.textContent = `${data.current.temp_c}°C`;
  weatherDescriptionDiv.textContent = data.current.condition.text;
  feelsLikeDiv.textContent = `Feels like ${data.current.feelslike_c}°C`;
  windSpeedDiv.textContent = `${data.current.wind_kph} km/h`;
  windDirectionDiv.textContent = `${getWindDirection(data)}`;
  visibilityDiv.textContent = `${data.current.vis_km} km`;
  visibilityDescription.textContent = `It is ${getVisibilityDescription(data)} right now`;
  humidityDiv.textContent = `${data.current.humidity}%`;
  humidityDescriptionDiv.textContent = `${getHumidityDescription(data)}`;
  precipitationDiv.textContent = `${data.current.precip_mm} mm`;
  uvNumberDiv.textContent = `${data.current.uv}`;
  uvDescriptionDiv.textContent = getUvDescription(data);
}

function getUvDescription(data) {
  if (data.current.uv <= 2) return 'Low';
  else if (data.current.uv <= 5) return 'Moderate';
  else if (data.current.uv <= 7) return 'High';
  else if (data.current.uv <= 10) return 'Very high';
  else return 'Extreme';
}

function getHumidityDescription(data) {
  if (data.current.humidity < 31) return 'Relatively dry';
  else if (data.current.humidity < 61) return 'Normal';
  else return 'Too humid';
}

function getVisibilityDescription(data) {
  if (data.current.vis_km < 2) return 'foggy';
  else if (data.current.vis_km < 10) return 'nearly clear';
  else if (data.current.vis_km < 20) return 'clear';
  else return 'very clear';
}

function getWindDirection(data) {
  if (25 <= data.current.wind_degree <= 65) return 'North East';
  else if (65 < data.current.wind_degree < 115) return 'East';
  else if (115 <= data.current.wind_degree <= 155) return 'South East';
  else if (155 < data.current.wind_degree < 205) return 'South';
  else if (205 <= data.current.wind_degree <= 245) return 'South West';
  else if (245 < data.current.wind_degree < 295) return 'West';
  else if (295 <= data.current.wind_degree <= 335) return 'North West';
  else return 'North';
}

function checkDayOfWeek() {
  const dayOfWeekName = new Date().toLocaleString('default', {
    weekday: 'long',
  });
  return dayOfWeekName;
}

getWeatherData('london');
