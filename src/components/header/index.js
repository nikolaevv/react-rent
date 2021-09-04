import React, {useEffect} from 'react';

import Logo from '../../files/images/logo.png';
import {useUser} from '../../services/user';

import {useDispatch, useSelector} from 'react-redux';
import useStyles from './styles';
import {setCurrentUser} from '../../actions';

import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Container, Button, IconButton} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './header.css';

const Header = () => {
    const [user, setUser] = useUser();

    const classes = useStyles();
    let currentUser = useSelector((state) => state.businesses);
    const dispatch = useDispatch();

    useEffect(() => {
        let canceled = false;

        setUser();
        !canceled & dispatch(setCurrentUser(user));

        return () => canceled = true;
    }, []);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Link to="/">
                            <img className="logo" id="logo" alt="logo" src={Logo}/>
                        </Link>

                        <div>
                            { user && user.role === 'AIRPORT' && (
                                <div>
                                    <Link to="/">
                                        <Button color="inherit">Компании</Button>
                                    </Link>

                                    <a href="http://127.0.0.1:8000/docs">
                                        <Button color="inherit">API</Button>
                                    </a>
                                    
                                    <Link to="/documents">
                                        <Button color="inherit">Документы</Button>
                                    </Link>
                                    
                                    <Link to="/settings">
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    </Link>
                                </div>
                                )
                            }

                            { user && user.role === 'BUSINESS' && (
                                <div>
                                    <Link to="/">
                                        <Button color="inherit">Главная</Button>
                                    </Link>

                                    <Link to={`/businesses/${user.business_id}/chat`}>
                                        <Button color="inherit">Чат</Button>
                                    </Link>
                                </div>
                                )
                            }
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;