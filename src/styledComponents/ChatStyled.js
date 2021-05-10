import styled from 'styled-components'


export const AppContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 10px;
`

export const SidePanel = styled.div`
background-color: rgba(255, 255, 255, 0.8);
text-align: center;
font-size: 30px;
background-color: orange;
height:100vh;
`


export const Messages = styled.div`
background-color: rgba(255, 255, 255, 0.8);
text-align: left;
padding: 20px 0;
font-size: 30px;
`

export const MetaPanel = styled.div`
background-color: rgba(255, 255, 255, 0.8);
text-align: center;
padding: 20px 0;
font-size: 30px;
`

export const ChatIcon = styled.img`
width: 60px;
height: 60px;
margin-right: 20px;
@media (max-width: 768px) {
  width: 50px;
    height: 50px;
}
`


export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
font-family: helvetica;
font-size: 40px;
font-weight: 900;
background-color: darkorange;
`

export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: transparent;
`;

export const StyledLi = styled.li`
  float: left;
`;

export const Dropbtn = styled.div`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: transparent;
  width: 300px;
  z-index: 1;
`;

export const DropDownLi = styled(StyledLi)`
  display: inline-block;
  width: 300px;
  &:hover {
    background-color: darkorange;
    cursor: pointer;
  }
  &:hover ${DropDownContent} {
    display: block;
    width: 300px;
  }
`;



export const SubA = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: darkorange;
  }
`;