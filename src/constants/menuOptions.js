import {path_list} from "./routes";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
        icon: <LockOpenIcon />,
        path: path_list.LOGIN,
        requiresLogin: false
    },
    {
        name: "Log out",
        icon: <ExitToAppIcon />,
        action: (e, token) => handleLogout(e, token),
        requiresLogin: true
    },
    {
        name: "Recipes",
        icon: <ReceiptIcon />,
        path: path_list.RECIPES_LIST,
        requiresLogin: false
    },
    {
        name: "Fridge 1",
        icon: <ReceiptIcon />,
        path: path_list.FRIDGE1,
        requiresLogin: false
    },
    {
        name: "New Product",
        icon: <ReceiptIcon />,
        path: path_list.FRIDGE1_NEW_PRODUCT,
        requiresLogin: false
    },
];