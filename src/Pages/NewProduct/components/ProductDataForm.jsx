import {useContext, useEffect, useRef, useState} from "react";
import {AlertContext} from "context";
import {off_API} from "constants/backendSetup";
import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const fetchProductData = async (barcodeNumber) => {
    const url = `${off_API}${barcodeNumber}`;
    const res = await fetch(url, {
        method: "GET"
    });

    if (res.status === 200) {
        let parsedRes = await res.json();
        if (parsedRes.status === 0) {
            throw parsedRes.status_verbose || "product not found";
        } else {
            return parsedRes.product;
        }
    } else {
        throw res.status;
    }
};

const mapProductData = (data) => ({

});

const ProductDataForm = ({data, setData, barcode}) => {
    const alertC = useRef(useContext(AlertContext));
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const loadProductData = async() => {
            setLoading(true);
            try {
                let {product} = await fetchProductData(barcode);
                setData( mapProductData(product) );
            } catch(e) {
                alertC.current.showAlert("Couldn't load product info, please type it manually.", "error");
            } finally {
                setLoading(false);
            }
        };
        loadProductData();
    }, [barcode]);

    return loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : (
        <div/>
    )
}

export default ProductDataForm;