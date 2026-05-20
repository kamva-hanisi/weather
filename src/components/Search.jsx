import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faDroplet,
  faLocationDot,
  faSun,
  faTemperatureHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchCurrentWeather,
  formatTime,
  getWeatherIcon,
} from "../utils/weather";
import "../components/Style/Search.css";

const SearchWeather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState(
    "Search by city, state, or country name."
  );
  const [hasError, setHasError] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    setStatus("Searching...");
    setHasError(false);

    try {
      const data = await fetchCurrentWeather(query);
      setWeather(data);
      setStatus("");
      setQuery("");
    } catch (error) {
      setWeather(null);
      setStatus(error.message);
      setHasError(true);
    }
  }

  const condition = weather?.weather?.[0]?.main || "Clear";

  return (
    <main className="page-screen search-screen">
      <h3>Search For City</h3>

      <form className="Search" onSubmit={handleSearch}>
        <div className="Search-icon">
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <input
          className="Searchinput"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="search..."
        />
      </form>

      {status && (
        <div className={hasError ? "search-message is-error" : "search-message"}>
          <p>{status}</p>
        </div>
      )}

      {weather && (
        <section className="return" aria-label="Weather search result">
          <div className="box">
            <div className="weather-box">
              <div className="name">
                <div className="city-name">{weather.name}</div>
                <div className="weather-temp">
                  {Math.round(weather.main.temp)}&deg;
                </div>
              </div>
              <div className="weather-icon">
                <img
                  className="weather-img"
                  src={getWeatherIcon(condition)}
                  alt={`${condition} weather`}
                />
              </div>
            </div>

            <div className="weather-desc">
              <div className="desc-box">
                <div className="desc-icon">
                  <FontAwesomeIcon icon={faWind} />
                </div>
                <div className="desc-name">Wind</div>
                <div className="desc-info">{Math.round(weather.wind.speed)} m/s</div>
              </div>

              <div className="desc-box">
                <div className="desc-icon">
                  <FontAwesomeIcon icon={faTemperatureHalf} />
                </div>
                <div className="desc-name">Pressure</div>
                <div className="desc-info">{weather.main.pressure} hPa</div>
              </div>

              <div className="desc-box">
                <div className="desc-icon">
                  <FontAwesomeIcon icon={faDroplet} />
                </div>
                <div className="desc-name">Humidity</div>
                <div className="desc-info">{weather.main.humidity}%</div>
              </div>
            </div>

            <div className="weather-desc">
              <div className="desc-box">
                <div className="desc-icon">
                  <FontAwesomeIcon icon={faSun} />
                </div>
                <div className="desc-name">Sun Rise</div>
                <div className="desc-info">{formatTime(weather.sys.sunrise)}</div>
              </div>

              <div className="desc-box">
                <div className="desc-icon">
                  <FontAwesomeIcon icon={faCloudSun} />
                </div>
                <div className="desc-name">Sun Set</div>
                <div className="desc-info">{formatTime(weather.sys.sunset)}</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchWeather;
