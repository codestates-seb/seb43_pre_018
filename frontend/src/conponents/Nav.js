import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
	height: 100%;
	width: 160px;
	border-right: 1px solid #D7D9DC;
	padding-top: 25px;
	position: relative;
`

// BookMark 추후에 vote순으로 정렬할 때 NavLink로 변경필요
const BookMark = styled.button`
	border: none;
	background-color: inherit;
	width: 100%;
	height: 30px;s
	display: block;
	text-align: left;
	>span {
		margin-left: 10px;
		font-size: 1rem;
		color: rgb(118, 122, 128);
	}
`

const StickyBox = styled.div`
	position: sticky;
	width: 100%;
	top: 70px;
`

const Nlink = styled(NavLink)`
	&.active {
			>button	{
				background-color: #F1F2F3;
				border-right: 3px solid #E5883E;
				>span {
				font-weight: 700;
				font-size: 1.1rem;
				color: rgb(12, 13, 14);
			}
		}
	}
`


export default function Nav() {
	return (
		<NavContainer>
			<StickyBox>
				<Nlink to={'/'}>
					<BookMark>
						<span>
							Home
						</span>
					</BookMark>
				</Nlink>
				<BookMark>
					<span>
						Vote
					</span>
				</BookMark>
			</StickyBox>
		</NavContainer>
	)
}