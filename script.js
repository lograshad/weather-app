const cityForm = document.querySelector('form');
const weatherInformation = document.querySelector('.weather-info');
const weatherCard = document.querySelector('.weather-card');
const timeImg = document.querySelector('.placeholder');
const icon = document.querySelector('.weather-icon img');


const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets, 
        weather: weather
    }
};

const updateUi = (data) => {

    const cityDets = data.cityDets;
    const weather =data.weather; 

    weatherInformation.innerHTML = `
    <div class="city-name">${cityDets.EnglishName}</div>
    <div class="condition">${weather.WeatherText}</div>
    <div class="temp">${weather.Temperature.Metric.Value} <span>&deg;C</span></div>
    `;

    weatherCard.style.display = "block"

    const iconSrc = `${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc ='day.svg/';
    } else {
        timeSrc ='night.svg'
    }

    timeImg.setAttribute('src', timeSrc)
}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    // get form values
    const city = cityForm.city.value.trim();
    cityForm.reset();


    updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));

});