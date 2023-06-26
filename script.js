const locationDiv = document.querySelector('.location');
const locationInput = document.querySelector('#location-input')
const searchLocation = document.querySelector('.search-icon')
searchLocation.addEventListener('click', () => getWeatherData(locationInput.value))

async function getWeatherData(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=19cc7f00cfe947b68e0134240232106&q=${city}`, { mode: 'cors' })
    const weatherData = await response.json();
    locationDiv.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;
    // console.log(weatherData)
    // console.log(weatherData.location.name,'|' ,weatherData.location.country, '|',weatherData.current.temp_c, '|',weatherData.current.wind_kph, '|',
    // weatherData.current.wind_dir, '|', weatherData.current.feelslike_c, '|', weatherData.current.condition.text, '|',weatherData.current.is_day,
    // '|', weatherData.current.humidity, '|', weatherData.location.localtime)

  } catch (error) {
    console.log(error)
  }
}

getWeatherData('london')