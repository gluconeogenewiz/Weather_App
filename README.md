
# Project Title: Weather Application

## Motivation
The objective of this project is to showcase proficiency in utilizing HTML, CSS, and JavaScript, particularly in integrating an API into a software program.

## Build Status
Completed/No bugs

## Tech/Frameworks
Utilized HTML, CSS, and JavaScript

## Features
- The application retrieves the user's geolocation to deliver real-time weather information specific to their location.
- It offers the capability to convert temperature, initially set in Celsius, to Fahrenheit.
- The application further provides details such as weather description, an icon depicting the current weather conditions, and the day's highest and lowest temperatures.

## Installation
1. Clone the repository: `git clone https://github.com/your-username/WeatherApp.git`
2. Open `index.html` in your preferred browser.

## Usage
1. Allow the browser to access your geolocation.
2. The application will display real-time weather information for your location.

## API Documentation
The application uses the OpenWeatherMap API. For more information, refer to the [OpenWeatherMap API documentation](https://openweathermap.org/api).

## Contribution Guidelines
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Weather icons sourced from the "icons" folder.
- OpenWeatherMap for providing weather data.

---

### JS Code Snippet

```javascript

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




```
