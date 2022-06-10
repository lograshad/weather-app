const weatherCard = document.querySelector('.weather-card');
const locationForm = document.querySelector('.city-form');
const weatherInfo = document.querySelector('.weather-info');
const timeImg = document.querySelector('.placeholder');
const icon = document.querySelector('.weather-icon img');


const updateLOC = async (loc) => {
    const location = await getLoc(loc);
    const weather = await getWeather(location.Key);

    return {
        location: location,
        weather: weather
    }
}


const updateUI = (data) => {
    const locDets = data.location;
    const weather =data.weather; 

    weatherInfo.innerHTML = `
    <div class="city-name">${locDets.EnglishName}</div>
    <div class="condition">${weather.WeatherText}</div>
    <div class="temp">${weather.Temperature.Metric.Value} <span>&deg;C</span></div>
    `

    const iconSrc = `${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc ='day.svg';
    } else {
        timeSrc ='night.svg'
    }

    timeImg.setAttribute('src', timeSrc)
    scrollTo(0, document.body.scrollHeight);

    console.log(data);
}


locationForm.addEventListener('submit', e => {
    const loc = locationForm.city.value.trim();
    e.preventDefault();
    locationForm.reset();
   

    weatherCard.classList.remove('display');

    updateLOC(loc)
        .then(data => {
            updateUI(data);
        })
        .catch(err => {
            console.log(err);
        })
  

});
