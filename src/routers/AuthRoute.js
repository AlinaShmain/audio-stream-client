import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

const AuthRoute = ({...rest}) => {
    const isAuthenticated = useSelector((state) => state.auth.authenticated);
    console.log('is auth ' + isAuthenticated);

    return (
        <Route
            {...rest}
            render={(props) => (
                isAuthenticated ? (
                    <Redirect
                        to={{
                            pathname: `/home`
                        }}
                    />
                ) : (
                    <Redirect to={{pathname: '/join'}}/>
                )
            )}
        />
    );
};

export default AuthRoute;