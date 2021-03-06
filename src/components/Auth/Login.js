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

    const checkifEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }


    return (
        <Root>
            <FormContainer>
                <FormIcon src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0MyN0I0ODsiIGQ9Ik01MTIsMzc2YzAsOC4zOTktNi41OTksMTUtMTUsMTVIMTk2Yy04LjQwMSwwLTE1LTYuNjAxLTE1LTE1YzAtOC40MDEsNi41OTktMTUsMTUtMTVoMjAwLjcNCglsMjUuOC01MS42MDFjMy45LTcuNSwxMi45LTEwLjQ5OSwyMC4wOTktNi44OTljNy41LDMuOSwxMC41MDEsMTIuOSw2LjkwMSwyMC4wOTlMNDMwLjMsMzYxSDQ5N0M1MDUuNDAxLDM2MSw1MTIsMzY3LjU5OSw1MTIsMzc2eiINCgkvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0E2NjIzNTsiIGQ9Ik01MTIsMzc2YzAsOC4zOTktNi41OTksMTUtMTUsMTVIMjU2di0zMGgxNDAuN2wyNS44LTUxLjYwMWMzLjktNy41LDEyLjktMTAuNDk5LDIwLjA5OS02Ljg5OQ0KCWM3LjUsMy45LDEwLjUwMSwxMi45LDYuOTAxLDIwLjA5OUw0MzAuMywzNjFINDk3QzUwNS40MDEsMzYxLDUxMiwzNjcuNTk5LDUxMiwzNzZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojODA1MTQyOyIgZD0iTTMxNiwxODBjLTguMjkxLDAtMTUtNi43MDktMTUtMTV2LTYwYzAtOC4yOTEsNi43MDktMTUsMTUtMTVoNjBjOC4yOTEsMCwxNSw2LjcwOSwxNSwxNQ0KCUMzOTEsMTQ2LjM1MywzNTcuMzUzLDE4MCwzMTYsMTgweiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0MyN0I0ODsiIGQ9Ik0zMzEsMS4xOTljMCwwLTE1LDEwLjgtMzAsMjEuNjAxVjEwNWMwLDguMzk5LDYuNTk5LDE1LDE1LDE1aDkwYzguNDAxLDAsMTUtNi42MDEsMTUtMTUNCglDNDIxLDUyLjIsMzgxLjcsOC4zOTksMzMxLDEuMTk5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzEwQkI2NzsiIGQ9Ik0zMTYsMGgtNzVjLTY2LjMwMSwwLTEyMCw1My42OTktMTIwLDEyMHYyNTZjMCw4LjM5OSw2LjU5OSwxNSwxNSwxNWg5MGMxMC40OTksMCwyMC40LTEuNSwzMC00LjUwMQ0KCWM0My4yLTEyLjksNzUtNTMuMTAxLDc1LTEwMC40OTlWMS4xOTlDMzI2LjIwMSwwLjMsMzIxLjA5OSwwLDMxNiwweiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzBDQTY1NjsiIGQ9Ik0zMzEsMS4xOTlWMjg2YzAsNDcuMzk5LTMxLjgsODcuNTk5LTc1LDEwMC40OTlWMGg2MEMzMjEuMDk5LDAsMzI2LjIwMSwwLjMsMzMxLDEuMTk5eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzU3NTU1QzsiIGQ9Ik0yNzEsNzVjMCw4LjM5OS02LjU5OSwxNS0xNSwxNXMtMTUtNi42MDEtMTUtMTVjMC04LjQwMSw2LjU5OS0xNSwxNS0xNVMyNzEsNjYuNTk5LDI3MSw3NXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzMkQ3MzY7IiBkPSJNMTgxLDE4Mi41Yy0yOS43LDYtNTMuMTAxLDI5LjctNTguODAxLDU5LjdjLTMwLjI5OCw1LjctNTQuMywyOS43LTYwLDYwDQoJQzYxLjMsMzA2LjcsNjEsMzExLjE5OSw2MSwzMTZjMCw4LjM5OSw2LjU5OSwxNSwxNSwxNWg2My4zYzM5LjYsMCw3MS43LTMyLjEsNzEuNy03MS43di00NC43QzE5Ny41LDIwMC43OTksMTgxLDE4Mi41LDE4MSwxODIuNXoiDQoJLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRUE4MzI7IiBkPSJNMTM2LDUxMmMtNDEuMzUzLDAtNzUtMzMuNjQ3LTc1LTc1di02MGMwLTguMjkxLDYuNzA5LTE1LDE1LTE1aDYwYzguMjkxLDAsMTUsNi43MDksMTUsMTV2MTIwDQoJQzE1MSw1MDUuMjkxLDE0NC4yOTEsNTEyLDEzNiw1MTJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojRkY0NjhDOyIgZD0iTTE5Niw0ODJjLTQxLjM1MywwLTc1LTMzLjY0Ny03NS03NXYtMzBjMC04LjI5MSw2LjcwOS0xNSwxNS0xNWg2MGM4LjI5MSwwLDE1LDYuNzA5LDE1LDE1djkwDQoJQzIxMSw0NzUuMjkxLDIwNC4yOTEsNDgyLDE5Niw0ODJ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0MzQTQxOyIgZD0iTTI3MSw3NWMwLDguMzk5LTYuNTk5LDE1LTE1LDE1VjYwQzI2NC40MDEsNjAsMjcxLDY2LjU5OSwyNzEsNzV6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNjFERTU2OyIgZD0iTTI1NiwyMTIuOGMtMTMuMi0xOS4yLTM0Ljc5OS0zMS44LTYwLTMxLjhjLTUuMDk5LDAtMTAuMjAxLDAuNTk5LTE1LDEuNXY3Ni44DQoJYzAsMjMuMTAxLTE4LjYsNDEuNy00MS43LDQxLjdINzZjLTQuNzk5LDAtOS4zLDAuMy0xMy44MDEsMS4xOTlDMjcuNCwzMDguOCwwLDMzOS4zOTksMCwzNzZjMCw4LjM5OSw2LjU5OSwxNSwxNSwxNWgxMjQuMw0KCWM1MC43LDAsOTQuODAxLTI4LjgwMSwxMTYuNy03MC44YzkuNi0xOC4zMDEsMTUtMzkuMDAxLDE1LTYwLjkwMUMyNzEsMjQyLjE5OSwyNjUuNiwyMjYsMjU2LDIxMi44eiIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" alt='parrot'></FormIcon>
                <FormHeader>Login for DevChat</FormHeader>
                <FormLabel>Email Address</FormLabel>
                <FormInput onKeyDown={checkifEnter} type='text' value={details.email} onChange={(e) => { onValueChange(e, 'email') }} ></FormInput>
                <FormLabel>Password</FormLabel>
                <FormInput onKeyDown={checkifEnter} type='password' value={details.password} onChange={(e) => { onValueChange(e, 'password') }} ></FormInput>
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
        </Root >
    )
}


export default Login;