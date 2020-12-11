import React, {useContext, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import { mdiFoodForkDrink } from '@mdi/js';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from "@material-ui/core/Card";
import {backend} from "../../constants/backend";
import {getHeaders} from "../../utils/CORSHeaders";
import {UserContext} from "../../context";
import {Redirect} from "react-router";
import Alert from "@material-ui/lab/Alert";
import {path_list as paths_list} from "../../constants/routes";
import AlertTitle from "@material-ui/lab/AlertTitle";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">

            <Link color="inherit" href="https://material-ui.com/">
                Wasteless
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const loginUser = async (data) => {
    let url = `${backend.LOGIN}`;
    let headers = getHeaders();

    let res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
            "username": data.login,
            "password": data.password
        })
    });
    console.log(res.json());
    if (res.status === 200 || res.status === 201) {
        return await res.json();
    } else {
        throw res.status;
    }
};


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
        // boxShadow: '0 1px 1px 1px lightblue'
    },
}));

export default function LoginPage() {

    const [data, setData] = useState({
        login: "",
        password: "",
    });
    const classes = useStyles();
    const user = useContext(UserContext);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        setError(false);
        setValidated(true);
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setDisabled(true);
            try {
                let {userToken, userName, userSurname, userEmail} = await loginUser(data);
                user.login(userToken, {
                    name: userName,
                    surname: userSurname,
                    email: userEmail
                });
                setCorrect(true);
                setTimeout(() => setRedirect(true), 3000);
            } catch(e) {
                console.log(e);
                setError(true);
            } finally {
                setDisabled(false);
            }
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <Card className={classes.card}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate validated={validated} onSubmit={submitForm}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            value={data.login}
                            onChange={e => setData({...data, login: e.target.value})}
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
                            value={data.password}
                            onChange={e => setData({...data, password: e.target.value})}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        {error && <Alert severity="error"><AlertTitle>Error</AlertTitle>Something went <strong>wrong</strong> while trying to login user</Alert>}
                        {correct && <Alert severity="success"><AlertTitle>Success</AlertTitle>Login successful. <strong>Redirecting...</strong></Alert>}
                        {redirect && <Redirect to={paths_list.DASHBOARD.route}/>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={disabled}
                        >
                            {disabled ? "Loading..." : "Log in!"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>

                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Card>
        </Container>
    );
}
