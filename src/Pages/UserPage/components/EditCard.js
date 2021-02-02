import {Avatar, Button, Container, Icon, Paper, TextField} from "@material-ui/core";
import React, {useContext, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {AlertContext} from "../../../context";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
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
        // marginTop: theme.spacing(5),
        margin: theme.spacing(5),
        justifyContent: "center",
        height: "40%",
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
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        margin: theme.spacing(2),
    },
    submitBtn: {
        display: "grid",
        alignContent: "center",
        justifyContent: "right",
        marginTop: theme.spacing(2),
        width: "80%"
    },
}))

export default function EditCard({user}) {
    const classes = useStyles();
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassR, setNewPassR] = useState("")
    const alertC = useRef(useContext(AlertContext));

    const handleSubmitPass = async (e) => {
        try {
            console.log("click")
        } catch (err) {
            alertC.current.showAlert("Couldn't change your password", "error")
        }
    }

    return (
        <Container fixed>
            <Paper>
                <div className={classes.mainDiv}>
                    <div className={classes.profileDiv}>
                        <div className={classes.avatarDiv}>
                            <div>
                                <Avatar className={classes.avatar}>{user.name.charAt(0).toUpperCase()}</Avatar>
                            </div>
                            <div className={classes.editBtn}>
                                <Button size="small" variant="contained" endIcon={<EditIcon/>}>
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
                            <h2>CHANGE PASSWORD</h2>
                            <TextField className={classes.textField} label="Recent password" type="password" onChange={(e) => setOldPass(e.target.value)}/>
                            <TextField className={classes.textField} label="New password" type="password" onChange={(e) => setNewPass(e.target.value)}/>
                            <TextField className={classes.textField} label="Repeat password" type="password" onChange={(e) => setNewPassR(e.target.value)}/>
                            <div className={classes.submitBtn}>
                                <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={handleSubmitPass}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
        </Container>
    )
}