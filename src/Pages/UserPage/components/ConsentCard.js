import {Container, Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {

})

export default function ConsentCard({user}){
    const classes = useStyles();
    return (
        <Container fixed>
            <Paper>
                CONSENT
                {user.name}
            </Paper>
        </Container>
    )
}