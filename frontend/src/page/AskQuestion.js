import { useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	width: 88%;
	margin: 0 auto;

`

const HeadTextBox = styled.div`
	>h1 {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 40px 0;
	}
`

const InformationWindow = styled.div`
	background-color: rgb(236, 244, 251);
	border: 1px solid rgb(174, 205, 234);
	border-radius: 3px;
	padding: 20px 20px;
	width: 70%;
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
		color: rgb(65, 125, 202);
	}
`

const FormContainer = styled.form`
	width: 100%;
	margin-top: 20px;
`

const AskInputBox = styled.div`
	border: 1px solid rgb(228, 229, 231);
	background-color: rgb(255, 255, 255);
	border-radius: 3px;
	width: 70%;
	padding: 20px 20px;
	margin: 10px 0;
	>label {
		font-weight: 600;
		>p{
			font-weight: 300;
			font-size: 0.3rem;
			margin: 6px 0 10px 0;
		}
	}
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
	const [titleVaild, setTitleVaild] = useState(false)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [contentVaild, setContentVaild] = useState(false)
	const titleRef = useRef(null)
	const contentRef = useRef(null)

	// handler
	const Titlehandle =e=>{
		const text = e.target.value;
		setTitle(text);
		console.log(title.length)
		if(text.length>=15) {
			setTitleVaild(true)
		} else {
			setTitleVaild(false)
		}
	}
	console.log(titleRef.current.focus)
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
				<AskInputBox>
					<Label for='title'>
						Title
						<p>Be specific and imagine you’re asking a question to another person.</p>
					</Label>
					<TitleInput id="title" name="title" onChange={Titlehandle} ref={titleRef}/>
					<NextBnt disabled={title.length>=15?false:true}>
						Next
					</NextBnt>
				</AskInputBox>
				<AskInputBox>
					<Label for='content'>
						What are the details of your problem?
						<p>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
					</Label>
					<ContentArea id="content" name="content"/>
					<NextBnt disabled={true}>
						Submit
					</NextBnt>
				</AskInputBox>
			</FormContainer>
		</Container>
	)
}