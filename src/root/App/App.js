import './App.css';
import React from "react";
import Router from "root/Router/Router";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "context";
import {AlertProvider} from "context";
import AlertPopup from "context/components/AlertPopup";
import MenuBar from "Pages";

const App = () => {
  return (
    <AlertProvider>
        <UserProvider>
            <BrowserRouter>
                <MenuBar>
                    <Router />
                    <AlertPopup />
                </MenuBar>
            </BrowserRouter>
        </UserProvider>
    </AlertProvider>
  );
};

export default App;
