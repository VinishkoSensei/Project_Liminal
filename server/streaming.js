const Fs = require('fs');
const { PassThrough } = require('stream');
const Throttle = require('throttle');
const pgp = require('pg-promise')({});

const cn = {
  host: 'localhost', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'liminal',
  user: 'postgres',
  password: 'root',
};
const db = pgp(cn);

const sinks = [];
const radioQueue = [
  './files/music/1.mp3',
  './files/music/2.mp3',
  './files/music/3.mp3',
];

const streamHandler = (request, h) => {
  const sink = new PassThrough();
  sinks.push(sink);
  console.log(sinks.length);
  return h.response(sink).type('audio/mpeg');
};

const getTrackCover = (req, h) => {
  return h.file('../public/files/covers/' + req.params.trackCoverPath);
};

const getProfileImage = (req, h) => {
  return h.file('../public/files/images/avatars/' + req.params.avatar);
};

const getTrackList = async (req, h) => {
  const trackData = await db.any(
    `SELECT t.id, t."path", t."name", t.cover, to_char(t.duration,'MI:SS') as "duration", a.nickname as "author", g.name as "genre" FROM liminal.track t JOIN liminal.author a ON t.author_id=a.id JOIN liminal.genre g ON t.genre_id=g.id order by t.id`
  );
  return h.response(trackData);
  /*const response = await trackData.map((track) => {
    const tr = {
      ...track,
      cover: 'localhost:3001/files/covers/' + track.cover,
    };
    console.log(tr);
    return tr;
  });
  */
};

const getTracksByNameAndAuthor = async (req, h) => {
  const nm = req.params.name;
  const trackData = await db.any(
    `SELECT t.id, t."path", t."name", t.cover, to_char(t.duration,'MI:SS') as "duration", a.nickname as "author", g.name as "genre" FROM liminal.track t JOIN liminal.author a ON t.author_id=a.id JOIN liminal.genre g ON t.genre_id=g.id WHERE lower(t."name") like '%'||lower($1)||'%' OR lower(a.nickname) like '%'||lower($1)||'%' order by t.id`,
    nm
  );
  return h.response(trackData);
};

const getTracksByName = async (req, h) => {
  const nm = req.params.name;
  const trackData = await db.any(
    `SELECT t.id, t."path", t."name", t.cover, to_char(t.duration,'MI:SS') as "duration", a.nickname as "author", g.name as "genre" FROM liminal.track t JOIN liminal.author a ON t.author_id=a.id JOIN liminal.genre g ON t.genre_id=g.id WHERE lower(t."name") like '%'||lower($1)||'%' order by t.id`,
    nm
  );
  return h.response(trackData);
};

const getTracksByAuthor = async (req, h) => {
  const nm = req.params.name;
  const trackData = await db.any(
    `SELECT t.id, t."path", t."name", t.cover, to_char(t.duration,'MI:SS') as "duration", a.nickname as "author", g.name as "genre" FROM liminal.track t JOIN liminal.author a ON t.author_id=a.id JOIN liminal.genre g ON t.genre_id=g.id WHERE lower(a.nickname) like '%'||lower($1)||'%' order by t.id`,
    nm
  );
  return h.response(trackData);
};

const getProfile = async (req, h) => {
  const profile = await db.oneOrNone(
    `SELECT id, last_name, first_name, middle_name, to_char(birth_date,'DD.MM.YYYY') as "birth_date", subscribed, email, phone, avatar
FROM liminal.users
where id =1`
  );
  return h.response(profile);
};

const streamTrack = async (req, h) => {
  const trackt = await db
    .one('SELECT * FROM liminal.track WHERE id = $1', req.params.trackId)
    .then((trackData) => {
      return trackData;
    });
  const path = trackt.path;
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

  (function playLoop() {
    const song = Fs.createReadStream(radioQueue[songNum++]);
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
  getTrackCover,
  streamTrack,
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
  getProfile,
  getProfileImage,
};
