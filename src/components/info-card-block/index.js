import React from 'react';
import { Grid } from '@material-ui/core';
import InfoCard from '../info-card';

const InfoCardBlock = ({ content }) => {
    return (
        <Grid container spacing={4} direction='column'>
            {content.map((data) => (
                <InfoCard {...data} />
            ))}
        </Grid>
    )
}

export default InfoCardBlock;