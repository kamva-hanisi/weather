const apiKey = "1e3e8f230b6064d27976e41163a82b77";
const assetPath = "src/assets";

const weatherIcons = {
  Rain: `${assetPath}/rain.png`,
  Drizzle: `${assetPath}/rain.png`,
  Clear: `${assetPath}/sun.png`,
  Snow: `${assetPath}/snow.png`,
  Clouds: `${assetPath}/cloud.png`,
  Smoke: `${assetPath}/cloud.png`,
  Mist: `${assetPath}/mist.png`,
  Fog: `${assetPath}/mist.png`,
  Haze: `${assetPath}/mist.png`,
  Thunderstorm: `${assetPath}/thunderstorm.png`,
};

const defaultCities = [
  "Johannesburg",
  "Pretoria",
  "Durban",
  "Port Elizabeth",
  "Bloemfontein",
  "Nelspruit",
  "King William's Town",
  "Cape Town",
];

const searchInput = document.querySelector(".searchinput");
const cityBox = document.querySelector(".city-box");
const normalMessage = document.querySelector(".normal-message");
const errorMessage = document.querySelector(".error-message");
const addedMessage = document.querySelector(".added-message");
const dateElement = document.querySelector(".date");
const addSection = document.querySelector(".add-section");
const addButton = document.querySelector(".button");
const addButtonIcon = document.querySelector(".btn-icon");

let weatherList = document.querySelector(".box");

function setDate() {
  const now = new Date();
  dateElement.textContent = now.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function setMessage(type) {
  normalMessage.style.display = type === "normal" ? "block" : "none";
  errorMessage.style.display = type === "error" ? "block" : "none";
  addedMessage.style.display = type === "added" ? "block" : "none";
}

function getWeatherList() {
  if (!weatherList) {
    weatherList = document.createElement("div");
    weatherList.className = "box";
    cityBox.appendChild(weatherList);
  }

  return weatherList;
}

function iconFor(condition) {
  return weatherIcons[condition] || `${assetPath}/sky.png`;
}

function createWeatherCard(data) {
  const weatherBox = document.createElement("article");
  weatherBox.className = "weather-box";

  const nameDiv = document.createElement("div");
  nameDiv.className = "name";

  const cityElement = document.createElement("div");
  cityElement.className = "city-name city";
  cityElement.textContent = data.name;

  const tempElement = document.createElement("div");
  tempElement.className = "weather-temp temp";
  tempElement.textContent = `${Math.round(data.main.temp)}\u00b0`;

  const weatherIconDiv = document.createElement("div");
  weatherIconDiv.className = "weather-icon";

  const weatherImg = document.createElement("img");
  const condition = data.weather?.[0]?.main || "Clouds";
  weatherImg.className = "weather";
  weatherImg.src = iconFor(condition);
  weatherImg.alt = `${condition} weather`;

  weatherIconDiv.appendChild(weatherImg);
  nameDiv.append(cityElement, tempElement);
  weatherBox.append(nameDiv, weatherIconDiv);

  return weatherBox;
}

async function getCityWeather(cityName) {
  const city = cityName.trim();

  if (!city) {
    return null;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(
      city
    )}&appid=${apiKey}`
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function addCity(cityName, addToTop = false) {
  try {
    const data = await getCityWeather(cityName);

    if (!data) {
      return false;
    }

    const card = createWeatherCard(data);
    const list = getWeatherList();

    if (addToTop) {
      list.prepend(card);
    } else {
      list.appendChild(card);
    }

    return true;
  } catch (error) {
    return false;
  }
}

function toggleAddSection() {
  const isOpen = addSection.classList.toggle("is-open");
  addButtonIcon.classList.toggle("fa-circle-plus", !isOpen);
  addButtonIcon.classList.toggle("fa-circle-xmark", isOpen);
}

addButton.addEventListener("click", toggleAddSection);

searchInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const wasAdded = await addCity(searchInput.value, true);
  setMessage(wasAdded ? "added" : "error");

  if (wasAdded) {
    searchInput.value = "";
  }
});

setDate();
setMessage("normal");
defaultCities.forEach((city) => addCity(city));
