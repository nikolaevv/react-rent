import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {addBusinesses} from '../../../actions';
import {Container, Button, Paper, Card, Divider, Typography, InputBase, IconButton, TextField, CardContent, AccordionSummary, Accordion} from '@material-ui/core';
import {useBusinesses, useBusiness, useBusinessMessages, useBusinessMessage, useBusinessBreakAgreement} from '../../../services/business';
import SearchIcon from '@material-ui/icons/Search';
import Spinner from '../../spinner';

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
    const [businesses, setBusinesses] = useBusinesses();

    let allBusinesses = useSelector((state) => state.businesses);
    
    const dispatch = useDispatch();

    useEffect(() => {
        let canceled = false;
        if (!allBusinesses || allBusinesses.length === 0) {
            setBusinesses();
            console.log(businesses)
            !canceled & dispatch(addBusinesses(businesses));
        }
        return () => canceled = true;
    }, [businesses]);

    if (!allBusinesses) {
        return <Spinner/>
    }

    return (
        <Container className="main-page-container">
            <Typography variant="h3">Компании</Typography>

            <Paper className="info-block">
                <Paper component="form" className="search-section">
                    <InputBase className="search-bar" placeholder="Поиск"/>

                    <div>
                        <IconButton className={"iconButton"} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </div>
                </Paper>
            </Paper>

            <div className="business-list">
                {
                    allBusinesses.map((business) => {
                        const {id, title, square, debt} = business;
                        const info = `${square} м² • ${debt ? 'Задолженность' : 'Оплачено'}`
                        return <BusinessListItem key={id} title={title} info={info} onOpen={() => history.push(`/businesses/${id}`)}/>
                    })
                }
            </div>
        </Container>
    );
};

export default withRouter(MainPage);