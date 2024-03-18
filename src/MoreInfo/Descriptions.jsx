import React from "react";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import { WiSunrise, WiSunset } from "react-icons/wi";

import "./Descriptions.css";

const Descriptions = ({ weather, units }) => {
  // defining the different units for temperature and wind that our app will show
  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  // objects will be defined for the more-info features being displayed
  const moreInfoCards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      unit: tempUnit,
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
    {
      id: 7,
      icon: <WiSunrise />,
      title: "sunrise",
      data: new Date(weather.sunrise * 1000).toLocaleTimeString(),
      unit: "",
    },
    {
      id: 8,
      icon: <WiSunset />,
      title: "sunset",
      data: new Date(weather.sunset * 1000).toLocaleTimeString(),
      unit: "",
    },
  ];

  return (
    <div className="section section__descriptions">
      {/* displaying all the icons onto the screen with id, icon, title, data, unit of measurement */}
      {moreInfoCards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="description__card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Descriptions;
