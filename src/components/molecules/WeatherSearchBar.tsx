import React, { useEffect, useRef } from "react";
import styled from "styled-components";

//breakpoints
import { breakpoints } from "../../constants";

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

  @media (max-width: ${breakpoints.bpLgMobile}px) {
    display: block;
  }

  .form-group {
    display: flex;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
    }

    > * {
      margin-right: 10px;

      input {
        @media (max-width: ${breakpoints.bpLgMobile}px) {
          width: 100%;
          margin: 5px 0;
        }
      }
    }
  }

  .button-group {
    display: flex;

    @media (max-width: ${breakpoints.bpLgMobile}px) {
      display: block;
      text-align: center;
      margin-top: 10px;
    }

    > button {
      padding: 2px 4px;
      cursor: pointer;

      &:first-of-type {
        margin-right: 10px;
      }

      @media (max-width: ${breakpoints.bpLgMobile}px) {
        width: 20%;
      }
    }
  }
`;

const WeatherSearchBar: React.FC<PropTypes> = ({
  onInputChange,
  onClear,
  onSubmit,
  formValues,
}) => {
  //store the DOM of first input field
  const firstInputRef = useRef<HTMLInputElement>(null);

  //focus on first input field on mount
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <StyledSearchBar>
      <div className='form-group'>
        <InputField
          label='City'
          id='city'
          type='text'
          ref={firstInputRef}
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
      </div>

      <div className='button-group'>
        <button onClick={onSubmit}>Search</button>
        <button onClick={onClear}>Clear</button>
      </div>
    </StyledSearchBar>
  );
};

export default WeatherSearchBar;
