import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IconContext } from "react-icons/lib";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 1264px;
  padding: 10px 24px 30px;
  margin: 0 auto;
`;

const HeadTextBox = styled.div`
  padding: 60px 0;
  > h1 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const InformationWindow = styled.div`
  background-color: rgb(236, 244, 251);
  border: 1px solid rgb(174, 205, 234);
  border-radius: 3px;
  padding: 25px 25px;
  width: 69%;
  > ul {
    margin-left: 2rem;
    list-style: square;
    > li {
      font-size: 1rem;
    }
  }
  > h5 {
    font-weight: 600;
    margin: 10px 0;
    font-size: 1rem;
  }
  > h2 {
    font-size: 1.6rem;
    font-weight: 445;
    margin-bottom: 10px;
  }
  > p {
    font-size: 1.1rem;
    span {
      color: rgb(50, 125, 202);
      font-weight: 500;
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
`;

const WriteGuide = styled.div`
  display: ${(props) => (props.block ? "block" : "none")};
  border: 1px solid rgb(213, 217, 221);
  border-radius: 2px;
  box-shadow: 0 0 10px 1px rgb(232, 234, 235);
  overflow: hidden;
  height: 181px;
  margin-left: 15px;
`;

const GuideName = styled.div`
  background-color: rgb(247, 249, 250);
  border-bottom: 1px solid rgb(213, 217, 221);
  padding: 12px;
  font-size: 1.2rem;
  font-weight: 400;
`;

const GuideLine = styled.div`
  display: flex;
  background-color: rgb(255, 255, 255);
  height: 100%;
  justify-content: center;
  align-items: start;
  padding: 28px 20px;
  > .icon {
    margin-top: -7px;
  }
`;

const GuideText = styled.div`
  margin-left: 15px;
  > .first {
    margin-bottom: 1rem;
  }
  > p {
    font-size: 1rem;
  }
`;

const AskInputBox = styled.div`
  border: 1px solid rgb(228, 229, 231);
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  width: 69%;
  padding: 23px 25px;

  ${(props) => {
    if (props.disabled)
      return `
			opacity: 0.4;
			pointer-events: none;
		`;
  }}
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.2rem;
  > p {
    font-weight: 400;
    font-size: 1rem;
    margin: 6px 0 10px 0;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  height: 2rem;
  padding: 1.3rem 0.7rem;
  border: 1px solid rgb(186, 191, 197);
  border-radius: 2px;
  &:focus {
    outline: none;
    border: 1px solid rgb(107, 162, 217);
    border-radius: 2px;
    box-shadow: 0 0 0 3px rgb(222, 234, 247);
  }
  &::placeholder {
    color: rgb(188, 191, 197);
    font-size: 1rem;
  }
`;

// 추후에 Be에서 준비 됬을 때 ReactQuill로 변경
const ContentArea = styled.textarea`
  width: 100%;
  height: 90px;
  padding: 0.5rem 0.5rem;
  border: 1px solid rgb(186, 191, 197);
  border-radius: 2px;
  &:focus {
    outline: none;
    border: 1px solid rgb(107, 162, 217);
    border-radius: 2px;
    box-shadow: 0 0 0 3px rgb(222, 234, 247);
  }
`;

// display: ${props=>props.show?'block':'none'}
const NextBnt = styled.button`
  display: ${(props) => (props.block ? "block" : "none")};
  border: none !important;
  border-radius: 3px;
  background-color: rgb(67, 147, 247);
  color: rgb(255, 255, 255);
  padding: 11px;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: 600;
  &:disabled {
    background-color: rgb(161, 201, 251);
  }
  &::hover {
    backgroud-color: rgb(49, 114, 198);
  }
`;

