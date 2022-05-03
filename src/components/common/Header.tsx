import styled from "styled-components";

interface PropTypes {
  title?: string;
}

const StyledHeader = styled.div`
  padding: 10px;
  position: relative;

  &:before {
    content: "";
    height: 1px;
    left: 10px;
    right: 10px;
    bottom: 0;
    position: absolute;
    background-color: black;
  }
`;

const Header: React.FC<PropTypes> = ({ title }) => {
  return (
    <StyledHeader className='container'>
      <h1>{title}</h1>
    </StyledHeader>
  );
};

export default Header;

Header.defaultProps = {
  title: "Some title",
};
