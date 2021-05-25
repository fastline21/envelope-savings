import axios from 'axios';

import {
    USER_LOADING,
    LOGIN_USER,
    USERS_ERROR,
    CLEAR_USER_ERRORS,
    USER_LOADED,
    LOGOUT_USER
} from './types';

// Utils
import setAuthToken from "./../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
    setLoading(dispatch);

    try {
        setAuthToken(localStorage.token);
        const res = await axios.get("/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: {
                statusCode: error.response.status,
                message: error.response.data.message
            },
        });

        clearErrors(dispatch);
    }
}

export const loginUser = (user) => async (dispatch) => {
    setLoading(dispatch);

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
            payload: {
                statusCode: error.response.status,
                message: error.response.data.message
            },
        });

        clearErrors(dispatch);
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: LOGOUT_USER,
    });
};

const clearErrors = (dispatch) => {
    dispatch({
        type: CLEAR_USER_ERRORS
    })
}

const setLoading = (dispatch) => {
    dispatch({
        type: USER_LOADING
    });
}