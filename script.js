async function getWeather(event) {
  if (event) {
    event.preventDefault();
  }

  const input = document.querySelector("input");
  const cityDiv = document.querySelector("#city");
  const tempDiv = document.querySelector("#temp");
  const weatherDiv = document.querySelector("#weather");

  const city = input.value.trim();

  if (city === "") {
    cityDiv.innerText = "Please enter a city name";
    tempDiv.innerText = "";
    weatherDiv.innerText = "";
    return;
  }

  try {
    cityDiv.innerText = "Loading....";
    tempDiv.innerText = "";
    weatherDiv.innerText = "";

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not Found");
    }

    const { latitude, longitude, name } = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
    );
    const weatherData = await weatherResponse.json();

    cityDiv.innerText = name;
    tempDiv.innerText = weatherData.current.temperature_2m + " °C  ";
    weatherDiv.innerText =
      " Wind: " + weatherData.current.wind_speed_10m + " km/h ";
  } catch (error) {
    cityDiv.innerText = error.message;
    tempDiv.innerText = "";
    weatherDiv.innerText = "";
  }
}
