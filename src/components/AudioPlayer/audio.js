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
        let audioBuffer = null;
        let source = null;


        const concat = (buffer1, buffer2) => {
            const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

            tmp.set(new Uint8Array(buffer1), 0);
            tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

            return tmp.buffer;
        };

        const writeString = (view, offset, string) => {
            string.split('').forEach((ch, i) => {
                view.setUint8(offset + i, ch.charCodeAt(0));
            });
        };

        const addWaveHeader = (data, sampleRate, numberOfChannels) => {
            const header = new ArrayBuffer(44);

            const view = new DataView(header);

            writeString(view, 0, 'RIFF');

            view.setUint32(4, data.byteLength / 2 + 44, true);

            writeString(view, 8, 'WAVE');
            writeString(view, 12, 'fmt ');

            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, numberOfChannels, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * 1 * 2);
            view.setUint16(32, numberOfChannels * 2);
            view.setUint16(34, 16, true);

            writeString(view, 36, 'data');
            view.setUint32(40, data.byteLength, true);

            return concat(header, data);
        };

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

        const onPlayBtnClick = () => {
            // useCallback(() => {
            dispatch(onPlay());

            console.log(`Playing ${playerData.isPlaying}`);

            socket.emit('track', (e) => {
            });

            ss(socket).on('track-stream', (stream, {stat}) => {
                console.log("receiving data...");
                let buffer = null;

                stream.on('data', (chunk) => {
                    if (buffer) {
                        buffer = concat(buffer, chunk);
                    } else {
                        buffer = chunk;
                    }
                });

                stream.on('end', function () {
                    console.log(`audio received ${buffer}`);
                    // debugger;
                    const buffer$ = addWaveHeader(buffer, 44100, 2);
                    audioContext.decodeAudioData(buffer$).then(b => {
                        source = audioContext.createBufferSource();
                        source.buffer = b;
                        source.connect(audioContext.destination);
                        source.start();
                    });
                });
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