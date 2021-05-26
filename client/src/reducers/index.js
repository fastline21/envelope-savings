import { combineReducers } from 'redux';
import userReducer from './userReducer';
import alertReducer from './alertReducer';
import envelopeReducer from './envelopeReducer';

export default combineReducers({
    userState: userReducer,
    alertState: alertReducer,
    envelopeState: envelopeReducer,
});
