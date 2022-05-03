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
    padding: 2px 5px;
  }
`;

const InputField: React.FC<PropTypes> = ({ label, id, ...prop }) => {
  return (
    <StyledInputWrapper>
      <label htmlFor={id}>{label}:</label>
      <input name={id} {...prop} />
    </StyledInputWrapper>
  );
};

export default InputField;
