import "./style.css"
import weather from "./weather.json"
import bolt from "./img/bolt.png"
import celsius from "./img/celsius.png"
import clouds from "./img/clouds.png"
import cloudy from "./img/cloudy.png"
import farenheit from "./img/farenheit.png"
import fog from "./img/fog.png"
import moon from "./img/moon.png"
import rain from "./img/rain.png"
import snowflake from "./img/snowflake.png"
import sun from "./img/sun.png"
import sunrise from "./img/sunrise.png"
import sunset from "./img/sunset.png"
import high from "./img/hightemp.png"
import low from "./img/lowtemp.png"

(() => {
    let zipInput = document.getElementById("input-zip")
    let form = document.getElementById("form-info")
    let info = document.getElementById("info")
    let display = document.getElementById("display")
    let search = document.getElementById("search")

    async function getWeatherInfo(place) {
        try {
            // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${place},us&units=imperial&appid=5967bc4f13171c4f3c4c4559633ef213`,{

            // mode: 'cors'
            // })
            const response = await fetch(weather)
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
            let weatherInfo = await getWeatherInfo(zipInput.value)
            console.log({
                weatherInfo
            })
            search.classList.add("hidden");
            display.classList.remove("hidden");
            if (module.hot) {
                module.hot.accept()

            }
            displayCurrent(weatherInfo)
        } catch (err) {
            info.innerText = `${err} Please try another zip code`;
        }

    }, false)
})();


function displayCurrent(weatherInfo) {
    // console.log("display???"+ timeConvert(weatherInfo.sys.sunrise))
    let display = document.getElementById("display");
    display.innerHTML = `
    <div id="current" class="container">
        <div id="header"> 
            <h1 id="place-name">${weatherInfo.name}</h1>
            <span>${weatherInfo.main.temp} </span>
        </div>
        <button id="new-search">New Search</button>
        <div id="info-grid" class="container">
            <div id="temp" class="container"> 
                <span id="high"></span>
                <p>${weatherInfo.main.temp_max}</p>
                <span id="low"></span> 
                <p>${weatherInfo.main.temp_min} </p>
            </div>
            <div id="sun" class="container">
                <span id="sunrise"></span>
                <p>${weatherInfo.sys.sunrise}</p>
                <span id="sunset"></span>
                <p>${weatherInfo.sys.sunset}</p>
            </div>
            <div id="wind" class="container">
                <span id="sunrise"></span>
                <p>${weatherInfo.sys.sunrise}</p>
                <span id="sunset"></span>
                <p>${weatherInfo.sys.sunset}</p>
            </div>
        </div>
        
    </div>
    <footer><p><a href='https://www.freepik.com/vectors/background'>Background vector created by starline -
                www.freepik.com</a></p> <div><p>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p></div></footer>`;


    document.getElementById("new-search").addEventListener("click", () => {
        location.reload()
    })
    iconPicker(weatherInfo.weather[0].main, document.getElementById("header"))
    iconPicker("Sunrise", document.getElementById("sunrise"))
    iconPicker("Sunset", document.getElementById("sunset"))
    iconPicker("High", document.getElementById("high"))
    iconPicker("Low", document.getElementById("low"))
}

function timeConvert(unixTime) {
    dateObj = new Date(unixTime * 1000);
    utcString = dateObj.toUTCString();
    time = utcString.slice(-11, -4);
    return time;
}

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
    }
    parent.appendChild(icon)
}