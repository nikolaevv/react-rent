import React, {useEffect} from 'react';
import {useUserAuth} from '../../services/user';
import {useInitPayment, useWithdrawPayment, useRemindPayment, useWalletAdress} from '../../services/payments';
import {useBusinesses, useBusiness, useBusinessMessages, useBusinessMessage, useBusinessBreakAgreement} from '../../services/business';
import {useCookies} from 'react-cookie';
import {withRouter, Route} from 'react-router';
import AuthPage from '../pages/auth-page';
import './app.css';

const App = ({history}) => {
	const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
	const [user, authUser] = useUserAuth();
	const [businesses, setBusinesses] = useBusinesses();
	const [business, setBusiness] = useBusiness();
	const [messages, setMessages] = useBusinessMessages();
	const [message, sendMessage] = useBusinessMessage();
	const [breakedAgreement, breakAgreement] = useBusinessBreakAgreement();
	const [paymentInit, initPayment] = useInitPayment();
	const [paymentWithdraw, setPaymentWithdraw] = useWithdrawPayment();
	const [paymentReminder, remindAboutPayment] = useRemindPayment();
	const [walletAdress, putWalletAdress] = useWalletAdress();
	
	useEffect(() => {
		if (!businesses) {
			setBusinesses();
		}

		//putWalletAdress(1, 'ekkpower0qq48jv994j9a')

		remindAboutPayment(1);

		//setPaymentWithdraw(1, 1000);
		//initPayment(1, 1000);

		//sendMessage(1, 'test');

		//breakAgreement(1);

		console.log(businesses);

		if (!messages) {
			setMessages(1);
		}

		console.log(messages);

		if (!business) {
			setBusiness(1);
		}

		console.log(business);

		if (!cookies.access_token) {
            history.push('/auth')
			//authUser("starlei165@gmail.com", "deut10", (result) => setCookie("access_token", result.access_token));
		}
		
	}, [cookies, businesses, business, messages]);

    return (
        <div>
            <Route path="/auth" exact component={AuthPage}/>
        </div>
    );
};

export default withRouter(App);