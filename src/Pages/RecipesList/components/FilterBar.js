import {makeStyles} from "@material-ui/core/styles";
import React, {useContext, useRef} from "react";
import {
    Button, Chip,
    Container,
    FormControl,
    Icon,
    InputBase,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select, TextField, Typography
} from "@material-ui/core";
import {AlertContext, UserContext} from "../../../context";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        margin: theme.spacing(3),
        marginBottom: theme.spacing(8),
        paddingBottom: theme.spacing(1),
        textAlign: "left",
        display: "flex"
    },
    textField: {
        width: "100%",
    },
    iconButton: {
        padding: 10,
    },
    sorting: {
        width: "40%",
        justifyContent: "center"
    },
    filterBtn: {
        textAlign: "center",
        justifyContent: "center",
        margin: theme.spacing(1),
        marginLeft: theme.spacing(3)
    },
    modalPaper: {
        position: 'absolute',
        width: "60%",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "25%",
        left: "35%",
        transform: `translate(-20%, -40%)`,
    },
    searchDiv: {
        justifyContent: "center",
        margin: theme.spacing(1),
    },
    modalDiv: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        margin: theme.spacing(1)
    },
    horizontalDiv: {
        display: "flex"
    },
    tagsDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    flex: {
        margin: theme.spacing(3)
    }
}))

