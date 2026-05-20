import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { fetchCurrentWeather, getWeatherIcon } from "../utils/weather";
import "../components/Style/globe.css";

const defaultCities = [
  "Johannesburg",
  "Pretoria",
  "Durban",
  "Port Elizabeth",
  "Bloemfontein",
  "Nelspruit",
  "Cape Town",
];

function Globe() {
  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState("Search your city to add");
  const [messageType, setMessageType] = useState("normal");

  useEffect(() => {
    let isMounted = true;

    async function loadDefaultCities() {
      const results = await Promise.allSettled(
        defaultCities.map((city) => fetchCurrentWeather(city))
      );

      if (isMounted) {
        setCities(
          results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value)
        );
      }
    }

    loadDefaultCities();

    return () => {
      isMounted = false;
    };
  }, []);

  async function addCity(event) {
    event.preventDefault();

    try {
      const data = await fetchCurrentWeather(query);
      setCities((currentCities) => [data, ...currentCities]);
      setQuery("");
      setMessage("Successfully added");
      setMessageType("added");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  }

  const today = new Date().toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="page-screen globe-screen">
      <div className="section">
        <div className="date">{today}</div>
        <button
          className="button"
          type="button"
          onClick={() => setIsAdding((current) => !current)}
          aria-label={isAdding ? "Close add city" : "Add city"}
        >
          <FontAwesomeIcon
            icon={isAdding ? faCircleXmark : faCirclePlus}
            className="btn-icon"
          />
        </button>
      </div>

      <div className="section-box">
        <div className={isAdding ? "add-section is-open" : "add-section"}>
          <div className="add-section-title">
            <h2>Add a new place</h2>
          </div>

          <form className="search" onSubmit={addCity}>
            <div className="search-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <input
              className="searchinput"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="search..."
            />
          </form>

          <div className={`messages ${messageType}`}>{message}</div>
        </div>
      </div>

      <section className="city-box" aria-label="Saved weather places">
        <div className="box">
          {cities.map((city) => {
            const condition = city.weather[0].main;

            return (
              <article className="weather-box" key={`${city.id}-${city.name}`}>
                <div className="name">
                  <div className="city-name city">{city.name}</div>
                  <div className="weather-temp temp">
                    {Math.round(city.main.temp)}&deg;
                  </div>
                </div>
                <div className="weather-icon">
                  <img
                    className="weather"
                    src={getWeatherIcon(condition)}
                    alt={`${condition} weather`}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Globe;
