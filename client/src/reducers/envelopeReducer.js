import {
    GET_ALL_ENVELOPES,
    ENVELOPES_ERROR,
    ENVELOPE_LOADING,
    ADD_ENVELOPE,
    CURRENT_ENVELOPE,
} from "./../actions/types";

const initialState = {
    envelopes: null,
    loading: false,
    error: null,
    current: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ENVELOPES:
            return {
                ...state,
                envelopes: action.payload,
                loading: false,
            };
        case ADD_ENVELOPE:
            return {
                ...state,
                envelopes: [...state.envelopes, action.payload],
            };
        case CURRENT_ENVELOPE:
            return {
                ...state,
                current: action.payload,
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