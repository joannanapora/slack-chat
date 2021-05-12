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