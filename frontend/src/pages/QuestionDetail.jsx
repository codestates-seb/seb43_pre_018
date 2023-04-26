import styled from "styled-components"
import Nav from "../conponents/Nav";
import RightSidebar from "../conponents/RightSidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../conponents/QuestionDetail/Comments";
axios.defaults.withCredentials = true;

const MainWrapper = styled.div`
  width: 1050px;
  margin-top: 25px;
  margin-left: 24px;
  margin-right: auto;

  .header-title {
    display: flex;
    justify-content: space-between;

    .title {  
      font-size: 24px;
      margin-right: 25px;
    }

    .AskQuestionButton {
      background-color: #0a95ff;
      border: 1px solid #0a95ff;
      box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);
      width: 103px;
      height: 37px;
      color: white;
      font-weight: 400;
      border-radius: 3px; 
      cursor: pointer;

      &:hover {
        background-color: #3172C6;
      }
    }
  }

  .question-description {
    margin: 10px 0 20px;
    font-size: 13.5px;
  }

  #ask-box {
    border: none;
  }

  .text-box {
    width: 100%;
    display: flex;
    border-top: 1px solid #d7d9dc;
    padding-top: 20px;
    

    
    .Vote {
      text-align: center;
      width: 50px;  
      font-size: 20px;

      .up-button {
        cursor: pointer;
        width: 0;
        height: 0;
        border-bottom: 17px solid #BBBFC3;
        border-top: 17px solid transparent;
        border-left: 17px solid transparent;
        border-right: 17px solid transparent;
        margin-bottom: 20px;

        &:active {
          border-bottom: 17px solid black;
        }
      }

      .down-button {
        cursor: pointer;
        width: 0;
        height: 0;
        border-bottom: 17px solid transparent;
        border-top: 17px solid #BBBFC3;
        border-left: 17px solid transparent;
        border-right: 17px solid transparent;
        margin-top: 20px;

        &:active {
          border-top: 17px solid black;
        }
      }
    }

    .Content-text {
      margin-left: 20px;
      font-size: 15px;
      width: 100%;

      .Author-text-line {
        display: flex;
        justify-content: end;
        .Author-text {
          width: 200px;
          background-color: #DCE9F6;
          margin-top: 20px;
          text-align: start;
          padding: 5px;
          color: #838B94;
          .createdAt {
            color: #838B94;
          }

          .author {
            margin-top: 5px;
            color: #417DCA;
            font-weight: 445;
          }
        }
      }

      .Comment-text {
        margin-top: 20px;
        cursor: pointer;
        user-select: none;
        

        &:active {
          color: blue;
        }
      }
    }
  }

  .number--answer {
    margin-top: 20px;
    font-size: 24px;
  }

  .authorize-answer {
    border-top: 1px solid #d7d9dc;

    .authorize-header {
      margin-top: 20px;
      font-size: 24px;
    }

    .authorize-box {
      margin-top: 20px;
      width: 100%;
      height: 250px;
      resize: none;
    }

    .authorize-button {
      margin-top: 20px;
      background-color: #4393F7;
      width: 130px;
      height: 45px;
      color: white;
      border: none;
      font-weight: bolder;
      border-radius: 1px; 
      cursor: pointer;
    }
  }
`;

const BodyContainer = styled.div`
  margin: 33px auto 0;
  height: 100vh;
  min-height: calc(100vh - 378px);
  max-width: 1264px;
  padding: 20px 0 0;
  display: flex;
`

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  height: max-contnet;
  width: 100%;
  border-top: 1px solid #d7d9dc;
  .left-content {
    width: 724px;
  }
`




const DateLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const EditButton = styled.button`
  background-color: ${props=>props.red?'rgb(235, 55, 39)':'#D3D3D3'};
  border: 1px solid #A9A9A9;
  padding: 7px;
  margin-left: 7px;
  color: white;
  font-weight: 400;
  border-radius: 3px; 
  cursor: pointer;
  &:hover {
    background-color: #3172C6;
  }
`

function QuestionDetail() {
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])
  const [newAnswer, setNewAnswer] = useState('')
  const params = useParams();
  const navigate = useNavigate()
  const url = process.env.REACT_APP_URL;
  const token = localStorage.getItem('JWT')
  
  useEffect(()=>{
    const headers = {
      headers : {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      }
    }
    axios.get(`${url}/ask/${params.askId}?page=1&size=1`, headers)
    .then(res=>{
      setQuestion(res.data.data[0])
      setAnswers(res.data.data[1])
    })
    .catch(e=>console.error(e.message));
  },[])

  const answerChange = e => {
    setNewAnswer(e.target.value);
  }
  
	const onSubmit = (id) => {
    if(newAnswer!=='') {
      const data = JSON.stringify({
        content: newAnswer,
        askId: id
      })
      const headers = {
        headers : {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Authorization": token
        }
      }
      axios.post(`${url}/answer`,data, headers)
      .then(res=>{
        console.log(res)
        navigate(0);
      })
      .catch(e=>console.error(e.message))
    }
  }
  const username = localStorage.getItem('name');

  const questionDelete = () => {
    const headers = {
      headers : {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    axios.delete(`${url}/ask/${params.askId}`, headers)
    .then(console.log('delete ok'))
    .catch(e=>console.error(e.message))
  }

  return (
    <BodyContainer>
      <Nav/>
      <MainWrapper>
        <div className="header-title">
          <div className="title">
            {question.title}
          </div>
          <Link to={'/ask'}>
            <button className="AskQuestionButton">
              Ask Question
            </button>
          </Link>
        </div>
        <DateLine>
          <div className="question-description">
            {question.createdAt}
          </div>
          {
          question.memberName===username&&
            <div>
              <Link to={`/edit/${question.askId}`}>
                <EditButton>Edit Question</EditButton>
              </Link>
              <EditButton red={true} onClick={questionDelete}>Delete Question</EditButton>
            </div>
          }
        </DateLine>
        <MainContent>
          <div className="left-content">
            <div className="text-box" id="ask-box">
              <div className="Vote">
                <div className="up-button"></div>
                0<br />
                <div className="down-button"></div>
              </div>
              <div className="Content-text">
                {question.content}
                <div className="Author-text-line">
                  <div className="Author-text">
                    asked
                    <div className="createdAt">
                      {question.createdAt}
                    </div>
                    <div className="author">
                      {question.memberName}
                    </div>
                  </div>
                </div>
                <div className="Comment-text">
                  Add a comment
                </div>
              </div>
            </div>
            <div className="number--answer">
              3 Answers
            </div>
            {answers.map(e=>{
               return ( 
                <div className="text-box" key={e.answerId}>
                  <div className="Vote">
                    <div className="up-button"></div>
                    0<br />
                    <div className="down-button"></div>
                  </div>
                  <div className="Content-text">
                    {e.content}
                    <div className="Author-text-line">
                      <div className="Author-text">
                        answered
                        <div className="createdAt">
                          {e.createdAt}
                        </div>
                        <div className="author">
                          {e.memberName}
                        </div>
                      </div>
                    </div>
                    <Comments data={e.commentList} askId={question.askId} answerId={e.answerId}/>
                  </div>
                </div>)
            })}
            <div className="authorize-answer">
              <div className="authorize-header">
                Your answer
              </div>
              <textarea className="authorize-box" onChange={answerChange} value={newAnswer}/>
              <button className="authorize-button" onClick={()=>onSubmit(question.askId)}>
                Post your answer
              </button>
            </div>
          </div>
          <RightSidebar/>
        </MainContent>
      </MainWrapper>
    </BodyContainer>
  )
}

export default QuestionDetail