import './App.css';
import styled from 'styled-components'
import Nav from './conponents/Nav';
import RightSidebar from './conponents/RightSidebar';
import Footer from './conponents/Footer';
import AskPage from './page/AskPage';

// 임시
import {BrowserRouter, Routes, Route} from "react-router-dom"

const Top = styled.div`
  background-color: rgb(248, 249, 249);
  height: 100vh;
`

const TempHeader = styled.div`
  border: 1px solid black;
  position: fixed;
  top: 0;
  width: 100vw;
`
// 높이 너비는 임시값
const TempBody = styled.div`
  margin: 0 auto;
  height: 800px;
  width: 88%;
  min-width: 500px;
  border: 1px solid black;
  display: flex;
  >.temp {
    border: 1px solid red;
    margin: 0 3px;
  }
`

function App() {
  return (
    <BrowserRouter>
    <Top>
      <TempHeader>Header</TempHeader>
      <Routes>
        <Route path='/' element={
          <TempBody>
            <Nav />
              <div className='temp'>Main</div>
            <RightSidebar />
          </TempBody>
        }/>
        <Route path='/ask' element={<AskPage />}/>
      </Routes>
      <Footer />
    </Top>
    </BrowserRouter>
  );
}

export default App;
