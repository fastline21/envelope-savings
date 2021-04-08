import {
	GET_ALL_ENVELOPES,
	ENVELOPES_ERROR,
	ENVELOPE_LOADING,
} from "./../actions/types";

const initialState = {
	envelopes: null,
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_ENVELOPES:
			return {
				...state,
				envelopes: action.payload,
				loading: false,
			};
		case ENVELOPE_LOADING:
			return {
				...state,
				loading: true,
			};
		case ENVELOPES_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};
