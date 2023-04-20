import styled from "styled-components";

const NavContainer = styled.div`
	height: 100%;
	width: 164px;
	border-right: 1px solid #D7D9DC;
	padding-top: 10px;
	position: relative;
`

// BookMark 추후에 vote순으로 정렬할 때 NavLink로 변경필요
const BookMark = styled.button`
	border: none;
	background-color: inherit;
	width: 100%;
	height: 30px;
	display: block;
	text-align: left;
	&:focus {
		background-color: #F1F2F3;
		border-right: 3px solid #E5883E;
		font-weight: bold;
	}
	>span {
		margin-left: 10px;
	}
`

const StickyBox = styled.div`
	position: sticky;
	width: 100%;
	top: 25px;
`

export default function Nav() {
	return (
		<NavContainer>
			<StickyBox>
				<BookMark>
					<span>
						Home
					</span>
				</BookMark>
				<BookMark>
					<span>
						Vote
					</span>
				</BookMark>
			</StickyBox>
		</NavContainer>
	)
}