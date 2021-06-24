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

const getUser = async (req, h) => {
  const { email, password } = req.payload;
  console.log(req.i18n.__('Test'));
  const db = req.getDb();
  if (!email || !password) {
    return Promise.reject(req.i18n.__('Incorrect form submission'));
  }
  try {
    const signindata = await db.func('liminal.getusercreds', email);
    if (bcrypt.compareSync(password, signindata[0].hash)) {
      const user = await db.func(`liminal.getuser`, [signindata[0].id, email]);
      return user[0];
    } else {
      throw Boom.badRequest(req.i18n.__('Wrong email or password'));
    }
  } catch (err) {
    throw Boom.badRequest(req.i18n.__('Wrong email or password'));
  }
};

const signinAuth = async (req, h) => {
  const { authorization } = req.headers;
  const redisClient = req.getRedis();
  if (authorization) {
    const reply = await redisClient.get(authorization);
    if (reply) {
      console.log('Entering', authorization);
      return h
        .response({
          success: 'true',
          userId: reply,
          token: authorization,
        })
        .state('token', authorization);
    } else {
      throw Boom.unauthorized(req.i18n.__('Unauthorized'));
    }
  } else {
    const user = await getUser(req, h);
    if (user.id && user.email) {
      const session = await createSessions(redisClient, user);
      return h.response(session);
    } else {
      throw Boom.badRequest(req.i18n.__('Signinauth error'));
    }
  }
};

const createUser = async (req, h) => {
  try {
    const { email, firstname, lastname, date, phone, file, password } =
      req.payload;
    if (
      !email ||
      !firstname ||
      !lastname ||
      !date ||
      !phone ||
      !file ||
      !password
    ) {
      throw Boom.badRequest(req.i18n.__('Incorrect form submission'));
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
        throw Boom.notAcceptable(req.i18n.__('User not unique'));
      default:
        throw Boom.badRequest(req.i18n.__('Unable to register'));
    }
  }
};

const handleGetUser = async (req, h) => {
  const { id } = req.params;
  const db = req.getDb();
  try {
    const user = await db.func(`liminal.getuser`, id);
    if (!user[0]) throw Boom.unauthorized('Wrong credentials');
    return h.response(user[0]);
  } catch (err) {
    throw Boom.badRequest(err);
  }
};

const handleChangeUserInfo = async (db, id, value, changingItemType) => {
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

const handleChangeUserPassword = async (req, db, id, value) => {
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

const handleChangeUserAvatar = async (db, id, value, changingItemType) => {
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

const handleChangeUser = async (req, h) => {
  const { id, value, changingItemType } = req.payload;
  const db = req.getDb();

  switch (changingItemType) {
    case 'password':
      return h.response(await handleChangeUserPassword(req, db, id, value));
    case 'file':
      return h.response(
        await handleChangeUserAvatar(db, id, value, changingItemType)
      );
    case 'first_name':
    case 'last_name':
    case 'phone':
      return h.response(
        await handleChangeUserInfo(db, id, value, changingItemType)
      );
    default:
      throw Boom.badRequest(req.i18n.__('Wrong operation type'));
  }
};

const checkAuth = async (req, h) => {
  const redisClient = req.getRedis();
  const { authorization } = req.headers;
  console.log('TOKEN?', req.state.token);
  try {
    if (!authorization) {
      throw Boom.unauthorized(req.i18n.__('Unauthorized'));
    }
    const reply = await redisClient.get(authorization);
    if (reply) {
      return reply;
    } else {
      throw Boom.unauthorized(req.i18n.__('Unauthorized'));
    }
  } catch {
    throw Boom.unauthorized(req.i18n.__('Unauthorized'));
  }
};

const getUserList = async (req, h) => {
  const db = req.getDb();
  const { type, query } = req.query;
  const q = query.replace('*', '%');
  const userList = await db.func(`liminal.getuserlist`, [type, q]);
  return h.response(userList);
};

const changeRole = async (req, h) => {
  const db = req.getDb();
  const { id } = req.payload;
  const user = await db.func(`liminal.getuser`, id);
  await db.proc(`liminal.changerole`, [user[0].id, !user[0].isadmin]);
  return h.response('Done.');
};

const createReview = async (req, h) => {
  const db = req.getDb();
  const { theme, reviewtext, userid } = req.payload;
  await db.proc(`liminal.createreview`, [theme, reviewtext, userid]);
  return h.response('Done.');
};

module.exports = {
  getUser,
  createUser,
  signinAuth,
  handleGetUser,
  handleChangeUser,
  checkAuth,
  getUserList,
  changeRole,
  createReview,
};
