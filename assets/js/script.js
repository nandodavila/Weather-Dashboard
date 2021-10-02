var searchBtn = document.querySelector('.dcfv  cc vccv dfsearch-button')
var searchInput = document.querySelector('#city-search')
var displayTemp = document.querySelector('.temp')
var displayCity = document.querySelector('.city-name')
var displayWind = document.querySelector('.wind')
var displayHumidity = document.querySelector('.humidity')
var displayUV = document.querySelector('.uv-index')
var fiveDay = document.querySelector('.five-day')


function handleFetch() {
    var requestCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=d533a66f01bd57392f57e1bb1973e60e"
    fetch(requestCityUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.name);
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
                    console.log(data1)
                    console.log(data1.daily[0].weather)
                    var temp = data1.daily[0].temp.day
                    var wind = data1.daily[0].wind_speed
                    var humidity = data1.daily[0].humidity
                    var uvIndex = data1.daily[0].uvi
                    displayTemp.textContent = "Temp: " + temp + "°F";
                    displayWind.textContent = "Wind: " + wind + "MPH";
                    displayHumidity.textContent = "Humidity: " + humidity +"%"
                    displayUV.textContent = "UV index: " + uvIndex
                    for (i = 0; i < data1.daily.length - 3; i++) {
                        var dailyWeather = document.createElement('div')
                        fiveDay.appendChild(dailyWeather)
                        dailyWeather.className = "list-group-item"
                        var fiveDayDate = document.createElement('h1')
                        var fiveDayTemp = document.createElement('li')
                        var fiveDayHumid = document.createElement('li')
                        var fiveDayWind = document.createElement('li')
                        dailyWeather.appendChild(fiveDayDate)
                        dailyWeather.appendChild(fiveDayTemp)
                        dailyWeather.appendChild(fiveDayHumid)
                        dailyWeather.appendChild(fiveDayWind)
                        console.log(moment(data1.daily[i].dt))
                        fiveDayDate.textContent = moment(data1.daily[i].dt).format('MM-DD-YYYY')
                        fiveDayTemp.textContent = "Temp: " + data1.daily[i].temp.day + "°F"
                        fiveDayWind.textContent = "Wind: " + data1.daily[i].wind_speed + "MPH"
                        fiveDayHumid.textContent = "Humidity: " + data1.daily[i].humidity + "%"
                        
                    }
                    


                
                });

        });
        
};

handleFetch();