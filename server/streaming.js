const Fs = require('fs');
const { PassThrough } = require('stream');
const Throttle = require('throttle');

const songs = [
  Fs.createReadStream('./files/music/1.mp3'),
  Fs.createReadStream('./files/music/2.mp3'),
  Fs.createReadStream('./files/music/3.mp3'),
];

const sinks = [];

const throttle = new Throttle((192027 / 10) * 1.3);
throttle.on('data', (chunk) => {
  sinks.forEach((sink) => {
    sink.write(chunk);
  });
});

const streamHandler = (req, res) => {
  const sink = new PassThrough();
  sinks.push(sink);
  res.set('Content-Type', 'audio/mpeg');
  res.send(sink);
};

const startStreaming = () => {
  let songNum = 0;

  (function playLoop() {
    const song = songs[songNum++];
    console.log(song);
    song.pipe(throttle, { end: false });
    song.on('end', playLoop);
  })();
};

module.exports = { streamHandler, startStreaming };
