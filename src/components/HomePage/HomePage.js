import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from "react-redux";

import TrackList from '../TrackList/TrackList';
import './HomePage.css';
import {AudioCtx} from "../AudioProvider/AudioProvider";

const HomePage = ({location}) => {

    const {offset_y_search, width_menu} = useSelector(state => state.ui);
    const {socket} = useContext(AudioCtx);
    const [tracks, setTracks] = useState([]);

    // const {onTrackBtnClick, onStopBtnClick} = useContext(AudioCtx);
    // const {isStarted, isPlaying} = useSelector(state => state.player);

    // const handler = useCallback(() => {
    //     console.log('handler');
    // }, [props.location]);

    useEffect(() => {
        console.log('location kjj', location);
        // handler();

        try {
            console.log('SOCKET NOT NULL');

            socket.emit('getTracks', {pathname: location.pathname}, (response) => {
                console.log('tracks', response);
                setTracks([...response]);
                console.log(tracks);
            });
        } catch (e) {

        }

    }, [location]);

    return (
      <React.Fragment>
          <div
              style={{marginTop: `calc(${offset_y_search})`, marginLeft: width_menu}}
              className='d-flex home-page-container w-100'>

              <TrackList tracks={tracks}/>
          </div>
      </React.Fragment>
    );
};

export default HomePage;