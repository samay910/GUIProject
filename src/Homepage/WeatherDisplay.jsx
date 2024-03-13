import { useEffect, useState } from "react";
// import "./WeatherDisplay.css";
import sunny from "../assets/sunny.jpeg";
import cold from "../assets/cold.jpeg";
import Descriptions from "../Homepage/Descriptions.jsx";
import { getFormattedWeatherData } from "../weatherService.js";
import { FaLaptop } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { PiBooksLight } from "react-icons/pi";
import { GiJumpingRope } from "react-icons/gi";
import { FaDog } from "react-icons/fa6";
import { MdDirectionsBike } from "react-icons/md";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { FaRunning } from "react-icons/fa";

function WeatherDisplay({ location }) {
  const [city, setCity] = useState(location);
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBG] = useState(sunny);
  const [activity, setActivity] = useState(false);

  const activities = [
    {
      id: 1,
      name: "Jogging",
      icon: <MdOutlineDirectionsRun />,
    },
    {
      id: 2,
      name: "Running",
      icon: <FaRunning />,
    },
    {
      id: 3,
      name: "Bike-Riding",
      icon: <MdDirectionsBike />,
    },
    {
      id: 4,
      name: "Dog-Walking",
      icon: <FaDog />,
    },
  ];

  const indoor_activities = [
    {
      id: 7,
      name: "Reading",
      icon: <PiBooksLight />,
    },
    {
      id: 8,
      name: "Studying",
      icon: <TfiWrite />,
    },
    {
      id: 9,
      name: "Remote-Working",
      icon: <FaLaptop />,
    },
    {
      id: 10,
      name: "Indoor-Exercise",
      icon: <GiJumpingRope />,
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
      <div className="outside-app">
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
                <div className="activity-title">ACTIVITIES TO DO</div>
                <div className="section section__descriptions">
                  {activity
                    ? activities.map(({ id, name, icon }) => (
                        <div key={id} className="card">
                          <div className="activity-format">
                            <small className="description__card-icon">
                              {icon}
                            </small>
                            <small>{name}</small>
                          </div>
                        </div>
                      ))
                    : indoor_activities.map(({ id, name, icon }) => (
                        <div key={id} className="card">
                          <div className="activity-format">
                            <small className="description__card-icon">
                              {icon}
                            </small>
                            <small>{name}</small>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WeatherDisplay;
