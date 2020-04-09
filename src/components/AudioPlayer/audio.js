import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';

import {onPlay, onPause, onTimeUpdate, onVolumeChange, playSong} from '../../actions/player';

const socket = socketClient('http://localhost:5000');

const getAudioContext = () => {
    AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    return {audioContext};
};

const audio = (WrappedComponent) => {
    const AudioComponent = () => {
        const dispatch = useDispatch();
        const playerData = useSelector(state => state.player);
        // const {currentTime, duration, isPlaying, muted, repeat, shuffle} = playerData;

        const {audioContext} = getAudioContext();

        // const [player, setPlayer] = useState(null);
        let sources = [];
        let isPlaying = false;
        let startTime = 0;
        let lastChunkOffset = 0;
        let audioBuffer = null;
        const bufferSize = 6;
        // let playWhileLoadingDuration = 0;
        // let source = null;
        let chunks = [];
        let nextTime = 0.01;
        let times = [];
        let i = 0;

        const appendBuffer = (buffer1, buffer2) => {
            const numberOfChannels = Math.min(buffer1.numberOfChannels, buffer2.numberOfChannels);
            const tmp = audioContext.createBuffer(numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate);
            for (let i = 0; i < numberOfChannels; i++) {
                const channel = tmp.getChannelData(i);
                channel.set(buffer1.getChannelData(i), 0);
                channel.set(buffer2.getChannelData(i), buffer1.length);
            }
            return tmp;
        };

        // const play = (offset = 0) => {
        //     console.log('sources', sources);
        //     if (sources.length === 0) {
        //         isPlaying = false;
        //         return;
        //     }
        //
        //     let source = sources.shift();
        //
        //     source.onended = () => {
        //         // source.stop();
        //         console.log('duration', source.buffer.duration);
        //
        //         let playWhileLoadingDuration = source.buffer.duration;
        //
        //         play(playWhileLoadingDuration);
        //     };
        //
        //     console.log('offset', offset);
        //     console.log('duration of last chunk', source.buffer.duration - offset);
        //     source.start(audioContext.currentTime, offset, source.buffer.duration - offset);
        // };

        const playWhileLoading = setInterval(() => {
            console.log('chunks length', chunks.length);
            if (chunks.length !== 0) {
                let chunk = chunks.shift();
                audioContext.decodeAudioData(chunk)
                    .then((audioBufferChunk) => {
                        console.log('decodedChunk', audioBufferChunk);

                        // audioBuffer = audioBuffer
                        //     ? appendBuffer(audioBuffer, audioBufferChunk)
                        //     : audioBufferChunk;

                        let source = audioContext.createBufferSource();
                        source.buffer = audioBufferChunk;

                        source.connect(audioContext.destination);

                        source.start(startTime + nextTime);
                        nextTime += (audioBufferChunk.duration - 0.01) ;

                        // if(times.length > 1) {
                        //     times[i] = audioContext.currentTime;
                        //     i++;
                        //     // source.start( nextTime);
                        //     source.start(nextTime  - (times[i - 1] - times[i - 2]));
                        //     nextTime += audioBufferChunk.duration - 0.01;
                        // } else {
                        //     times[i] = audioContext.currentTime;
                        //     i++;
                        //     source.start();
                        //     nextTime += audioBufferChunk.duration - 0.01;
                        // }

                        // sources.push(source);
                        //
                        // if (!isPlaying) {
                        //     isPlaying = true;
                        //
                        //     play();
                        // }
                    });
            }
        }, 500);

        const onPlayBtnClick = () => {
            // useCallback(() => {
            dispatch(onPlay());

            console.log(`Playing ${playerData.isPlaying}`);

            socket.emit('track', (e) => {
            });

            nextTime = 0.01;
            // times = [];
            // i = 0;
            startTime = audioContext.currentTime;

            socket.on('audio', (chunk_) => {
                console.log('receivedChunk', chunk_);
                // debugger;

                chunks.push(chunk_);
            });
        };

        const onStopBtnClick = () => {
            // source && source.stop(0);
            console.log('Stop playing');

            dispatch(onPause());

            console.log(`Playing ${playerData.isPlaying}`);
        };

        return (
            <WrappedComponent
                player={playerData}
                onPlayBtnClick={onPlayBtnClick}
                onStopBtnClick={onStopBtnClick}
            />
        );
    };

    return AudioComponent;
};

export default audio;