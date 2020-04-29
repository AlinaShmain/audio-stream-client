import React, {useState, useRef} from 'react';
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
    // const [relX, setRelX] = useState(0);
    let relX = 0;
    const [x, setX] = useState(0);

    const timelineRef = useRef();
    const timepointRef = useRef();

    const onStart = (e) => {
        const body = document.body;
        const box = timepointRef.current.getBoundingClientRect();
        console.log('clientX', e.clientX);
        console.log('timepoint left', box.left);
        // console.log('e.pageX', e.pageX);
        console.log('body.scrollLeft', body.scrollLeft);
        console.log('body.clientLeft', body.clientLeft);
        // console.log('relX', e.pageX - (box.left + body.scrollLeft - body.clientLeft));
        // console.log('timeline width', timelineRef.current.getBoundingClientRect().width);
        relX = e.clientX - box.left;
        // setRelX(
        //     e.clientX - box.left
        //     // e.pageX - (box.left + body.scrollLeft - body.clientLeft),
        // );
    };

    const onMouseDown = (e) => {
        if (e.button !== 0) return;
        onStart(e);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
    };

    const onMouseUp = (e) => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    };

    const onMouseMove = (e) => {
        onMove(e);
        e.preventDefault();
    };

    const onMove = (e) => {
        const offsetX = e.clientX - relX;
        const timepointWidth = timepointRef.current.getBoundingClientRect().width;
        const timelineWidth = timelineRef.current.getBoundingClientRect().width;

        if(x !== offsetX && relX !== offsetX && offsetX >= 0 && (offsetX + timepointWidth) <= timelineWidth) {
            console.log('offset', offsetX);
            setX(offsetX);
        }
    };

    return (
        <div className="timeline fixed-bottom justify-content-center w-100">
            <div className="soundline" ref={timelineRef}>
                <div className='timepoint'
                     ref={timepointRef}
                     style={{left: x}}
                    onMouseDown={onMouseDown}
                ></div>
            </div>
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