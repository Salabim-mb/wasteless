import {makeStyles} from "@material-ui/core/styles";
import React, {useContext, useRef} from "react";
import {AlertContext, UserContext} from "../../context";
import {
    Button,
    Container,
    CssBaseline,
    FormControl,
    Icon,
    InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
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
    const alertC = useRef(useContext(AlertContext));
    const [recipeName, setRecipeName] = React.useState('');
    const [difficulty, setDifficulty] = React.useState('BG');
    const [quantity, setQuantity] = React.useState("0");
    const [ingredient, setIngredient] = React.useState('');
    const [unit, setUnit] = React.useState('g');
    const [mealType, setMealType] = React.useState('BF');
    const [ingredients, setIngredients] = React.useState([{unit: "g", quantity: "5", ingredient: "tomates"}]);


    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value);
    };

    const handleChangeMealType = (event) => {
        setMealType(event.target.value);
    };

    const handleChangeUnit = (event) => {
        setUnit(event.target.value)
    }

    function generate() {
        return ingredients.map((value) => {
                const handleDeleteIngredient = (e) => {
                    e.preventDefault()
                    let newList = ingredients.filter((element) => element !== value)
                    setIngredients(newList)
                }
                const unit = value.unit !== "None" ? value.unit : ""
                let text = value.quantity + " " + unit + " " + value.ingredient
                let element = (<ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={text}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={handleDeleteIngredient}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>)
                return React.cloneElement(element);
            }
        );
    }

    const prepareIngredients = (e) => {
        let prepared = []
        ingredients.forEach((element) => {
            const unit = element.unit !== "None" ? element.unit : ""
            const text = element.quantity + " " + unit + " " + element.ingredient;
            prepared.push(text);
        })
        return prepared;
    }

    const handleAddIngredient = (e) => {
        e.preventDefault()
        try {
            if (!/^[\d]+$/.test(quantity)) {
                throw "Wrong quantity format"
            }
            if (!/^[A-Za-z]+$/.test(ingredient)) {
                throw "Wrong ingredient format"
            }

            const formula = {
                unit: unit,
                quantity: quantity,
                ingredient: ingredient
            }
            ingredients.forEach((element) => {
                if (JSON.stringify(element) === JSON.stringify(formula)) {
                    throw "Ingredient already in the list"
                }
            })
            setIngredients([
                ...ingredients, formula
            ])
        } catch (err) {
            alertC.current.showAlert(err, "error")
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const pre_ingredients = prepareIngredients()
            let body = {recipe_name: recipeName, difficulty: difficulty, tags: "",}
        } catch (err) {
            alertC.current.showAlert(err, "error")
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container fixed>
                <Paper>
                    <div className={classes.mainDiv}>
                        <TextField className={classes.textField} label="Recipe name"
                                   onChange={(e) => setRecipeName(e.target.value)}></TextField>
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
                                {generate()}
                            </List>
                        </div>
                        <div className={classes.ingredientsDiv}>
                            <TextField className={classes.textField} label="Quantity" defaultValue={quantity}
                                       onChange={(e) => setQuantity(e.target.value)}></TextField>
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
                                    <MenuItem value={'ml'}>Milliliter</MenuItem>
                                    <MenuItem value={'l'}>Liter</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField className={classes.textField} label="Ingredient" defaultValue={ingredient}
                                       onChange={(e) => setIngredient(e.target.value)}></TextField>
                        </div>
                        <div className={classes.floatingButton}>
                            <Fab size="small" color="secondary" aria-label="add" className={classes.margin}
                                 onClick={handleAddIngredient}>
                                <AddIcon/>
                            </Fab>
                        </div>
                        <TextField className={classes.textField} label="Description" multiline></TextField>
                        <TextField className={classes.textField} label="Instructions" multiline></TextField>
                        <div className={classes.floatingButton}>
                            <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}
                                    onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                </Paper>
            </Container>
        </React.Fragment>
    )
}