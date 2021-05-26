import axios from "axios";

import {
    GET_ALL_ENVELOPES,
    ENVELOPES_ERROR,
    ENVELOPE_LOADING,
    ADD_ENVELOPE,
    CURRENT_ENVELOPE,
    CLEAR_ENVELOPE_ERRORS
} from "./types";

export const getAllEnvelopes = () => async (dispatch) => {
    setLoading(dispatch);

    try {
        const res = await axios.get("/api/envelope");
        dispatch({
            type: GET_ALL_ENVELOPES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: ENVELOPES_ERROR,
            payload: {
                statusCode: error.response.status,
                message: error.response.data.message
            },
        });

        clearErrors(dispatch);
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
            payload: {
                statusCode: error.response.status,
                message: error.response.data.message
            },
        });

        clearErrors(dispatch);
    }
};

export const currentEnvelope = (id) => (dispatch) => {
    dispatch({
        type: CURRENT_ENVELOPE,
        payload: id,
    });
};

const clearErrors = (dispatch) => {
    dispatch({
        type: CLEAR_ENVELOPE_ERRORS
    })
}

const setLoading = (dispatch) => {
    dispatch({
        type: ENVELOPE_LOADING
    });
}