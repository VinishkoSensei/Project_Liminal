export const addTrackToPlaylistEnd = (playlist, { track }) => {
  return [...playlist, track];
};

export const addTrackToPlaylistStart = (playlist, { track }) => {
  return [track, ...playlist];
};

export const copyTrackFromPlaylistToPrevPlaylist = (prevPlaylist, playlist) => {
  return [...prevPlaylist, playlist[0]];
};

export const playTrack = (id) => {
  return `http://localhost:3001/tracks/${id}`;
};

export const playNextTrack = (playlist) => {
  if (!playlist[0]) return '';
  return `http://localhost:3001/tracks/${playlist[0].id}`;
};

export const playRadio = () => {
  return `http://localhost:3001/stream`;
};

export const deleteFromPlaylist = (playlist, index) => {
  return playlist.filter((el, ind) => {
    return ind !== index;
  });
};
