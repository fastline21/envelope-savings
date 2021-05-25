import axios from 'axios';

import {
    USER_LOADING,
    LOGIN_USER,
    USERS_ERROR
} from './types';

export const loginUser = (user) => async (dispatch) => {
    setLoading()(dispatch);
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post("/api/auth", user, config);
        dispatch({
            type: LOGIN_USER,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: error.response.data,
        });
    }
}

const setLoading = () => (dispatch) => {
    dispatch({
        type: USER_LOADING
    });
}