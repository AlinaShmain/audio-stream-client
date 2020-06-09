import React, {useContext, useRef} from 'react';

import './TrackList.css';
import {AudioCtx} from "../AudioProvider/AudioProvider";
import {useSelector} from "react-redux";

const TrackList = ({tracks}) => {
    const {onTrackBtnClick, onStopBtnClick, onPlayBtnClick} = useContext(AudioCtx);
    const {isStarted, isPlaying} = useSelector(state => state.player);

    const elemCurr = useRef(null);

    const onTrackPress = (e) => {
        const elemNew = e.target.parentElement;

        if(isStarted) {
            if(elemCurr.current !== elemNew) {
                elemCurr.current = elemNew;
                onTrackBtnClick(elemNew);
            } else isPlaying ? onStopBtnClick() : onPlayBtnClick();
        } else {
            console.log('not started yet');
            elemCurr.current = elemNew;

            onTrackBtnClick(elemNew);
        }
    };

    return (
        <table className='tracks-tbl m-4 w-100'>
            <thead>
            <tr className='table-header'>
                <th width='30%'>Title</th>
                <th width='30%'>Artist</th>
                <th width='30%'>Album</th>
            </tr>
            </thead>
            <tbody className='table-body'>
            {tracks ?
                tracks.map(({id, title, address, artist, album}, idx) => (
                    <tr key={idx} className='table-row' data-id={id}
                        // onClick={onTrackBtnClick}
                        onClick={onTrackPress}
                    >
                        <td id='title'>{title}</td>
                        <td id='artist'>{artist}</td>
                        <td id='album'>{album}</td>
                    </tr>
                )) : null
            }
            </tbody>
        </table>
    )
};

export default TrackList;