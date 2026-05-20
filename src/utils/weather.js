import cloudIcon from "../assets/cloud.png";
import mistIcon from "../assets/mist.png";
import rainIcon from "../assets/rain.png";
import skyIcon from "../assets/sky.png";
import snowIcon from "../assets/snow.png";
import sunIcon from "../assets/sun.png";
import thunderstormIcon from "../assets/thunderstorm.png";

export const API_KEY = "1e3e8f230b6064d27976e41163a82b77";

const iconMap = {
  Clear: sunIcon,
  Clouds: cloudIcon,
  Drizzle: rainIcon,
  Fog: mistIcon,
  Haze: mistIcon,
  Mist: mistIcon,
  Rain: rainIcon,
  Smoke: cloudIcon,
  Snow: snowIcon,
  Thunderstorm: thunderstormIcon,
};

export function getWeatherIcon(condition) {
  return iconMap[condition] || skyIcon;
}

export async function fetchCurrentWeather(city) {
  const query = city.trim();

  if (!query) {
    throw new Error("Please enter a city name.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(
      query
    )}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("City not found.");
  }

  return response.json();
}

export async function fetchForecast(city) {
  const query = city.trim();

  if (!query) {
    throw new Error("Please enter a city name.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${encodeURIComponent(
      query
    )}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Forecast not found.");
  }

  return response.json();
}

export async function fetchForecastByCoords(latitude, longitude) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Forecast not found.");
  }

  return response.json();
}

export function buildDailyForecast(list) {
  const byDate = new Map();

  list.forEach((item) => {
    const [date] = item.dt_txt.split(" ");

    if (!byDate.has(date)) {
      byDate.set(date, {
        date,
        day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        condition: item.weather[0].main,
      });
    }
  });

  return Array.from(byDate.values()).slice(0, 5);
}

export function formatTime(unixTime) {
  return new Date(unixTime * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
