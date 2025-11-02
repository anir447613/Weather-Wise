import { create } from "zustand";
import axios from "axios";

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
  };
}

interface WeatherState {
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  fetchWeather: async (city: string) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      set({ weather: res.data });
    } catch (err) {
      console.error("Weather fetch failed:", err);
    }
  },
}));
