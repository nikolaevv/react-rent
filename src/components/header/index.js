import React, {useEffect} from 'react';

import Logo from '../../files/images/logo.png';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Container, Button, IconButton} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './header.css';

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Link to="/">
                            <img className="logo" id="logo" alt="logo" src={Logo}/>
                        </Link>

                        <div>
                            { true && (
                                <div>
                                    <Link to="/">
                                        <Button color="inherit">Компании</Button>
                                    </Link>

                                    <Link to="/messages">
                                        <Button color="inherit">Сообщения</Button>
                                    </Link>
                                    
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
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Header;