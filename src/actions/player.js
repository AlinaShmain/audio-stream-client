import * as types from '../constants/action_constants';

// export function onPlay() {
//     return () => ({
//         type: types.ON_PLAY,
//     });
// }

export const onPlay = () => ({
    type: types.ON_PLAY,
});

export const onPause = () => ({
    type: types.ON_PAUSE,
});

export function onTimeUpdate(currentTime) {
    return () => ({
        type: types.ON_TIME_UPDATE,
        currentTime,
    });
}

export const onVolumeChange = (muted, volume) => ({
    type: types.ON_VOLUME_CHANGE,
    muted,
    volume,
});

export const playSong = (playlist, playingIndex) => ({
    type: types.PLAY_SONG,
    playlist,
    playingIndex,
});