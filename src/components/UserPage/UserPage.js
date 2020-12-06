import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Avatar, Container, CssBaseline, Paper, Tab, Tabs, TextField} from "@material-ui/core";

const user = {
    name: "Piotr",
    surname: "Kowalski",
    email: "piotrkowalski@gmail.com"
}

const useStyles = makeStyles((theme) => ({
    tabs: {
        margin: 0,
        flexGrow: 1,
        indicatorColor: "primary",
        textColor: "primary",
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    profileDiv: {
        margin: theme.spacing(3) ,
        display: "flex",
        flexFlow: "row wrap",
        height: "1000vh"
    },
    avatarDiv: {
        display: "flex",
        flex: 1,
        margin:theme.spacing(5),
        justifyContent: "center"
    },
    detailsDiv: {
        display: "grid",
        margin:theme.spacing(5),
        flex: 2
    },
    textField: {
        width: "80%"
    }
}));

export default function UserPage() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Paper className={classes.tabs} >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    <Tab label="Profile"/>
                    <Tab label="Edit"/>
                    <Tab label="Change password"/>
                    <Tab label="Consent"/>
                </Tabs>
            </Paper>
            <Container fixed>
                <Paper>
                    <div className={classes.profileDiv}>
                        <div className={classes.avatarDiv}>
                            <Avatar className={classes.avatar}>H</Avatar>
                        </div>
                        <div className={classes.detailsDiv}>
                            <TextField className={classes.textField} label="Name" defaultValue={user.name} disabled/>
                            <TextField className={classes.textField} label="Surname" defaultValue={user.surname} disabled/>
                            <TextField className={classes.textField} label="Email" defaultValue={user.email} disabled/>
                        </div>
                    </div>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
