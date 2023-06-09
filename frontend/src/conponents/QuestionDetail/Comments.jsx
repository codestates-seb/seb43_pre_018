import axios from "axios";
import { useRef, useState  } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {FiEdit3} from "react-icons/fi"
import { IconContext } from "react-icons/lib";
import {RiDeleteBin2Line} from "react-icons/ri"


const SubContainer =styled.div`
	display: flex;
	justify-content: ${props=>props.edit?'space-between':'start'};
	align-items: center;
	border-top: ${props=>props.first?'2px solid rgb(241, 242, 243)':'1px solid rgb(241, 242, 243)'};
	border-bottom: ${({first})=>first?'none':'1px solid rgb(241, 242, 243)'};
`

const CommentBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 8px 0 8px 40px;
	>span {
		margin-right: 5px;
	}
`

const Author = styled.span`
	color: #417DCA;
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

const IconContainer = styled.div`
  justify-content: end;
  >.edit-icon {
    margin-left: 5px;
    justify-self: start;
}`

export default function Comments({data, i}) {
	const [newContent, setNewContent] = useState('')
	const [add, setAdd] = useState(false);
	const [isEdit, setIsEdit] = useState(false)
	const navigate = useNavigate()
	const username = localStorage.getItem('name');
	const url = process.env.REACT_APP_URL;
	const token = localStorage.getItem('JWT')
	axios.defaults.withCredentials = true;
	const headers = {
		headers : {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json;charset=utf-8",
			"Authorization": token
		}
	}

	const editVaild = (content) => {
		setIsEdit(true)
		console.log(isEdit)
		setNewContent(content)
	}

	const cancel = () => {
		setIsEdit(false);
	}

	const commentDelete = (commentId) => {
    const headers = {
      headers : {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Authorization": token
      }
    }
    axios.delete(`${url}/comment/${commentId}`, headers)
    .then(res=>{
      console.log('ansewr delete ok')
      navigate(0)
    })
    .catch(e=>console.error(e.message))
  }

	const onChangeHandle = e => {
		setNewContent(e.target.value)
	}

	const commentKeyup = e => {
		if(e.key==='Enter'&&newContent!=='') {
			editSubmit()
		} else if (e.key==='Escape') {
			setIsEdit(false)
			setNewContent('')
		}
	}

	const editSubmit = () => {
		if(newContent!=='') {
			const body = JSON.stringify({
				content: newContent
			})
			axios.patch(`${url}/comment/${data.commentId}`, body, headers)
			.then(res=>{
				window.alert('답변 수정완료')
				navigate(0)
			})
		} else {
			window.alert("야 뭐하나? 이게 최선이야?")
			setNewContent(data.content)
		}
	}

	return (
		<>
			{isEdit?<InputForm>
				<Input
					value={newContent}
					onChange={onChangeHandle}
					onKeyUp={commentKeyup}
				/>
				<span onClick={cancel}>X</span>
			</InputForm>
			:<SubContainer 
				edit={username===data.memberName}
				key={data.commentId} 
				first={i===0&&true}
			>
				<CommentBox>
					<span>{data.content}</span>
					<span>-</span>
					<Author>{data.memberName}</Author>
					<span>{data.createdAt}</span>
				</CommentBox>
				{username===data.memberName&&
				<IconContainer>
					<IconContext.Provider value={{size: '1.2rem', color: 'darkgray'}}>
						<FiEdit3 className="edit-icon" onClick={()=>editVaild(data.content)}/>
					</IconContext.Provider>
					<IconContext.Provider value={{size: '1.2rem', color: 'rgb(235, 55, 39)'}}>
						<RiDeleteBin2Line className="edit-icon" onClick={()=>commentDelete(data.commentId)}/>
					</IconContext.Provider>
				</IconContainer>
				}
			</SubContainer>}	
		</>
	)
}