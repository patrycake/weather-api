import "./style.css"
import weather from "./current.json"
import forecast from "./forecast.json"
import bolt from "./img/bolt.png"
import clouds from "./img/clouds.png"
import cloudy from "./img/cloudy.png"
import fog from "./img/fog.png"
import moon from "./img/moon.png"
import rain from "./img/rain.png"
import snowflake from "./img/snowflake.png"
import sun from "./img/sun.png"
import sunrise from "./img/sunrise.png"
import sunset from "./img/sunset.png"
import high from "./img/hightemp.png"
import low from "./img/lowtemp.png"
import humidity from "./img/drop.png"
import wind from "./img/windy.png"


(() => {
    let zipInput = document.getElementById("input-zip")
    let form = document.getElementById("form-info")
    let info = document.getElementById("info")
    let display = document.getElementById("display")
    let search = document.getElementById("search")
    let radioCurrent = document.getElementById("current-radio")
    let radioFive = document.getElementById("five-day-radio")
    // let 

    async function getWeatherInfo(place, unitsFar) {
        try {
            let url = ``;
            let urlFive = `http://api.openweathermap.org/data/2.5/forecast?zip=${place},us&appid=5967bc4f13171c4f3c4c4559633ef213` // 5 day
            let urlCurrent = `http://api.openweathermap.org/data/2.5/weather?zip=${place},us&units=${unitsFar ? "imperial" : "metric"}&appid=5967bc4f13171c4f3c4c4559633ef213`;
            if (radioCurrent.checked) url = urlCurrent;
            if (radioFive.checked) url = urlFive;
            console.log(url)
            const response = await fetch(url, {
                mode: 'cors'
            })
            // const response = await fetch(forecast)
            if (!response.ok) throw new Error(response.status)
            else return response.json();
        } catch (err) {
            console.error(err)
            throw err;
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {
            let weatherInfo = await getWeatherInfo(zipInput.value, true)
            console.log({
                weatherInfo
            })
            search.classList.add("hidden");
            display.classList.remove("hidden");
            // if (module.hot) {
            //     module.hot.accept()
            // }
            if (radioCurrent.checked) displayCurrent(weatherInfo)
            if (radioFive.checked) displayFiveDay(weatherInfo)
        } catch (err) {
            info.innerText = `${err} Please try another zip code`;
        }

    }, false)
})();


function displayCurrent(weatherInfo) {
    let display = document.getElementById("display");
    display.innerHTML = `
    <div id="current" class="container">
        <div id="header"> 
            <h1 id="place-name">${weatherInfo.name} <span id="current-icon" style="font-size: 20px">${weatherInfo.main.temp} </span> </h1>
            
            <button id="new-search">New Search</button>
        </div>`
        displayInfoGrid(weatherInfo, "display")
    display.innerHTML +=`</div>
    <footer><p><a href='https://www.freepik.com/vectors/background'>Background vector created by starline -
                www.freepik.com</a></p> <div><p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p></div></footer>`;


    document.getElementById("new-search").addEventListener("click", () => {
        location.reload()
    })
    iconPicker(weatherInfo.weather[0].main, document.getElementById("current-icon"))
    iconPicker("Sunrise", document.getElementById("sunrise"))
    iconPicker("Sunset", document.getElementById("sunset"))
    iconPicker("High", document.getElementById("high"))
    iconPicker("Low", document.getElementById("low"))
    iconPicker("Humidity", document.getElementById("humidity"))
    iconPicker("Wind", document.getElementById("wind"))
}

function displayFiveDay(weatherInfo) {
    console.log("forecast")
    console.log({
        weatherInfo
    })
    let displayDOM = document.getElementById("display");
    let objArr = weatherInfo.list
    let content = ``;
    displayDOM.innerHTML = `
     <div id="forecast" class="container">
        <div id="header"> 
            <h1 id="place-name">${weatherInfo.city.name} </h1>
            <button id="new-search">New Search</button>
        </div>
        <div id=forecast-grid></div>d`;
    console.log("here")
    console.log(content)
    for (let i = 0; i < objArr.length; i++) {
        displayInfoGrid(objArr[i], "forecast-grid")
    }

    

    displayDOM.innerHTML +=`</div>
    <footer><p><a href='https://www.freepik.com/vectors/background'>Background vector created by starline -
                www.freepik.com</a></p> <div><p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
                 from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                 </p></div></footer>`;

    console.log("here too")
    console.log(content)
     document.getElementById("new-search").addEventListener("click", () => {
        location.reload()
    })
    console.log(displayDOM)
}

function displayInfoGrid(weatherInfo, parent) {
    console.log(weatherInfo)
    let displayDOM = document.getElementById(parent);
    displayDOM.innerHTML += `
    <div id="info-grid" class="container">
        <div class="temp" class="container"> 
                <div class="card">
                    <span class="high"><img class=icon src=${high}></span>
                    <p>${weatherInfo.main.temp_max}</p>
                </div>
                <div class="card">
                    <span id="low"><img class=icon src=${low}></span>
                    <p>${weatherInfo.main.temp_min} </p>
                </div>
            </div>
            <div class="misc" class="container">
                <div class="card">
                    <span id="humidity"><img class=icon src=${humidity}></span>
                    <p>${weatherInfo.main.humidity}</p>
                </div>
                <div class="card">
                    <span id="wind"><img class=icon src=${wind}></span>
                    <p>${weatherInfo.wind.speed}</p>
                </div>
            </div>`
    if (!weatherInfo.sys) {
        displayDOM.innerHTML +=`<div id="sun" class="container">
                <div class="card">
                    <span id="sunrise"></span>
                    <p>${weatherInfo.sys.sunrise}</p>
                </div>
                <div class="card">
                    <span id="sunset"></span>
                    <p>${weatherInfo.sys.sunset}</p>
                </div>
            </div>`
    }
    displayDOM.innerHTML +='</div>'
    // iconPicker("High", document.getElementById("high"))
    // iconPicker("Low", document.getElementById("low"))
    // iconPicker("Humidity", document.getElementById("humidity"))
    // iconPicker("Wind", document.getElementById("wind"))
    // displayDOM.innerHTML += consoleI
    // return contentI;
}


// function timeConvert(unixTime) {
//     dateObj = new Date(unixTime * 1000);
//     utcString = dateObj.toUTCString();
//     time = utcString.slice(-11, -4);
//     return time;
// }

function iconPicker(description, parent) {
    console.log(description)
    let icon = new Image();
    icon.classList.add("icon")
    switch (description) {
        case "Thunderstorm":
            icon.src = bolt;
            break;
        case "Drizzle":
        case "Rain":
        case "Mist":
            icon.src = rain;
            break;
        case "Snow":
            icon.src = snowflake;
            break;
        case "Fog":
            icon.src = fog;
            break;
        case "Clear":
            icon.src = sun;
            break;
        case "Clouds":
            icon.src = clouds;
            break;
        case "Sunrise":
            icon.src = sunrise;
            break;
        case "Sunset":
            icon.src = sunset;
            break;
        case "Low":
            icon.src = low;
            break;
        case "High":
            icon.src = high;
            break;
        case "Humidity":
            icon.src = humidity;
            break;
        case "Wind":
            icon.src = wind;
    }
    parent.appendChild(icon)
}