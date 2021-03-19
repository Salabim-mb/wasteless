import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Box, Button, Container, CssBaseline, Icon, Paper, TextField, Typography} from "@material-ui/core";
import {Label} from "@material-ui/icons";
import {Rating} from "@material-ui/lab";

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
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

export default function NewComment() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0.5);
    const [hover, setHover] = React.useState(-1);

    return (

        <Paper>
            <div className={classes.mainDiv}>
                <div className={classes.ratingDiv}>
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>
                <TextField className={classes.textField} label="Comment" multiline></TextField>
                <div className={classes.publishBtn}>
                    <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>Submit</Button>
                </div>
            </div>
        </Paper>

    )
}