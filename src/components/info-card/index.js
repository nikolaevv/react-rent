import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';

const InfoCard = ({ icon, title, text, buttonText, onClick }) => {
    return (
        <Grid container item className="info-card" xs="6" key={title} style={{paddingTop: 40, marginLeft: 10}}>
            <Grid xs="1" item style={{paddingTop: 5}}>
                {icon}
            </Grid>
            <Grid container item xs="10" direction='column' spacing={1}>
                <Grid item>
                    <Typography variant="h5" gutterBottom className="info-card-cell">{title}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" gutterBottom className="info-card-cell">{text}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" className="info-card-cell" onClick={onClick}>
                        {buttonText}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default InfoCard;