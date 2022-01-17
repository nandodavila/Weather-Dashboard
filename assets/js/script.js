var searchBtn = document.querySelector('.search-button');
var searchInput = document.getElementById('city-search');
var displayTemp = document.querySelector('.temp');
var displayCity = document.querySelector('.city-name');
var displayWind = document.querySelector('.wind');
var displayHumidity = document.querySelector('.humidity');
var displayUV = document.querySelector('.uv-index');
var fiveDay = document.querySelector('.five-day');
var cityList = document.querySelector('.city-list')
var citySearched = [];
var localCitySearched = [];


getCityLocal();
cityButtons();

var activeCityBtn = document.querySelectorAll(".city-buttons")
searchBtn.addEventListener('click', handleFetch);
cityBtnEventListener();
function cityBtnEventListener() {
    activeCityBtn.forEach(btn => {
        btn.addEventListener('click', handleCityBtnFetch);        
    });
}




function handleFetch(event) {
    event.preventDefault();
    if (searchInput.value == null) {
        alert("City not found, please try again");
        return;
    } else {
        citySearched.push(searchInput.value)
        handleSearch(searchInput.value)
        getCityLocal();
        cityButtons();      
    };
}

function handleCityBtnFetch(event) {
    event.preventDefault();
    if (event.target.innerHTML == null) {
        alert("City not found, please try again");
        return;
    } else {
        citySearched.push(event.target.innerHTML)
        handleSearch(event.target.innerHTML)
        getCityLocal();
        cityButtons();
            
    };
}

function setCityLocal() {
    localStorage.setItem('citySearched', JSON.stringify(citySearched))

}

function getCityLocal() {
    var storedCity = localStorage.getItem("citySearched")
    if (storedCity) {
        localCitySearched = JSON.parse(storedCity)
    }
}

function cityButtons(){
    var clearButtons = document.querySelectorAll(".city-buttons")
    for (let i = 0; i< clearButtons.length; i++) {
        clearButtons[i].remove();
    }
    if (localCitySearched.length > 0) {
        for (i = 0; i < localCitySearched.length; i++) {
        var cityBtn = document.createElement('button');
        cityList.appendChild(cityBtn)
        cityBtn.innerHTML = localCitySearched[i]
        cityBtn.className = 'city-buttons'
    }
}
}

function handleSearch(searched){
    var removeLi = document.querySelectorAll(".list-group-item")
    for (let i = 0; i< removeLi.length; i++) {
        removeLi[i].remove();
    }
    console.log(searched);
    getCityLocal();
    cityButtons();
    setCityLocal();
    var requestCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searched + "&appid=d533a66f01bd57392f57e1bb1973e60e";
    fetch(requestCityUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            var city = data.name;
            displayCity.textContent = city;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var requestWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely&appid=d533a66f01bd57392f57e1bb1973e60e"
            fetch(requestWeatherURL)
                .then(function(response1){
                    return response1.json();
                })
                .then(function(data1){
                    var temp = data1.daily[0].temp.day
                    var wind = data1.daily[0].wind_speed
                    var humidity = data1.daily[0].humidity
                    var uvIndex = data1.daily[0].uvi
                    displayTemp.textContent = "Temp: " + temp + "°F";
                    displayWind.textContent = "Wind: " + wind + "MPH";
                    displayHumidity.textContent = "Humidity: " + humidity +"%";
                    displayUV.textContent = "UV index: " + uvIndex;
                    var mainIcon = data1.daily[0].weather[0].icon;
                    var mainIconUrl = "http://openweathermap.org/img/wn/" + mainIcon + "@2x.png ";
                    var mainIconDisplay = document.createElement('img');
                    mainIconDisplay.setAttribute('src', mainIconUrl)
                    displayCity.appendChild(mainIconDisplay)
                    for (i = 0; i < data1.daily.length - 3; i++) {
                        var dailyWeather = document.createElement('div');
                        fiveDay.appendChild(dailyWeather);
                        dailyWeather.className = "list-group-item";
                        var fiveDayDate = document.createElement('h1');
                        var fiveDayTemp = document.createElement('li');
                        var fiveDayHumid = document.createElement('li');
                        var fiveDayWind = document.createElement('li');
                        var icon = data1.daily[i].weather[0].icon
                        var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png ";
                        var iconDisplay = document.createElement('img');
                        iconDisplay.setAttribute('src', iconUrl)
                        dailyWeather.appendChild(fiveDayDate);
                        dailyWeather.appendChild(iconDisplay)
                        dailyWeather.appendChild(fiveDayTemp);
                        dailyWeather.appendChild(fiveDayHumid);
                        dailyWeather.appendChild(fiveDayWind);
                        fiveDayDate.textContent = moment(data1.daily[i].dt, 'X').format('MM-DD-YYYY');
                        fiveDayTemp.textContent = "Temp: " + data1.daily[i].temp.day + "°F";
                        fiveDayWind.textContent = "Wind: " + data1.daily[i].wind_speed + "MPH";
                        fiveDayHumid.textContent = "Humidity: " + data1.daily[i].humidity + "%";
                    };                
                });
        }); 

}