import styled from "styled-components";

interface PropTypes {
  text?: string;
}

const StyledError = styled.p`
  border: 1px solid red;
  background-color: #ff9494;
  padding: 10px;
`;

const ErrorText: React.FC<PropTypes> = ({ text }) => {
  return <StyledError>{text}</StyledError>;
};

export default ErrorText;
