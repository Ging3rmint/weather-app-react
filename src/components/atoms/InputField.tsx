import React from "react";
import styled from "styled-components";

interface PropTypes {
  label: string;
  id: string;
  [propName: string]: any;
}

const StyledInputWrapper = styled.div`
  > label {
    display: inline-block;
    margin-right: 5px;
  }

  > input {
    padding: 2px;
  }
`;

const InputField = React.forwardRef<HTMLInputElement, PropTypes>(
  ({ label, id, ...prop }, ref) => {
    return (
      <StyledInputWrapper>
        <label htmlFor={id}>{label}:</label>
        <input ref={ref} name={id} {...prop} />
      </StyledInputWrapper>
    );
  }
);

export default InputField;
