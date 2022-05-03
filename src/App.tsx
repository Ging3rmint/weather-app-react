import React, { useEffect, useState } from "react";

//custom types
import { WeatherInfoTypes, WeatherSearchTypes } from "./constants/types";

//custom hooks
import { useWeatherInfo } from "./hooks";

//common
import Header from "./components/common/Header";

//molecules
import WeatherSearchBar from "./components/molecules/WeatherSearchBar";
import WeatherInfo from "./components/molecules/WeatherInfo";

const App = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [weatherInfo, error, isLoading, getWeatherInfo] = useWeatherInfo();
  const [weatherSearchValues, setWeatherSearchValues] =
    useState<WeatherSearchTypes>({
      city: "",
      country: "",
    });

  //get singapore weather info by default
  useEffect(() => {
    getWeatherInfo({ city: "Singapore", country: "SG" });
  }, []);

  const onWeatherSearchInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    key: string
  ) => {
    setWeatherSearchValues({
      ...weatherSearchValues,
      [key]: e.currentTarget.value,
    });
  };

  const onWeatherClearValues = () => {
    setWeatherSearchValues({ city: "", country: "" });
  };

  const onWeatherSearchSubmit = () => {
    if (weatherSearchValues.city !== "") {
      getWeatherInfo(weatherSearchValues);
    }
  };

  return (
    <section className='App'>
      <Header title="Today's Weather" />
      <div className='container'>
        <WeatherSearchBar
          onInputChange={onWeatherSearchInputChange}
          onClear={onWeatherClearValues}
          onSubmit={onWeatherSearchSubmit}
          formValues={weatherSearchValues}
        />
        {weatherInfo && <WeatherInfo weatherInfo={weatherInfo} />}
      </div>
      <Header title='Search History' />
    </section>
  );
};

export default App;
