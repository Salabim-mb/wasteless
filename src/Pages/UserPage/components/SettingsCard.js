import {Container, ListItem, ListItemText, Paper} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
}))

export default function SettingsCard({user}) {
    const theme = {};
    const classes = useStyles();
    return (
        <Container fixed>
            <Paper className={classes.mainDiv}>
                <List className={theme.list}>
                    <ListItem>
                        <ListItemText primary="Dark mode" />
                        <Switch
                            color="primary"
                            name="push_notifications"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Email notifications" />
                        <Switch
                            color="primary"
                            name="email_notifications"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Push notifications" />
                        <Switch
                            color="primary"
                            name="dark"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}