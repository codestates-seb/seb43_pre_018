import styled from "styled-components";
import {HiPencil} from "react-icons/hi"
import {FiMessageSquare} from "react-icons/fi"
import {DiStackoverflow} from "react-icons/di"
import {RiNumber7} from "react-icons/ri"

const Container = styled.div`
	height: 100%;
	width: 25%;
`

const Post = styled.ul`
	border: 1px solid #EFE5C0;
	border-radius: 5px;
	overflow: hidden;
	list-style: none;
	margin-top: 10px;
	margin-left: 10px;
`

const Title = styled.li`
	background-color: rgb(249, 243, 219);
	font-weight: 500;
	padding: 8px 10px;
	border-top: 1px solid rgb(237, 229, 196);
	border-bottom: 1px solid rgb(237, 229, 196);
	font-size: 0.6rem;
`

const Items = styled.li`
	background-color: rgb(251, 247, 230);
	display: flex;
	padding: 5px 3px 3px; 5px;
	>span {
		padding: 3px;
		font-size: 0.6rem;
	}
`

export default function RightSidebar() {
	return (
		<Container>
			<Post>
				<Title>The Overflow Blog</Title>
				<Items>
					<span>
						<HiPencil />						
					</span>
					<span>
						Are meetings making you less productive?
					</span>
				</Items>
				<Items>
					<span>
						<HiPencil />						
					</span>
					<span>
						The philosopher who believes in Web Assembly
					</span>
				</Items>
				<Title>Featured on Meta</Title>
				<Items>
					<span>
						<FiMessageSquare />
					</span>
					<span>
						Improving the copy in the close modal and post notices - 2023 edition
					</span>
				</Items>
				<Items>
					<span>
						<DiStackoverflow />						
					</span>
					<span>
						Temporary policy: ChatGPT is banned
					</span>
				</Items>
				<Items>
					<span>
						<DiStackoverflow />
					</span>
					<span>
						The [protection] tag is being burninated
					</span>
				</Items>
				<Items>
					<span>
						<DiStackoverflow />
					</span>
					<span>
						Content Discovery initiative 4/13 update: Related questions using a Machine...
					</span>
				</Items>
				<Title>Hot Meta Posts</Title>
				<Items>
					<span>
						<RiNumber7 />
					</span>
					<span>
						Degraded performance of viewing user profiles from chat
					</span>
				</Items>
			</Post>
		</Container>	
	)
}