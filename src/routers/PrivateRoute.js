import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';

import tokenUtils from "./tokenUtils";

export const PrivateRoute = ({isAuthed: isAuthed, component: Component, ...rest}) => {
    // const isAuthenticated = useSelector((state) => state.auth.authenticated);
    // console.log('is auth ' + isAuthenticated);
    console.log('Private Route', {...rest});
    const [authed, setAuthed] = useState();

    useEffect(() => {
        isAuthed().then((result) => {
            console.log('result', result);
            setAuthed(result);
        });
        // return () => {debugger};
    }, [authed]);

    return (
        <Route
            {...rest}
            render={(props) => {
                console.log('authed', authed);
                if (authed === undefined) {
                    return null;
                } else if (authed === true) {
                    return (
                        <Component {...props} />
                    )
                } else {
                    return (
                        <Redirect to={{
                            pathname: "/join"
                        }}/>
                    )
                }
            }
            }
        />
    )
};

export default tokenUtils(PrivateRoute);