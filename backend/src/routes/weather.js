const express = require("express");
const router = express.Router();
const {
  fetchOpenMeteo,
  fetchOpenWeather,
  fetchWeatherAPI,
} = require("../utils/weatherClients");

router.get("/geocode", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "q required" });
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      q
    )}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/forecast", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon)
    return res.status(400).json({ error: "lat & lon required" });
  try {
    if (process.env.WEATHERAPI_KEY) {
        const q = `${lat},${lon}`;
        const json = await fetchWeatherAPI(q, process.env.WEATHERAPI_KEY);
        return res.json({ provider: "weatherapi", data: json });
    }
    
    if (process.env.OPENWEATHER_API_KEY) {
        console.log('bvb:',process.env.OPENWEATHER_API_KEY)
      const json = await fetchOpenWeather(
        lat,
        lon,
        process.env.OPENWEATHER_API_KEY
      );
      return res.json({ provider: "openweather", data: json });
    }
    const json = await fetchOpenMeteo(lat, lon);
    return res.json({ provider: "open-meteo", data: json });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
