import MusicActionTypes from './music.types';

export const addTrackToPlaylistStart = (id) => ({
  type: MusicActionTypes.ADD_TRACK_TO_PLAYLIST_START,
  payload: id,
});

export const addTrackToPlaylistEnd = (id) => ({
  type: MusicActionTypes.ADD_TRACK_TO_PLAYLIST_END,
  payload: id,
});

export const playTrack = (id, index) => ({
  type: MusicActionTypes.PLAY_TRACK,
  payload: {
    id,
    index,
  },
});

export const deleteFromPlaylist = (index) => ({
  type: MusicActionTypes.DELETE_FROM_PLAYLIST,
  payload: index,
});
