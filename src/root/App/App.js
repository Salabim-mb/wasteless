import './App.css';
import React from "react";
import Router from "root/Router/Router";
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "context";
import {AlertProvider} from "context";
import AlertPopup from "context/components/AlertPopup";

const App = () => {
  return (
    <AlertProvider>
        <UserProvider>
            <BrowserRouter>
                <Router />
                <AlertPopup />
            </BrowserRouter>
        </UserProvider>
    </AlertProvider>
  );
};

export default App;
