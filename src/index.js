function changeTime() {
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

function updateDay(unixTime) {
  let day = new Date(unixTime * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day.getDay()];
}

function updateWeather(response) {
  let temperature = document.querySelector("#temp");

  let heading = document.querySelector("#city");
  let cityHeading = response.data.city;
  heading.innerHTML = `${cityHeading} |`;

  let country = document.querySelector("#country");
  country.innerHTML = response.data.country;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let speed = document.querySelector("#speed");
  speed.innerHTML = response.data.wind.speed;

  let temp = Math.round(response.data.temperature.current);

  temperature.innerHTML = `${temp} °C`;

  changeTime();

  let icon = document.querySelector(".icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" id="icon">`;

  getForecast(response.data.city);
}

function searchTemp(cityValue) {
  let apiKey = "fa483db98dc0o4b7fc5fdbea841a31ta";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}`;

  axios.get(apiUrl).then(updateWeather);
}

function getForecast(city) {
  let apiKey = "fa483db98dc0o4b7fc5fdbea841a31ta";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(showForecast);
}

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#searchBar");

  searchTemp(cityElement.value);
}

function showForecast(response) {
  let forecast = document.querySelector("#forecast");

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast.innerHTML += `
              <ul class="weekday">
                <li class="dayForecast">
                  <span class="day"> ${updateDay(day.time)} </span>
                  <img src="${day.condition.icon_url}" class="symbol">
                  <p>
                    <span class="predictedTemp"> ${Math.round(
                      day.temperature.maximum
                    )}° / </span>
                    <span class="predictedTemp right">${Math.round(
                      day.temperature.minimum
                    )}°<br /> </span>
                    <span class="description"> ${
                      day.condition.description
                    } </span>
                  </p>
                </li>
              </ul>
            `;
    }
  });
  
}

let city = "Nairobi";
searchTemp(city);

let searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", searchCity);
