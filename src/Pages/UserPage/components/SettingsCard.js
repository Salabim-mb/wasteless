import {Container, ListItem, ListItemText, Paper} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import {SettingsContext} from "context/SettingsContext";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
    },
}))

export default function SettingsCard({user, setDarkMode}) {
    const theme = {};
    const classes = useStyles();
    const settings = useContext(SettingsContext);

    const [darkMode, setDarkModeLocal] = useState(settings.darkMode);
    const [emailNots, setEmailNots] = useState(settings.emailNots);
    const [pushNots, setPushNots] = useState(settings.pushNots);

    return (
        <Container fixed>
            <Paper className={classes.mainDiv}>
                <List className={theme.list}>
                    <ListItem>
                        <ListItemText primary="Dark mode" />
                        <Switch
                            color="primary"
                            name="dark"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                            checked={darkMode}
                            onChange={(e) => {
                                setDarkModeLocal(!darkMode);
                                settings.updateSettings(e.target.checked, settings.emailNots, settings.pushNots);
                                setDarkMode(e.target.checked)
                            }}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Email notifications" />
                        <Switch
                            color="primary"
                            name="email_notifications"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                            checked={emailNots}
                            onChange={(e) => {
                                setEmailNots(!emailNots);
                                settings.updateSettings(settings.darkMode, e.target.checked, settings.pushNots);
                            }}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Push notifications" />
                        <Switch
                            color="primary"
                            name="push_notifications"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                            checked={pushNots}
                            onChange={(e) => {
                                setPushNots(!pushNots);
                                settings.updateSettings(settings.darkMode, settings.emailNots, e.target.checked);
                            }}
                        />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}