import './App.css';
import { ThemeProvider } from "styled-components";
import Header from "./Component/Header/Header";
import theme from "./Component/style/theme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Component/Header/Login";
import Signup from "./Component/Header/Signup";
import PasswordPopup from "./Component/Header/PasswordPopup";
import LogoHomeButton from "./Component/Header/LogoHomeButton";
import styled from 'styled-components'
import Nav from './conponents/Nav';
import RightSidebar from './conponents/RightSidebar';
import Footer from './conponents/Footer';
import Main from './conponents/Main';
import QuestionDetail from './conponents/QuestionDetail';

// 높이 너비는 임시값
const TempBody = styled.div`
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
  height: min-content;
  width: 88%;
  min-width: 500px;
  display: flex;
  >.temp {
    border: 1px solid red;
    margin: 0 3px;
  }
`

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/header" element={<LogoHomeButton />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/passwordPopup" element={<PasswordPopup />}></Route>
        </Routes>
      </ThemeProvider>
      <TempBody>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:postId" element={<QuestionDetail />} />
        </Routes>
        <RightSidebar />
      </TempBody>
      <Footer />
    </BrowserRouter>
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

export default App;
