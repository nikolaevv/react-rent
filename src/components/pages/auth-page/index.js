import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {withRouter} from 'react-router';
import {useUserAuth} from '../../../services/user';
import {Container, Button, Card, Typography, TextField, CardContent} from '@material-ui/core';

import Logo from '../../../files/images/logo.png';
import './auth-page.css';

const AuthPage = ({history}) => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const [user, authUser] = useUserAuth();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (cookies.access_token) {
            //history.push('/')
        }
        else {
            //authUser("starlei165@gmail.com", "deut10", (result) => setCookie("access_token", result.access_token))
        }
    }, [history, cookies]);

    const onLoginButtonClick = () => {
        authUser(login, password, (result) => {
            if (result.correct) {
                setCookie("access_token", result.access_token);
                history.push('/');
            }
        })
    };

    return (
        <Container className="auth-container">
            <Card className="auth-card">
                <CardContent>
                    <img className="logo" src={Logo}/>
                    <Typography variant="h5">Вход</Typography>
                    
                    <div className="auth-form">
                        <TextField onChange={(e) => setLogin(e.target.value)} id="outlined-basic" label="Логин" variant="outlined"/>
                        <TextField onChange={(e) => setPassword(e.target.value)} id="outlined-basic" label="Пароль" variant="outlined"/>
                    </div>

                    <div className="auth-actions">
                        <Button onClick={onLoginButtonClick} variant="contained" color="primary" fullWidth>
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

export default withRouter(AuthPage);