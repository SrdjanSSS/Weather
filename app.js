const apiKey = "dfdd9577a358580d337b4226d3e1105b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);
    
    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
    }


    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML = data.name;
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});