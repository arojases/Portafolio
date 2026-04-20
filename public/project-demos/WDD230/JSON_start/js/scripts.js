//ADD the key and change units to imperial
const apiURL = "//api.openweathermap.org/data/2.5/weather?id=5604473&appid=308cb4059f05e4b16d95f6eb80cf3bfd&units=imperial"

//Go fetch it and then wait for a response.
fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    //Once it comes back, display it to the console.
    console.log(weatherInfo);
    document.getElementById('place').innerHTML = weatherInfo.name;
    document.getElementById('currentTemp').innerHTML = weatherInfo.main.temp;
    document.getElementById('windSpeed').innerHTML = weatherInfo.wind.speed;

    const iconcode = weatherInfo.weather[0].icon;
    console.log(iconcode)
    const icon_path = "//openweathermap.org/img/w/" + iconcode + ".png";
    console.log(icon_path)

    document.getElementById('weather_icon').src = icon_path;

  }); //end of "then" fat arrow function


/*---------------FORECAST---------------------*/

const day_number = new Date().getDay();

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const apiURLforecast = "//api.openweathermap.org/data/2.5/forecast?id=5604473&appid=308cb4059f05e4b16d95f6eb80cf3bfd&units=imperial"


fetch(apiURLforecast)
  .then((response) => response.json())
  .then((weatherForecast) => {
    console.log(weatherForecast);
    document.getElementById('townName').textContent = weatherForecast.city.name

    let days_list = weatherForecast.list;
    let forecastDayNumber = day_number

    for (i = 0; i < days_list.length; i++) {
      var time = days_list[i].dt_txt;
      if (time.includes('21:00:00')) {
        forecastDayNumber += 1

        if (forecastDayNumber === 7) {
          forecastDayNumber = 0
        }

        let theDayName = document.createElement("span");
        theDayName.textContent = days[forecastDayNumber]

        let theTemp = document.createElement("p")
        theTemp.textContent = weatherForecast.list[i].main.temp + "\xB0";

        let iconCode = weatherForecast.list[i].weather[0].icon;
        let iconPath = "//openweathermap.org/img/w/" + iconCode + ".png";
        let theIcon = document.createElement("img");
        theIcon.src = iconPath;

        let theDay = document.createElement("div");
        theDay.appendChild(theDayName);
        theDay.appendChild(theTemp);
        theDay.appendChild(theIcon);

        document.getElementById(weatherforecast).appendChild(theDay)
      }

    }


  });