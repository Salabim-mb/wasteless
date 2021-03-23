import React, {useContext, useEffect, useRef, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Button, CircularProgress} from "@material-ui/core";
import {AlertContext, UserContext} from "context";
import {Redirect} from "react-router-dom";
import {be} from "../../constants/backendSetup";
import CardMedia from "@material-ui/core/CardMedia";
import SignalCellular1BarIcon from '@material-ui/icons/SignalCellular1Bar';
import SignalCellular3BarIcon from '@material-ui/icons/SignalCellular3Bar';
import SignalCellular4BarIcon from '@material-ui/icons/SignalCellular4Bar';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import WorkIcon from '@material-ui/icons/Work';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {getCORSHeaders} from "../../utils/fetchTools";
import {path_list, path_list as paths_list} from "../../constants/routes";
import Link from "@material-ui/core/Link";
import FilterBar from "./components/FilterBar";


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
    centered: {
        justifyContent: 'center',
        textAlign: 'center',

    },
}));


export default function RecipesList() {
    const classes = useStyles();

    const alertC = useRef(useContext(AlertContext));
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [redirect, setRedirect] = useState(undefined);

    useEffect(() => {
        const loadRecipes = async (token) => {
            setLoading(true);
            try {
                let res = await getRecipes(token);
                if (res !== null) {
                    await setRecipes(res.results);
                    await setCount(res.count);
                    await setNext(res.next);
                    await setPrevious(res.previous);
                } else {
                    setRedirect(path_list.LOGIN.route);
                }
            } catch (e) {
                console.log(e);
                alertC.current.showAlert("Something went wrong while trying to fetch recipes list", "error");
            } finally {
                setLoading(false);
            }
        };
        loadRecipes(user.token);
    }, [user.token]);

    const getRecipes = async (token) => {
        const headers = getCORSHeaders(token);
        const url = be.RECIPE;
        let res = await fetch(url, {
            headers,
            method: "GET"
        });
        if (res.status === 200) {
            return await res.json();
        } else if (res.status === 401) {
            alertC.current.showAlert("You have to be logged in to see recipes", "error");
            return null;
        } else {
            alertC.current.showAlert("Something went wrong while trying to fetch recipe list", "error");
            throw res.status;
        }
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <FilterBar setLoading={setLoading} setRecipes={setRecipes} setCount={setCount} setNext={setNext} setPrevious={setPrevious} setRedirect={setRedirect}/>
                    {
                        loading ? (
                            <div className={classes.centered}>
                                <CircularProgress/>
                            </div>
                        ) : (
                            <div>
                                <Grid container spacing={4}>
                                    {recipes.map((recipe, id) => (
                                        <Grid item key={id} xs={12} sm={6} md={4}>
                                            <Card className={classes.card}>

                                                <CardMedia
                                                    className={classes.cardMedia}
                                                    image={recipe.image_url}
                                                    title="Image title"
                                                />

                                                <CardContent className={classes.cardContent}>

                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {recipe.recipe_name}
                                                    </Typography>
                                                    <Grid container spacing={3} className={classes.centered}>
                                                        <Grid item xs={2} sm={2}>
                                                            <Typography component={'span'}>
                                                                {recipe.difficulty === "BG" ?
                                                                    <h5>BG</h5> : recipe.difficulty === "IT" ?
                                                                        <h5>IT</h5> : <h5>AD</h5>}
                                                            </Typography>
                                                            <Typography>
                                                                {recipe.difficulty === "BG" ?
                                                                    <SignalCellular1BarIcon/> : recipe.difficulty === "IT" ?
                                                                        <SignalCellular3BarIcon/> :
                                                                        <SignalCellular4BarIcon/>}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4}>
                                                            <Typography component={'span'}>
                                                                <h5>{recipe.ratings_num}</h5>
                                                            </Typography>
                                                            <Typography>
                                                                {parseFloat(recipe.rating, 10) < parseFloat("0.25", 10) ?
                                                                    <StarBorderIcon/> :
                                                                    parseFloat(recipe.rating, 10) < parseFloat("0.75", 10) ?
                                                                        <StarHalfIcon/> :
                                                                        <StarIcon/>}
                                                                {parseFloat(recipe.rating, 10) < parseFloat("1.25", 10) ?
                                                                    <StarBorderIcon/> :
                                                                    parseFloat(recipe.rating, 10) < parseFloat("1.75", 10) ?
                                                                        <StarHalfIcon/> :
                                                                        <StarIcon/>}
                                                                {parseFloat(recipe.rating, 10) < parseFloat("2.25", 10) ?
                                                                    <StarBorderIcon/> :
                                                                    parseFloat(recipe.rating, 10) < parseFloat("2.75", 10) ?
                                                                        <StarHalfIcon/> :
                                                                        <StarIcon/>}
                                                                {parseFloat(recipe.rating, 10) < parseFloat("3.25", 10) ?
                                                                    <StarBorderIcon/> :
                                                                    parseFloat(recipe.rating, 10) < parseFloat("3.75", 10) ?
                                                                        <StarHalfIcon/> :
                                                                        <StarIcon/>}
                                                                {parseFloat(recipe.rating, 10) < parseFloat("4.25", 10) ?
                                                                    <StarBorderIcon/> :
                                                                    parseFloat(recipe.rating, 10) < parseFloat("4.75", 10) ?
                                                                        <StarHalfIcon/> :
                                                                        <StarIcon/>}

                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={2} sm={2}>
                                                            <Typography component={'span'}>
                                                                {recipe.meal === "BF" ?
                                                                    <h5>BF</h5> : recipe.meal === "LU" ?
                                                                        <h5>LU</h5> : recipe.meal === "DN" ?
                                                                            <h5>DN</h5> : <h5>SU</h5>}
                                                            </Typography>
                                                            <Typography>
                                                                {recipe.meal === "BF" ?
                                                                    <FreeBreakfastIcon/> : recipe.meal === "LU" ?
                                                                        <WorkIcon/> : recipe.meal === "DN" ?
                                                                            <RestaurantIcon/> :
                                                                            <EmojiFoodBeverageIcon/>}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={4} sm={4}>
                                                            <Typography component={'span'}>
                                                                <h5> {recipe.prep_time}</h5>
                                                            </Typography>
                                                            <Typography>
                                                                <AccessTimeIcon/>
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography>
                                                            {recipe.description}
                                                        </Typography>
                                                    </Grid>
                                                    <h5></h5>
                                                    {redirect && <Redirect to={redirect}/>}
                                                    <Grid item xs={12} className={classes.centered}>
                                                        <Link
                                                            onClick={() => setRedirect(paths_list.RECIPES_LIST.route + "/" + recipe.id)}>

                                                            <Button variant="contained" color="primary">
                                                                Show details
                                                            </Button>
                                                        </Link>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        )
                    }
                    <h5></h5>
                    <Grid container spacing={4}>
                        <Grid item xs={6} className={classes.centered}>
                            {previous === null ? (
                                <Button variant="contained" color="primary" disabled={true}>
                                    Back
                                </Button>
                            ) : (
                                <Link onClick={() => setRedirect(previous)}>
                                    <Button variant="contained" color="primary">
                                        Back
                                    </Button>
                                </Link>
                            )}
                        </Grid>
                        {redirect && <Redirect to={redirect}/>}
                        <Grid item xs={6} className={classes.centered}>
                            {next === null ? (
                                <Button variant="contained" color="primary" disabled={true}>
                                    Next
                                </Button>
                            ) : (
                                <Link onClick={() => setRedirect(next)}>
                                    <Button variant="contained" color="primary">
                                        Next
                                    </Button>
                                </Link>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}