// import React, {useCallback, useEffect, useState, useRef} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import ss from 'socket.io-stream';
// import socketClient from 'socket.io-client';
//
// import {onPlay, onPause, onTitleUpdate, onArtistUpdate} from '../../actions/player';
//
// // const socket = socketClient('http://localhost:5000');
//
// const getAudioContext = () => {
//     AudioContext = window.AudioContext;
//     const audioContext = new AudioContext();
//
//     return {audioCtxRef: audioContext};
// };
//
// const audio = (WrappedComponent) => {
//     console.log('AudioComponent instance created');
//     const AudioComponent = ({...props}) => {
//         const [sources, setSources] = useState([]);
//         const dispatch = useDispatch();
//         const {socket} = useSelector(state => state.player);
//
//         // const {audioCtxRef} = getAudioContext();
//
//         const sourcesRef = useRef(sources);
//
//         // let sources = [];
//         let isPlaying = true;
//         let startTime = 0;
//         let stopTime = 0;
//         // let lastChunkOffset = 0;
//         let audioBuffer = null;
//         // const bufferSize = 6;
//         // let playWhileLoadingDuration = 0;
//         // let source = null;
//         let chunks = [];
//         let nextTime = 0.01;
//         let activeSource = null;
//
//         let fileSize_ = null;
//         let fileDuration = null;
//         let chunkSize_ = null;
//
//         const appendBuffer = (buffer1, buffer2) => {
//             const numberOfChannels = Math.min(buffer1.numberOfChannels, buffer2.numberOfChannels);
//             const tmp = audioCtxRef.current.createBuffer(numberOfChannels, (buffer1.length + buffer2.length), buffer1.sampleRate);
//             for (let i = 0; i < numberOfChannels; i++) {
//                 const channel = tmp.getChannelData(i);
//                 channel.set(buffer1.getChannelData(i), 0);
//                 channel.set(buffer2.getChannelData(i), buffer1.length);
//             }
//             return tmp;
//         };
//
//         // useEffect(() => {
//         //     if (sources.length) {
//         //         console.log('update sources', sources);
//         //         Object.assign(sources, [...sources]);
//         //     }
//         // },[sources]);
//
//         const playWhileLoading = setInterval(() => {
//             console.log('chunks length', chunks.length);
//             if (chunks.length !== 0) {
//                 let chunk = chunks.shift();
//                 audioCtxRef.decodeAudioData(chunk)
//                     .then((audioBufferChunk) => {
//                         console.log('decodedChunk', audioBufferChunk);
//
//                         audioBuffer = audioBuffer
//                             ? appendBuffer(audioBuffer, audioBufferChunk)
//                             : audioBufferChunk;
//
//                         let source = audioCtxRef.createBufferSource();
//                         source.buffer = audioBuffer;
//
//                         source.connect(audioCtxRef.destination);
//
//                         // sources.push(source);
//
//                         // setTimeout(() => {
//                         //     setSources(sources => {
//                         //         console.log(sources);
//                         //         return [...sources, source]
//                         //     });
//                         //     console.log('SOURCES', sources);
//                         // }, 0);
//                         setSources(sources => [...sources, source]);
//
//                         sourcesRef.current.push(source);
//                         console.log('sourcesRef',sourcesRef.current);
//
//                         if(!activeSource) {
//                             activeSource = sources.shift();
//                         }
//
//                         source.onended = () => {
//                             activeSource = sources.shift();
//                         };
//
//                         console.log('audioBuffer', audioBufferChunk);
//
//                         if(isPlaying) {
//                             source.start(startTime + nextTime, audioBuffer.duration - audioBufferChunk.duration, audioBufferChunk.duration);
//                         }
//                         nextTime += audioBufferChunk.duration;
//                     });
//             }
//         }, 500);
//
//         const stopPlaying = () => {
//             if(sources.length) {
//                 console.log('Stop Playing');
//
//                 isPlaying = false;
//
//                 stopTime = audioCtxRef.currentTime - startTime;
//
//                 sources.forEach((source) => source.stop(0));
//             }
//         };
//
//         const playByTimepoint = (timepoint) => {
//
//             stopPlaying();
//
//             // const share = chunkSize / fileSize;
//                 // console.log(share);
//                 //
//                 // const durationOfChunk = share * fileDuration;
//                 // console.log(durationOfChunk);
//                 //
//                 // const chunkNum = Math.floor(timepoint / durationOfChunk);
//                 // console.log('chunkNum', chunkNum);
//
//             console.log('playByTimepoint');
//
//             const numOfChunks = fileSize_ / chunkSize_;
//             console.log('chunkSize_', chunkSize_);
//
//             const chunkNum = Math.floor((timepoint * numOfChunks) / 100);
//             console.log('chunkNum', chunkNum);
//
//             socket.emit('play', {
//                 // chunkNumber: chunkNum,
//                 startSize: chunkNum * chunkSize_
//             });
//             // // //
//             // // //     // let chunkNumber = 0;
//             // // //     // let currDuration = durationOfChunk;
//             // // //     // let currSize = chunkSize;
//             // // //     // while (currDuration !== fileDuration && timePoint > currDuration) {
//             // // //     //     currDuration += durationOfChunk;
//             // // //     //     currSize += chunkSize;
//             // // //     //     chunkNumber++;
//             // // //     // }
//             // // //     //
//             // // //     // console.log('num ' + chunkNumber);
//             // // //     // socket.emit('fromChunk', {
//             // // //     //     chunkNumber: chunkNumber-1,
//             // // //     //     currDuration: currDuration-durationOfChunk,
//             // // //     //     currSize: currSize-chunkSize
//             // // //     // });
//         };
//
//         const onTrackBtnClick = (e) => {
//             const trackHTML = e.target.parentElement;
//
//             const id = trackHTML.getAttribute('data-id');
//             const title = trackHTML.cells[0].innerText;
//             const artist = trackHTML.cells[1].innerHTML;
//
//             dispatch(onTitleUpdate(title));
//             dispatch(onArtistUpdate(artist));
//             dispatch(onPlay());
//
//             socket.emit('track', (e) => {});
//
//             socket.on('metadata', ({fileSize, chunkSize}) => {
//                 console.log('metadata');
//
//                 fileSize_ = fileSize;
//                 // this.fileDuration = fileDuration;
//                 chunkSize_ = chunkSize;
//
//                 console.log('chunkSize_', chunkSize_);
//
//                 playByTimepoint(0);
//             });
//
//             nextTime = 0;
//             startTime = audioCtxRef.currentTime;
//
//             socket.on('audio', (chunk_) => {
//                 console.log('receivedChunk', chunk_);
//                 // debugger;
//
//                 chunks.push(chunk_);
//             });
//
//             socket.on('end', () => {
//                 // clearInterval(playWhileLoading);
//             });
//         };
//
//         const onPlayBtnClick = () => {
//             //// useCallback(() => {
//             if(sources && sources.length > 0) {
//                 isPlaying = true;
//                 dispatch(onPlay());
//
//                 // console.log(`Playing ${playerData.isPlaying}`);
//                 const source = sources.splice(0, sources.length - 1).pop();
//                 // const source = sources.pop();
//                 // sources.splice(0, sources.length - 1);
//                 source.start(0, stopTime, source.buffer.duration - stopTime);
//             }
//         };
//
//         const onStopBtnClick = (e) => {
//             console.log(sources);
//
//             console.log(sourcesRef.current);
//
//             setSources((sources) => {
//                 console.log('sources', sources);
//             });
//
//             console.log('chunks', chunks);
//
//             if(sources && sources.length > 0) {
//                 console.log('On Stop Click');
//
//                 dispatch(onPause());
//
//                 stopPlaying();
//             }
//
//             // // socket.emit('stop', () => {});
//             //
//             // // activeSource && activeSource.stop(0);
//             // sources.forEach((source) => source && source.stop(0));
//         };
//
//         return (
//             <WrappedComponent
//                 onPlayBtnClick={onPlayBtnClick}
//                 onStopBtnClick={onStopBtnClick}
//                 onTimepointChange={playByTimepoint}
//                 onTrackBtnClick={onTrackBtnClick}
//                 {...props}
//             />
//         );
//     };
//
//     return AudioComponent;
// };
//
// export default audio;