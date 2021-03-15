import {makeStyles} from "@material-ui/core/styles";
import React, {useContext} from "react";
import {UserContext} from "../../context";
import {
    BottomNavigation,
    BottomNavigationAction, Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    FormControl, Icon,
    InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Select, TextareaAutosize,
    TextField,
    Typography
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
        textAlign: "center"
    },
    textField: {
        width: "80%",
        margin: theme.spacing(1)
    },
    ingredientsDiv: {
        display: "flex"
    },
    ingredientsList: {
        margin: theme.spacing(1),
        textAlign: "left"
    },
    floatingButton: {
        justifyContent: "center",
        alignContent: "center",
        margin: theme.spacing(1)
    }
}))

export default function NewRecipe() {
    const classes = useStyles();
    const user = useContext((UserContext))
    const [difficulty, setDifficulty] = React.useState('BG');
    const [unit, setUnit] = React.useState('g');
    const [mealType, setMealType] = React.useState('BF');
    const [ingredients, setIngredients] = React.useState({})


    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value);
    };

    const handleChangeMealType = (event) => {
        setMealType(event.target.value);
    };

    const handleChangeUnit = (event) => {
        setUnit(event.target.value)
    }

    function generate(ingredients) {
        return ingredients.map((value) => {
                let text = ""
                const unit = value.unit !== "None" ? value.unit : ""
                text = value.quantity + " " + unit + " " + value.ingredient
                return (<ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary= {text}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>)
            }
        );
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container fixed>
                <Paper>
                    <div className={classes.mainDiv}>
                        <TextField className={classes.textField} label="Recipe name"></TextField>
                        <FormControl className={classes.textField}>
                            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={difficulty}
                                onChange={handleChangeDifficulty}
                            >
                                <MenuItem value={'BG'}>Beginner</MenuItem>
                                <MenuItem value={'IT'}>Intermediate</MenuItem>
                                <MenuItem value={'AD'}>Advanced</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.textField}>
                            <InputLabel id="demo-simple-select-label">Meal type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mealType}
                                onChange={handleChangeMealType}
                            >
                                <MenuItem value={'BF'}>Breakfast</MenuItem>
                                <MenuItem value={'LU'}>Lunch</MenuItem>
                                <MenuItem value={'DN'}>Dinner</MenuItem>
                                <MenuItem value={'SP'}>Supper</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.ingredientsList}>
                            <Typography variant="h6" className={classes.title}>
                                INGREDIENTS
                            </Typography>
                            <List dense={true}>
                                {/*{generate(ingredients)}*/}
                            </List>
                        </div>
                        <div className={classes.ingredientsDiv}>
                            <TextField className={classes.textField} label="Quantity"></TextField>
                            <FormControl className={classes.textField}>
                                <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={unit}
                                    onChange={handleChangeUnit}
                                >
                                    <MenuItem value={'g'}>Grams</MenuItem>
                                    <MenuItem value={'kg'}>Kilograms</MenuItem>
                                    <MenuItem value={'lb'}>Pounds</MenuItem>
                                    <MenuItem value={''}>None</MenuItem>
                                    <MenuItem value={'tbsp'}>Tbsp</MenuItem>
                                    <MenuItem value={'tsp'}>Tsp</MenuItem>
                                    <MenuItem value={'ml'}>Mililiter</MenuItem>
                                    <MenuItem value={'l'}>Liter</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField className={classes.textField} label="Ingredient"></TextField>
                        </div>
                        <div className={classes.floatingButton}>
                            <Fab size="small" color="secondary" aria-label="add" className={classes.margin}>
                                <AddIcon/>
                            </Fab>
                        </div>
                        <TextField className={classes.textField} label="Description" multiline></TextField>
                        <TextField className={classes.textField} label="Instructions" multiline></TextField>
                        <div className={classes.floatingButton}>
                            <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}>Submit</Button>
                        </div>
                    </div>
                </Paper>
            </Container>
        </React.Fragment>
    )
}