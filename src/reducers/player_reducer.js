import * as types from '../constants/action_constants';
import socketClient from "socket.io-client";

// const ENDPOINT = 'http://localhost:5000';

const initialState = {
    // socket: socketClient(ENDPOINT),
    isStarted: false,
    currentTime: {
        min: '00',
        sec: '00'
    },
    duration: {
        min: '00',
        sec: '00'
    },
    loadingProcess: 0,
    chunkSize: 0,
    title: '',
    artist: '',
    isPlaying: false,
    isMuted: false,
    repeat: false,
    shuffle: false,
    timepoint: 0,
    volume: 60,
    resumeVolume: 0,
    tracks: [],
    playingIndex: null,
    playlist: null,
};

export default function player(state = initialState, action) {
    switch (action.type) {
        // case types.SET_SOCKET:
        //     return {
        //         ...state,
        //         socket: action.socket
        //     };
        case types.ON_START:
            return {
                ...state,
                isStarted: true
            };
        case types.ON_PAUSE:
            return {
                ...state,
                isPlaying: false,
            };
        case types.ON_PLAY:
            return {
                ...state,
                isPlaying: true,
            };
        case types.ON_LOAD:
            return {
              ...state,
              loadingProcess: action.loadingProcess
            };
        case types.PLAY_SONG:
            return {
                ...state,
                playingIndex: action.playingIndex,
                playlist: action.playlist,
            };
        case types.ON_CHUNK_SIZE_UPDATE:
            return {
                ...state,
                chunkSize: action.chunkSize
            };
        case types.ON_TIME_UPDATE:
            return {
                ...state,
                currentTime: action.currentTime,
            };
        case types.ON_DURATION_UPDATE:
            return {
                ...state,
                duration: action.duration
            };
        case types.ON_TITLE_UPDATE:
            return {
                ...state,
                title: action.title
            };
        case types.ON_ARTIST_UPDATE:
            return {
                ...state,
                artist: action.artist
            };
        case types.ON_MUTE:
            return {
                ...state,
                isMuted: true,
                resumeVolume: state.volume,
                volume: 0
            };
        case types.ON_UNMUTE:
            return {
                ...state,
                isMuted: false,
                volume: state.resumeVolume
            };
        case types.ON_VOLUME_CHANGE:
            return {
              ...state,
              volume: action.volume
            };
        case types.SET_FOUND_TRACKS:
            return {
                ...state,
                tracks: action.tracks
            };
        default:
            return state;
    }
}