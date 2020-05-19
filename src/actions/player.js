import * as types from '../constants/action_constants';

export const onStart = () => ({
    type: types.ON_START
});

export const onTitleUpdate = (title) => ({
    type: types.ON_TITLE_UPDATE,
    title
});

export const onArtistUpdate = (artist) => ({
    type: types.ON_ARTIST_UPDATE,
    artist
});

export const onPlay = () => ({
    type: types.ON_PLAY
});

export const onPause = () => ({
    type: types.ON_PAUSE
});

export const onLoad = (loadingProcess) => ({
    type: types.ON_LOAD,
    loadingProcess
});

export const onTimeUpdate = (currentTime) => ({
    type: types.ON_TIME_UPDATE,
    currentTime
});

export const onDurationUpdate = (duration) => ({
    type: types.ON_DURATION_UPDATE,
    duration
});

export const onMute = () => ({
    type: types.ON_MUTE
});

export const onUnmute = () => ({
    type: types.ON_UNMUTE
});

export const onVolumeChange = (volume) => ({
    type: types.ON_VOLUME_CHANGE,
    volume
});

export const playSong = (playlist, playingIndex) => ({
    type: types.PLAY_SONG,
    playlist,
    playingIndex,
});