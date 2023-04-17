import './App.css';
import styled from 'styled-components'

const TempHeader = styled.div`
  border: 1px solid black;
`
const TempBody = styled.div`
  border: 1px solid black;
  display: flex;
  >div {
    border: 1px solid red;
    margin: 0 3px;
  }
`
const TempFooter = styled.div`
  border: 1px solid black;
`
function App() {
  return (
    <div>
      <TempHeader>Header</TempHeader>
      <TempBody>
        <div>Nav</div>
        <div>Main</div>
        <div>Side</div>
      </TempBody>
      <TempFooter>Footer</TempFooter>
    </div>
  );
}

export default App;
