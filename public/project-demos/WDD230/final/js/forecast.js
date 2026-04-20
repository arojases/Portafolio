//weather summary

const apiURL = '//api.openweathermap.org/data/2.5/weather?id=3530103&APPID=308cb4059f05e4b16d95f6eb80cf3bfd&units=imperial';

fetch(apiURL)
    .then((response) => response.json())
    .then((weatherInfo) => {
        console.log(weatherInfo);

        document.getElementById('currentTemp').innerHTML = weatherInfo.weather[0].main;
        document.getElementById('highTemp').innerHTML = Math.round(weatherInfo.main.temp) + "\u00B0 F";
        document.getElementById("humidity").innerHTML = weatherInfo.main.humidity + "%";

    });


//5-day forecast

const api = "//api.openweathermap.org/data/2.5/forecast?id=3530103&appid=308cb4059f05e4b16d95f6eb80cf3bfd&units=imperial";

const iconURL = "//openweathermap.org/img/w/";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

fetch(api)
    .then((response) => response.json())
    .then((fiveDays) => {

        const forecast = fiveDays.list.filter(entry => new Date(entry.dt_txt).getHours() == 6);

        for (i = 0; i < forecast.length; i++) {
            let section = document.createElement('section');
            let day = document.createElement('h4');
            let temp = document.createElement('p');
            let icon = document.createElement('img');

            let date = new Date(forecast[i].dt_txt);
            day.textContent = days[date.getDay()];

            icon.src = iconURL + forecast[i].weather[0].icon + '.png';
            icon.alt = forecast[i].weather[0].description;

            temp.textContent = Math.round(forecast[i].main.temp) + "\u00B0 F";

            section.append(day);
            section.append(icon);
            section.append(temp);

            document.getElementById('gridForecast').appendChild(section);
        }
    });
