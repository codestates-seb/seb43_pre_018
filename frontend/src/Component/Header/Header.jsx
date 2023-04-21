import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import LogoHomeButton from "./LogoHomeButton";

// 전체 해더 컴포넌트 스타일 지정
const HeaderComponent = styled.header`
  align-items: center;
  box-sizing: border-box;
  background-color: rgb(248, 249, 249);
  border-top: 3px solid ${({ theme }) => theme.orange500};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 100%;
  left: 0;
  position: sticky;
  /* width: 100vw; */
  z-index: 999;
  justify-content: space-evenly;
  padding: 0 30px 0 20px;
`;

// 왼쪽 상단 햄버거 아이콘 -> 리액트 아이콘 설치 후 import해옴
const RxHamburgerMenuIcon = styled(RxHamburgerMenu)`
  all: unset;
  box-sizing: border-box;
  height: 50px;
  padding: 16px;
  width: 50px;
  cursor: pointer;
  &:hover {
    background-color: rgb(228, 230, 232);
  }
`;

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

const Information = styled.span`
  /* font-size: 1.2rem;
  color: grey;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    background-color: rgb(228, 230, 232);
  } */
`;

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
  /* & input:focus {
    box-shadow: 0 0 3px 3px rgba(95, 180, 255, 0.4);
  } */
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
  padding: 5px;
  button:not(:last-child) {
    margin-right: 5px;
  }
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
  background-color: rgb(10, 149, 255);
  color: rgb(255, 255, 255);
  width: 65px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(49, 114, 198);
  }
`;

function Header() {
  // 검색 입력 하려고 클릭 했을 경우에 입력창 쉐도우 지정 -> useState import
  const [inputFocused, setInputFocused] = useState(false);
  // 검색 입력 하려고 클릭 했을 경우에 입력창 보더라인 파란색 지정
  const [barFocused, setBarFocused] = useState(false);

  // const { isLogin, setIsLogin } = useIsLoginStore((state) => state);

  const handleInputFocus = () => setInputFocused(true);
  const handleInputBlur = () => setInputFocused(false);
  const handleBarFocus = () => setBarFocused(true);
  const handleBarBlur = () => setBarFocused(false);

  return (
    <>
      <HeaderComponent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RxHamburgerMenuIcon />
          {/* <LogoHomeButton /> */}
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
          <SearchInput type="text" placeholder="Search..." />
        </SearchBar>
        <ProfileContainer>
          <LoginButton to="/login">Log in</LoginButton>
          <SignUpButton to="/signup">Sign up</SignUpButton>
        </ProfileContainer>
      </HeaderComponent>
    </>
  );
}

export default Header;
