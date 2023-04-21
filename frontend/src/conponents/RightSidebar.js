import styled from "styled-components";
import {HiPencil} from "react-icons/hi"
import {FiMessageSquare} from "react-icons/fi"
import {DiStackoverflow} from "react-icons/di"
import {RiNumber7} from "react-icons/ri"
import { IconContext } from "react-icons/lib";

const Container = styled.div`
	height: 100%;
	max-width: 300px;
`

const Post = styled.ul`
	border: 1px solid #EFE5C0;
	border-radius: 5px;
	overflow: hidden;
	list-style: none;
	margin-top: 10px;
	margin-left: 24px;
`

const Title = styled.li`
	background-color: rgb(249, 243, 219);
	font-weight: 600;
	padding: 12px 13px;
	border-top: 1px solid rgb(237, 229, 196);
	border-bottom: 1px solid rgb(237, 229, 196);
	font-size: 0.9rem;
`

const Items = styled.li`
	background-color: rgb(251, 247, 230);
	display: flex;
	padding: 10px 3px 5px 10px;
	>span {
		padding: 3px;
		font-size: 1rem;
	}
	>.icon {
		margin-right: 5px;
	}
`

export default function RightSidebar() {
	return (
		<Container>
			<Post>
				<Title>The Overflow Blog</Title>
				<Items>
					<IconContext.Provider value={{size: '1.2rem'}}>
						<HiPencil className={'icon'}/>						
					</IconContext.Provider>
					<span>
						Are meetings making you less productive?
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '1.2rem'}}>
						<HiPencil className={'icon'}/>						
					</IconContext.Provider>
					<span>
						The philosopher who believes in Web Assembly
					</span>
				</Items>
				<Title>Featured on Meta</Title>
				<Items>
					<IconContext.Provider value={{size: '1.5rem', color: 'blue'}}>
						<FiMessageSquare className={'icon'}/>
					</IconContext.Provider>
					<span>
						Improving the copy in the close modal and post notices - 2023 edition
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '1.2rem'}}>
						<DiStackoverflow className={'icon'}/>						
					</IconContext.Provider>
					<span>
						Temporary policy: ChatGPT is banned
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '1.2rem'}}>
						<DiStackoverflow className={'icon'}/>
					</IconContext.Provider>
					<span>
						The [protection] tag is being burninated
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '2.2rem'}}>
						<DiStackoverflow className={'icon'}/>
					</IconContext.Provider>
					<span>
						Content Discovery initiative 4/13 update: Related questions using a Machine...
					</span>
				</Items>
				<Title>Hot Meta Posts</Title>
				<Items>
					<IconContext.Provider value={{size: '1.2rem'}}>
						<RiNumber7 className={'icon'}/>
					</IconContext.Provider>
					<span>
						Degraded performance of viewing user profiles from chat
					</span>
				</Items>
			</Post>
		</Container>	
	)
}