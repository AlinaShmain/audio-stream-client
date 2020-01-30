import React from 'react';
import {Route} from 'react-router-dom';

import WelcomePage from "./WelcomePage/WelcomePage";

const withAppLayout = Component => props => <WelcomePage><Component {...props} /></WelcomePage>;

export const Welcome = ({ component, ...props }) => {
    return (
        <Route {...props} component={withAppLayout(component)}/>
    );
};