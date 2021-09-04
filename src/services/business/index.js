import React, {useState} from 'react';
import { _api } from '../consts';
import {_headersBase} from '../methods';
import { useCookies } from 'react-cookie';

const _apiBase = `${_api}/api/businesses`;

const getResource = async (url, params, headers, successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)
    if (params) {
        path_url.search = params;
    }

    const res = await fetch(path_url, {headers: headers});

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

const useBusinesses = () => {
    const [businesses, setBusinesses] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const getBusinesses = () => getResource('/', null, headers, setBusinesses);
   
    return [businesses, getBusinesses];
};

const useBusiness = () => {
    const [business, setBusiness] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const getBusiness = (id) => getResource(`/${id}`, null, headers, setBusiness);
   
    return [business, getBusiness];
};

const useBusinessMessages = () => {
    const [messages, setMessages] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const getMessages = (id) => getResource(`/${id}/messages`, null, headers, setMessages);
   
    return [messages, getMessages];
};

const useBusinessMessage = () => {
    const [message, setMessage] = useState(null);

    const [cookies] = useCookies(['access-token']);
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    const sendMessage = (id, text) => postResource(`/${id}/messages`, {text: text}, headers, setMessage);
   
    return [message, sendMessage];
};

const useBusinessBreakAgreement = () => {
    const [breakedAgreement, setBreakedAgreement] = useState(null);

    const [cookies] = useCookies(['access-token']);

    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };

    const breakAgreement = (id) => postResource(`/${id}/agreement/break`, null, headers, setBreakedAgreement);
   
    return [breakedAgreement, breakAgreement];
};

export {useBusinesses, useBusiness, useBusinessMessages, useBusinessMessage, useBusinessBreakAgreement};