import styled from "styled-components";
import Comments from "./Comments";
import {FiEdit3} from "react-icons/fi"
import { IconContext } from "react-icons/lib";
import {RiDeleteBin2Line} from "react-icons/ri"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const TextBox = styled.div`
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
		width: 100%;

		>.content-main {
			word-break: break-word;
			font-size: 15px;
		}
		.Author-text-line {
			display: flex;
			justify-content: end;
			align-items: end;
			width: 100%;
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
`

const IconContainer = styled.div`
  justify-content: end;
  >.edit-icon {
    margin-left: 5px;
    justify-self: start;
}
`

const TextArea = styled.textarea`
	width: 100%;
`

const EditButton = styled.button`
	border: none;
	background-color: rgb(188, 187, 187);
	border-radius: 0 3px 3px 0;
	color: white;
	padding: 0 3px;
`

const Container = styled.div`
	margin-top: 20px;
`

const InputForm = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	>span {
		color: rgb(118, 118, 118);
		margin-right: 10px;
		&:hover {
			cursor: pointer;	
		}
	}
`

const Input = styled.input`
	width: 96%;
	border: none;
	margin: 10px 0px 13px;
	padding: 0 10px;
	font-size: 1.1rem;
	color: rgb(118, 118, 118);
	&:focus {
		outline: none;
		border-bottom: 1px solid rgb(200, 200, 200);
	}
`

const AddForm = styled.div`
	padding: 10px 0 13px;
	color: rgb(182, 186, 191);
	&:hover {
		cursor: pointer;
	}
`

export default function Answers({data}) {
	const [editAnswer, setEditAnswer] = useState(false);
	const [newAnswer, setNewAnswer] = useState('')
	const username = localStorage.getItem('name')
	const navigate = useNavigate()
	const params = useParams()
	axios.defaults.withCredentials = true
	const url = process.env.REACT_APP_URL
	const token = localStorage.getItem('JWT')

	const [newContent, setNewContent] = useState('')
	const [isEdit, setIsEdit] = useState(false)
	const [add, setAdd] = useState(false);

	const onChangeHandle = e => {
		setNewContent(e.target.value)
	}

	

	const onKeyUpHandle = (e, askId, answerId) => {
		if(e.key==='Enter'&&newContent!=='') {
				postClick(askId, answerId);	
		} else if(e.key==='Escape') {
			setNewContent('')
			setAdd(false)
		}
	}

	const postClick = (askId, answerId) => {
		const data = JSON.stringify({
			askId: askId,
			answerId: answerId,
			content: newContent
		})
		console.log(data)
		axios.post(`${url}/comment`,data, headers)
		.then(res=>{
			console.log(res)
			setNewContent('')
			navigate(0)
		})
		.catch(e=>console.error(e.message))
	}

	const onAddHandle = () => {
		// inputRef.current.focus();
		setAdd(true);
	}

	const cancel = () => {
		setAdd(false);
	}

	const headers = {
		headers : {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
			"Authorization": token
		}
	}
	
	const answerDelete = (answerId) => {
		axios.delete(`${url}/answer/${answerId}`, headers)
		.then(res=>{
			console.log('ansewr delete ok')
			navigate(0)
		})
		.catch(e=>console.error(e.message))
	}

	const answerChange = e => {
		setNewAnswer(e.target.value)
	}

	const answerKeyUp = e => {
		if(e.key==='Enter'&&newAnswer!=='') {
			editSubmit()
		} else if (e.key==='Escape') {
			setEditAnswer(false)
			setNewAnswer('')
		}
	}

	const editSubmit = () => {
		if(newAnswer!=='') {
			const body = JSON.stringify({
				content: newAnswer
			})
			axios.patch(`${url}/answer/${data.answerId}`, body, headers)
			.then(res=>{
				window.alert('답변 수정완료')
				navigate(0)
			})
		} else {
			window.alert("야 뭐하나? 이게 최선이야?")
			setNewAnswer(data.content)
		}
	}
	
	const editClick = (data) =>{
		setEditAnswer(true)
		setNewAnswer(data)
	}
	return(
		<TextBox key={data.answerId}>
      <div className="Vote">
        <div className="up-button"></div>
        0<br />
        <div className="down-button"></div>
      </div>
			{editAnswer?
			<>
				<TextArea 
					value={newAnswer} 
					onChange={answerChange} 
					onKeyUp={answerKeyUp}
					isEdit={isEdit}
					setIsEdit={setIsEdit}
				/>
				<EditButton onClick={editSubmit}>Edit</EditButton>
			</>
			:<div className="Content-text">
        <div className="content-main">
          {data.content}
        </div>
        <div className="Author-text-line">
          {username===data.memberName&&
            <IconContainer>
              <IconContext.Provider value={{size: '1.5rem', color: 'darkgray'}}>
                <FiEdit3 className="edit-icon" onClick={()=>editClick(data.content)}/>
              </IconContext.Provider>
              <IconContext.Provider value={{size: '1.5rem', color: 'rgb(235, 55, 39)'}}>
                <RiDeleteBin2Line className="edit-icon" onClick={()=>answerDelete(data.answerId)}/>
              </IconContext.Provider>
            </IconContainer>
          }
          <div className="Author-text">
            answered
            <div className="createdAt">
              {data.createdAt}
            </div>
            <div className="author">
              {data.memberName}
            </div>
          </div>
        </div>
        {/* <Comments data={data.commentList} askId={params.askId} answerId={data.answerId}/> */}
				<Container>
					{data.commentList.map((e,i)=><Comments
						key={i}
						data={e} 
						i={i}
					/>)}
					{add? <InputForm>
					<Input
						value={newContent}
						onChange={onChangeHandle}
						onKeyUp={(e)=>onKeyUpHandle(e, params.askId, data.answerId)}
						
					/>
					<span onClick={cancel}>X</span>
				</InputForm>
				:<AddForm onClick={onAddHandle}>Add a comment</AddForm>}
			</Container>
      </div>}
			</TextBox>
	)
}