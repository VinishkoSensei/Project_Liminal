const Path = require('path');
const Hapi = require('hapi');
const Static = require('./routes/index.js');
const { startStreaming } = require('./streaming');

const server = Hapi.server({
  port: 3001,
  host: 'localhost',
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
    startStreaming();
    console.log(`Server running at ${server.info.uri}`);
    await server.start();
  } catch (err) {
    console.log(`Server error: ${err}`);
    process.exit(1);
  }
};

startApp();
