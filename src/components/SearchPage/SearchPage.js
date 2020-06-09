import React, {useContext, useState} from 'react';
import {AudioCtx} from "../AudioProvider/AudioProvider";
import TrackList from "../TrackList/TrackList";
import {useSelector} from "react-redux";

const SearchPage = () => {
    const {tracks} = useSelector(state => state.player());
    const {offset_y_search, width_menu} = useSelector(state => state.ui);
    const {onTrackBtnClick} = useContext(AudioCtx);

    return (
        <React.Fragment>
            <div
                style={{marginTop: `calc(${offset_y_search})`, marginLeft: width_menu}}
                className='d-flex home-page-container w-100'>

                <TrackList tracks={tracks} onTrackBtnClick={onTrackBtnClick}/>
            </div>
        </React.Fragment>
    );
};

export default SearchPage;