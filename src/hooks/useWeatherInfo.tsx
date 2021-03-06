import { useState, useCallback } from "react";
import axios from "axios";

//custom types
import { WeatherInfoTypes, WeatherSearchTypes } from "../constants/types";

type GetWeatherFuncType = (
  criteria: WeatherSearchTypes,
  callback?: (weatherInfo: WeatherInfoTypes) => void
) => void;

export const useWeatherInfo = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherInfo: GetWeatherFuncType = async (criteria, callback) => {
    //toggle loading spinner
    setIsLoading(true);
    if (!criteria.city) {
      setError("Please enter a city name");
      return;
    }

    try {
      //get geolocation of city and country
      const geoLocate = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${criteria.city}, ${criteria.country}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      if (geoLocate.data.length) {
        const { lat, lon, name } = geoLocate.data[0];

        //get weather info using geolocation
        const info = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );

        //format data
        if (info.data) {
          const {
            main: { temp_max, temp_min, humidity },
            weather,
            sys: { country },
            dt,
            timezone,
          } = info.data;

          const newWeatherInfo = {
            temp_max,
            temp_min,
            humidity,
            weather,
            country,
            name,
            dateTime: new Date(dt * 1000 + timezone * 1000),
          };

          setWeatherInfo(newWeatherInfo);

          //return promise to callback function
          if (callback) callback(newWeatherInfo);
        }
        setError("");
      } else {
        setError("Not found");
      }
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setIsLoading(false);
    }
  };

  return [
    weatherInfo,
    error,
    isLoading,
    useCallback(getWeatherInfo, []),
  ] as const;
};
