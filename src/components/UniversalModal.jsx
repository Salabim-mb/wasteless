import React from "react";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
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
    dialog: {
        minWidth: "300px"
    }
}));

const UniversalModal = ({ setOpen, open, title, children, ...rest }) => {
    const classes = useStyles();

    return (
        <Dialog className={classes.dialog} scroll="paper" onClose={() => setOpen(false)} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle disableTypography className={classes.root} {...rest}>
                <Typography variant="h6">{title}</Typography>
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default UniversalModal;