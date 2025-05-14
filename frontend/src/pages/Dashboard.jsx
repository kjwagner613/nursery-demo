import React, { useEffect, useState, useContext } from 'react';
import UserContext from "../context/UserContext";
import "../../src/index.css"

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?latitude=42.2057&longitude=-121.7217&daily=sunrise,sunset,uv_index_max,uv_index_clear_sky_max,daylight_duration,sunshine_duration,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,shortwave_radiation_sum&hourly=uv_index&current=temperature_2m,is_day,precipitation,cloud_cover&timezone=America%2FLos_Angeles&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&temporal_resolution=hourly_3";

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(WEATHER_API_URL);
    fetch(WEATHER_API_URL)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Extract current and today's daily data
  const current = weather?.current;
  const daily = weather?.daily;
  const todayIdx = 0; // first day in daily arrays

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Hello {useContext(UserContext)?.first}</h2>
      {loading && <p>Loading weather...</p>}
      {weather && (
        <div className="widget-container">
          <div className="weather-widget" style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, maxWidth: 350, margin: "1em 0" }}>
            <h2>Current Weather</h2>
            {current ? (
              <div>
                <div style={{ fontSize: 32, fontWeight: "bold" }}>
                  {current.temperature_2m}°F
                </div>
                <div>Precipitation: {current.precipitation} in</div>
                <div>Cloud Cover: {current.cloud_cover}%</div>
                <div>Daytime: {current.is_day ? "Yes" : "No"}</div>
              </div>
            ) : (
              <div>No current weather data available.</div>
            )}
            {daily && (
              <div style={{ marginTop: 16 }}>
                <h3>Today's Highlights</h3>
                <div>Sunrise: {daily.sunrise?.[todayIdx]}</div>
                <div>Sunset: {daily.sunset?.[todayIdx]}</div>
                <div>Max Temp: {daily.temperature_2m_max?.[todayIdx]}°F</div>
                <div>Min Temp: {daily.temperature_2m_min?.[todayIdx]}°F</div>
                <div>UV Index Max: {daily.uv_index_max?.[todayIdx]}</div>
                <div>Wind Speed Max: {daily.wind_speed_10m_max?.[todayIdx]} mph</div>
                <div>Wind Gusts Max: {daily.wind_gusts_10m_max?.[todayIdx]} mph</div>
                <div>Sunshine Duration: {daily.sunshine_duration?.[todayIdx]} min</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;