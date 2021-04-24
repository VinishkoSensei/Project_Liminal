const pgp = require('pg-promise')({});
const Boom = require('boom');
const Fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require('redis');

const redisClient = redis.createClient({ host: 'localhost', password: 'root' });

const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
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

const getAuthTokenId = (req, h) => {
  console.log('getAuthTokenId');
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      console.log('Unauthorized');
      throw Boom.badRequest('Unauthorized');
    }
    console.log('Authorized');
    return h.response({ id: reply });
  });
};

const signToken = (email) => {
  const jwtPayload = { email };
  console.log('signToken', jwtPayload);
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
};

const setToken = (key, value) => {
  console.log('setToken');
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (user) => {
  console.log('createSessions');
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      console.log('i work', id, token);
      return { success: 'true', userId: id, token };
    })
    .catch((err) => {
      console.log(err);
    });
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
  const { email, password } = req.payload;
  console.log('getProfile');
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  const signindata = await db.any(
    'SELECT id, email, hash FROM liminal.login WHERE email like $1',
    email
  );
  if (bcrypt.compareSync(password, signindata[0].hash)) {
    try {
      const profile = await db.one(
        `SELECT id, last_name, first_name, middle_name, to_char(birth_date,'DD.MM.YYYY') as "birth_date", subscribed, email, phone, avatar
FROM liminal.user
where email like $1`,
        email
      );
      //console.log(profile);
      return profile;
    } catch (err) {
      throw Boom.badRequest('unable to get user');
    }
  } else {
    throw Boom.badRequest('wrong email or password');
  }
};

const signinAuth = (req, h) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, h)
    : getProfile(req, h)
        .then((data) => {
          return data.id && data.email
            ? createSessions(data)
            : Promise.reject(data);
        })
        .then((session) => {
          console.log(session);
          return h.response(session);
        })
        .catch((err) => Boom.badRequest(err));
};

const createProfile = async (req, h) => {
  try {
    const {
      email,
      firstname,
      lastname,
      date,
      phone,
      file,
      password,
    } = req.payload;
    if (
      !email ||
      !firstname ||
      !lastname ||
      !date ||
      !phone ||
      !file ||
      !password
    ) {
      throw Boom.badRequest('incorrect form submission');
    }

    const base64Data = file.imagePreviewUrl.split(',')[1];
    const imagename = `${uuidv4()}${file.image}`;
    Fs.writeFileSync(
      `public/files/images/avatars/${imagename}`,
      base64Data,
      'base64',
      function (err) {
        console.log(err);
      }
    );

    const hash = bcrypt.hashSync(password);
    await db.none(
      `INSERT INTO liminal.login(email, hash)
VALUES ($1, $2)`,
      [email, hash]
    );
    await db.none(
      `INSERT INTO liminal.user(email, first_name, last_name, birth_date, phone, avatar)
VALUES ($1, $2, $3, $4, $5, $6)`,
      [email, firstname, lastname, date, phone, imagename]
    );
    return h.response().code(200);
  } catch (err) {
    switch (err.routine) {
      case '_bt_check_unique':
        throw Boom.notAcceptable('NOT UNIQUE');
      default:
        throw Boom.badRequest('unable to register');
    }
  }
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
  createProfile,
  getTrack,
  signinAuth,
};
