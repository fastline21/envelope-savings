import {
    SET_ALERT
} from './../actions/types';

const initialState = {
    statusCode: 0,
    message: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                statusCode: action.payload.statusCode,
                message: action.payload.message
            }
        default:
            return state;
    }
}