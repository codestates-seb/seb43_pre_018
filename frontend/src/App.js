import './App.css';
import styled from 'styled-components'
import Nav from './conponents/Nav';
import RightSidebar from './conponents/RightSidebar';
import Footer from './conponents/Footer';
import AskQuestion from './page/AskQuestion';

// 임시
import {Routes, Route, useLocation} from "react-router-dom"

const Top = styled.div`
  height: ${props=>props.isAsk?'100vh':'100vh'};
  width: 100%;
  background-color: ${props=>props.isAsk?'rgb(248, 249, 249)':'rgb(255,255,255)'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  height: max-content;
  max-width: 1264px;
  padding-top: 20px;
  border: 1px solid black;
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
      <TempHeader>Header</TempHeader>
      <Routes>
        <Route path='/' element={
          <TempBody>
            <Nav />
              <div className='temp'>Main</div>
            <RightSidebar />
          </TempBody>
        }/>
        <Route path='/ask' element={<AskQuestion />}/>
      </Routes>
      <Footer />
    </Top>  
  );
}

export default App;
