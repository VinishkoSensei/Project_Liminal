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
} = require('../functions/db/profile.db');
const {
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
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
  },
};

module.exports = plugin;
