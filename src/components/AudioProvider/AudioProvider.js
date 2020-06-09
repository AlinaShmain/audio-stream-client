import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ss from 'socket.io-stream';
import socketClient from 'socket.io-client';

import {
    onStart,
    onPlay,
    onPause,
    onLoad,
    onTitleUpdate,
    onArtistUpdate,
    onDurationUpdate,
    onTimeUpdate,
    onMute,
    onUnmute,
    onVolumeChange
} from '../../actions/player';

const socket = socketClient('http://localhost:5000');

export const AudioCtx = React.createContext({});


const AudioProvider = ({children}) => {
    const dispatch = useDispatch();
    const {volume} = useSelector(state => state.player);

    const audioCtxRef = useRef();
    const gainNodeRef = useRef();

    const fileDurationRef = useRef(0);
    const chunkSizeRef = useRef(0);

    const idRef = useRef(1);
    const isStarted = useRef(false);
    const isEnded = useRef(false);
    const sourcesRef = useRef([]);
    const audioBufferRef = useRef(null);
    const startTimeRef = useRef(0);
    const currTimeRef = useRef(0);
    const playedDurationRef = useRef(0);
    const isPlayingRef = useRef(true);
    const loadRateRef = useRef(0);
    const fileSizeRef = useRef(0);
    const timerRef = useRef((() => {
    }));
    const volumeRef = useRef(1);
    const nextTimeRef = useRef(0);
    const chunksRef = useRef([]);

    useEffect(() => {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();

        gainNodeRef.current = audioCtxRef.current.createGain();
        const volumeVal = (volume * 1) / 100;
        setVolume(volumeVal);
        console.log(gainNodeRef.current);
    }, [socket.location]);

    const appendBuffer = (buffer1, buffer2) => {
        const numberOfChannels = Math.min(buffer1.numberOfChannels, buffer2.numberOfChannels);
        const tmp = audioCtxRef.current.createBuffer(numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate);
        for (let i = 0; i < numberOfChannels; i++) {
            const channel = tmp.getChannelData(i);
            channel.set(buffer1.getChannelData(i), 0);
            channel.set(buffer2.getChannelData(i), buffer1.length);
        }
        return tmp;
    };

    const getTimeFormat = (inSec) => {
        let min = inSec / 60;
        let sec = Math.round((min - Math.trunc(min)) * 60);
        min = Math.trunc(min);
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        return {min, sec}
    };

    const updateTime = () => {
        timerRef.current = setInterval(() => {
            // console.log('updating time');
            ++currTimeRef.current >= Math.trunc(fileDurationRef.current) && clearInterval(timerRef.current);

            dispatch(onTimeUpdate(getTimeFormat(currTimeRef.current)));
            dispatch(onLoad(Math.round((currTimeRef.current * 100) / fileDurationRef.current)));
        }, 1000);
    };

    const playWhileLoading = setInterval(() => {
        console.log('chunks length', chunksRef.current.length);
        if (chunksRef.current.length !== 0) {
            let chunk = chunksRef.current.shift();
            audioCtxRef.current.decodeAudioData(chunk)
                .then((audioBufferChunk) => {
                    console.log('decodedChunk', audioBufferChunk);

                    audioBufferRef.current = audioBufferRef.current
                        ? appendBuffer(audioBufferRef.current, audioBufferChunk)
                        : audioBufferChunk;

                    console.log('chunk size', chunk.length);
                    console.log('audiobuffer size ', audioBufferChunk.length);

                    loadRateRef.current += (chunk.length * 100) / fileSizeRef.current;

                    let source = audioCtxRef.current.createBufferSource();
                    source.buffer = audioBufferRef.current;

                    source.connect(gainNodeRef.current);

                    // const gainNode = audioCtxRef.current.createGain();
                    // source.connect(gainNode);
                    // gainNode.connect(audioCtxRef.current.destination);

                    gainNodeRef.current.connect(audioCtxRef.current.destination);

                    sourcesRef.current.push(source);
                    console.log('sourcesRef', sourcesRef.current);

                    // if(!activeSource) {
                    //     activeSource = sourcesRef.current.shift();
                    // }
                    //
                    // source.onended = () => {
                    //     activeSource = sourcesRef.current.shift();
                    //     // sourcesRef.current.shift();
                    //     console.log('end playing');
                    //     console.log(sourcesRef.current);
                    // };

                    console.log('audioBuffer', audioBufferChunk);

                    if (isPlayingRef.current) {
                        console.log('playing !!');

                        if (startTimeRef.current === 0) {
                            startTimeRef.current = audioCtxRef.current.currentTime + audioCtxRef.current.baseLatency;
                            console.log('startTimeRef', startTimeRef.current);
                            updateTime();
                        }

                        // console.log(audioBuffer);
                        source.start(startTimeRef.current + nextTimeRef.current, audioBufferRef.current.duration - audioBufferChunk.duration, audioBufferChunk.duration);
                        // source.start(startTime + nextTime, source.buffer.duration - audioBufferChunk.duration, audioBufferChunk.duration);
                        nextTimeRef.current += audioBufferChunk.duration - 0.05;
                    }
                })
                .catch((e) => {
                    console.log('decoding error', e);
                });
        }
    }, 500);

    const stopPlaying = () => {

        // if(audioCtxRef.state === 'running') {
        //     audioCtxRef.suspend().then(function() {
        //         susresBtn.textContent = 'Resume context';
        //     });
        // } else if(audioCtx.state === 'suspended') {
        //     audioCtx.resume().then(function() {
        //         susresBtn.textContent = 'Suspend context';
        //     });
        // }

        if (sourcesRef.current.length) {
            console.log('Stop Playing');

            isPlayingRef.current = false;

            clearInterval(timerRef.current);

            playedDurationRef.current += (audioCtxRef.current.currentTime + audioCtxRef.current.baseLatency) - startTimeRef.current;
            console.log('startTimeRef', startTimeRef.current);
            console.log('stopTime', audioCtxRef.current.currentTime);
            console.log('playedDuration', playedDurationRef.current);

            // activeSource && activeSource.stop(0);
            sourcesRef.current.forEach((source) => source && source.stop(0));
            console.log(sourcesRef.current);
        }
    };

    const resumePlaying = (offsetSec) => {
        sourcesRef.current.splice(0, sourcesRef.current.length - 1);

        const currSource = sourcesRef.current.pop();

        let source = audioCtxRef.current.createBufferSource();
        source.buffer = currSource.buffer;
        source.connect(audioCtxRef.current.destination);
        sourcesRef.current.push(source);

        nextTimeRef.current = source.buffer.duration - offsetSec;

        startTimeRef.current = audioCtxRef.current.currentTime + audioCtxRef.current.baseLatency;
        updateTime();
        source.start(0, offsetSec, nextTimeRef.current);
        isPlayingRef.current = true;
    };

    const endPlaying = (timepoint) => {
        return new Promise( (res, rej) => {
            console.log('end playing');
            console.log(isPlayingRef.current);
            console.log(sourcesRef.current);
            if (sourcesRef.current && sourcesRef.current.length) {
                stopPlaying();
                console.log('stopplaying');

                socket.emit('stopLoad', (response) => {
                    if(response) {
                        console.log('stopped');

                        chunksRef.current = [];
                        sourcesRef.current = [];
                        isPlayingRef.current = true;
                        startTimeRef.current = 0;
                        playedDurationRef.current = 0;
                        currTimeRef.current = (fileDurationRef.current * timepoint) / 100;
                        loadRateRef.current = 0;
                        nextTimeRef.current = 0;
                        audioBufferRef.current = null;

                        res(response);
                    }
                });
            } else {
                console.log('first playing');
                res('stopped');
            }
        });
    };

    const playByTimepoint = (timepoint) => {

        console.log(isStarted.current);
        if (isStarted.current) {
            console.log('before promise');
            endPlaying(timepoint).then((response) => {
                // debugger;
                // if(timepoint >= audioBufferRef.current.duration) {
                if(response) {
                    const numOfChunks = fileSizeRef.current / chunkSizeRef.current;
                    console.log('chunkSize_', chunkSizeRef.current);

                    const chunkNum = Math.floor((timepoint * numOfChunks) / 100);
                    console.log('chunkNum', chunkNum);

                    const startSize = (fileSizeRef.current * timepoint) / 100;
                    console.log('startSize', startSize);

                    // debugger;

                    socket.emit('play', {
                        startSize: startSize
                    });
                }
            });
            // if (isPlayingRef.current && sourcesRef.current && sourcesRef.current.length) {
            //     stopPlaying();
            //
            //     socket.emit('stopLoad', () => {
            //         console.log('stopped');
            //
            //         chunksRef.current = [];
            //         sourcesRef.current = [];
            //         isPlayingRef.current = true;
            //         startTimeRef.current = 0;
            //         playedDurationRef.current = 0;
            //         currTimeRef.current = (fileDurationRef.current * timepoint) / 100;
            //         loadRateRef.current = 0;
            //         nextTimeRef.current = 0;
            //         audioBufferRef.current = null;
            //     });
            // }
            // console.log('playByTimepoint');
            //
            // // if(timepoint >= audioBufferRef.current.duration) {
            // const numOfChunks = fileSizeRef.current / chunkSizeRef.current;
            // console.log('chunkSize_', chunkSizeRef.current);
            //
            // const chunkNum = Math.floor((timepoint * numOfChunks) / 100);
            // console.log('chunkNum', chunkNum);
            //
            // const startSize = (fileSizeRef.current * timepoint) / 100;
            // console.log('startSize', startSize);
            //
            // socket.emit('play', {
            //     // startSize: chunkNum * chunkSizeRef.current
            //     startSize: startSize
            //     // startSize: 2320003
            // });
            //
            // // } else {
            // //     const timepointInSec = (fileDurationRef.current * timepoint) / 100;
            // //     resumePlaying(timepointInSec);
            // // }
        }
    };

    const concat = (buffer1, buffer2) => {
        const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

        return tmp.buffer;
    };

    useEffect(() => {
        socket.on('metadata', ({fileSize, chunkSize, fileDuration}) => {
            console.log('metadata', {fileSize, chunkSize, fileDuration});

            fileSizeRef.current = fileSize;
            chunkSizeRef.current = chunkSize;
            fileDurationRef.current = fileDuration;

            dispatch(onDurationUpdate(getTimeFormat(fileDuration)));

            playByTimepoint(0);
        });

        // let buffer = null;

        socket.on('audio', (chunk_) => {
            console.log('receivedChunk', chunk_);

            chunksRef.current.push(chunk_);
            // buffer = buffer ? concat(buffer, chunk_) : chunk_;
        });

        socket.on('end', () => {
            isEnded.current = true;
        //     // clearInterval(playWhileLoading);
        //     // const promises = chunksRef.current.map((chunk) => {
        //     //     return new Promise((resolve, reject) => {
        //     //         audioCtxRef.current.decodeAudioData(chunk).then((audioBufferChunk) => {
        //     //             console.log('decoded');
        //     //
        //     //             resolve(audioBufferChunk);
        //     //         });
        //     //     });
        //     // });
        //     // let buffers = await Promise.all(promises);
        //     // console.log(buffers);
        //     // const audioBuffer = buffers.reduce((buffer1, buffer2) => appendBuffer(buffer1, buffer2));
        //     //
        //     console.log('start playing');
        //     // let source = audioCtxRef.current.createBufferSource();
        //     // source.buffer = audioBuffer;
        //     // source.connect(audioCtxRef.current.destination);
        //     // source.start();
        //     // audioCtxRef.current.decodeAudioData(buffer).then(b => {
        //     //     console.log('decoded', b);
        //     //     let source = audioCtxRef.current.createBufferSource();
        //     //     source.buffer = b;
        //     //     source.connect(audioCtxRef.current.destination);
        //     //     source.start();
        //     // });
        //
        //     buffer = chunksRef.current.reduce((chunk1, chunk2) => concat(chunk1, chunk2));
        //     console.log(buffer);
        //     audioCtxRef.current.decodeAudioData(buffer).then(b => {
        //         console.log('decoded', b);
        //         let source = audioCtxRef.current.createBufferSource();
        //         source.buffer = b;
        //         source.connect(audioCtxRef.current.destination);
        //         source.start();
        //     });
        });
    }, []);

    const onTrackBtnClick = (trackHTML) => {
        // const trackHTML = e.target.parentElement;

        const id = trackHTML.getAttribute('data-id');
        const title = trackHTML.cells[0].innerText;
        const artist = trackHTML.cells[1].innerHTML;

        dispatch(onStart());
        isStarted.current = true;
        idRef.current = id;
        dispatch(onTitleUpdate(title));
        dispatch(onArtistUpdate(artist));
        dispatch(onPlay());

        socket.emit('track', {id}, (e) => {
        });

        nextTimeRef.current = 0;
    };

    const onPlayBtnClick = () => {
        //// useCallback(() => {
        console.log('play', sourcesRef.current);

        if (sourcesRef.current && sourcesRef.current.length) {
            dispatch(onPlay());

            // sourcesRef.current.splice(0, sourcesRef.current.length - 1);
            //
            // const currSource = sourcesRef.current.pop();
            //
            // let source = audioCtxRef.current.createBufferSource();
            // source.buffer = currSource.buffer;
            // source.connect(audioCtxRef.current.destination);
            // sourcesRef.current.push(source);

            resumePlaying(playedDurationRef.current);

            // nextTime = source.buffer.duration - playedDurationRef.current;
            //
            // console.log('stopTime', playedDurationRef.current);
            //
            // startTimeRef.current = audioCtxRef.current.currentTime + audioCtxRef.current.baseLatency;
            // source.start(0, playedDurationRef.current, nextTime);
            // isPlayingRef.current = true;
        }
    };

    const onStopBtnClick = (e) => {
        console.log(sourcesRef.current);

        console.log('chunks', chunksRef.current);

        if (sourcesRef.current && sourcesRef.current.length) {
            console.log('On Stop Click');

            dispatch(onPause());

            stopPlaying();
        }
    };

    const onNextTrack = () => {


        ++(idRef.current);
        const elem = document.querySelector(`tr[data-id='${idRef.current}']`);
        console.log('next track', elem);
        elem && onTrackBtnClick(elem);
    };

    const onPreviousTrack = () => {
        --(idRef.current);
        const elem = document.querySelector(`tr[data-id='${idRef.current}']`);
        console.log('previous track', elem);

        elem ? onTrackBtnClick(elem) : onTrackBtnClick(document.querySelector(`tr[data-id='${++idRef.current}']`));
    };

    const setVolume = (level) => {
        gainNodeRef.current.gain.setValueAtTime(level, audioCtxRef.current.currentTime);
    };

    const onMuteClick = () => {
        console.log('onMute');

        dispatch(onMute());
        setVolume(0);
    };

    const onUnmuteClick = () => {
        console.log('onUnMute');

        dispatch(onUnmute());
        setVolume(volumeRef.current);
    };

    const volumeChange = (volumePercent) => {
        console.log('onVolumeChange');

        const volumeVal = (volumePercent * 1) / 100;

        dispatch(onVolumeChange(volumePercent));
        setVolume(volumeVal);
    };

    return (
        <AudioCtx.Provider
            value={{
                socket: socket,
                onPlayBtnClick: onPlayBtnClick,
                onStopBtnClick: onStopBtnClick,
                onTimepointChange: playByTimepoint,
                onTrackBtnClick: onTrackBtnClick,
                onNextTrack: onNextTrack,
                onPreviousTrack: onPreviousTrack,
                onMuteClick: onMuteClick,
                onUnmuteClick: onUnmuteClick,
                onVolumeChange: volumeChange
            }}
        >
            {children}
        </AudioCtx.Provider>
    );
};

export default AudioProvider;