// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from "react";
import axios from "axios";
import FiveHourForecast from  './FiveHourForecast.js'; 

function Current(props){

        const [city, setCity] = useState('');
        const [weatherData, setWeatherData] = useState(null);
        const [weather,setweather]=useState(null);
        const [location, setLocation] = useState(null);


        const displayCurrentWeather = ()=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                  },
                  (error) => {
                    setError(error.message);
                  }
                );
              } else {
                setError('Geolocation is not supported by this browser.');
              }
            };


        const fetchData = async () => {
            try {
                // get latitude and longitude
                const response = await axios.get(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=69a76ba65a0f35730c3d61f7b31cfc05`
                );
                setWeatherData(response.data);
                console.log(response);

                //get current weather data
                const response2=await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&appid=69a76ba65a0f35730c3d61f7b31cfc05`
                );
                setweather(response2.data);
                console.log(response2.data); //You can see all the weather data in console log

                <FiveHourForecast icons={weather}/>


            } 
            catch (error) {
                console.error(error);
            }
        };

        useEffect(() => {
            displayCurrentWeather();
            fetchData();
        }, []);
        
        const handleInputChange = (e) => {
            setCity(e.target.value);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            fetchData();
        };

        return (
            <>    
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                    />
                    <button type="submit">Get Weather</button>
                </form>
            {weatherData ? (
            <>
            <p>worked</p>
            <p>{weatherData[0].name}</p>
            {/* <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Feels like : {weatherData.main.feels_like}°C</p>
            <p>Humidity : {weatherData.main.humidity}%</p>
            <p>Pressure : {weatherData.main.pressure}</p>
            <p>Wind Speed : {weatherData.wind.speed}m/s</p> */}
            </>
            ) : (
                
            )}

            <FiveHourForecast icons={weather}/>



            </div>
            </>
        );
};

        


        

export default Current