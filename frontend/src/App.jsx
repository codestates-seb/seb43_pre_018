import './App.css';
import { ThemeProvider } from "styled-components";
import Header from "./conponents/Header/Header";
import theme from "./conponents/style/theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordPopup from "./pages/PasswordPopup";
import styled from 'styled-components'
import Footer from './conponents/Footer';
import AskQuestion from './pages/AskQuestion';
import Main from './pages/Main';
import QuestionDetail from './pages/QuestionDetail';
import {Routes, Route, useLocation} from "react-router-dom"
// 404 페이지 사용할지 말지 결정후 적용
import Notfound from './pages/Notfound';

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
    <Top isAsk={location.pathname==='/ask'||location.pathname.includes('/edit')?true:false}>
      <Header />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passwordPopup" element={<PasswordPopup />} />
          <Route path='/ask' element={<AskQuestion />} />
          <Route path="/ask/:askId" element={<QuestionDetail />} />
          <Route path='/edit/:askId' element={<AskQuestion />}/>
          <Route path='*' element={<Notfound/>} /> 
        </Routes>
      </ThemeProvider>
      <Footer />
    </Top>
  )
}

export default App;
