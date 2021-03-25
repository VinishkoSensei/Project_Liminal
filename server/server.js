const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const Throttle = require('throttle');
const { PassThrough } = require('stream');
const Path = require('path');

const { startStreaming } = require('./streaming.js');
const { streamHandler } = require('./streaming.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

startStreaming();
app.use(express.static('public'));

app.get('/stream', (req, res) => {
  streamHandler(req, res);
});

app.listen(3001, () => {
  console.log('running');
});
