import styled from "styled-components";
import {HiPencil} from "react-icons/hi"
import {FiMessageSquare} from "react-icons/fi"
import {DiStackoverflow} from "react-icons/di"
import {RiNumber7} from "react-icons/ri"
import { IconContext } from "react-icons/lib";

const Container = styled.div`
	height: 100%;
	max-width: 310px;
`

const Post = styled.ul`
	border: 1px solid #EFE5C0;
	border-radius: 3px;
	overflow: hidden;
	list-style: none;
	margin-top: 25px;
	margin-left: 24px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
`

const Title = styled.li`
	background-color: rgb(251, 243, 213);
	font-weight: 600;
	padding: 12px 13px;
	border-top: 1px solid rgb(237, 229, 196);
	border-bottom: 1px solid rgb(237, 229, 196);
	font-size: 1rem;
`

const Items = styled.li`
	background-color: rgb(252, 248, 227);
	display: flex;
	padding: 10px 10px 5px;
	>span {
		padding: 3px;
		font-size: 13px;
		color: rgb(108. 110. 109);
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
					<IconContext.Provider value={{size: '1.3rem'}}>
						<HiPencil className={'icon'}/>						
					</IconContext.Provider>
					<span>
						Are meetings making you less productive?
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '1.5rem'}}>
						<HiPencil className={'icon'}/>						
					</IconContext.Provider>
					<span>
						The philosopher who believes in Web Assembly
					</span>
				</Items>
				<Title>Featured on Meta</Title>
				<Items>
					<IconContext.Provider value={{size: '2rem', color: 'rgb(95, 160, 212)'}}>
						<FiMessageSquare className={'icon'}/>
					</IconContext.Provider>
					<span>
						Improving the copy in the close modal and post notices - 2023 edition
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '1.5rem'}}>
						<DiStackoverflow className={'icon'}/>						
					</IconContext.Provider>
					<span>
						Temporary policy: ChatGPT is banned
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '1.5rem'}}>
						<DiStackoverflow className={'icon'}/>
					</IconContext.Provider>
					<span>
						The [protection] tag is being burninated
					</span>
				</Items>
				<Items>
					<IconContext.Provider value={{size: '2.9rem'}}>
						<DiStackoverflow className={'icon'}/>
					</IconContext.Provider>
					<span>
						Content Discovery initiative 4/13 update: Related questions using a Machine...
					</span>
				</Items>
				<Title>Hot Meta Posts</Title>
				<Items>
					<IconContext.Provider value={{size: '1.4rem'}}>
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