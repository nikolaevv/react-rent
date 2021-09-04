import React, {useState} from 'react';
import {_api} from '../consts';
import {_headersBase} from '../methods';
import { useCookies } from 'react-cookie';

const _apiBase = `${_api}/api/businesses`;

const getResource = async (url, params, successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)
    if (params) {
        path_url.search = params;
    }

    const res = await fetch(path_url, {headers: _headersBase});

    if (!res.ok) {
        throw new Error("Could not fetch");
    }

    const body = await res.json();
    await successCallback(body);
    return body;
};

const putResource = async (url, data, headers = _headersBase(), successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)

    const res = await fetch(path_url, {
        headers: headers, 
        method: 'PUT', 
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Could not fetch");
    }

    const body = await res.json();
    await console.log(body);
    await successCallback(body);
    return body;
};

const postResource = async (url, data, headers = _headersBase(), successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)

    const res = await fetch(path_url, {
        headers: headers, 
        method: 'POST', 
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Could not fetch");
    }

    const body = await res.json();
    await console.log(body);
    await successCallback(body);
    return body;
};

const useInitPayment = () => {
    const [paymentInit, setPaymentInit] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const initPayment = (id, summ) => postResource(`/${id}/payments/init`, {"summ": summ}, headers, setPaymentInit);
   
    return [paymentInit, initPayment];
};

const useWithdrawPayment = () => {
    const [paymentWithdraw, setPaymentWithdraw] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const withdrawPayment = (id, summ) => postResource(`/${id}/payments/withdraw`, {"summ": summ}, headers, setPaymentWithdraw);
   
    return [paymentWithdraw, withdrawPayment];
};

const useRemindPayment = () => {
    const [paymentReminder, setPaymentReminder] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const remindAboutPayment = (id, summ) => postResource(`/${id}/payments/remind`, {"summ": summ}, headers, setPaymentReminder);
   
    return [paymentReminder, remindAboutPayment];
};

const useWalletAdress = () => {
    const [walletAdress, setWalletAdress] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const putWalletAdress = (id, wallet_adress) => putResource(`/${id}/payments/walletAddress`, {"wallet_adress": wallet_adress}, headers, setWalletAdress);
   
    return [walletAdress, putWalletAdress];
};

export {useInitPayment, useWithdrawPayment, useRemindPayment, useWalletAdress};