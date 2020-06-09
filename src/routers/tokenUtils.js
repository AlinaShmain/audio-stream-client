import React, {useContext} from "react";
import {useStore} from "react-redux";
import {AudioCtx} from "../components/AudioProvider/AudioProvider";

const tokenUtils = (WrappedComponent) => {
    console.log('tokenUtils');
    const VerificationComponent = ({...props}) => {
        console.log('Verified Component');
        // const {token} = useSelector((state) => state.auth);
        // const token = () => store.getState().token;
        // const {getState} = useStore();
        const {socket} = useContext(AudioCtx);

        const getToken = () => localStorage.getItem("jwt-token");

        const getTokenId = () => localStorage.getItem("jwt-google-token-id");

        const isAuthed = () => {
            return new Promise((res, rej) => {
                // const token = getState().auth.token;
                const token = getToken();
                console.log('token', token);

                if (token) {
                    console.log(token);

                    socket.emit('verifyToken', {token}, (response) => {
                        console.log('response token', response);
                        res(true);
                    });
                } else {
                    // const googleTokenId = getState().auth.googleTokenId;
                    const googleTokenId = getTokenId();
                    console.log('googleTokenId', googleTokenId);

                    if(googleTokenId) {
                        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleTokenId}`)
                            .then(async r => {
                                await console.log('resp', r.text());
                                res(true);
                            })
                            .catch(e => {
                                console.log(e);
                                res(false);
                            });
                    } else {
                        console.log('resp');
                        res(false);
                    }
                }
            });
        };

        return (
            <WrappedComponent
                isAuthed={isAuthed}
                {...props}
            />
        );
    };

    return VerificationComponent;
};

export default tokenUtils;