const File = require('inert');
const Boom = require('boom');
const { streamHandler, streamTrack } = require('../functions/audio');
const { getTrackCover, getProfileImage } = require('../functions/file');
const {
  createProfile,
  signinAuth,
  handleGetProfile,
  handleChangeProfile,
  checkAuth,
  getUserList,
  changeRole,
  createReview,
} = require('../functions/db/profile.db');
const {
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
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
      path: '/getprofileimage/{avatar}',
      handler: getProfileImage,
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
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/profile/{id}',
      handler: handleGetProfile,
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
      path: '/profile/{id}',
      handler: handleChangeProfile,
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
      path: '/createprofile',
      handler: createProfile,
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
      path: '/gettracksbynameandauthor/{name}',
      handler: getTracksByNameAndAuthor,
      config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/gettracksbyname/{name}',
      handler: getTracksByName,
      config: {
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
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });

    server.route({
      method: 'GET',
      path: '/gettracksbyauthor/{name}',
      handler: getTracksByAuthor,
      config: {
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
    });

    server.route({
      method: 'GET',
      path: '/getuserlist',
      handler: getUserList,
      config: {
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
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },
    });
  },
};

module.exports = plugin;
