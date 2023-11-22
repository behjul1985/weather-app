const apiKey = "f22895d7dbeabf77ec19fdabbdc7ee4a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiURLGeo = "http://api.openweathermap.org/geo/1.0/reverse?"

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const tempIcon = document.querySelector(".temp");

const blankInputError = "Enter city name";
var data = null;
let isCelcius = true;

    
//Function to get city weather data and populate card with info
    async function checkWeather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        data = await response.json();

        console.log(data);
  
        //Retrieve the data and replace the html classes with the data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " kph";
        

        //Switch statment to update the weather image depending on weather data
        var weatherCondition = data.weather[0].main
        
        switch(weatherCondition) {

            case "Clouds":
            document.querySelector(".weather img").src = "Images/clouds.png";
            document.querySelector(".weather img").alt = "Clouds";
            document.querySelector(".card").style.background = "linear-gradient(135deg, grey, #373f54)";
            break;

            case "Clear":
            document.querySelector(".weather img").src = "Images/clear.png";
            document.querySelector(".weather img").alt = "Clear";
            document.querySelector(".card").style.background = "linear-gradient(135deg, yellow, #5dac7c)";

            break;

            case "Drizzle":
            document.querySelector(".weather img").src = "Images/drizzle.png";
            document.querySelector(".weather img").alt = "Drizzle";
            document.querySelector(".card").style.background = "linear-gradient(135deg, blue, black)";
            break;

            case "Rain":
            document.querySelector(".weather img").src = "Images/rain.png";
            document.querySelector(".weather img").alt = "Rain";
            document.querySelector(".card").style.background = "linear-gradient(135deg, blue, black)";
            break;

            case "Snow":
            document.querySelector(".weather img").src = "Images/snow.png";
            document.querySelector(".weather img").alt = "Snow";
            
            break;

            case "Mist":
            document.querySelector(".weather img").src = "Images/mist.png";
            document.querySelector(".weather img").alt = "Mist";
            break;

            default:
            document.querySelector(".weather img").src = "";
            document.querySelector(".weather img").alt = "No weather found";
            break;

        }
    }
   
//Function to get city weather data and populate card based on users location
window.addEventListener("load", (event) => {
  let latitude, longitude;

  //Get users location
  const successCallback = (position) => {
  console.log(`Latitude is ${position.coords.latitude}`)
  console.log(`Longitude is ${position.coords.longitude}`)
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  
  reverseGeo(latitude, longitude);

};
const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

async function reverseGeo(latitude, longitude){
        let locationData;
        const response = await fetch(apiURLGeo + `lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        locationData = await response.json();
        const city = locationData[0].name;
        checkWeather(city);     
}
});

//Event listeners to call the functions to get city weather data
    searchBtn.addEventListener("click", ()=>{
        if (searchBox.value.trim().length >= 1) {
            checkWeather(searchBox.value);
        } else {
            document.querySelector(".city").innerHTML = blankInputError;
        }
        
        
    });
    searchBox.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            if (searchBox.value.trim().length >= 1) {
                checkWeather(searchBox.value)
            } else {
                document.querySelector(".city").innerHTML = blankInputError;
            }
            
        }
    });
    tempIcon.addEventListener("click", ()=>{
        if (isCelcius) {
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp * 1.8 + 32) + "°f";
            isCelcius = false;
        } else {
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            isCelcius = true
        }
    })