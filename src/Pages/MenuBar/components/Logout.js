import {useContext} from "react";
import {UserContext} from "../../../context";
import {be} from "src/constants/backendSetup";
import {getCORSHeaders} from "utils/fetchTools";



const logoutUser = async(token) => {
    let url = `${be.LOGOUT}`;
    let res = await fetch(url, {
        method: "DELETE",
        headers: getCORSHeaders(token)
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        console.log("Err: " + res.status)
    }
};


export const HandleLogout = async (e) => {
        let user = useContext(UserContext);
        e.preventDefault();
        try {
            await logoutUser(user.token);
        } catch(e) {
            console.log(e);
        } finally {
            user.logout();
        }
    }

