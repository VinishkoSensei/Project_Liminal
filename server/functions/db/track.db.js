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

module.exports = {
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
  getTrack,
};
