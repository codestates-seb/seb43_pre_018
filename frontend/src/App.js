import './App.css';
import styled from 'styled-components'
import Nav from './conponents/Nav';
import RightSidebar from './conponents/RightSidebar';
import Footer from './conponents/Footer';
import Main from './conponents/Main';
import QuestionDetail from './conponents/QuestionDetail';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

const TempHeader = styled.div`
  border: 1px solid black;
  position: sticky;
  top: 0;
  width: 100vw;
`
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
      <TempHeader>Header</TempHeader>
      <TempBody>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:postId" element={<QuestionDetail />} />
        </Routes>
      </TempBody>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
