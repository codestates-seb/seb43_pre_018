import React, { useState } from "react";
import styled from "styled-components";
import GithubLogo from "../images/github.png";
import FacebookLogo from "../images/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


// 로그인 페이지 전체 스타일 지정
const Background = styled.div`
  background-color: #f6f6f6;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// 로그인 폼 전체 스타일 지정
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  min-height: 70%;
`;

const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 2.2rem;
  justify-content: center;
  text-align: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  > p {
    margin-bottom: 10px;
  }
`;

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  > p {
    font-weight: 500;
    font-size: 1.2rem;
  }
`;
const SignupIcon = styled.div`
  color: #0a95ff;
  margin-right: 10px;
  padding-top: 10px;
`;

// const Section = styled.div``;

// 로그인 방법 스타일 지정
const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 50px;
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
  margin: 0 2px 0 0;
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
  padding-bottom: 5px;
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
  padding-top: 5px;
  padding-bottom: 5px;
`;
// 페이스북 로그인 스타일 지정

// 로그인 입력 폼 전체 스타일 지정
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  border-radius: 8px;
  border: 1px solid #e4e4e4;
  width: 295px;
  height: max-content;
  background-color: white;
  box-shadow: 0 0 8px 2px #e4e4e4;
  padding: 10px 0 25px 0;
  margin-top: 15px;
`;

// 로그인 입력창의 스타일 지정
const SignupInputContainer = styled.div`
  margin-top: 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
//
const SignupInputBox = styled.div`
  border: 1px solid #bababa;
  border-radius: 4px;
  display: flex;
  height: 30px;
  width: 100%;

  &.focused {
    border: ${(props) =>
      props.isValid ? "1px solid #bababa" : "1px solid #b90101;"};
  }

  &:focus-within {
    border: 1px solid rgba(0, 103, 194, 0.4);
    box-shadow: 0 0 0 4px rgba(144, 203, 255, 0.4);
  }
`;
const SignupWarningIconContainer = styled.div`
  display: flex;
  padding-top: 5px;
  margin-right: 5px;
`;

// email과 비번 라벨 스타일 지정
const SignupLabel = styled.label`
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
const SignupInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid ${({passed})=>passed?'#bababa':'red'};
  border-radius: 4px;
  padding-left: 10px;
  &:focus {
    box-shadow: 0 0 3.2px 3.2px ${({passed})=>passed?'hsl(206, 65.21739130434787%, 90.98039215686275%)':'rgb(248, 212, 211)'};
    border: 1px solid ${({passed})=>passed?'hsl(206, 90%, 69.5%)':'red'};
    outline: 0;
  }
`;
const EmailContainer = styled.div`
  margin-top: 20px;
`;

const PassWordContainer = styled.div`
  margin-top: 20px;
`;

const SignupButton = styled.button`
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

const NonePassedMessage = styled.div`
  color: ${({passed})=>passed?'#6A737C':'red'};
  font-size: 12px;
  margin-top: 8px;
`

