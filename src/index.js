function updateWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}°C`;
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.humidity;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windSpeed}km/h`;

  let date = new Date(response.data.time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = `Last updated on ${day} at ${hours}:${minutes},`;

  let iconElement = document.querySelector("#icon");
  let iconUrl = response.data.condition.icon
    ? response.data.condition.icon
    : "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png";
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", description);
}

function searchCity(city) {
  let apiKey = "32b370fab474tf940588ea443ao8cf66";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let options = { weekday: "short" };
  return date.toLocaleDateString(undefined, options);
}

const forecastData = [
  { day: "Tue", icon: "clear-sky-day.png", temp: "18° 32°" },
  { day: "Wed", icon: "clear-sky-day.png", temp: "18° 30°" },
  { day: "Thur", icon: "clear-sky-day.png", temp: "19° 31°" },
  { day: "Fri", icon: "clear-sky-day.png", temp: "21° 33°" },
  { day: "Sat", icon: "clear-sky-day.png", temp: "10° 33°" },
];

const forecastContainer = document.querySelector(".forecast");
forecastContainer.innerHTML = forecastData
  .map(
    (forecast) => `
  <div class="forecast-day">
    <div class="forecast-date">${forecast.day}</div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecast.icon}" class="cast-icon" alt="${forecast.day} weather" />
    <div class="forecast-temperatures"><strong>${forecast.temp}</strong></div>
  </div>
`
  )
  .join("");

setInterval(() => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {});
}, 3600000);
