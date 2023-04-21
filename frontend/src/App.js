// import logo from "./logo.svg";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./Component/Header/Header";
import theme from "./Component/style/theme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Component/Header/Login";
import Signup from "./Component/Header/Signup";
import PasswordPopup from "./Component/Header/PasswordPopup";
import LogoHomeButton from "./Component/Header/LogoHomeButton";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/header" element={<LogoHomeButton />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/passwordPopup" element={<PasswordPopup />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
