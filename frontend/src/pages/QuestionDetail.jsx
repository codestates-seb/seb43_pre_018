import styled from "styled-components"
import Nav from "../conponents/Nav";
import RightSidebar from "../conponents/RightSidebar";
import { Link } from "react-router-dom";

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
    margin-top: 20px;
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

      .Author-text-line {
        display: flex;
        justify-content: end;
        .Author-text {
          width: 200px;
          background-color: #DCE9F6;
          margin-top: 20px;
          text-align: start;
          padding: 5px;

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
    margin-top: 20px;

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

function QuestionDetail() {
  return (
    <BodyContainer>
      <Nav/>
      <MainWrapper>
        <div className="header-title">
          <div className="title">
            how to adds a field and fills in the specified parameters in kafka hisrtory event
          </div>
          <Link to={'/ask'}>
            <button className="AskQuestionButton">
              Ask Question
            </button>
          </Link>
        </div>
        <div className="question-description">
          Asked 7 months ago Modified today Viewed 613 times
        </div>
        <MainContent>
          <div className="left-content">
            <div className="text-box" id="ask-box">
              <div className="Vote">
                <div className="up-button"></div>
                0<br />
                <div className="down-button"></div>
              </div>
              <div className="Content-text">
                I'm trying to create a column "Cust Rank" which will give me random numbers which should be based on other column "Creator". The only catch here is that the random Numbers should be same for the same Creators.
                <div className="Author-text-line">
                  <div className="Author-text">
                    <div className="createdAt">
                      asked Sep 8, 2022 at 10:23
                    </div>
                    <div className="author">
                      Nabeel Parkar
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
            <div className="text-box">
              <div className="Vote">
                <div className="up-button"></div>
                0<br />
                <div className="down-button"></div>
              </div>
              <div className="Content-text">
                It seems like dedicated Nvidia GPU's are causing the problem. I have a 3060 laptop and I have the same issue and when I set it to guest it seems to work. My guess is that setting changes it from using the GPU to the CPU. I would recommend you try setting android studio to use integrated graphics instead of dedicated. Since I have a 8 core CPU compared to a 4 core CPU of yours, I'm guessing that's the reason I don't get as bad performance
                <div className="Author-text-line">
                  <div className="Author-text">
                    <div className="createdAt">
                      answered Dec 29, 2022 at 20:12
                    </div>
                    <div className="author">
                      Ayman Isam
                    </div>
                  </div>
                </div>
                <div className="Comment-text">
                  Add a comment
                </div>
              </div>
            </div>
            <div className="authorize-answer">
              <div className="authorize-header">
                Your answer
              </div>
              <textarea className="authorize-box" />
              <button className="authorize-button">
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