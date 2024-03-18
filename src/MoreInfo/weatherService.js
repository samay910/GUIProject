// API key provided from OPENAPI to get weather data
const API_KEY = '5be349f16e9fd0dc1f64fc711ba8566c';


// url to obtain the icons of the weather being shown
const makeIconURL = (iconID) => 
    `https://openweathermap.org/img/wn/${iconID}@2x.png`;



    // function to get data from OPENAPI
const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=${units}`;

    // data will be received in a json format
    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    console.log(data);
    
    // certain attributes will be only taken as displayed below.
    const {weather, main: {temp, feels_like, temp_min, 
    temp_max, pressure, humidity},
    wind: {speed},
    sys: {country,sunrise,sunset},
    dt,
    name} = data;

    const {description, icon} = weather[0]
    
    // the given attributes will be returned back to be used.
    return {
        description, iconURL: makeIconURL(icon), temp, feels_like, temp_min,
        temp_max, pressure, humidity, speed, country, dt, name, sunrise, sunset
    };
};

export {getFormattedWeatherData};




