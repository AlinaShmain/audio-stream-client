import React, {useEffect, useState} from 'react';
import {Route, Redirect} from 'react-router-dom';
import tokenUtils from "./tokenUtils";

const AuthRoute = ({isAuthed: isAuthed, component: Component, ...rest}) => {
    console.log('Auth Route');
    const [authed, setAuthed] = useState();

    useEffect(() => {
        isAuthed().then((result) => {
            console.log('result', result);
            setAuthed(result);
        });
        // return () => {debugger};
    }, []);

    return (
        <Route
            {...rest}
            render={(props) => {
                console.log('authed', authed);
                if(authed === undefined) {
                    return null;
                } else if(authed === true){
                    return (
                    <Redirect
                        to={{
                            pathname: `/home`
                        }}
                    />
                ) } else { return (
                    <Component {...props}/>
                )}
            }
            }
        />
    );
};

export default tokenUtils(AuthRoute);