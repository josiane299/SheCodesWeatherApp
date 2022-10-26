let now = new Date();
let p = document.querySelector(`#formateDate`);
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

console.log(now);
p.innerHTML = `${day} ${month} ${date}, ${year}, ${hours}:${minutes}`;

//Week 5 HomeWork

function showTemp(response) {
  console.log({ response });
  let temperature = Math.round(response.data.main.temp);
  console.log({ temperature });
  document.querySelector(`#temperature`).innerHTML = temperature;
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
}

function searchEngine(cities) {
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&
appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector(`#city-names`).value;
  searchEngine(city);
  let p = document.querySelector(`#name`);
  p.innerHTML = `${city}`;
}

let searchForm = document.querySelector(`#search-form`);
searchForm.addEventListener(`submit`, search);
//current-location

function locateTemperature(position) {
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateTemperature);
}

let getCurrentButton = document.querySelector(`#current-location`);
getCurrentButton.addEventListener(`click`, getCurrentLocation);

searchEngine("Yeadon");
