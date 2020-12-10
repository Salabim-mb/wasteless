import React, {useContext, useEffect, useRef, useState} from "react";
import {AlertContext, UserContext} from "context";
import UniversalModal from "../../../components/UniversalModal";
import {CircularProgress, Typography} from "@material-ui/core";

const getProductData = async(token, product_id) => {
    const url = "https://wasteless-backend.herokuapp.com/products/" + product_id + "/";
    const headers = {
        "Authorization": token
    };
    let res = await fetch(url, {
        headers,
        method: "GET"
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const parseDate = (dateString) => {
    let d = new Date(dateString);
    return d.getDate() + 1 + "." + d.getMonth() + 1 + "." + d.getFullYear() + 1900;
}

const mapData = (data) => ({
    "Product name": data.product_name,
    "Quantity": data.quantity,
    "Weight (gram)": data.quantity_q,
    "Energy (kcal)": data.energy_kcal,
    "Carbohydrates": data.carbohydrates,
    "Proteins": data.proteins,
    "Fat": data.fat,
    "Fiber": data.fiber,
    "Salt": data.salt,
    "Sodium": data.sodium,
    "Added": parseDate(data.date_added),
    "Expires at": parseDate(data.expiration_date)
});

const DetailsModal = ({product_id, open, setOpen}) => {
    let data = {};
    const [loading, setLoading] = useState(false);
    const user = useContext(UserContext);
    const alertC = useRef(useContext(AlertContext));

    useEffect(() => {
        const loadProductDetails = async () => {
            setLoading(true);
            try {
                data = mapData( await getProductData(user.token, product_id) );
            } catch(ex) {
                console.log(ex);
                alertC.current.showAlert("There was an error loading product data", "error");
            } finally {
                setLoading(false);
            }
        };
        loadProductDetails();
    }, [product_id, user.token]);

    return (
        <UniversalModal open={open} setOpen={setOpen} title="Product details">
            {
                loading ? (
                    <CircularProgress />
                ) : (
                    Object.keys(data).map((item) => (
                        <Typography display="block">
                            <Typography variant="button" gutterBottom>{item}</Typography>
                            <Typography variant="body2" gutterBottom>{data[item]}</Typography>
                        </Typography>
                    ))
                )
            }
        </UniversalModal>
    )
};

export default DetailsModal;