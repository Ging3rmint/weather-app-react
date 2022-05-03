import styled from "styled-components";

interface PropTypes {
  title?: string;
  style?: {
    [propName: string]: any;
  };
}

const StyledHeader = styled.div`
  padding: 10px 0;

  .container {
    position: relative;
    &:before {
      content: "";
      height: 1px;
      left: 10px;
      right: 10px;
      bottom: -10px;
      position: absolute;
      background-color: black;
    }
  }
`;

const Header: React.FC<PropTypes> = ({ title, style }) => {
  return (
    <StyledHeader style={style}>
      <div className='container'>
        <h1>{title}</h1>
      </div>
    </StyledHeader>
  );
};

export default Header;

Header.defaultProps = {
  title: "Some title",
};
