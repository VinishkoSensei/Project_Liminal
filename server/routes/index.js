const File = require('inert');

const { streamHandler, streamTrack } = require('../functions/audio');
const { getTrackCover, getProfileImage } = require('../functions/file');
const {
  getTrackList,
  getTracksByNameAndAuthor,
  getTracksByName,
  getTracksByAuthor,
  getProfile,
  createProfile,
  signinAuth,
} = require('../functions/db');

const plugin = {
  name: 'streamServer',

  register: async (server, options) => {
    await server.register(File);

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, h) {
        return h.file('index.html');
      },
    });

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
      method: 'POST',
      path: '/getprofile',
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
      /*config: {
        cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with'],
        },
      },*/
    });
  },
};

module.exports = plugin;
