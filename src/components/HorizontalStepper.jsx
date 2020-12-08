import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonToolbar: {
        marginTop: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(2)
    }
}));

const HorizontalStepper = ({steps, onDoneComponent}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    const pathLength = Object.keys(steps).length - 1;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {Object.keys(steps).map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === pathLength ? (
                    <div className={classes.buttonToolbar}>
                        {onDoneComponent(handleBack)}
                    </div>
                ) : (
                    <div>
                        <Paper className={classes.paper}>
                            {
                                Object.values(steps)[activeStep]
                            }
                        </Paper>
                        <div className={classes.buttonToolbar}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HorizontalStepper;