const radioQueue = [
  './files/music/1.mp3',
  './files/music/2.mp3',
  './files/music/3.mp3',
];

const getTrackCover = (req, h) => {
  return h.file('../public/files/covers/' + req.params.trackCoverPath);
};

const getProfileImage = (req, h) => {
  return h.file('../public/files/images/avatars/' + req.params.avatar);
};

module.exports = {
  radioQueue,
  getTrackCover,
  getProfileImage,
};
