let currentDate = moment().format('l');
let searchCity = document.getElementById('locationInput').value;

function currentWeather() {

    let searchCity = document.getElementById('locationInput').value;

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchCity +
        '&units=imperial' +
        '&appid=668cdb30df14e3d9284e2e3a36347615'
    )
        .then(function (responce) {
            return responce.json();
        })
        .then(function (responce) {
            
            // Gets data for current weather
            let todayCity = responce.name;
            let todayIcon = responce.weather.icon;
            let todayTemp = responce.main.temp;
            let todayWind = responce.wind.speed;
            let todayHumidity = responce.main.humidity;

            // Displays weather data
            $('.city').text(todayCity + ' ' + todayIcon + ' ' + currentDate);
            $('.temp').text('Temp: ' + todayTemp + ' °F');
            $('.humidity').text('Humidity ' + todayHumidity + '%');
            $('.wind').text('Wind: ' + todayWind + ' MPH');
            

            let lon=responce.coord.lon
            let lat=responce.coord.lat
            fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat='+
                lat +
                '&lon=' +
                lon +
                '&appid=668cdb30df14e3d9284e2e3a36347615'
            )
            .then(function(responce){
                return responce.json();
            })
            .then(function(data){
                let uvIndex = data.current.uvi
                $('.uv').text('UV Index: ' + uvIndex);
                
                if (data.current.uvi < 4) {
                    alert('good')
                }if (data.current.uvi < 8) {
                   alert('bad')
                } else {
                    alert('not good')
                }
                
            })

        }); 
        fiveDayForecast()
        
        
}

function fiveDayForecast() {

    let searchCity = document.getElementById('locationInput').value;

    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
        searchCity +
        '&units=imperial' +
        '&appid=668cdb30df14e3d9284e2e3a36347615'
    )
        .then(function (responce) {
            return responce.json();
        })
        .then(function (data) {
            
            
            // 1st Day Forecast Variables
            let oneDayTemp = data.list[5].main.temp
            let oneDayWind = data.list[5].wind.speed
            let oneDayHum = data.list[5].main.humidity

            // Display Data
            $('.date-1').text(moment().add(1, 'days').format('l'))
            $('.temp-1').text('Temp ' + oneDayTemp + ' °F')
            $('.wind-1').text('Wind ' + oneDayWind + ' MPH')
            $('.humidity-1').text('Humidity: ' + oneDayHum + '%')

            // 2nd Day Forecast Variables
            let dayTwoTemp = data.list[13].main.temp
            let dayTwoWind = data.list[13].wind.speed
            let dayTwoHum = data.list[13].main.humidity

            // Display Data
            $('.date-2').text(moment().add(2, 'days').format('l'))
            $('.temp-2').text('Temp ' + dayTwoTemp + ' °F')
            $('.wind-2').text('Wind ' + dayTwoWind + ' MPH')
            $('.humidity-2').text('Humidity: ' + dayTwoHum + '%')

            // 3rd Day Forecast Variables
            let dayThreeTemp = data.list[21].main.temp
            let dayThreeWind = data.list[21].wind.speed
            let dayThreeHum = data.list[21].main.humidity

            // Display Data
            $('.date-3').text(moment().add(3, 'days').format('l'))
            $('.temp-3').text('Temp ' + dayThreeTemp + ' °F')
            $('.wind-3').text('Wind ' + dayThreeWind + ' MPH')
            $('.humidity-3').text('Humidity: ' + dayThreeHum + '%')

            // 4th Day Forecast Variables
            let dayFourTemp = data.list[29].main.temp
            let dayFourWind = data.list[29].wind.speed
            let dayFourHum = data.list[29].main.humidity

            // Display Data
            $('.date-4').text(moment().add(4, 'days').format('l'))
            $('.temp-4').text('Temp ' + dayFourTemp + ' °F')
            $('.wind-4').text('Wind ' + dayFourWind + ' MPH')
            $('.humidity-4').text('Humidity: ' + dayFourHum + '%')

            // 5th Day Forecast Variables
            let dayFiveTemp = data.list[37].main.temp
            let dayFiveWind = data.list[37].wind.speed
            let dayFiveHum = data.list[37].main.humidity

            // Display Data
            $('.date-5').text(moment().add(5, 'days').format('l'))
            $('.temp-5').text('Temp ' + dayFiveTemp + ' °F')
            $('.wind-5').text('Wind ' + dayFiveWind + ' MPH')
            $('.humidity-5').text('Humidity: ' + dayFiveHum + '%')
        })

}

// Search History
let searchHistory = JSON.parse(localStorage.getItem('cities')) || [];


function renderSearchHistory(searchHistory) {
    $('.recent-cities').text("")
    for (let i = 0; i < searchHistory.length; i++) {
        const recentCity = $('<button>');
        recentCity.attr("type", "text");
        recentCity.attr("readonly", true);
        recentCity.attr("class", "form-control d-block bg-white");
        recentCity.text(searchHistory[i]);
        $('.recent-cities').append(recentCity); 
        // recentCity.addEventListener("click", function () {
        //     currentWeather(recentCity.value);
        // })
    } 
   
}

$('.btn').on('click', function(event){
    event.preventDefault();
    let searchedCity = $('#locationInput')
    .val()
    .trim();
    searchHistory.push(searchedCity)
    renderSearchHistory(searchHistory)
    localStorage.setItem('cities', JSON.stringify(searchHistory))
    $('#locationInput').val('')
})

renderSearchHistory(searchHistory)
