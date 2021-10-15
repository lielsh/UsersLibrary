import axios from 'axios';
import * as types from './types';

export const fetchUsers = () => async dispatch => {

    const users = [];

    await axios({
        url: process.env.REACT_APP_DATA,
        method: 'GET'
    })
        .then(res => res.data.results.map(
            (user, i) => users.push({
                id: i,
                name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                email: user.email,
                location: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.country}`,
                picture: user.picture.medium
            })
        ))
        .catch(err => console.log(err));
     
    dispatch({
        type: types.FETCH_USERS,
        payload: users
    });
}

export const loading = () => {
    return {
        type: types.LOADING
    };
}

export const updateUsers = (users) => {
    return {
        type: types.UPDATE_USERS,
        payload: users
    };
}