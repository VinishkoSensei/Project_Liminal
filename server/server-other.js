const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const Throttle = require('throttle');
const { PassThrough } = require('stream');
const EventEmitter = require('events');
const Path = require('path');
const mm = require('music-metadata');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const songs = [];
const currentSong = null;
const stream = new EventEmitter();

const doStuff = async () => {
  /*const bitRate = await mm
    .parseFile(Path.join(__dirname, '/files/music/', `1.mp3`))
    .then((metadata) => metadata.format.bitrate);*/
  const bitRate = ffprobeSync(Path.join(__dirname, '/files/music/', `1.mp3`))
    .format.bit_rate;

  const readable = fs.createReadStream(
    Path.join(__dirname, '/files/music/', `1.mp3`)
  );
  const throttle = new Throttle(bitRate / 8);
  const writables = [];

  readable.pipe(throttle).on('data', (chunk) => {
    for (const writable of writables) {
      writable.write(chunk);
    }
  });
};

doStuff();

app.listen(3001, () => {
  console.log('running');
});
