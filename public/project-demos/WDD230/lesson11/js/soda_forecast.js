const apiURL = "//api.openweathermap.org/data/2.5/weather?id=5607916&appid=308cb4059f05e4b16d95f6eb80cf3bfd&units=imperial"

fetch(apiURL)
    .then((response) => response.json())
    .then((weatherInfo) => {
        console.log(weatherInfo);

        document.getElementById('currentTemp').innerHTML = weatherInfo.weather[0].main;
        document.getElementById('highTemp').innerHTML = Math.round(weatherInfo.main.temp) + "\u00B0 F";
        document.getElementById('speed').innerHTML = Math.round(weatherInfo.wind.speed) + " MPH";
        document.getElementById("humidity").innerHTML = weatherInfo.main.humidity + "%";


        const tempNum = parseFloat(document.getElementById("highTemp").textContent);
        const speedNum = parseFloat(document.getElementById("speed").textContent);

        let windChill = 35.74 + (0.6215 * tempNum) - (35.75 * Math.pow(speedNum, 0.16)) + (0.4275 * tempNum * Math.pow(speedNum, 0.16));
        windChill = Math.round(windChill);

        if (tempNum <= 50 && speedNum > 3) {
            document.getElementById("chill").textContent = windChill + "\xB0F";
        } else {
            document.getElementById("chill").textContent = "No Wind Chill today";
        }

    });

//5-day forecast

const api = "//api.openweathermap.org/data/2.5/forecast?id=5607916&appid=430370a79b47b0401281e2917fbf7a2b&units=imperial";

const iconURL = "//openweathermap.org/img/w/";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

fetch(api)
    .then((response) => response.json())
    .then((fiveDays) => {

        const forecast = fiveDays.list.filter(entry => new Date(entry.dt_txt).getHours() == 18);

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