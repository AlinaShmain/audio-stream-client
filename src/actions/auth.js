import axios from 'axios';

import * as types from '../constants/action_constants';

export function signIn(userCredentials) {
    return dispatch => {
        // axios.post('localhost:5000/signin', userCredentials)
        //     .then(({user}) => {
                dispatch({type: types.SIGN_IN_SUCCESS, userCredentials});
            // })
            // .catch((error) => {
            //     dispatch({type: types.SIGN_IN_FAILURE, errors: error});
            // });
    }
}

export function signUp(userCredentials) {
    return dispatch => {
        // axios.post('localhost:5000/signup', userCredentials)
        //     .then(({user}) => {
        dispatch({type: types.SIGN_UP_SUCCESS, userCredentials});
        // })
        // .catch((error) => {
        //     dispatch({type: types.SIGN_UP_FAILURE, errors: error});
        // });
    }
}