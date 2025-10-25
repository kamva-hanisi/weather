import React from "react";
import sky from "../assets/sky.png";
// import "./script/search.js";
import "../components/Style/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHalf,
  faWind,
  faDroplet,
  faSun,
  faCloudSun,
  faLocationDot,
  faLocationArrow,
  faMagnifyingGlass,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";

const SearchWeather = () => {
  return (
    <div id="screen">
      {/* main section */}
      <h3>Search For City</h3>

      {/* search */}
      <div className="Search">
        <div className="Search-icon">
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <input className="Searchinput" type="text" placeholder="search..." />
      </div>

      {/* message */}
      <div className="Message">
        <p>You have the option to search by city, state, or country names.</p>
      </div>

      {/* error message */}
      <div className="error-message">
        <p>
          One of the specified locations (city, state, or country) was not
          found. Please try again
        </p>
      </div>

      {/* weather */}
      <div className="return">
        <div className="box">
          <div className="weather-box">
            <div className="name">
              <div className="city-name">Landon</div>
              <div className="weather-temp">20°</div>
            </div>
            <div className="weather-icon">
              <img className="weather-img" src={sky} alt="weather" />
            </div>
          </div>

          {/* row 1 */}
          <div className="weather-desc">
            <div className="desc-box">
              <div className="desc-icon">
                <FontAwesomeIcon icon={faWind} />
              </div>
              <div className="desc-name">Wind</div>
              <div className="desc-info wind">15 m/s</div>
            </div>

            <div className="desc-box">
              <div className="desc-icon">
                <FontAwesomeIcon icon={faTemperatureHalf} />
              </div>
              <div className="desc-name">Pressure</div>
              <div className="desc-info pressure">15 mbar</div>
            </div>

            <div className="desc-box">
              <div className="desc-icon">
                <FontAwesomeIcon icon={faDroplet} />
              </div>
              <div className="desc-name">Humidity</div>
              <div className="desc-info humidity">50%</div>
            </div>
          </div>

          {/* row 2 */}
          <div className="weather-desc">
            <div className="desc-box">
              <div className="desc-icon">
                <FontAwesomeIcon icon={faSun} />
              </div>
              <div className="desc-name">Sun Rise</div>
              <div className="desc-info sunrise">12:00:00</div>
            </div>

            <div className="desc-box">
              <div className="desc-icon">
                <FontAwesomeIcon icon={faCloudSun} />
              </div>
              <div className="desc-name">Sun Set</div>
              <div className="desc-info sunset">12:00:00</div>
            </div>
          </div>
        </div>
      </div>

      {/* nav section */}
      <nav>
        <ul>
          <li>
            <a href="/">
              <FontAwesomeIcon icon={faLocationArrow} />
            </a>
          </li>
          <li>
            <a className="active" href="/search">
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
};

export default SearchWeather;
