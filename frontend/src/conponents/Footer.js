import styled from "styled-components";

const Container = styled.footer`
	height: max-content;
	width: 100vw;
	background-color: rgb(36, 38, 41);
	padding-top: 10px;
	letter-spacing: 0;
`

const Centering = styled.div`
	height: 100%;
	width: 1100px;
	display: flex;
	padding: 18px 12px 12px;
	margin: 0 auto;
`

const Logo = styled.div`
	flex: 0 0 54px;
	margin: -12px 0 32px;
`

const ListContainer = styled.div`
	display: flex;
	flex: 1.5 1 auto;
`

const FooterList = styled.ul`
	list-style: none;
	flex: 1 0 auto;
  padding: 0 0 24px 0;
`

const ListTatle = styled.li`
	font-weight: 800;
	font-size: 0.5rem;
	color: rgb(187, 191, 195);
	margin: 0 0 9px;
`

const ListItem = styled.li`
	font-weight: 600;
	color: ${(props)=>props.isEmpty===true?'rgba(0, 0, 0, 0);':'rgb(141, 149, 155)'};
	line-height: 2;
  font-size: 10px;
  list-style: none;
`

const CopyrightContainer = styled.div`
	height: 220px;
	color: hsl(210,8%,70%);
	display: flex;
	justify-content: space-between;
  flex-direction: column;
  flex: 0.8 1 150px;
`

const SNS = styled.div`
	>span {
		font-size: 10px;
		letter-spacing: 0px;
		margin-right: 10px;
	}
`

const Copyright = styled.div`
	margin: auto 0 20px;
	list-style: none;
	>li {
		letter-spacing: 0px;
		font-size: 10px;
	}
`

export default function Footer() {
	return (
		<Container>
			<Centering>
				<Logo>
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-stack-overflow" viewBox="0 0 16 16">
						<path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z" color="rgb(188, 187, 187)"/>
						<path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z" color="rgb(229, 134, 61)"/>
					</svg>	
				</Logo>
				<ListContainer>
					<FooterList>
						<ListTatle>STACK OVERFLOW</ListTatle>
						<ListItem>Questions</ListItem>
						<ListItem>Help</ListItem>
					</FooterList>
					<FooterList>
						<ListTatle>PRODUCTS</ListTatle>
						<ListItem>Teams</ListItem>
						<ListItem>Advertising</ListItem>
						<ListItem>Collectives</ListItem>
						<ListItem>Talent</ListItem>
					</FooterList>
					<FooterList>
						<ListTatle>COMPANY</ListTatle>
						<ListItem>About</ListItem>
						<ListItem>Press</ListItem>
						<ListItem>Work Here</ListItem>
						<ListItem>Legal</ListItem>
						<ListItem>Privacy Policy</ListItem>
						<ListItem>Terms of Service</ListItem>
						<ListItem>Contact Us</ListItem>
						<ListItem>Cookie Settings</ListItem>
						<ListItem>Cookie Policy</ListItem>
					</FooterList>
					<FooterList>
						<ListTatle>STACK EXCHANGE NETWORK</ListTatle>
						<ListItem>Technology</ListItem>
						<ListItem>Culture & recreation</ListItem>
						<ListItem>Life & arts</ListItem>
						<ListItem>Science</ListItem>
						<ListItem>Professional</ListItem>
						<ListItem>Business</ListItem>
						<ListItem isEmpty={true}>a</ListItem>
						<ListItem>API</ListItem>
						<ListItem>Data</ListItem>
					</FooterList>
				</ListContainer>
				<CopyrightContainer>
					<SNS>
						<span>Blog</span>
						<span>Facebook</span>
						<span>Twitter</span>
						<span>Linkedin</span>
						<span>Instagram</span>
					</SNS>
					<Copyright>
						<li>Site design / logo © 2023 Stack Exchange Inc; user</li>
						<li>contributions licensed under CC BY-SA.</li>
						<li>rev 2023.4.17.43393</li>
					</Copyright>
				</CopyrightContainer>
			</Centering>
		</Container>
	)
}