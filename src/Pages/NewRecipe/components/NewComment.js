import {makeStyles} from "@material-ui/core/styles";
import React, {useContext, useRef} from "react";
import {Box, Button, Container, CssBaseline, Icon, Paper, TextField, Typography} from "@material-ui/core";
import {Label} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";
import {AlertContext, UserContext} from "../../../context";
import {be} from "../../../constants/backendSetup";
import {getCORSHeaders} from "../../../utils/fetchTools";
import {validate} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
        paddingBottom: theme.spacing(1),
        textAlign: "left"
    },
    textField: {
        width: "100%",
    },
    ratingDiv: {
        display: "flex",
        width: "50%",
    },
    publishBtn: {
        textAlign: "right",
        margin: theme.spacing(1)
    }
}))

const labels = {
    0: "Uneatable",
    0.5: 'Disgusting',
    1: 'Disgusting+',
    1.5: 'Not bad',
    2: 'Not bad+',
    2.5: 'Good',
    3: 'Good+',
    3.5: 'Tasty',
    4: 'Tasty+',
    4.5: 'Delicious',
    5: 'Delicious+',
};

async function fetchRating(bodyRating, token) {
    let url = be.RATING;
    const headers = getCORSHeaders(token);

    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify(bodyRating)
    });

    if (res.status !== 201) {
        throw "Couldn't add your rating."
    }

}

async function fetchComment(bodyComment, token) {
    let url = be.COMMENT;
    const headers = getCORSHeaders(token);

    const res = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify(bodyComment)
    });

    if (res.status !== 201) {
        throw "Couldn't add your comment."
    }
}

export default function NewComment({id}) {
    const classes = useStyles();
    const user = useContext((UserContext))
    const alertC = useRef(useContext(AlertContext));
    const [rating, setRating] = React.useState(0.5);
    const [hover, setHover] = React.useState(-1);
    const [comment, setComment] = React.useState("");

    function validateComment(comment) {
        if (!/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s.,?!-()]+$/.test(comment)) {
            throw "Wrong comment format"
        }
    }

    const handlePublish = async (e) => {
        e.preventDefault();
        try{
            let bodyRating = {
                rating: rating,
                recipe_id: id,
                user_id: ""
            }
            await fetchRating(bodyRating, user.token)
            validateComment(comment);
            let bodyComment = {
                author: user?.data?.username,
                date_added: "",
                content: comment,
                recipe_id: id
            }
            await fetchComment(bodyComment, user.token)
            alertC.current.showAlert("Successfully created comment.", "success")
        } catch (err){
            alertC.current.showAlert(err, "error")
        }
    }

    return (

        <Paper>
            <div className={classes.mainDiv}>
                <div className={classes.ratingDiv}>
                    <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                </div>
                <TextField className={classes.textField} label="Comment" multiline onChange={(e) => setComment(e.target.value)}></TextField>
                <div className={classes.publishBtn}>
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={handlePublish}>Publish</Button>
                </div>
            </div>
        </Paper>

    )
}