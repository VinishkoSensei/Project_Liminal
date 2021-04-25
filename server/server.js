require('dotenv').config();
const Path = require('path');
const Hapi = require('hapi');
const Static = require('./routes/index.js');
const { startStreaming } = require('./functions/audio');
const pgp = require('pg-promise')({});
const cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
const db = pgp(cn);

const redisClient = require('async-redis').createClient({
  host: 'localhost',
  password: 'root',
});
redisClient.on('error', (err) => console.log('Error ' + err));

const server = Hapi.server({
  port: process.env.SERVER_PORT,
  host: process.env.SERVER_HOST,
  compression: false,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public'),
    },
  },
});

const startApp = async () => {
  try {
    await server.register(Static);
    await server.decorate('request', 'getDb', function () {
      return db;
    });
    await server.decorate('request', 'getRedis', function () {
      return redisClient;
    });
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
    startStreaming();
  } catch (err) {
    console.log(`Server error: ${err}`);
    process.exit(1);
  }
};

startApp();
