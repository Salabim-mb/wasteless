import {useContext, useEffect, useRef, useState} from "react";
import {AlertContext} from "context";
import {off_API} from "constants/backendSetup";
import {useParams} from "react-router-dom";

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

const metoda = async(token, fridgeId) => {
    const url = `https://wasteless-backend.herokuapp.com/fridges/${fridgeId}/`;
    const headers = {
        Authorization: token,
    }

    const res = await fetch(url, {
        headers,
        method: "GET"
    });

    if (res.status === 200) {
        return await res.json();
    } else {
        throw res.status;
    }
};

const mapProductData = (data) => ({

});

const ProductDataForm = ({data, setData, barcode}) => {
    const alertC = useRef(useContext(AlertContext));
    const [loading, setLoading] = useState(false);

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
    });

    return loading ? (
        <div/>
    ) : (
        <div/>
    )
}

export default ProductDataForm;