import {weather} from './weather_api.js';

(function () {
    const citySearch = document.querySelector('input');
    const displaySection = document.querySelector('.weather-display');
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        fetch(weather.url(citySearch.value), {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": weather.apikey,
                "x-rapidapi-host": weather.apiHost
            }
        })
            .then(response => response.json())
            .then(data => {
                const dataPrint = {
                    rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
                    city: data.location.name,
                    temp: data.current.temp_c,
                    feelslike: data.current.feelslike_c,
                    humidity: data.current.humidity,
                    wind: data.current.wind_kph,
                    uv: data.current.uv
                }
                changeValues(dataPrint)
            })
            .catch(err => {
                console.log(err);
            });

    })

    function changeValues(values) {
        let city = document.querySelector('.city');
        let temp = document.querySelector('.temp');
        let rain = document.querySelector('.rain')
        let feelsLike = document.querySelector('.feelslike');
        let wind = document.querySelector('.wind');
        let humidity = document.querySelector('.humidity');
        let uv = document.querySelector('.uv');

        rain.innerText = values.rain
        city.innerText = values.city
        temp.innerText = values.temp
        feelsLike.innerText = values.feelslike
        wind.innerText = values.wind
        humidity.innerText = values.humidity
        uv.innerText = values.uv
    }
})()