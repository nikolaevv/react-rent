import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import {ApiServiceProvider} from './components/api-service-context';
import ScrollToTop from './components/scroll-to-top';
import ApiService from './services/api-service';
import App from './components/app';

const apiService = new ApiService();

const MainApp = () => {
    return (
        <Provider store={store}>
            <ErrorBoundry>
                <ApiServiceProvider value={apiService}>
                    <Router>
                        <ScrollToTop>
                            <Switch>
                                <App/>
                            </Switch>
                        </ScrollToTop>
                    </Router>
                </ApiServiceProvider>
            </ErrorBoundry>
        </Provider>   
    );
};

ReactDOM.render(<MainApp/>, document.getElementById('root'));