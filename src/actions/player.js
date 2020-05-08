import * as types from '../constants/action_constants';

export const setSocket = (socket) => ({
   type: types.SET_SOCKET,
   socket
});

export const onChunkSizeUpdate = (chunkSize) => ({
   type: types.ON_CHUNK_SIZE_UPDATE,
   chunkSize
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