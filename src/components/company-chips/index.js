import React from 'react';
import { Chip, Grid } from '@material-ui/core';
import './style.css';

const CompanyChips = ({ company }) => {
    return (
        <Grid container spacing={2} className='chips-container'>
            <Grid item>
                <Chip label={`Терминал ${company.terminal}`} variant="outlined" />
            </Grid>
            <Grid item>
                <Chip label={`${company.square} М`} variant="outlined" />
            </Grid>
            <Grid item>
                <Chip label={`${company.stage}-ый этаж`} variant="outlined" />
            </Grid>
        </Grid>
    )
}

export default CompanyChips;