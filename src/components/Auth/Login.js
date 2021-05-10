import React, { useState } from 'react';
import { FormContainer, ErrorMessage, Spinner, LoginContainer, FormHeader, FormInput, FormIcon, Root, FormLabel, Button, SpinnerContainer } from "../../styledComponents/FormStyled"
import { Link } from 'react-router-dom';
import firebase from "../../firebase";

const Login = () => {

    const [details, setDetails] = useState({
        email: "",
        password: "",
        errors: [],
    })
    const [loading, setLoading] = useState(false)

    const onValueChange = (e, props) => {
        setDetails({ ...details, [props]: e.target.value })
    }

    const isFormEmpty = () => {
        return (!details.email.length || !details.password.length)
    }

    const isFormValid = () => {

        let errors = [];
        let error;

        if (isFormEmpty()) {
            error = { message: "There are empty fields." }
            setDetails({ ...details, errors: errors.concat(error) });
            return false;
        }
        else {
            return true
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setDetails({ ...details, errors: [] })
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(details.email, details.password)
                .then((signedInUser) => {

                })

                .catch(error => {
                    setLoading(false);
                    setDetails({ ...details, errors: details.errors.concat(error) })
                })
        }
    }


    return (
        <Root>
            <FormContainer>
                <FormIcon src='https://www.flaticon.com/svg/vstatic/svg/3440/3440422.svg?token=exp=1620380798~hmac=77160ac20d0b46c6d78f1a6869bf622f' alt='parrot'></FormIcon>
                <FormHeader>Login for DevChat</FormHeader>
                <FormLabel>Email Address</FormLabel>
                <FormInput type='text' value={details.email} onChange={(e) => { onValueChange(e, 'email') }} ></FormInput>
                <FormLabel>Password</FormLabel>
                <FormInput type='password' value={details.password} onChange={(e) => { onValueChange(e, 'password') }} ></FormInput>
                {details.errors.length > 0 &&
                    <ErrorMessage>{details.errors[details.errors.length - 1].message}</ErrorMessage>
                }
                {
                    loading ?
                        <SpinnerContainer><Spinner /></SpinnerContainer> :
                        <Button type='button' disabled={loading} onClick={handleSubmit} primary>Submit</Button>
                }
                <LoginContainer>Don't have an account?<Link style={{ marginLeft: '10px' }} to='/register'>REGISTER</Link></LoginContainer>
            </FormContainer>
        </Root>
    )
}


export default Login;