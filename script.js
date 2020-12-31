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

function conversion(dt) {
  let day = new Date(dt * 1000);
  let hour = day.getUTCHours();
    hour = (hour % 12) || 12;
    if (hour < 10) {
      hour = `0${hour}`;
    } else { hour = hour; 
    }
  let minutes = day.getUTCMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    } else {minutes = minutes;
    }
  let time = `${hour};${minutes}`;  
  return time;
}
function searchCity(city) {
  let units = "imperial";
  let apiKey = "07d32b05fee3c33694b8ea90b20b7681";
  let apiStarter = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiStarter}q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(locationTempTime);
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

function locationTempTime(response) {
  tempF = Math.round(response.data.main.temp);
  let degrees = document.querySelector(".currentTemp");
  degrees.innerHTML = `${tempF}°`;

  let high = Math.round(response.data.main.temp_max);
  let max = document.querySelector(".highToday");
  max.innerHTML = `${high}°`;  

  let low = Math.round(response.data.main.temp_min);
  let min = document.querySelector(".lowToday");
  min.innerHTML = `${low}°`;

  let sunrise = conversion(response.data.sys.sunrise + response.data.timezone);
  let highSun = document.querySelector(".sunrise");
  highSun.innerHTML = `${sunrise}AM`;

  let sunset = conversion(response.data.sys.sunset + response.data.timezone);
  let lowSun = document.querySelector(".sunset");
  lowSun.innerHTML = `${sunset}PM`;
}
function fahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let degrees = document.querySelector(".currentTemp");
  degrees.innerHTML = `${tempF}°`;
}
function celsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
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