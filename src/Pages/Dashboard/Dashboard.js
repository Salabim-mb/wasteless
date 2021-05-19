import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {ReactComponent as Picture} from '../../assets/undraw_cooking_lyxy.svg';
import {Button, Icon} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
        justifyContent: "center",
        alignContent: "center"
    },
    grid: {
        textAlign: "center",
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    picture: {
        width: "70%",
        height: "70%"
    },
    text: {
        textAlign: "left",
        padding: theme.spacing(2)
    },
    button:{
        margin:theme.spacing(1)
    },
    buttonDiv:{
        display: "flex"
    }
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div>

            <Grid container className={classes.grid}>
                <Grid item xs={10} sm={5} className={classes.text}>
                    <Typography>
                        <Typography variant="h4" gutterBottom>
                            DID YOU KNOW WE WASTE ABOUT 35% OF FOOD?
                        </Typography>
                        <Typography variant="body1">
                            tekst
                        </Typography>
                        <div className={classes.buttonDiv}>
                            <div className={classes.button}>
                                <Button variant="contained" color="primary" endIcon={<Icon>save</Icon>}>Sign in</Button>
                            </div>
                            <div className={classes.button}>
                                <Button variant="contained" color="primary" endIcon={<Icon>save</Icon>}>Register</Button>
                            </div>
                        </div>

                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Picture className={classes.picture}/>
                </Grid>
            </Grid>

        </div>
    );
}
