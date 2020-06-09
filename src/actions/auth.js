import * as types from '../constants/action_constants';

export const onSuccessSignIn = (token, user) => ({
    type: types.SIGN_IN_SUCCESS,
    token,
    user
});

export const onUpdateInfo = (user) => ({
    type: types.UPDATE_USER_INFO,
    user
});

export const onGoogleSignIn = (googleTokenId, user) => {
    console.log('userCredentials', user);
    return ({
        type: types.SIGN_IN_GOOGLE,
        googleTokenId,
        user
    })
};

export const onSuccessSignUp = (token, user) => ({
    type: types.SIGN_UP_SUCCESS,
    token,
    user
});
//
// export function signUp(userCredentials) {
//     return dispatch => {
//         // axios.post('localhost:5000/signup', userCredentials)
//         //     .then(({user}) => {
//         dispatch({type: types.SIGN_UP_SUCCESS, userCredentials});
//         // })
//         // .catch((error) => {
//         //     dispatch({type: types.SIGN_UP_FAILURE, errors: error});
//         // });
//     }
// }