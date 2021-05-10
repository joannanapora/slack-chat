import React, { useState } from 'react';
import { FormContainer, ErrorMessage, Spinner, LoginContainer, FormHeader, FormInput, FormIcon, Root, FormLabel, Button, SpinnerContainer } from "../../styledComponents/FormStyled"
import { Link } from 'react-router-dom';
import firebase from "../../firebase";
import md5 from 'md5';

const Register = () => {

    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
        errors: [],
        success: false,
        db: firebase.database().ref('users')
    })

    const [loading, setLoading] = useState(false);


    const onValueChange = (e, props) => {
        setDetails({ ...details, [props]: e.target.value })
    }

    const isFormEmpty = () => {
        return (!details.cpassword.length || !details.username.length || !details.email.length || !details.password.length)
    }


    const isFormValid = () => {

        let errors = [];
        let error;

        if (isFormEmpty()) {
            error = { message: "There are empty fields." }
            setDetails({ ...details, errors: errors.concat(error) });
            return false;
        }
        else if (details.password !== details.cpassword) {
            let error = { message: "Passwords don't match" }
            setDetails({ ...details, errors: errors.concat(error) })
            return false;
        }
        else if (details.password.length < 6 || details.cpassword.length < 6) {
            let error = { message: "Password is too short" }
            setDetails({ ...details, errors: errors.concat(error) })
            return false;
        }
        else {
            return true
        }
    }


    const saveUser = (createdUser) => {
        return details.db.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
            id: createdUser.user.uid,
        })

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setDetails({ ...details, errors: [] })
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(details.email, details.password)
                .then(createdUser => {

                    createdUser.user.updateProfile({
                        displayName: details.username,
                        photoURL: `https://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`

                    })
                        .then(() => {
                            return saveUser(createdUser)
                        })
                        .catch(error => {
                            setLoading(false);
                            setDetails({ ...details, errors: details.errors.concat(error) })
                        })
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
                <FormHeader>Register for DevChat</FormHeader>
                <FormLabel>Username</FormLabel>
                <FormInput type='text' value={details.username} onChange={(e) => { onValueChange(e, 'username') }} ></FormInput>
                <FormLabel>Email Address</FormLabel>
                <FormInput type='text' value={details.email} onChange={(e) => { onValueChange(e, 'email') }} ></FormInput>
                <FormLabel>Password</FormLabel>
                <FormInput type='password' value={details.password} onChange={(e) => { onValueChange(e, 'password') }} ></FormInput>
                <FormLabel>Password Confirmation</FormLabel>
                <FormInput type='password' value={details.cpassword} onChange={(e) => { onValueChange(e, 'cpassword') }} ></FormInput>
                {details.errors.length > 0 &&
                    <ErrorMessage>{details.errors[details.errors.length - 1].message}</ErrorMessage>
                }
                {
                    loading ?
                        <SpinnerContainer><Spinner /></SpinnerContainer> :
                        <Button type='button' disabled={loading} onClick={handleSubmit} primary>Submit</Button>
                }
                <LoginContainer>Already a user?<Link style={{ marginLeft: '10px' }} to='/login'>LOGIN</Link></LoginContainer>
            </FormContainer>
        </Root>
    )
}


export default Register;