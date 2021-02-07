import React, {useContext, useRef} from 'react';
import {Grid, TextField} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {BrowserBarcodeReader} from '@zxing/library';
import {AlertContext} from "context/AlertContext";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    if (selectedFile !== undefined) {
        var reader = new FileReader();

        var imgtag = document.getElementById("barcodeImg");
        imgtag.title = selectedFile.name;

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);
    }

}


const BarcodeForm = ({data, setData}) => {
    const classes = useStyles();
    const alertC = useRef(useContext(AlertContext));

    function ShowErrorAlert() {
        alertC.current.showAlert("Illegible photo, please zoom to barcode", "error");
    }

    function ShowSuccessAlert() {
        alertC.current.showAlert("Decoding successful", "success");
    }

    const decodeFromImage = async (e) => {


        let codeReader = new BrowserBarcodeReader();
        let img = document.getElementById("barcodeImg");
        let result = "";
        let barcodeFieldId = document.getElementById("barcode");


        try {
            result = await codeReader.decode(img);
            barcodeFieldId.value = result.text;
            ShowSuccessAlert();
        } catch (err) {
            ShowErrorAlert();
        }

    }

    return (
        <>
            <Grid item xs={12}>
                <TextField
                    autoFocus
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    id="barcode"
                    autoComplete="barcode"
                    onChange={e => setData(e.target.value)}
                />
            </Grid>
            <img id="barcodeImg" height="200"/>
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={e => onFileSelected(e)}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
                <label>
                    <Button variant="contained" color="default" component="span" onClick={e => decodeFromImage(e)}>
                        Decode
                    </Button>
                </label>
            </div>
        </>
    )
};

export default BarcodeForm;