const Fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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

const createFileWithRandomId = (path, ext, type, file) => {
  const filename = `${uuidv4()}${ext}`;
  Fs.writeFileSync(
    `public/files/${path}${filename}`,
    file,
    type,
    function (err) {
      return err;
    }
  );
  return filename;
};

const deleteFile = async (path, filename) => {
  Fs.unlink(`public/files/${path}${filename}`, (err) => {
    if (err)
      console.log(`Couldn't delete file ${err.path} with error ${err.code}`);
  });
};

module.exports = {
  radioQueue,
  getTrackCover,
  getProfileImage,
  createFileWithRandomId,
  deleteFile,
};
