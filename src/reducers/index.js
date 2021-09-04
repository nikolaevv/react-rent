const initialState = {
    businesses: [],
    currentBusiness: null,
    currentUser: null,
    messages: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGES':
            return {
                ...state,
                messages: action.payload
            }

        case 'ADD_BUSINESSES':
            return {
                ...state,
                businesses: action.payload
            }

        case 'SET_CURRENT_BUSINESS':
            return {
                ...state,
                currentBusiness: action.payload
            }

        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }

        default:
            return state;
    }
};

export default reducer;