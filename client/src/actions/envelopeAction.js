import axios from "axios";

import {
	GET_ALL_ENVELOPES,
	ENVELOPES_ERROR,
	ENVELOPE_LOADING,
	ADD_ENVELOPE,
	SELECTED_ENVELOPE,
} from "./types";

export const getAllEnvelopes = () => async (dispatch) => {
	try {
		setLoading(dispatch);
		const res = await axios.get("/api/envelope");
		dispatch({
			type: GET_ALL_ENVELOPES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: ENVELOPES_ERROR,
			payload: error.response.data,
		});
	}
};

export const addEnvelope = (envelope) => async (dispatch) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		const res = await axios.post("/api/envelope", envelope, config);
		dispatch({
			type: ADD_ENVELOPE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: ENVELOPES_ERROR,
			payload: error.response.data,
		});
	}
};

export const selectedEnvelope = (id) => (dispatch) => {
	dispatch({
		type: SELECTED_ENVELOPE,
		payload: id,
	});
};

// Set loading to true
export const setLoading = (dispatch) => {
	dispatch({
		type: ENVELOPE_LOADING,
	});
};
