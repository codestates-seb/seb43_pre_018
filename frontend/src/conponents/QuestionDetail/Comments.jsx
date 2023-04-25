import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	
	margin-top: 20px;
`

const CommentBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	border-top: ${props=>props.first?'2px solid rgb(241, 242, 243)':'1px solid rgb(241, 242, 243)'};
	border-bottom: ${({first})=>first?'none':'1px solid rgb(241, 242, 243)'};
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

export default function Comments({data}) {
	const [newContent, setNewContent] = useState('')
	const [add, setAdd] = useState(false)

	const onChangeHandle = e => setNewContent(e.target.value)

	const onToggle = () => setAdd(true)
	return (
		<Container>
			{data.map((c,i)=>{
				console.log(i, c.length)
				return (
						<CommentBox 
							key={c.commentId} 
							first={i===0&&true}
						>
							<span>{c.content}</span>
							<span>-</span>
							<Author>{c.memberName}</Author>
							<span>{c.createdAt}</span>
						</CommentBox>
				)
			})}
			{add? <InputForm>
				<Input
					value={newContent}
					onChange={onChangeHandle}
				/>
				<span>X</span>
			</InputForm>
			:<AddForm onClick={onToggle}>Add a comment</AddForm>}
		</Container>
	)
}