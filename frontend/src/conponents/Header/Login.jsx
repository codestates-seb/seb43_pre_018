import React from "react";
import styled from "styled-components";
import GithubLogo from "../../images/github.png";
import FacebookLogo from "../../images/facebook.png";
// import { useState } from "react";
import { Link } from "react-router-dom";

const NoScrollContainer = styled.div`
  overflow: hidden;
`;

// 로그인 페이지 전체 스타일 지정
const Background = styled.div`
  background-color: #f6f6f6;
  width: 100vw;
  height: calc(100vh - 54px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 로그인 폼 전체 스타일 지정
const Container = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto auto;
  > img {
    margin-bottom: 25px;
  }
`;
// 로그인 방법 스타일 지정
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;

// 구글로 로그인 스타일 지정
const GoogleLogin = styled.a`
  width: 290px;
  margin-bottom: 10px;
  /* height: max-content; */
  height: 30px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 3px;
  font-size: 14px;
  color: #3b4045;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.black025};
  }
`;
const GoogleLoginIcon = styled.img`
  width: 26px;
  height: 26px;
  margin: 0;
`;

const GoogleLoginText = styled.p`
  margin: 0;
  text-align: center;
  padding-top: 5px;
`;
// 구글로 로그인 스타일 지정

// 깃헙 로그인 스타일 지정
const GithubLogin = styled.a`
  width: 290px;
  margin-bottom: 10px;
  height: 30px;
  background-color: black;
  border: 1px solid #cccccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.black800};
  }
`;

const GithubIcon = styled.img`
  width: 17px;
  height: 17px;
  margin: 0;
  margin-right: 4px;
`;

const GithubLoginText = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 5px;
  color: white;
`;
// 깃헙 로그인 스타일 지정

// 페이스북 로그인 스타일 지정
const FacebookLogin = styled.a`
  width: 290px;
  margin-bottom: 10px;
  height: 30px;
  background-color: #385499;
  border: 1px solid #cccccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #314a86;
  }
`;
const FacebookIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 0;
  margin-right: 4px;
  border-radius: 2px;
`;

const FacebookLoginText = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
`;
// 페이스북 로그인 스타일 지정

// 로그인 입력 폼 전체 스타일 지정
const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  border-radius: 8px;
  border: 1px solid #e4e4e4;
  width: 295px;
  height: max-content;
  background-color: white;
  box-shadow: 0 0 1px 1px #e4e4e4;
  padding: 10px 0 25px 0;
  margin-top: 15px;
`;

// 로그인 입력창의 스타일 지정
const LoginInputContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// email과 비번 라벨 스타일 지정
const LoginLabel = styled.label`
  font-weight: 600;
  margin-left: 2px;
  > a {
    font-size: 13px;
    color: hsl(206, 100%, 40%);
    margin-left: 66px;
    font-weight: 400;
    &:hover {
      cursor: pointer;
      color: hsl(206, 90%, 69.5%);
    }
  }
`;

// email과  비번 입력창 스타일 지정
const LoginInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #bababa;
  border-radius: 4px;
  &:focus {
    box-shadow: 0 0 3.2px 3.2px hsl(206, 65.21739130434787%, 90.98039215686275%);
    border: 1px solid hsl(206, 90%, 69.5%);
    outline: 0;
  }
`;

const PassWordContainer = styled.div`
  margin-top: 20px;
`;

const LoginButton = styled.button`
  margin: 18px 10px 3px 14px;
  width: 83%;
  height: 37px;

  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
  &:hover {
    cursor: pointer;
    background-color: rgb(49, 114, 198);
  }
`;

function Login() {
  return (
    <>
      <NoScrollContainer>
        <Background>
          <Container>
            <img
              src="http://stackoverflowpre.p-e.kr/static/media/LogoGlyphMd.aa871fbc61d3fd9f19d12720637d661d.svg"
              alt="bookLogo"
            />
            <LoginContainer>
              <GoogleLogin>
                <GoogleLoginIcon
                  img
                  src="http://stackoverflowpre.p-e.kr/static/media/Google.960c670a7a8d952eba35.png"
                  alt="구글 로고"
                ></GoogleLoginIcon>
                <GoogleLoginText>Login in with Google</GoogleLoginText>
              </GoogleLogin>
              <GithubLogin>
                <GithubIcon img src={GithubLogo} alt="깃헙 로고"></GithubIcon>
                <GithubLoginText>Login in with Github</GithubLoginText>
              </GithubLogin>
              <FacebookLogin>
                <FacebookIcon
                  img
                  src={FacebookLogo}
                  ail="페북 로고"
                ></FacebookIcon>
                <FacebookLoginText>Login in with Facebook</FacebookLoginText>
              </FacebookLogin>
            </LoginContainer>
            <LoginFormContainer>
              <LoginInputContainer>
                <LoginLabel>Email</LoginLabel>
                <LoginInput />
                <PassWordContainer>
                  <LoginLabel>
                    Password <Link to="/passwordPopup">Forgot password?</Link>
                  </LoginLabel>
                  <LoginInput />
                </PassWordContainer>
              </LoginInputContainer>
              <LoginButton>Log in</LoginButton>
            </LoginFormContainer>
            <div style={{ fontSize: "14px", marginTop: "30px" }}>
              Don’t have an account?{" "}
              <span
                style={{ color: "hsl(206, 100%, 40%)", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "hsl(206, 90%, 69.5%)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "hsl(206, 100%, 40%)")
                }
              >
                <Link to="/signup">Sign up</Link>
              </span>
            </div>
          </Container>
        </Background>
      </NoScrollContainer>
    </>
  );
}

export default Login;
