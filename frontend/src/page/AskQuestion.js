import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {HiOutlinePencilSquare} from "react-icons/hi2"
import { IconContext } from "react-icons/lib";

const Container = styled.div`
	width: 1000px;
	padding: 10px 24px 30px;
	margin: 0 auto;
`

const HeadTextBox = styled.div`
 padding: 40px 0;
	>h1 {
		font-size: 1.5rem;
		font-weight: bold;
	}
`

const InformationWindow = styled.div`
	background-color: rgb(236, 244, 251);
	border: 1px solid rgb(174, 205, 234);
	border-radius: 3px;
	padding: 20px 20px;
	width: 65%;
	>ul {
		margin-left: 2rem;
		>li {
			font-size: 0.5rem;
		}
	}
	>h5 {
		font-weight: 600;
		margin: 10px 0;
		font-size: 0.8rem;
	}
	>h2 {
		font-size: 1.2rem;
		font-weight: 445;
		margin-bottom: 10px;
	}
	>p span {
		color: rgb(50, 125, 202);
		font-weight: 500;
	}
`

const FormContainer = styled.div`
	width: 100%;
	margin-top: 10px;
`

const InputContainer = styled.div`
	width: 100%;
	display: flex;
	padding: 5px 0;
`

const WriteGuide = styled.div`
	display: ${props=>props.block?'block':'none'};
	border: 1px solid rgb(213, 217, 221);
	border-radius: 2px;
	box-shadow: 0 0 10px 1px rgb(232, 234, 235);
	overflow: hidden;
	height: 149px;
	margin-left: 15px;
`

const GuideName = styled.div`
	background-color: rgb(247, 249, 250);
	border-bottom: 1px solid rgb(213, 217, 221);
	padding: 12px;
`

const GuideLine = styled.div`
	display: flex;
	background-color: rgb(255, 255, 255);
	height: 71%;
	justify-content: center;
	align-items: start;
	padding: 20px 20px;
	>.icon {
		margin-top: -7px;
	}
`

const GuideText = styled.div`
	margin-left: 10px;
	>.first {
		margin-bottom: 1rem;
	}
	>p {
		font-size: 0.1rem;
	}
`

const AskInputBox = styled.div`
	border: 1px solid rgb(228, 229, 231);
	background-color: rgb(255, 255, 255);
	border-radius: 3px;
	width: 65%;
	padding: 20px 20px;
	>label {
		font-weight: 600;
		>p{
			font-weight: 300;
			font-size: 0.3rem;
			margin: 6px 0 10px 0;
		}
	}
	${props=>{
			if(props.disabled) return `
			opacity: 0.4;
			pointer-events: none;
		`
	}}
`

const Label = styled.label`
	font-weight: 600;
	>p{
		font-weight: 300;
		font-size: 0.3rem;
		margin: 6px 0 10px 0;
	}
`

const TitleInput = styled.input`
	width: 100%;
	height: 2rem;
	padding: 0 0.5rem;
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
		font-size: 0.8rem;
	}
`

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
`


// display: ${props=>props.show?'block':'none'}
const NextBnt = styled.button`
	display: ${props=>props.block?'block':'none'};
	border: none !important;
	border-radius: 2px;
	background-color: rgb(67, 147, 247);
	color: rgb(255, 255, 255);
	padding: 8px;
	margin-top: 10px;
	font-size: 0.8rem;
	&:disabled {
		background-color: rgb(161, 201, 251)
	}
	&:hover {
		backgroud-color: rgb(49, 114, 198);
	}
`

export default function AskQuestion() {
	const [nextVaild, setNextVaild] = useState(false)
	const [submitVaild, setSubmitVaild] = useState(false)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [contentVaild, setContentVaild] = useState(false)
	const inputRef = useRef([])
	const [isBlock, setIsBlock] = useState(false);
	// const contentRef = useRef(null)

	useEffect(()=>{
		inputRef.current[0].focus();
		setIsBlock(true);
	},[])

	// handler
	const Titlehandle = e =>{
		setTitle(e.target.value);
	}

	const TitleonFocusHandle = () => {
		if(!contentVaild) setNextVaild(true);
		setSubmitVaild(false);
		setIsBlock(true)
	}

	const ContentonFocusHandle = () => {
		setSubmitVaild(true);
		setNextVaild(false);
		setIsBlock(false);
	}

	const ContentChange = e =>{
		setContent(e.target.value)
	}

	const NextClick = () => {
		setContentVaild(true);
		setNextVaild(false);
		inputRef.current[1].focus();
	}

	return (
		<Container>
			<HeadTextBox>
				<h1>Ask a public question</h1>
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
							disabled={title.length>=5?false:true}
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
							<IconContext.Provider value={{size: '3rem'}}>
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
							disabled={content.length>=15?true:false}
							block={submitVaild}
						>
							Submit
						</NextBnt>
					</AskInputBox>
					<WriteGuide block={submitVaild}>
						<GuideName>
							Introduce the problem
						</GuideName>
						<GuideLine>
							<IconContext.Provider value={{size: '3rem'}}>
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