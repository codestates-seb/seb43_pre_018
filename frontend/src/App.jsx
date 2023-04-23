import './App.css';
import { ThemeProvider } from "styled-components";
import Header from "./conponents/Header/Header";
import theme from "./conponents/style/theme";
import Login from "./conponents/Header/Login";
import Signup from "./conponents/Header/Signup";
import PasswordPopup from "./conponents/Header/PasswordPopup";
import styled from 'styled-components'
import Footer from './conponents/Footer';
import AskQuestion from './page/AskQuestion';
import Main from './conponents/Main';
import QuestionDetail from './conponents/QuestionDetail';
// 임시
import {Routes, Route, useLocation} from "react-router-dom"

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${props=>props.isAsk?'100vh':'max-content'};
  width: 100%;
  background-color: ${props=>props.isAsk?'rgb(248, 249, 249)':'rgb(255,255,255)'};
`

function App() {
  const location = useLocation()
  return (
    <Top isAsk={location.pathname==='/ask'?true:false}>
      <Header />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passwordPopup" element={<PasswordPopup />} />
          <Route path='/ask' element={<AskQuestion />} />
          <Route path="/ask/:askId" element={<QuestionDetail />} />
        </Routes>
      </ThemeProvider>
      <Footer />
    </Top>
  )
}

export default App;