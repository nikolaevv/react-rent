import React, {useState} from 'react';
import { _api } from '../consts';
import {_headersBase} from '../methods';

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

const useBusinesses = () => {
    const [businesses, setBusinesses] = useState(null);
    
    const getBusinesses = () => getResource('/', null, setBusinesses);
   
    return [businesses, getBusinesses];
};

const useBusiness = () => {
    const [business, setBusiness] = useState(null);
    
    const getBusiness = (id) => getResource(`/${id}`, null, setBusiness);
   
    return [business, getBusiness];
};

const useBusinessMessages = () => {
    const [messages, setMessages] = useState(null);
    
    const getMessages = (id) => getResource(`/${id}/messages`, null, setMessages);
   
    return [messages, getMessages];
};

const useBusinessMessage = () => {
    const [message, setMessage] = useState(null);
    const headers = _headersBase();
    headers["Content-Type"] = undefined;

    const sendMessage = (id, text, file) => postResourceMultipart(`/${id}/messages`, {text: text, body: {}, file: file}, headers, setMessage);
   
    return [message, sendMessage];
};

const useBusinessBreakAgreement = () => {
    const [breakedAgreement, setBreakedAgreement] = useState(null);
    const breakAgreement = (id) => postResource(`/${id}/agreement/break`, null, setBreakedAgreement);
   
    return [breakedAgreement, breakAgreement];
};

export {useBusinesses, useBusiness, useBusinessMessages, useBusinessMessage, useBusinessBreakAgreement};