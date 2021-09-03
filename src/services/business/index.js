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

const postResourceMultipart = async (url, data, headers = _headersBase, successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)

    const formData  = new FormData();

    for(const name in data) {
        if (data[name]) {
            formData.append(name, data[name]);
        }
        
    }

    const res = await fetch(path_url, {
        headers: headers, 
        method: 'POST', 
        body: formData
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
    const headers = _headersBase;
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