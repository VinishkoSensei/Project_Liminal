const { createMusicWithRandomId, deleteFile } = require('../file');
const mm = require('music-metadata');
const Fs = require('fs');
const Boom = require('boom');

const getTrackList = async (req, h) => {
  const db = req.getDb();
  const trackData = await db.func(`liminal.gettracklist`);
  return h.response(trackData);
};

const getTracksByType = async (req, h, db) => {
  const { type, query } = req.query;
  const q = query.replace('*', '%');
  switch (type) {
    case 'all':
      return await db.func(`liminal.gettracklist`, [q, q]);
    case 'authors':
      return await db.func(`liminal.gettracklist`, [null, q]);
    case 'tracks':
      return await db.func(`liminal.gettracklist`, [q]);
    default:
      throw Boom.badData('Wrong search type');
  }
};

const getTracks = async (req, h) => {
  const db = req.getDb();
  const trackData = await getTracksByType(req, h, db);
  const trackList = await Promise.all(
    trackData.map(async (track) => {
      const trackpoints = await db.func('liminal.gettrackpoints', track.id);
      const suggestedPoints = await trackpoints.map((p) => ({
        start: p.point - 10,
        end: p.point,
      }));
      return { ...track, suggestedPoints };
    })
  );

  return h.response(trackList);
};

const getTrack = async (req, h) => {
  const trackId = req.params.trackId;
  const db = req.getDb();
  const track = await db.func('liminal.gettrack', trackId);
  const trackpoints = await db.func('liminal.gettrackpoints', trackId);
  const suggestedPoints = trackpoints.map((p) => p.point);
  return { ...track[0], suggestedPoints };
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

const getGenres = async (req, h) => {
  const db = req.getDb();
  const genres = await db.func('liminal.getgenres');
  return genres;
};

const getAuthors = async (req, h) => {
  const db = req.getDb();
  const authors = await db.func('liminal.getauthors');
  return authors;
};

const createTrack = async (req, h) => {
  try {
    const db = req.getDb();
    const { name, genre, author, file, suggestedPoints } = req.payload;
    const base64Data = file.contentPreviewUrl.split(',')[1];
    const trackPath =
      './files/music/' +
      createMusicWithRandomId('music/', file.content, 'base64', base64Data);
    const metadata = await mm.parseFile(trackPath);
    const duration = new Date(1000 * metadata.format.duration)
      .toISOString()
      .substr(11, 8);

    const trackResponse = await db.func('liminal.createtrack', [
      name,
      genre,
      author,
      trackPath,
      duration,
    ]);

    const trackId = trackResponse[0].createtrack;

    suggestedPoints.map(async (point) => {
      await db.proc('liminal.addpointtotrack', [trackId, point]);
    });

    return { response: 'ok' };
  } catch (err) {
    throw Boom.badData(err);
  }
};

module.exports = {
  getTrackList,
  getTrack,
  getTracks,
  getNextTrackFromRadioQueue,
  addTrackToRadioQueue,
  clearCycle,
  getGenres,
  getAuthors,
  getRadioQueue,
  getRadioQueueFromFront,
  deleteTrackFromRadioQueue,
  createTrack,
};
