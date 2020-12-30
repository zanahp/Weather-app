function dateToday(date) {
  let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturtday"
  ];
  let weekday = weekdays[date.getDay()];

  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[date.getMonth()];

  let day = date.getDate();
  
  return `${weekday}, ${month} ${day}`;
}
let today = new Date();
let li = document.querySelector(".date");

li.innerHTML = dateToday(today);

function searchCity(city) {
  let units = "imperial";
  let apiKey = "07d32b05fee3c33694b8ea90b20b7681";
  let apiStarter = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiStarter}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(locationTemp);
 
}
function handleSubmit(event) {
  event.preventDefault();
  let citySelection = document.querySelector(".selection");
  let yourCity = document.querySelector(".city");
  yourCity.innerHTML = `${citySelection.value}`;
  searchCity(citySelection.value);
}
let selection = document.querySelector("#search-form");
selection.addEventListener("submit", handleSubmit);

function locationTemp(response) {
  tempF = Math.round(response.data.main.temp);
  let degrees = document.querySelector(".currentTemp");
  degrees.innerHTML = `${tempF}°`;

  let high = Math.round(response.data.main.temp_max);
  let max = document.querySelector(".highToday");
  max.innerHTML = `${high}°`;  

  let low = Math.round(response.data.main.temp_min);
  let min = document.querySelector(".lowToday");
  min.innerHTML = `${low}°`;
}
function fahrenheitTemp(event) {
  event.preventDefault();
  let degrees = document.querySelector(".currentTemp");
  degrees.innerHTML = `${tempF}°`;
}
function celsiusTemp(event) {
  event.preventDefault();
  let degrees = document.querySelector(".currentTemp");
  let tempC = (tempF - 32) * 5 / 9;
  degrees.innerHTML = `${Math.round(tempC)}°`;
}
let tempF = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", celsiusTemp);

searchCity("Miami");