function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searchBar");

  let heading = document.querySelector("h1");
  heading.innerHTML = city.value;
}

let searchButton = document.querySelector("#searchBtn");
searchButton.addEventListener("click", searchCity);
