import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import HomeRoute from './HomeRoute';
import {Welcome, JoinPage, Main, HomePage, SongPage, SearchPage, AdminPage} from '../components';

const AppRouter = () => (
    <Router>
        <Switch>
            <HomeRoute exact path='/'/>
            <Welcome path='/join' component={JoinPage}/>
            {/*<Welcome path='/about' component={}/>*/}
            {/*<Welcome path='/help' component={}/>*/}
            <Main path='/home' component={HomePage}/>
            <Main path='/songs' component={SongPage}/>
            <Main path='/search' component={SearchPage}/>
            <Route path='/admin' component={AdminPage}/>
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