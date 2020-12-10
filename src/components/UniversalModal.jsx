import React from "react";
import {Dialog, DialogContent} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    content: {
        margin: 0,
        padding: theme.spacing(1),
    },
}));

const UniversalModal = ({ setOpen, open, title, ...rest }, props) => {
    const classes = useStyles();

    return (
        <Dialog scroll="paper" onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
            <MuiDialogTitle disableTypography className={classes.root} {...rest}>
                <Typography variant="h6">{title}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </MuiDialogTitle>
            <DialogContent dividers className={classes.content}>
                {props.children}
            </DialogContent>
        </Dialog>
    );
};

export default UniversalModal;