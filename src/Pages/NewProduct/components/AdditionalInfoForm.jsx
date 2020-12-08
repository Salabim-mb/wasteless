import React from "react";
import {Grid, TextField} from "@material-ui/core";

const AdditionalInfoForm = ({data, setData}) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="quantity"
                    variant="outlined"
                    required
                    fullWidth
                    id="quantity"
                    label="Quantity"
                    autoFocus
                    value={data.quantity}
                    onChange={e => setData({...data, quantity: e.target.value})}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                {/*change to datepicker!!!!*/}
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="expiration_date"
                    label="Expires at"
                    autoComplete="expiration_date"
                    value={data.expiration_date}
                    onChange={e => setData({...data, expiration_date: e.target.value})}
                />
            </Grid>
        </Grid>
    )
};

export default AdditionalInfoForm;