export default function FilterBar({id}) {
    const classes = useStyles();
    const [sort, setSort] = React.useState('pa');
    const [difficulty, setDifficulty] = React.useState('BG');
    const [open, setOpen] = React.useState(false);
    const alertC = useRef(useContext(AlertContext));
    const [tag, setTag] = React.useState("");
    const [tags, setTags] = React.useState([]);
    const [ingredient, setIngredient] = React.useState("");
    const [ingredients, setIngredients] = React.useState([]);
    const [mealType, setMealType] = React.useState('BF');

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChangeSort = (event) => {
        setSort(event.target.value)
    }

    const handleChangeDifficulty = (event) => {
        setDifficulty(event.target.value)
    }

    const handleChangeMealType = (event) => {
        setMealType(event.target.value);
    };

    const handleTagDelete = (tagToDelete) => () => {
        setTags((tags) => tags.filter((tag) => tag.key !== tagToDelete.key));
    };

    const handleAddTag = (e) => {
        e.preventDefault()
        try {
            if (!/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\d\s.,?!-()]+$/.test(tag)) {
                throw "Wrong tag format"
            }
            if (tags.filter((e) => e.label === tag).length !== 0) {
                throw "Tag already added"
            }
            let last_element = tags[tags.length - 1]
            let key_to_add = last_element === undefined ? -1 : last_element.key
            let element = {
                key: key_to_add + 1,
                label: tag
            }
            setTags([...tags, element])
            setTag("")
        } catch (err) {
            alertC.current.showAlert(err, "error")
        }
    }

    const handleSave = (e) => {
        e.preventDefault();
    }

    const handleIngredientDelete = (ingredientToDelete) => () => {
        setIngredients((ingredients) => ingredients.filter((ingredient) => ingredient.key !== ingredientToDelete.key));
    };

    const handleAddIngredient = (e) => {
        e.preventDefault()
        try {
            if (!/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\d\s.,?!-()]+$/.test(tag)) {
                throw "Wrong ingredient format"
            }
            if (ingredients.filter((e) => e.label === ingredient).length !== 0) {
                throw "Ingredient already added"
            }
            let last_element = ingredients[ingredients.length - 1]
            let key_to_add = last_element === undefined ? -1 : last_element.key
            let element = {
                key: key_to_add + 1,
                label: ingredient
            }
            setIngredients([...ingredients, element])
            setIngredient("")
        } catch (err) {
            alertC.current.showAlert(err, "error")
        }
    }

    const body = (
        <div className={classes.modalPaper}>
            <div className={classes.flex}>
                <div className={classes.modalDiv}>
                    <Typography variant="h6" className={classes.title}>
                        DIFFICULTY
                    </Typography>
                    <FormControl className={classes.textField}>
                        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={difficulty}
                            onChange={handleChangeDifficulty}
                        >
                            <MenuItem value={''}>All</MenuItem>
                            <MenuItem value={'BG'}>Beginner</MenuItem>
                            <MenuItem value={'IT'}>Intermediate</MenuItem>
                            <MenuItem value={'AD'}>Advanced</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.modalDiv}>
                    <Typography variant="h6" className={classes.title}>
                        TAGS
                    </Typography>
                    <div className={classes.horizontalDiv}>
                        <TextField className={classes.textField} label="Tag" value={tag}
                                   onChange={(e) => setTag(e.target.value)}></TextField>
                        <div className={classes.floatingButton}>
                            <Fab size="small" color="secondary" aria-label="add" className={classes.margin}
                                 onClick={handleAddTag}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                    <div className={classes.tagsDiv}>
                        {tags.map((data) => {
                            let icon;

                            return (
                                <li key={data.key}>
                                    <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={handleTagDelete(data)}
                                        className={classes.tag}
                                    />
                                </li>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.modalDiv}>
                    <Typography variant="h6" className={classes.title}>
                        INGREDIENTS
                    </Typography>
                    <div className={classes.horizontalDiv}>
                        <TextField className={classes.textField} label="Ingredient" value={ingredient}
                                   onChange={(e) => setIngredient(e.target.value)}></TextField>
                        <div className={classes.floatingButton}>
                            <Fab size="small" color="secondary" aria-label="add" className={classes.margin}
                                 onClick={handleAddIngredient}>
                                <AddIcon/>
                            </Fab>
                        </div>
                    </div>
                    <div className={classes.tagsDiv}>
                        {ingredients.map((data) => {
                            let icon;

                            return (
                                <li key={data.key}>
                                    <Chip
                                        icon={icon}
                                        label={data.label}
                                        onDelete={handleIngredientDelete(data)}
                                        className={classes.tag}
                                    />
                                </li>
                            );
                        })}
                    </div>
                </div>
                <div className={classes.modalDiv}>
                    <Typography variant="h6" className={classes.title}>
                        TYPE
                    </Typography>
                    <FormControl className={classes.textField}>
                        <InputLabel id="demo-simple-select-label">Meal type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mealType}
                            onChange={handleChangeMealType}
                        >
                            <MenuItem value={''}>All</MenuItem>
                            <MenuItem value={'BF'}>Breakfast</MenuItem>
                            <MenuItem value={'LU'}>Lunch</MenuItem>
                            <MenuItem value={'DN'}>Dinner</MenuItem>
                            <MenuItem value={'SP'}>Supper</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className={classes.filterBtn}>
                <Button variant="contained" color="primary" endIcon={<Icon>save</Icon>}
                        onClick={handleSave}>Save</Button>
            </div>
        </div>
    );

    return (
        <div>
            <Paper>
                <div className={classes.mainDiv}>
                    <div className={classes.searchDiv}>
                        <InputBase
                            placeholder="Search"
                            inputProps={{'aria-label': 'search google maps'}}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon/>
                        </IconButton>
                    </div>

                    <FormControl className={classes.sorting}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            onChange={handleChangeSort}
                        >
                            <MenuItem value={'pa'}>Popularity <ArrowDropDownIcon/> </MenuItem>
                            <MenuItem value={'pd'}>Popularity <ArrowDropUpIcon/> </MenuItem>
                            <MenuItem value={'ra'}>Ranking <ArrowDropDownIcon/></MenuItem>
                            <MenuItem value={'rd'}>Ranking <ArrowDropUpIcon/></MenuItem>
                            <MenuItem value={'na'}>Name <ArrowDropDownIcon/></MenuItem>
                            <MenuItem value={'nd'}>Name <ArrowDropUpIcon/></MenuItem>
                            <MenuItem value={'ta'}>Time <ArrowDropDownIcon/> </MenuItem>
                            <MenuItem value={'td'}>Time <ArrowDropUpIcon/></MenuItem>
                        </Select>
                    </FormControl>
                    <div className={classes.filterBtn}>
                        <Button variant="contained" color="primary" endIcon={<Icon>check</Icon>}
                                onClick={handleOpen}>Filter</Button>
                    </div>
                </div>

            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>

    )
}