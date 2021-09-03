import React, {useState} from 'react';

const _apiBase = 'http://127.0.0.1:8000/api/businesses';

const _headersBase = {
    'Authorization': 'Bearer 12e6759c4c335b2280950928d33774e74e4dd70adab3b352215b3c4df9b898c509872788014585e1e352e9dd4efbde6e4a923db40cc20ef81c6461cf7e7683fb',
    'Content-Type': 'application/json'
};

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

const putResource = async (url, data, headers = _headersBase, successCallback = () => {}) => {
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

const postResource = async (url, data, headers = _headersBase, successCallback = () => {}) => {
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
    
    const initPayment = (id, summ) => postResource(`/${id}/payments/init`, {"summ": summ}, _headersBase, setPaymentInit);
   
    return [paymentInit, initPayment];
};

const useWithdrawPayment = () => {
    const [paymentWithdraw, setPaymentWithdraw] = useState(null);
    
    const withdrawPayment = (id, summ) => postResource(`/${id}/payments/withdraw`, {"summ": summ}, _headersBase, setPaymentWithdraw);
   
    return [paymentWithdraw, withdrawPayment];
};

const useRemindPayment = () => {
    const [paymentReminder, setPaymentReminder] = useState(null);
    
    const remindAboutPayment = (id, summ) => postResource(`/${id}/payments/remind`, {"summ": summ}, _headersBase, setPaymentReminder);
   
    return [paymentReminder, remindAboutPayment];
};

const useWalletAdress = () => {
    const [walletAdress, setWalletAdress] = useState(null);
    
    const putWalletAdress = (id, wallet_adress) => putResource(`/${id}/payments/walletAddress`, {"wallet_adress": wallet_adress}, _headersBase, setWalletAdress);
   
    return [walletAdress, putWalletAdress];
};

export {useInitPayment, useWithdrawPayment, useRemindPayment, useWalletAdress};