const citySearch = document.querySelector('input');
const displaySection = document.querySelector('.weather-display');
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${citySearch.value}&days=3`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d0a4bf049emsh661d05f14c34b3ap123e9cjsn7516c7c0cbfa",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(data => {
            const dataPrint = {
                rain:data.forecast.forecastday[0].day.daily_chance_of_rain,
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