import './App.css';
import styled from 'styled-components'
import Nav from './conponents/Nav';
import RightSidebar from './conponents/RightSidebar';
import Footer from './conponents/Footer';

const TempHeader = styled.div`
  border: 1px solid black;
  position: sticky;
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
    <div>
      <TempHeader>Header</TempHeader>
      <TempBody>
        <Nav />
          <div className='temp'>Main</div>
        <RightSidebar />
      </TempBody>
      <Footer />
    </div>
  );
}

export default App;
