import {
	USER_LOADING,
	LOGIN_USER,
	USERS_ERROR
} from './../actions/types';

const initialState = {
	user: null,
	loading: false,
	error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			}
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
		default:
			return state;
	}
};