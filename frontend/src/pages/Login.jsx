import React from "react";
import styled from "styled-components";
import GithubLogo from "../images/github.png";
import FacebookLogo from "../images/facebook.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../store/axiosConfig";
import { useDispatch } from "react-redux";
import { TbAlertCircleFilled } from "react-icons/tb";
import axios from "axios";
import { login } from "../store/userSlice";
const NoScrollContainer = styled.form`
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
  height: 37px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  font-size: 14px;
  color: #3b4045;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.black025};
  }
`;
const GoogleLoginIcon = styled.img`
  align-self: end;
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
  height: 37px;
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
  height: 37px;
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
  border: 1px solid ${(props) => props.error && "#d0390e"};
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

const Error = styled.span`
  color: red;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  > .input-icon {
    position: absolute;
    right: 3px;
    top: 10px;
    color: red;
  }
`;

// 정규식
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return passwordRegex.test(password);
  };

  const loginUser = async (email, password) => {
    // try {
    //   const response = await axiosInstance.post("./login", {
    //     email,
    //     password,
    //   });
    //   if (response.data.token) {
    //     localStorage.setItem("jwt", response.data.token);
    //     dispatch(Login(response.data.user));
    //   } else {
    //   }
    // } catch (error) {}
    axios.defaults.withCredentials = true;
    const url = process.env.REACT_APP_URL;
    const headers = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",}
    };

    const data = JSON.stringify({
      name : "g858@gmail.com",
      password : "y123456!"
    })

    axios
      .post(`${url}/login`, data, headers)
      .then((response) => {
				localStorage.setItem('name', response.data.username)
        return response.headers.get('Authorization');
      })
      .then(data=>{
        localStorage.setItem('JWT', data)
        console.log('로그인 성공')
        navigate('/')
        dispatch(login())
      })
      .catch((err) => console.error(err.message));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      email: "",
      password: "",
    });

    if (!validateEmail(email)) {
      setError((prev) => ({
        ...prev,
        email: "Email cannot be empty.",
      }));
      return null;
    }
    if (!validatePassword(password)) {
      setError((prev) => ({
        ...prev,
        password: "Password cannot be empty.",
      }));
      return null;
    }

    await loginUser(email, password);
  };


  return (
    <>
      <NoScrollContainer onSubmit={handleSubmit}>
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
                <InputContainer>
                  <LoginInput
                    error={error.email}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error.email ? (
                    <TbAlertCircleFilled className="input-icon" />
                  ) : null}
                </InputContainer>
                {error.email ? <Error>{error.email}</Error> : null}

                <PassWordContainer>
                  <LoginLabel>
                    Password <Link to="/passwordPopup">Forgot password?</Link>
                  </LoginLabel>
                  <InputContainer>
                    <LoginInput
                      error={error.password}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    {error.password ? (
                      <TbAlertCircleFilled className="input-icon" />
                    ) : null}
                  </InputContainer>
                  {error.password ? <Error>{error.password}</Error> : null}
                </PassWordContainer>
              </LoginInputContainer>
              <LoginButton type="submit">Log in</LoginButton>
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
};
export default Login;
