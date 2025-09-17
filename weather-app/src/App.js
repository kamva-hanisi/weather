import React from "react";
import "./style.css";
import sunIcon from "../public/images/sun.png";

function App() {
  return (
    <div id="screen">
      {/* City name */}
      <div className="city-name">
        <i className="fa-solid fa-location-dot"></i>
        <h1 id="city-name">Gauteng</h1>
      </div>

      {/* Weather icon */}
      <div className="weather-icon-css">
        <img className="weather-icon" src={sunIcon} alt="Sunny weather icon" />
      </div>

      {/* Details */}
      <div className="weather-description">
        <div className="show-metric" id="metric">
          0°
        </div>
        <div className="weather-details">
          <div className="weather-main" id="weather-main">
            Sunshine
          </div>
          <div className="h-f">
            <div className="show-humidity">
              H: <span id="humidity">55</span>
            </div>
            ||
            <div className="show-humidity">
              F: <span id="feels-like">55</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forecasts */}
      <div className="forcasts-box">
        <div className="today-forecast">
          <h4>TODAY</h4>
          <div className="weather-icon-today">
            <img
              className="weather-icons"
              src={sunIcon}
              alt="Sunny weather icon"
            />
          </div>
          <div className="temp-today">
            <span id="temp-min-today">36°</span>
            <span>/ </span>
            <span id="temp-max-today">40°</span>
          </div>
          <div className="weather-main-today" id="weather-main">
            Sunshine
          </div>
        </div>

        <div className="future-forecast">
          <h5>4-DAYS FORECAST</h5>
          <div id="future-forecast-box"></div>
        </div>
      </div>

      {/* Nav */}
      <nav>
        <ul>
          <li>
            <a className="active" href="#home">
              <i className="fa-solid fa-location-arrow"></i>
            </a>
          </li>
          <li>
            <a href="#search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </li>
          <li>
            <a href="#globe">
              <i className="fa-solid fa-earth-americas"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
