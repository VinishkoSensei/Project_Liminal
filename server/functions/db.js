const pgp = require('pg-promise')({});

const cn = {
  host: 'localhost', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'liminal',
  user: 'postgres',
  password: 'root',
};
const db = pgp(cn);

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

const getTrack = async (trackId) => {
  const track = await db
    .one('SELECT * FROM liminal.track WHERE id = $1', trackId)
    .then((trackData) => {
      return trackData;
    });
  return track;
};

module.exports = {
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
  getProfile,
  getTrack,
};
