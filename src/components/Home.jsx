import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  buildDailyForecast,
  fetchForecast,
  fetchForecastByCoords,
  getWeatherIcon,
} from "../utils/weather";
import "../components/Style/Home.css";

const fallbackCity = "Johannesburg";

function Home() {
  const [forecast, setForecast] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [status, setStatus] = useState("Loading weather...");

  useEffect(() => {
    let isMounted = true;

    async function loadForecast(loader) {
      try {
        const data = await loader();

        if (!isMounted) {
          return;
        }

        setForecast(data);
        setDailyForecast(buildDailyForecast(data.list));
        setStatus("");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus("Could not load live weather. Showing Johannesburg instead.");
        const data = await fetchForecast(fallbackCity);

        if (isMounted) {
          setForecast(data);
          setDailyForecast(buildDailyForecast(data.list));
          setStatus("");
        }
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadForecast(() =>
            fetchForecastByCoords(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        },
        () => loadForecast(() => fetchForecast(fallbackCity)),
        { timeout: 6000 }
      );
    } else {
      loadForecast(() => fetchForecast(fallbackCity));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const current = forecast?.list?.[0];
  const today = dailyForecast[0];
  const condition = current?.weather?.[0]?.main || "Clear";
  const description = current?.weather?.[0]?.description || "Sunny";

  return (
    <main className="page-screen home-screen">
      <div className="home-city">
        <FontAwesomeIcon icon={faLocationDot} />
        <h1>{forecast?.city?.name || fallbackCity}</h1>
      </div>

      {status && <p className="status-message home-status">{status}</p>}

      <div className="weather-icon-css">
        <img src={getWeatherIcon(condition)} alt={`${condition} weather`} />
      </div>

      <section className="weather-description" aria-label="Current weather">
        <div className="show-metric">
          {current ? Math.round(current.main.temp) : 0}
          <span>&deg;</span>
        </div>
        <div className="weather-details">
          <div className="weather-main">{description}</div>
          <div className="h-f">
            <div>H: {current ? Math.round(current.main.humidity) : 0}%</div>
            <span>|</span>
            <div>F: {current ? Math.round(current.main.feels_like) : 0}&deg;</div>
          </div>
        </div>
      </section>

      <section className="forcasts-box" aria-label="Forecast">
        <div className="today-forecast">
          <h4>TODAY</h4>
          <div className="weather-icon-today">
            <img src={getWeatherIcon(today?.condition)} alt="Today weather" />
          </div>
          <div className="temp-today">
            <span>{today?.temp ?? 0}&deg;</span>
          </div>
          <div className="weather-main-today">
            {today?.description || description}
          </div>
        </div>

        <div className="future-forecast">
          <h5>5-DAY FORECAST</h5>
          <div className="future-forecast-box">
            {dailyForecast.map((day) => (
              <div className="weather-forecast-box" key={day.date}>
                <div className="day-weather">{day.day}</div>
                <div className="weather-icon-forecast">
                  <img src={getWeatherIcon(day.condition)} alt={day.condition} />
                </div>
                <div className="temp-weather">{day.temp}&deg;</div>
                <div className="weather-main-forecast">{day.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
