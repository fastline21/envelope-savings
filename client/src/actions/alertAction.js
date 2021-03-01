import { SET_ALERT } from './types';

// Set alert
export const setAlert = ({ type, message }) => (dispatch) => {
    dispatch({
        type: SET_ALERT,
        payload: { type, message }
    })
}