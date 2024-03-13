import { useEffect, useState } from "react";
// import "./WeatherDisplay.css";
import sunny from "../assets/sunny.jpeg";
import cold from "../assets/cold.jpeg";
import Descriptions from "../Homepage/Descriptions.jsx";
import { getFormattedWeatherData } from "../weatherService.js";

function WeatherDisplay() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBG] = useState(sunny);
  const [activity, setActivity] = useState(false);

  const activities = [
    {
      id: 0,
      name: "ACTIVITIES TO DO",
    },
    {
      id: 1,
      name: "jogging",
    },
    {
      id: 2,
      name: "running",
    },
    {
      id: 3,
      name: "bike-riding",
    },
    {
      id: 4,
      name: "dog-walking",
    },
    {
      id: 5,
      name: "walking",
    },
  ];

  const indoor_activities = [
    {
      id: 6,
      name: "ACTIVITIES TO DO",
    },
    {
      id: 7,
      name: "reading",
    },
    {
      id: 8,
      name: "knitting",
    },
    {
      id: 9,
      name: "baking",
    },
    {
      id: 10,
      name: "yoga",
    },
    {
      id: 11,
      name: "drawing",
    },
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);

      setWeather(data);

      // dynamic background
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) {
        setActivity(false);
        setBG(cold);
      } else {
        setBG(sunny);
        setActivity(true);
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnits(isCelcius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    // enter keycode
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <>
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {weather && (
            <div className="container">
              <div className="section section__inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City.."
                />

                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>
              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                  <h2>{new Date(weather.dt * 1000).toLocaleTimeString()}</h2>
                </div>
              </div>
              {/* bottom description */}
              <Descriptions weather={weather} units={units} />
              {activity
                ? activities.map(({ id, name }) => (
                    <div key={id} className="card-activity">
                      <h4>{name}</h4>
                    </div>
                  ))
                : indoor_activities.map(({ id, name }) => (
                    <div key={id} className="card-activity">
                      <h4>{name}</h4>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherDisplay;
