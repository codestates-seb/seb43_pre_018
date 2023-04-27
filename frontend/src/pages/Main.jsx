import styled from "styled-components"
import data from "../data.json"
import { Link } from 'react-router-dom';
import Nav from "../conponents/Nav";
import RightSidebar from "../conponents/RightSidebar";
import { useState, useEffect, useRef } from 'react';

const BodyContainer = styled.div`
  margin: 33px auto 0px;
  min-height: calc(100vh - 378px);
  max-width: 1264px;
  padding: 20px 0 0;
  display: flex;
`

const MainWrapper = styled.div`
  width: 751px;
  height: 100%;
  margin-top: 25px;
  .no-under-line {
    text-decoration: none;
    color: inherit;
  }
`;

const MainHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;

const MainHeaderUpWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .AskQuestionButton {
      background-color: #0a95ff;
      border: 1px solid #0a95ff;
      box-shadow: inset 0px 1.5px 0px 0px rgba(255, 255, 255, 0.3);
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

  .MainHeaderTitle {
    font-size: 30px;
  }
`;

const MainHeaderDownWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 8px;

  .DescriptionNumberQuestions {
    font-size: 18px;
    width: 300px;
    line-height: 30px;
  }

  .buttons {
    display:flex;

    .FilterLeftButton {
      border-left: 1px solid #808080;
      border-top: 1px solid #808080;
      border-bottom: 1px solid #808080;
      border-right: none;
      height: 30px;
      line-height: 28px;
      width: 60px;
      text-align: center;
      cursor: pointer;
    }

    .FilterRightButton {
      border-left: 1px solid #808080;
      border-top: 1px solid #808080;
      border-bottom: 1px solid #808080;
      border-right: 1px solid #808080;
      height: 30px;
      line-height: 28px;
      width: 80px;
      text-align: center;
      cursor: pointer;
    }

    .clicked {
      background-color: #e1e1e3;
    }
  }
`;

const ArticleBoxSelector = styled.div`
  width: 100%;
  border-top: 1px solid #d7d9dc;
  padding: 20px 0 0 60px;
  display: flex;
`;
// 답변 일정 갯수 있는 애들만 색 지정  background-color: rgb(252, 248, 229);

const ArticleStatus = styled.div`
  flex-direction: column;
  width: min-content;
  text-align: end;
  font-size: 14px;

  .articleAnswers {
    margin-top: 10px;
    text-align: center;
    white-space: nowrap;
  }

  .articleViews {
    margin-top: 10px;
  }
`;

const ArticleDescription = styled.div`
  margin-left: 10px;
  width: 100%;

  .ArticleTitle {
    color: rgb(49, 114, 198);
    font-size: 18px;
    opacity: 80%;
    cursor: pointer;;
    
    &:hover {
      opacity: 50%;
    }
  }

  .ArticleSummary {
    margin-top: 8px;
    font-size: 15px;
    font-weight: 400;
    color: rgb(60, 64, 69);
  }

  .AuthorProfile {
    text-align: end;
    margin-top: 20px;
    margin-right: 10px;
    display: flex;
    justify-content: end;

    .author {
      color: rgb(49, 114, 198);
    }

    .createdAt {
      margin-left: 5px;
      color: grey;
    }
  }
`;

function Main() {
  const [items, setItems] = useState(data);
  const [visibleItems, setVisibleItems] = useState([...items.slice(0, 5)]);
  const [fetching, setFetching] = useState(false);

  const fetchMoreItems = async () => {
    setFetching(true);

    const startIndex = visibleItems.length;
    const preItems = visibleItems.slice();
    const fetchedItems = items.slice(startIndex, startIndex + 5);
    setVisibleItems(() => {
      return [...preItems, ...fetchedItems];
    });
    setFetching(false);
  }

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      fetchMoreItems();
    }
  }

  const handleFilter = (e) => {
    if(e.target.classList[1] !== 'clicked') {
      if(e.target.classList[0] === 'FilterLeftButton') {
        const another = document.getElementsByClassName('FilterRightButton');
        another[0].classList.remove('clicked');
        e.target.classList.add('clicked');
        const sortedItems = items.sort((a, b) => a.id - b.id);
        setItems([...sortedItems]);
      } else {
        const another = document.getElementsByClassName('FilterLeftButton');
        another[0].classList.remove('clicked');
        e.target.classList.add('clicked');
        const sortedItems = items.sort((a, b) => a.likes - b.likes);
        setItems([...sortedItems]);
      }
    }
    setVisibleItems([...items.slice(0, 5)])
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)  
    }
  })

  return(
    <BodyContainer>
      <Nav />
      <MainWrapper>
        <MainHeaderWrapper>
          <MainHeaderUpWrapper>
            <div className='MainHeaderTitle'>All Questions</div>
            <Link to={'/ask'}>
              <button className="AskQuestionButton">
                Ask Question
              </button>
            </Link>
          </MainHeaderUpWrapper>
          <MainHeaderDownWrapper>
            <div className='DescriptionNumberQuestions'>
              {items.length} questions
            </div>
            <div className='buttons'>
              <div className='FilterLeftButton clicked' onClick={handleFilter}>Newest</div>
              <div className='FilterRightButton' onClick={handleFilter}>Most Voted</div>
            </div>
          </MainHeaderDownWrapper>
        </MainHeaderWrapper> 
        <div id="articleBox">
          {visibleItems.map((post, index) => (
            <div key={index}>
              <ArticleBoxSelector>
                <ArticleStatus>
                  <div className='articleVotes'><strong>{post.likes} Votes</strong></div>
                  <div className='articleAnswers'>{post.answers} answers</div>
                  <div className='articleViews'>{post.views} views</div>
                </ArticleStatus>
                <ArticleDescription>
                  <Link to={`/ask/${post.id}`}>
                    <div className='ArticleTitle'>
                      {post.title}
                    </div>
                  </Link>
                  <div className='ArticleSummary'>
                    {post.content}
                  </div>
                  <div className='AuthorProfile'>
                    <div className="author">
                    {post.author}
                    </div>
                    <div className="createdAt">
                    {post.date}
                    </div>
                  </div>
                </ArticleDescription>
              </ArticleBoxSelector>
            </div>
          ))}
        </div>
      </MainWrapper>
      <RightSidebar />
    </BodyContainer>
  )
}

export default Main