import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	USER_LOADED,
	USER_LOADING,
	USERS_ERROR,
	SET_SUCCESS_USER,
	CLEAR_USER_ERRORS,
} from "./../actions/types";

const initialState = {
	user: null,
	loading: false,
	error: null,
	isAuthenticated: false,
	success: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				user: action.payload,
				loading: false,
				isAuthenticated: true,
			};
		case REGISTER_USER:
			return {
				...state,
				loading: false,
				success: true,
			};
		case LOGIN_USER:
			localStorage.setItem("token", action.payload.token);
			return state;
		case LOGOUT_USER:
			localStorage.removeItem("token");
			return {
				...state,
				loading: false,
				user: null,
				error: null,
				isAuthenticated: false,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		case USERS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case CLEAR_USER_ERRORS:
			return {
				...state,
				error: null,
			};
		case SET_SUCCESS_USER:
			return {
				...state,
				success: false,
			};
		default:
			return state;
	}
};
