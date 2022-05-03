import { memo } from "react";
import moment from "moment";
import styled from "styled-components";

//custom types
import { WeatherInfoTypes } from "../../constants/types";
import Icon from "../common/Icon";

interface PropTypes {
  weatherInfo: WeatherInfoTypes;
}

const StyledWeatherWrapper = styled.div`
  padding: 0 20px;
  margin: 20px 0;

  > span {
    display: inline-block;
    margin-bottom: 5px;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 40px;

    > svg {
      margin-left: 10px;
    }
  }

  .info {
    display: flex;
    margin-bottom: 5px;

    &:last-of-type {
      margin-bottom: 0;
    }

    &--name {
      width: 120px;
    }
  }
`;

const WeatherIcon: React.FC<{ weather: string }> = ({ weather }) => {
  let weatherIcon = "cloud";

  switch (weather.toLowerCase()) {
    case "clear":
      weatherIcon = "sun";
      break;
    case "clouds":
      weatherIcon = "cloud";
      break;
    case "rain":
      weatherIcon = "cloud-rain";
      break;
    case "snow":
      weatherIcon = "cloud-snow";
      break;
    default:
      break;
  }
  return <Icon icon={weatherIcon} size={28} />;
};

const WeatherInfo: React.FC<PropTypes> = ({ weatherInfo }) => {
  const { name, country, weather, temp_max, temp_min, humidity, dateTime } =
    weatherInfo;

  return (
    <StyledWeatherWrapper>
      <span>
        {name}, {country}
      </span>
      <h2>
        {weather[0].main}
        <WeatherIcon weather={weather[0].main} />
      </h2>
      <div className='info'>
        <span className='info--name'>Description:</span>
        <span className='info--result'>{weather[0].description}</span>
      </div>
      <div className='info'>
        <span className='info--name'>Temperature:</span>
        <span className='info--result'>
          {temp_min}
          &deg;C ~ {temp_max}&deg;C
        </span>
      </div>
      <div className='info'>
        <span className='info--name'>Humidity:</span>
        <span className='info--result'>{humidity}%</span>
      </div>
      <div className='info'>
        <span className='info--name'>Time:</span>
        <span className='info--result'>
          {moment.utc(dateTime).format("YYYY-MM-DD hh:mm A")}
        </span>
      </div>
    </StyledWeatherWrapper>
  );
};

export default memo(WeatherInfo);
