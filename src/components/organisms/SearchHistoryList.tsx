import styled from "styled-components";

//custom types
import { SearchHistoryTypes } from "../../constants/types";

//molecules
import HistoryListItem from "../molecules/HistoryListItem";

interface PropTypes {
  searchHistory: SearchHistoryTypes[];
  onSearch: (id: string) => void;
  onDelete: (id: string) => void;
}

const StyledListing = styled.ol`
  padding: 0 20px;

  .no-record {
    display: block;
    text-align: center;
    padding: 50px 0;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const SearchHistoryList: React.FC<PropTypes> = ({
  searchHistory,
  onSearch,
  onDelete,
}) => {
  return (
    <StyledListing>
      {searchHistory.length ? (
        searchHistory.map((searchObj) => {
          return (
            <HistoryListItem
              key={searchObj.id}
              onSearch={onSearch}
              onDelete={onDelete}
              {...searchObj}
            />
          );
        })
      ) : (
        <span className='no-record'>No Record</span>
      )}
    </StyledListing>
  );
};

export default SearchHistoryList;
