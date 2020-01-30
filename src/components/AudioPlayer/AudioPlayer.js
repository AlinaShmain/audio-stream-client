import React, {useState} from 'react';
import {
    faStepBackward,
    faPlayCircle,
    faStepForward
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import audio from './audio';
import './AudioPlayer.css';

const AudioPlayer = ({player, onPlayBtnClick, onStopBtnClick}) => {
    const [songTitle, setSongTitle] = useState('Title');
    const [artist, setArtist] = useState('Artist');

    return (
        <div className="timeline fixed-bottom justify-content-center w-100">
            <div className="soundline"></div>
            <div className='d-flex justify-content-between pr-3 pl-3 w-100'>
                <div className='d-flex flex-column justify-content-center w-30'>
                    <span className='title'>{songTitle}</span>
                    <span className='artist'>{artist}</span>
                </div>
                <div className='controllers w-40'>
                    <div className='time'><span className='d-inline-block'>{player.currentTime}</span></div>
                    <div className='back-icon' onClick={onStopBtnClick}>
                        {/*    /!*<FontAwesomeIcon icon={faStepBackward}*!/*/}
                        {/*    /!*                 style={{*!/*/}
                        {/*    /!*                     height: '15px',*!/*/}
                        {/*    /!*                     width: '15px',*!/*/}
                        {/*    /!*                     color: '#6F716D'*!/*/}
                        {/*    /!*                 }}/>*!/*/}
                    </div>
                    <div className={player.isPlaying ? 'pause-icon' : 'play-icon'}
                         onClick={player.isPlaying ? onStopBtnClick : onPlayBtnClick}
                    >
                        {/*    /!*<FontAwesomeIcon icon={faPlayCircle}*!/*/}
                        {/*    /!*                 style={{*!/*/}
                        {/*    /!*                     height: '30px',*!/*/}
                        {/*    /!*                     width: '30px',*!/*/}
                        {/*    /!*                     color: '#70FF00'*!/*/}
                        {/*    /!*                 }}/>*!/*/}
                    </div>
                    <div className='forward-icon' onClick={() => {
                    }}>
                        {/*    /!*<FontAwesomeIcon icon={faStepForward}*!/*/}
                        {/*    /!*                 style={{*!/*/}
                        {/*    /!*                     height: '15px',*!/*/}
                        {/*    /!*                     width: '15px',*!/*/}
                        {/*    /!*                     color: '#6F716D'*!/*/}
                        {/*    /!*                 }}/>*!/*/}
                    </div>
                    <div className='time'><span className='d-inline-block'>{player.duration}</span></div>
                </div>
                <div className='volume-controllers w-30'>
                    <div className='volume-down-icon'></div>
                    <div className='volume-line'></div>
                    <div className='volume-up-icon'></div>
                </div>
            </div>
        </div>
    );
};

export default audio(AudioPlayer);