import axios from "axios";
import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	USER_LOADED,
	USER_LOADING,
	USERS_ERROR,
	SET_SUCCESS_USER,
	CLEAR_USER_ERRORS,
} from "./types";

// Utils
import setAuthToken from "./../utils/setAuthToken";

// User logged
export const loadUser = () => async (dispatch) => {
	setLoading(dispatch);
	setAuthToken(localStorage.token);
	try {
		const res = await axios.get("/api/auth");
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: USERS_ERROR,
			payload: error.response.data,
		});
	}
};

// Register user
export const registerUser = (user) => async (dispatch) => {
	try {
		setLoading(dispatch);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		await axios.post("/api/user", user, config);
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
	try {
		setLoading(dispatch);
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
			payload: error.response.data,
		});
	}
};

// Logout user
export const logoutUser = () => (dispatch) => {
	dispatch({
		type: LOGOUT_USER,
	});
};

// Set loading to true
export const setLoading = (dispatch) => {
	dispatch({
		type: USER_LOADING,
	});
};

// Clear errors
export const clearErrors = () => (dispatch) => {
	dispatch({
		type: CLEAR_USER_ERRORS,
	});
};

// Set register success to false
export const setSuccess = () => (dispatch) => {
	dispatch({
		type: SET_SUCCESS_USER,
	});
};
