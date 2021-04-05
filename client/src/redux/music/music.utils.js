export const addTrackToPlaylistEnd = (playlist, track) => {
  return [...playlist, { track }];
};

export const addTrackToPlaylistStart = (playlist, track) => {
  return [{ track }, ...playlist];
};

export const playTrack = (id) => {
  return `http://localhost:3001/tracks/${id}`;
  //deleteFromPlaylist(index);
};

export const deleteFromPlaylist = (playlist, index) => {
  return playlist.filter((el, ind) => {
    return ind !== index;
  });
};
