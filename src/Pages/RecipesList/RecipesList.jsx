import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {Button, CircularProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DetailsModal from "../ProductsList/components/DetailsModal";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     overflow: 'hidden',
    //     backgroundColor: theme.palette.background.paper,
    // },
    gridList: {
        // width: 600,
        // height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
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
    titleClass: {
        titlePosition: 'top',
    }
}));


export default function RecipesList() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
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
                                    <Grid item xs={12} sm={6}>
                                        <GridListTile key={tile.id} >
                                            <img src={tile.img} alt={tile.title}/>
                                            <GridListTileBar
                                                title={tile.title}
                                                subtitle={<Grid container spacing={3} className={classes.cardDetails}>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography>
                                                            {tile.level}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <Typography>
                                                            {tile.rate}
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
                                                </Grid>}

                                            />
                                        </GridListTile>
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