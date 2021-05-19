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
};
