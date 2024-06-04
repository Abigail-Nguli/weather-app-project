function updateWeather(response) {
  let temperature = document.querySelector("#temp");

  let heading = document.querySelector("#city");
  cityHeading = response.data.city
  heading.innerHTML = `${cityHeading} |`;

  let country = document.querySelector("#country");
  country.innerHTML = response.data.country;

  temp = Math.round(response.data.temperature.current)

  temperature.innerHTML = `${temp} °C`;
}

function searchTemp(cityValue) {
  let apiKey = "fa483db98dc0o4b7fc5fdbea841a31ta";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar");

  searchTemp(city.value);
}

let searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", searchCity);
