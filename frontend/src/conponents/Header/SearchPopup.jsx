import SearchPopUpComponent from "./SearchPopUpComponent";
import { useSearchPopUpStore } from "../../store/store";
import styled from "styled-components/macro";

const SearchPopUpBackdrop = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 12px;
  margin-top: 32px;
  margin-left: 0px;
`;
const SearchPopUp = ({ showPopUp, handlePopUp }) => {
  // const { showPopUp, handlePopUp } = useSearchPopUpStore((state) => state);

  return (
    <>
      {showPopUp === true ? (
        <SearchPopUpBackdrop onClick={handlePopUp}>
          <SearchPopUpComponent />
        </SearchPopUpBackdrop>
      ) : null}
    </>
  );
};

export default SearchPopUp;
