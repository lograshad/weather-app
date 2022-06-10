const key = 'EdcHPPfGnfHliZOTX7vxOcSGH9REisBx';

const getWeather = async (id) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch (base + query);
    const data = await response.json();

    return data[0];
}


const getLoc = async (loc) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${loc}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

}
