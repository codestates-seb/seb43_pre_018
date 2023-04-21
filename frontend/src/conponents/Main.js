import styled from "styled-components"
import data from "../data.json"

const MainHeaderWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const MainHeaderUpWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;

  .MainHeaderTitle {
    font-size: 30px;
  }
`;

const MainHeaderDownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  margin-left: 20px;

  .DescriptionNumberQuestions {
    font-size: 18px;
    width:300px;
  }

  .buttons {
    display:flex;

    .FilterLeftButton {
      border-left: 1px solid gray;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      border-right: none;
      background-color: white;
      height: 30px;
      line-height: 30px;
      width: 60px;
      text-align: center;
      background-color: lightgrey;
    }

    .FilterRightButton {
      border-left: 1px solid gray;
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      border-right: 1px solid gray;
      background-color: white;
      height: 30px;
      line-height: 30px;
      width: 80px;
      text-align: center;
    }
  }
`;

const AskQuestionButton = styled.button`
  background-color: #3fb7eb;
  color: white;
  border: none;
  border-radius: 1px;
`;

const ArticleBoxSelector = styled.div`
  width: 100%;
  border-top: 1px solid black;
  padding-top: 20px;
  display: flex;
  margin-top: 5px;
`;

const ArticleStatus = styled.div`
  flex-direction: column;
  width: min-content;
  text-align: end;
  font-size: 14px;
  margin-left: 20px;

  .articleAnswers {
    margin-top: 10px;
    border: 1px solid black;
    border-radius: 3px;
    text-align: center;
    white-space: nowrap;
    padding: 2px;
  }

  .articleViews {
    margin-top: 10px;
  }
`;

const ArticleDescription = styled.div`
  margin-left: 10px;
  width: 100%;

  .ArticleTitle {
    color: blue;
    font-size: 18px;
  }

  .ArticleSummary {
    margin-top: 8px;
    font-size: 15px;
  }
  .AuthorProfile {
    text-align: end;
    margin-top: 20px;
    margin-right: 10px;
  }
`;

function Main() {
  return(
    <div>
      <MainHeaderWrapper>
        <MainHeaderUpWrapper>
          <div className='MainHeaderTitle'>All Questions</div>
          <AskQuestionButton>Ask Question</AskQuestionButton>
        </MainHeaderUpWrapper>
        <MainHeaderDownWrapper>
          <div className='DescriptionNumberQuestions'>
          7,247,319 questions with no upvoted or accepted answers
          </div>
          <div className='buttons'>
            <div className='FilterLeftButton'>Newest</div>
            <div className='FilterRightButton'>Most Likes</div>
          </div>
        </MainHeaderDownWrapper>
      </MainHeaderWrapper>
      <div>
        {data.map((post, index) => (
        <div key={index}>
          <ArticleBoxSelector>
            <ArticleStatus>
              <div className='articleVotes'><strong>{post.likes} Votes</strong></div>
              <div className='articleAnswers'>{post.answers} answers</div>
              <div className='articleViews'>{post.views} views</div>
            </ArticleStatus>
            <ArticleDescription>
              <div className='ArticleTitle'>
                {post.title}
              </div>
              <div className='ArticleSummary'>
                {post.content}
              </div>
              <div className='AuthorProfile'>
                {post.author} {post.date}
              </div>
            </ArticleDescription>
          </ArticleBoxSelector>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Main