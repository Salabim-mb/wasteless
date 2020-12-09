import {Avatar, Button, Container, Icon, Paper, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        display: "grid",
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        fontSize: "xxx-large"
    },
    profileDiv: {
        margin: theme.spacing(3),
        display: "flex",
        flexFlow: "row wrap",
    },
    avatarDiv: {
        display: "grid",
        flex: 1,
        margin: theme.spacing(5),
        justifyContent: "center",
        height: "40%"
    },
    detailsDiv: {
        display: "grid",
        margin: theme.spacing(5),
        flex: 2
    },
    passwordDiv: {
        display: "grid",
        margin: theme.spacing(2),
        alignContent: "center",
        justifyContent: "center",
        width: "100%"
    },
    textField: {
        width: "80%",
        margin: theme.spacing(1)
    },
    editBtn: {
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
        margin: theme.spacing(5)
    },
    submitBtn: {
        display: "grid",
        alignContent: "center",
        justifyContent: "right",
        marginTop: theme.spacing(2),
        width: "80%"
    }
}))

export default function EditCard({user}) {
    const classes = useStyles();
    return (
        <Container fixed>
            <Paper>
                <div className={classes.mainDiv}>
                    <div className={classes.profileDiv}>
                        <div className={classes.avatarDiv}>
                            <Avatar className={classes.avatar}>{user.name.charAt(0).toUpperCase()}</Avatar>
                            <div className={classes.editBtn}>
                                <Button size="small" className={classes.margin} variant="contained"
                                        endIcon={<EditIcon/>}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <div className={classes.detailsDiv}>
                            <TextField className={classes.textField} label="Name" defaultValue={user.name}
                            />
                            <TextField className={classes.textField} label="Surname" defaultValue={user.surname}
                            />
                            <TextField className={classes.textField} label="Email" defaultValue={user.email}
                            />
                            <TextField className={classes.textField} label="Username"
                                       defaultValue={user.username}
                            />
                            <div className={classes.submitBtn}>
                                <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>Submit</Button>
                            </div>
                            <h1>CHANGE PASSWORD</h1>
                            <TextField className={classes.textField} label="Recent password" type="password"/>
                            <TextField className={classes.textField} label="New password" type="password"/>
                            <TextField className={classes.textField} label="Repeat password" type="password"/>
                            <div className={classes.submitBtn}>
                                <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </Container>
    )
}