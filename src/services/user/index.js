import React, {useState} from 'react';

const _apiBase = 'http://127.0.0.1:8000/api/user';
const _headersBase = {
    'Authorization': 'Bearer 7081670255d77a583b259110d5b938731d28aa27fe8865ee16405b14dc1baa6018f6fbc615baa6f7b03be9eec8c5588a6a97973569b373af0ee03580c1b72460',
    'Content-Type': 'application/json'
};

const getResource = async (url, params, successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)
    path_url.search = params;

    const res = await fetch(path_url);

    if (!res.ok) {
        throw new Error("Could not fetch");
    }

    const body = await res.json();
    await successCallback(body);
    return body;
};

const postResource = async (url, data, successCallback = () => {}) => {
    let path_url = new URL(`${_apiBase}${url}`)

    const res = await fetch(path_url, {
        headers: _headersBase, 
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
    
    const authUser = (login, password, successCallback) => postResource('/auth', {login: login, password: password}, 
        (result) => {
            successCallback(result);
            setUser(result)
        }
    );
   
    return [user, authUser];
};

export {useUserAuth};