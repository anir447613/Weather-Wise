import React, { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useWeatherStore } from "../stores/weatherStore";
import SearchBox from "../components/SearchBox";
import { WeatherCard } from "./WeatherCard";
import { LogOut, CloudSun } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const { weather, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather("London"); // Default city
  }, [fetchWeather]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-200 to-pink-200 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-30 blur-3xl rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300 opacity-30 blur-3xl rounded-full translate-x-16 translate-y-16" />

      <div className="relative backdrop-blur-2xl bg-white/20 border border-white/40 rounded-3xl shadow-2xl w-full max-w-5xl p-8 transition-all duration-500 hover:bg-white/30">
        <header className="flex justify-between items-center mb-10 border-b border-white/40 pb-4">
          <div className="flex items-center gap-3">
            <CloudSun className="w-8 h-8 text-blue-600 drop-shadow-sm" />
            <h1 className="text-3xl font-extrabold text-gray-800 drop-shadow-sm tracking-tight">
              Weather Wise
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-gray-700 text-sm sm:text-base">
              Hi,{" "}
              <span className="font-semibold text-gray-900">{user?.name}</span>
            </p>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500/90 text-white px-4 py-2 rounded-xl font-medium shadow-md hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        <div className="flex justify-center mb-10">
          <div className="w-full sm:w-96">
            <SearchBox onSearch={fetchWeather} />
          </div>
        </div>

        {weather ? (
          <div className="animate-fadeIn">
            <WeatherCard data={weather.data as any} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg font-medium animate-pulse">
              Loading weather data...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
