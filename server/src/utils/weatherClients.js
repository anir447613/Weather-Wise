// Thin wrapper for multiple weather providers. By default we use Open-Meteo (no key).
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));


async function fetchOpenMeteo(lat, lon) {
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`;
const r = await fetch(url);
return r.json();
}

async function fetchOpenWeather(lat, lon, apiKey) {
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=${apiKey}`;
const r = await fetch(url);
return r.json();
}

async function fetchWeatherAPI(q, apiKey) {
const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(q)}&days=7`;
const r = await fetch(url);
return r.json();
}

module.exports = { fetchOpenMeteo, fetchOpenWeather, fetchWeatherAPI };