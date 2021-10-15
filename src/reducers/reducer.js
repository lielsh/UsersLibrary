import * as types from '../actions/types';

const initialState = {
    users: {},
    loading: true
}

const reducer = (state = initialState, action) => {

    const newState = {...state}

    switch (action.type) {

        case types.FETCH_USERS:
            newState.users = action.payload
            newState.loading = false
            break;

        case types.LOADING:
                newState.loading = true
                break;
        
        case types.UPDATE_USERS:
            newState.users = action.payload
            newState.loading = false
            break;  

        default:
           break;
    }

    return newState;
}

export default reducer;