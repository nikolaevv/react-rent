import React, {useEffect} from 'react';

import {useCookies} from 'react-cookie';
import {withRouter, Route} from 'react-router';
import AuthPage from '../pages/auth-page';
import MainPage from '../pages/airport-main-page';
import CompanyPage from '../pages/company-page';
import ChatPage from '../pages/chat-page';
import Header from '../header';
import './app.css';

const App = ({history}) => {
	const [cookies] = useCookies(['access_token']);

	useEffect(() => {
		if (!cookies.access_token) {
            history.push('/auth')
			
		}	
	}, []);

    return (
        <div>
            <Header/>
            <Route path="/" exact component={MainPage}/>
            <Route path="/auth" exact component={AuthPage}/>
            <Route path="/messages/" exact component={ChatPage} />
			<Route path="/businesses/:id" exact component={CompanyPage} />
            <Route path="/businesses/:id/chat" exact component={ChatPage} />
        </div>
    );
};

export default withRouter(App);