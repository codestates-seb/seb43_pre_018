import styled from "styled-components"
import { MdOutlineImageNotSupported } from "react-icons/md"
import { IconContext } from "react-icons/lib"

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgb(242, 242, 243);
	display: flex;
	justify-content: center;
	align-items: center;
`

const Img = styled.div`
	padding: 25px;
	background-color: rgb(228, 228, 229);
	border-radius: 50%;
`

const Content = styled.div`
	margin-left: 40px;
`

const MainContent = styled.div`
	margin: 0 0 10px;
`

const Title = styled.h1`
	font-size: 2rem;
	font-weight: 500;
	margin-bottom: 5px;
`

const Description = styled.p`
	font-size: 1.4rem;
	font-weight: 400;
	color: rgb(36, 38, 41);
`

const SubContent = styled.ul`
	list-style: none;
	line-height: 2.2rem;
	>li {
		font-size: 1.05rem;
		>span {
			font-size: 1.05rem;
			font-weight: 500;
			color: rgb(60, 122, 201);
			cursor: pointer;
			&:hover {
				color: rgb(72, 150, 247);
			}
		}
	}
`

export default function Notfound() {
	return (
		<Container>
			<Img>
				<IconContext.Provider value={{size: '15rem', color: 'rgb(190, 190, 191)'}}>
					<MdOutlineImageNotSupported />
				</IconContext.Provider>
			</Img>
			<Content>
				<MainContent>
					<Title>Page not found</Title>
					<Description>We're sorry, we couldn't find the page you requested.</Description>
				</MainContent>
				<SubContent>
					<li>Try <span>searching for similar questions</span></li>
					<li>Browse our <span>recent questions</span></li>
					<li>Browse our <span>popular tags</span></li>
					<li>If you feel something is missing that should be here, <span>contact us.</span></li>
				</SubContent>
			</Content>
		</Container>
	)
}