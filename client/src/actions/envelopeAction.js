import axios from "axios";

import {
    GET_ALL_ENVELOPES,
    ENVELOPES_ERROR,
    ENVELOPE_LOADING,
    ADD_ENVELOPE,
    CURRENT_ENVELOPE,
    CLEAR_ENVELOPE_ERRORS,
    GET_ENVELOPE,
    ROLL_NUMBER,
    CLEAR_CURRENT,
    EDIT_ENVELOPE,
    DELETE_ENVELOPE
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

export const getEnvelope = (id) => async (dispatch) => {
    setLoading(dispatch);

    try {
        const res = await axios.get(`/api/envelope/${id}`);
        dispatch({
            type: GET_ENVELOPE,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: ENVELOPES_ERROR,
            payload: {
                statusCode: error.response.status,
                message: error.response.data.message
            },
        });

        clearErrors(dispatch);
    }
}

export const addEnvelope = (envelope) => async (dispatch) => {
    setLoading(dispatch);

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

export const editEnvelope = (envelope, id) => async (dispatch) => {
    setLoading(dispatch);

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.put(`/api/envelope/${id.current}`, envelope, config);
        dispatch({
            type: EDIT_ENVELOPE,
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
}

export const deleteEnvelope = (id) => async (dispatch) => {
    setLoading(dispatch);

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axios.delete(`/api/envelope/${id}`, config);
        dispatch({
            type: DELETE_ENVELOPE,
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
}

export const currentEnvelope = (id) => (dispatch) => {
    dispatch({
        type: CURRENT_ENVELOPE,
        payload: id,
    });
};

export const clearCurrent = () => (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT
    });
}

export const rollNumber = (id) => async (dispatch) => {
    setLoading(dispatch);

    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const res = await axios.patch(`/api/envelope/${id}`, config);
        dispatch({
            type: ROLL_NUMBER,
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
}

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