import React, {useContext, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import {AlertContext} from "./context/AlertContext";
import {Redirect} from "react-router-dom";

export const Comp = () => {
    const [redirect, setRedirect] = useState(false);
    const alertC = useRef(useContext(AlertContext));

    const onClick = () => {
        alertC.current.showAlert("dupa", "error");
        console.log(alertC)
    };

    return (
       <>
           <Button onClick={onClick} variant="contained">
               klik
           </Button>
           <Button onClick={e => setRedirect(true)}>
               redirect
           </Button>
           {redirect && <Redirect to="/qweqwe" />}
       </>
    )
};