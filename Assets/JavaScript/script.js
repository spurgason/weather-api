let currentDate = moment().format('l');

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

            // Empty out divs
            $('.city').innerHTML = '';
            $('.temp').innerHTML = '';
            $('.wind').innerHTML = '';
            $('.humidity').innerHTML = '';
            $('.uv').innerHTML = '';

            // Displays weather data
            $('.city').text(todayCity + ' ' + todayIcon + ' ' + currentDate);
            $('.temp').text('Temp: ' + todayTemp + ' °F');
            $('.humidity').text('Humidity ' + todayHumidity + '%');
            $('.wind').text('Wind: ' + todayWind + ' MPH');
            $('.uv').text('UV Index:');

        }); fiveDayForecast()
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

            // Empty Out <p>
            $('.date-1').innerHTML = '';
            $('.temp-1').innerHTML = '';
            $('.wind-1').innerHTML = '';
            $('.humidity-1').innerHTML = '';

            // Display Data
            $('.date-1').text(moment().add(1, 'days').format('l'))
            $('.temp-1').text('Temp ' + oneDayTemp + ' °F')
            $('.wind-1').text('Wind ' + oneDayWind + ' MPH')
            $('.humidity-1').text('Humidity: ' + oneDayHum + '%')

            // 2nd Day Forecast Variables
            let dayTwoTemp = data.list[13].main.temp
            let dayTwoWind = data.list[13].wind.speed
            let dayTwoHum = data.list[13].main.humidity

            // Empty Out <p>
            $('.temp-2').innerHTML = '';
            $('.wind-2').innerHTML = '';
            $('.humidity-2').innerHTML = '';

            // Display Data
            $('.date-2').text(moment().add(2, 'days').format('l'))
            $('.temp-2').text('Temp ' + dayTwoTemp + ' °F')
            $('.wind-2').text('Wind ' + dayTwoWind + ' MPH')
            $('.humidity-2').text('Humidity: ' + dayTwoHum + '%')

            // 3rd Day Forecast Variables
            let dayThreeTemp = data.list[21].main.temp
            let dayThreeWind = data.list[21].wind.speed
            let dayThreeHum = data.list[21].main.humidity

            // Empty Out <p>
            $('.temp-3').innerHTML = '';
            $('.wind-3').innerHTML = '';
            $('.humidity-3').innerHTML = '';

            // Display Data
            $('.date-3').text(moment().add(3, 'days').format('l'))
            $('.temp-3').text('Temp ' + dayThreeTemp + ' °F')
            $('.wind-3').text('Wind ' + dayThreeWind + ' MPH')
            $('.humidity-3').text('Humidity: ' + dayThreeHum + '%')

            // 4th Day Forecast Variables
            let dayFourTemp = data.list[29].main.temp
            let dayFourWind = data.list[29].wind.speed
            let dayFourHum = data.list[29].main.humidity

            // Empty Out <p>
            $('.temp-4').innerHTML = '';
            $('.wind-4').innerHTML = '';
            $('.humidity-4').innerHTML = '';

            // Display Data
            $('.date-4').text(moment().add(4, 'days').format('l'))
            $('.temp-4').text('Temp ' + dayFourTemp + ' °F')
            $('.wind-4').text('Wind ' + dayFourWind + ' MPH')
            $('.humidity-4').text('Humidity: ' + dayFourHum + '%')

            // 5th Day Forecast Variables
            let dayFiveTemp = data.list[37].main.temp
            let dayFiveWind = data.list[37].wind.speed
            let dayFiveHum = data.list[37].main.humidity

            // Empty Out <p>
            $('.temp-5').innerHTML = '';
            $('.wind-5').innerHTML = '';
            $('.humidity-5').innerHTML = '';

            // Display Data
            $('.date-5').text(moment().add(5, 'days').format('l'))
            $('.temp-5').text('Temp ' + dayFiveTemp + ' °F')
            $('.wind-5').text('Wind ' + dayFiveWind + ' MPH')
            $('.humidity-5').text('Humidity: ' + dayFiveHum + '%')
        })

}