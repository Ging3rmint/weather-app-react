import { useState } from "react";
import axios from "axios";

//custom types
import { WeatherInfoTypes, WeatherSearchTypes } from "../constants/types";
import moment from "moment";

type GetWeatherFuncType = (criteria: WeatherSearchTypes) => void;

export const useWeatherInfo = () => {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherInfo: GetWeatherFuncType = async (criteria) => {
    //toggle loading spinner
    setIsLoading(true);
    try {
      //get geolocation of city and country
      const geoLocate = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${criteria.city}, ${criteria.country}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );

      if (geoLocate.data.length) {
        const { lat, lon, name } = geoLocate.data[0];

        //get weather info using geolocation
        const info = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );

        if (info.data) {
          const {
            main: { temp_max, temp_min, humidity },
            weather,
            sys: { country },
          } = info.data;

          setWeatherInfo({
            temp_max,
            temp_min,
            humidity,
            weather,
            country,
            name,
            dateTime: moment().format("YYYY-MM-DD hh:mm A"),
          });
        }
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

  return [weatherInfo, error, isLoading, getWeatherInfo] as const;
};
