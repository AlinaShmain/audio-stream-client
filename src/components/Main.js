import React from 'react';
import {Route} from 'react-router-dom';

import MainPage from './MainPage/MainPage';
import PrivateRoute from "../routers/PrivateRoute";

const withAppLayout = Component => props => <MainPage><Component {...props} /></MainPage>;

export const Main = ({ component, ...props }) => {
    console.log('wrapper');
    return (
        <PrivateRoute {...props} component={withAppLayout(component)}/>
    );
};