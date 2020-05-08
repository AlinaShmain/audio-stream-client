import * as types from '../constants/action_constants';
import socketClient from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';

const initialState = {
    socket: socketClient(ENDPOINT),
    currentTime: 0,
    duration: 0,
    chunkSize: 0,
    title: '',
    artist: '',
    isPlaying: false,
    muted: false,
    repeat: false,
    shuffle: false,
    timepoint: 0,
    volume: 1,
    playingIndex: null,
    playlist: null,
};

export default function player(state = initialState, action) {
    switch (action.type) {
        case types.SET_SOCKET:
            return {
                ...state,
                socket: action.socket
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
        case types.ON_VOLUME_CHANGE:
            return {
                ...state,
                muted: action.muted,
                volume: action.volume,
            };
        default:
            return state;
    }
}