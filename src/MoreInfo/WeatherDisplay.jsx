import { useEffect, useState } from "react";
// import "./WeatherDisplay.css";
import sunny from "../assets/sunny.jpeg";
import cold from "../assets/final-snow.png";
import Descriptions from "../MoreInfo/Descriptions.jsx";
import { getFormattedWeatherData } from "../MoreInfo/weatherService.js";
import { FaLaptop } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { PiBooksLight } from "react-icons/pi";
import { GiJumpingRope } from "react-icons/gi";
import { FaDog } from "react-icons/fa6";
import { MdDirectionsBike } from "react-icons/md";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { FaRunning } from "react-icons/fa";

function WeatherDisplay({ location }) {
  // states defined which will be used accordingly as defined below
  const [city, setCity] = useState(location);
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [background, setBackground] = useState(sunny);
  const [activity, setActivity] = useState(false);

  // get the default browser location
  function handleCurrentLocation() {
    if (city == "") {
      try {
        //get browser data

        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then((permissionStatus) => {
              if (permissionStatus.state === "granted") {
                // Permission is granted
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    // Set latitude and longitude coords accordingly
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;

                    setCity({ latitude, longitude });
                    console.log("changed");
                  },
                  (error) => {
                    console.log(error.message);
                  }
                );
              } else if (permissionStatus.state === "prompt") {
                // Permission is not granted yet, but it can be requested
                console.log("Geolocation permission is not granted yet.");
                setCity({ latitude: "51.5072", longitude: "0.1276" });
              } else if (permissionStatus.state === "denied") {
                // Permission has been denied by the user
                console.log(
                  "Geolocation permission has been denied by the user."
                );
                // Set latitude and longitude coords to default london coords
                setCity({ latitude: "51.5072", longitude: "0.1276" });
              }
            });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  // useEffect will be called once and handleCurrentLocation() will be called
  useEffect(() => {
    handleCurrentLocation();
  }, []);

  // array defining out-door activities which user can perform based on the weather
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

  // array defining in-door activities which user can perform based on the weather
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

  // use-effect will be called everytime the user changes the weather units or location name
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city != "") {
        // data will be fetched from the API and assigned to the weather state
        const weatherData = await getFormattedWeatherData(city, units);
        setWeather(weatherData);

        // dynamic background for units based on the given temperature
        const threshold = units === "metric" ? 20 : 60;
        // based on the weather threshold, the background screen will be set to either a warm or cold background cover
        if (weatherData.temp <= threshold) {
          setActivity(false);
          setBackground(cold);
        } else {
          setBackground(sunny);
          setActivity(true);
        }
      } else {
        // if weather cannot be fetched, default weather will be displayed
        handleCurrentLocation();
      }
    };

    fetchWeatherData();
  }, [units, city]);

  // function to define weather click change.
  // weather will be displayed in celcius or Fahrenheight
  const handleUnitsClick = (e) => {
    console.log(city);
    // receive user button click
    const userbutton = e.currentTarget;
    // receive unit from button when clicked (either C or F)
    const currentUnit = userbutton.innerText.slice(1);

    // based on unit received, assign isCelcius variable to either true or false
    const isCelcius = currentUnit === "C";
    // based on whether isCelcius is true or false, assign the button the given unit value
    userbutton.innerText = isCelcius ? "°F" : "°C";
    // based on whether isCelcius is true or false, assign the unit to either metric or imperial
    setUnits(isCelcius ? "metric" : "imperial");
    console.log(city);
  };

  if (city != "") {
    return (
      <>
        <div className="outside-app-style">
          <div
            className="app-style"
            // display all info below based on assigned states above
            // background image will be displayed
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="overlay-style">
              {weather && (
                <div className="container">
                  <div className="section section__inputs_button">
                    {/* button to change between  Fahrenheight and Celcius */}
                    <h2>
                      Press the button to switch between Fahrenheight and
                      Celcius
                    </h2>
                    <button onClick={(e) => handleUnitsClick(e)}>°F</button>
                  </div>
                  <div className="section section__temperature_button">
                    <div className="icon">
                      {/* displaying the weather obtained from the API stored in the data state */}
                      <h2>Data Source: {`${weather.name}`}</h2>
                      {/* <h3>{locationName}</h3> */}
                      {/* displaying the given weather icon */}
                      <img src={weather.iconURL} alt="weatherIcon" />
                      {/* displaying the given weather description */}
                      <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {weather.description}
                      </h3>
                    </div>
                    <div className="temperature">
                      {/* displaying the weather temperature based on units being metric or imperial */}
                      <h1>{`${weather.temp.toFixed()} °${
                        units === "metric" ? "C" : "F"
                      }`}</h1>
                      <h2>
                        {/* formatting and displaying the date accordingly */}
                        {new Date(weather.dt * 1000).toLocaleTimeString()}
                      </h2>
                    </div>
                  </div>
                  {/* bottom description providing more info about the weather. rendered from a different component */}
                  <Descriptions weather={weather} units={units} />
                  {/* Listing activities below for user to perform based on thwe weather */}
                  <div className="activity-title">ACTIVITIES TO DO</div>
                  <div className="section section__descriptions">
                    {/* eithe outdoor activity will be displayed with name and icon or indoor activity will be displayed */}
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
}

export default WeatherDisplay;
