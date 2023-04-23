import './App.css';
import { ThemeProvider } from "styled-components";
import Header from "./conponents/Header/Header";
import theme from "./conponents/style/theme";
import Login from "./conponents/Header/Login";
import Signup from "./conponents/Header/Signup";
import PasswordPopup from "./conponents/Header/PasswordPopup";
import styled from 'styled-components'
import Nav from './conponents/Nav';
import RightSidebar from './conponents/RightSidebar';
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

const TempHeader = styled.div`
  border: 1px solid black;
  position: fixed;
  top: 0;
  width: 100vw;
`
// 높이 너비는 임시값
const BodyContainer = styled.div`
  margin: 33px auto 0;
  height: 100vh;
  min-height: calc(100vh - 378px);
  max-width: 1264px;
  padding: 20px 0 50px;
  display: flex;
  >.temp {
    border: 1px solid red;
    width: 751px;
    height: 2000px;
  }
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

// function App() {
//   return (
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <Header />
//         <Routes>
//           <Route path="/header" element={<LogoHomeButton />}></Route>
//           <Route path="/login" element={<Login />}></Route>
//           <Route path="/signup" element={<Signup />}></Route>
//           <Route path="/passwordPopup" element={<PasswordPopup />}></Route>
//         </Routes>
//       </ThemeProvider>
//     </BrowserRouter>
//   );
// }

// function App() {
//   const location = useLocation()
//   return (
//     <Top isAsk={location.pathname==='/ask'?true:false}>
//       <TempHeader>Header</TempHeader>
//       <Routes>
//         <Route path='/' element={
//           <TempBody>
//             <Nav />
//               <div className='temp'>Main</div>
//             <RightSidebar />
//           </TempBody>
//         }/>
//         <Route path='/ask' element={<AskQuestion />}/>
//       </Routes>
//       <Footer />
//     </Top>  
//   );

export default App;
