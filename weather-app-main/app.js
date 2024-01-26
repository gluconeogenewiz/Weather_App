/**
 * Author: Albert Nguyen 
 * 
 * Extracts weather information from API using the user's geolocation and display the 
 * weather by sending information to HTML
 * 
 * The temperature can be expressed by Celsius or Fahrenheit
 */

const notifElement = document.querySelector(".notif");
const iconElement = document.querySelector(".icon");
const tempElement = document.querySelector(".temp p");
const tempDescElement = document.querySelector(".temp-description p");
const locElement = document.querySelector(".location p");
const tempMaxElement = document.querySelector(".temp-max p");
const tempMinElement = document.querySelector(".temp-min p");

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

const weather = {
    temp : {
        value : 24,
        unit : "celsius"
    },
    tempMax : {
        value : 24,
        unit : "celsius"
    },
    tempMin : {
        value : 24,
        unit : "celsius"
    },
    iconID : "default"
};

// Check to see if the browser supports geolocation
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(getPositon, displayError);
}
else {
    notifElement.style.display = "block";
    notifElement.innerHTML = "<p>Error: no geolocation found.</p>";
}

// Get geolocation of the user
function getPositon(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// Display error message if any
function displayError(error) {
    notifElement.style.display = "block";
    notifElement.innerHTML = `<p>Error: ${error.message}</p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api).then(function(response) {
        let data = response.json()
        return data;
    }).then(function(data) {
        weather.temp.value = Math.floor(data.main.temp - KELVIN);
        weather.tempMax.value = Math.floor(data.main.temp_max - KELVIN);
        weather.tempMin.value = Math.floor(data.main.temp_min - KELVIN);
        weather.desc = data.weather[0].description;
        weather.iconID = data.weather[0].icon;
        weather.city = data.name.toLowerCase();
    }).then(function() {
        display();
    });
}

function display() {
    iconElement.innerHTML = `<img src="icons/${weather.iconID}.png"/>`;
    tempElement.innerHTML = `${weather.temp.value}°C`;
    tempMaxElement.innerHTML = `h: ${weather.tempMax.value}°C`;
    tempMinElement.innerHTML = `l: ${weather.tempMin.value}°C`;
    tempDescElement.innerHTML = weather.desc;
    locElement.innerHTML = `${weather.city}`;
}

function convertCelciusToFahrenheit(temp){
    return Math.floor((temp * 9/5) + 32);
}

tempElement.addEventListener("click", function(){
    if(weather.temp.value === undefined) {
        return;
    }
    // To change the unit to Fahrenheit
    else if(weather.temp.unit === "celsius") {
        let fahrenheitTemp = convertCelciusToFahrenheit(weather.temp.value);
        tempElement.innerHTML = `${fahrenheitTemp}°F`;
        weather.temp.unit = "fahrenheit";

        let maxFahrenheitTemp = convertCelciusToFahrenheit(weather.tempMax.value);
        tempMaxElement.innerHTML = `${maxFahrenheitTemp}°F`;
        weather.tempMax.unit = "fahrenheit";

        let minFahrenheitTemp = convertCelciusToFahrenheit(weather.tempMin.value);
        tempMinElement.innerHTML = `${minFahrenheitTemp}°F`;
        weather.tempMin.unit = "fahrenheit";
    }
    // To change the unit to Celcius
    else {
        tempElement.innerHTML = `${weather.temp.value}°C`;
        weather.temp.unit = "celsius";

        tempMaxElement.innerHTML = `${weather.tempMax.value}°C`;
        weather.tempMax.unit = "celsius";

        tempMinElement.innerHTML = `${weather.tempMin.value}°C`;
        weather.tempMin.unit = "celsius";
    }
});
