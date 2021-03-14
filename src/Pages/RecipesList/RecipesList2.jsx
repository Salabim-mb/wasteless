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
import DetailsModal from "../ProductsList/components/DetailsModal";
import {be} from "../../constants/backendSetup";
import tileData from './tileData';
import CardMedia from "@material-ui/core/CardMedia";
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
    },
    cardDetails: {
        textAlign: 'center',
    }
}));


export default function RecipesList2() {
    const classes = useStyles();

    const alertC = useRef(useContext(AlertContext));
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [openModal, setOpenModal] = useState(false);


    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {
                        loading ? (
                            <CircularProgress/>
                        ) : (
                            <Grid container spacing={4}>
                                {tileData.map((tile) => (
                                    <Grid item key={tile.id} xs={12} sm={6} md={4}>
                                        <Card className={classes.card}>

                                            <CardMedia
                                                className={classes.cardMedia}
                                                image={tile.img}
                                                title="Image title"
                                            />

                                            <CardContent className={classes.cardContent}>

                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {tile.title}
                                                </Typography>
                                                <Grid container spacing={3} className={classes.cardDetails}>
                                                    <Grid item xs={12} sm={4}>
                                                        <Typography>
                                                            {tile.level}
                                                        </Typography>
                                                        <Typography>
                                                            {tile.level === "easy" ? <SignalCellular1BarIcon /> : tile.level === "medium" ? <SignalCellular3BarIcon/> : <SignalCellular4BarIcon/>}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={7}>
                                                        <Typography>
                                                            {tile.countRates}
                                                        </Typography>
                                                        <Typography>
                                                            <StarIcon/>
                                                            {tile.rate === "1" ? <StarBorderIcon/> :
                                                                tile.rate === "2" ? <StarIcon/> :
                                                                    tile.rate === "3" ? <StarIcon/> :
                                                                    tile.rate === "4" ? <StarIcon/> : <StarIcon/>}
                                                            {tile.rate === "1" ? <StarBorderIcon/> :
                                                                tile.rate === "2" ? <StarBorderIcon/> :
                                                                    tile.rate === "3" ? <StarIcon/> :
                                                                        tile.rate === "4" ? <StarIcon/> : <StarIcon/>}
                                                            {tile.rate === "1" ? <StarBorderIcon/> :
                                                                tile.rate === "2" ? <StarBorderIcon/> :
                                                                    tile.rate === "3" ? <StarBorderIcon/> :
                                                                        tile.rate === "4" ? <StarIcon/> : <StarIcon/>}
                                                            {tile.rate === "1" ? <StarBorderIcon/> :
                                                                tile.rate === "2" ? <StarBorderIcon/> :
                                                                    tile.rate === "3" ? <StarBorderIcon/> :
                                                                        tile.rate === "4" ? <StarBorderIcon/> : <StarIcon/>}

                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                    <Typography>
                                                        {tile.description}
                                                    </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button variant="contained" color="primary">
                                                            Show details
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    }
                </Container>
                <DetailsModal setOpen={setOpenModal} open={!!openModal} product_id={openModal}/>
            </main>
        </React.Fragment>
    );
}