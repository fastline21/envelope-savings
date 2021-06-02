import axios from 'axios';

import {
    USER_LOADING,
    LOGIN_USER,
    USERS_ERROR,
    CLEAR_USER_ERRORS,
    USER_LOADED,
    LOGOUT_USER,
    REGISTER_USER,
    CLEAR_USER_SUCCESS,
    VERIFY_USER
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
        loadUser()(dispatch);
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

export const registerUser = (user) => async (dispatch) => {
    setLoading(dispatch);

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.post("/api/user", user, config);
        dispatch({
            type: REGISTER_USER,
            payload: res.data,
        });

        clearSuccess(dispatch);
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

export const verifyUser = (token) => async (dispatch) => {
    setLoading(dispatch);

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios.put(`${process.env.REACT_APP_VERIFY_API}/${token}`, config);
        dispatch({
            type: VERIFY_USER
        });

        loadUser()(dispatch);
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

const clearSuccess = (dispatch) => {
    dispatch({
        type: CLEAR_USER_SUCCESS
    });
}