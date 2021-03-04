import {path_list} from "./routes";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import React from "react";
import {handleLogout} from "../Pages/MenuBar/components/Logout";

export const mainOptions = [
    {

    }
];

export const accountOptions = [
    {
        name: "Settings",
        icon: <SettingsIcon />,
        path: path_list.SETTINGS,
        requiresLogin: true
    },
    {
        name: "Register",
        icon: <HowToRegIcon />,
        path: path_list.REGISTER,
        requiresLogin: false
    },
    {
        name: "Log in",
        icon: <ExitToAppIcon />,
        path: path_list.LOGIN,
        requiresLogin: false
    },
    {
        name: "Log out",
        icon: <ExitToAppIcon />,
        action: (e, token) => handleLogout(e, token),
        requiresLogin: true
    }
];