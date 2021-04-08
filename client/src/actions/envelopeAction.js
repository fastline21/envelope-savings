import axios from "axios";

import { GET_ALL_ENVELOPES, ENVELOPES_ERROR, ENVELOPE_LOADING } from "./types";

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

// Set loading to true
export const setLoading = (dispatch) => {
	dispatch({
		type: ENVELOPE_LOADING,
	});
};
