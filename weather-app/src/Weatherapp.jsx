import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Weatherapp.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog, WiDayCloudy, WiNightClear, WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from "weather-icons-react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={5} ref={ref} variant="filled" {...props} />;
});

function Weatherapp() {
  const [textInputData, settextInputData] = useState("");
  const [data, setdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("celsius");
  const apiKey = "5f114b623b2c42d49c3102625230807";

  // 👉 Removed default fetch
  useEffect(() => {
    // No default data on load
  }, []);

  const fetchWeather = (location) => {
    setLoading(true);
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
      )
      .then((res) => {
        setdata(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setdata(null);
        setLoading(false);
        if (err.response && err.response.status === 400) {
          setErrorMessage("Location not found. Please try another.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const handleChange = (e) => settextInputData(e.target.value);

  const handleClick = () => {
    if (!textInputData || textInputData.trim() === "") {
      setErrorMessage("Please enter a location name");
      setOpen(true);
      return;
    }
    fetchWeather(textInputData);
  };

  const toggleUnit = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  const getWeatherIcon = (code, isDay) => {
    switch (code) {
      case 1000: return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
      case 1003: return <WiDayCloudy size={80} />;
      case 1006:
      case 1009: return <WiCloudy size={80} />;
      case 1030:
      case 1135:
      case 1147: return <WiFog size={80} />;
      case 1063:
      case 1069:
      case 1072:
      case 1150:
      case 1153:
      case 1168:
      case 1171:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
      case 1240:
      case 1243:
      case 1246: return <WiRain size={80} />;
      case 1066:
      case 1114:
      case 1117:
      case 1204:
      case 1207:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
      case 1261:
      case 1264: return <WiSnow size={80} />;
      case 1087:
      case 1273:
      case 1276:
      case 1279:
      case 1282: return <WiThunderstorm size={80} />;
      default: return isDay ? <WiDaySunny size={80} /> : <WiNightClear size={80} />;
    }
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="main">
      <h1 className="app-title">Weather Forecast</h1>

      <div className="container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city or location"
            value={textInputData}
            onChange={handleChange}
            onKeyPress={(e) => e.key === 'Enter' && handleClick()}
          />
          <button
            className="btn"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* 👇 Show weather only after search */}
        {data && (
          <div className="weather-info">
            <div className="location-info">
              <h2 className="city">
                {data.location.name}, {data.location.country}
              </h2>
              <p className="date">{formatDate(data.location.localtime)}</p>
              <p className="time">{formatTime(data.location.localtime)}</p>
            </div>

            <div className="weather-main">
              <div className="temperature-container">
                <div className="temperature-display">
                  <span className="temperature">
                    {unit === "celsius" ? data.current.temp_c : data.current.temp_f}°
                    <span className="unit" onClick={toggleUnit}>
                      {unit === "celsius" ? "C" : "F"}
                    </span>
                  </span>
                  <div className="weather-icon">
                    {getWeatherIcon(data.current.condition.code, data.current.is_day)}
                  </div>
                </div>
                <p className="condition">{data.current.condition.text}</p>
                <p className="feels-like">
                  <WiThermometer size={24} /> Feels like: {unit === "celsius" ? data.current.feelslike_c : data.current.feelslike_f}°
                </p>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <WiHumidity size={32} />
                  <span>Humidity</span>
                  <span className="detail-value">{data.current.humidity}%</span>
                </div>
                <div className="detail-item">
                  <WiStrongWind size={32} />
                  <span>Wind</span>
                  <span className="detail-value">{data.current.wind_kph} km/h</span>
                </div>
                <div className="detail-item">
                  <WiBarometer size={32} />
                  <span>Pressure</span>
                  <span className="detail-value">{data.current.pressure_mb} mb</span>
                </div>
                <div className="detail-item">
                  <span>🌬️</span>
                  <span>Wind Dir</span>
                  <span className="detail-value">{data.current.wind_dir}</span>
                </div>
                <div className="detail-item">
                  <span>👁️</span>
                  <span>Visibility</span>
                  <span className="detail-value">{data.current.vis_km} km</span>
                </div>
                <div className="detail-item">
                  <span>☂️</span>
                  <span>Precipitation</span>
                  <span className="detail-value">{data.current.precip_mm} mm</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Weatherapp;
