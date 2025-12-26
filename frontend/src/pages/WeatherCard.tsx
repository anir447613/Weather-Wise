import React from "react";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    pressure_mb: number;
    vis_km: number;
    wind_kph: number;
    wind_dir: string;
    condition: { text: string; icon: string };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: { text: string };
      };
      hour: {
        time: string;
        temp_c: number;
        condition: { text: string; icon: string };
        chance_of_rain: number;
      }[];
    }[];
  };
}

interface Props {
  data: WeatherData;
}

export const WeatherCard: React.FC<Props> = ({ data }) => {
  const { location, current, forecast } = data;
  const today = forecast.forecastday[0];
  const next12Hours = today.hour.slice(0, 12);

  return (
      <div className="w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] backdrop-blur-2xl bg-white/20 border border-white/40 rounded-3xl shadow-2xl md:p-6 xs:p-0 overflow-y-auto m-auto ">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 drop-shadow-sm">
              {location.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {location.region}, {location.country}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Local time: {location.localtime}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={current.condition.icon}
              alt="weather icon"
              className="w-16 sm:w-20 h-16 sm:h-20 drop-shadow-lg"
            />
            <div className="text-right">
              <p className="text-4xl sm:text-6xl font-semibold text-gray-800">
                {current.temp_c}°C
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                {current.condition.text}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-sm border border-white/40">
          <table className="w-full backdrop-blur-md bg-white/30">
            <tbody className="text-sm sm:text-base text-gray-700">
              <tr className="hover:bg-white/40 transition">
                <td className="p-3 font-semibold">💨 Wind</td>
                <td className="p-3">
                  {current.wind_kph} km/h {current.wind_dir}
                </td>
                <td className="p-3 font-semibold">💧 Humidity</td>
                <td className="p-3">{current.humidity}%</td>
              </tr>
              <tr className="hover:bg-white/40 transition">
                <td className="p-3 font-semibold">🌡️ Feels Like</td>
                <td className="p-3">{current.feelslike_c}°C</td>
                <td className="p-3 font-semibold">📈 Pressure</td>
                <td className="p-3">{current.pressure_mb} mb</td>
              </tr>
              <tr className="hover:bg-white/40 transition">
                <td className="p-3 font-semibold">👁️ Visibility</td>
                <td className="p-3">{current.vis_km} km</td>
                <td className="p-3 font-semibold">🌤️ Max / Min</td>
                <td className="p-3">
                  {today.day.maxtemp_c}° / {today.day.mintemp_c}°
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mt-10 mb-4 text-gray-800 text-center sm:text-left">
          🌈 Next 12 Hours
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {next12Hours.map((hour, idx) => (
            <div
              key={idx}
              className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 sm:p-5 text-center hover:bg-white/60 transition duration-300 shadow-sm"
            >
              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                {hour.time.split(" ")[1]}
              </p>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto drop-shadow-sm"
              />
              <p className="text-base sm:text-lg font-semibold mt-1">
                {hour.temp_c}°C
              </p>

              <div className="w-full h-2 bg-white/30 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(hour.temp_c / today.day.maxtemp_c) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-[10px] sm:text-xs text-blue-600 mt-1">
                💧 {hour.chance_of_rain}%
              </p>
            </div>
          ))}
        </div>
      </div>
  );
};
