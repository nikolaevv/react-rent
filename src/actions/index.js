const addBusinesses = (businesses) => {
    return {
        type: 'ADD_BUSINESSES',
        payload: businesses
    }
};

const setCurrentBusiness = (currentBusiness) => {
    return {
        type: 'SET_CURRENT_BUSINESS',
        payload: currentBusiness
    }
};

const addMessages = (messages) => {
    return {
        type: 'ADD_MESSAGES',
        payload: messages
    }
};

export {
    addBusinesses,
    setCurrentBusiness,
    addMessages
};