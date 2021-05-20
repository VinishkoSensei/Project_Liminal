const { createMusicWithRandomId, deleteFile } = require('../file');
const mm = require('music-metadata');
const Fs = require('fs');
const Boom = require('boom');

const getTrackList = async (req, h) => {
  const db = req.getDb();
  const trackData = await db.func(`liminal.gettracklist`);
  return h.response(trackData);
};

const getTracksByNameAndAuthor = async (req, h) => {
  const db = req.getDb();
  const nm = req.params.name;
  const trackData = await db.func(`liminal.gettracklist`, [nm, nm]);
  return h.response(trackData);
};

const getTracksByName = async (req, h) => {
  const db = req.getDb();
  const nm = req.params.name;
  const trackData = await db.func(`liminal.gettracklist`, [nm]);
  return h.response(trackData);
};

const getTracksByAuthor = async (req, h) => {
  const db = req.getDb();
  const nm = req.params.name;
  const trackData = await db.func(`liminal.gettracklist`, [null, nm]);
  return h.response(trackData);
};

const getTrack = async (req, h) => {
  const trackId = req.params.trackId;
  const db = req.getDb();
  const track = await db.func('liminal.gettrack', trackId);
  return track[0];
};

const getRadioQueue = async (db) => {
  const radioQueue = await db.func('liminal.gettrackqueue');
  return radioQueue;
};

const getRadioQueueFromFront = async (req, h) => {
  const db = req.getDb();
  const radioQueue = await db.func('liminal.getradioqueue');
  return radioQueue;
};

const getNextTrackFromRadioQueue = async (db) => {
  const nextTrack = await db.func('liminal.getnexttrackfromradioqueue');
  return nextTrack[0].getnexttrackfromradioqueue;
};

const addTrackToRadioQueue = async (req, h) => {
  const db = req.getDb();
  const { trackid } = req.payload;
  const radioQueue = await db.func('liminal.addtoradioqueue', trackid);
  return radioQueue;
};

const deleteTrackFromRadioQueue = async (req, h) => {
  const db = req.getDb();
  const { index } = req.payload;
  const radioQueue = await db.func('liminal.deletefromradioqueue', index);
  return radioQueue;
};

const clearCycle = async (db) => {
  await db.proc('liminal.clearcycle');
  return;
};

const createTrack = async (req, h) => {
  try {
    const db = req.getDb();
    const { name, genre, author, file } = req.payload;
    const base64Data = file.contentPreviewUrl.split(',')[1];
    const trackPath =
      './files/music/' +
      createMusicWithRandomId('music/', file.content, 'base64', base64Data);
    const metadata = await mm.parseFile(trackPath);
    const duration = new Date(1000 * metadata.format.duration)
      .toISOString()
      .substr(11, 8);

    await db.proc('liminal.createtrack', [
      name,
      genre,
      author,
      trackPath,
      duration,
    ]);
    return { response: 'ok' };
  } catch (err) {
    throw Boom.badData(err);
  }
};

module.exports = {
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
  getTrack,
  getNextTrackFromRadioQueue,
  addTrackToRadioQueue,
  clearCycle,
  getRadioQueue,
  getRadioQueueFromFront,
  deleteTrackFromRadioQueue,
  createTrack,
};