const passedInitailState = {
  displayName: true,
  email: true,
  password: true
}

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passed, setPassed] = useState(passedInitailState)
  const navigate = useNavigate()

  const onNameChange = e => {
    const regex = /^[ㄱ-ㅎ|가-힣]+$/
    if(!regex.test(displayName)) {
      setPassed({...passed, displayName: false})
    } else {
      setPassed({...passed, displayName: true})
    }
    setDisplayName(e.target.value);
  }
  
  const onEmailChange = e => {
    const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z]+\.[a-zA-Z.]+$/
    if(!regex.test(email)) {
      setPassed({...passed, email: false})
    } else {
      setPassed({...passed, email: true})
    }
    setEmail(e.target.value);
  }
  
  const onPasswordChange = e => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/
    if(!regex.test(password)) {
      setPassed({...passed, password: false})
    } else {
      setPassed({...passed, password: true})
    }
    setPassword(e.target.value);
  }

  const onSignUpHnadle = () => {
    if(!passed.displayName||!passed.email||!passed.password) {
      // window.alert('유효하지 않은 정보입니다. 다시 시도해 주세요')
      if(!passed.displayName) setDisplayName('')
      if(!passed.email) setEmail('')
      if(!passed.password) setPassword('')
    } else {
      axios.defaults.withCredentials = true;
      const url = process.env.REACT_APP_URL;
      const headers = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
  
      const data = JSON.stringify({
        name : displayName,
        email: email,
        password : password
      })

      axios
      .post(`${url}/signUp`, data, headers)
      .then((res) => {
        console.log('회원가입 완료')
        navigate('/')
      })
      .catch((err) => console.error(err.message));
    }
  }

  return (
    <>
      <Background>
        <WelcomeText>
          Create your Stack Overflow account. It’s free and only takes a minute.
        </WelcomeText>
        <Container>
          <DetailContainer>
            <p style={{ fontWeight: "500", fontSize: "28px" }}>
              Join the Stack Overflow community
            </p>
            <DetailContent>
              <SignupIcon>
                <svg width="26" height="26" fill="#0a95ff">
                  <path
                    opacity=".5"
                    d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
                  ></path>
                  <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path>
                </svg>
              </SignupIcon>
              <p>Get Unstuck - ask a question</p>
            </DetailContent>
            <DetailContent>
              <SignupIcon>
                <svg width="26" height="26" fill="#0a95ff">
                  <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path>
                  <path
                    opacity=".5"
                    d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
                  ></path>
                </svg>
              </SignupIcon>
              <p>Unlock new privileges like voting and commenting</p>
            </DetailContent>
            <DetailContent>
              <SignupIcon>
                <svg width="26" height="26" fill="#0a95ff">
                  <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path>
                  <path
                    opacity=".5"
                    d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
                  ></path>
                </svg>
              </SignupIcon>
              <p>Save your favorite tags, filters, and jobs</p>
            </DetailContent>
            <DetailContent>
              <SignupIcon>
                <svg width="26" height="26" fill="#0a95ff">
                  <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path>
                </svg>
              </SignupIcon>
              <p>Earn Reputation and badges</p>
            </DetailContent>
            <p
              style={{
                fontWeight: "500",
                fontSize: "14px",
                color: "#6A737C",
                marginTop: "10px",
              }}
            >
              Collaborate and share knowledge with a private group for FREE.
            </p>
          </DetailContainer>

          <SignupContainer>
            <GoogleLogin>
              <GoogleLoginIcon
                img
                src="http://stackoverflowpre.p-e.kr/static/media/Google.960c670a7a8d952eba35.png"
                alt="구글 로고"
              ></GoogleLoginIcon>
              <GoogleLoginText>Sign up with Google</GoogleLoginText>
            </GoogleLogin>
            <GithubLogin>
              <GithubIcon img src={GithubLogo} alt="깃헙 로고"></GithubIcon>
              <GithubLoginText>Sign up with Github</GithubLoginText>
            </GithubLogin>
            <FacebookLogin>
              <FacebookIcon
                img
                src={FacebookLogo}
                ail="페북 로고"
              ></FacebookIcon>
              <FacebookLoginText>Sign up with Facebook</FacebookLoginText>
            </FacebookLogin>
          
          <FormContainer>
            <SignupInputContainer>
              <SignupLabel>Display name</SignupLabel>
              <SignupInput onChange={onNameChange} passed={passed.displayName} value={displayName||''}/>
              {!passed.displayName&&<NonePassedMessage passed={passed.displayName}>Display name은 한글만 입력해야 합니다.</NonePassedMessage>}
              <EmailContainer>
                <SignupLabel>Email</SignupLabel>
                <SignupInput onChange={onEmailChange} passed={passed.email}/>
              </EmailContainer>
              {!passed.email&&<NonePassedMessage passed={passed.email}>Email형식이 올바르지 않습니다.</NonePassedMessage>}
              <PassWordContainer>
                <SignupLabel>Password</SignupLabel>
                <SignupInput onChange={onPasswordChange} passed={passed.password} value={password||''}/>
                <NonePassedMessage passed={passed.password}>
                  Passwords must contain at least eight characters, including at
                  least 1 letter and 1 number.
                </NonePassedMessage>
              </PassWordContainer>
            </SignupInputContainer>
            <SignupButton onClick={onSignUpHnadle}>Sign up</SignupButton>
          </FormContainer>
          <div style={{ fontSize: "13px", marginTop: "15px" }}>
            Already have a account?{" "}
            <span
              style={{ color: "hsl(206, 100%, 40%)", cursor: "pointer" }}
              onMouseEnter={(e) =>
                (e.target.style.color = "hsl(206, 90%, 69.5%)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "hsl(206, 100%, 40%)")
              }
            >
              <Link to="/login">Log in</Link>
            </span>
          </div>
          </SignupContainer>
        </Container>
      </Background>
    </>
  );
}
