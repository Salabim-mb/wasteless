import {Avatar, Container, Paper, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        fontSize: "xxx-large"
    },
    profileDiv: {
        margin: theme.spacing(3),
        display: "flex",
        flexFlow: "row wrap",
        marginBottom: theme.spacing(8),
    },
    avatarDiv: {
        display: "grid",
        flex: 1,
        margin: theme.spacing(5),
        justifyContent: "center"
    },
    detailsDiv: {
        display: "grid",
        margin: theme.spacing(5),
        flex: 2
    },
    textField: {
        width: "80%",
        margin: theme.spacing(1)
    },
}));

export default function ProfileCard({user}) {
    const classes = useStyles();

    return (<Container fixed>
        <Paper>
            <div className={classes.profileDiv}>
                <div className={classes.avatarDiv}>
                    {user.avatarImg === "" ?
                        <Avatar className={classes.avatar}>{user.name.charAt(0).toUpperCase()}</Avatar> :
                        <Avatar className={classes.avatar} src={user.avatarImg}/>}
                </div>
                <div className={classes.detailsDiv}>
                    <TextField className={classes.textField} label="Username"
                               defaultValue={user.username}
                               disabled/>
                    <TextField className={classes.textField} label="Name" defaultValue={user.name}
                               disabled/>
                    <TextField className={classes.textField} label="Surname" defaultValue={user.surname}
                               disabled/>
                    <TextField className={classes.textField} label="Email" defaultValue={user.email}
                               disabled/>
                </div>
            </div>
        </Paper>
    </Container>)
}