import React, { useEffect } from 'react';
import {Container, Button, Card, Typography, TextField, CardContent} from '@material-ui/core';

import CompanyChips from '../../company-chips';
import { useBusiness } from '../../../services/business';

const CompanyPage = ({ id }) => {
    const [ bisiness, getBusiness ] = useBusiness();

    useEffect(() => {
        getBusiness(id);
    }, [bisiness]);

    return (
        <Container className="company-container">
            <Typography variant="h1">{bisiness.title}</Typography>
            <Card className="company-card">
                <CompanyChips company={bisiness} />
                <CardContent>

                </CardContent>
            </Card>
        </Container>
    )
}

export default CompanyPage;