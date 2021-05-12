import styled from 'styled-components'
import { css } from 'styled-components';


export const ChannelsContainer = styled.div`
width: 100%;
display: flex;
justify-content:center;
align-items:center;
text-align:center;
font-size: 15px;
cursor: pointer;
`

export const AddIcon = styled.div`
display: flex;
justify-content: flex-end;
width:100%;
cursor:pointer;
`

export const Channel = styled.div`
display: flex;
width:100%;
height: 30px;
cursor:pointer;
font-size: 16px;
margin-left: 10px;
opacity: 0.7;
align-items: center;
${props => props.active && css`
    color: black;
    opacity: 1;
    font-weight: 700;
  `}
`


export const ColorPanelContainer = styled.div`
background-color: black;
width: 100%;
height: 100%;
display:flex;
justify-content: center;
`


export const MessagesContainer = styled.div`
display:flex;
flex-direction: column;
background: transparent;
`


export const ChannelHeader = styled.div`
display:flex;
background: #FAFAFA;
height: 50px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
margin: 10px 20px;
padding: 20px;
`

export const HeaderRight = styled.div`
display:flex;
flex-direction: column;
align-items:start;
font-size: 20px;
font-family: 'Crete Round', serif;
width: 100%;
`

export const HeaderLeft = styled.div`
display:flex;
align-items:start;
font-size: 20px;
font-family: 'Crete Round', serif;
width: 100%;
padding: 0 30px;
`

export const SearchInput = styled.input`
padding: 10px;
width:100%;
outline-color: orange;

`

export const Divider = styled.div`
display:flex;
background: #FAFAFA;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
margin: 0 20px;
padding: 10px;
height: 600px;
overflow-y: scroll;
`


export const NewMessage = styled.div`
display:flex;
background: #FAFAFA;
flex-direction: column;
height: auto;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
margin: 10px 20px;
padding: 20px;
position: fixed;
bottom:1em;
margin-left: 320px;
left: 0;
right: 1em;
z-index: 200;
`

export const WriteMessage = styled.div`
width:100%;
display:flex;
border: 0.3px solid black;
`

export const MessageInput = styled.input`
padding: 10px;
width:100%;
outline-color: orange;
border: none;
${props => props.error && css`
    background-color:red;
    opacity: 0.7;
  `}
`

export const ButtonContainer = styled.div`
width:100%;
display:flex;
`
