import React from 'react';
import {render} from 'react-dom';
import {Provider} from "react-redux";

import store from './store';
import AppRouter from "./routers/routes";

import './fonts/CyberspaceRacewayFront-lWGD.ttf';
import './index.css';
// import './fonts/fonts.css';
import AudioProvider from './components/AudioProvider/AudioProvider';


render(
    <Provider store={store}>
        <AudioProvider>
            <AppRouter/>
        </AudioProvider>
    </Provider>
    , document.querySelector('#root'));
