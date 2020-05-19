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

// const socket = socketClient('http://localhost:5000');

export const AudioCtx = React.createContext({});

// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// let audioContext;
// let gainNode;
const getAudioContext = () => {
    AudioContext = window.AudioContext;
    const audioContext = new AudioContext();

    // const gainNode = audioContext.createGain();

    // let audioContext = ;

    // return audioContext ? audioContext : new AudioContext();
    return audioContext;
};

// const getGainNode = () => {
//    return gainNode ? gainNode : getAudioContext().createGain();
// };

const AudioProvider = ({children}) => {
    const dispatch = useDispatch();
    const {socket, volume} = useSelector(state => state.player);

    const audioCtxRef = useRef();
    const gainNodeRef = useRef();

    const fileDurationRef = useRef(0);
    const chunkSizeRef = useRef(0);

    const isStarted = useRef(false);
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

    // const playWhileLoading = setInterval(() => {
    //     console.log('chunks length', chunksRef.current.length);
    //     if (chunksRef.current.length !== 0) {
    //         let chunk = chunksRef.current.shift();
    //         audioCtxRef.current.decodeAudioData(chunk)
    //             .then((audioBufferChunk) => {
    //                 console.log('decodedChunk', audioBufferChunk);
    //
    //                 audioBufferRef.current = audioBufferRef.current
    //                     ? appendBuffer(audioBufferRef.current, audioBufferChunk)
    //                     : audioBufferChunk;
    //
    //                 console.log('chunk size', chunk.length);
    //                 console.log('audiobuffer size ', audioBufferChunk.length);
    //
    //                 loadRateRef.current += (chunk.length * 100) / fileSizeRef.current;
    //
    //                 let source = audioCtxRef.current.createBufferSource();
    //                 source.buffer = audioBufferRef.current;
    //
    //                 source.connect(gainNodeRef.current);
    //
    //                 // const gainNode = audioCtxRef.current.createGain();
    //                 // source.connect(gainNode);
    //                 // gainNode.connect(audioCtxRef.current.destination);
    //
    //                 gainNodeRef.current.connect(audioCtxRef.current.destination);
    //
    //                 sourcesRef.current.push(source);
    //                 console.log('sourcesRef', sourcesRef.current);
    //
    //                 // if(!activeSource) {
    //                 //     activeSource = sourcesRef.current.shift();
    //                 // }
    //                 //
    //                 // source.onended = () => {
    //                 //     activeSource = sourcesRef.current.shift();
    //                 //     // sourcesRef.current.shift();
    //                 //     console.log('end playing');
    //                 //     console.log(sourcesRef.current);
    //                 // };
    //
    //                 console.log('audioBuffer', audioBufferChunk);
    //
    //                 if (isPlayingRef.current) {
    //                     console.log('playing !!');
    //
    //                     if (startTimeRef.current === 0) {
    //                         startTimeRef.current = audioCtxRef.current.currentTime + audioCtxRef.current.baseLatency;
    //                         console.log('startTimeRef', startTimeRef.current);
    //                         updateTime();
    //                     }
    //
    //                     // console.log(audioBuffer);
    //                     source.start(startTimeRef.current + nextTimeRef.current, audioBufferRef.current.duration - audioBufferChunk.duration, audioBufferChunk.duration);
    //                     // source.start(startTime + nextTime, source.buffer.duration - audioBufferChunk.duration, audioBufferChunk.duration);
    //                     nextTimeRef.current += audioBufferChunk.duration - 0.05;
    //                 }
    //             });
    //     }
    // }, 500);

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

    const playByTimepoint = (timepoint) => {

        console.log(isStarted.current);
        if(isStarted.current) {
            if (isPlayingRef.current && sourcesRef.current && sourcesRef.current.length) {
                stopPlaying();

                // chunks = [];
                chunksRef.current = [];
                sourcesRef.current = [];
                // isPlayingRef.current = true;
                startTimeRef.current = 0;
                playedDurationRef.current = 0;
                currTimeRef.current = (fileDurationRef.current * timepoint) / 100;
                loadRateRef.current = 0;
                nextTimeRef.current = 0;
                audioBufferRef.current = null;

                socket.emit('stopLoad', () => {
                    console.log('stopped');

                    isPlayingRef.current = true;
                });
            }
            console.log('playByTimepoint');

            // if(timepoint >= audioBufferRef.current.duration) {
            const numOfChunks = fileSizeRef.current / chunkSizeRef.current;
            console.log('chunkSize_', chunkSizeRef.current);

            const chunkNum = Math.floor((timepoint * numOfChunks) / 100);
            console.log('chunkNum', chunkNum);

            socket.emit('play', {
                // chunkNumber: chunkNum,
                // startSize: chunkNum * chunkSizeRef.current
                startSize: 2320003
            });

            // } else {
            //     const timepointInSec = (fileDurationRef.current * timepoint) / 100;
            //     resumePlaying(timepointInSec);
            // }
        }
    };

    const onTrackBtnClick = (e) => {
        const trackHTML = e.target.parentElement;

        const id = trackHTML.getAttribute('data-id');
        const title = trackHTML.cells[0].innerText;
        const artist = trackHTML.cells[1].innerHTML;

        dispatch(onStart());
        isStarted.current = true;
        dispatch(onTitleUpdate(title));
        dispatch(onArtistUpdate(artist));
        dispatch(onPlay());

        socket.emit('track', (e) => {
        });

        socket.on('metadata', ({fileSize, chunkSize, fileDuration}) => {
            console.log('metadata');

            fileSizeRef.current = fileSize;
            chunkSizeRef.current = chunkSize;
            fileDurationRef.current = fileDuration;

            dispatch(onDurationUpdate(getTimeFormat(fileDuration)));

            playByTimepoint(0);
        });

        nextTimeRef.current = 0;

        let buffer = null;

        socket.on('end', function () {
            console.log(`audio received ${buffer}`);

            audioContext.decodeAudioData(buffer).then(b => {
                let source = audioContext.createBufferSource();
                source.buffer = b;
                source.connect(audioContext.destination);
                source.start();
            });
        });

        socket.on('audio', (chunk_) => {
            console.log('receivedChunk', chunk_);
            // debugger;

            // chunks.push(chunk_);
            // chunksRef.current.push(chunk_);
            buffer = buffer ? concat(buffer, chunk_) : chunk_;
        });

        socket.on('end', () => {
            // clearInterval(playWhileLoading);

            audioBufferRef.current.decodeAudioData(buffer).then(b => {
                let source = audioCtxRef.current.createBufferSource();
                source.buffer = b;
                source.connect(audioCtxRef.current.destination);
                source.start();
            });
            // source.buffer = chunksRef.current.reduce((chunk1, chunk2) => appendBuffer(chunk1, chunk2));
            // source.buffer = await new Promise((resolve, reject) => {
            //     while (chunksRef.current.length !== 0) {
            //         let chunk = chunksRef.current.shift();
            //         audioCtxRef.current.decodeAudioData(chunk)
            //             .then((audioBufferChunk) => {
            //                 console.log('decodedChunk', audioBufferChunk);
            //
            //                 audioBufferRef.current = audioBufferRef.current
            //                     ? appendBuffer(audioBufferRef.current, audioBufferChunk)
            //                     : audioBufferChunk;
            //             });
            //         if(chunksRef.current.length === 0) {
            //             console.log('end');
            //             resolve(audioBufferRef.current);
            //         }
            //     }
            // });
        });
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
                onPlayBtnClick: onPlayBtnClick,
                onStopBtnClick: onStopBtnClick,
                onTimepointChange: playByTimepoint,
                onTrackBtnClick: onTrackBtnClick,
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