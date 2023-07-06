const apiKey = "dfdd9577a358580d337b4226d3e1105b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const defaultCity = 'Belgrade';

// Izvuci konstante na vrh tako da mozes da ih koristis u celom fajlu
// Ako ih ubacis direktno u funkciju onda ce ti biti dostupne samo u toj funkciji
// Gledaj da dohvatis stvari jednom i da su ti dostupne svuda, da ne trosis vreme izvrsavanja koda
const img = document.querySelector(".img");
const temp = document.querySelector(".temp");
const cityHTML = document.querySelector(".city");
const error = document.querySelector(".error");
// Dohvatis direktno formu i radis sa submitom kada on klikne, i obavezno uradi validaciju podataka koje saljes
const form = document.forms[0];

// ovde kontrolises tu formu i radis validaciju i sta god da to treba, sva kontrola je u tvojim rukama
form.addEventListener('submit', (e) => {
    // Ova funkcija ispod ne dozvoljava formi da refrehsuje stranu i preventuje submit dok ti ne odradis svoje
    e.preventDefault();
    let inputValue = e.target[0].value;
    if (!inputValue.trim()) {
        return error.style.display = "block";
    }
    checkWeather(inputValue)
        .then(() => form.reset())
        .catch(() => error.style.display = "block");
})

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    if (response.status === 404) {
        error.style.display = "block";
    }

    temp.innerHTML = Math.round(data.main.temp) + "°c";
    cityHTML.innerHTML = data.name;
    // Postavi Sliku na osnovu onoga sto ti vrati API
    setImage(data.weather[0].main);
}

const setImage = (weather) => {
    switch (weather) {
        case "Clouds":
            img.innerHTML = `<img src="./assets/images/clouds.png" alt="Weather Image"/>`;
            break;
        case "Sun":
            img.innerHTML = `<img src="./assets/images/sun.png" alt="Weather Image"/>`;
            break;
        case "Rain":
            img.innerHTML = `<img src="./assets/images/rain.png" alt="Weather Image"/>`;
            break;
        default:
            img.innerHTML = `<img src="./assets/images/sun.png" alt="Weather Image"/>`;
            break;
    }
}

// Nemoj da zakucas vrednosti tamo, posalji poziv i zakucaj city ovde koji hoces tako ces uvek imati prave vrednosti.
window.addEventListener(('load'), () => {
    checkWeather(defaultCity);
});