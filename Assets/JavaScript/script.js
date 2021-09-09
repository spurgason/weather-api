let currentDate = moment().format('l');
let searchCity = document.getElementById('locationInput').value;

function currentWeather(recentCity) {

    let searchCity = document.getElementById('locationInput').value || recentCity; 

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
            let todayTemp = responce.main.temp;
            let todayWind = responce.wind.speed;
            let todayHumidity = responce.main.humidity;
            let todayIcon = responce.weather[0].icon;
            
            // Displays weather dataßß
            $('.city').text(todayCity + '  ' + currentDate);
            $('.icon').attr('src', "https://openweathermap.org/img/wn/" + todayIcon + "@2x.png" )
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
                    $('.uv').addClass('badge bg-success')
                }else if(data.current.uvi < 5  && data.current.uvi > 8) {
                    $('.uv').addClass('badge bg-warning text-dark')
                } else {
                    $('.uv').addClass('badge bg-danger')
                }
                
            })

        }); 
        fiveDayForecast(recentCity)
        
        
}

function fiveDayForecast(recentCity) {

    let searchCity = document.getElementById('locationInput').value || recentCity;

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
            
            console.log(data);
            // 1st Day Forecast Variables
            let dayOneTemp = data.list[5].main.temp
            let dayOneWind = data.list[5].wind.speed
            let dayOneHum = data.list[5].main.humidity
            let dayOneIcon = data.list[5].weather[0].icon

            // Display Data
            $('.date-1').text(moment().add(1, 'days').format('l'))
            $('.icon-1').attr('src', "https://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png" )
            $('.temp-1').text('Temp ' + dayOneTemp + ' °F')
            $('.wind-1').text('Wind ' + dayOneWind + ' MPH')
            $('.humidity-1').text('Humidity: ' + dayOneHum + '%')

            // 2nd Day Forecast Variables
            let dayTwoTemp = data.list[13].main.temp
            let dayTwoWind = data.list[13].wind.speed
            let dayTwoHum = data.list[13].main.humidity
            let dayTwoIcon = data.list[13].weather[0].icon

            // Display Data
            $('.date-2').text(moment().add(2, 'days').format('l'))
            $('.icon-2').attr('src', "https://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png" )
            $('.temp-2').text('Temp ' + dayTwoTemp + ' °F')
            $('.wind-2').text('Wind ' + dayTwoWind + ' MPH')
            $('.humidity-2').text('Humidity: ' + dayTwoHum + '%')

            // 3rd Day Forecast Variables
            let dayThreeTemp = data.list[21].main.temp
            let dayThreeWind = data.list[21].wind.speed
            let dayThreeHum = data.list[21].main.humidity
            let dayThreeIcon = data.list[21].weather[0].icon

            // Display Data
            $('.date-3').text(moment().add(3, 'days').format('l'))
            $('.icon-3').attr('src', "https://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png" )
            $('.temp-3').text('Temp ' + dayThreeTemp + ' °F')
            $('.wind-3').text('Wind ' + dayThreeWind + ' MPH')
            $('.humidity-3').text('Humidity: ' + dayThreeHum + '%')

            // 4th Day Forecast Variables
            let dayFourTemp = data.list[29].main.temp
            let dayFourWind = data.list[29].wind.speed
            let dayFourHum = data.list[29].main.humidity
            let dayFourIcon = data.list[29].weather[0].icon

            // Display Data
            $('.date-4').text(moment().add(4, 'days').format('l'))
            $('.icon-4').attr('src', "https://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png" )
            $('.temp-4').text('Temp ' + dayFourTemp + ' °F')
            $('.wind-4').text('Wind ' + dayFourWind + ' MPH')
            $('.humidity-4').text('Humidity: ' + dayFourHum + '%')

            // 5th Day Forecast Variables
            let dayFiveTemp = data.list[37].main.temp
            let dayFiveWind = data.list[37].wind.speed
            let dayFiveHum = data.list[37].main.humidity
            let dayFiveIcon = data.list[37].weather[0].icon

            // Display Data
            $('.date-5').text(moment().add(5, 'days').format('l'))
            $('.icon-5').attr('src', "https://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png" )
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
        recentCity.attr("class", "form-control d-block bg-white city-btn");
        recentCity.text(searchHistory[i]);
        $('.recent-cities').append(recentCity); 
        
       
    } 

    $('.city-btn').on('click', function(event){
        let city = event.target.innerText
        currentWeather(city);
    })
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
