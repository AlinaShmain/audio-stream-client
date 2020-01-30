import * as types from '../constants/action_constants';

const initialState = {
    authenticated: false,
    user: {},
    errors: {}
};

export default function (state=initialState, action) {
    switch(action.type) {
        case types.SIGN_UP_SUCCESS:
        case types.SIGN_IN_SUCCESS:
            return {...state, authenticated: true, user: action.user};
        case types.SIGN_UP_FAILURE:
        case types.SIGN_IN_FAILURE:
            return {...state, errors: action.errors};
        case types.LOG_OUT:
            return {...state, authenticated: false};
        default:
            return state;
    }
};