import * as types from '../constants/action_constants';

const initialState = {
    authenticated: false,
    token: '',
    googleTokenId: '',
    user: {},
    errors: {}
};

export default function auth(state=initialState, action) {
    switch(action.type) {
        case types.SIGN_UP_SUCCESS:
            return {...state, authenticated: true, token: action.token, user: action.user};
        case types.SIGN_IN_SUCCESS:
            return {...state, authenticated: true, token: action.token, user: action.user};
        case types.SIGN_IN_GOOGLE:
            return {...state, googleTokenId: action.googleTokenId, user: action.user};
        case types.UPDATE_USER_INFO:
            return {...state, user: action.user};
        case types.SIGN_UP_FAILURE:
        case types.SIGN_IN_FAILURE:
            return {...state, errors: action.errors};
        case types.LOG_OUT:
            return {...state, authenticated: false};
        default:
            return state;
    }
};