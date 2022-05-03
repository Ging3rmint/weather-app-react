import styled from "styled-components";
import { SearchHistoryTypes } from "../../constants/types";

import Icon from "../common/Icon";

interface ProTypes extends SearchHistoryTypes {
  onSearch: (id: string) => void;
  onDelete: (id: string) => void;
}

const StyledListItem = styled.li`
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    position: relative;
    align-items: center;

    button {
      border: 1px solid transparent;
      outline: none;
      padding: 4px 6px;
      border-radius: 100%;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        border: 1px solid black;
      }
    }

    &__right {
      display: flex;
      align-items: center;

      > * {
        margin-left: 8px;
      }
    }

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      height: 1px;
      left: -20px;
      right: -20px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const HistoryListItem: React.FC<ProTypes> = ({
  state,
  country,
  time,
  id,
  onSearch,
  onDelete,
}) => {
  return (
    <StyledListItem>
      <div className='wrapper'>
        <div className='wrapper__left'>
          {state}, {country}
        </div>
        <div className='wrapper__right'>
          {time}
          <button onClick={() => onSearch(id)}>
            <Icon icon='search' size={18} />
          </button>
          <button onClick={() => onDelete(id)}>
            <Icon icon='trash' size={18} />
          </button>
        </div>
      </div>
    </StyledListItem>
  );
};

export default HistoryListItem;
