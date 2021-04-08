import MusicActionTypes from './music.types';

export const addTrackToPlaylistStart = (track) => ({
  type: MusicActionTypes.ADD_TRACK_TO_PLAYLIST_START,
  payload: track,
});

export const addTrackToPlaylistEnd = (track) => ({
  type: MusicActionTypes.ADD_TRACK_TO_PLAYLIST_END,
  payload: track,
});

export const playTrack = (id, index) => ({
  type: MusicActionTypes.PLAY_TRACK,
  payload: {
    id,
    index,
  },
});

export const playNextTrack = () => ({
  type: MusicActionTypes.PLAY_NEXT_TRACK,
});

export const playRadio = () => ({
  type: MusicActionTypes.PLAY_RADIO,
});

export const deleteFromPlaylist = (index) => ({
  type: MusicActionTypes.DELETE_FROM_PLAYLIST,
  payload: index,
});
