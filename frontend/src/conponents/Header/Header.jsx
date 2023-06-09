import React from "react";
import styled from "styled-components";
import { useState } from "react";
// import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import SearchPopUp from "./SearchPopup";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
// import useSearchPopUpStore from "../../store/store";
// import { useDispatch } from 'react-redux';
// import { setSearchTerm } from '../slices/searchSlice';
// import { search } from '../api/search';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch();

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     dispatch(setSearchTerm(event.target.value));
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       dispatch(search(searchTerm));
//     }
//   };

// 전체 해더 컴포넌트 스타일 지정
const HeaderComponent = styled.header`
  box-sizing: border-box;
  background-color: rgb(248, 249, 249);
  border-top: 3px solid ${(props) => props.theme.orange500};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  width: 1230px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 왼쪽 상단 햄버거 아이콘 -> 리액트 아이콘 설치 후 import해옴
// const RxHamburgerMenuIcon = styled(RxHamburgerMenu)`
//   all: unset;
//   box-sizing: border-box;
//   height: 50px;
//   padding: 16px;
//   width: 50px;
//   cursor: pointer;
//   &:hover {
//     background-color: rgb(228, 230, 232);
//   }
// `;

// stackOverflow 로고 홈버튼 스타일 지정
const LogoHomeButton = styled.button`
  all: unset;
  box-sizing: border-box;
  height: 100%;
  padding: 8px;
  width: 166px;
  cursor: pointer;
  &:hover {
    background-color: rgb(228, 230, 232);
  }
`;

// About, Products, For Teams 스타일 지정
const InformationContainer = styled.div`
  justify-content: space-evenly;
  display: flex;
  > span {
    font: unset;
    font-size: 14px;
    color: #575656;
    align-items: center;
    border-radius: 1000px;
    padding: 7px 16px;
    box-shadow: none;
    position: relative;
    user-select: auto;
    box-sizing: border-box;
    margin-right: 2px;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background-color: rgb(228, 230, 232);
      color: black;
    }
  }
`;

const Information = styled.span``;

// 검색바 스타일 지정
const SearchBar = styled.div`
  align-items: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(187, 191, 195);
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  height: 32px;
  padding-left: 1%;
  width: 50%;
  margin-left: 7px;
  margin-right: 3px;
  position: relative;
`;

// 검색 입력창 스타일 지정
const SearchInput = styled.input`
  all: unset;
  font-size: 14px;
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 3px;
  height: 32px;
  width: 100%;
`;

// 로그인 & 가입하기 버튼 담아 놓은 공간
const ProfileContainer = styled.div`
  all: unset;
  justify-content: space-evenly;
  display: flex;
`;

// 로그인 버튼 스타일 지정
const LoginButton = styled(Link)`
  all: unset;
  background-color: rgb(225, 236, 244);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.3);
  border: 1px solid rgb(57, 115, 157);
  border-radius: 3px;
  color: rgb(57, 115, 157);
  font-size: 14px;
  font-weight: 400;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 60px;
  cursor: pointer;

  &:hover {
    background-color: rgb(185, 210, 232);
  }
`;

//가입 버튼 스타일 지정
const SignUpButton = styled(LoginButton)`
  background-color: ${props=>props.login?'rgb(236, 106, 95)':'rgb(10, 149, 255)'};
  color: rgb(255, 255, 255);
  width: 65px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props=>props.login?'rgb(207, 78, 66)':'rgb(49, 114, 198)'};
  }
`;

function Header() {
  const [isFocused, setIsFocused] = useState(false);
  const handlePopUp = () => {
    setIsFocused((prev) => !prev);
  };

  // const [searchParams, setSearchParams] = useSearchParams();
  // const handlePopUp = useSearchPopUpStore((state) => state);
  // console.log(handlePopUp);

  // 검색 입력 하려고 클릭 했을 경우에 입력창 쉐도우 지정 -> useState import
  const [inputFocused, setInputFocused] = useState(false);
  // 검색 입력 하려고 클릭 했을 경우에 입력창 보더라인 파란색 지정
  const [barFocused, setBarFocused] = useState(false);

  const handleInputFocus = () => setInputFocused(true);
  const handleInputBlur = () => setInputFocused(false);
  const handleBarFocus = () => setBarFocused(true);
  const handleBarBlur = () => setBarFocused(false);
  const isLogin = useSelector(state=>state.user.isAuthenticated)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // const { isLogin, setIsLogin } = useIsLoginStore((state) => state);
  // const { pathname } = useLocation();
  // const query = searchParams.get("q");
  // const [searchInput, setSearchInput] = useState(query);
  // const navigate = useNavigate();

  let username = "";
  let id = "";

  if (JSON.parse(sessionStorage.getItem("userInfoStorage"))) {
    username = JSON.parse(sessionStorage.getItem("userInfoStorage")).email;
    id = JSON.parse(sessionStorage.getItem("userInfoStorage")).memberId;
  }
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  // const searchBarInputKeyUpHandler = (e) => {
  //   if (e.key === "Enter") {
  //     if (pathname === "/search") {
  //       navigate(`/search?q=${searchInput}`);
  //       setSearchInput(searchInput);
  //     } else {
  //       navigate(`./search?q=${searchInput}`);
  //       setSearchInput(searchInput);
  //     }
  //   }
  // };


  const LogoutClick = () => {
    localStorage.removeItem('JWT')
    localStorage.removeItem('name')
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
      <HeaderComponent>
        <HeaderContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoHomeButton>
              <Link to="/">
                <img
                  src="http://stackoverflowpre.p-e.kr/static/media/Logo.788ad40bf6ce6ec2bbdff55b6afda940.svg"
                  alt="logo"
                />
              </Link>
            </LogoHomeButton>
          </div>
          <InformationContainer>
            <span className={Information}>About</span>
            <span className={Information}>Products</span>
            <span className={Information}>For Teams</span>
          </InformationContainer>
          <SearchBar
            // className={showPopup ? "input-actived" : null}
            onFocus={() => {
              handleInputFocus();
              handleBarFocus();
            }}
            onBlur={() => {
              handleInputBlur();
              handleBarBlur();
            }}
            style={{
              // boxShadow: inputFocused && "0 0 3px 3px hsl(206,90%,90%)",
              boxShadow:
                inputFocused &&
                "0 0 3.2px 3.2px hsl(206, 65.21739130434787%, 90.98039215686275%)",
              border: barFocused && " 1px solid hsl(206,90%,69.5%)",
            }}
          >
            <svg
              aria-hidden="true"
              class="s-input-icon s-input-icon__search svg-icon iconSearch"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"
                style={{ fill: "gray" }}
              ></path>
            </svg>
            <SearchInput
              type="text"
              placeholder="Search..."
              onFocus={handlePopUp}
              onBlur={handlePopUp}
              // value={searchTerm}
              // onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
              // value={searchInput || ""}
              // onChange={(e) => setSearchInput(e.target.value)}
              // onKeyUp={searchBarInputKeyUpHandler}
            />
            <SearchPopUp showPopUp={isFocused} handlePopUp={handlePopUp} />
          </SearchBar>
          <ProfileContainer>
            {isLogin?
            <>
              <LoginButton>{localStorage.getItem('name')}</LoginButton>
              <SignUpButton login={true} onClick={LogoutClick}>Log out</SignUpButton>
            </>
            :<>
              <LoginButton to="/login">Log in</LoginButton>
              <SignUpButton to="/signup">Sign up</SignUpButton>
            </>}
          </ProfileContainer>
        </HeaderContainer>
      </HeaderComponent>
    </>
  );
}

export default Header;
