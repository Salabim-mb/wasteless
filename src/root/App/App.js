import './App.css';
import React, {useContext, useState} from "react";
import Router from "root/Router/Router";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "context";
import {AlertProvider} from "context";
import AlertPopup from "context/components/AlertPopup";
import MenuBar from "Pages";
import {SettingsContext, SettingsProvider} from "context/SettingsContext";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';

const App = () => {
    const settings = useContext(SettingsContext);
    const [darkMode, setDarkMode] = useState(settings.darkMode);

    let theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light"
        }
    });

  return (
    <AlertProvider>
        <UserProvider>
            <BrowserRouter>
                <SettingsProvider>
                    <ThemeProvider theme={theme}>
                        <MenuBar>
                            {console.log(settings)}
                            <Router setDarkMode={setDarkMode}/>
                            <AlertPopup />
                        </MenuBar>
                    </ThemeProvider>
                </SettingsProvider>
            </BrowserRouter>
        </UserProvider>
    </AlertProvider>
  );
};

export default App;