export default function AskQuestion() {
	const [nextVaild, setNextVaild] = useState(false)
	const [submitVaild, setSubmitVaild] = useState(false)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [contentVaild, setContentVaild] = useState(false)
	const inputRef = useRef([])
	const [isBlock, setIsBlock] = useState(false);
	// 임시
	const isLogin = useSelector(state=>state.user.isAuthenticated)
	const navigate = useNavigate();
	const params = useParams();
	const url = process.env.REACT_APP_URL
	// https://7a34-59-5-132-158.jp.ngrok.io/
	useEffect(()=>{
		axios.get('/ask/1')
		.then(res=>{
			console.log(res.data)
		})
		.catch(err=>console.log(err.message))
		if(!isLogin) {
				window.alert('This service requires login.');
				navigate('/');
		}
		if(params.askId) {
			// contentVaild를 true로 바꾸고 대충 session 넣은 axios 갈겨서 title, content 채우기
			axios.get(`${url}/ask/find/${params.askId}`)
				.then(res=>{
					console.log(res)
					const oldTitle = res.data.data.title;
					const oldContent = res.data.data.content;
					console.log(oldTitle, oldContent);
					setTitle(oldTitle);
					setContent(oldContent);
					setContentVaild(true);
				})
				.catch(err=>{
					console.error(err.message);
				})
			}
		inputRef.current[0].focus();
		setIsBlock(true);
	},[])

	const Titlehandle = e =>{
		setTitle(e.target.value);
	}

  const TitleonFocusHandle = () => {
    if (!contentVaild) setNextVaild(true);
    setSubmitVaild(false);
    setIsBlock(true);
  };

	const onSubmitHandle = () => {
		axios.defaults.withCredentials = true;

		const Token = localStorage.getItem('JWT')
    const headers = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
				"Authorization": Token,
			}
    };

    const data = JSON.stringify({
      title: title,
			content: content
    })
    axios.post(`${url}/ask`, data, headers)
    .then(res=>{
      console.log('질문 등록 완료')
      navigate('/')
    })
  }

  const NextClick = () => {
    setContentVaild(true)
  }

	const ContentonFocusHandle = () => {
		setSubmitVaild(true);
		setNextVaild(false);
		setIsBlock(false);
	}

	const ContentChange = e =>{
		setContent(e.target.value)
	}

	return (
		<Container>
			<HeadTextBox>
				<h1>{params.askId?'Edit':'Ask'} a public question</h1>
			</HeadTextBox>
			<InformationWindow>
				<h2>Writing a good question</h2>
				<p>You’re ready to <span>ask</span> a <span>programming-related question</span> and this form will help guide you through the process.</p>
				<p>Looking to ask a non-programming question? See the topics here to find a relevant site.</p>
				<h5>Steps</h5>
				<ul>
					<li>Summarize your problem in a one-line title.</li>
					<li>Describe your problem in more detail.</li>
					<li>Describe what you tried and what you expected to happen.</li>
					<li>Add “tags” which help surface your question to members of the community.</li>
					<li>Review your question and post it to the site.</li>
				</ul>
			</InformationWindow>
			<FormContainer>
				<InputContainer>
					<AskInputBox>
						<Label for='title'>
							Title
							<p>Be specific and imagine you’re asking a question to another person.</p>
						</Label>
						<TitleInput 
							id="title"
							name="title"
							value={title}
							onChange={Titlehandle}
							ref={el=>inputRef.current[0]=el}
							onFocus={TitleonFocusHandle}
							placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
						/>
						<NextBnt 
							
							block={nextVaild}
							onClick={NextClick}
						>
							Next
						</NextBnt>
					</AskInputBox>
					<WriteGuide block={isBlock}>
						<GuideName>
							Writing a good title
						</GuideName>
						<GuideLine>
							<IconContext.Provider value={{size: '4rem'}}>
								<HiOutlinePencilSquare className={'icon'}/>
							</IconContext.Provider>
							<GuideText>
								<p className="first">Your title should summarize the problem.</p>
								<p>You might find that you have a better</p>
								<p>idea of your title after writing out the rest</p>
								<p>of the question.</p>
							</GuideText>
						</GuideLine>
					</WriteGuide>
				</InputContainer>
				<InputContainer>
					<AskInputBox disabled={contentVaild===false?true:false}>
						<Label for='content'>
							What are the details of your problem?
							<p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
						</Label>
						<ContentArea 
							id="content"
							name="content"
							value={content}
							ref={el=>inputRef.current[1]=el}
							onChange={ContentChange}
							onFocus={ContentonFocusHandle}
						/>
						<NextBnt 
							disabled={content.length<=15?true:false}
							block={submitVaild}
							onClick={onSubmitHandle}
						>
							Submit
						</NextBnt>
					</AskInputBox>
					<WriteGuide block={submitVaild}>
						<GuideName>
							Introduce the problem
						</GuideName>
						<GuideLine>
							<IconContext.Provider value={{size: '4rem'}}>
								<HiOutlinePencilSquare className={'icon'}/>
							</IconContext.Provider>
							<GuideText>
								<p>Explain how you encountered the problem</p>
								<p>you’re trying to solve, and any difficulties</p>
								<p>that have prevented you from solving it</p>
								<p>yourself.</p>
							</GuideText>
						</GuideLine>
					</WriteGuide>
				</InputContainer>
			</FormContainer>
		</Container>
	)
}
