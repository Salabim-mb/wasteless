import './App.css';
import React from "react";
import Router from "root/Router/Router";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "context";
import {AlertProvider} from "context";
import AlertPopup from "context/components/AlertPopup";
import MenuBar from "Pages";
import {Paper} from "@material-ui/core";
import Dashboard from "../../Pages/Dashboard/Dashboard";

const App = () => {
  return (
    <AlertProvider>
        <UserProvider>
            <BrowserRouter>
                <MenuBar>
                    <Router />
                    <Dashboard/>
                    <AlertPopup />
                </MenuBar>
            </BrowserRouter>
        </UserProvider>
    </AlertProvider>
  );
};

export default App;
