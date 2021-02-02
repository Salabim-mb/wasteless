import React, {useContext, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from "@material-ui/core/Card";
import {Redirect} from "react-router-dom";
import {path_list} from "constants/routes";
import {AlertContext} from "context/AlertContext";

const validatePassword = (password) => {
    if (password.length < 8  || !/^[a-zA-Z0-9!@#$%&*]+$/.test(password) ) {
        throw "Password must be at least 8 characters long and contain only letters, numbers, and !/@/#/$/%/&/* characters."
    }
}
const validateUsername = (username) => {
    if (!/^[\w.@+-]+$/.test(username)){
        throw "Username may only contain letters, numbers, and @/./+/-/_ characters"
    }
}

function validateEmail(email)
{
    if( !/\S+@\S+\.\S+/.test(email)){
        throw "Invalid email address"
    }
}

function validateInput(username, email, password){
    if( username === ""){
        throw "Please enter a username"
    }
    if( email === ""){
        throw "Please enter an email"
    }
    validateEmail(email)
    validateUsername(username)
    validatePassword(password)
}

const register = async (data) => {
    const url = "https://wasteless-backend.herokuapp.com/register/";
    const headers = {
        "Content-Type": "application/json"
    };

    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify(data)
    });

    if (res.status === 201) {
        return await res.json();
    } else {
        let response = await res.text()
        console.log(response)
        if(response === "{\"username\":[\"A user with that username already exists.\"]}"){
            throw "This username is already taken"
        }
        if(response === "{\"username\":[\"Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.\"]}"){
            throw "Username may only contain letters, numbers, and @/./+/-/_ characters"
        }
        if(response === "{\"email\":[\"Enter a valid email address.\"]}"){
            throw "Invalid email address"
        }
        throw "An unexpected error occured"
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        padding: '7%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    card: {
        boxShadow: '0 1px 1px 1px lightblue'
    },
}));

const RegisterPage = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [redirect, setRedirect] = useState(undefined);
    const [disabled, setDisabled] = useState(false);
    const [validated, setValidated] = useState("false");
    const alertC = useRef(useContext(AlertContext));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validateInput(username,email,password)
            let response = await register({username: username, email: email, password: password});
            alertC.current.showAlert("Registered successfully!", "success");
            console.log(response)
            setRedirect(path_list.LOGIN.route);

        } catch(e) {
            alertC.current.showAlert(e, "error");
        } finally {

        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate validated={validated} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {redirect && <Redirect to={redirect}/>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={disabled}
                        >
                            {disabled ? "Loading..." : "Register!"}
                        </Button>
                    </form>
                </div>
            </Card>
        </Container>
    );
};

export default RegisterPage;