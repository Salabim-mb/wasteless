import React, {useContext, useEffect, useRef, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import {Button, CardHeader, CircularProgress} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Delete from '@material-ui/icons/Delete';
import {AlertContext, UserContext} from "context";
import {useParams} from "react-router-dom";
import {ErrorOutlineTwoTone} from "@material-ui/icons";
import DetailsModal from "./components/DetailsModal";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

const fetchProductsList = async (token, fridgeId) => {
    const url = `https://wasteless-backend.herokuapp.com/fridge/${fridgeId}/`
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json",
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

const fetchDeleteProduct = async (token, productId) => {
    const baseURL = `https://wasteless-backend.herokuapp.com/fridges/${productId}/`
    const headers = {
        Authorization: "Token " + token,
    }

    const request = await fetch(baseURL, {
        headers,
        method: "DELETE"
    });

    if (request.status === 204) {
        return await request.json();
    } else {
        throw request.status;
    }
}

export default function Album() {
    const classes = useStyles();

    const alertC = useRef(useContext(AlertContext));
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const {fridge_id} = useParams();
    const fridgeId = fridge_id;

    for(let i = 0; i < productsList.length; i++) {
        let splitDate = productsList[i].expiration_date.split(".");
        let newFormDate = splitDate[1] + "." + splitDate[0] + "." + splitDate[2];
        let now = new Date().getTime();
        let dateOffset = (24*60*60*1000) * 3;
        let c1 = (productsList[i].product_name.toUpperCase().charCodeAt(0) * 5) % 256;
        let c2 = (productsList[i].product_name.toUpperCase().charCodeAt(1) * 5) % 256;
        let c3 = (productsList[i].product_name.toUpperCase().charCodeAt(2) * 5) % 256;
        productsList[i].dateToCompare = Date.parse(newFormDate);
        productsList[i].backgroundColor = "rgb(" + c1 + "," + c2 + "," + c3 + ")";

        if (now > productsList[i].dateToCompare){
            productsList[i].color = "red";
        } else if (now + dateOffset > productsList[i].dateToCompare) {
            productsList[i].color = "orange";
        } else {
            productsList[i].color = "black";
        }
    }

    productsList.sort((a, b) => (a.dateToCompare > b.dateToCompare) ? 1 : -1);

    useEffect(() => {
        const loadProductsList = async (token) => {
            setLoading(true);
            try {
                let products = await fetchProductsList(token, fridgeId);
                setProductsList(products);
            } catch (e) {
                alertC.current.showAlert("Couldn't load products list!", "error");
            } finally {
                setLoading(false);
            }
        };
        loadProductsList(user.token);
    }, [user.token, fridgeId]);

    async function handleDeleteClick(e, id) {
        e.preventDefault()
        setLoading(true);
        try {
            await fetchDeleteProduct(user.token, id);
            let newProductList = productsList.filter((product) => product.id !== id)
            setProductsList(newProductList)
            alertC.current.showAlert("Successfully deleted product!", "success");
        } catch (ex) {
            alertC.current.showAlert("Couldn't delete product!", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {
                        loading ? (
                            <CircularProgress />
                        ) : (
                            <Grid container spacing={4}>
                                {productsList.map((product, idxProduct) => (
                                    <Grid item key={idxProduct} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor: product.backgroundColor}}>
                                                        {product.dateToCompare < (new Date()).getTime() ? <ErrorOutlineTwoTone /> : product.product_name.charAt(0)}
                                                    </Avatar>
                                                }
                                                action={
                                                    <IconButton aria-label="delete" onClick={(e) => handleDeleteClick(e, product.id)}>
                                                        <Delete/>
                                                    </IconButton>
                                                }
                                            />
                                            <CardContent className={classes.cardContent} style={{color: product.color}}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {product.product_name}
                                                </Typography>
                                                <Typography>
                                                    Quantity: {product.quantity}
                                                </Typography>
                                                <Typography>
                                                    Expiration date: {product.expiration_date}
                                                </Typography>
                                                <Button variant="contained" color="primary" onClick={() => setOpenModal(product.id)}>
                                                    Show details
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    }
                </Container>
                <DetailsModal setOpen={setOpenModal} open={!!openModal} product_id={openModal} />
            </main>
        </React.Fragment>
    );
}