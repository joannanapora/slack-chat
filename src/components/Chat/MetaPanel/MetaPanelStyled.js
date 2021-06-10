import styled from 'styled-components'
import { css } from 'styled-components';


export const MetaPanelContainer = styled.div`
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
height: 33rem;
background-color: #FAFAFA;
font-size: 1rem;
font-family: 'Crete Round',serif;
margin: 10px 20px 0px 0px;
padding: 20px;
`

export const MetaDetails = styled.div`
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
background-color: #FAFAFA;
font-size: 1rem;
font-family: 'Crete Round',serif;
margin: 10px 20px 0px 0px;
padding: 1rem;
${props => props.top && css`
  max-height: 15rem;
  overflow-y: scroll;
`}
`

export const MetaInfo = styled.div`
background-color: #FAFAFA;
font-size: 0.8rem;
font-family: 'Crete Round',serif;
padding:  0.5rem 1rem;
align-items: center;
justify-content: start;
display: flex;
${props => props.user && css`
  font-size: 1rem;
`}
`