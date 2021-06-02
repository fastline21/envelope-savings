import {
    USER_LOADING,
    LOGIN_USER,
    USERS_ERROR,
    CLEAR_USER_ERRORS,
    USER_LOADED,
    LOGOUT_USER,
    REGISTER_USER,
    CLEAR_USER_SUCCESS
} from './../actions/types';

const initialState = {
    user: null,
    success: null,
    loading: false,
    error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case LOGIN_USER:
            localStorage.setItem("token", action.payload.token);
            return state;
        case REGISTER_USER:
            return {
                ...state,
                success: action.payload,
                loading: false
            }
        case LOGOUT_USER:
            localStorage.removeItem("token");
            return {
                ...state,
                loading: false,
                user: null,
                error: null,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }
        case USERS_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CLEAR_USER_ERRORS:
            return {
                ...state,
                error: null
            }
        case CLEAR_USER_SUCCESS:
            return {
                ...state,
                success: null
            }
        default:
            return state;
    }
};