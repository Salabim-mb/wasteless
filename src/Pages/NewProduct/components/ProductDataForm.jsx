import React, {useContext, useEffect, useRef, useState} from "react";
import {AlertContext} from "context";
import {off_API} from "constants/backendSetup";
import {Avatar, Backdrop, CircularProgress, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    avatarContainer: {
        marginBottom: theme.spacing(2),
        // textAlign: "center",
        display: "flex",
        justifyContent: "space-evenly"
    },
    avatar: {
        display: "block",
        textAlign: "center",
        margin: theme.spacing(1),
        background: theme.palette.secondary
    }

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
    product_name: data.product_name_en || data.product_name,
    energy_kcal: data.nutriments["energy-kcal"],
    carbohydrates: data.nutriments.carbohydrates,
    fat: data.nutriments.fat,
    fiber: data.nutriments.fiber || 0,
    proteins: data.nutriments.proteins,
    quantity_g: data.product_quantity || "",
    image_url: data.image_front_small_url || data.image_small_url

});

const ProductDataForm = ({data, setData, barcode}) => {
    const alertC = useRef(useContext(AlertContext));
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const loadProductData = async() => {
            setLoading(true);
            try {
                let product = await fetchProductData(barcode);
                setData( {...data, ...mapProductData(product)} );
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
        <>
            <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                    <img src={data.image_url} alt={data?.product_name?.charAt(0) || "P"} />
                </Avatar>
                <TextField
                    autoComplete="product_name"
                    variant="outlined"
                    fullWidth
                    id="product_name"
                    label="Detected product name"
                    autoFocus
                    value={data.product_name}
                    onChange={e => setData({...data, product_name: e.target.value})}
                />
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        autoComplete="quantity_g"
                        variant="outlined"
                        fullWidth
                        id="quantity"
                        label="Quantity (grams)"
                        autoFocus
                        value={data.quantity_g}
                        onChange={e => setData({...data, quantity_g: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="carbohydrates"
                        label="Carbohydrates"
                        autoComplete="carbohydrates"
                        value={data.carbohydrates}
                        onChange={e => setData({...data, carbohydrates: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        autoComplete="energy_kcal"
                        variant="outlined"
                        fullWidth
                        id="energy_kcal"
                        label="Energy (kcal)"
                        autoFocus
                        value={data.energy_kcal}
                        onChange={e => setData({...data, energy_kcal: e.target.value})}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        autoComplete="fat"
                        variant="outlined"
                        fullWidth
                        id="fat"
                        label="Fat"
                        autoFocus
                        value={data.fat}
                        onChange={e => setData({...data, fat: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {/*change to datepicker!!!!*/}
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="fiber"
                        label="Fiber"
                        autoComplete="carbohydrates"
                        value={data.fiber}
                        onChange={e => setData({...data, fiber: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        autoComplete="energy_kcal"
                        variant="outlined"
                        fullWidth
                        id="proteins"
                        label="Proteins"
                        autoFocus
                        value={data.proteins}
                        onChange={e => setData({...data, proteins: e.target.value})}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default ProductDataForm;