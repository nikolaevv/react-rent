import React from 'react';
import { Grid, Icon } from '@material-ui/core';

const InfoCard = ({ icon, title, text, onClick }) => {
    return (
        <Grid container className="info-card" xs="12">
            <Grid container item xs="3">
                {icon}
            </Grid>
            <Grid container item xs="9">
                
            </Grid>
        </Grid>
    )
}

export default InfoCard;