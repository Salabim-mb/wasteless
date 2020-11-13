import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import {userTypes} from "../constants/userTypes";

const cookies = new Cookies();

export const UserContext = React.createContext({
    token: undefined,
    data: undefined,
    type: undefined,
    login: () => {},
    logout: () => {}
});

export const UserProvider = (props) => {
    const [token, setToken] = useState(cookies.get("token"));
    const [data, setData] = useState(cookies.get("data"));
    const [type, setType] = useState(cookies.get("type"));

    const user = {
        token,
        data,
        type,
        login: (newToken, newData, newType = userTypes.COMMON) => {
            cookies.set('token', newToken, {
                path: "/",
                // secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                // httpOnly: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
            });
            setToken(newToken);
            cookies.set('data', newData, {
                path: "/",
                // secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                // httpOnly: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
            });
            setData(newData);
            cookies.set('type', newType, {
                path: "/",
                // secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                // httpOnly: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
            });
            setType(newType);
        },
        logout: () => {
            cookies.remove("token", {path: "/"});
            cookies.remove("type", {path: "/"});
            cookies.remove("data", {path: "/"});
            setType(undefined);
            setToken(undefined);
            setData(undefined);
        }
    }

    return <UserContext.Provider value={user} {...props} />
};