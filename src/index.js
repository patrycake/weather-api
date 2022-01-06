(() => {
    let placeInput = document.getElementById("place")
    let form = document.getElementById("form-info")
    let info = document.getElementById("info")

    async function getWeatherInfo(place) {
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${place},us&units=imperial&appid=5967bc4f13171c4f3c4c4559633ef213`, {
            mode: 'cors'
        })
        let weatherInfo = await response.json()
        return weatherInfo;
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let weatherInfo = getWeatherInfo(placeInput.value).catch((err) => console.log(err))
        console.log({
            weatherInfo
        })
    }, false)
})();