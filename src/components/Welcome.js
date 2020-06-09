import React from 'react';
import {Route} from 'react-router-dom';

import WelcomePage from "./WelcomePage/WelcomePage";
import AuthRoute from "../routers/AuthRoute";

const withAppLayout = Component => props => <WelcomePage><Component {...props} /></WelcomePage>;

export const Welcome = ({ component, ...props }) => {
    console.log('Welcome');
    return (
        <AuthRoute {...props} component={withAppLayout(component)}/>
    );
};