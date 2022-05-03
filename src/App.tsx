import React, { useEffect, useState } from "react";
import moment from "moment";

//custom types
import { WeatherSearchTypes, SearchHistoryTypes } from "./constants/types";

//custom hooks
import { useWeatherInfo } from "./hooks";

//common
import Header from "./components/common/Header";
// import Spinner from "./components/common/Spinner";

//molecules
import WeatherSearchBar from "./components/molecules/WeatherSearchBar";
import WeatherInfo from "./components/molecules/WeatherInfo";

//organisms
import SearchHistoryList from "./components/organisms/SearchHistoryList";
import ErrorText from "./components/atoms/ErrorText";

const App = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistoryTypes[]>([]);
  const [weatherInfo, error, isLoading, getWeatherInfo] = useWeatherInfo();
  const [weatherSearchValues, setWeatherSearchValues] =
    useState<WeatherSearchTypes>({
      city: "",
      country: "",
    });

  //get singapore weather info by default
  useEffect(() => {
    getWeatherInfo({ city: "Singapore", country: "SG" });
  }, [getWeatherInfo]);

  //handles search weather input
  const onWeatherSearchInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    key: string
  ) => {
    setWeatherSearchValues({
      ...weatherSearchValues,
      [key]: e.currentTarget.value,
    });
  };

  //clear all search input values
  const onWeatherClearValues = () => {
    setWeatherSearchValues({ city: "", country: "" });
  };

  //initiate get weather request
  const onWeatherSearchSubmit = () => {
    if (weatherSearchValues.city !== "") {
      getWeatherInfo(weatherSearchValues, (info) => {
        const id = `searchHistory${
          searchHistory.length
        }${new Date().getTime()}`;
        const historyObj = {
          state: info.name,
          country: info.country,
          id,
          time: moment().format("hh:mm:ss A"),
        };

        const newSearchHistory = [...searchHistory, { ...historyObj }];
        setSearchHistory(newSearchHistory);
      });
    }
  };

  const onHistoryClickSearch = (id: string) => {
    const targetHistoryObj = searchHistory.find((searchObj) => {
      return searchObj.id === id;
    });

    if (targetHistoryObj) {
      getWeatherInfo({
        city: targetHistoryObj?.state,
        country: targetHistoryObj?.country,
      });
      setWeatherSearchValues({
        city: targetHistoryObj?.state,
        country: targetHistoryObj?.country,
      });
    }
  };

  const onHistoryClickDelete = (id: string) => {
    const filteredSeachHistory = searchHistory.filter((searchObj) => {
      return searchObj.id !== id;
    });

    setSearchHistory(filteredSeachHistory);
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
        {error && <ErrorText text={error} />}

        {weatherInfo && <WeatherInfo weatherInfo={weatherInfo} />}
      </div>
      <Header title='Search History' />
      <div className='container'>
        <SearchHistoryList
          onSearch={onHistoryClickSearch}
          onDelete={onHistoryClickDelete}
          searchHistory={searchHistory}
        />
      </div>
    </section>
  );
};

export default App;
