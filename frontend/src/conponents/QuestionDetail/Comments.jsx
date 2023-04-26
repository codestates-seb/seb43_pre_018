import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {FiEdit3} from "react-icons/fi"
import { IconContext } from "react-icons/lib";
import {RiDeleteBin2Line} from "react-icons/ri"

const Container = styled.div`
	margin-top: 20px;
`

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

const AddForm = styled.div`
	padding: 10px 0 13px;
	color: rgb(182, 186, 191);
	&:hover {
		cursor: pointer;
	}
`

const IconContainer = styled.div`
  justify-content: end;
  >.edit-icon {
    margin-left: 5px;
    justify-self: start;
}`

export default function Comments({data, askId, answerId}) {
	const [newContent, setNewContent] = useState('')
	const [add, setAdd] = useState(false);
	const inputRef = useRef([]);
	const navigate = useNavigate()
	const username = localStorage.getItem('name');
	const url = process.env.REACT_APP_URL;
	const token = localStorage.getItem('JWT')

	const onChangeHandle = e => {
		setNewContent(e.target.value)
	}

	const onKeyUpHandle = e => {
		if(e.key==='Enter'&&newContent!=='') {
				const url = process.env.REACT_APP_URL;
				axios.defaults.withCredentials = true;
				const token = localStorage.getItem('JWT')
				const headers = {
					headers : {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
						"Authorization": token
					}
				}
				const data = JSON.stringify({
					askId: askId,
					answerId: answerId,
					content: newContent
				})
				console.log(data)
				axios.post(`${url}/comment`,data, headers)
				.then(res=>{
					console.log(res)
					navigate(0)
				})
				.catch(e=>console.error(e.message))
			
		} else if(e.key==='Escape') {
			setNewContent('')
			setAdd(false)
		}
	}

	const onAddHandle = () => {
		// inputRef.current.focus();
		setAdd(true);
	}

	const cancel = () => {
		setAdd(false);
	}

	// const onSubmit = () => {
	// 	if(newContent!=='') {
	// 		const url = process.env.REACT_APP_URL;
	// 		axios.defaults.withCredentials = true;
	// 		const token = localStorage.getItem('JWT')
  //     const headers = {
  //       headers : {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         "Authorization": token
  //       }
  //     }
	// 		const data = JSON.stringify({
	// 			content: newContent,
	// 			askId: askId,
	// 			answerId: answerId
	// 		})
  //     axios.post(`${url}/comment`,data, headers)
  //     .then(res=>{
  //       console.log(res)
  //       navigate(0)
  //     })
  //     .catch(e=>console.error(e.message))
	// 	}
	// }

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

	return (
		<Container>
			{data.map((c,i)=>{
				return (
					<SubContainer 
						edit={username===c.memberName}
						key={c.commentId} 
						first={i===0&&true}
					>
						<CommentBox>
							<span>{c.content}</span>
							<span>-</span>
							<Author>{c.memberName}</Author>
							<span>{c.createdAt}</span>
						</CommentBox>
						{username===c.memberName&&
						<IconContainer>
							<IconContext.Provider value={{size: '1.2rem', color: 'darkgray'}}>
								<FiEdit3 className="edit-icon" />
							</IconContext.Provider>
							<IconContext.Provider value={{size: '1.2rem', color: 'rgb(235, 55, 39)'}}>
								<RiDeleteBin2Line className="edit-icon" onClick={()=>commentDelete(c.commentId)}/>
							</IconContext.Provider>
						</IconContainer>
						}
					</SubContainer>
				)
			})}
			{add? <InputForm>
				<Input
					value={newContent}
					onChange={onChangeHandle}
					onKeyUp={onKeyUpHandle}
					
				/>
				<span onClick={cancel}>X</span>
			</InputForm>
			:<AddForm onClick={onAddHandle}>Add a comment</AddForm>}
		</Container>
	)
}