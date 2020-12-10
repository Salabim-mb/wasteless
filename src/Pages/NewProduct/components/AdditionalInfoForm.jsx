import React from "react";
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import {Grid, TextField} from "@material-ui/core";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

const AdditionalInfoForm = ({data, setData}) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="quantity"
                    variant="outlined"
                    required
                    fullWidth
                    type="number"
                    id="quantity"
                    label="Quantity"
                    autoFocus
                    value={data.quantity}
                    onChange={e => setData({...data, quantity: e.target.value})}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        fullWidth
                        variant="contained"
                        id="date-picker-dialog"
                        label="Expires at"
                        format="dd.MM.yyyy"
                        value={new Date(data.expiration_date)}
                        onChange={(e) => setData({...data, expiration_date: e.toISOString()})}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
        </Grid>
    )
};

export default AdditionalInfoForm;