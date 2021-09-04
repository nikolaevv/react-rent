import React from 'react';
import {Container, Button, Card, Typography, TextField, CardContent} from '@material-ui/core';

import Logo from '../../../files/images/logo.png';
import './auth-page.css';

const AuthPage = () => {
    return (
        <Container className="auth-container">
            <Card className="auth-card">
                <CardContent>
                    <img className="logo" src={Logo}/>
                    <Typography variant="h5">Вход</Typography>
                    
                    <div className="auth-form">
                        <TextField id="outlined-basic" label="Логин" variant="outlined"/>
                        <TextField id="outlined-basic" label="Пароль" variant="outlined"/>
                    </div>

                    <div className="auth-actions">
                        <Button variant="contained" color="primary" fullWidth>
                            Вход
                        </Button>

                        <Button variant="outlined" color="primary" fullWidth>
                            Регистрация
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AuthPage;