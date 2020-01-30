import React from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";

import AuthRoute from './AuthRoute';
import {Welcome, JoinPage, Main, HomePage, SongPage} from '../components';

const AppRouter = () => (
    <Router>
        <Switch>
            <AuthRoute exact path='/'/>
            <Welcome path='/join' component={JoinPage}/>
            {/*<Welcome path='/about' component={}/>*/}
            {/*<Welcome path='/help' component={}/>*/}
            <Main path='/home' component={HomePage}/>
            <Main path='/songs' component={SongPage}/>
            {/*<PrivateRoute path='/home' component={}/>*/}
            {/*<PrivateRoute path='/{user-id}' component={UserPage}/>*/}
            {/*<PrivateRoute path='/songs' component={}/>*/}
            {/*<PrivateRoute path='/songs/{song-id}' component={}/>*/}
            {/*<PrivateRoute path='/albums' component={}/>*/}
            {/*<PrivateRoute path='/albums/{album-id}' component={}/>*/}
            {/*<PrivateRoute path='/playlists' component={}/>*/}
            {/*<PrivateRoute path='/playlists/{playlist-id}' component={}/>*/}
            {/*<PrivateRoute path='/artists' component={}/>*/}
            {/*<PrivateRoute path='/artists/{artist-id}' component={}/>*/}
            {/*<PrivateRoute path='/artists/{artist-id}' component={}/>*/}
        </Switch>
    </Router>
);

export default AppRouter;