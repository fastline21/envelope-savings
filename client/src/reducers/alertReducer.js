import { SET_ALERT } from "./../actions/types";

const initialState = {
	type: null,
	message: null,
	isModal: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				type: action.payload.type,
				message: action.payload.message,
				isModal: action.payload.isModal,
			};
		default:
			return state;
	}
};
