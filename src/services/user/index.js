import React, {useState} from 'react';
import { _api } from '../consts';
import { useCookies } from 'react-cookie';

import {_headersBase} from '../methods';

const _apiBase = `${_api}/api/user`;

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

const useUserAuth = () => {
    const [user, setUser] = useState({});

    const [cookies, setCookie] = useCookies(['access-token']);

    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const authUser = (login, password, successCallback) => postResource('/auth', {login: login, password: password}, headers,
        (result) => {
            successCallback(result);
            //setCookie('access-token', result)
            setUser(result)
        }
    );
   
    return [user, authUser];
};

const useUser = () => {
    const [user, setUser] = useState(null);

    const [cookies, setCookie] = useCookies(['access-token']);
    console.log(cookies.access_token)
    const headers = {
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    };
    
    const getUser = () => getResource('/', null, headers, setUser);
   
    return [user, getUser];
};

export {useUserAuth, useUser};