import styled from 'styled-components'


export const AppContainer = styled.div`
display: grid;
grid-template-columns: 80px auto 1fr 1fr ;
`

export const SidePanel = styled.div`
background-color: rgba(255, 255, 255, 0.8);
text-align: center;
font-size: 30px;
background-color: #FAFAFA;
height:100vh;
max-width:260px;
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
width: 30px;
height: 30px;
margin-right: 20px;
@media (max-width: 768px) {
  width: 30px;
height: 30px;
}
`


export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
font-family: 'Crete Round', serif;
font-size: 2rem;
font-weight: 900;`

export const DropDownContainer = styled("div")`
  margin: 0 auto;
  padding: 0 20px;
`;

export const DropDownHeader = styled("div")`
  font-weight: 500;
  font-family: 'Crete Round', serif;
  font-size: 1.5rem;
  color: black;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropDownListContainer = styled("div")`
`;

export const DropDownList = styled("div")`
padding: 20px;
width: 200px;
height: 150px;
`;

export const ListItem = styled("button")`
  list-style: none;
  width: 100%;
  text-decoration: none;
  display:flex;
  cursor: pointer;
  text-align: center;
  background-color: white;
  border: none;
  padding: 1rem;
  outline: none;
  &:hover {
    background-color: #f0c419;
    &:disabled {
      background-color: white;
      cursor: auto
    }
  }
`;

export const UpArrow = styled("div")`
border: solid black;
padding: 4px;
margin: 0 0 3px 12px;
border-width: 0 3px 3px 0;
display: inline-block;
transform: rotate(-135deg);
-webkit-transform: rotate(-135deg);
`;

export const DownArrow = styled("div")`
border: solid black;
border-width: 0 3px 3px 0;
display: inline-block;
transform: rotate(45deg);
-webkit-transform: rotate(45deg);
padding: 4px;
margin: 0 0 3px 12px;
`;

export const Image = styled.img`
padding: 10px;
width: 50px;
height: 50px;
border-radius: 50%;
margin-right: 20px;
`