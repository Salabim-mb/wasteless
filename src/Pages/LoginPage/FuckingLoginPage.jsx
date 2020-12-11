import React, {useContext, useRef, useState} from 'react';
import {AlertContext, UserContext} from "context";
import {Redirect} from 'react-router-dom';
import {path_list} from "constants/routes";

const log_in = async (credentials) => {
    const url = "https://wasteless-backend.herokuapp.com/login/";
    const headers = {
        "Content-Type": "application/json"
    };

    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify(credentials)
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
}

const FuckingLoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const user = useContext(UserContext);
    const alertC = useRef(useContext(AlertContext));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let {token, first_name, last_name, email} = await log_in({username: login, password: password});
            user.login(token, {
                first_name: first_name,
                last_name: last_name,
                email: email,
                username: login
            });
            setRedirect(true);
        } catch(e) {
            alertC.current.showAlert("Wrong credentials", "error");
        } finally {

        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={login} placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
                <input type="password" value={password} placrholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log in</button>
            </form>
            {redirect && <Redirect to={path_list.PROFILE.route} />}
        </>
    )
};

export default FuckingLoginPage;