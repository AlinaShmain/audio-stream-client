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
        // let isPlaying = false;
        let startTime = 0;
        // let lastChunkOffset = 0;
        let audioBuffer = null;
        // const bufferSize = 6;
        // let playWhileLoadingDuration = 0;
        // let source = null;
        let chunks = [];
        let nextTime = 0.01;
        let activeSource = null;

        let fileSize_ = null;
        let fileDuration = null;    
        let chunkSize_ = null;

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

        const playWhileLoading = setInterval(() => {
            console.log('chunks length', chunks.length);
            if (chunks.length !== 0) {
                let chunk = chunks.shift();
                audioContext.decodeAudioData(chunk)
                    .then((audioBufferChunk) => {
                        console.log('decodedChunk', audioBufferChunk);

                        audioBuffer = audioBuffer
                            ? appendBuffer(audioBuffer, audioBufferChunk)
                            : audioBufferChunk;

                        let source = audioContext.createBufferSource();
                        source.buffer = audioBuffer;

                        source.connect(audioContext.destination);

                        sources.push(source);

                        if(!activeSource) {
                            activeSource = sources.shift();
                        }

                        source.onended = () => {
                            activeSource = sources.shift();
                        };

                        console.log('audioBuffer', audioBufferChunk);
                        source.start(startTime + nextTime, audioBuffer.duration - audioBufferChunk.duration, audioBufferChunk.duration);
                        // source.start(startTime + nextTime);
                        nextTime += audioBufferChunk.duration;
                    });
            }
        }, 500);

        const playByTimepoint = (timepoint) => {
                // const share = chunkSize / fileSize;
                // console.log(share);
                //
                // const durationOfChunk = share * fileDuration;
                // console.log(durationOfChunk);
                //
                // const chunkNum = Math.floor(timepoint / durationOfChunk);
                // console.log('chunkNum', chunkNum);

            console.log('playByTimepoint');

            const numOfChunks = fileSize_ / chunkSize_;
            console.log('chunkSize_', chunkSize_);

            const chunkNum = Math.floor((timepoint * numOfChunks) / 100);
            console.log('chunkNum', chunkNum);

            socket.emit('play', {
                // chunkNumber: chunkNum,
                startSize: chunkNum * chunkSize_
            });
            // // //
            // // //     // let chunkNumber = 0;
            // // //     // let currDuration = durationOfChunk;
            // // //     // let currSize = chunkSize;
            // // //     // while (currDuration !== fileDuration && timePoint > currDuration) {
            // // //     //     currDuration += durationOfChunk;
            // // //     //     currSize += chunkSize;
            // // //     //     chunkNumber++;
            // // //     // }
            // // //     //
            // // //     // console.log('num ' + chunkNumber);
            // // //     // socket.emit('fromChunk', {
            // // //     //     chunkNumber: chunkNumber-1,
            // // //     //     currDuration: currDuration-durationOfChunk,
            // // //     //     currSize: currSize-chunkSize
            // // //     // });
        };

        const onPlayBtnClick = () => {
            // useCallback(() => {
            dispatch(onPlay());

            console.log(`Playing ${playerData.isPlaying}`);

            socket.emit('track', (e) => {
                // socket.on('metadata', ({fileSize, chunkSize}) => {
                //     this.fileSize = fileSize;
                //     // this.fileDuration = fileDuration;
                //     this.chunkSize = chunkSize;
                // });
                //
                // playByTimepoint(0);
            });

            socket.on('metadata', ({fileSize, chunkSize}) => {
                console.log('metadata');

                fileSize_ = fileSize;
                // this.fileDuration = fileDuration;
                chunkSize_ = chunkSize;

                console.log('chunkSize_', chunkSize_);

                playByTimepoint(0);
            });

            nextTime = 0;
            startTime = audioContext.currentTime;

            socket.on('audio', (chunk_) => {
                console.log('receivedChunk', chunk_);
                // debugger;

                chunks.push(chunk_);
            });

            socket.on('end', () => {

                // clearInterval(playWhileLoading);
            });
        };

        const onStopBtnClick = () => {
            // activeSource && activeSource.stop(0);
            sources.forEach((source) => source.stop(0));

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