const API_KEY = '5be349f16e9fd0dc1f64fc711ba8566c';


const makeIconURL = (iconID) => 
    `https://openweathermap.org/img/wn/${iconID}@2x.png`;



const getFormattedWeatherData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    console.log(data);
    
    const {weather, main: {temp, feels_like, temp_min, 
    temp_max, pressure, humidity},
    wind: {speed},
    sys: {country,sunrise,sunset},
    dt,
    name} = data;

    const {description, icon} = weather[0]

    return {
        description, iconURL: makeIconURL(icon), temp, feels_like, temp_min,
        temp_max, pressure, humidity, speed, country, dt, name, sunrise, sunset
    };
};

export {getFormattedWeatherData};




