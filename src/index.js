function changeTime(timeNow) {
  let currentTime = new Date();

  let weekDay = document.querySelector("#Day");
  let day = currentTime.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  weekDay.innerHTML = days[day];

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  let time = document.querySelector("#tempTime");

  if (minutes < 10) {
    time.innerHTML = `${hours}:0${minutes}`;
  } else {
    time.innerHTML = `${hours}:${minutes}`;
  }
}

function updateWeather(response) {
  let temperature = document.querySelector("#temp");

  let heading = document.querySelector("#city");
  cityHeading = response.data.city;
  heading.innerHTML = `${cityHeading} |`;

  let country = document.querySelector("#country");
  country.innerHTML = response.data.country;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let speed = document.querySelector("#speed");
  speed.innerHTML = response.data.wind.speed;

  temp = Math.round(response.data.temperature.current);

  temperature.innerHTML = `${temp} °C`;

  let timeElement = document.querySelector("#tempTime");
  changeTime(timeElement);

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" id="icon">`;
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

function showForecast(day) {
  let days = ["Mon", "Tue", "Wed", "Thur"];
  let forecast = document.querySelector("#forecast");

  days.forEach(function (day) {
    forecast.innerHTML += `
  <ul class="weekday">
            <li class="dayForecast>
              <span class="day"> ${day} </span>
              <span class="symbol"> ☁️ </span>
              <p>
                <span class="predictedTemp"> 20° / </span>
                  <span class="predictedTemp right">26°<br /> </span>
                <span class="description"> Mostly Cloudy </span>
              </p>
            </li>
          </ul>
  `;
  });
}

showForecast();

city = "Nairobi";
searchTemp(city);

let searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", searchCity);
