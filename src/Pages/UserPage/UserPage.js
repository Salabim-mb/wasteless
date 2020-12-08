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

const user = {
    name: "Piotr",
    surname: "Kowalski",
    email: "piotrkowalski@gmail.com",
    username: "piotrk"
}

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    profileDiv: {
        margin: theme.spacing(3),
        display: "flex",
        flexFlow: "row wrap",
    },
    avatarDiv: {
        display: "flex",
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
    const [value, setValue] = React.useState(0);

    function chooseRigthPaper() {
        switch (value) {
            case 0 :
                return (
                    <Container fixed>
                        <Paper>
                            <div className={classes.profileDiv}>
                                <div className={classes.avatarDiv}>
                                    <Avatar className={classes.avatar}>{user.name.charAt(0).toUpperCase()}</Avatar>
                                </div>
                                <div className={classes.detailsDiv}>
                                    <TextField className={classes.textField} label="Name" defaultValue={user.name}
                                               disabled/>
                                    <TextField className={classes.textField} label="Surname" defaultValue={user.surname}
                                               disabled/>
                                    <TextField className={classes.textField} label="Email" defaultValue={user.email}
                                               disabled/>
                                    <TextField className={classes.textField} label="Username"
                                               defaultValue={user.username}
                                               disabled/>
                                </div>
                            </div>
                        </Paper>
                    </Container>
                )
            case 1:
                return (
                    <Container fixed>
                        <Paper>

                        </Paper>
                    </Container>

                )
            default :
                return null
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            {chooseRigthPaper()}
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                className={classes.bottomNav}
            >
                <BottomNavigationAction label="Profile" icon={<PersonIcon/>}/>
                <BottomNavigationAction label="Edit" icon={<EditIcon/>}/>
                <BottomNavigationAction label="Consents" icon={<MenuBookIcon/>}/>
            </BottomNavigation>
        </React.Fragment>
    );
}
