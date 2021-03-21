import React, {useContext, useRef, useState} from "react";
import {be} from "constants/backendSetup";
import {AlertContext, UserContext} from "context";
import UniversalModal from "../../../components/UniversalModal";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {path_list} from "../../../constants/routes";
import {Redirect} from "react-router-dom";

const addFridge = async (token, data) => {
    const url = `${be.PLAIN}profile/fridges/`;
    const headers = {
        "Authorization": "Token " + token
    };
    const res = await fetch(url, {
        headers,
        method: "POST",
        body: new FormData(data)
    });

    if (res.status === 201) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: theme.spacing(2)
    }
}))

const NewFridgeModal = ({open, setOpen}) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState({
        action: false,
        destination: undefined
    });
    const user = useContext(UserContext);
    const alertC = useRef(useContext(AlertContext));

    const handleClose = () => {
        setName("");
        setLoading(false);
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name !== "") {
            setLoading(true);
            try {
                const {id} = await addFridge(user.token, e.currentTarget);
                setRedirect({
                    action: true,
                    destination: id
                })
            } catch(ex) {
                alertC.current.showAlert(ex);
            } finally {
                setLoading(false);
            }
        } else {
            alertC.current.showAlert("Please provide fridge name");
        }
    };

    const classes = useStyles();

    return (
        <UniversalModal setOpen={handleClose} open={open} title="Add new fridge">
            <form onSubmit={handleSubmit}>
                <TextField
                    name="fridge_name"
                    className={classes.textField}
                    required
                    fullWidth
                    label="Fridge name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? "Loading..." : "Confirm"}
                </Button>
            </form>
            {redirect.action && <Redirect to={path_list.FRIDGE.redirect(redirect.destination)} />}
        </UniversalModal>
    )
};

export default NewFridgeModal;