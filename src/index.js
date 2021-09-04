import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import {theme} from './config';
import {ThemeProvider} from '@material-ui/core/styles';
import ScrollToTop from './components/scroll-to-top';
import {CookiesProvider} from 'react-cookie';
import App from './components/app';

const MainApp = () => {
    return (
        <Provider store={store}>
            <CookiesProvider>
                <ErrorBoundry>
                    <ThemeProvider theme={theme}>
                        <Router>
                            <ScrollToTop>
                                <Switch>
                                    <App/>
                                </Switch>
                            </ScrollToTop>
                        </Router>
                    </ThemeProvider>
                </ErrorBoundry>
            </CookiesProvider>
        </Provider>   
    );
};

ReactDOM.render(<MainApp/>, document.getElementById('root'));