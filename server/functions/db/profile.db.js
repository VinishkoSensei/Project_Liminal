const Boom = require('boom');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createFileWithRandomId, deleteFile } = require('../file');

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
};

const setToken = (redisClient, key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

const deleteToken = (redisClient, key) => {
  return Promise.resolve(redisClient.del(key));
};

const createSessions = (redisClient, user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(redisClient, token, id)
    .then(() => {
      return { success: 'true', userId: id, token };
    })
    .catch((err) => {
      return err;
    });
};

const getProfile = async (req, h) => {
  const { email, password } = req.payload;
  console.log(req.i18n.__('Test'));
  const db = req.getDb();
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  const signindata = await db.func('liminal.getusercreds', email);
  if (bcrypt.compareSync(password, signindata[0].hash)) {
    try {
      const profile = await db.func(`liminal.getuser`, [
        signindata[0].id,
        email,
      ]);
      return profile[0];
    } catch (err) {
      throw Boom.badRequest('unable to get user');
    }
  } else {
    throw Boom.badRequest('wrong email or password');
  }
};

const signinAuth = async (req, h) => {
  const { authorization } = req.headers;
  const redisClient = req.getRedis();
  if (authorization) {
    const reply = await redisClient.get(authorization);
    if (reply) {
      return h.response({
        success: 'true',
        userId: reply,
        token: authorization,
      });
    } else {
      throw Boom.unauthorized('Unauthorized');
    }
  } else {
    const profile = await getProfile(req, h);
    if (profile.id && profile.email) {
      const session = await createSessions(redisClient, profile);
      return h.response(session);
    } else {
      throw Boom.badRequest('signinauth error');
    }
  }
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
    const db = req.getDb();
    const base64Data = file.imagePreviewUrl.split(',')[1];
    const imagename = createFileWithRandomId(
      'images/avatars/',
      file.image,
      'base64',
      base64Data
    );
    const hash = bcrypt.hashSync(password);
    await db.proc('liminal.register', [
      lastname,
      firstname,
      date,
      email,
      phone,
      imagename,
      hash,
    ]);
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

const handleGetProfile = async (req, h) => {
  const { id } = req.params;
  const db = req.getDb();

  try {
    const user = await db.func(`liminal.getuser`, id);
    return h.response(user[0]);
  } catch (err) {
    throw Boom.badRequest(err);
  }
};

const handleChangeProfileInfo = async (db, id, value, changingItemType) => {
  try {
    const user = await db.func(`liminal.changeuserinfo`, [
      id,
      value,
      changingItemType,
    ]);
    return { id, ...user[0] };
  } catch (err) {
    throw Boom.badRequest(err);
  }
};

const handleChangeProfilePassword = async (req, db, id, value) => {
  try {
    const redisClient = req.getRedis();
    const { authorization } = req.headers;

    await deleteToken(redisClient, authorization);
    const user = await db.func(`liminal.changeuserpassword`, [
      id,
      bcrypt.hashSync(value),
    ]);
    return { id, ...user[0] };
  } catch (err) {
    throw Boom.badRequest(err);
  }
};

const handleChangeProfileAvatar = async (db, id, value, changingItemType) => {
  try {
    const base64Data = value.imagePreviewUrl.split(',')[1];
    const imagename = createFileWithRandomId(
      'images/avatars/',
      value.image,
      'base64',
      base64Data
    );
    const oldimage = await db.func(`liminal.getavatar`, id);
    const user = await db.func(`liminal.changeuserinfo`, [
      id,
      imagename,
      changingItemType,
    ]);
    deleteFile('images/avatars/', oldimage[0].getavatar);
    return { id, ...user[0] };
  } catch (err) {
    throw Boom.badRequest(err);
  }
};

const handleChangeProfile = async (req, h) => {
  const { id, value, changingItemType } = req.payload;
  const db = req.getDb();

  switch (changingItemType) {
    case 'password':
      return h.response(await handleChangeProfilePassword(req, db, id, value));
    case 'file':
      return h.response(
        await handleChangeProfileAvatar(db, id, value, changingItemType)
      );
    case 'first_name':
    case 'last_name':
    case 'phone':
      return h.response(
        await handleChangeProfileInfo(db, id, value, changingItemType)
      );
    default:
      throw Boom.badRequest('Wrong type');
  }
};

const checkAuth = async (req, h) => {
  const redisClient = req.getRedis();
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw Boom.unauthorized('Unauthorized');
    }
    const reply = await redisClient.get(authorization);
    if (reply) {
      return reply;
    } else {
      throw Boom.unauthorized('Unauthorized');
    }
  } catch {
    throw Boom.unauthorized('Unauthorized');
  }
};

module.exports = {
  getProfile,
  createProfile,
  signinAuth,
  handleGetProfile,
  handleChangeProfile,
  checkAuth,
};
