function dateToday(date) {


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
  
  return `${month} ${day}`;
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
  let time = `${hour}:${minutes}`;  
  return time;
}
function searchCity(city) {
  let units = "imperial";
  let apiKey = "07d32b05fee3c33694b8ea90b20b7681";
  let apiWeather = "https://api.openweathermap.org/data/2.5/weather?";
  let apiWeatherUrl = `${apiWeather}q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiWeatherUrl).then(locationTempTime);
}
function currentCity(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  units = "imperial";
  apiKey = "07d32b05fee3c33694b8ea90b20b7681";
  let apiForecast = "https://api.openweathermap.org/data/2.5/onecall?"
  let apiUrlForecast = `${apiForecast}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}&exclude=currently,minutely,hourly,alert`;
    axios.get(apiUrlForecast).then(locationForecast);  
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
  let icon = document.querySelector(".weatherToday");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  tempF = Math.round(response.data.main.temp);
  let degrees = document.querySelector(".currentTemp");
  degrees.innerHTML = `${tempF}°`;

  high = Math.round(response.data.main.temp_max);
  let max = document.querySelector(".highToday");
  max.innerHTML = `${high}°`;  

  low = Math.round(response.data.main.temp_min);
  let min = document.querySelector(".lowToday");
  min.innerHTML = `${low}°`;

  sunrise = conversion(response.data.sys.sunrise + response.data.timezone);
  let highSun = document.querySelector(".sunrise");
  highSun.innerHTML = `${sunrise}AM`;

  sunset = conversion(response.data.sys.sunset + response.data.timezone);
  let lowSun = document.querySelector(".sunset");
  lowSun.innerHTML = `${sunset}PM`;

  currentCity(response);
}
function locationForecast(response) {
  let nextForecast = document.querySelector(".tomorrow");
  nextForecast.innerHTML = null;
  let tomorrow = null;

  for (let index = 1; index < 2; index++) {
    tomorrow = response.data.daily[index];
    let tomorrowHF = tomorrow.temp.max;
    let tomorrowLF = tomorrow.temp.min;
    date = new Date(tomorrow.dt * 1000);
    nextForecast.innerHTML +=
    `<div class="col-sm dateTomorrow">
			${dateToday(date)}
		</div>
		<span>
			<div class="col-sm">
				<img src="http://openweathermap.org/img/wn/${tomorrow.weather[0].icon}@2x.png" 
        alt="${tomorrow.weather[0].description}" class="iconTomorrow" />
			</div>
		</span>
  <div class="col-sm highLowTomorrow">
    <span class="highTomorrow">
			${Math.round(tomorrowHF)}°
		</span>
		|
		<span class="lowTomorrow">
			 ${Math.round(tomorrowLF)}°
		</span>
	</div>`;
  }

  let fullForecast = document.querySelector(".forecast");
  fullForecast.innerHTML = null;
  let forecast = null;

  for (let index = 2; index < 6; index++) {
    forecast = response.data.daily[index];
    let forecastHF = forecast.temp.max;
    let forecastLF = forecast.temp.min;
    date = new Date(forecast.dt * 1000);
    fullForecast.innerHTML += 
      `<div class="col-6">
				<ul class="weekday">
					<li class="day">${dateToday(date)}</li>
					<li>
						<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
            alt="${forecast.weather[0].description}" class="iconForecast" />
          </li>
          <li>
						<span class="highForecast">
							${Math.round(forecastHF)}°
						</span>
						|
						<span class="lowForecast">
							${Math.round(forecastLF)}°
						</span>
					</li>
				</ul>
			</div>`;
  }
}
function fahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove(".active");
  celsiusLink.classList.add(".active");

  let degrees = document.querySelector(".currentTemp");
  degrees.innerHTML = `${tempF}°`;

  let max = document.querySelector(".highToday");
  max.innerHTML = `${Math.round(high)}°`;

  let min = document.querySelector(".lowToday");
  min.innerHTML = `${Math.round(low)}°`;
}
function celsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove(".active");
  fahrenheitLink.classList.add(".active");

  let degrees = document.querySelector(".currentTemp");
  let tempC = (tempF - 32) * 5 / 9;
  degrees.innerHTML = `${Math.round(tempC)}°`;

  let max = document.querySelector(".highToday");
  let highC = (high - 32) * 5 / 9;
  max.innerHTML = `${Math.round(highC)}°`;

  let min = document.querySelector(".lowToday");
  let lowC = (low - 32) * 5 / 9;
  min.innerHTML = `${Math.round(lowC)}°`;  
}
let tempF = null;
let highC = null;
let lowC = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", celsiusTemp);

searchCity("Miami");