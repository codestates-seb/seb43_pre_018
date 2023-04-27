import React from "react";
import styled from "styled-components";
// import { useState } from "react";
// import axiosInstance from "../store/axiosConfig";

const Background = styled.div`
  background-color: #f6f6f6;
  width: 100vw;
  height: calc(100vh - 54px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto auto;
`;

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  border-radius: 7px;
  border: 1px solid #e4e4e4;
  width: 320px;
  height: max-content;
  background-color: white;
  box-shadow: 0 0 1px 1px #e4e4e4;
  padding: 3px 0 20px 0;
  margin-top: 15px;
`;

const InputContainer = styled.div`
  margin: auto;
  margin-top: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EmailLabel = styled.label`
  font-weight: 600;
  margin: 1px 1px 5px 5px;
`;
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
const SendButton = styled.button`
  margin: 18px 0 3px 0;
  width: 102%;
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

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function PasswordPopup() {
  // const [email, setEmail] = useState("");
  // const [error, setError] = useState({
  //   email: "",
  // });
  // const validateEmail = (email) => {
  //   return emailRegex.test(email);
  // };
  // const loginUser = async (email) => {
  //   try {
  //     const response = await axiosInstance.post("./login", {
  //       email,
  //     });
  //     if (response.data.token) {
  //       localStorage.setItem("jwt", response.data.token);
  //       dispatch(Login(response.data.user));
  //     } else {
  //       // setError("Invalid email or password");
  //     }
  //   } catch (error) {
  //     // setError("Error fetching data");
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError({
  //     email: "",
  //   });

  //   if (!validateEmail(email)) {
  //     // setError("the email is not valid email address.");
  //     setError((prev) => ({
  //       ...prev,
  //       email: "Email cannot be empty.",
  //     }));
  //     return null;
  //   }

  //   await loginUser(email);
  // };

  return (
    <>
      <Background>
        <Container>
          <PopupContainer>
            <InputContainer>
              <div
                style={{
                  fontSize: "14px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#232629",
                }}
              >
                Forgot your account’s password? Enter your email address and
                we’ll send you a recovery link.
              </div>
              <EmailLabel>Email</EmailLabel>
              <LoginInput />
              <SendButton>Send recovery email</SendButton>
            </InputContainer>
          </PopupContainer>
        </Container>
      </Background>
    </>
  );
}
