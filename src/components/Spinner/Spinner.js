import React from 'react';
import { FormContainer, Spinner, SpinnerContainer, Root } from "../../styledComponents/FormStyled"


const LoadingPage = () => {
    return (
        <Root>
            <FormContainer>
                <SpinnerContainer wholepage><Spinner wholepage /></SpinnerContainer>
            </FormContainer>
        </Root>
    )
}

export default LoadingPage;