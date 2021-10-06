var searchBtn = document.querySelector('.search-button')
var searchInput = document.getElementById('city-search')
var displayTemp = document.querySelector('.temp')
var displayCity = document.querySelector('.city-name')
var displayWind = document.querySelector('.wind')
var displayHumidity = document.querySelector('.humidity')
var displayUV = document.querySelector('.uv-index')
var fiveDay = document.querySelector('.five-day')


searchBtn.addEventListener('click', handleFetch);


function handleFetch(event) {
    event.preventDefault();
    if (searchInput.value == null) {
        console.log(searchInput.value);
        alert("City not found, please try again");
        return;
    } else {
        var requestCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=d533a66f01bd57392f57e1bb1973e60e";
        console.log(requestCityUrl);
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
    };
}

