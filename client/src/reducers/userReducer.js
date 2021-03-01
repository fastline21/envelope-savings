import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	GET_USER,
	USER_LOADING,
	USERS_ERROR,
	CLEAR_USER_SUCCESS,
	CLEAR_USER_ERRORS
} from './../actions/types';

const initialState = {
	user: null,
	loading: false,
	error: null,
	success: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return {
				...state,
				success: true,
				loading: false,
				error: null,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
				error: null,
				success: false,
			};
		case USERS_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case CLEAR_USER_SUCCESS:
			return {
				...state,
				success: false,
			};
		case CLEAR_USER_ERRORS:
			return {
				...state,
				error: null
			}
		default:
			return state;
	}
};
