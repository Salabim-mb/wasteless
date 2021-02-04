import {Container, Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import {Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
    settingsDiv: {
        display: "block",
        justifyContent:'center',
        alignItems:'center'
    },
    elementDiv: {

    },
}))

export default function SettingsCard({user}) {
    const classes = useStyles();
    return (
        <Container fixed>
            <Paper>
                <div className={classes.mainDiv}>
                    <div className={classes.settingsDiv}>
                        <div className={classes.elementDiv}>
                            <Typography>Dark mode</Typography>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>
                        <div className={classes.elementDiv}>
                            <Typography>Email Notifications</Typography>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>
                        <div className={classes.elementDiv}>
                            <Typography>Push Notifications</Typography>
                            <Switch
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>
                    </div>
                </div>
            </Paper>
        </Container>
    )
}