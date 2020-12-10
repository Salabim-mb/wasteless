import React, {useContext, useEffect, useRef, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import {CardHeader} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Delete from '@material-ui/icons/Delete';
import {AlertContext, UserContext} from "../../context";
import {useParams} from "react-router-dom";
import {ErrorOutlineTwoTone} from "@material-ui/icons";

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

const fetchProductsList = async(token, fridgeId) => {
    const url = `https://wasteless-backend.herokuapp.com/fridges/${fridgeId}/`
    const headers = {
        Authorization: token,
        "Content-Type": "application/json",
    }

    const res = await fetch(url, {
        headers,
        method: "GET"
    });

    if (res.status === 200) {
        return await  res.json();
    } else {
        throw res.status;
    }
};


export default function Album() {
    const products = [
        {
            productName: 'Milk',
            quantity: '1',
            expDate: '12.12.2020'
        },
        {
            productName: 'Orange Juice',
            quantity: '1',
            expDate: '13.12.2020'
        },
        {
            productName: 'Eggs',
            quantity: '5',
            expDate: '19.12.2020'
        },
        {
            productName: 'Yoghurt',
            quantity: '5',
            expDate: '22.12.2020'
        },
        {
            productName: 'Tenderloin',
            quantity: '10',
            expDate: '12.12.2020'
        },
        {
            productName: 'Ham',
            quantity: '1',
            expDate: '07.12.2020'
        },
        {
            productName: 'Cottage Cheese',
            quantity: '2',
            expDate: '12.01.2021'
        },
        {
            productName: 'Lemon',
            quantity: '2',
            expDate: '01.02.2021'
        },
        {
            productName: 'Lemon',
            quantity: '3',
            expDate: '01.04.2021'
        }
    ];
    console.log(products);

    const classes = useStyles();

    const alertC = useRef(useContext(AlertContext));
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const {fridgeId} = useParams();

    for(let i = 0; i < products.length; i++) {
        let splitDate = products[i].expDate.split(".");
        let newFormDate = splitDate[1] + "." + splitDate[0] + "." + splitDate[2];
        let now = new Date().getTime();
        let dateOffset = (24*60*60*1000) * 3;
        let c1 = (products[i].productName.toUpperCase().charCodeAt(0) * 5) % 256;
        let c2 = (products[i].productName.toUpperCase().charCodeAt(1) * 5) % 256;
        let c3 = (products[i].productName.toUpperCase().charCodeAt(2) * 5) % 256;
        products[i].dateToCompare = Date.parse(newFormDate);
        products[i].backgroundColor = "rgb(" + c1 + "," + c2 + "," + c3 + ")";

        if (now > products[i].dateToCompare){
            products[i].color = "red";
        } else if (now + dateOffset > products[i].dateToCompare) {
            products[i].color = "orange";
        } else {
            products[i].color = "black";
        }
    }

    products.sort((a, b) => (a.dateToCompare > b.dateToCompare) ? 1 : -1);

    useEffect(() => {
        const loadProductsList = async(token) => {
            setLoading(true);
            try {
                console.log(fridgeId);
                let {productsList} = await fetchProductsList(token, fridgeId);
                setProductsList(productsList);
            } catch(e) {
                alertC.current.showAlert("Couldn't load products list!", "error");
            } finally {
                setLoading(false);
            }
        };
        loadProductsList(user.token);
    }, [user.token, fridgeId]);



    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {products.map((product, idxProduct) => (
                            <Grid item key={idxProduct} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor: product.backgroundColor}}>
                                                {product.dateToCompare < (new Date()).getTime() ? <ErrorOutlineTwoTone /> : product.productName.charAt(0)}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="delete">
                                                <Delete/>
                                            </IconButton>
                                        }
                                    />
                                    <CardContent className={classes.cardContent} style={{color: product.color}}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {product.productName}
                                        </Typography>
                                        <Typography>
                                            Quantity: {product.quantity}
                                        </Typography>
                                        <Typography>
                                            Expiration date: {product.expDate}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}