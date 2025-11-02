import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useWeatherStore } from "../stores/weatherStore";
import SearchBox from "../components/SearchBox";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { weather, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather("London"); // default city
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-800">
          WeatherWise Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Hello, {user?.name}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <SearchBox onSearch={fetchWeather} />

      {weather ? (
        <div className="mt-8 bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-blue-700">
            {weather.location.name}, {weather.location.country}
          </h2>
          <p className="text-4xl mt-4 font-bold text-gray-800">
            {weather.current.temp_c}°C
          </p>
          <p className="text-gray-600 mt-2">
            {weather.current.condition.text}
          </p>
          <img
            src={weather.current.condition.icon}
            alt="Weather icon"
            className="mx-auto mt-4"
          />
        </div>
      ) : (
        <p className="text-gray-500 mt-10">Loading weather data...</p>
      )}
    </div>
  );
}
