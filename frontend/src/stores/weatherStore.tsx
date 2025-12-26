import { create } from "zustand";
import axios from "axios";

interface WeatherData {
  provider: string;
  data: any;
}

interface WeatherState {
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  fetchWeather: async (city: string) => {
    try {
      const geoRes = await axios.get(
        `${import.meta.env.VITE_API_BASE}/weather/geocode?q=${encodeURIComponent(city)}`
      );

      const location = geoRes.data?.results?.[0];
      if (!location) {
        console.error("No location found for", city);
        return;
      }

      const { latitude: lat, longitude: lon } = location;

      const weatherRes = await axios.get(
        `${import.meta.env.VITE_API_BASE}/weather/forecast?lat=${lat}&lon=${lon}`
      );

      set({ weather: weatherRes.data });
    } catch (err) {
      console.error("Weather fetch failed:", err);
    }
  },
}));
