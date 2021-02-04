import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Avatar,
    BottomNavigation,
    BottomNavigationAction,
    Container,
    CssBaseline,
    Paper,
    TextField
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ProfileCard from "./components/ProfileCard";
import EditCard from "./components/EditCard";
import SettingsCard from "./components/SettingsCard";

const user = {
    name: "Piotr",
    surname: "Kowalski",
    email: "piotrkowalski@gmail.com",
    username: "piotrk",
    avatarImg: ""
}

const useStyles = makeStyles((theme) => ({
    bottomNav: {
        display: "flex",
        position: "fixed",
        bottom: 0,
        width: "100%",
        justifyContent: 'left',
    }
}));

export default function UserPage() {
    const classes = useStyles();
    const [bottomCardValue, setValue] = React.useState(0);

    function chooseCard() {
        switch (bottomCardValue) {
            case 0 :
                return (
                    <ProfileCard user={user}/>
                )
            case 1:
                return (
                    <EditCard user={user}/>
                )
            case 2:
                return (<SettingsCard user={user}/>)
            default :
                return null
        }
    }

    function handleChangeBottomNavCard(event, newValue) {
        setValue(newValue);
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            {chooseCard()}
            <BottomNavigation
                value={bottomCardValue}
                onChange={handleChangeBottomNavCard}
                className={classes.bottomNav}
            >
                <BottomNavigationAction label="Profile" icon={<PersonIcon/>}/>
                <BottomNavigationAction label="Edit" icon={<EditIcon/>}/>
                <BottomNavigationAction label="Consents" icon={<MenuBookIcon/>}/>
            </BottomNavigation>
        </React.Fragment>
    );
}
