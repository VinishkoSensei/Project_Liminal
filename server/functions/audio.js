const Fs = require('fs');
const { PassThrough } = require('stream');
const Throttle = require('throttle');

const { getTrack } = require('./db/track.db');
const { radioQueue } = require('./file');

const sinks = [];

const streamHandler = (request, h) => {
  const sink = new PassThrough();
  sinks.push(sink);
  console.log(sinks.length);
  return h.response(sink).type('audio/mpeg');
};

const streamTrack = async (req, h) => {
  const track = await getTrack(req, h);
  const path = track.path;
  const stat = Fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = Fs.createReadStream(path, { start, end });
    const response = h.response(file);
    response.header('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    response.header('Accept-Ranges', `bytes`);
    response.header('Content-Length', `${chunksize}`);
    response.header('Content-Type', `audio/mpeg`);
    return response;
  }
};

const startStreaming = () => {
  let songNum = 0;
  console.log('Started streaming radio');

  (function playLoop() {
    const song = Fs.createReadStream(radioQueue[songNum++]);
    console.log('Current song: ', song.path);
    const throttle = new Throttle(128000 / 8);
    throttle.on('data', (chunk) => sinks.forEach((sink) => sink.write(chunk)));
    if (radioQueue.length === songNum) songNum = 0;
    song.pipe(throttle, { end: false });
    song.on('end', playLoop);
  })();
};

module.exports = {
  streamHandler,
  startStreaming,
  streamTrack,
};
