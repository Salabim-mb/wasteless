import React, {useState} from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const SettingsContext = React.createContext({
    darkMode: false,
    emailNots: true,
    pushNots: false,
    updateSettings: () => {}
});

export const SettingsProvider = (props) => {
    const settingsCookie = cookies.get("settings");
    const [darkMode, setDarkMode] = useState(settingsCookie?.darkMode || false);
    const [emailNots, setEmailNots] = useState(settingsCookie?.emailNots || true);
    const [pushNots, setPushNots] = useState(settingsCookie?.pushNots || false);

    const settings = {
        darkMode,
        emailNots,
        pushNots,
        updateSettings: (newDarkMode, newEmailNots, newPushNots) => {
            try {
                cookies.remove("settings");
            } finally {
                cookies.set('settings', {
                    darkMode: newDarkMode,
                    emailNots: newEmailNots,
                    pushNots: newPushNots
                }, {
                    path: "/",
                    expires: (() => {
                        let d = new Date();
                        d.setFullYear(d.getFullYear() + 1);
                        return d
                    })(),
                    //secure: process.env.REACT_APP_SECURE_COOKIES !== "verystrongblockadealmostimpossibletobreachomg",
                });
                setDarkMode(newDarkMode);
                setEmailNots(newEmailNots);
                setPushNots(newPushNots);
            }
        }
    }

    return <SettingsContext.Provider value={settings} {...props} />
};