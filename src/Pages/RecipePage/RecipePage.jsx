import React, {useState} from 'react';
import clsx from 'clsx';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Orders from './Orders';
import exampleRecipe from "./exampleRecipe";
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Deposits from "./Deposits";
import Typography from "@material-ui/core/Typography";
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
import Title from "./Title";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 250,
        justifyContent:'center',
        textAlign:'center',
        // [theme.breakpoints.down('sm')]: {
        //     height: "auto",
        //     width: '100vh',
        // },

    },
    cardDetails: {
        textAlign: 'center',
        justifyContent:'center',
    },
    centered: {
        justifyContent:'center',
        textAlign:'center',

    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function RecipePage() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [loading, setLoading] = useState(false);


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div/>
                <Container maxWidth="lg" className={classes.container}>
                    {
                        loading ? (
                            <CircularProgress/>
                        ) : (
                            <Grid container spacing={3}>
                                {exampleRecipe.map((recipe) => (
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6} lg={6}>
                                            <Paper className={fixedHeightPaper}>
                                                <Typography component="p" variant="h4">
                                                    {recipe.recipe_name}
                                                </Typography>
                                                <Grid container spacing={3} className={classes.cardDetails}>
                                                    <Grid item xs={2} sm={2}>
                                                        <Typography>
                                                            {recipe.difficulty === "BG" ? <h5>Beginner</h5>   : recipe.difficulty === "IT" ? <h5>Intermediate</h5>  : <h5>Advanced</h5>}
                                                        </Typography>
                                                        <Typography>
                                                            {recipe.difficulty === "BG" ? <SignalCellular1BarIcon /> : recipe.difficulty === "IT" ? <SignalCellular3BarIcon/> : <SignalCellular4BarIcon/>}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} sm={4}>
                                                        <Typography>
                                                            <h5>{recipe.ratings_num}</h5>
                                                        </Typography>
                                                        <Typography>
                                                            {parseFloat(recipe.rating,10) < parseFloat("0.25",10) ? <StarBorderIcon/> :
                                                                parseFloat(recipe.rating,10) < parseFloat("0.75",10) ? <StarHalfIcon/> :
                                                                    <StarIcon/>}
                                                            {parseFloat(recipe.rating,10) < parseFloat("1.25",10) ? <StarBorderIcon/> :
                                                                parseFloat(recipe.rating,10) < parseFloat("1.75",10) ? <StarHalfIcon/> :
                                                                    <StarIcon/>}
                                                            {parseFloat(recipe.rating,10) < parseFloat("2.25",10) ? <StarBorderIcon/> :
                                                                parseFloat(recipe.rating,10) < parseFloat("2.75",10) ? <StarHalfIcon/> :
                                                                    <StarIcon/>}
                                                            {parseFloat(recipe.rating,10) < parseFloat("3.25",10) ? <StarBorderIcon/> :
                                                                parseFloat(recipe.rating,10) < parseFloat("3.75",10) ? <StarHalfIcon/> :
                                                                    <StarIcon/>}
                                                            {parseFloat(recipe.rating,10) < parseFloat("4.25",10) ? <StarBorderIcon/> :
                                                                parseFloat(recipe.rating,10) < parseFloat("4.75",10) ? <StarHalfIcon/> :
                                                                    <StarIcon/>}

                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} sm={2}>
                                                        <Typography>
                                                            {recipe.meal === "BF" ? <h5>Breakfast</h5>   : recipe.meal === "LU" ? <h5>Lunch</h5>  : recipe.meal === "DN" ? <h5>Dinner</h5> : <h5>Supper</h5>}
                                                        </Typography>
                                                        <Typography>
                                                            {recipe.meal === "BF" ? <FreeBreakfastIcon/>   : recipe.meal === "LU" ?  <WorkIcon/> : recipe.meal === "DN" ? <RestaurantIcon/> : <EmojiFoodBeverageIcon/>}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={4} sm={4}>
                                                        <Typography>
                                                        <h5> {recipe.prep_time}</h5>
                                                    </Typography>
                                                        <Typography>
                                                            <AccessTimeIcon/>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} md={5} lg={5}>
                                            {/*<Paper >*/}
                                            {/*    <Typography component="img" src={recipe.image_url}  className={classes.fixedHeight}>*/}
                                            <div className={classes.centered}>
                                                <img src={recipe.image_url} className={classes.fixedHeight} />
                                            </div>

                                                {/*</Typography>*/}
                                            {/*</Paper>*/}
                                        </Grid>
                                        <Grid item xs={12}  md={5}>
                                            <Paper className={classes.paper}>
                                                <Title>Ingredients</Title>
                                                <React.Fragment>
                                                        <Table >
                                                            <TableBody>
                                                                {recipe.ingredients.map((value, index) => (
                                                                    <StyledTableRow  key={index}>
                                                                        <StyledTableCell >{value}</StyledTableCell >

                                                                    </StyledTableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                </React.Fragment>
                                                <h5></h5>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}  md={7}>
                                            <Paper className={classes.paper}>

                                                <Title>Preparation details</Title>
                                                <Typography>{recipe.instructions}</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Paper className={classes.paper}>

                                                <Title>Comments</Title>
                                                <Typography></Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                </Container>
            </main>
        </div>
    );
}