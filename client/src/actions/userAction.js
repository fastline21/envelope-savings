import axios from 'axios';
import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	GET_USER,
	USER_LOADING,
	USERS_ERROR,
	SET_USER_SUCCESS,
} from './types';

// Register user
export const registerUser = (user) => async (dispatch) => {
	setLoading()(dispatch);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.post('/api/user', user, config);
		dispatch({
			type: REGISTER_USER,
		});
	} catch (error) {
		dispatch({
			type: USERS_ERROR,
			payload: error.response.data,
		});
	}
};

// Login user
export const loginUser = (user) => async (dispatch) => {
	setLoading()(dispatch);
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/auth', user, config);
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
};

// Set loading to true
export const setLoading = () => (dispatch) => {
	dispatch({
		type: USER_LOADING,
	});
};

// Set success to false
export const setSuccess = () => (dispatch) => {
	dispatch({
		type: SET_USER_SUCCESS,
	});
};
