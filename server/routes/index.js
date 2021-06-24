const File = require('inert');
const Boom = require('boom');
const { streamHandler, streamTrack } = require('../functions/audio');
const { getTrackCover, getUserAvatar } = require('../functions/file');
const {
  createUser,
  signinAuth,
  handleGetUser,
  handleChangeUser,
  checkAuth,
  getUserList,
  changeRole,
  createReview,
} = require('../functions/db/user.db');
const {
  getTrackList,
  getTracks,
  addTrackToRadioQueue,
  getRadioQueueFromFront,
  deleteTrackFromRadioQueue,
  createTrack,
  getGenres,
  getAuthors,
} = require('../functions/db/track.db');

const plugin = {
  name: 'streamServer',

  register: async (server, options) => {
    await server.register(File);

    await server.register({
      plugin: require('hapi-i18n'),
      options: {
        locales: ['en', 'ru'],
        directory: __dirname + '/locales',
        languageHeaderField: 'Accept-Language',
        defaultLocale: 'en',
      },
    });

    /*server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => h.file('index.html'),
    });*/

    server.route({
      method: 'GET',
      path: '/stream',
      handler: streamHandler,
    });

    server.route({
      method: 'GET',
      path: '/gettrackcover/{trackCoverPath}',
      handler: getTrackCover,
      config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/getuseravatar/{avatar}',
      handler: getUserAvatar,
      config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/gettracklist',
      handler: getTrackList,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/user/{id}',
      handler: handleGetUser,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/user/{id}',
      handler: handleChangeUser,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/signin',
      handler: signinAuth,
      config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/createuser',
      handler: createUser,
      config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/addtracktoradioqueue',
      handler: addTrackToRadioQueue,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/deletetrackfromradioqueue',
      handler: deleteTrackFromRadioQueue,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/getradioqueue',
      handler: getRadioQueueFromFront,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/createtrack',
      handler: createTrack,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        payload: {
          maxBytes: 52428800,
        },
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/gettracks',
      handler: getTracks,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/getauthors',
      handler: getAuthors,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/getgenres',
      handler: getGenres,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/tracks/{trackId}',
      handler: streamTrack,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
      },
    });

    server.route({
      method: 'GET',
      path: '/getuserlist',
      handler: getUserList,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/changerole',
      handler: changeRole,
      config: {
        pre: [
          {
            method: checkAuth, //ADMIN
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'POST',
      path: '/createreview',
      handler: createReview,
      config: {
        pre: [
          {
            method: checkAuth,
          },
        ],
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });
  },
};

module.exports = plugin;
