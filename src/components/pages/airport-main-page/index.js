import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {Container, Button, Paper, Card, Divider, Typography, InputBase, IconButton, TextField, CardContent, AccordionSummary, Accordion} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import './airport-main-page.css';
import { withRouter } from 'react-router';

const BusinessListItem = ({title, info, onOpen}) => {
    return (
        <Paper onClick={onOpen} square className="business-list-item">
            <Typography variant="body1" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {info}
            </Typography>
        </Paper>
    );
};

const MainPage = ({history}) => {
    return (
        <Container>
            <Typography variant="h3">Компании</Typography>

            <Paper className="info-block">
                <Paper fullWidth component="form" className="search-section">
                    <InputBase className="search-bar" placeholder="Поиск"/>

                    <div>
                        <IconButton className={"iconButton"} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </div>
                </Paper>
            </Paper>

            <div className="business-list">
                <BusinessListItem title="Макдоналдс" info="Фастфуд" onOpen={() => history.push('/businesses/1')}/>
            </div>
        </Container>
    );
};

export default withRouter(MainPage);