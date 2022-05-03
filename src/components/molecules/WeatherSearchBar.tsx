import React from "react";
import styled from "styled-components";

//custom types
import { WeatherSearchTypes } from "../../constants/types";

import InputField from "../atoms/InputField";

interface PropTypes {
  onInputChange: (e: React.FormEvent<HTMLInputElement>, key: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  formValues: WeatherSearchTypes;
}

const StyledSearchBar = styled.div`
  display: flex;
  padding: 10px 0;

  > * {
    margin-right: 10px;
  }

  > button {
    padding: 2px 4px;
    cursor: pointer;
  }
`;

const WeatherSearchBar: React.FC<PropTypes> = ({
  onInputChange,
  onClear,
  onSubmit,
  formValues,
}) => {
  return (
    <StyledSearchBar>
      <InputField
        label='City'
        id='city'
        type='text'
        value={formValues.city}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          onInputChange(e, "city")
        }
      />
      <InputField
        label='Country'
        id='country'
        type='text'
        value={formValues.country}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          onInputChange(e, "country")
        }
      />
      <button onClick={onSubmit}>Search</button>
      <button onClick={onClear}>Clear</button>
    </StyledSearchBar>
  );
};

export default WeatherSearchBar;
