import React, { useEffect } from 'react';
import {Container, Button, Card, Typography, TextField, CardContent} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';

import { useParams } from "react-router-dom";

import CompanyChips from '../../company-chips';
import Spinner from '../../spinner';
import InfoCardBlock from '../../info-card-block';
import { useBusiness } from '../../../services/business';

import './styles.css';

const CompanyPage = () => {
    const [ bisiness, getBusiness ] = useBusiness();
    let { id } = useParams();

    useEffect(() => {
        getBusiness(id);
    }, [id]);

    const data = [
        {
            icon: <PhoneIcon />,
            title: 'Связь',
            text: <span>Алё на связи<br/>До связи</span>,
            buttonText: 'Тест',
            onClick: () => {}
        },
        {
            icon: <PhoneIcon />,
            title: 'Связь',
            text:  <span>Алё на связи<br/>До связи</span>,
            buttonText: 'Тест',
            onClick: () => {}
        },
        {
            icon: <PhoneIcon />,
            title: 'Связь',
            text: <span>Алё на связи<br/>До связи</span>,
            buttonText: 'Тест',
            onClick: () => {}
        },
    ];

    return (
        bisiness ? (
            <Container className="company-container">
                <Typography variant="h3">{bisiness.title}</Typography>
                <Card className="company-card">
                    <CompanyChips company={bisiness} />
                    <CardContent>
                        <InfoCardBlock content={data} />
                    </CardContent>
                </Card>
            </Container> 
        ) : <Spinner />
    )
}

export default CompanyPage;