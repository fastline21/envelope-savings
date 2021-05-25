import {
    SET_ALERT
} from './types';

export const setAlert = ({ statusCode = 0, message = '' }) => (dispatch) => {
    dispatch({
        type: SET_ALERT,
        payload: { statusCode, message }
    });
};