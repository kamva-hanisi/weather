import React from "react";
import "./script/main.js";
import sunIcon from "../assets/sun.png";
import "../components/Style/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faLocationArrow,
  faMagnifyingGlass,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div id="screen">
      {/* City name */}
      <div className="city-name">
        <FontAwesomeIcon icon={faLocationDot} />
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

      <nav>
        <ul>
          <li>
            <a className="active" href="/">
              <FontAwesomeIcon icon={faLocationArrow} />
            </a>
          </li>
          <li>
            <a href="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
          </li>
          <li>
            <a href="/globe">
              <FontAwesomeIcon icon={faEarthAmericas} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
