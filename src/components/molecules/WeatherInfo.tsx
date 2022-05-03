import { memo } from "react";
import styled from "styled-components";

//custom types
import { WeatherInfoTypes } from "../../constants/types";

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

const WeatherInfo: React.FC<PropTypes> = ({ weatherInfo }) => {
  const { name, country, weather, temp_max, temp_min, humidity, dateTime } =
    weatherInfo;

  console.count("weather");
  return (
    <StyledWeatherWrapper>
      <span>
        {name}, {country}
      </span>
      <h2>{weather[0].main}</h2>
      <div className='info'>
        <span className='info--name'>Description:</span>
        <span className='info--result'>{weather[0].description}</span>
      </div>
      <div className='info'>
        <span className='info--name'>Temperature:</span>
        <span className='info--result'>
          {temp_min} ~ {temp_max}
        </span>
      </div>
      <div className='info'>
        <span className='info--name'>Humidity:</span>
        <span className='info--result'>{humidity}%</span>
      </div>
      <div className='info'>
        <span className='info--name'>Time:</span>
        <span className='info--result'>{dateTime}</span>
      </div>
    </StyledWeatherWrapper>
  );
};

export default memo(WeatherInfo);
