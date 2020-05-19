import React, {useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    faStepBackward,
    faPlayCircle,
    faStepForward
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import audio from './audio';
import Draggable from './Draggable';
import './AudioPlayer.css';
import {AudioCtx} from "../AudioProvider/AudioProvider";

const AudioPlayer = ({...props}) => {

    const {onPlayBtnClick, onStopBtnClick, onTimepointChange, onMuteClick, onUnmuteClick, onVolumeChange} = useContext(AudioCtx);

    const {isStarted, isPlaying, title, artist, loadingProcess, currentTime, duration, isMuted, volume} = useSelector(state => state.player);

    return (
        <React.Fragment>
            <div className="timeline fixed-bottom justify-content-center w-100">
                {isStarted
                    ?
                    <Draggable props={props} line='soundline' point='timepoint' playingProgress={loadingProcess}
                               afterUp={(timepoint) => onTimepointChange(timepoint)}/>
                    :
                    <div className='soundline' style={{backgroundColor: '#6F716D'}}/>
                }
                <div className='d-flex justify-content-between pr-3 pl-3 w-100'>
                    <div className='d-flex flex-column justify-content-center w-30'>
                        <span className='title'>{title}</span>
                        <span className='artist'>{artist}</span>
                    </div>
                    <div className='controllers w-40'>
                        {isStarted ?
                            <React.Fragment>
                                <div className='time'><span
                                className='d-inline-block'>{currentTime.min}:{currentTime.sec}</span></div>
                                <div className='back-icon' onClick={onStopBtnClick}/>
                                <div style={{color: '#70FF00', cursor: 'pointer'}}
                                     className={isPlaying ? 'pause-icon' : 'play-icon'}
                                     onClick={isPlaying ? onStopBtnClick : onPlayBtnClick}
                                />
                                <div className='forward-icon' onClick={() => {}}/>
                                <div className='time'><span className='d-inline-block'>
                                        {duration.min}:{duration.sec}
                                </span></div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div className='back-icon'/>
                                <div className='play-icon' style={{color: '#6F716D'}}/>
                                <div className='forward-icon' onClick={() => {}}/>
                            </React.Fragment>
                        }
                    </div>
                    <div className='volume-controllers w-30'>
                        <div className={isMuted ? 'volume-down-icon' : 'volume-up-icon'}
                             onClick={isMuted ? onUnmuteClick : onMuteClick}></div>
                        <Draggable props={props} line='volume-line' point='volume-point' playingProgress={volume}
                                   initOffset={volume} afterMove={(volume) => onVolumeChange(volume)}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AudioPlayer;