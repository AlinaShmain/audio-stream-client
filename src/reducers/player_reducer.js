import * as types from '../constants/action_constants';

const initialState = {
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    muted: false,
    repeat: false,
    shuffle: false,
    volume: 1,
    playingIndex: null,
    playlist: null,
};

export default function player(state = initialState, action) {
    switch (action.type) {
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
        case types.ON_TIME_UPDATE:
            return {
                ...state,
                currentTime: action.currentTime,
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