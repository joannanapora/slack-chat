import styled from 'styled-components'
import { css } from 'styled-components';

export const Root = styled.div`
justify-content: center;
align-items: center;
display: flex;
background-color: white;
height: 100vh;
`

export const FormContainer = styled.div`
width: 350px;
display: flex;
flex-direction: column;
background-color: #EBECF0;
height: 570px;
justify-content: center;
align-items:center;
position: relative;
margin-top: 60px;
@media (min-width: 768px) {
  margin-top: 100px;
}
${props => props.wholepage && css`
background-color: #fff;
margin: none;
height:100%;
width:100%;
`}
`

export const FormIcon = styled.img`
width: 100px;
height: 100px;
position: absolute;
top: -12%;
left: 0%;
@media (min-width: 768px) {
  width: 155px;
height: 155px;
top: -18%;
left: 0%;
}
`

export const FormHeader = styled.h2`
margin-bottom: 40px;
`
export const FormLabel = styled.label`
display: flex;
width: 100%;
margin-left: 50px;
font-size: 14px;
margin-bottom: 5px;
`
export const FormInput = styled.input`
height: 40px;
border: 0.4px black;
-moz-border-radius: 1em;
margin-bottom: 15px;
outline-color: orange;
font-size: 20px;
padding: 3px 15px
font-family: 'Crete Round', serif;
min-width: 300px;
`

export const Button = styled.button`
width:300px;
height: 40px;
margin: 10px;
border: none;
justify-content:center;
display:flex;
align-items:center;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
cursor: pointer;
outline-color: orange;
&:hover {
    border: 2px solid black;
  }
${props => props.primary && css`
    background: orange;
  `}
  ${props => props.secondary && css`
    background: white;
    width:100px;
    &:hover {
      border: 2px solid orange;
    }
  `}
`
export const TextArea = styled.textarea`
max-width:300px;
min-width: 300px;
max-height: 400px;
min-height: 40px;
border: 0.4px black;
-moz-border-radius: 1em;
margin-bottom: 15px;
outline-color: orange;
font-size: 20px;
font-family: 'Crete Round', serif;
`


export const LoginContainer = styled.div`
width:300px;
height: 40px;
display: flex;
justify-content:center;
align-items:center;
`


export const ErrorMessage = styled.p`
display: flex;
width: 100%;
margin-left: 50px;
font-size: 11px;
margin-bottom: 5px;
color: red;
`

export const SuccessMessage = styled.p`
display: flex;
width: 100%;
margin-left: 50px;
font-size: 11px;
margin-bottom: 5px;
color: green;
`

export const SpinnerContainer = styled.div`
width:300px;
height: 40px;
padding: 3px;
margin: 10px;
border: none;
justify-content:center;
display:flex;
align-items:center;
box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
background-color: orange;
${props => props.wholepage && css`
    background-color: white;
    width:100%;
    height: 100%;
    box-shadow: none;
    margin: 0;
  `}
`
export const Spinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid orange;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    outline-color: none;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  ${props => props.wholepage && css`
  width: 200px;
  height: 200px;
  border: 12px solid #f3f3f3;
    border-top: 12px solid orange;
  `}
`
