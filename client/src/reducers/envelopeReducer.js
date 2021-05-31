import {
    GET_ALL_ENVELOPES,
    ENVELOPES_ERROR,
    ENVELOPE_LOADING,
    ADD_ENVELOPE,
    CURRENT_ENVELOPE,
    GET_ENVELOPE,
    ROLL_NUMBER,
    CLEAR_CURRENT,
    EDIT_ENVELOPE,
    DELETE_ENVELOPE
} from "./../actions/types";

const initialState = {
    envelopes: null,
    envelope: null,
    loading: false,
    error: null,
    current: null,
    roll: 0
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
        case GET_ENVELOPE:
            return {
                ...state,
                envelope: action.payload,
                loading: false
            }
        case ADD_ENVELOPE:
            return {
                ...state,
                envelopes: [...state.envelopes, action.payload],
                loading: false
            };
        case EDIT_ENVELOPE:
            return {
                ...state,
                envelopes: action.payload,
                loading: false
            }
        case DELETE_ENVELOPE:
            return {
                ...state,
                envelopes: action.payload,
                loading: false
            }
        case CURRENT_ENVELOPE:
            return {
                ...state,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
                envelope: null
            }
        case ROLL_NUMBER:
            return {
                ...state,
                envelope: action.payload.envelope,
                roll: action.payload.random,
                loading: false
            }
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
