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
flex-direction: column;
background: transparent;
`


export const ChannelHeader = styled.div`
display: flex;
background: #FAFAFA;
height: 50px;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
margin: 10px 20px;
padding: 20px;
justify-content: space-between;
align-items: center;
@media (max-width: 1100px) {
  flex-direction: column;
  }
`

export const HeaderRight = styled.div`
display:flex;
align-items:start;
font-size: 18px;
font-family: 'Crete Round', serif;
`

export const HeaderLeft = styled.div`
display:flex;
align-items:start;
font-size: 20px;
font-family: 'Crete Round', serif;
margin: 0.5rem 0;
`

export const SearchInput = styled.input`
padding: 0.5rem;
outline-color: #f0c419
`

export const MsgWindow = styled.div`
display:flex;
flex-direction:column;
background: #FAFAFA;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
margin: 0 20px;
padding: 10px;
overflow-y: scroll;
height: 28rem;
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
margin-left: 360px;
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
outline-color: #f0c419
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

export const MsgLeft = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
`

export const Comment = styled.div`
width: 100%;
display: flex;
justify-content: start;
margin: 0px 10px;
`

export const AvatarContainer = styled.img`
width: 40px;
height: 40px;
`


export const MsgContent = styled.div`
display: flex;
flex-direction: column;
margin: 10px 10px;
padding: 0 10px;
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
${props => props.mine && css`
border-left: 5px solid #f0c419;

  `}
`

export const Username = styled.div`
font-size: 14px
`

export const Date = styled.div`
font-size: 13px;
color: grey;
margin: 0 5px;
`

export const Text = styled.div`
max-width: 500px;
min-width: 100px;
font-size: 12px;
margin-top: 10px;
`

export const ChannelDiv = styled.div`
overflow-x: hidden;
height: auto;
padding-bottom: 2rem;
`


export const NoChannel = styled.div`
width: 100%, 
justify-content: center;
align-items: center;
display: flex;
flex-direction: column; 
margin: 50px;
opacity: 0.5;
font-size: 1rem;
`

export const WrapFileName = styled.p`
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
`

export const ScrollChannels = styled.div`
overflow-y: auto;
height:80vh;
padding: 0 40px 0 10px;
`

export const Notification = styled.div`
background-color: red;
color: white;
font-size: 0.8rem;
padding: 0.1rem 0.3rem ;
display: flex;
margin-left: 1rem;
`