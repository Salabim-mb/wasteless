import {Container, Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
    mainDiv: {

    }
})

export default function SettingsCard({user}) {
    const classes = useStyles();
    return (
        <Container fixed>
            <Paper>
                <div className={classes.mainDiv}>

                </div>
                CONSENT
                {user.name}
            </Paper>
        </Container>
    )
}