const _headersBase = () => {
    const cookies = cookiesObject.getAll();

    return ({
        'Authorization': `Bearer ${cookies.access_token}`,
        'Content-Type': 'application/json'
    })
};

export {_headersBase};